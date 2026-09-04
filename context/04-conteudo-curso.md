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
| 5b | `capitulos/05b-desafio-lanchonete/` | **5 Desafios: da Lanchonete ao Chefão** | Só prática (caps 4–5): 5 projetos do zero — lanchonete (guiada), CineDev (`&&`), Estante (ternário+Modules), DevViagens (imagens+flex), GameStore (chefão c/ `.length`) |
| 6 | `capitulos/06-react-state/` | **Interatividade** | `useState`, eventos em React, formulários controlados |
| 7 | `capitulos/07-react-efeitos-dados/` | **Dados** | `useEffect`, fetch, json-server (mock da API) |
| 8 | `capitulos/08-react-router/` | **Navegação** | React Router DOM, SPA com várias páginas |
| 9 | `capitulos/09-ia-agentes/` | **IA & Agentes** | Como LLMs/agentes funcionam, panorama (Claude Code/Codex/Antigravity), prompt=spec, ritual de revisão |
| 10 | `capitulos/10-projeto-gestor/` | **Projeto: GestorPRO** | Sistema de clientes/fornecedores/produtos: CRUD (axios post/put/delete), AGENTS.md, escada "na mão → junto → você comanda" — fecha o front |
| 11 | `capitulos/11-java-oo-basico/` | **Java & OO: a base antes do Spring** | A ponte pro backend (1 manhã): compilar/JVM, JDK 21 + IntelliJ, tipos, métodos, classe/objeto, construtor/this, private/getters/setters, ArrayList/for-each, ProdutoService em memória, quadro-ponte Java puro → Spring |

> **Mudança de mapa (2026-08-14):** o antigo "Cap 9 — Integração real (JWT/Spring/deploy)"
> **saiu do frontend** e migra para a metade backend (quando a turma construir a API).
> Caps 9–10 novos planejados em `09-plano-caps-09-10.md`.

Desafios consolidados podem entrar entre capítulos (ex.: `Nb-desafios`), como no iniciantes-v2.

> **Sequência HTTP/fetch/axios travada (2026-06-12)** — ver `07-sequencia-http-fetch-axios.md`:
> fetch só no Cap 3 (virando DOM), Caps 4–6 com mocks no shape do JSON da API do ERP,
> fetch no `useEffect` no Cap 7, axios só no Cap 9 (com JWT). Não antecipar.

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
      · **máquinas didáticas 2026-06-12**: Detector de Tipos 🃏, Túnel do IF 🚦, Rastreador
      com 2 programas (true E else), Máquina de Funções ⚙️, Trem do Array 🚂, +4 quizzes
      (const, %, quiz de saída) — ver decisão em `05-decisoes.md`
- [x] Cap 3 — JS no navegador (DOM) — ponte HTML↔JS, DOM (árvore), seletores, mudar a página
      (textContent/style/classList), eventos (addEventListener), primeiro `fetch` (só `.then()`),
      treino encadeado **Painel de Produtos**, BugZilla do DOM.
      · **reforma 2026-06-20 (turma nova, SEM backend prévio):** seção de fetch reescrita do zero —
      explica **API/servidor/requisição/resposta/endpoint/JSON** com a analogia do restaurante (a
      cozinha é de outra pessoa); usa **API pública real** `fakestoreapi.com` (não `localhost:8080`);
      backend enquadrado no **futuro** ("você vai construir"). Treino: "vira fetch **quando aprender
      back-end**" (não "Cap 7 / SUA API do ERP"). Ver decisão 2026-06-20 em `05-decisoes.md`.
      · **4 máquinas didáticas:** 🌳 Árvore do DOM, 🎯 Seletor ao vivo, 🖱️ Detector de Eventos,
      🧪 **API ao vivo** (`.apilab` — botão faz `fetch` REAL na fakestoreapi → acende 3 passos →
      mostra JSON → desenha cards; fallback gravado offline).
      · **4 videoclipes Remotion** embutidos: `jornada-fetch.mp4` (re-render s/ "SUA API"),
      `clique-dom.mp4`, **`o-que-e-api.mp4`** (WhatIsApi) e **`anatomia-json.mp4`** (JsonAnatomy).
      Player: **autoplay + loop + muted** (+ IO play/pause ao entrar/sair da tela).
      · Decisões travadas: fetch só `.then()` (async/await fica pra frente); hub e link do Cap 2 religados.
