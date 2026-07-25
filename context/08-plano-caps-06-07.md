# 08 — Plano dos Caps 06 (useState) e 07 (useEffect)

> Sessão de planejamento 2026-07-25. Spec para produzir os dois capítulos com a mesma didática,
> fluxos e qualidade dos Caps 4–5 reformados (benchmark: ~1400–1600 linhas, 5 máquinas,
> treino encadeado de 7 passos, vídeos embutidos, BugZilla, quizzes, olhinho, RAFCE).
> Pedido do professor: useState **muito** didático com fluxos animados; useEffect =
> **suprasumo da didática**, com atenção especial à SINTAXE (é onde os alunos — e até o
> professor dando aula — se confundem). Contador simples → mini sistemas reais.

## Amarras herdadas (não renegociar)

- Turma nova **não viu backend** ([[feedback-turma-nova-sem-backend]]): backend é futuro
  ("você vai construir"), nunca passado. Nada de Spring/`@GetMapping` nos vídeos.
- Sequência travada (`07-sequencia-http-fetch-axios.md`): mocks no shape do JSON do ERP →
  **fetch no `useEffect` só no Cap 7** (com json-server) → axios só no Cap 9. Fetch continua
  **só `.then()`** (async/await é citado, não ensinado).
- Cap 5 já ensinou `&&` e ternário → os dois caps **assumem os porteiros como sabidos** (payoff!).
- RAFCE/arrow em todo componente ("Rafael do Ceará") + aviso de IDE onde `=>` aparece.
- Ligaduras OFF, escapar `<>&` em `<pre>`, PT-BR, olhinho 👀, forçar VSCode nos treinos.
- Mini-loja é o artefato contínuo do arco (Caps 4 → 5 → 6 → 7): não trocar de projeto.

## Decisão de vídeo: experimento HyperFrames (novo) ao lado do Remotion

O professor pediu para tentar o pipeline dos cortes do `programaai-agent-helper/videos`
(HyperFrames) nos fluxos animados destes caps. Plano:

- **Novo projeto `tooling/hyperframes/`** (node_modules gitignorado, como o Remotion). Uma
  composição por vídeo. O site continua 100% estático: renderizamos `.mp4` + poster `.png`
  para `assets/video/` e o HTML só embute `<video autoplay loop muted playsinline>` com o
  mesmo player + IntersectionObserver dos Caps 3–5.
- **Formato didático ≠ formato de corte social**: aqui é **16:9, 1920×1080, 30fps, 10–16s,
  loop, sem áudio** (o STYLE-SPEC deles é 9:16 para CapCut — aproveitamos a filosofia, não o
  canvas). Paleta do **material** (tokens do `shared/styles.css`), não o coral da Programa AI.
- Filosofia importada do STYLE-SPEC: *a animação É a mensagem* (quase sem texto corrido),
  narrativa em 3 atos (montagem → ação → payoff), easing com física (`back.out` em entradas,
  `sine.inOut` em idle, `steps()` em digitação), nunca linear.
- **Fallback**: se o resultado não ficar à altura dos vídeos Remotion existentes, os mesmos
  storyboards são portáveis para `tooling/remotion/` (pipeline já provado). O storyboard é o
  ativo; a ferramenta é detalhe.

### Os 4 vídeos planejados

| Arquivo | Cap | Conteúdo (3 atos) |
|---|---|---|
| `anatomia-usestate.mp4` | 6 | A linha `const [contador, setContador] = useState(0)` se monta peça a peça: caixinha `useState(0)` cospe um PAR (valor + função-controle) → desestruturação abre o par em dois nomes → payoff: `setContador(1)` aperta e o valor troca. Estilo "keycaps" do `arrow-function.mp4` para os colchetes `[ ]`. |
| `ciclo-do-estado.mp4` | 6 | O FLUXO-mor do useState: dedo clica o botão → evento `onClick` dispara → `setContador(1)` → React tira **nova foto 📸** do componente (render antigo desliza pra fora, novo desliza pra dentro) → tela atualiza. Loop com contador subindo 0→1→2. Contraste-relâmpago no ato 1: `let` mudando no console e a tela PARADA (a dor), depois o ciclo certo. |
| `anatomia-useeffect.mp4` | 7 | O SUPRASUMO de sintaxe: `useEffect( , )` nasce como MOLDURA vazia com dois slots coloridos → slot 1 recebe `() => { ... }` rotulado **"O QUE fazer"** → vírgula pisca → slot 2 recebe `[ ]` rotulado **"QUANDO fazer"** → os 3 modos do array passam no slot (sem array / `[]` / `[busca]`) com legenda de quando dispara. Ordem de montagem = a mesma receita de digitação ensinada no cap. |
| `vida-do-componente.mp4` | 7 | Linha do tempo do componente: monta → 1º render (vitrine vazia + skeleton) → `useEffect` acorda → `fetch` viaja até o servidorzinho `json-server` → JSON volta → `setProdutos` → novo render com cards → o `[]` segura a porta (efeito NÃO roda de novo). Reaproveita a gramática visual do `jornada-fetch.mp4` (cliente↔servidor) para dar continuidade ao Cap 3. |

