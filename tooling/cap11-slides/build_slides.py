#!/usr/bin/env python3
"""Gera quatro apresentações HTML locais a partir de roteiros JSON, sem dependências."""
import argparse
import json
from html import escape
from pathlib import Path
from urllib.parse import urlsplit

# Motor adaptado da skill slides-grupos-capitulo. Os assets de saída são a fonte local.
ASSETS = Path(__file__).resolve().parents[2] / 'capitulos/11-java-oo-basico/apresentacoes'
THEMES = ('investigacao', 'percurso', 'conselho', 'clinica')


def text(value):
    return escape(str(value), quote=True)


def safe_link(value):
    if urlsplit(value).scheme or value.startswith('//'):
        raise ValueError('Use caminhos relativos nos links ao capítulo.')
    return text(value)


def validate(data):
    for key in ('capitulo', 'voltar', 'topicos', 'grupos'):
        if not data.get(key):
            raise ValueError(f'Campo obrigatório: {key}')
    safe_link(data['voltar'])
    topics = data['topicos']
    if not isinstance(topics, dict) or any(not key for key in topics):
        raise ValueError('topicos deve ser um objeto com identificadores não vazios.')
    for topic in topics.values():
        if not topic.get('nome') or not topic.get('href'):
            raise ValueError('Cada tópico precisa de nome e href relativo.')
        safe_link(topic['href'])
    if len(data['grupos']) != 4:
        raise ValueError('Este gerador espera quatro grupos.')
    for number, group in enumerate(data['grupos'], 1):
        for key in ('titulo', 'papel', 'abertura', 'slides', 'fecho'):
            if not group.get(key):
                raise ValueError(f'Grupo {number}: falta {key}.')
        if group.get('tema', THEMES[number-1]) not in THEMES:
            raise ValueError(f'Grupo {number}: tema desconhecido.')
        covered = set()
        for slide in group['slides']:
            for key in ('topicos', 'titulo', 'ideia', 'pontos', 'pergunta'):
                if not slide.get(key):
                    raise ValueError(f'Grupo {number}: slide sem {key}.')
            if not isinstance(slide['topicos'], list) or not isinstance(slide['pontos'], list):
                raise ValueError('topicos e pontos de cada slide devem ser listas.')
            unknown = set(slide['topicos']) - set(topics)
            if unknown:
                raise ValueError(f'Grupo {number}: tópicos desconhecidos {sorted(unknown)}.')
            covered.update(slide['topicos'])
        missing = set(topics) - covered
        if missing:
            raise ValueError(f'Grupo {number}: faltam tópicos {sorted(missing)}.')
        for key in ('titulo', 'ideia', 'pergunta'):
            if not group['fecho'].get(key):
                raise ValueError(f'Grupo {number}: fecho sem {key}.')


def section(number, title, lead, points, question, eyebrow, notes='', links='', topics=(), kind=''):
    items = ''.join(f'<li>{text(point)}</li>' for point in points)
    help_html = ''
    if notes or links:
        help_html = f'<details class="notes"><summary>Apoio para preparar a fala</summary><div><p>{text(notes)}</p>{links}</div></details>'
    return f'''<section class="slide {kind}" id="slide-{number}" data-topics="{text(' '.join(topics))}" aria-labelledby="title-{number}">
<div class="slide-face"><p class="eyebrow">{text(eyebrow)}</p><div class="slide-content">
<div class="intro"><span class="topic-number" aria-hidden="true">{number:02d}</span><h2 id="title-{number}">{text(title)}</h2><p class="lead">{text(lead)}</p></div>
<ul class="arguments">{items}</ul><div class="defense"><span>O grupo explica</span><p>{text(question)}</p></div>
</div></div>{help_html}</section>'''


