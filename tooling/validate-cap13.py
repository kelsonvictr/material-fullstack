#!/usr/bin/env python3
"""Confere o Cap 13: HTML ↔ codigo.py ↔ checkpoints ↔ ZIP, compila as 9 etapas em Java 21 e,
com --integration, executa o roteiro de aceite contra um PostgreSQL 17 descartável criado aqui.
Nenhum banco do aluno é utilizado. Requer Python 3, Maven, JDK 21 e Docker para a integração.
Rode antes: python3 tooling/build-cap13.py
"""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlparse, unquote
import argparse, json, os, shutil, socket, subprocess, sys, tempfile, time, urllib.error, urllib.request, zipfile

ROOT = Path(__file__).resolve().parents[1]
CHAPTER = ROOT / 'capitulos/13-spring-dto-validacao'
sys.path.insert(0, str(ROOT / 'tooling/cap13'))
import codigo  # noqa: E402

BASE = 'api/src/main/java/' + codigo.PACOTE


class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.ids, self.refs, self.blocks, self.block = [], [], [], None

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if 'id' in a: self.ids.append(a['id'])
        for key in ('href', 'src'):
            if key in a: self.refs.append(a[key])
        if tag == 'pre': self.block = [a, '']
        elif self.block is not None:
            assert tag in ('span', 'code'), f'Tag inesperada dentro de pre: {tag} (faltou escapar < ou >?)'

    def handle_endtag(self, tag):
        if tag == 'pre' and self.block is not None: self.blocks.append(self.block); self.block = None

    def handle_data(self, data):
        if self.block is not None: self.block[1] += data


def run(args, **kwargs):
    result = subprocess.run(args, text=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, **kwargs)
    if result.returncode: raise RuntimeError(f'{args[0]} falhou:\n{result.stdout[-10000:]}')
    return result.stdout.strip()


def free_port():
    with socket.socket() as s: s.bind(('127.0.0.1', 0)); return s.getsockname()[1]


def http(port, method, path, data=None, raw=None):
    body = raw.encode() if raw is not None else (None if data is None else json.dumps(data).encode())
    req = urllib.request.Request(f'http://127.0.0.1:{port}{path}', data=body, method=method, headers={'Content-Type': 'application/json'})
    try:
        with urllib.request.urlopen(req, timeout=5) as r: return r.status, json.loads(r.read() or b'null')
    except urllib.error.HTTPError as e: return e.code, json.loads(e.read() or b'null')


