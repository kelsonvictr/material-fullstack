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

## 2026-07-04 — Reforma dos Caps 4 e 5 ("estava pobrinho")
1. **Motivo:** prof achou os Caps 4/5 magros vs Caps 1–3 (menos teoria, sem vídeo, treino curto).
   Regra da reforma: **só acrescentar, nada remover**. Detalhe por cap em `04-conteudo-curso.md`.
2. **Condicional antecipada pro Cap 5** (decisão do prof): `&&` + ternário ganharam seção própria
   ("👻 Mostrar ou esconder", pós-CSS Modules) — corrigiu o buraco do desafio de casa que usava `&&`
   sem ensinar. **Cap 6 pode assumir os dois porteiros como sabidos.** Vocabulário fixado: "porteiro"
   (`&&` = mostrar-ou-nada; ternário = isto-ou-aquilo; `if` não entra nas chaves → Bug 5 do BugZilla).
3. **Remotion chegou ao arco React:** `ComponentJourney.tsx` → `assets/video/jornada-componente.mp4`
   (Cap 4, seção 🔌) e `MapAssemblyLine.tsx` → `esteira-map.mp4` (Cap 5, seção .map()). Scripts
   `render:journey`/`still:journey` (frame 290) e `render:map`/`still:map` (frame 300). Player padrão
   autoplay+loop+muted + bloco IO play/pause copiado do Cap 3 pros dois caps (CSS `.clip` local também).
4. **Buraco didático fechado no Cap 4:** aluno agora entende `npm install`/`package.json`/
   `node_modules` (lista de compras/estante) e o main.jsx (tomada+plugue, ponte com o
   `getElementById` do Cap 3) — nova seção `#engrenagem`, sem pedir pra editar o arquivo.
5. **4 máquinas novas** na receita de `02-padroes-didaticos.md` (input do aluno, erro visível,
   IO+botão, funciona offline): 🔌 Corrente do React, 🎛️ Painel de Props (aspas×chaves → frete
   "32015" texto × 335 número), 🔑 Guarda-volumes (key: pertences trocam de dono sem key),
   🚦 Interruptor do JSX. Classes mono novas adicionadas à regra local de ligatures de cada cap.
6. **Treinos com 7 passos** nos dois caps (novos solos: Rodapé/sinta-a-dor no 4; selo-&&/
   esgotado-ternário no 5). Desafios de casa re-balanceados (selo Premium subiu pra aula; casa do
   5 virou contador com `produtos.length`; bônus Rodape do 4 virou o P5 e o bônus novo é prop emoji).
7. Sem memes nesta rodada (decisão do prof). Jogo HTML-ou-JSX do Cap 4 foi de 5→10 rodadas.

## 2026-07-04 — Cap 05b: capítulo-desafio "a Lanchonete" (só prática)
1. **Motivo:** o prof trabalhou em sala um exemplo completo (App com array + `.map()`, Cabecalho,
   CartaoProduto com 3 props, componente de imagens public×import) e pediu um capítulo para os
   alunos **repetirem o arco sozinhos num exemplo novo**. Estreia o padrão "Nb-desafios" previsto
   no mapa: pasta `05b-desafio-lanchonete`, numeração 05b (não rouba o 06, que segue planejado).
2. **Formato de capítulo-desafio fixado:** zero conceito novo; hero + missão (com estrutura de
   pastas e mini-browser do resultado final ANTES de começar) + regras (tentar primeiro / consultar
   caps anteriores não é cola / ler a mensagem de erro) + tabela "arsenal" (skill → onde revisar) +
   passos TODOS `.exercise.solo` com dica → PARE → 👀 + bônus pra casa. Sem máquinas/vídeo — leve.
3. **Faxina de CSS virou passo formal:** apagar o CONTEÚDO de `index.css` e `App.css` (deixar
   vazios, nunca deletar os arquivos — o import quebra e dá tela branca). Resultado "cru/feio" é
   apresentado como sinal de sucesso da faxina.
4. **Pasta `src/components/` entra aqui** (única novidade tolerada): imports `./components/X` no
   App e o pulo do `'../assets/logo.png'` no Banner (sobe um nível). Caps 6+ podem assumir essa
   organização.
5. **Quiz "prop fantasma":** item do array sem o campo → prop `undefined` → JSX não desenha nada
   (card com buraco, sem erro) — pegadinha que apareceu no exemplo de sala.
6. Botão "Próximo" do Cap 5 redirecionado do Cap 6 (link quebrado, pasta não existe) para o 05b;
   o 05b fecha voltando pro hub ("Cap 06 vem aí").

