# 05 — Log de decisões

## 2026-05-29 — Setup do projeto
1. **Material = metade Frontend** do curso Fullstack, modular, culminando na integração com a
   API do backend já ensinado. Alta referência: `programacao-iniciantes-v2`.
2. **Reaproveitar o design system** do iniciantes-v2 (`shared/*`), adaptando cores para as
   marcas do front (HTML/CSS/JS/React) e adicionando a regra anti-ligadura no topo.
3. **Arco completo (~9–10 caps)** — ver `04-conteudo-curso.md`.
4. **Animações:** Motion (motion.dev) via CDN como principal; Remotion pontual para
   videoclipes mais elaborados.
5. **Sem playground que executa no navegador.** Decisão do professor: **forçar o VSCode** — o
   aluno digita, salva e abre no navegador. Mantém código estático + olhinho 👀.
6. **Modernização do conteúdo:** sai Bootstrap e Node-na-marra (slides antigos); entra
   Vite + CSS Modules, dentro das skills do professor.
7. **Imagens:** logos oficiais em SVG + memes BR gerados via OpenAI, com aprovação prévia do
   professor (chave `OPENAI_API_KEY` no Keychain do macOS). Ver `06-imagens-e-memes.md`.
8. **SDD:** esta pasta `context/` é a memória viva — atualizar sempre.

## 2026-05-29 (tarde) — Revisão pós-feedback do professor
1. **Playground ao vivo ADICIONADO** (revertendo a decisão de "só VSCode"): componente reutilizável
   `shared/playground.js` + `playground.css`. Modo `web` (HTML+CSS → iframe) e `js` (console capturado
   via iframe sandbox). Já no Cap 1 e Cap 2. Continua incentivando refazer no VSCode pra fixar.
2. **Capítulo de abertura `00-o-que-e-fullstack`** criado — pedido p/ explicar "o que é fullstack" antes
   do HTML. Contém: analogia do restaurante, torre da stack (logos), **jogo "Dev Run"** (dev anda pelas
   stacks, movido a Motion), ciclo de requisição animado, hype de backend (Java/Spring/PostgreSQL/AWS).
3. **Memes realistas** (não mais cartoon infantil): pessoas reais, engraçados, meio ácidos, baseados em
   humor de dev. Gerados via `gpt-image-1` com prompt fotorrealista. 6 memes hoje.
4. **Material reflete o curso TODO** (não só front): hub e abertura mostram front+back+banco+nuvem, com
   logos de Java/Spring/PostgreSQL/AWS, deixando claro que ESTE material cobre a fatia Front.
5. **Logos oficiais locais** em `assets/svg/` (devicon) — conserta "ícone que some" e funciona offline.
   Regra anti-ligadura estendida a `textarea`/`.pg-code`/`.pg-console`.
6. **Motion visível**: o jogo Dev Run e o ciclo de requisição usam Motion de forma óbvia. Remotion ainda
   não usado (pipeline de vídeo pesado p/ o prazo) — candidato a videoclipes pré-renderizados depois.

## 2026-05-30 — Reforma dos Caps 1 e 2 (pedido do prof)
1. **Mais teoria de HTML antes da prática** no Cap 1: novas seções **"Anatomia de uma tag"**
   (diagrama rotulado: abertura/atributo/conteúdo/fechamento + void elements) e
   **"Aninhamento & indentação"** (bonecas russas + árvore + "última a abrir, primeira a fechar").
2. **Exercícios encadeados** (novo padrão): cada passo **continua o anterior**, construindo UM
   artefato (Cap 1 → `sobre-mim.html`; Cap 2 → `boletim.js`), alternando guiado → solo (com olhinho).
   Documentado em `02-padroes-didaticos.md`.
3. **Live Preview "mini-browser" read-only** (componente novo): renderiza o RESULTADO de cada
   exercício (modo `web` = iframe sandbox; modo `console` = saída estática). NÃO editável (preserva
   "digite no VSCode"). CSS em `components.css`, engine `initMiniPreviews` em `shared/scripts.js`.
   Documentado em `01-design-system.md`.
4. **Animação "Forja de Tags"** (`shared/tag-forge.js`): cada tag voa do editor pro navegador e vira
   o elemento real, com faíscas. 100% **Motion** (fallback estático). Substituiu o `render-game` inline.
   **Remotion descartado** (exige pipeline de vídeo/build, incompatível com site estático).