def static_checks():
    html = (CHAPTER / 'index.html').read_text()
    page = Page(); page.feed(html)
    assert len(page.ids) == len(set(page.ids)), 'IDs repetidos'
    for ref in page.refs:
        u = urlparse(ref)
        if u.scheme or not u.path and not u.fragment: continue
        if not u.path: assert unquote(u.fragment) in page.ids, f'Âncora inexistente: {ref}'
        else: assert (CHAPTER / unquote(u.path)).exists(), f'Arquivo inexistente: {ref}'
    vistos = {}
    for attrs, text in page.blocks:
        if 'illegal character' not in text:  # a mensagem real do javac mostra a seta errada de propósito
            assert '→' not in text and '⇒' not in text, f'Seta Unicode dentro de <pre>: {text[:80]}'
        if 'data-stage' in attrs:
            n, caminho = int(attrs['data-stage']), attrs['data-file']
            assert text + '\n' == codigo.ETAPAS[n][caminho], f'HTML diferente de codigo.py: {n}/{caminho}'
            assert (CHAPTER / 'apoio/checkpoints' / str(n) / caminho).read_text() == text + '\n', f'Checkpoint divergente: {n}/{caminho}'
            vistos[(n, caminho)] = True
        if 'data-properties' in attrs:
            props0 = zipfile.ZipFile(CHAPTER / 'apoio/api-inicio-cap13.zip').read('api/src/main/resources/application.properties').decode()
            assert text + '\n' == codigo.properties(props0, int(attrs['data-properties'])), 'application.properties divergente'
        if 'data-pom' in attrs:
            assert text.replace('    ', '\t') + '\n' == codigo.DEPENDENCIA_VALIDACAO, 'Trecho do pom divergente'
    faltando = [(n, c) for n, arquivos in codigo.ETAPAS.items() for c in arquivos if (n, c) not in vistos]
    assert not faltando, f'Arquivos de etapa sem bloco no HTML: {faltando}'
    final = max(codigo.ETAPAS)
    with zipfile.ZipFile(CHAPTER / 'apoio/api-completa.zip') as z, \
         zipfile.ZipFile(CHAPTER / 'apoio/api-inicio-cap13.zip') as inicio, \
         zipfile.ZipFile(ROOT / 'capitulos/12-spring-primeira-api/apoio/api-completa.zip') as cap12:
        assert inicio.read('api/pom.xml') == cap12.read('api/pom.xml'), 'ZIP de partida diferente do final do Cap 12'
        for nome in cap12.namelist():
            if nome.endswith('.java'): assert z.read(nome) == cap12.read(nome), f'Arquivo do Cap 12 alterado no ZIP final: {nome}'
        for caminho, src in codigo.estado(final).items():
            assert z.read(BASE + caminho).decode() == src, f'ZIP final divergente: {caminho}'
        assert z.read('api/pom.xml').decode() == codigo.pom(cap12.read('api/pom.xml').decode(), final)
    print(f'HTML: {len(page.ids)} IDs únicos, links válidos, {len(vistos)} blocos Java = codigo.py = checkpoints, ZIPs coerentes.', flush=True)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--integration', action='store_true'); parser.add_argument('--static-only', action='store_true')
    args = parser.parse_args()
    static_checks()
    if args.static_only: return
    env = os.environ.copy()
    if Path('/usr/libexec/java_home').exists(): env['JAVA_HOME'] = run(['/usr/libexec/java_home', '-v', '21'])
    java_bin = str(Path(env['JAVA_HOME']) / 'bin/java') if env.get('JAVA_HOME') else shutil.which('java')
    assert java_bin and '21.' in run([java_bin, '-version'])
    with tempfile.TemporaryDirectory(prefix='cap13-validation-') as temp:
        folder = Path(temp)
        with zipfile.ZipFile(CHAPTER / 'apoio/api-inicio-cap13.zip') as z: z.extractall(folder)
        project = folder / 'api'
        pom0 = (project / 'pom.xml').read_text(); props0 = (project / 'src/main/resources/application.properties').read_text()

        def etapa(n, extra=None):
            for caminho, src in {**codigo.estado(n), **(extra or {})}.items():
                alvo = project / 'src/main/java' / codigo.PACOTE / caminho; alvo.parent.mkdir(parents=True, exist_ok=True); alvo.write_text(src)
            (project / 'pom.xml').write_text(codigo.pom(pom0, n))
            (project / 'src/main/resources/application.properties').write_text(codigo.properties(props0, n))

        for n in codigo.ETAPAS:
            etapa(n); run(['mvn', '-q', '-DskipTests', 'compile'], cwd=project, env=env)
            print(f'Java 21: etapa {n}/{len(codigo.ETAPAS)} ({codigo.NOMES_ETAPAS[n]}) compila.', flush=True)
        # A versão com for, mostrada só para comparação na seção 06, também precisa compilar.
        com_for = codigo.SERVICE_2.replace('''        return produtos.stream()
                .map(produto -> ProdutoMapper.toResponse(produto))
                .toList();''', '''        List<ProdutoResponseDTO> respostas = new ArrayList<>();
        for (Produto produto : produtos) {
            respostas.add(ProdutoMapper.toResponse(produto));
        }
        return respostas;''').replace('import java.util.List;', 'import java.util.ArrayList;\nimport java.util.List;')
        assert com_for != codigo.SERVICE_2
        for f in (project / 'src/main/java' / codigo.PACOTE).rglob('*.java'):
            if f.name in ('TratadorDeErros.java',) or 'Cliente' in f.name: f.unlink()
        etapa(2, {'service/ProdutoService.java': com_for}); run(['mvn', '-q', '-DskipTests', 'compile'], cwd=project, env=env)
        print('Java 21: variante com for da seção 06 compila.', flush=True)
        if not args.integration: return

        dbport, apiport = free_port(), free_port(); name = 'cap13-check-' + str(os.getpid()); proc = None
        def docker(*a): return run(['docker', *a])
        def sql(q): return docker('exec', name, 'psql', '-U', 'gestorpro', '-d', 'gestorpro', '-At', '-v', 'ON_ERROR_STOP=1', '-c', q)

        def build_start(n):
            nonlocal proc
            for f in (project / 'src/main/java' / codigo.PACOTE).rglob('*.java'):
                rel = str(f.relative_to(project / 'src/main/java' / codigo.PACOTE))
                if rel not in codigo.estado(n) and rel.split('/')[0] in ('dto', 'mapper', 'exception') or (rel not in codigo.estado(n) and ('Produto' in rel or 'Cliente' in rel)):
                    f.unlink()
            etapa(n); run(['mvn', '-q', '-DskipTests', 'package'], cwd=project, env=env)
            log = open(folder / 'app.log', 'w')
            appenv = {**env, 'SPRING_DATASOURCE_URL': f'jdbc:postgresql://localhost:{dbport}/gestorpro', 'SERVER_PORT': str(apiport)}
            proc = subprocess.Popen([java_bin, '-jar', str(project / 'target/api-0.0.1-SNAPSHOT.jar')], env=appenv, stdout=log, stderr=log)
            log.close()
            for _ in range(120):
                if proc.poll() is not None: raise RuntimeError((folder / 'app.log').read_text()[-9000:])
                try:
                    if http(apiport, 'GET', '/fornecedores')[0] == 200: return
                except OSError: pass
                time.sleep(.5)
            raise RuntimeError((folder / 'app.log').read_text()[-9000:])

        def stop():
            nonlocal proc
            proc.terminate(); proc.wait(timeout=30); proc = None

        try:
            docker('run', '--name', name, '-e', 'POSTGRES_DB=gestorpro', '-e', 'POSTGRES_USER=gestorpro', '-e', 'POSTGRES_PASSWORD=gestorpro_local', '-p', f'127.0.0.1:{dbport}:5432', '-d', 'postgres:17')
            for _ in range(90):
                if subprocess.run(['docker', 'exec', name, 'pg_isready', '-U', 'gestorpro', '-d', 'gestorpro'], capture_output=True).returncode == 0: break
                time.sleep(.5)
            time.sleep(2)
            teclado = {'nome': 'Teclado Mecânico', 'preco': 320.00, 'estoque': 12, 'categoria': 'Periféricos'}

            # Encontro A · etapas 1 a 5
            build_start(1)
            s, forn = http(apiport, 'POST', '/fornecedores', {'nome': 'TechDistrib', 'cnpj': '12.345.678/0001-90', 'categoria': 'Eletrônicos', 'telefone': '(83) 3333-1000'})
            assert s == 201
            s, t = http(apiport, 'POST', '/produtos', teclado); assert s == 201 and t['id'] and t['criadoEm'] and set(t) == {'id', 'nome', 'preco', 'estoque', 'categoria', 'criadoEm'}
            s, m = http(apiport, 'POST', '/produtos', raw=json.dumps({'id': t['id'], 'nome': 'Mouse Gamer', 'preco': 89.90, 'estoque': 2, 'categoria': 'Periféricos', 'criadoEm': '2000-01-01T00:00:00'}))
            assert s == 201 and m['id'] != t['id'] and not m['criadoEm'].startswith('2000'), 'id/criadoEm enviados deveriam ser ignorados'
            assert sql(f"SELECT nome FROM produtos WHERE id={t['id']};") == 'Teclado Mecânico', 'POST com id sobrescreveu'
            assert http(apiport, 'POST', '/produtos', {'nome': 'X', 'preco': 10})[0] == 500, 'sem estoque deveria ser 500 antes da validação'
            assert sql("SELECT numeric_precision || ',' || numeric_scale FROM information_schema.columns WHERE table_name='produtos' AND column_name='preco';") == '10,2'
            stop(); build_start(5)
            s, lista = http(apiport, 'GET', '/produtos'); assert s == 200 and len(lista) == 2
            assert http(apiport, 'GET', f"/produtos/{t['id']}") == (200, lista[0])
            s, corpo = http(apiport, 'GET', '/produtos/99999'); assert s == 404 and 'message' not in corpo
            assert http(apiport, 'GET', '/produtos/abc')[0] == 400
            s, put = http(apiport, 'PUT', f"/produtos/{t['id']}", {'nome': 'Teclado Mecânico RGB', 'preco': 349.90, 'estoque': 10, 'categoria': 'Periféricos'})
            assert s == 200 and put['id'] == t['id'] and put['criadoEm'] == t['criadoEm'] and put['nome'] == 'Teclado Mecânico RGB', 'PUT deve preservar id e criadoEm'
            assert http(apiport, 'PUT', '/produtos/99999', teclado)[0] == 404
            assert http(apiport, 'DELETE', f"/produtos/{m['id']}") == (204, None)
            assert http(apiport, 'DELETE', f"/produtos/{m['id']}")[0] == 404
            s, lixo = http(apiport, 'POST', '/produtos', {'nome': '', 'preco': -5, 'estoque': 1}); assert s == 201, 'antes do @Valid o lixo entra'
            print('Integração A: id/criadoEm ignorados no POST, numeric(10,2), lista, 404 em GET/PUT/DELETE, PUT preserva criadoEm.', flush=True)

            # Encontro B · validação e tratador
            stop(); build_start(6)
            s, corpo = http(apiport, 'POST', '/produtos', {'nome': '  ', 'preco': -5}); assert s == 400 and set(corpo) == {'timestamp', 'status', 'error', 'path'}
            stop(); build_start(7)
            antes = sql('SELECT COUNT(*) FROM produtos;')
            s, corpo = http(apiport, 'POST', '/produtos', {'nome': '  ', 'preco': -5})
            assert s == 400 and corpo == {'nome': 'O nome é obrigatório', 'preco': 'O preço deve ser maior que zero', 'estoque': 'O estoque é obrigatório'}, corpo
            assert http(apiport, 'PUT', f"/produtos/{t['id']}", {'nome': 'ok', 'preco': 0, 'estoque': -1}) == (400, {'preco': 'O preço deve ser maior que zero', 'estoque': 'O estoque não pode ser negativo'})
            assert http(apiport, 'POST', '/produtos', {'nome': 'Cabo USB', 'preco': 15.00, 'estoque': 0})[0] == 201, 'estoque zero é permitido'
            assert sql('SELECT COUNT(*) FROM produtos;') == str(int(antes) + 1)
            s, corpo = http(apiport, 'GET', '/produtos/99999'); assert s == 404 and corpo['message'] == 'Produto não encontrado'
            print('Integração B1: 400 genérico na etapa 6, 400 campo a campo com o tratador, nada gravado, 404 com mensagem.', flush=True)

            # Etapa 8 · o caso real de quem esquece de esvaziar a tabela
            stop(); build_start(8)
            assert http(apiport, 'GET', '/produtos')[0] == 500, 'com produtos antigos a coluna NOT NULL não é criada'
            assert 'contains null values' in (folder / 'app.log').read_text()
            stop(); sql('DELETE FROM produtos;'); build_start(8)
            descricao = docker('exec', name, 'psql', '-U', 'gestorpro', '-d', 'gestorpro', '-c', '\\d produtos')
            assert 'FOREIGN KEY (fornecedor_id) REFERENCES fornecedores(id)' in descricao and '"fkje6bg3cu81l0e4nfprc0c7wwc"' in descricao, descricao
            s, p = http(apiport, 'POST', '/produtos', {**teclado, 'fornecedorId': forn['id']})
            assert s == 201 and p['fornecedorId'] == forn['id'] and p['fornecedorNome'] == 'TechDistrib'
            s, corpo = http(apiport, 'POST', '/produtos', {**teclado, 'fornecedorId': 99999}); assert s == 404 and corpo['message'] == 'Fornecedor não encontrado'
            assert http(apiport, 'POST', '/produtos', teclado) == (400, {'fornecedorId': 'O fornecedor é obrigatório'})
            assert http(apiport, 'POST', '/produtos', {'nome': 'Mouse', 'preco': -5, 'estoque': 1, 'fornecedorId': 99999})[0] == 400, 'a porta barra antes do Service'
            s, lista = http(apiport, 'GET', '/produtos'); assert s == 200 and lista[0]['fornecedorNome'] == 'TechDistrib' and 'cnpj' not in json.dumps(lista)
            assert http(apiport, 'DELETE', f"/fornecedores/{forn['id']}")[0] == 500
            assert 'violates foreign key constraint "fkje6bg3cu81l0e4nfprc0c7wwc" on table "produtos"' in (folder / 'app.log').read_text()
            print('Integração B2: coluna NOT NULL falha com dados antigos, FK criada, fornecedorNome, 404/400 do fornecedor, DELETE de fornecedor ligado = 500.', flush=True)

            # Etapa 9 · roteiro de aceite do Cliente (seção 14)
            stop(); build_start(9)
            ana = {'nome': 'Ana Souza', 'email': 'ana@gmail.com', 'telefone': '(83) 99999-1111', 'cidade': 'João Pessoa'}
            s, c1 = http(apiport, 'POST', '/clientes', ana); assert s == 201 and c1['id']
            s, c2 = http(apiport, 'POST', '/clientes', {**ana, 'id': c1['id']}); assert s == 201 and c2['id'] != c1['id']
            assert http(apiport, 'POST', '/clientes', {**ana, 'email': 'ana@'}) == (400, {'email': 'Informe um e-mail válido'})
            assert http(apiport, 'POST', '/clientes', {'email': 'x@y.com'}) == (400, {'nome': 'O nome é obrigatório'})
            assert http(apiport, 'GET', '/clientes')[0] == 200
            s, corpo = http(apiport, 'GET', '/clientes/99999'); assert s == 404 and corpo['message'] == 'Cliente não encontrado'
            s, c = http(apiport, 'PUT', f"/clientes/{c1['id']}", {**ana, 'cidade': 'Recife'}); assert s == 200 and c['id'] == c1['id'] and c['cidade'] == 'Recife'
            assert http(apiport, 'DELETE', f"/clientes/{c2['id']}") == (204, None)
            assert http(apiport, 'DELETE', f"/clientes/{c2['id']}")[0] == 404
            print('Integração Cliente: os 8 passos do roteiro de aceite da seção 14 conferem.', flush=True)
        finally:
            if proc and proc.poll() is None: proc.terminate(); proc.wait(timeout=30)
            subprocess.run(['docker', 'rm', '-f', name], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)


if __name__ == '__main__':
    main()
