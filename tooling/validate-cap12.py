#!/usr/bin/env python3
"""Confere HTML/apoios e compila os cinco checkpoints em Java 21.
Com --integration, usa um container PostgreSQL descartável criado pelo próprio script.
Nenhum banco do aluno é utilizado. Requer Python 3, Maven, JDK 21 e Docker para integração.
"""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlparse, unquote
import argparse, json, os, shutil, subprocess, tempfile, time, urllib.request, urllib.error, zipfile, socket
ROOT=Path(__file__).resolve().parents[1]
CHAPTER=ROOT/'capitulos/12-spring-primeira-api'
class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True); self.ids=[];self.refs=[];self.blocks=[];self.block=None;self.depth=0
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if 'id' in a:self.ids.append(a['id'])
        for key in ('href','src'):
            if key in a:self.refs.append(a[key])
        if tag=='pre':self.block=[a,''];self.depth=1
        elif self.block is not None:
            assert tag in ('span','code'),f'Tag inesperada dentro de pre: {tag}'
    def handle_endtag(self,tag):
        if tag=='pre' and self.block is not None:self.blocks.append(self.block);self.block=None
    def handle_data(self,data):
        if self.block is not None:self.block[1]+=data

def run(args,**kwargs):
    result=subprocess.run(args,text=True,stdout=subprocess.PIPE,stderr=subprocess.STDOUT,**kwargs)
    if result.returncode:raise RuntimeError(f'{args[0]} falhou:\n{result.stdout[-10000:]}')
    return result.stdout.strip()
def free_port():
    with socket.socket() as s:s.bind(('127.0.0.1',0));return s.getsockname()[1]
def http(port,method,path='',data=None):
    req=urllib.request.Request(f'http://127.0.0.1:{port}/fornecedores{path}',data=None if data is None else json.dumps(data).encode(),method=method,headers={'Content-Type':'application/json'})
    try:
        with urllib.request.urlopen(req,timeout=5) as response:return response.status,json.loads(response.read() or b'null')
    except urllib.error.HTTPError as error:return error.code,json.loads(error.read() or b'null')