5. **Bug pré-existente corrigido**: resíduo `</content>` no fim de `shared/playground.js` (quebrava o
   JS no navegador → playgrounds não inicializavam) e de `playground.css`, Cap 1 e Cap 2. ⚠️ Ainda há
   `</content>` solto (inofensivo, após `</html>`) em `index.html`, `00-o-que-e-fullstack/` e
   `00b-preparando-ambiente/` — limpar quando tocar nesses arquivos.

## 2026-06-12 — Sequência HTTP/fetch/axios (véspera da aula do Cap 2)
1. **Não antecipar HTTP/REST/fetch para o Cap 2** (já é o cap mais denso; fetch depende de
   funções/assincronia e o payoff exige DOM). Em vez disso: **teaser ao vivo** no fim da aula
   (fetch de uma linha no console, ponte com o `@GetMapping` do backend) + opcional box
   "spoiler" no fim do Cap 2. Fetch para valer fica no Cap 3, virando DOM.
2. **Não antecipar axios para o início de React** — segue no Cap 9 com JWT/interceptors.
   Progressão: fetch vanilla (Cap 3) → fetch no `useEffect` (Cap 7) → axios (Cap 9).
3. **Caps 4–6 usam mocks com o shape exato do JSON da API do ERP**, rotulados "vira chamada
   de API no Cap 7" — resolve o "React de brinquedo" sem quebrar a cadeia de conceitos.
4. Princípio extraído: **cada ferramenta chega com a sua razão de existir** (dor antes do
   remédio). Análise completa em `07-sequencia-http-fetch-axios.md`.

## 2026-06-12 (noite) — "Máquinas didáticas" no Cap 2 (véspera da aula)
1. **Novo padrão: máquina didática** — todo conceito abstrato ganha um widget animado e
   interativo que torna o invisível visível. Implementados no Cap 2 (todos page-local, CSS no
   `<style>` da página + JS no módulo do rodapé; Motion via CDN quando carrega, **fallback
   100% funcional sem internet** — transições CSS + Web Animations nativas):
   - **🃏 Detector de Tipos** (`#typegame`, seção tipos): jogo de 5 rodadas classificando
     valores em string/number/boolean, com pegadinhas de aspas (`"42"`, `"false"`) e confete.
   - **🚦 Túnel do IF** (`#iftunnel`, condicionais): fluxograma vivo — aluno escolhe a média
     (9.5 / 7 / 4.2), bolinha desce, losango acende verde/vermelho, ramo vencedor pulsa,
     console imprime. Fios desenhados em SVG na hora (responsivo). Autoplay na viewport.
   - **🔬 Rastreador 2.0** (`#tracer`): ganhou abas — `aprovado.js` (caminho true) e
     `par_ou_impar.js` (com `%` e o bloco do if sendo PULADO pro else).
   - **⚙️ Máquina de Funções** (`#fmachine`, funções): número voa do botão pro funil
     (argumento), engrenagens giram mostrando `n = 5` (parâmetro), resultado cai pela rampa
     (return). Botões dobro(5)/dobro(8)/dobro(50).
   - **🚂 Trem do Array** (`#trainyard`, arrays): vagões com placa de índice 0-1-2,
     `frutas[5]` materializa vagão-fantasma 👻 undefined, `push("pera")` engata vagão novo
     com animação e pulso no length.
2. **+4 quizzes de fixação** (motor `.quiz` existente): const lacrada (variáveis),
   `10 % 3` (operadores), e **quiz de saída** `x[1]` no resumo (retrieval do índice 0).
3. **Correção de ligadura fora de `pre/code`**: `.tcline`/`.tconsole` (rastreador) e todos os
   novos widgets mono ganharam `font-variant-ligatures:none` locais — o `>=` do rastreador
   podia renderizar como `≥` (a regra global do `styles.css` não cobria essas classes).
4. Verificação: HTML balanceado (parser), `node --check` no módulo, render headless Chrome
   sem erros de console, screenshots de cada widget conferidos.

