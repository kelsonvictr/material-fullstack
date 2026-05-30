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

## Pendências reconhecidas
- Sessão dedicada para planejar a fatia de React (caps 4–9) em detalhe.
- Sem busca full-text / sem progresso salvo (localStorage) — futuro, se necessário.
- Avaliar quando o Remotion realmente compensa (custo de pipeline vs. ganho didático).
</content>
