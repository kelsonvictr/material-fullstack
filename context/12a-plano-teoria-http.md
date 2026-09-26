# 12a — Parte 0 do Cap 12 · Como a web conversa (HTTP, API e REST)

> Aprovado pelo professor em 2026-09-26. Abre o Cap 12 ANTES de `#framework`.
> Objetivo: gastar a energia inicial da aula (~60–70 min) numa teoria bem didática de
> HTTP/API/REST, para que `@PostMapping`, `201` e `404` já tenham significado quando aparecerem.

## Regra central da Parte 0

> O navegador pede; o servidor responde. O servidor web **entrega** o frontend, que **roda no
> navegador** do cliente e só mostra telas. Regras ficam na **API**; dados ficam no **banco**.
> Toda requisição (método + URL) volta como uma resposta (status + corpo).

Correção conceitual importante: o servidor web NÃO executa o frontend. Ele entrega os arquivos
(HTML/CSS/JS) e o front roda na máquina do cliente — por isso qualquer um mexe nele pelo F12, e
por isso regra de negócio não pode morar lá.

## Caso contínuo

Maria entra em **programaai.dev** (marca do curso) e se inscreve no curso Fullstack.
`api.programaai.dev` é endereço **fictício**, marcado como exemplo. No fim da Parte 0, a mesma
viagem vira a do GestorPRO: Fornecedor, `/fornecedores`, 5 endpoints do capítulo.

## Filme HyperFrames `jornada-http` (mudo, legendas na tela, professor narra)

Um único mp4 com **6 fluxos** marcados por tempo. O player da página:

- **sem autoplay**, sem loop, sem som; `preload="metadata"` + poster;
- botões numerados por fluxo, ◀ anterior, ▶ tocar este fluxo, próximo ▶, ↺ repetir, velocidade;
- **pausa sozinho no fim de cada fluxo** — o professor avança quando terminar de explicar;
- cada fluxo termina num quadro "de repouso" legível (pode ficar pausado ali).

| Fluxo | O que acontece | Tags pequenas |
|---|---|---|
| 1 | Maria digita a URL; anatomia (https · domínio · caminho); DNS = agenda (domínio → IP) | — |
| 2 | `GET /` viaja até o servidor web; volta `200 OK` com 3 arquivos; página monta **no PC da Maria** | GET · 200 |
| 3 | Formulário preenchido; front: "eu só mostro telas"; cofre de regras do outro lado | — |
| 4 | `POST /inscricoes` + JSON viaja até a API (endpoint); API confere regras; "onde estão os dados?" → 🐳 container com 🐘 PostgreSQL (porta 5432, não HTTP); `INSERT` → id | POST · SQL |
| 5 | Resultado sobe; API monta a resposta: envelope muda de cor, `201 Created` + JSON; tela "Inscrição confirmada" | 201 |
| 6 | Caminho do erro: e-mail vazio → a API recusa **antes** do banco → `400 Bad Request` → mensagem na tela | 400 |

**Regras de velocidade (pedido explícito do professor):** uma coisa se mexe por vez; viagem de
pacote 1,6–2,2 s; parado ≥ 2 s ao chegar; legenda na tela ≥ 0,3 s/palavra + 1,5 s; nenhum
"flash" ou stagger rápido; transições de entrada ≥ 0,6 s. Revisar por snapshots antes do render.

Erro escolhido = **400** (bate com a regra "nome vazio → 400" do capítulo). 409 só aparece no
quadro de status como "existe por aí".

## Seções novas (antes de `#framework`)

1. `#web` — **Um clique no programaai.dev**: gancho + player completo + as 5 estações.
2. `#navegador` — **O navegador pede a página**: URL, DNS, servidor web, 1ª requisição, front
   roda no navegador. Quiz "onde o frontend roda?".
3. `#vitrine` — **O frontend só mostra telas**: vitrine × cofre, F12, prática na aba Network
   (qualquer site / GestorPRO do Cap 10). Quiz.
4. `#requisicao` — **Pedir à API**: endpoint, anatomia da requisição (método, URL, headers,
   corpo), API tem regra mas não guarda dado → banco em container. Lab "Monte a requisição".