## 2026-06-17 — Cap 3 (DOM & eventos) + Remotion reativado
1. **Cap 3 construído** seguindo o padrão ouro do Cap 2 (analogia → código → visual → bora codar →
   BugZilla → treino encadeado → resumo). Fluxo: aquecimento → ponte HTML↔JS → DOM (árvore) →
   selecionar (`querySelector`) → mudar (`textContent`/`style`/`classList`) → eventos
   (`addEventListener`) → juntando tudo → primeiro `fetch` → BugZilla → treino → resumo (gancho React).
2. **Escopo do fetch travado em "só `.then()`"** (pedido do prof: "apenas JS básico pra chegar bem no
   React"). `async/await` é só citado ("a gente vê com calma mais pra frente"), não ensinado — coerente
   com a regra "cada ferramenta chega com sua razão de existir" (`07-…md`).
3. **3 máquinas didáticas novas** (mesmo padrão do Cap 2, page-local, fallback 100% sem internet):
   🌳 **Árvore do DOM** (`#domtree`, monta a árvore nó a nó; hover/clique acende a tag↔nó),
   🎯 **Seletor ao vivo** (`#selector`, escolhe `#id`/`.classe`/`tag`, acende os elementos numa página
   de mentira; o caso de ERRO `.preco` → 0 elementos é visível), 🖱️ **Detector de Eventos**
   (`#events`, botão real incrementa contador + input ecoa ao vivo, console simulado registra cada evento).
4. **⚠️ Remotion REATIVADO** (reverte o "descartado" de 2026-05-30). Reconciliação com o site estático:
   o Remotion roda em `tooling/remotion/` (projeto Node à parte, `node_modules` no `.gitignore`) e
   **renderiza `.mp4` + `.png` (poster) pré-prontos** em `assets/video/` — versionados. O HTML só consome
   `<video>`. Dois clipes: **`jornada-fetch.mp4`** (pacote navegador → sua API Spring → volta JSON → cards)
   e **`clique-dom.mp4`** (clique → `addEventListener` escuta → DOM muda). Render:
   `cd tooling/remotion && npm i && npm run render:fetch && npm run render:click` (+ `still:*` p/ posters).
   Paleta espelhada em `src/theme.ts`. Pipeline verificado (render headless, exit 0, posters conferidos).
5. **Meme aprovado e gerado:** `meme-dom-mudei-tela.png` ("EU MUDEI A TELA COM CÓDIGO", dev apontando pro
   navegador com contador). Colocado no fim da seção "Juntando tudo".
6. **Hub religado** (tirado `em-breve` do card Cap 3) e o rodapé do Cap 2 virou link real pro Cap 3.
7. Verificação: HTML balanceado (`<pre>` 14/14), ligaduras conferidas (nenhum `→`/`⇒`/`≥` em código;
   o único `⇒` é o aviso didático proposital), screenshots de todos os widgets/vídeos via Chrome headless.

## 2026-06-20 — Cap 4 (React: o início) + arranque do arco React
1. **Cap 4 construído** no padrão ouro. Fluxo: aquecimento → por que React (imperativo×declarativo,
   SPA) → Vite mão-na-massa → componentes → JSX → props → BugZilla → treino encadeado **Mini-loja**
   → resumo (gancho Cap 5). Decisões de escopo escolhidas pelo prof nesta sessão:
   - **Props ENTRA no Cap 4** (não fica só pro Cap 5). Logo o Cap 5 = `.map()` + imagens + CSS Modules.
   - **Setup Vite completo, mão na massa** (`npm create vite@latest` → React/JS → `npm install` →
     `npm run dev` → tour de `src/main.jsx`/`App.jsx`/`index.html` → limpar boilerplate). O 00b cobre
     só o VSCode; o Vite mora aqui e vira a base de TODOS os caps de React.
   - **Treino = Mini-loja em componentes** (Cabecalho + CartaoProduto, depois props). O array do
     passo 5 está no **shape exato da API do ERP**, rotulado "vira `.map()` no Cap 5 e `fetch` no Cap 7"
     (coerente com `07-…md`: mock no shape real, dor antes do remédio).
2. **3 máquinas didáticas novas** (page-local, fallback 100% sem internet, padrão Cap 2/3):
   ⚖️ **Na mão×React** (`#vsreact`, chips 1/5/20/50 produtos → linhas escritas na mão `n*3` vs "1
   descrição"; barras comparativas — motiva o declarativo), 🌳 **Árvore de componentes** (`#comptree`,
   monta App→Cabecalho/CartaoProduto, hover acende código↔nó; adaptada do domtree do Cap 3),
   🧪 **HTML ou JSX?** (`#jsxgame`, 5 rodadas classificando snippets: `class`→🚫, `className`→✅,
   `for`→🚫, `{expr}`→✅, `style="..."`→🚫; placar + reinício; reforça os 🐛 do BugZilla).
3. ~~Sem arrow functions no código do aluno~~ **REVISTO (ver "RAFCE/arrow" abaixo)** — componentes
   passaram a ser arrow functions (`const X = () => {}`) escritas via snippet rafce.
4. **Sem Remotion e sem memes** neste cap (nenhum aprovado/gerado). Candidatos futuros se o prof quiser.
5. **Hub religado** (tirado `em-breve` do card c04) e o resumo do **Cap 3 ganhou botão "Próximo: Cap 04 →"**.
6. Verificação: `<pre>` 18/18, sem `</content>`, sem `<` não-escapado, `node --check` no módulo OK,
   render headless Chrome confirmou os 3 widgets (`#vsreact`/`#comptree`/`#jsxgame`). Ligaduras: os
   únicos `→` são comentário CSS, setas decorativas da `.arena-track` (padrão Cap 3) e 1 em prosa.

## 2026-06-20 (continuação) — Cap 5 (Listas & estilo)
1. **Cap 5 construído** no padrão ouro, continuando a Mini-loja do Cap 4. Como props foi pro Cap 4,
   o Cap 5 ficou = **`.map()` + `key` + imagens + CSS Modules**. Fluxo: aquecimento → `.map()` →
   `key` → imagens → CSS Modules → BugZilla → treino encadeado → resumo (gancho Cap 6 useState).
2. **3 máquinas didáticas novas** (page-local, fallback sem internet):
   🏭 **Fábrica do `.map()`** (`#mapfactory`, array entra → cards saem; botão "+ produto" prova que o
   código não muda — paga a dor do "repetir na mão" do Cap 4), 🖼️ **Onde mora a imagem?** (`#imgwhere`,
   chips public/ × import × **sem import (erro visível)**), 🎨 **Escopo do CSS Module** (`#cssscope`,
   global colide `.titulo` × module vira `.titulo_a1b2` isolado).
3. **Arrow `=>` reaparece** (corpo do `.map()`) ⇒ **aviso de IDE reativado** (igual Cap 3): a fonte/IDE
   pode desenhar `⇒`, digite `=`+`>`. Todo `=>` em `<pre>` escapado como `=&gt;` (10 ocorrências); os
   `=>` crus do arquivo (24) são as arrow functions reais do `<script type="module">` — não escapar.
4. **Hub: card 05 retematizado.** Era "Props & estilo" / pills props·map()·CSS Modules; virou
   **"Listas & estilo"** / pills map()·imagens·CSS Modules (props agora é Cap 4). Pasta mantida
   `05-react-props-css/` (não renomear — quebra href). `em-breve` removido; Cap 4 ganhou botão "Próximo: Cap 05".
5. **Imagens no mini-browser** usam emoji (⌨️🖥️🪑) como placeholder — não há imagens de produto reais
   versionadas; o código didático referencia caminhos plausíveis (`/teclado.jpg`, `./assets/...`).
6. Verificação: `<pre>` 13/13, sem `=>` cru nem `<` não-escapado dentro de `<pre>`, sem `</content>`,
   `node --check` OK, render headless confirmou os 3 widgets. Sem Remotion/memes neste cap.

## 2026-06-20 — Turma NOVA não viu backend: fetch do Cap 3 ficou autossuficiente
> Pedido do prof: a turma atual é **nova** e **ainda não viu nada de backend** (a premissa
> "o aluno já construiu uma API Spring", base do `07-sequencia-http-fetch-axios.md`, **não vale**
> para ela). A seção de fetch do Cap 3 falava como se já tivessem visto API/REST/`@GetMapping`.

1. **Fetch agora explica tudo do zero**, sem assumir backend: novas peças didáticas para
   **API, servidor, requisição, resposta, endpoint e JSON** (analogia do restaurante reescrita —
   a cozinha é de outra pessoa; o aluno só "senta e pede").
2. **Enquadramento no FUTURO, não no passado.** Onde dizia "a SUA API que você construiu",
   "`@GetMapping`", "no backend você foi a cozinha", "no Cap 7 vira fetch na SUA API" → virou
   "**lá na frente, no módulo de back-end, VOCÊ vai construir** a sua própria API". Mantém o arco
   (o encontro front↔back continua sendo o clímax), só em tempo futuro.
3. **API pública REAL** no exemplo: `https://fakestoreapi.com/products` (CORS `*`, devolve array
   `[{id,title,price,...}]`). O aluno pode **abrir a URL e ver o JSON**. Campos `title`/`price`
   (inglês) — vira ponto didático ("cada API escolhe os nomes dos campos"; o array do treino é
   *seu*, então usa `nome`/`preco` em português).
4. **"Use e abuse de animações" (pedido do prof):** +2 clipes Remotion novos — **`o-que-e-api.mp4`**
   (WhatIsApi: requisição→servidor→resposta com vocabulário) e **`anatomia-json.mp4`** (JsonAnatomy:
   `[ ] { } "campo": valor` destacados um a um). + **máquina interativa "API ao vivo"** (`.apilab`):
   botão que faz um **fetch real** na fakestoreapi, acende os 3 passos, mostra o JSON e desenha cards
   (fallback gravado se a sala estiver sem internet).
5. **Player: autoplay + loop.** Todos os `.clip video` agora `autoplay loop muted playsinline`
   (+ IntersectionObserver: dão play ao aparecer, pausam ao sair da tela). Some o "ficar dando play".
6. **Remotion espelha o reframe:** `Browser.tsx` `ServerBox` deixou de ser "SUA API / Spring Boot /
   `@GetMapping`" → "🌐 SERVIDOR / uma API na internet / `GET /produtos`"; `FetchJourney` re-renderizado.
7. Verificação: `node --check` do módulo OK; `<pre>` 15/15 sem `=>`/`<` crus; tags balanceadas;
   fakestoreapi confirmada (200 + CORS). **Não rebaixar** o reframe se a turma seguinte já tiver backend
   — basta o enquadramento futuro virar "lembra que você construiu" de novo (1 passada de texto).

## 2026-06-20 — Convenção RAFCE / arrow functions (todo o arco React)
1. **Componentes React = arrow functions** (`const X = () => { return (...) }`), NÃO `function X() {}`.
   Decisão do prof: usar o snippet **`rafce`** da extensão *ES7+ React snippets* (já listada no Cap 00b)
   pra scaffold do componente — ele gera arrow + nome igual ao arquivo + `export default`. Vale Caps 4, 5
   e **todos os próximos** de React. (Reverte o item 3 da decisão do Cap 4 — "sem arrow no Cap 4".)
2. **Piada-mnemônico do prof:** rafce = **R**eact **A**rrow **F**unction **C**omponent **E**xport, "o
   **Rafael do Ceará**". Usar esse gancho ao apresentar o atalho (está no Cap 4, seção Vite + treino).
3. **Cap 4 reintroduz a arrow `=>`** (antes evitava) ⇒ **aviso de IDE devolvido** ao Cap 4 (a fonte/IDE
   pode desenhar `⇒`; digite `=`+`>`). Cap 5 já tinha o aviso (por causa do `.map()`).
4. **Nota sobre `import React`:** rafce pode inserir `import React from "react"` no topo; com Vite/React
   moderno é dispensável — material orienta a apagar (1 linha de tip, sem alarde).
5. Implementação: 14 defs convertidas no Cap 4 + 4 no Cap 5 (inclui a linha da máquina comptree).
   Verificado: `<pre>` 18/18 (cap4) e 13/13 (cap5), zero `=>`/`<` crus em `<pre>`, `⇒` só em aviso, widgets ok.

## Pendências reconhecidas
- Planejar em detalhe os **Caps 6–9** (React: state → efeitos/dados → router → integração).
  Caps 4 e 5 já fixaram o tom, o setup Vite base e a Mini-loja como artefato contínuo do arco React.
  **Seguir a convenção RAFCE/arrow** (acima) em todos eles.
- Sem busca full-text / sem progresso salvo (localStorage) — futuro, se necessário.
- Avaliar quando o Remotion realmente compensa (custo de pipeline vs. ganho didático).
</content>
