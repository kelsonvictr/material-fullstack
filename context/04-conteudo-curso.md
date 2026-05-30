# 04 — Mapa de conteúdo (Frontend)

Arco completo (~9–10 capítulos), modular. O front parte do zero e **culmina consumindo a API
do backend** que o aluno já construiu (`../backend-fullstack` / `../projetos-fullstack/final`).

> Os slides antigos (5 aulas) são referência solta, NÃO roteiro. Modernizamos:
> sai Bootstrap/Node-na-marra → entra Vite + CSS Modules. Conteúdo refatorado e atualizado.

| # | Pasta | Capítulo | Núcleo |
|---|-------|----------|--------|
| — | `index.html` | **Hub / Intro** | Propaganda do que vão construir (o ERP) + como a web funciona + front × back × fullstack |
| — | `sobre/` | **Sobre o prof** | Bio, avatar, parede de logos (adaptado do iniciantes-v2) |
| 1 | `capitulos/01-html-css/` | **HTML & CSS** | Tags, semântica, estrutura de página, box model, Flexbox, "centralizar a div" |
| 2 | `capitulos/02-javascript/` | **JavaScript** | Variáveis, tipos, operadores, condicionais, funções, arrays, objetos |
| 3 | `capitulos/03-dom-eventos/` | **JS no navegador** | DOM, seletores, eventos, manipular a página, primeiro `fetch` |
| 4 | `capitulos/04-react-inicio/` | **React: início** | Por que React/SPA, Vite, componentes, JSX |
| 5 | `capitulos/05-react-props-css/` | **Props & estilo** | Props, listas (`map`), imagens (public/assets), CSS Modules |
| 6 | `capitulos/06-react-state/` | **Interatividade** | `useState`, eventos em React, formulários controlados |
| 7 | `capitulos/07-react-efeitos-dados/` | **Dados** | `useEffect`, fetch, json-server (mock da API) |
| 8 | `capitulos/08-react-router/` | **Navegação** | React Router DOM, SPA com várias páginas |
| 9 | `capitulos/09-integracao/` | **Integração real** | Axios, login/JWT, consumir a API Spring do ERP, deploy |

Desafios consolidados podem entrar entre capítulos (ex.: `Nb-desafios`), como no iniciantes-v2.

## Capítulos de abertura (criados)
- **`capitulos/00-o-que-e-fullstack/`** — visão geral antes do código: analogia do restaurante,
  torre da stack, jogo "Dev Run", ciclo de requisição, hype de backend. (aula 00, surreal)
- **`capitulos/00b-preparando-ambiente/`** — setup do VSCode + 5 extensões (Open Browser Preview,
  Material Icon Theme, ES7+ React snippets, Code Runner, Dracula) + organização de pastas (`code .`).

## Conceitos recuperados dos slides antigos (NÃO suprimir de novo)
Cap 1: HTML semântico (header/nav/main/section/article/footer), tabelas, formulários (login),
exercícios arquivo-por-arquivo no VSCode (estrutura → textos → listas → currículo), "PROGRAMAÇÃO É
PRÁTICA", animação de renderização (HTML → DOM → tela). Cap 2: história do JS (10 dias, Brendan Eich),
operadores completos (aritm./comp./lógicos/atrib.), `%` par-ou-ímpar, métodos de array, rastreador de
código, exercícios VSCode (media_aluno, par_ou_impar, cadastro). Hub: depoimentos de ex-alunos.
Pilares do front (HTML=estrutura, CSS=estilo, JS=interação). DOM fica forte no Cap 3.
**Aula 00: panorama de carreira/mercado/salários** (adaptado do cap 1 do iniciantes-v2) — níveis
júnior/pleno/sênior, exterior, home-office, faculdade, ranking de linguagens destacando que
**Java é o #1 mais bem pago** e JS também aparece (a stack fullstack Java+React = a mais valorizada).
Dados: Pesquisa Código Fonte TV 2025 (citar fonte sempre).

## Entregue / pendente
- [x] Fundação: `shared/` (com regra anti-ligadura + paleta front + Motion via `motion-fx.js`), `context/`, `CLAUDE.md`, `README.md`
- [x] Hub / Intro — com propaganda do ERP, mockup do dashboard, fluxo front↔back animado, memes
- [x] Sobre o prof — adaptado do iniciantes-v2 (6ª turma, ~200 formados, CTA p/ Cap 1)
- [x] Cap 1 — HTML & CSS (tags, esqueleto, box model, flexbox, BugZilla, olhinho, meme "centralizar a div")
      · **reforma 2026-05-30**: + teoria (anatomia da tag, aninhamento), animação **Forja de Tags**
      (substitui render-game), treino **encadeado** (`sobre-mim.html`), mini-browser em cada exercício
- [x] Cap 2 — JavaScript (variáveis, tipos, ===, funções/arrow, arrays/objetos, terminal animado, meme 0.1+0.2)
      · **reforma 2026-05-30**: treino **encadeado** construindo `boletim.js` passo a passo + mini-browser console
- [ ] Caps 3–9 (próximas sessões) — marcados como "🔒 em breve" no hub
- [x] Memes gerados: `meme-intro-fullstack.png`, `meme-css-centralizar.png`, `meme-js-soma.png`

## React — escopo confirmado pelo professor
Domínio: componentes, JSX, imagens public/assets, CSS Modules, json-server, useState,
useEffect, React Router DOM. (Detalhar a parte de React numa sessão de planejamento dedicada.)
</content>