5. `#resposta` — **Toda requisição vira resposta**: anatomia da resposta, famílias 1xx–5xx,
   os 6 status do capítulo (200, 201, 204, 400, 404, 500). Jogo "qual status volta?".
6. `#rest` — **Métodos HTTP e REST**: GET/POST/PUT/DELETE ↔ CRUD (PATCH em box), URL =
   substantivo, método = verbo; os 5 endpoints de hoje. Ponte para `#framework`.

Na seção `#sql`, revelar a 3ª coluna: HTTP ↔ CRUD ↔ **SQL**. Em `#viagem`, dizer que é o
"zoom" dentro da caixa API do filme de abertura.

## Tempo do Encontro A

Com ~65 min de teoria, o Encontro A estoura. Decisão proposta: **instalação do Docker Desktop
como tarefa antes da aula** (box no `#mapa` e no `#instalacao`); a aula só confere
`docker version`.

## Implementação — 2026-09-26

- **Filme** `tooling/hyperframes/jornada-http/` (pin hyperframes@0.7.45, mesmo dos outros vídeos;
  GSAP, 1920×1080, 30 fps, 140 s, mudo). `npm run check:http` / `npm run render:http` na pasta
  `tooling/hyperframes/`. Saída: `assets/video/jornada-http.mp4` (~18 MB) + poster `.png`
  (frame 96,5 s = fim do fluxo 4, com todas as estações visíveis).
  Fronteiras dos fluxos: **0 · 18 · 40 · 61 · 97 · 118 · 140** — se mudar o timeline, atualizar
  `FLUXOS` em `capitulos/12-spring-primeira-api/parte0.js`.
- **Player** (`parte0.js`/`parte0.css`, componente `.fluxo-player`): sem autoplay, sem loop; chips
  por fluxo, ◀ Anterior, ▶ Tocar/⏸ Pausar, ↺ Repetir, Próximo ▶, velocidade 0,75/1/1,25×, tela
  cheia; teclado (Espaço/K, ←/→, R) com o player focado. Pausa sozinho no fim do fluxo (rAF +
  `timeupdate` como freio reserva) e volta ao último quadro. `data-only="2,3"` limita os chips —
  cada seção H2–H5 tem um player compacto só com os seus fluxos; o H1 tem o filme inteiro.
  Tocar um player pausa os outros. Sem JS, o `<video controls>` nativo continua funcionando.
- **Atenção servidor:** pular para um fluxo exige servidor com suporte a Range (Live Server,
  GitHub Pages, Vercel, `npx http-server`, file://). `python3 -m http.server` NÃO seek-a — o vídeo
  volta para 0. Launch config `material-fullstack` (raiz) usa `npx http-server` na porta 8792.
- **Seções** H1 `#web` · H2 `#navegador` · H3 `#vitrine` · H4 `#requisicao` · H5 `#resposta` ·
  H6 `#rest` (numeração H, `sn-blue`, para não renumerar 01–17). 5 quizzes `.decision` novos,
  LAB H1 “Qual status volta?” (7 situações, conta acerto de primeira) e LAB H2 “Monte a
  requisição” (5 pedidos = os 5 endpoints do capítulo, feedback específico para verbo na URL e
  POST com id). Prática real de DevTools (Elements + Network) com olhinho.
- Ajustes fora da Parte 0: `#mapa` (Encontro A começa por HTTP/API/REST + tarefa de casa: instalar
  Docker Desktop), `#instalacao` (box “fez a tarefa de casa?”), `#sql` (tabela CRUD ↔ HTTP ↔ SQL
  ligada ao fluxo 4), `#viagem` (frase do “zoom” na caixa API do filme).
- Correção de bug antigo: `.tip`/`.warning` do `components.css` são flex e quebravam texto com
  `<strong>`/`<code>` em colunas no Cap 12 inteiro → `display:block` em `parte0.css`.
- Verificado: snapshots do filme revisados por fluxo; Chrome headless desktop 1440 e 390 px sem
  overflow horizontal nem erro de console; pausa no fim do fluxo; labs certo/errado;
  `validate-cap12.py` e `validate-cap12-browser.mjs` continuam passando.