- [x] Cap 4 — React: o início (2026-06-20) — por que React (imperativo×declarativo) + SPA, setup
      Vite mão-na-massa (`npm create vite` → tour `src/` → limpar boilerplate), componentes (função
      Maiúscula que retorna JSX + `export default`), JSX (4 regras: 1 pai, `className`, tag fecha,
      `{ }`), **props já no Cap 4** (incl. desestruturação; texto `" "` × número `{ }`), BugZilla do
      React, treino encadeado **Mini-loja** (Vite → Cabecalho → CartaoProduto → props → array shape API).
      · **3 máquinas didáticas:** ⚖️ Na mão×React (linhas na mão vs 1 descrição), 🌳 Árvore de
      componentes, 🧪 HTML ou JSX? (5 rodadas: class/className, for/htmlFor, `{}`, style-objeto).
      · Decisões travadas: props entra no Cap 4 (Cap 5 = `.map()`+imagens+CSS Modules); array do
      passo 5 no shape da API "vira `.map()` no Cap 5, `fetch` no Cap 7". Sem Remotion/memes (ainda).
      · Hub religado (tirado `em-breve` do c04) e Cap 3 ganhou botão "Próximo: Cap 04".
      · **Reforma 2026-07-04 (mais conteúdo, nada removido):** seção "Por que React" ganhou
      "React é biblioteca" + quem usa (chips Instagram/Netflix/Nubank/iFood/ML); **NOVA seção 🔌
      "Como o React liga na página"** (`#engrenagem`, pós-Vite): index.html (a tomada `root` vazia)
      → main.jsx (o plugue, com `document.getElementById` = ponte Cap 3) → App.jsx + concept
      package.json (lista de compras)/node_modules (estante, não editar/não enviar) + **1º vídeo
      Remotion do cap** (`jornada-componente.mp4`, ComponentJourney.tsx) + **máquina 🔌 Corrente do
      React** (3 arquivos clicáveis + ▶ liga a corrente até o h1). JSX: + comentário `{/* */}`,
      `style={{}}` (2 chaves), warning "só expressão nas chaves, if não" (gancho Cap 5); jogo
      HTML-ou-JSX **5→10 rodadas**. Props: + **máquina 🎛️ Painel de Props** (inputs nome/preço +
      toggle aspas×chaves → frete "32015" texto × 335 número, erro visível) + concept **props são
      somente leitura** (gancho useState/Cap 6). Quiz intermediário novo (componente minúsculo) na
      seção Componentes. Treino **5→7 passos**: novo P5 solo "Rodapé da loja" (Rodape.jsx c/ props)
      e novo P7 solo "sinta a dor" (produtos[2] na mão → gancho .map()); casa: bônus prop emoji
      (o antigo bônus Rodape virou o P5). ~1120→1567 linhas.