def main():
    parser=argparse.ArgumentParser(description=__doc__);parser.add_argument('--integration',action='store_true');parser.add_argument('--static-only',action='store_true');args=parser.parse_args()
    page=Page();page.feed((CHAPTER/'index.html').read_text())
    assert len(page.ids)==len(set(page.ids)),'IDs repetidos'
    for ref in page.refs:
        u=urlparse(ref)
        if u.scheme or not u.path and not u.fragment:continue
        if not u.path:assert unquote(u.fragment) in page.ids,ref
        else:assert (CHAPTER/unquote(u.path)).exists(),ref
    java={}; properties=None
    for attrs,text in page.blocks:
        if 'data-stage' in attrs:
            stage=int(attrs['data-stage']);path=attrs['data-file'];java.setdefault(stage,{})[path]=text+'\n'
            assert (CHAPTER/'apoio/checkpoints'/str(stage)/path).read_text()==text+'\n',f'HTML divergente: {stage}/{path}'
        if 'data-properties' in attrs:properties=text+'\n'
    assert len(java)==5
    final={};
    for stage in range(1,6):final.update(java[stage])
    with zipfile.ZipFile(CHAPTER/'apoio/api-completa.zip') as z:
        for p,s in final.items():assert z.read('api/src/main/java/br/com/gestorpro/api/'+p).decode()==s
        assert z.read('api/src/main/resources/application.properties').decode()==properties
        with zipfile.ZipFile(CHAPTER/'apoio/api-inicial.zip') as initial:
            assert z.read('api/pom.xml')==initial.read('api/pom.xml'),'POM inicial e final divergentes'
    print(f'HTML: {len(page.ids)} IDs únicos, links locais válidos, 5 checkpoints e ZIP final coerentes.',flush=True)
    if args.static_only:return
    env=os.environ.copy()
    if Path('/usr/libexec/java_home').exists():env['JAVA_HOME']=run(['/usr/libexec/java_home','-v','21'])
    java_bin=str(Path(env['JAVA_HOME'])/'bin/java') if env.get('JAVA_HOME') else shutil.which('java')
    assert java_bin and '21.' in run([java_bin,'-version'])
    with tempfile.TemporaryDirectory(prefix='cap12-validation-') as temp:
        folder=Path(temp)
        with zipfile.ZipFile(CHAPTER/'apoio/api-inicial.zip') as z:z.extractall(folder)
        project=folder/'api';current={}
        for stage in range(1,6):
            current.update(java[stage])
            for p,s in current.items():
                target=project/'src/main/java/br/com/gestorpro/api'/p;target.parent.mkdir(parents=True,exist_ok=True);target.write_text(s)
            run(['mvn','-q','-DskipTests','compile'],cwd=project,env=env)
            print(f'Java 21: checkpoint {stage}/5 compila.',flush=True)
        (project/'src/main/resources/application.properties').write_text(properties)
        if not args.integration:return
        dbport,apiport=free_port(),free_port();name='cap12-check-'+str(os.getpid());volume=name+'-data';proc=None
        def docker(*a):return run(['docker',*a])
        def sql(query):return docker('exec',name,'psql','-U','gestorpro','-d','gestorpro','-At','-v','ON_ERROR_STOP=1','-c',query)
        def start_app():
            appenv={**env,'SPRING_DATASOURCE_URL':f'jdbc:postgresql://localhost:{dbport}/gestorpro','SERVER_PORT':str(apiport)}
            log=open(folder/'app.log','a')
            p=subprocess.Popen([java_bin,'-jar',str(project/'target/api-0.0.1-SNAPSHOT.jar')],env=appenv,stdout=log,stderr=log)
            log.close()
            for _ in range(120):
                if p.poll() is not None:raise RuntimeError((folder/'app.log').read_text()[-9000:])
                try:
                    if http(apiport,'GET')[0]==200:return p
                except (OSError,urllib.error.URLError):pass
                time.sleep(.5)
            p.terminate();p.wait();raise RuntimeError((folder/'app.log').read_text()[-9000:])
        def stop_app(p):p.terminate();p.wait(timeout=30)
        def container():docker('run','--name',name,'-e','POSTGRES_DB=gestorpro','-e','POSTGRES_USER=gestorpro','-e','POSTGRES_PASSWORD=gestorpro_local','-p',f'127.0.0.1:{dbport}:5432','-v',volume+':/var/lib/postgresql/data','-d','postgres:17')
        def ready():
            for _ in range(90):
                try:docker('exec',name,'pg_isready','-U','gestorpro','-d','gestorpro');return
                except RuntimeError:time.sleep(.5)
            raise RuntimeError('PostgreSQL não ficou pronto')
        try:
            container();ready()
            sql_script=(CHAPTER/'apoio/treino.sql').read_text()
            docker('exec','-i',name,'true')
            run(['docker','exec','-i',name,'psql','-U','gestorpro','-d','gestorpro','-v','ON_ERROR_STOP=1'],input=sql_script)
            assert sql('SELECT COUNT(*) FROM fornecedores_treino;')=='0'
            print('PostgreSQL 17: roteiro SQL executado; inserção, alteração e exclusão confirmadas.',flush=True)
            testenv={**env,'SPRING_DATASOURCE_URL':f'jdbc:postgresql://localhost:{dbport}/gestorpro'}
            run(['mvn','-q','test','package'],cwd=project,env=testenv)
            proc=start_app()
            assert http(apiport,'GET')==(200,[])
            payload={'nome':'TechDistrib','cnpj':'12.345.678/0001-90','categoria':'Eletrônicos','telefone':'(83) 3333-1000'}
            status,created=http(apiport,'POST',data=payload);assert status==201 and created['id']>0
            id=created['id']
            assert http(apiport,'GET',f'/{id}')==(200,created)
            for invalid in ('', '   ', None):
                assert http(apiport,'POST',data={**payload,'nome':invalid})[0]==400
            status,second=http(apiport,'POST',data={**payload,'id':id,'nome':'Papelaria Nordeste'})
            assert status==201 and second['id']!=id
            updated={**payload,'id':second['id'],'telefone':'(83) 3333-2000'}
            status,changed=http(apiport,'PUT',f'/{id}',updated);assert status==200 and changed['id']==id and changed['telefone']==updated['telefone']
            assert http(apiport,'GET',f"/{second['id']}")[1]['nome']=='Papelaria Nordeste'
            assert http(apiport,'PUT',f'/{id}',{**payload,'nome':''})[0]==400
            assert http(apiport,'GET',f'/{id}')[1]['telefone']==updated['telefone']
            for method in ('GET','PUT','DELETE'):
                assert http(apiport,method,'/999999',payload if method=='PUT' else None)[0]==404
            assert http(apiport,'GET','/abc')[0]==400
            assert sql('SELECT COUNT(*) FROM fornecedores;')=='2'
            assert sql(f'SELECT telefone FROM fornecedores WHERE id={id};')==updated['telefone']
            stop_app(proc);proc=None;proc=start_app()
            assert http(apiport,'GET',f'/{id}')[1]['telefone']==updated['telefone']
            stop_app(proc);proc=None
            docker('stop',name);docker('start',name);ready()
            assert sql('SELECT COUNT(*) FROM fornecedores;')=='2'
            docker('stop',name);docker('rm',name);container();ready()
            assert sql('SELECT COUNT(*) FROM fornecedores;')=='2'
            proc=start_app()
            assert http(apiport,'DELETE',f'/{id}')==(204,None)
            assert http(apiport,'GET',f'/{id}')[0]==404
            assert http(apiport,'DELETE',f'/{id}')[0]==404
            assert len(http(apiport,'GET')[1])==1
            assert sql('SELECT COUNT(*) FROM fornecedores;')=='1'
            print('Integração: 5 endpoints, 400/404, IDs, PUT sem duplicação, DELETE 204, SQL real e persistência após reiniciar Java, parar/iniciar e recriar container com mesmo volume.',flush=True)
        finally:
            if proc and proc.poll() is None:stop_app(proc)
            subprocess.run(['docker','rm','-f',name],stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
            subprocess.run(['docker','volume','rm',volume],stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
if __name__=='__main__':main()