Scripts npm: `render:usestate`, `render:ciclo`, `render:useeffect`, `render:vida` (+ `still:*`
para posters), espelhando a convenção do Remotion.

## Playground: novo modo React (decisão a validar na prática)

O `shared/playground.js` atual roda `web` (HTML+CSS) e `js` (console) — **não roda JSX**.
Para os pontos de "brincar livre" destes caps, criar o modo `react`:

- Vendorizar em `shared/vendor/`: `react.production.min.js`, `react-dom.production.min.js` e
  `babel.min.js` (standalone) — ~1,5–2 MB, mas o site segue **offline-first** (regra das
  máquinas). O iframe do playground injeta os três e transpila o código do aluno.
- **Uso parcimonioso** (a regra "forçar o VSCode" continua): **1 playground por capítulo**,
  sempre DEPOIS do conceito já digitado no VSCode, rotulado "🧪 Laboratório: brinque à
  vontade". Cap 6: contador editável (mexer no valor inicial, no passo, quebrar de propósito).
  Cap 7: **Painel do useEffect editável** (mexer no array de dependências e ver o console).
- Se a vendorização pesar/complicar, o plano B é as máquinas didáticas simuladas cobrirem
  100% (elas já são interativas) e o playground ficar de fora — sem bloquear os caps.

---

# CAP 06 — `capitulos/06-react-state/` · "Interatividade: useState & eventos"

**Promessa do capítulo:** "Até aqui sua loja é uma vitrine — bonita, mas parada. Hoje ela
ganha memória e reage a cliques: contador, curtir, busca ao vivo e carrinho."

**Fio narrativo:** a dor de `props são somente leitura` (plantada no Cap 4) + "variável normal
não redesenha a tela" → useState como a memória viva do componente → do contador clássico ao
mini sistema real (busca com filtro + carrinho na Mini-loja).

## Roteiro de seções (com tempo estimado de aula — alvo ~2h50)