def render(data, group, number):
    theme = group.get('tema', THEMES[number-1])
    heading = f"{data['capitulo']} · Grupo {number:02d} · {group['papel']}"
    slides = [f'''<section class="slide cover" id="slide-1" aria-labelledby="title-1"><div class="slide-face">
<p class="eyebrow">{text(heading)}</p><div class="cover-body"><div><p class="cover-caption">{text(group.get('subtitulo', ''))}</p><h1 id="title-1">{text(group['titulo'])}</h1><p class="cover-description">{text(group['abertura'])}</p></div><div class="cover-number" aria-hidden="true">{text(group.get('destaque', f'{number:02d}'))}</div></div>
<p class="cover-footer">O capítulo inteiro, com palavras próprias. Dividam as falas e sustentem as respostas com exemplos.</p></div></section>''']
    titles = [group['titulo']]
    for index, slide in enumerate(group['slides'], 2):
        refs = [data['topicos'][key] for key in slide['topicos']]
        names = ' / '.join(ref['nome'] for ref in refs)
        notes = slide.get('apoio', ' '.join(ref.get('apoio', '') for ref in refs))
        links = '<ul>' + ''.join(f'<li><a href="{safe_link(ref["href"])}" target="_blank" rel="noopener">Rever {text(ref["nome"])} no capítulo ↗</a></li>' for ref in refs) + '</ul>'
        slides.append(section(index, slide['titulo'], slide['ideia'], slide['pontos'], slide['pergunta'], f'Grupo {number:02d} · {names}', notes, links, slide['topicos']))
        titles.append(slide['titulo'])
    closing = group['fecho']
    slides.append(section(len(slides)+1, closing['titulo'], closing['ideia'], closing.get('pontos', ['Qual conceito ou regra explica o exemplo?', 'Qual evidência sustenta a explicação?', 'Onde está o limite dessa conclusão?']), closing['pergunta'], f'Grupo {number:02d} · Defesa final', closing.get('apoio', ''), kind='closing'))
    titles.append(closing['titulo'])
    total = len(slides)
    options = ''.join(f'<option value="{i}">{i:02d} · {text(title)}</option>' for i, title in enumerate(titles, 1))
    return f'''<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="dark">
<title>Grupo {number} · {text(group['titulo'])} · {text(data['capitulo'])}</title><link rel="stylesheet" href="slides.css"><script src="slides.js" defer></script></head>
<body class="{theme}"><a class="skip-link" href="#slides">Ir ao slide</a>
<header class="toolbar"><a class="back" href="{safe_link(data['voltar'])}">← {text(data['capitulo'])}</a><span class="deck-label">Grupo {number:02d} · {text(group['papel'])}</span><div class="toolbar-actions"><button id="fullscreen" type="button" hidden>Tela cheia</button><button id="print" type="button" hidden>Imprimir</button></div></header>
<main id="slides" tabindex="-1" aria-label="Apresentação do grupo {number}">{''.join(slides)}</main>
<nav class="controls" aria-label="Navegação dos slides" hidden><button id="prev" type="button" aria-label="Slide anterior">← Anterior</button><div class="index"><label for="slide-index">Ir ao slide</label><select id="slide-index">{options}</select></div><span id="counter" aria-live="polite" aria-atomic="true">1 / {total}</span><button id="next" type="button" aria-label="Próximo slide">Próximo →</button></nav>
<div class="progress" role="progressbar" aria-label="Progresso da apresentação" aria-valuemin="1" aria-valuemax="{total}" aria-valuenow="1"><span style="width:{100/total:.3f}%"></span></div>
<p class="keyboard-hint">Use ← e → para navegar. Home volta ao início. End vai ao final. O apoio abre só quando você escolher.</p><p id="status" class="sr-only" role="status"></p><noscript><p class="nojs">Todos os slides estão visíveis. Ative JavaScript para navegar um por vez.</p></noscript></body></html>'''


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('conteudo', type=Path)
    parser.add_argument('destino', type=Path)
    parser.add_argument('--overwrite', action='store_true', help='Atualizar somente os quatro HTMLs e os dois assets deste gerador.')
    args = parser.parse_args()
    data = json.loads(args.conteudo.read_text(encoding='utf-8'))
    validate(data)
    outputs = {f'grupo-{i}.html': render(data, group, i) for i, group in enumerate(data['grupos'], 1)}
    outputs.update({name: (ASSETS/name).read_text(encoding='utf-8') for name in ('slides.css', 'slides.js')})
    existing = [name for name in outputs if (args.destino/name).exists()]
    if existing and not args.overwrite:
        parser.error('Saída existente. Confira as edições antes de usar --overwrite: ' + ', '.join(existing))
    args.destino.mkdir(parents=True, exist_ok=True)
    for name, content in outputs.items():
        (args.destino/name).write_text(content, encoding='utf-8')
    for i, group in enumerate(data['grupos'], 1):
        print(f'Grupo {i}: {len(group["slides"])+2} slides, {len(data["topicos"])} tópicos cobertos.')
    print('Confira a equivalência conceitual e integre os quatro links no capítulo.')


if __name__ == '__main__':
    main()
