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

## Pendências reconhecidas
- Planejar em detalhe os **Caps 6–9** (React: state → efeitos/dados → router → integração).
  Caps 4 e 5 já fixaram o tom, o setup Vite base e a Mini-loja como artefato contínuo do arco React.
  **Seguir a convenção RAFCE/arrow** (acima) em todos eles.
- Sem busca full-text / sem progresso salvo (localStorage) — futuro, se necessário.
- Avaliar quando o Remotion realmente compensa (custo de pipeline vs. ganho didático).
</content>
