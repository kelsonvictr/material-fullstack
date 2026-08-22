# 01 — Design System

Reaproveitado e provado no `programacao-iniciantes-v2`. Arquivos em `shared/`:
`styles.css` (tokens, layout), `components.css` (componentes), `animations.css` (@keyframes),
`scripts.js` (toggler, sidebar, progresso, quiz, terminal, sequências autoplay).

## ⚠️ Regra inegociável: ligaduras desativadas
JetBrains Mono reescreve `->`, `!=`, `>=`, `<=` como símbolos Unicode. Para iniciante é
catastrófico. No topo do `styles.css`, **antes** de qualquer `pre`/`code`:
```css
pre, code, .code-block pre, .terminal, .terminal-body, textarea, .pg-code, .pg-console,
.code-header .filename, .lang-badge, .drill-tag{
  font-variant-ligatures:none;
  font-feature-settings:"liga" 0,"clig" 0,"calt" 0;
}
```
(2026-08-22: `.filename`/`.lang-badge`/`.drill-tag` entraram na lista — são mono no
components.css e ficavam FORA do kill; o `.code-header` é irmão do `pre`, não filho.)
Checklist visual: `->` aparece como `-`+`>`? `!=` como `!`+`=`? Se vir `→`/`≠`, está ativo.
Além disso: **escapar sempre `<` `>` `&`** dentro de `<pre>` (`&lt;` `&gt;` `&amp;`).

## Paleta (CSS vars)
Fundo escuro `--bg:#0a0a12`, surfaces `--surface:#12121e`/`--surface2:#1a1a2e`,
código `--code-bg:#0d0d1a`. Texto `--text:#eef0f8` / `--text-dim:#8892b0`.
7 accents genéricos (`--accent` roxo … `--accent7` menta).

**Marcas do frontend (cores oficiais):**
`--html:#e34f26` · `--css:#2965f1` · `--js:#f7df1e` · `--react:#61dafb` ·
`--node:#5fa04e` · `--vite:#646cff` · `--json:#f7b731`.

## Tipografia
- **Nunito** — corpo (400/600/700/800/900)
- **JetBrains Mono** — código (ligaduras OFF)
- **Caveat** — títulos de conceito/analogia (manuscrito)

Import no `<head>`:
```html
<link href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=JetBrains+Mono:wght@400;600;700&family=Nunito:wght@400;600;700;800;900&display=swap" rel="stylesheet">
```

## Estrutura de uma página de capítulo
1. `.bg-grid` + `.bg-orbs` (fundo animado)
2. `.progress-track > .progress-bar` (barra de progresso no topo)
3. `.menu-toggle` + `.sidebar-nav` + `.sidebar-overlay` (navegação)
4. `.hero` (`.hero-icons`, `.hero-badge`, `h1`, `.subtitle`, `.hero-stack`)
5. `.container` com vários `.step-section` numerados (`.step-header` + `.step-number` + `.card`)
6. `.footer`
7. `<script src="../../shared/scripts.js" defer></script>` + script do Motion (CDN)

## Componentes (classes principais)
`.card` · `.concept` (dica, borda amarela, título Caveat) · `.analogy` (💡 ponte com o mundo real) ·
`.tip` / `.warning` / `.bug-box` · `.code-block` (janela Mac: `.dots`, `.filename`, `.lang-badge`,
`<pre>` com tokens) · `.toggler` (olhinho 👀) · `.exercise` (`.guided`/`.solo`/`.home`) ·
`.try-first` (🚨 PARE!) · `.quiz` (`.quiz-opt` + `.quiz-feedback`, confete ao acertar) ·
`.flow-container.autoplay` (fluxo animado) · `.terminal[data-typewriter]` (máquina de escrever) ·
`.hub-grid`/`.hub-card` (cards do hub).

### lang-badge disponíveis
`python json terminal html css js jsx bash`

### Tokens de syntax highlight (spans dentro do `<pre>`)
Genéricos: `.kw .fn .bi .st .cm .num .bool .op .tp .var .fstr .fexp .attr`
Front: `.tag` (`<div>`), `.atr` (atributo HTML), `.sel` (seletor CSS), `.prop` (propriedade CSS),
`.val` (valor CSS), `.unit` (px/rem), `.punc` (pontuação).

