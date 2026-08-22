# Instruções para Claude — Material Frontend (curso Fullstack)

Material didático **da metade Frontend** do curso presencial Programação Fullstack (programa AI).
Público **iniciante**. Site estático modular (HTML/CSS/JS vanilla, sem build), um capítulo
por pasta. Culmina consumindo a API do backend que o aluno já construiu.

## Antes de qualquer coisa: leia o `context/`
A pasta [`context/`](context/) é a memória viva (SDD) do projeto. Comece por
[`context/README.md`](context/README.md). Ao aprender algo novo, **registre lá**.

## Regras inegociáveis

### 1. Ligaduras OFF (JetBrains Mono)
A fonte reescreve `->`, `!=`, `>=`, `<=`, `=>` como símbolos Unicode — catástrofe para
iniciante. A regra já está no topo de `shared/styles.css`:
```css
pre, code, .code-block pre, .terminal, .terminal-body{
  font-variant-ligatures:none;
  font-feature-settings:"liga" 0,"clig" 0,"calt" 0;
}
```
Cheque sempre: `->` aparece como `-`+`>`? `=>` como `=`+`>`? Se vir `→`/`⇒`, está errado.

### 2. Escapar `<` `>` `&` dentro de `<pre>`
Sempre `&lt;` `&gt;` `&amp;` — vale dobrado aqui, porque ensinamos HTML/JSX, cheios de `<tag>`.
Ex.: `<div>` vira `&lt;div&gt;`, `arr.map(x => ...)` o `<` de generics/JSX sempre escapado.

### 3. Português do Brasil
Em todo conteúdo do aluno (títulos, textos, comentários, dicas).

### 4. Didática progressiva, um conceito por vez
Não despejar tudo no início. Analogia antes do código. Construir cada coisa do começo ao fim
antes da próxima. Ver `context/02-padroes-didaticos.md`.

### 5. Forçar o VSCode
**Sem playground que executa no navegador.** O aluno digita de verdade no VSCode, salva e abre
no navegador (Live Server). Código estático + padrão olhinho 👀 (`context/03-padrao-olhinho.md`).
Avisar quando setas (`=>`) puderem aparecer como `→` na IDE dele.

### 6. Imagens só com aprovação
Memes/imagens IA precisam de OK do professor antes de gerar. Logos preferir SVG.
Ver `context/06-imagens-e-memes.md` (chave OpenAI no Keychain).

## Estrutura
```
index.html              hub + propaganda
sobre/index.html        sobre o prof
capitulos/NN-slug/index.html
shared/                 styles.css, components.css, animations.css, scripts.js
context/                docs SDD (LEIA primeiro)
assets/                 images, logos-empresas, memes, svg
```
Cada capítulo importa `../../shared/*` por caminho relativo. Sem build, abre direto no navegador.

## Git
Este diretório é (ou será) um **repositório git independente**. Comite/pushe aqui, não na raiz
do workspace.
</content>