## 2026-07-16 — Cap 05b vira "5 Desafios: da Lanchonete ao Chefão"
1. **Motivo:** o prof pediu que o 05b deixasse de ser um desafio único e virasse **5 desafios**
   na mesma pegada da lanchonete — mantendo a lanchonete e somando 4 — cobrindo SÓ o que foi
   visto de React até o Cap 5. Narrativa nova: "5 clientes de freela" (lanchonete, cinema,
   biblioteca, agência de viagens, loja de games), cards dos clientes + trilha na missão.
2. **Escada de habilidades (um degrau novo por desafio):**
   D1 🍔 Lanchonete (★ guiado, os 6 passos originais INTACTOS, agora dentro da seção `#d1`);
   D2 🎬 CineDev (★★) = mesmo arco + porteiro `&&` (selo ⭐ com `nota >= 9`);
   D3 📚 Estante do Dev (★★) = ternário no texto + CSS Modules + **classe condicional**
   (`.disponivel` verde × `.emprestado` cinza) + warning `disponivel="true"` com aspas é texto;
   D4 ✈️ DevViagens (★★★) = imagens pelos 2 caminhos + `App.module.css` com `.vitrine` flex
   (warning: App.module.css é NOVO, App.css da faxina segue vazio);
   D5 🎮 GameStore (★★★ chefão) = tudo junto + `Cabecalho` com prop `total={jogos.length}`.
3. **Formato dos desafios 2–5** (mais enxuto que o D1 guiado): analogy "pedido do cliente" →
   drill-tags → checklist "o que entregar" → mini-browser do resultado → UM `.exercise.solo`
   com dica (referencia a seção exata dos Caps 4–5) → PARE → 👀 com solução completa
   (todos os arquivos) + tip de teste ("mude a nota e veja o selo sumir"). Cabecalho fica
   "por sua conta" nos D3/D4 de propósito (repetição espaçada).
4. **Cada desafio = projeto Vite NOVO** (regra 1 do capítulo): criar+faxinar 5× até virar reflexo.
5. Bônus pra casa mantidos (selo 🔥 e CSS Modules na lanchonete), reposicionados como "volta no
   Desafio 1 e tempera" — termômetro de fixação após D2–D5. Conferência final e card do hub
   atualizados. Pasta segue `05b-desafio-lanchonete/` (links preservados).

## 2026-07-25 — Caps 6 (useState) e 7 (useEffect) + playground React + mini-browser interativo

Sessão planejou (spec em `08-plano-caps-06-07.md`) e entregou os dois capítulos no mesmo dia.

1. **Cap 06 (`06-react-state/`, "Interatividade: useState & eventos")** — arco: eventos
   (`onClick={f}` sem parênteses, "receita não bolo") → dor da variável teimosa (`let` muda,
   tela não) → useState (analogia do **placar do estádio**; anatomia colorida da linha) →
   **3 regras do estado** (só pelo set · set não é imediato/📸 · cada componente tem a sua
   memória) → estado+porteiros (payoff Cap 5, zero conteúdo novo) → formulários controlados
   (input com crachá) → **"o estado mora no pai"** (carrinho; sem o jargão "lifting"). 5 máquinas:
   🎯 Clique Certo (onClick errado dispara SOZINHO na renderização), 🧊 Variável Teimosa (a dor é
   a máquina; toggle refaz com useState), 🔄 Ciclo do Estado (máquina-mor: esteira + FILME de
   fotos 📸 empilhando — prepara a regra 2 e o Cap 7), 👯 Gêmeos (memórias independentes),
   🪞 Input-Espelho (toggle "tirar o onChange" = campo congelado). Treino 7 passos: contador →
   zerar/não-negativo → qtd por card → curtir ❤️ → busca controlada → **filtro ao vivo** (UAU) →
   chefão 🛒 carrinho no Cabecalho. Casa: plural + limpar (função desce!) + modo escuro.
