#!/usr/bin/env python3
"""Gera o Cap 13 a partir de uma fonte única.

Entrada:  tooling/cap13/codigo.py (código Java por etapa) + tooling/cap13/pagina-*.html (texto da página).
Saída:    capitulos/13-spring-dto-validacao/index.html, apoio/checkpoints/1..9 e os dois ZIPs.

Marcadores aceitos no template:
  <!--JAVA n caminho-->            arquivo Java completo da etapa n (linhas novas destacadas)
  <!--CODE lang|Título-->...<!--/CODE-->   bloco livre; o conteúdo é escapado e colorido aqui
  <!--PROPS n-->                   application.properties completo na etapa n
  <!--POMDEP-->                    dependência de validação do pom.xml
Rode depois: python3 tooling/validate-cap13.py
"""
from pathlib import Path
import difflib, html, io, re, shutil, sys, zipfile

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'tooling/cap13'))
import codigo  # noqa: E402

CHAPTER = ROOT / 'capitulos/13-spring-dto-validacao'
CAP12_ZIP = ROOT / 'capitulos/12-spring-primeira-api/apoio/api-completa.zip'
BASE = 'api/src/main/java/' + codigo.PACOTE

JAVA_KW = set('''package import public private protected class interface record enum return new static void
final if else throw throws extends implements for while this null true false try catch'''.split())
SQL_KW = set('''SELECT FROM WHERE ORDER BY DELETE INSERT INTO VALUES UPDATE SET JOIN ON AS AND OR NOT NULL
COUNT LIMIT'''.split())
BADGES = {'java': 'Java', 'json': 'JSON', 'sql': 'SQL', 'xml': 'XML', 'properties': 'Properties',
          'http': 'HTTP', 'terminal': 'Terminal', 'texto': 'Texto', 'js': 'JavaScript'}


def esc(text):
    return html.escape(text, quote=False)


def span(cls, text):
    return f'<span class="{cls}">{esc(text)}</span>'


TOKEN_JAVA = re.compile(r'(//[^\n]*)|("(?:\\.|[^"\\])*")|(@\w+)|(\b\d+(?:\.\d+)?\b)|(\b[A-Za-z_]\w*\b)')


def hl_java(src):
    out, pos = [], 0
    for m in TOKEN_JAVA.finditer(src):
        out.append(esc(src[pos:m.start()]))
        com, st, ann, num, word = m.groups()
        if com: out.append(span('cm', com))
        elif st: out.append(span('st', st))
        elif ann: out.append(span('attr', ann))
        elif num: out.append(span('num', num))
        elif word in JAVA_KW: out.append(span('kw', word))
        elif word[0].isupper(): out.append(span('tp', word))
        else: out.append(esc(word))
        pos = m.end()
    out.append(esc(src[pos:]))
    return ''.join(out)


TOKEN_JSON = re.compile(r'("(?:\\.|[^"\\])*")|(-?\b\d+(?:\.\d+)?\b)|\b(true|false|null)\b')


def hl_json(src):
    out, pos = [], 0
    for m in TOKEN_JSON.finditer(src):
        out.append(esc(src[pos:m.start()]))
        st, num, kw = m.groups()
        out.append(span('st', st) if st else span('num', num) if num else span('kw', kw))
        pos = m.end()
    out.append(esc(src[pos:]))
    return ''.join(out)


TOKEN_SQL = re.compile(r"(--[^\n]*)|('(?:[^'])*')|(\b\d+\b)|(\b[A-Za-z_]\w*\b)")


def hl_sql(src):
    out, pos = [], 0
    for m in TOKEN_SQL.finditer(src):
        out.append(esc(src[pos:m.start()]))
        com, st, num, word = m.groups()
        if com: out.append(span('cm', com))
        elif st: out.append(span('st', st))
        elif num: out.append(span('num', num))
        elif word in SQL_KW: out.append(span('kw', word))
        else: out.append(esc(word))
        pos = m.end()
    out.append(esc(src[pos:]))
    return ''.join(out)


def hl_xml(src):
    return re.sub(r'(&lt;/?[\w.-]+&gt;)', r'<span class="kw">\1</span>', esc(src))


def hl_properties(src):
    linhas = []
    for linha in src.split('\n'):
        if '=' in linha:
            k, v = linha.split('=', 1)
            linhas.append(span('attr', k) + '=' + esc(v))
        else:
            linhas.append(esc(linha))
    return '\n'.join(linhas)


HL = {'java': hl_java, 'json': hl_json, 'sql': hl_sql, 'xml': hl_xml, 'properties': hl_properties}


def highlight(lang, src):
    return HL.get(lang, esc)(src)