| # | Seção | Tempo | O que acontece |
|---|---|---|---|
| 0 | Hero + aquecimento | 10 min | Chips: useState · eventos · formulários. Quiz de abertura: "você clicou em `+1` e a variável mudou no console… por que a TELA continua igual?" (planta a dor sem responder). |
| 1 | ⚡ **Eventos no React** | 20 min | Ponte Cap 3: `addEventListener("click", fn)` → vira `onClick={fn}` (camelCase, chaves). Pegadinha central: `onClick={aumentar}` (entrega a função) × `onClick={aumentar()}` (executa NA RENDERIZAÇÃO — erro visível). Arrow inline `onClick={() => ...}` p/ passar argumento (aviso de IDE `=>`). Máquina 🎯. Quiz. |
| 2 | 🧊 **A dor: a variável teimosa** | 15 min | Bora codar guiado: `let contador = 0` + botão. Console sobe, tela parada. Máquina 🧊. Concept: "o React só redesenha quando VOCÊ avisa — e o aviso tem nome". |
| 3 | 🧠 **useState: a memória do componente** | 35 min | Analogia: o **placar do estádio** — não basta o gol acontecer (variável), alguém aperta o botão do placar (set) e TODO MUNDO vê o número novo (re-render). Anatomia da linha (vídeo `anatomia-usestate.mp4` + leitura guiada colorida: valor / função set / valor inicial; ponte desestruturação c/ Cap 2). Contador guiado no VSCode. Fluxo completo: vídeo `ciclo-do-estado.mp4` + máquina 🔄. Convenção de nome `algo` / `setAlgo`. |
| 4 | 📜 **As 3 regras do estado** | 20 min | (1) Nunca mude na mão: `contador = contador + 1` não redesenha — SEMPRE via set. (2) O set **não é imediato**: `console.log` na linha seguinte mostra o valor antigo (foto atual × próxima foto) — desarma a maior confusão de sala. (3) Cada componente tem a SUA memória: máquina 👯 com dois contadores independentes. Quiz intermediário. |
| 5 | 👻 **Estado + porteiros** (boolean) | 15 min | Payoff do Cap 5: `const [curtido, setCurtido] = useState(false)` → `onClick={() => setCurtido(!curtido)}` → coração `{curtido ? "❤️" : "🤍"}` + classe condicional. Mostrar/esconder detalhes com `&&`. Sem teoria nova — só combinar o que já sabem (dizer isso explicitamente: motiva). |
| 6 | 📝 **Formulários controlados** | 25 min | Analogia: input com **crachá e coleira** — o React segura o valor (`value={nome}`) e anota cada tecla (`onChange`). `e.target.value` (ponte `event` do Cap 3). Máquina 🪞 (inclui o caso de erro: `value` SEM `onChange` = campo travado — o aluno tenta digitar e nada sai!). Gancho: "é assim que o formulário de cadastro do ERP vai nascer". 🧪 Laboratório (playground react): contador editável. |
| 7 | 🛒 **Quando o estado precisa subir** (compacto) | 15 min | Só o essencial p/ o chefão do treino: o total do carrinho não pode morar no `CartaoProduto` (cada card tem a sua memória — máquina 👯 já provou) → mora no `App` (pai comum) → desce como prop (`total`) e a AÇÃO sobe como função via prop (`aoComprar`). Diagrama caixa-e-seta ↑↓. Sem o termo "lifting state up" — apelido: **"o estado mora no pai"**. Aviso: "vamos praticar de novo no Cap 9". |
| 8 | 🐛 **BugZilla** | 10 min | 5 bugs (abaixo). |
| 9 | 🏋️ **Treino encadeado** (7 passos) | ~45 min em aula + resto guiado p/ casa | Abaixo. |
| 10 | Resumo + gancho | 5 min | "Sua loja reage… mas os produtos ainda moram num `const` dentro do código. No Cap 7 eles vêm de uma API de verdade — e o array `[]` do useState vai começar VAZIO." |

## Máquinas didáticas (5)

1. 🧊 **Variável Teimosa** — botão `+1` sobre um `let`: console simulado sobe (1, 2, 3…), a
   tela do mini-browser fica em 0, com balão "ué?". Botão "ligar o useState" refaz com estado
   e a tela acompanha. (O caso de erro É a máquina.)
2. 🎯 **Clique Certo** — três cartões: `onClick={aumentar}` ✅ · `onClick={aumentar()}` 💥
   (dispara sozinho na renderização — mostrar o contador subindo sem ninguém clicar!) ·
   `onclick=` minúsculo ⚠️ (não faz nada). Aluno escolhe o cartão e vê a consequência.
3. 🔄 **Ciclo do Estado** (máquina-mor) — botão real; a cada clique acende a esteira:
   `clique → onClick → setContador(1) → 📸 novo render → tela`. Linha do tempo de "fotos"
   (renders) vai empilhando embaixo, cada foto com o valor daquela renderização — prepara a
   regra 2 (set não é imediato) e o Cap 7 (re-render dispara efeitos).
4. 👯 **Gêmeos com memória própria** — dois `<Contador />` lado a lado; clicar num não mexe
   no outro. Botão "adicionar mais um irmão" monta um 3º contador zerado.
5. 🪞 **Input-Espelho** — input controlado + caixa de estado ao vivo + toggle
   "e se tirar o onChange?" → campo trava (erro visível) + warning no console simulado.

## BugZilla (5)

1. `contador = contador + 1` — mudou na mão, tela não atualiza (nem erro dá — o pior tipo).
2. `onClick={aumentar()}` — parênteses: executa na renderização (e no caso com set: loop!  ← gancho Cap 7).
3. Esqueceu `import { useState } from 'react'` — `useState is not defined`.
4. `value={nome}` sem `onChange` — campo congelado + warning do React no console.
5. `console.log(contador)` logo após `setContador` esperando o valor novo — sai o antigo
   (não é bug do React, é a regra da foto).

## Treino encadeado — "A Mini-loja ganha vida" (continua o projeto dos Caps 4–5)

Trilha `.arena-track`, alternância guiado/solo, mini-browser após cada solo, olhinho sempre.