2. **Cap 07 (`07-react-efeitos-dados/`, "Dados de verdade: useEffect & fetch")** — arco: dor
   primeiro (🌀 loop infinito, ponte direta com a esteira de fotos do Cap 6) → **anatomia
   useEffect(O QUE, QUANDO)** com a **receita da moldura** (1 moldura → 2 função → 3 vírgula+array
   → 4 corpo; mnemônico fixo do capítulo, cores consistentes função=ciano/array=amarelo em TODOS
   os blocos e máquinas) → 3 modos do array → json-server ("cozinha de treino"; ponte Cap 3 em 3
   linhas; shape do ERP; enquadramento futuro p/ turma sem backend) → **cerimônia "apague o
   const"** (padrão canônico de 3 passos) → carregando/erro (porteiros) → concept-box faxina +
   async/await (só citação; .then segue, decisão de 2026-06-12 mantida). 5 máquinas: 🌀 Loop
   Infinito (contador de renders acelerando + extintor useEffect), 🧩 Montador (peças clicáveis
   na ordem da receita; erro mostra o que o React diria; confete), 🎛️ Painel do useEffect
   (máquina-mor: 3 modos × 3 provocações → LED + console), 🚚 Entrega ao Vivo (skeleton → 
   caminhão → JSON → cards; botão "desligar o servidor" = rota do erro), ⏳ Semáforo (3 cenários ×
   linha do porteiro que acende). Treino 7 passos: db.json+json-server → 1º useEffect console.log
   ([] × sem array) → `document.title` com `[busca]` (payoff visível do modo 3) → apagar o const →
   carregando → erro (matar o servidor de propósito) → chefão integração 5+6+7. Casa: emEstoque
   atravessando a stack + botão recarregar.
3. **Playground modo `react`** (novo, `shared/playground.js` + vendors em `shared/vendor/`):
   React 18 UMD + Babel standalone vendorizados (offline-first, ~3 MB, lazy). 1 Laboratório por
   cap (contador+espelho no 6; painel do useEffect editável no 7, com console capturando os
   efeitos). Regra "forçar o VSCode" preservada (labs vêm DEPOIS do exercício digitado).
   ⚠️ corrigida de tabela a ligadura no editor: `.pg-code` não desativava ligatures (=> virava ⇒).
4. **Mini-browser interativo** (`data-mp="js"` + `data-h`): prévia com `allow-scripts` — nos
   treinos de estado o resultado É clicável (contador, filtro, carrinho). Ver `01-design-system.md`.
5. **Vídeos: experimento HyperFrames** em `tooling/hyperframes/` (4 storyboards:
   `anatomia-usestate`, `ciclo-do-estado`, `anatomia-useeffect`, `vida-do-componente`; 16:9
   1920×1080 loop sem áudio, paleta do material, mp4+poster em `assets/video/`). Pipeline novo ao
   lado do Remotion; se a qualidade não bater, os storyboards portam pro Remotion.
6. **Fix compartilhado `motion-fx.js`:** versões novas do motion@11 (CDN) passam um
   IntersectionObserverEntry pro callback do `inView` → normalizado com `asEl()` (afetava todos
   os caps com `data-motion`, exceção silenciosa no console).
7. Hub: cards 06/07 destravados (pills novas; "CRUD" saiu do card 07 — não ensinamos CRUD lá);
   05b agora aponta "Próximo: Cap 06". Memes dos caps ainda **pendentes de aprovação**
   (Pikachu setContador / Anakin-Padmé fetch no useEffect).

## 2026-08-01 — Reforma do Cap 7 (teoria de API + axios) e Cap 8 (React Router) entregue

Pedido do professor: a turma **ainda não viu HTTP/REST/API** (o fetch do Cap 3 não aconteceu
na prática pra essa turma), então o Cap 7 não podia abrir já fazendo requisição.

1. **Cap 7 reordenado e reteorizado**: saiu o "Aquecimento" (quiz de abertura); o cap agora abre
   com **🌍 teoria de API do zero** (cliente/servidor/API-garçom/requisição/resposta + HTTP/GET +
   anatomia do endpoint + JSON + box REST), reusando os vídeos Remotion `o-que-e-api` e
   `anatomia-json` do Cap 3. Ordem nova: teoria → **json-server** (antes de qualquer React;
   "digitar endereço no navegador É um GET") → **axios** → "pra que serve o useEffect" (loop) →
   anatomia → 3 modos → apague o const → loading/erro. Box explícito: back-end verá HTTP/REST
   **em detalhes** na 2ª metade do curso.
2. **DECISÃO REVOGADA — axios antecipado do Cap 9 pro Cap 7** (revoga a decisão 4 de
   `07-sequencia-http-fetch-axios.md`): o professor preferiu **não ensinar fetch** ("mais fácil"
   pro iniciante: sem `res.json()`, um `.then` só, `res.data`). fetch virou apenas um box
   "você vai esbarrar por aí". Vídeo `vida-do-componente` re-renderizado (rótulo "fetch ⇄ JSON"
   → "axios ⇄ JSON"). No Cap 9 sobram JWT/interceptors/async-await sobre o axios já conhecido.
3. **Treino do Cap 7 mais guiado** (pedido: prof faz junto, poucos solo): 5 guiados
   (API no ar → 1º useEffect → npm i axios + pedido no console → apague o const → carregando) +
   2 solo com olhinho (erro `.catch`, chefão integração). Saiu o solo do `document.title`
   (o modo `[busca]` continua nas máquinas/lab; virou bônus de casa no Cap 8).