### step-number por marca
`sn-html sn-css sn-js sn-react` (além de sn-red/blue/green/yellow/purple/main/mint/py).

## Animações
- **Motion (motion.dev)** via CDN como motor principal de animações de fluxo/entrada.
- **Remotion** para videoclipes pré-renderizados (estreou no Cap 3, 2026-06-17). Projeto Node em
  `tooling/remotion/` (`node_modules` gitignorado) que renderiza **`.mp4` + `.png` poster** para
  `assets/video/` (versionados); o HTML só embute `<video>`. Paleta em `src/theme.ts` (espelha os
  tokens daqui). Comandos: `npm run render:fetch | render:click | still:fetch | still:click`.
  Clipes atuais: `jornada-fetch.mp4`, `clique-dom.mp4`. Mantém o site 100% estático (sem build no deploy).
- Base já traz `@keyframes` em `animations.css` e o motor `data-seq` (sequências autoplay
  que disparam quando entram na viewport — o aluno nunca precisa "achar" um botão).

## Mini-browser — Live Preview read-only (2026-05-30)
Renderiza o RESULTADO de um exercício numa "janelinha de navegador" (chrome com dots, URL,
cadeado). **Não é editável** (preserva "digite no VSCode"). CSS em `components.css` (`.mini-browser`,
`.mb-chrome`, `.mb-viewport`, `.mb-cl`); engine `initMiniPreviews` em `shared/scripts.js` (monta sob
demanda na viewport).
- **Modo web** (HTML/CSS): `<div class="mini-browser" data-url="x.html">` + `<script type="text/html"
  data-mp="html">…</script>` e opcional `data-mp="css"`. Vira `<iframe sandbox srcdoc>` (SEM
  allow-scripts). Conteúdo é **HTML real (NÃO escapado)** — é renderizado. ⚠️ nunca `</script>` literal dentro.
- **Modo console** (JS): `<div class="mini-browser console">` + `<script type="text/plain"
  data-mp="out">…</script>`. Linhas estilo devtools (estático). Prefixo `> ` = comando, `! ` = erro.
- **Modo INTERATIVO (2026-07-25, estreou nos Caps 6–7):** adicione `<script type="text/plain"
  data-mp="js">…</script>` e a prévia ganha `sandbox="allow-scripts"` — o resultado do exercício
  fica CLICÁVEL (contador que soma, busca que filtra, carrinho que conta). Com scripts o iframe
  fica opaco pro pai → fixe a altura com `data-h="220"` no `.mini-browser`. JS em ES5 simples,
  imitando o comportamento do app do aluno (não é React de verdade — é encenação fiel).

## Playground modo `react` (2026-07-25, Caps 6–7)
`<div class="playground" data-mode="react">` + `<textarea data-pg="jsx">` com um componente
**`App`** (obrigatório; o playground renderiza `<App />` sozinho). Vendors **offline-first** em
`shared/vendor/` (React 18 UMD + ReactDOM + Babel standalone, ~3 MB, carregados sob demanda só
se a página tiver playground react). JSX transpilado na hora; `useState`/`useEffect` injetados;
erros viram painel vermelho (error boundary), `console.log` (inclusive dos efeitos!) aparecem num
console embutido. **Uso parcimonioso: 1 "🧪 Laboratório" por capítulo**, sempre DEPOIS do conceito
digitado no VSCode (regra "forçar o VSCode" continua). CSS `.pg-react*` em `playground.css`.

## Forja de Tags — "as tags chegam no navegador" (2026-05-30)
`shared/tag-forge.js` (módulo, Motion via CDN). Cada tag voa do editor pro navegador e vira o
elemento real, com faíscas. Markup `<div class="forge" data-forge>` com `.brick[data-brick=N]`,
`[data-paint=N]` e `[data-forge-play]`. Auto-play na viewport; fallback estático sem Motion. CSS `.forge*`.

## Responsivo / acessibilidade
Mobile-first, sidebar off-canvas, `clamp()` nos tamanhos, `@media (prefers-reduced-motion)`.
</content>
