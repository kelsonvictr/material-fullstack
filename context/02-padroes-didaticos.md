# 02 — Padrões didáticos

> O suprasumo da didática. Um conceito por vez. Analogia antes do código. O aluno **digita**
> (forçamos o VSCode — sem playground "mágico" que executa por ele).

## Princípio 1 — Analogia ANTES do código
Todo conceito novo entra primeiro por uma ponte com o mundo real (`.analogy` 💡), depois o
código (`.code-block`), depois um visual (fluxo/diagrama), e só então o "Bora codar".

## Princípio 2 — Um conceito por vez (didática progressiva)
Não despejar "tudo o que vai aprender" no primeiro parágrafo. Cada ideia aparece quando é
necessária. Cada elemento/feature é construído do começo ao fim antes de ir pro próximo.

## Princípio 3 — O aluno digita de verdade
Diferente de um playground que roda no navegador, **forçamos o aluno a usar o VSCode**: criar
o arquivo, digitar, salvar, abrir no navegador (Live Server). Errar faz parte. Por isso o
código aparece **estático** + o padrão olhinho 👀 para a solução (ver `03-padrao-olhinho.md`).

> Aviso de IDE: quando aparecer sintaxe com setas (`=>` em arrow functions, `->`), avisar que
> a IDE dele pode **desenhar** `→`, mas que ele digita `-`/`=` seguido de `>`.

## Estrutura padrão de um capítulo
1. **Hero** — ícones, badge da marca, título com gradiente, subtítulo, chips da stack.
2. **Aquecimento** — um quiz curto ou pergunta provocativa ("o que você acha que acontece?").
3. **Conceitos** — cada um: analogia → código → visual/fluxo → "Bora codar (com o prof)".
4. **BugZilla 🐛** — personagem recorrente que mostra os erros clássicos (tag não fechada,
   `=` vs `===`, esqueceu o `;`, esqueceu `import`, etc.) e como corrigir.
5. **Desafios** — 3 níveis (ver abaixo).
6. **Resumo** — o que fixou + gancho pro próximo capítulo.

## Convenção React: componentes = arrow function via RAFCE (2026-06-20)
Nos caps de React (4+), todo componente é **arrow function** (`const X = () => { return (...) }`),
nunca `function X() {}`. O aluno usa o snippet **`rafce`** (extensão *ES7+ React snippets*, instalada
no Cap 00b): num `.jsx` vazio, digita `rafce` + Tab e nasce o componente (arrow + nome do arquivo +
`export default`). Mnemônico do prof: rafce = "**Rafael do Ceará**". Como a arrow `=>` aparece, manter
o **aviso de IDE** (`=>` pode virar `⇒`; digite `=`+`>`). Se o rafce inserir `import React`, orientar a
apagar (Vite moderno dispensa). Detalhe em `05-decisoes.md` (2026-06-20, "Convenção RAFCE / arrow").

## Exercícios — 3 níveis
- **Bora Codar (com o prof)** — `.exercise.guided`, código visível, passo a passo junto.
- **Desafio Individual (sozinho)** — `.exercise.solo`, dica + 🚨 PARE! + olhinho com a solução.
- **Desafio para Casa** — `.exercise.home`, mesmo padrão, mais aberto.

### Exercícios ENCADEADOS (padrão preferido nos treinos — 2026-05-30)
Em vez de exercícios soltos, o "treino" constrói **UM único artefato** crescendo passo a passo
(Cap 1 → `sobre-mim.html`; Cap 2 → `boletim.js`). Cada passo **continua o anterior**, alternando
guiado (com o prof) → solo (sozinho, com olhinho), e o solo referencia o que acabou de ser feito
("logo abaixo do passo 1…", "reusando a `media` do passo 3…"). Use a trilha `.arena-track`
(bolinhas numeradas) no topo, o selo `.drill-level`/`.drill-tag` por exercício, e feche cada solo
com o **mini-browser** mostrando o resultado acumulado (ver `01-design-system.md`).

## Quizzes
`.quiz` com 2–4 opções `.quiz-opt` (uma com `data-correct="true"`), feedback instantâneo
(`.quiz-feedback` com `data-correct`/`data-wrong`/`data-explain`), **confete ao acertar**.

## Visualizações que funcionam
Caixa + seta (estrutura), fluxos `.flow-container.autoplay` (requisição/render), linha do tempo,
diagramas de árvore (DOM!), terminal animado. Use o motor `data-seq` para passos automáticos.

### Máquinas didáticas (padrão novo — 2026-06-12, estreou no Cap 2)
Todo conceito abstrato pode ganhar uma **máquina animada e interativa** que torna o invisível
visível: o aluno aperta um botão com um INPUT concreto e VÊ o mecanismo decidir/transformar
(Túnel do IF 🚦, Máquina de Funções ⚙️, Trem do Array 🚂, Detector de Tipos 🃏, Rastreador 🔬).
Receitas do padrão: (1) entrada escolhida pelo aluno, nunca só "play"; (2) o caso de ERRO também
é visível (vagão-fantasma undefined, ramo else, pegadinha de aspas); (3) primeiro disparo
automático na viewport, repetição por botão; (4) console simulado mostra a saída como apareceria
de verdade; (5) Motion via CDN é tempero — o widget DEVE funcionar sem internet (transições CSS
+ Web Animations); (6) textos mono dos widgets precisam de `font-variant-ligatures:none` local
(a regra global só cobre `pre/code/.terminal`).

## Tom
Português do Brasil, leve, frases curtas, "você" (não "o aluno"), emojis com parcimônia.
Memes BR para engajar — sem ser forçado (ver `06-imagens-e-memes.md`).
</content>