4. **Cap 8 — Navegação (React Router) criado** no mesmo padrão: dor (uma página só) →
   `npm i react-router-dom` + abraço do BrowserRouter → Routes/Route (anatomia "path=QUANDO,
   element=O QUE", ecoando o mnemônico do useEffect) → Link vs `<a>` → `/produtos/:id` +
   useParams + axios por id (`[id]` = modo 3 aplicado) → rota curinga 404. **3 máquinas novas**:
   🗺️ GPS das Rotas (2 instâncias, sem e com curinga), ⚓×🔗 Duelo de Navegação (carrinho zera
   no reload), 🎯 Leitor de Placas (useParams devolve TEXTO). Treino: 4 guiados + 2 solo
   (404, chefão tour sem F5) + casa (/contato + document.title na Detalhes). Novidade honesta
   e assumida: porteiro `if (!produto) return ...` (early return, apresentado como if+return
   do Cap 2). Sem vídeos novos (só máquinas).
5. Hub: card 07 atualizado (pills API & HTTP/useEffect/axios), card 08 destravado
   (pills Routes/Link/useParams). Botão final do Cap 7 agora aponta pro Cap 8.

## 2026-08-14 — Planejamento dos Caps 9 (IA & Agentes) e 10 (Projeto GestorPRO)

Sessão de planejamento com o professor. A partir do Cap 9 o curso introduz **agentes de
codificação** — como formação de engenheiro (especificar + revisar), não "vibe coding".
Spec completa em `09-plano-caps-09-10.md`. Decisões travadas:

1. **Dois capítulos**: Cap 09 (`09-ia-agentes/`) = super aula de IA/agentes (LLM = próxima
   palavra, contexto/alucinação, loop do agente, panorama de mercado, prompt = mini-spec,
   ritual de revisão) · Cap 10 (`10-projeto-gestor/`) = projeto que **fecha o front**:
   sistema de clientes/fornecedores/produtos (nome proposto: GestorPRO, a confirmar).
2. **Ferramenta livre, Claude Code recomendado** — teoria agnóstica; setup de 2–3
   ferramentas lado a lado (Claude Code / Codex / Antigravity); o fluxo ensinado
   (prompt → diff → revisão) vale para todas.
3. **O antigo "Cap 9 — Integração real" (JWT/Spring/deploy) saiu do mapa do frontend**
   e migra para a metade backend. Mapa do `04-conteudo-curso.md` atualizado.
4. **Escada didática do projeto**: módulo Clientes NA MÃO (gabarito mental) → Fornecedores
   JUNTO com o agente (prompts-spec + ritual de revisão; a revisão guiada do PUT é a aula
   de PUT) → Produtos VOCÊ COMANDA (aluno escreve os prompts; olhinho = prompt de
   referência) → chefão Dashboard. Alunos escrevem o **AGENTS.md do projeto** com o prof
   ("só o que estudamos" vira engenharia de contexto, não torcida).
5. **Novidades técnicas permitidas** (honestas e assumidas): axios.post/put/delete (CRUD),
   useNavigate, pasta `src/pages/`, `window.confirm`, tabelas nas listas. Continua fora:
   fetch, async/await, JWT, libs extras, git (turma sem git — cópias de pasta com box
   "no mercado é git, vem na metade backend").
6. **Regra de ouro do arco**: nunca aceitar diff que não consegue explicar em voz alta.
   "Forçar o VSCode" evolui: o aluno digita a Fase 1 inteira, os prompts e as correções.
7. Vídeos candidatos (pipeline HyperFrames/Remotion): `loop-do-agente` (flagship),
   `proxima-palavra` (Cap 9), `quatro-verbos` (Cap 10). Memes listados aguardam aprovação.

## 2026-08-14 (continuação) — Cap 9 (IA & Agentes) ENTREGUE

Produzido na mesma sessão do planejamento, seguindo a spec `09-plano-caps-09-10.md`.
Ajuste pragmático (precedente dos Caps 4/5/8): **entregue sem os vídeos** — as máquinas
cobrem o conteúdo; `loop-do-agente.mp4` e `proxima-palavra.mp4` ficam para sessão de render.

1. `capitulos/09-ia-agentes/index.html` (~1180 linhas): aquecimento (por que aprender na mão)
   → 🔮 LLM (próxima palavra, tokens) → 📦🤯 mesa de contexto & alucinação → 🦾 loop do agente
   + analogia-mor do estagiário genial → 🗺️ panorama (Claude Code ⭐ recomendado, Codex,
   Antigravity/Gemini CLI, Copilot, Cursor) → 🛠️ setup por ferramenta (togglers; aviso de que
   comandos/planos mudam) → ✍️ prompt = mini-spec (4 ingredientes: CONTEXTO/TAREFA/RESTRIÇÕES/
   ACEITE) → 👀 ritual de revisão ①–⑤ → BugZilla da era dos agentes → treino → resumo.
2. **5 máquinas novas:** 🔮 Próxima Palavra (3 corridas; a 3ª quase-alucina o `useFetch`) ·
   📦 Mesa de Contexto (a regra "use CSS Modules" cai da mesa) · 🔁 Loop do Agente
   (máquina-mor; pedido claro com erro autocorrigido × pedido vago que "termina feliz"
   reescrevendo 14 arquivos) · ⚖️ Prompt Vago × Spec · 🕵️ Caça ao Intruso (diff com 3
   violações clicáveis). Todas offline-first, ligatures OFF nos textos mono locais.
3. **Treino (5 passos + casa)** sobre CÓPIA da Mini-loja (`mini-loja-com-agente`; box "sem
   git — cópia de pasta"): P1 explicar o projeto · P2 tutor do useEffect · P3 primeira edição
   com prompt-spec (Rodape) + ritual no telão · P4 solo A/B vago×spec (selo 🔥 Promoção,
   `&&` do Cap 5) · P5 chefão sabotagem (key + import axios; agente só diagnostica, aluno
   conserta). Casa: sabatina com o agente + test-drive de 2ª ferramenta. Novo padrão de
   code-block: badge **PROMPT** (`.lang-badge.prompt`) para prompts.
4. Hub: card 09 destravado (pills LLM/agentes/prompt & revisão), **card 10 GestorPRO
   "em breve"** criado (`capitulos/10-projeto-gestor/`); card antigo "09 integração" removido.
   Cap 8: gancho do resumo reescrito (era "integração real") e botão "Próximo: Cap 09 — IA &
   Agentes" ativo. Limpo o `</content>` solto do hub (pendência antiga).
5. **Testado no Chrome** (servidor estático local): 5 máquinas exercitadas de ponta a ponta,
   quizzes, console sem erros. Fix durante o teste: chips do loop acendem só os passos
   VISITADOS (o ❌ erro não acende no cenário vago).
6. Memes do cap: ainda pendentes de aprovação (ideias na spec). Vídeos: pendentes de render.
7. **Comandos de instalação verificados na internet (2026-08-14, pedido do prof) +
   DECISÃO: npm-first onde existir** (alunos já dominam npm/Node desde o Cap 4):
   · **Claude Code**: material ensina `npm install -g @anthropic-ai/claude-code` (pacote npm
     segue oficial/suportado; Node 22+; NÃO auto-atualiza → nota do `@latest`). O caminho
     "recomendado" da Anthropic desde jan/2026 é o instalador nativo via curl (auto-atualiza) —
     citado como alternativa no material. Exige plano pago (Pro+) ou API key — free do
     claude.ai NÃO inclui (fonte: code.claude.com/docs/en/setup).
   · **Codex**: `npm install -g @openai/codex` (Node 22+; alerta no material: `codex` sem
     escopo é pacote de 2012 sem relação com a OpenAI).
   · **Antigravity**: o Gemini CLI foi SUBSTITUÍDO pelo **Antigravity CLI** (comando `agy`)
     em jun/2026, e ele **NÃO existe no npm** (binário compilado) —
     `curl -fsSL https://antigravity.google/cli/install.sh | bash` /
     `irm https://antigravity.google/cli/install.ps1 | iex`; editor em antigravity.google.
     Material explica o porquê ("não mora no npm") + nota anti-tutorial-velho do gemini-cli.
   · Box novo na seção 🛠️: conferir `node -v` (precisa 22+) antes dos installs via npm.
   ⚠️ Re-conferir tudo na SEMANA da aula — esse mercado muda de mês em mês.

## 2026-08-14 (continuação 2) — Cap 10 (Projeto GestorPRO) ENTREGUE

Produzido conforme `09-plano-caps-09-10.md`, com pedido reforçado do prof: **cuidado extremo
de escopo** ("somente com o que estudamos; novidade só com teoria de qualidade").

1. `capitulos/10-projeto-gestor/index.html` (~1750 linhas), estruturado em **2 encontros**
   com divisores visuais: **A (na mão)** = visão do sistema → arquitetura (rotas/pastas/
   db.json 3 coleções) → fundação (Vite+Router+Navbar+404, revisão dos Caps 4–8) → teoria
   dos **4 verbos HTTP + CRUD** → módulo Clientes completo (listar em TABELA, cadastrar,
   excluir, editar) · **B (com agente)** = AGENTS.md escrito junto → Fornecedores via 4
   prompts prontos + ritual (revisão do PUT em voz alta no telão = a aula) → Produtos com
   "pedidos do cliente" (aluno escreve os prompts; olhinho = prompt de referência + pontos
   de revisão; passo final SEM olhinho) → chefão Dashboard → BugZilla → formatura do front.
2. **Disciplina de escopo aplicada**: objeto sem shorthand (`nome: nome`), concatenação com
   `+` (sem template string), sem preventDefault (salvar = botão onClick), sem async/await,
   fetch nunca, `Number()` para inputs numéricos (Cap 2), `.filter()` no excluir com nota
   do `!==`. **Novidades honestas com teoria dedicada**: 4 verbos (analogia do cartório +
   máquina), CRUD (o termo, com lastro), useNavigate ("Link via código"), window.confirm
   ("primo do alert que devolve boolean"). Conceito-mor: "servidor e tela são dois mundos".
3. **3 máquinas** (cap de projeto, mais leve como o 05b): 🗺️ GPS do GestorPRO (5 URLs,
   inclui nota da ordem novo × :id/editar) · 📮 **Balcão do CRUD** (máquina-mor: envelope
   viaja, db.json reage — POST carimba id 4, PUT troca ficha, DELETE some, e o caso de erro
   💥 PUT sem id → 404; estados idempotentes com re-clique → 404 explicado) · 🕵️ Revisor
   de Plantão (diff de Fornecedores com 3 violações do AGENTS.md: CSS global, function
   declarada, fetch). **4 quizzes** (fase 1 na mão, verbo certo, onde mora a regra, saída
   PUT no demo day). Sem vídeos (candidato `quatro-verbos` pendente de render).
4. AGENTS.md didático no material (stack travada, hooks permitidos, rafce, CSS Modules,
   axios-nunca-fetch, .then/.catch, módulo Clientes = padrão da casa) + teste de fogo
   (pedir gráficos → agente recusa citando a regra). Casa A: select controlado + popular
   sistema. Casa B: busca ao vivo (mão) + plural e destaque (prompt+ritual) + **demo day**.
5. Hub: card 10 destravado; Cap 9 → botão "Próximo: Cap 10" ativo.
6. **Testado no Chrome**: hero, árvore/db.json, GPS, Balcão (POST 201 + destaque verde;
   PUT sem id → 404 vermelho), Revisor 3/3 via DOM, código com ligatures OFF (`=>` ok),
   console limpo. Confirmação do prof em sessão: a escada na-mão→junto→comanda mantida
   (Clientes manual como gabarito; Fornecedores E Produtos com agente).

## 2026-08-14 (continuação 3) — Projeto de referência do GestorPRO construído e TESTADO

Pedido do prof: "teste bem tudo". Criado `tooling/gestorpro-referencia/` (Vite React,
node_modules gitignorado, README com instruções) com o código EXATO do Cap 10 + os módulos
Fornecedores/Produtos como o agente os produziria seguindo o AGENTS.md (que também está lá).

1. **Todos os fluxos passaram no Chrome** (servers via `.claude/launch.json` da raiz:
   `gestorpro-api` json-server:3000 + `gestorpro` vite:5173): fundação/rotas/Navbar sem
   reload · Clientes listar (tabela igual ao mini-browser do cap) · cadastrar (POST →
   volta pra lista → persistiu) · editar (GET pré-enche → PUT → "Sousa" na tela e no db) ·
   excluir (confirm + DELETE + filter, some sem F5) · Produtos com selo ⚠️ exatamente nos
   estoques &lt; 5 · cadastro com `Number()` (tipos numéricos confirmados no db.json) ·
   Fornecedores ok · 404 ok · Dashboard reagindo a tudo (3/2/5 + alerta subiu pra 3).
   Console zero erros em todas as páginas. `db.seed.json` = reset pra aula.
2. **ACHADO do teste real — json-server v1 (npx atual):** ids novos vêm como CÓDIGO
   aleatório (`"XKp8zRmXRGw"`), não número sequencial; ids do seed viram string na 1ª
   escrita; e ele acrescenta `$schema` no db.json. **Cap 10 ajustado em 2 pontos** (nota da
   máquina 📮 no POST + box do Passo 4) para o aluno não estranhar o carimbo. O resto do
   material já era compatível (ids sempre usados via URL/texto).
3. Nota de ambiente: com index.css vazio (faxina), navegador em dark mode forçado deixa o
   texto escuro dos cards pouco legível — em sala (tema claro padrão) fica perfeito; não é
   bug do material, mas se algum aluno usar extensão de dark mode, é a explicação.

## 2026-08-15 — Treino do Cap 9 reformado: a "loja-cobaia" substitui a cópia da Mini-loja

Pedido do prof: a turma atual **não vai ter a Mini-loja** dos Caps 4–8 em mãos — o treino
não podia depender desse artefato. Nova abordagem, preservando o princípio "você só julga o
agente num projeto que conhece por dentro":

1. **P1 novo — "nasce a loja-cobaia" (na mão):** o treino abre criando uma mini vitrine do
   zero em ~10 min (Vite → faxina → CartaoProduto com props → array de 3 produtos + .map com
   key) — puro músculo dos Caps 4–5/05b, com o App.jsx completo no material. Framing: "agente
   novo estreia em projeto-cobaia, nunca em projeto importante" (substitui o box da cópia;
   git continua citado como a proteção de mercado).
2. **P2 — primeiro papo:** funde os antigos P1+P2; a pergunta dirigida trocou o useEffect
   (que a cobaia não tem) por ".map() + por que a key existe" (ponte com a máquina 🔑).
3. **P3 rodapé:** aceite trocado de "Home e Sobre" (cobaia não tem Router) para "embaixo dos
   3 cards"; texto do rodapé virou "Loja-cobaia — …"; mini-browser atualizado.
4. **P4 A/B:** intacto (a cobaia tem os preços certos: Mouse 89 mostra o selo, Monitor não);
   "db.json" da dica virou "array de produtos".
5. **P5 sabotagem:** crime 2 trocado de "import axios" (inexistente na cobaia) por "apagar o
   export default do CartaoProduto" (Cap 4). Olhinho atualizado.
6. Ajustes de coerência: `cd loja-cobaia` nos 3 togglers de setup, lema, tip do "primeiro oi",
   strings das máquinas ⚖️/🕵️ ("Minha loja"). Cap 10 não referencia a Mini-loja em exercícios
   (só num recap narrativo — mantido). Verificado no Chrome via DOM (7 checks).

## 2026-08-15 (continuação) — Treino do Cap 9 EXPANDIDO: "Operação UAU" (10 passos)

Pedido do prof: treino "bem mais completo, para construir algo bem UAU". A loja-cobaia agora
evolui até virar **a loja do aluno**, com um wow por degrau — sem canibalizar o Cap 10 (loja
vitrine × sistema de gestão). Trilha nova (guiado ★ → solo com prompt próprio):

1. 🧱 nasce a cobaia (na mão) · 2. 🗣️ primeiro papo (leitura) · 3. 👣 rodapé com prompt-spec
   dado + ritual · **4. ✨ GLOW-UP (novo, guiado)**: prompt de DIREÇÃO DE ARTE (grid, sombras,
   hover, só CSS Modules/classNames) — o antes×depois é o 1º UAU; lição "estilizar é o melhor
   uso de agente pra iniciante: diff legível, lógica intocada" · 5. ⚖️ A/B vago×spec (selo 🔥)
   · **6. 🔌 API de verdade (novo, guiado)**: agente cria db.json + converte pra
   useState/useEffect/axios/porteiros — a revisão do diff é re-aula do Cap 7; técnica nova de
   prompt: EXCEÇÃO explícita ("pode instalar o axios — somente ele") · **7. 🔎 busca ao vivo**
   (solo, prompt próprio; olhinho=prompt ref) · **8. 🛒 carrinho** (solo; exigir "estado mora
   no App" no prompt — payoff da máquina 👯) · **9. 🌙 modo escuro** (solo, SEM olhinho — 3ª
   spec do dia, confia no processo) · **10. 🏆 A LOJA É SUA** (chefão): rebatismo com tema
   próprio (🍔🎮👟📚…) via db.json+paleta, UMA feature de assinatura 100% especificada pelo
   aluno (cardápio de ideias, tudo na stack), e o TOUR de 1 min pro colega — mostrar a loja +
   explicar um diff revisado ("mostrar prova que o agente é rápido; explicar prova que o
   engenheiro é você"). Mini-browsers novos: DEPOIS do glow-up e exemplo SneakerLab temático.
2. **Sabotagem virou item 1 da casa** (quebra key + export default → detetive → conserto na
   mão), junto da sabatina e do test-drive de 2ª ferramenta. Box novo "🎯 A meta de hoje"
   avisa: treino grande DE PROPÓSITO, solos que não couberem viram casa (ordem importa).
3. Trilha `.arena-track` com 10 pontos; título "Treino — Operação UAU: do zero à SUA loja".
   Verificado no Chrome (10 dots, 10 passos + casa, glow-up e SneakerLab renderizando).

## 2026-08-22 — Cap 10 redesign visual + Mapa de Engenharia impresso (novo artefato)

Pedido do prof: (a) tela do Cap 10 "bem mais bonita e moderna"; (b) **um papel impresso**
com o desenho arquitetural do GestorPRO, com pré-desenhos que a turma preenche em aula
(setas, useState, axios…) — a visão de engenharia do que todos estão construindo.

### (a) Redesign do capítulo (`10-projeto-gestor/index.html`)
1. **Hero 2.0**: janela do GestorPRO em mockup claro (`.app-float`/`.app-win`, perspective
   rotateX que aplaina no hover) com os 4 verbos orbitando (`.fv.get/.post/.put/.del`,
   `logoFloat` do shared). Chips somem <760px.
2. **Escada das 3 fases** (`.escada3`/`.e3`): substitui os bullets da seção Visão — degraus
   com alturas crescentes nas cores das fases (ciano/roxo/verde). O `.mock` antigo saiu
   (CSS e markup) — o hero já mostra o sistema.
3. **Divisores de encontro** ganharam selo-letra (`.encontro .letra`, A roxo / B verde-ciano
   via `.encB`).
4. **Jornada da formatura** (`.jornada`/`.j-step`): linha do tempo horizontal Caps 1–3 →
   4–5 → 6–8 → 9 → 10 (nó atual com glow), vira coluna <680px. Substitui os bullets.
5. Motion: `data-motion="rise"` + `data-motion-child` nos componentes novos;
   `prefers-reduced-motion` cobre tudo.

### (b) Mapa de Engenharia (`10-projeto-gestor/mapa-engenharia.html`) — NOVO
Folha A4 **paisagem, frente e verso**, estética "prancheta de engenharia": moldura dupla,
quadriculado 5mm, carimbo técnico (nome do aluno = "eng. responsável", data, folha 1/2,
escala "1:1 — do papel pro VSCode, sem atalho"). Tinta azul-marinho + cores por verbo;
sai legível em impressora P&B (aluno preenche de caneta). Zoom 0.66 só em tela (preview).
- **Frente (Encontro A)**: 3 zonas — 🖥️ NAVEGADOR (navbar + mapa de rotas com lacunas +
  anatomia da Clientes.jsx com hooks em lacunas) · 📮 ESTRADA (4 faixas de verbo; GET vem
  desenhado de exemplo, POST/PUT/DELETE são áreas de lápis) · 🏤 SERVIDOR (db.json como
  gavetas de cartório; fornecedores/produtos com campos em branco + "circule os 2 números").
  Rodapé: ciclo da listagem (6 bolas, banco de palavras) + legenda C.R.U.D. + carimbo.
- **Verso (Encontro B)**: esteira prompt-spec (4 ingredientes do Cap 9) → diff → ritual
  ①–⑤ (lacunas) com seta de reprovação · AGENTS.md resumido + "escreva a SUA regra" ·
  escada dos módulos · **TERMO DE ACEITE**: 8 features × (via, 5 checkboxes do ritual,
  assinatura do revisor) — feature sem assinatura = feature que não existe.
- **Missões ✏️ M1–M6** amarram papel e aula: selos roxos na folha + divs `.papel-missao`
  no capítulo nos pontos exatos (M1 rotas/#arquitetura, M2 gavetas/#arquitetura, M3 setas
  CRUD/#verbos, M4 anatomia+ciclo/#listar, M5 ritual+regra/#agentsmd, M6 termo/#fornecedores).
- Entradas no capítulo: card `.mapa-cta` na seção Arquitetura (folhinha 🖥️⇢📮⇢🏤 + botão
  imprimir) e link "Material de apoio" na sidebar. Impressão: A4 paisagem, frente-e-verso
  **virar na borda curta**, fundos ativados.
- Vocabulário conferido contra o Cap 9 (ritual ①–⑤; ingredientes CONTEXTO/TAREFA/
  RESTRIÇÕES/CRITÉRIO DE ACEITE) e rotas/campos contra `tooling/gestorpro-referencia/`.

## Pendências reconhecidas
- Planejar em detalhe os **Caps 6–9** (React: state → efeitos/dados → router → integração).
  Caps 4 e 5 já fixaram o tom, o setup Vite base e a Mini-loja como artefato contínuo do arco React.
  **Seguir a convenção RAFCE/arrow** (acima) em todos eles.
- Sem busca full-text / sem progresso salvo (localStorage) — futuro, se necessário.
- Avaliar quando o Remotion realmente compensa (custo de pipeline vs. ganho didático).
</content>