| P | Tipo | ★ | Conteúdo |
|---|---|---|---|
| 1 | guiado | ★ | `Contador.jsx` (rafce) com `+` e `−`, montado temporariamente no App — o clássico, digitado com o prof. |
| 2 | solo | ★ | Botão "zerar" + impedir negativo (`contador > 0 && …` ou ternário — porteiros do Cap 5 em ação). |
| 3 | guiado | ★★ | O contador vira **seletor de quantidade** DENTRO do `CartaoProduto` (− qtd +) — cada card com a sua memória (a máquina 👯 ao vivo no projeto real). |
| 4 | solo | ★★ | ❤️ **Curtir** por card: boolean, coração alterna, classe condicional no card curtido. |
| 5 | guiado | ★★ | **Busca controlada** no App: input + estado `busca` + "Buscando por: {busca}" ao vivo. |
| 6 | solo | ★★★ | **Filtro ao vivo**: `produtos.filter(p => p.nome.toLowerCase().includes(busca.toLowerCase()))` alimentando o `.map()` existente — a vitrine reage a cada tecla (momento UAU; `filter` vem do Cap 2, relembrar na dica). |
| 7 | solo (chefão) | ★★★ | 🛒 **Carrinho**: estado `carrinho` no App, função `aoComprar` desce via prop, botão "Adicionar" em cada card, Cabecalho mostra `🛒 {carrinho}` — aplica a seção 7 inteira. |

**Casa:** plural do carrinho (`1 item` × `2 itens` — ternário) + botão "limpar carrinho" +
bônus ★★★: modo escuro (boolean no App + classe condicional no container).

**Quizzes:** abertura, clique certo (seção 1), foto do estado (seção 4), saída (código certo
do input controlado). Confete nos acertos, como sempre.

**Meme (precisa de aprovação prévia do prof):** "EU: setContador(1) / O CONSOLE: 0" (Pikachu
surpreso) ou a variável teimosa personificada.

---

# CAP 07 — `capitulos/07-react-efeitos-dados/` · "Dados de verdade: useEffect & fetch"

**Promessa:** "Hoje você apaga o `const produtos` que te acompanha desde o Cap 4 — e a sua
loja passa a buscar os produtos numa API de verdade, rodando na sua máquina."

**Fio narrativo:** a dor primeiro (fetch no corpo = loop infinito) → useEffect como o lugar
certo, com a sintaxe destrinchada ao extremo → json-server = sua primeira API local → o
momento teatral de apagar o const → loading/erro como acabamento profissional.

## A receita anti-confusão de sintaxe (o coração do capítulo)

A confusão clássica (de aluno E de professor) é digitar o useEffect "de dentro pra fora" e se
perder em parênteses/chaves/colchetes. O capítulo ensina — e repete em TODO exercício — a
**receita da moldura antes do quadro**, sempre na mesma ordem:

```text
1º  useEffect();          ← a moldura (parênteses do hook)
2º  useEffect(() => {});  ← o QUE fazer (a função-recado)
3º  useEffect(() => {}, []);  ← a vírgula + o QUANDO (array)
4º  só AGORA escreve o corpo dentro das chaves
```

Mnemônico fixo do capítulo: **useEffect(O QUE, QUANDO)** — "o que fazer" (função) e "quando
fazer" (array). Cores consistentes em TODOS os code-blocks, máquinas e no vídeo: função =
uma cor, array = outra (mesma paleta da leitura guiada do Cap 6). O vídeo
`anatomia-useeffect.mp4` monta a linha exatamente nessa ordem.

## Roteiro de seções (alvo ~2h50)