- [x] Cap 5 — Listas & estilo (2026-06-20) — continua a Mini-loja do Cap 4. `.map()` (array→JSX, um
      card por item), prop **`key`** (`key={p.id}`, por que e o caso sem ela), **imagens** (public/ com
      `"/x.jpg"` × import de src/assets × o erro "sem import"), **CSS Modules** (`.module.css` +
      `import styles` + `className={styles.x}`, escopo/hash). BugZilla (key, map sem return, className
      com aspas, caminho de imagem). Treino encadeado: cards na mão→`.map()` → crescer array → imagem →
      CSS Module → grid vitrine; casa = selo `preco>=1000` (condicional `&&`).
      · **3 máquinas didáticas:** 🏭 Fábrica do `.map()` (array entra, cards saem; "+ produto" mostra
      código imutável), 🖼️ Onde mora a imagem? (public/import/sem-import com caso de erro visível),
      🎨 Escopo do CSS Module (global colide × module com hash isola).
      · Reintroduz a arrow `=>` (no `.map()`) ⇒ **aviso de IDE voltou** (`=>` pode virar `⇒`). NOTA: o
      título/pills do card 05 no hub foram trocados de "Props & estilo/props" para "Listas & estilo/
      map()/imagens" (props migrou pro Cap 4). Pasta segue `05-react-props-css/`. Sem Remotion/memes.
      · **Reforma 2026-07-04 (mais conteúdo, nada removido):** ponte explícita com o Cap 2 na seção
      .map() (par de code-blocks: `n * 2` × JSX — "mesma esteira, molde diferente") + **1º vídeo
      Remotion do cap** (`esteira-map.mp4`, MapAssemblyLine.tsx). Key: + **máquina 🔑 Guarda-volumes**
      (com key × sem key lado a lado; remover o 1º → pertences trocam de dono no lado sem key, console
      simulado com o warning). **NOVA seção 👻 "Mostrar ou esconder"** (`#condicional`, pós-CSS
      Modules): porteiro `&&` (selo 💎) + ternário `? :` (Disponível×Esgotado) + classe condicional
      (`className={cond ? styles.a : styles.b}`) + **máquina 🚦 Interruptor do JSX** (chips de preço +
      estoque → linha do código acende) + quiz + aviso IDE p/ `>=`. BugZilla: **+Bug 5** (`if` nas
      chaves). Treino **5→7 passos**: novo P5 solo "selo 💎 Premium com &&" (o antigo desafio de casa,
      agora com teoria dada), vitrine→P6, novo P7 solo "disponível ou esgotado?" (campo `emEstoque` +
      ternário + classe cinza); **casa NOVO** = contador `total={produtos.length}` no Cabecalho +
      bônus frete grátis (`&&`) e plural (ternário). ~919→1359 linhas.
      **⚠️ Decisão didática: renderização condicional (`&&`/ternário) agora é ensinada no Cap 5** —
      o Cap 6 (useState) pode assumir os dois porteiros como conhecidos.
- [x] Cap 05b — Desafio: a Lanchonete (2026-07-04) — capítulo SÓ de prática após o Cap 5 (padrão
      "Nb-desafios" do iniciantes-v2). Zero conceito novo: o aluno refaz o arco dos Caps 4–5 num
      tema novo (cardápio de lanchonete), **sozinho**, espelhando o exemplo trabalhado em sala
      (App + Cabecalho + CartaoProduto + TrabalhandoComImagens → aqui Banner/Cabecalho/CartaoLanche).
      6 passos solo encadeados (Vite do zero → **faxina com index.css e App.css VAZIOS** (conteúdo,
      não o arquivo!) → Cabecalho → CartaoLanche c/ 3 props → array `lanches` + `.map()`/`key` →
      Banner com imagem de public/ E import de src/assets). Novidade única: componentes na pasta
      **`src/components/`** (import `./components/X`, e `../assets/` sobe um nível no Banner).
      Quiz "prop fantasma" (campo faltando no array → `undefined` → card em branco, sem erro —
      pegadinha vivida em sala). Bônus casa: selo `&&` + CSS Modules. Sem máquinas/Remotion/memes
      (capítulo leve de propósito). Hub ganhou card 05b; botão "Próximo" do Cap 5 (que apontava pro
      Cap 6 inexistente) agora aponta pro 05b.
      · **Reforma 2026-07-16: virou "5 Desafios: da Lanchonete ao Chefão"** — a lanchonete
      permanece intacta como Desafio 1 (guiado ★) e ganhou 4 clientes novos, um degrau por vez:
      🎬 CineDev (★★, porteiro `&&` no selo ⭐ `nota >= 9`), 📚 Estante do Dev (★★, ternário +
      CSS Modules + classe condicional verde×cinza), ✈️ DevViagens (★★★, imagens public×import +
      `.vitrine` flex em `App.module.css`), 🎮 GameStore (★★★ chefão: tudo + `total={jogos.length}`
      no Cabecalho). Cada desafio = projeto Vite novo; D2–D5 têm pedido do cliente + checklist +
      mini-browser do resultado + olhinho com solução completa. Ver decisão 2026-07-16 em
      `05-decisoes.md`.