def destacar_novas(src, anterior):
    """Colore o código e envolve em <span class="novo"> as linhas que mudaram em relação à etapa anterior."""
    linhas = src.rstrip('\n').split('\n')
    novas = set()
    if anterior is not None:
        antigas = anterior.rstrip('\n').split('\n')
        for tag, _, _, j1, j2 in difflib.SequenceMatcher(a=antigas, b=linhas, autojunk=False).get_opcodes():
            if tag in ('insert', 'replace'):
                novas.update(range(j1, j2))
    saida = []
    for i, linha in enumerate(linhas):
        colorida = hl_java(linha)
        saida.append(f'<span class="novo">{colorida}</span>' if i in novas and linha.strip() else colorida)
    return '\n'.join(saida), bool(novas)


def bloco(titulo, badge, corpo_pre, attrs='', nota=''):
    t = esc(titulo)
    return (f'<div class="code-block"><div class="code-header"><span class="filename">{t}</span>'
            f'<span class="lang-badge">{badge}</span><button type="button" class="copy-code" '
            f'aria-label="Copiar {html.escape(titulo)}">Copiar</button></div>'
            f'<pre{attrs}><code>{corpo_pre}</code></pre>{nota}</div>')


def java_block(n, caminho):
    atual = codigo.estado(n)[caminho]
    anterior = codigo.estado(n - 1).get(caminho) if n > 1 else None
    corpo, tem_novas = destacar_novas(atual, anterior)
    nota = ('<p class="code-note">Linhas com fundo verde: o que mudou nesta etapa. '
            'Substitua o arquivo inteiro.</p>') if tem_novas else ''
    return bloco(caminho, 'Java', corpo, f' data-stage="{n}" data-file="{caminho}"', nota)


def build_html(props0):
    partes = sorted((ROOT / 'tooling/cap13').glob('pagina-*.html'))
    page = ''.join(p.read_text() for p in partes)

    def code_sub(m):
        lang, titulo = m.group(1), m.group(2)
        src = m.group(3).strip('\n')
        return bloco(titulo, BADGES[lang], highlight(lang, src))
    page = re.sub(r'<!--CODE (\w+)\|([^>]*?)-->\n?(.*?)<!--/CODE-->', code_sub, page, flags=re.S)
    page = re.sub(r'<!--JAVA (\d+) ([\w/.]+)-->', lambda m: java_block(int(m.group(1)), m.group(2)), page)

    def props_sub(m):
        n = int(m.group(1))
        texto = codigo.properties(props0, n).rstrip('\n')
        return bloco('src/main/resources/application.properties', 'Properties', hl_properties(texto),
                     f' data-properties="{n}"')
    page = re.sub(r'<!--PROPS (\d+)-->', props_sub, page)
    dep = codigo.DEPENDENCIA_VALIDACAO.rstrip('\n').replace('\t', '    ')
    page = page.replace('<!--POMDEP-->', bloco('pom.xml · dentro de <dependencies>', 'XML', hl_xml(dep), ' data-pom'))
    sobra = re.findall(r'<!--(?:JAVA|CODE|PROPS|POMDEP)[^>]*-->', page)
    assert not sobra, f'Marcadores sem substituição: {sobra}'
    (CHAPTER / 'index.html').write_text(page)
    return page


def build_apoio():
    apoio = CHAPTER / 'apoio'
    apoio.mkdir(parents=True, exist_ok=True)
    cps = apoio / 'checkpoints'
    if cps.exists():
        shutil.rmtree(cps)
    for n in codigo.ETAPAS:
        for caminho, src in codigo.estado(n).items():
            alvo = cps / str(n) / caminho
            alvo.parent.mkdir(parents=True, exist_ok=True)
            alvo.write_text(src)
    shutil.copyfile(CAP12_ZIP, apoio / 'api-inicio-cap13.zip')
    final = max(codigo.ETAPAS)
    with zipfile.ZipFile(CAP12_ZIP) as origem:
        pom0 = origem.read('api/pom.xml').decode()
        props0 = origem.read('api/src/main/resources/application.properties').decode()
        buffer = io.BytesIO()
        with zipfile.ZipFile(buffer, 'w', zipfile.ZIP_DEFLATED) as destino:
            for info in origem.infolist():
                dados = origem.read(info.filename)
                if info.filename == 'api/pom.xml':
                    dados = codigo.pom(pom0, final).encode()
                elif info.filename == 'api/src/main/resources/application.properties':
                    dados = codigo.properties(props0, final).encode()
                destino.writestr(info, dados)
            for caminho, src in sorted(codigo.estado(final).items()):
                info = zipfile.ZipInfo(BASE + caminho, date_time=(2026, 10, 9, 12, 0, 0))
                info.external_attr = 0o644 << 16
                destino.writestr(info, src, zipfile.ZIP_DEFLATED)
        (apoio / 'api-completa.zip').write_bytes(buffer.getvalue())
    return props0


if __name__ == '__main__':
    CHAPTER.mkdir(parents=True, exist_ok=True)
    props0 = build_apoio()
    pagina = build_html(props0)
    print(f'OK: index.html ({len(pagina) // 1024} KB), {len(codigo.ETAPAS)} checkpoints e 2 ZIPs gerados em {CHAPTER.relative_to(ROOT)}')