| # | Seção | Tempo | O que acontece |
|---|---|---|---|
| 0 | Hero + aquecimento | 10 min | Quiz: "quero buscar produtos da API quando a página abrir. Onde colocar o `fetch`?" (opções: no corpo do componente / dentro do onClick / num lugar que roda na hora certa / no index.html) — planta a pergunta que o cap responde. |
| 1 | 🌀 **A dor: o loop infinito** | 20 min | Guiado-demonstrativo (prof mostra, aluno NÃO precisa reproduzir): fetch + set no corpo do componente → set re-renderiza → corpo roda de novo → fetch de novo → ∞. Ponte direta com a máquina 🔄 do Cap 6 ("lembra da esteira? o corpo roda a CADA foto"). Máquina 🌀. Concept: "o corpo do componente é a foto; efeito colateral precisa de um quarto separado". |
| 2 | 🧬 **Anatomia do useEffect** (suprasumo) | 35 min | Analogia: o **despertador** — você configura O QUE tocar (função) e QUANDO tocar (array): toda hora (sem array), só uma vez ao ligar (`[]`), ou quando algo mudar (`[busca]`). Vídeo `anatomia-useeffect.mp4`. Receita da moldura (acima) digitada junto no VSCode com um efeito bobo (`console.log("montou!")`). Máquina 🧩 Montador. Aviso de IDE (`=>` de novo). |
| 3 | ⏰ **Os 3 modos do QUANDO** | 25 min | Um modo por vez, cada um com code-block + caso de uso real: sem array (raro, quase sempre bug) → `[]` ("quando o componente nascer" — o modo do fetch) → `[busca]` ("reagir a mudanças"). Máquina 🎛️ **Painel do useEffect** (máquina-mor). Quiz intermediário: "fetch inicial usa qual modo?". 🧪 Laboratório (playground react): painel editável. |
| 4 | 📦 **json-server: sua primeira API local** | 25 min | Ponte Cap 3 em 3 linhas (API, endpoint, JSON — "você já comeu no restaurante fakestore; hoje você monta a SUA cozinha de mentira"). `db.json` no **shape exato do ERP** + `npx json-server db.json` + testar `http://localhost:3000/produtos` no navegador (ver o JSON cru). Terminal animado. Enquadramento futuro: "no Cap 9 esse endereço vira a API Spring que VOCÊ vai construir no módulo de backend". |
| 5 | 🚀 **O momento mágico: apague o const** | 30 min | O padrão canônico dos 3 passos, cada um já conhecido: (1) `useState([])` — a vitrine nasce VAZIA; (2) `useEffect(..., [])` com `fetch().then().then(setProdutos)`; (3) o `.map()` do Cap 5 nem percebe a troca. Cerimônia de apagar o `const produtos` (riscado no code-block). Vídeo `vida-do-componente.mp4`. Máquina 🚚 Entrega ao Vivo. |
| 6 | ⏳😵 **Carregando & deu ruim** | 20 min | Estado `carregando` (true → false no `.then`) + ternário → mensagem/skeleton (porteiros Cap 5 de novo). Estado `erro` com `.catch` + teste real: DESLIGAR o json-server e ver a tela de erro amigável (não a tela branca). "Site profissional se diferencia aqui." |
| 7 | 🧹 Concept-box: faxina & async | 5 min | Só citar: `return () => {}` no efeito = faxina ao desmontar (veremos quando precisar, ex.: timers) e `async/await` = outro jeito de escrever o fetch (Cap 9). Sem exercício. |
| 8 | 🐛 **BugZilla** | 10 min | 5 bugs (abaixo). |
| 9 | 🏋️ **Treino encadeado** (7 passos) | ~45 min em aula + casa | Abaixo. |
| 10 | Resumo + gancho | 5 min | "Loja viva, dados de verdade… mas tudo numa página só. Cap 8: rotas — página de detalhes do produto." |

## Máquinas didáticas (5)

1. 🌀 **Loop Infinito** — mini-componente com fetch no corpo: contador de renders girando
   (1, 2, 3, … 47, …), ventilador acelerando, banner 🔥; botão "mudar pro useEffect" → contador
   para em 2 e ✓ verde. A DOR é a máquina; abre o capítulo.