- [x] Cap 6 — Interatividade: useState & eventos (2026-07-25, spec em `08-plano-caps-06-07.md`) —
      eventos (`onClick` sem parênteses) → variável teimosa (a dor) → useState (placar do estádio +
      anatomia colorida + 2 vídeos) → 3 regras do estado → estado+porteiros → formulários
      controlados → "o estado mora no pai" (carrinho). **5 máquinas** (🎯 Clique Certo, 🧊 Variável
      Teimosa, 🔄 Ciclo do Estado c/ filme de fotos 📸, 👯 Gêmeos, 🪞 Input-Espelho), 1 playground
      react (🧪 Laboratório), treino encadeado 7 passos na Mini-loja (contador → filtro ao vivo →
      chefão carrinho) com **mini-browsers interativos**. ~1450 linhas.
- [x] Cap 7 — Dados de verdade: useEffect & fetch (2026-07-25) — loop infinito (a dor) →
      **anatomia useEffect(O QUE, QUANDO) + receita da moldura** (antídoto da confusão de sintaxe)
      → 3 modos do array → json-server (shape ERP, backend no futuro) → cerimônia "apague o const"
      → carregando/erro → faxina+async só citados. **5 máquinas** (🌀 Loop Infinito, 🧩 Montador,
      🎛️ Painel do useEffect, 🚚 Entrega ao Vivo, ⏳ Semáforo), 1 playground react (painel
      editável), treino 7 passos (db.json → console.log → document.title [busca] → apagar o const
      → loading → matar o servidor → chefão integração). ~1500 linhas. **4 vídeos HyperFrames
      entregues** (anatomia-usestate 12s, ciclo-do-estado 14s, anatomia-useeffect 14s,
      vida-do-componente 16s — 1920×1080/30fps, loop, sem áudio, paleta do material, posters no
      frame do payoff) renderizados de `tooling/hyperframes/` (scripts `render:*`, pin 0.7.45).
- [x] Cap 8 — Navegação (React Router) — entregue 2026-08-01 junto com a reforma do Cap 7
      (teoria de API do zero + axios no lugar do fetch). Ver `05-decisoes.md` (2026-08-01).
- [x] Cap 9 — IA & Agentes (2026-08-14) — entregue conforme `09-plano-caps-09-10.md`:
      5 máquinas (🔮 Próxima Palavra, 📦 Mesa de Contexto, 🔁 Loop do Agente, ⚖️ Vago×Spec,
      🕵️ Caça ao Intruso), setup Claude Code/Codex/Antigravity, prompt = mini-spec,
      ritual de revisão, treino em CÓPIA da Mini-loja. SEM vídeos ainda (render pendente:
      `loop-do-agente`, `proxima-palavra`). Testado no Chrome.
- [x] Cap 10 — Projeto GestorPRO (2026-08-14) — entregue conforme `09-plano-caps-09-10.md`:
      2 encontros (A: fundação + 4 verbos/CRUD + Clientes na mão · B: AGENTS.md +
      Fornecedores via prompts + Produtos "você comanda" + Dashboard chefão + formatura).
      3 máquinas (🗺️ GPS, 📮 Balcão do CRUD, 🕵️ Revisor de Plantão), 4 quizzes, escopo
      100% dentro da stack estudada (novidades: verbos HTTP, useNavigate, window.confirm —
      com teoria dedicada). Sem vídeos (candidato `quatro-verbos` pendente). Testado no
      Chrome. **FECHA a metade Frontend do curso.**
- [x] Memes gerados: `meme-intro-fullstack.png`, `meme-css-centralizar.png`, `meme-js-soma.png`,
      `meme-dom-mudei-tela.png` (Cap 3 — "EU MUDEI A TELA COM CÓDIGO")

## React — escopo confirmado pelo professor
Domínio: componentes, JSX, imagens public/assets, CSS Modules, json-server, useState,
useEffect, React Router DOM. (Detalhar a parte de React numa sessão de planejamento dedicada.)
</content>