2. 🧩 **Montador do useEffect** — as 3 peças embaralhadas (`() => {...}` · `,` · `[]`) e a
   moldura `useEffect(   )` vazia; o aluno clica as peças na ordem. Ordem errada → o erro real
   correspondente no console simulado (ex.: array antes da função → destaque "o React esperava
   uma função"). Reforça a receita da moldura tateando.
3. 🎛️ **Painel do useEffect** (máquina-mor) — seletor dos 3 modos + dois botões de provocação
   ("digitar no campo busca" e "clicar num botão qualquer que re-renderiza") + LED "efeito
   disparou!" + console simulado com contagem de disparos. O aluno DESCOBRE a tabela
   modo×quando na prática. (Versão simulada; o playground react é a versão editável.)
4. 🚚 **Entrega ao Vivo** — evolução do `.apilab` do Cap 3 em roupagem React: montar o
   componente → skeleton pulsando → caminhãozinho fetch vai ao `json-server` → JSON →
   `setProdutos` → cards nascem. Botão "desligar o servidor" → rota do 😵 erro (fallback
   offline gravado, como no Cap 3).
5. ⏳ **Semáforo do Carregamento** — três telas lado a lado (carregando / sucesso / erro) e o
   código com o ternário destacando qual ramo está aceso conforme o aluno alterna o cenário.

## BugZilla (5)

1. Fetch no corpo do componente — o loop ∞ (com a conta da mesada: 1 fetch por render).
2. `useEffect(() => {...})` **sem o array** — funciona… mas roda a cada render (o bug
   silencioso; como perceber no console e na aba Network).
3. Esqueceu `import { useEffect }` (ou importou só o useState) — `useEffect is not defined`.
4. Esqueceu o `.then(r => r.json())` — "meus produtos são uma Response?!" (map quebra).
5. `Failed to fetch` — o json-server não está rodando (LER o erro; checar o terminal;
   é o erro nº 1 da aula ao vivo).

## Treino encadeado — "A Mini-loja conectada"

| P | Tipo | ★ | Conteúdo |
|---|---|---|---|
| 1 | guiado | ★ | Criar `db.json` (shape ERP, 6+ produtos, campos extras `emEstoque`/`categoria` p/ caps futuros) + `npx json-server db.json` + visitar o endpoint no navegador. |
| 2 | guiado | ★ | Primeiro `useEffect` com `console.log("componente montou! 🎉")` — receita da moldura no VSCode; testar `[]` × sem array (F5, digitar na busca) e VER a diferença no console. |
| 3 | solo | ★★ | `useEffect` com dependência: `document.title = \`Buscando: ${busca}\`` com `[busca]` — a aba do navegador reage à digitação (ponte DOM do Cap 3 + payoff visível do modo 3). |
| 4 | guiado | ★★ | O momento mágico: `useState([])` + fetch no `useEffect` + **apagar o const** — a vitrine renasce com dados da API. |
| 5 | solo | ★★ | Estado `carregando` + mensagem "⏳ Carregando produtos…" (testar com o DevTools throttling ou `json-server --delay`). |
| 6 | solo | ★★★ | Estado `erro` + `.catch` + tela amigável; testar derrubando o json-server e subindo de novo. |
| 7 | solo (chefão) | ★★★ | Integração Caps 6+7: badge `{produtos.length} produtos` no Cabecalho + busca/filtro do Cap 6 funcionando sobre os dados da API + carrinho intacto. A loja completa: nasce vazia, carrega, filtra, vende. |

**Casa:** novo produto com `emEstoque: false` no `db.json` → porteiro do Cap 5 mostra
"Esgotado" (o dado atravessa API → estado → render → porteiro: a stack inteira) + bônus ★★★:
botão "🔄 Recarregar" que extrai o fetch p/ função e chama de novo.

**Quizzes:** abertura (onde vai o fetch), modo do array (seção 3), ordem do padrão canônico
(seção 5), saída (achar o bug num useEffect com 1 erro).

**Meme (aprovação prévia!):** Anakin/Padmé — "Coloquei o fetch no componente" / "Dentro do
useEffect, né?" / "…" / "DENTRO DO useEffect, NÉ?!".

---

## Ordem de produção sugerida

1. `tooling/hyperframes/` + os 2 vídeos do Cap 6 (valida o experimento cedo; fallback Remotion).
2. Cap 6 completo (HTML + máquinas + treino) — checklist de ligaduras/escapes.
3. Modo `react` do playground (vendor) — se travar, cortar sem dó (máquinas cobrem).
4. Vídeos do Cap 7 → Cap 7 completo.
5. Hub: destravar cards 06/07 (tirar `em-breve`), botão "Próximo" do 05b → Cap 6, Cap 6 → Cap 7.
6. Memes: gerar SÓ após aprovação das duas ideias acima.
7. Registrar decisões novas no `05-decisoes.md` + atualizar `04-conteudo-curso.md`.

## Pendências que dependem do professor

- ✅/❌ das duas ideias de meme (regra 6 do CLAUDE.md).
- Validar a seção 7 do Cap 6 ("o estado mora no pai" + carrinho no chefão) — recomendo manter:
  é o que dá a sensação de sistema real; se a turma sofrer, o P7 vira guiado na hora.
- Conferir se o shape do `db.json` bate com o JSON planejado do ERP (campos exatos).
