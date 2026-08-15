# 09 — Plano dos Caps 09 (IA & Agentes) e 10 (Projeto: sistema de gestão)

> Sessão de planejamento 2026-08-14. A partir daqui o curso introduz **agentes de codificação**
> (Claude Code, Codex, Antigravity…) — mas como formação de ENGENHEIRO, não de "operador de
> agente". Tese do arco: os alunos fizeram os Caps 1–8 inteiros NA MÃO justamente para agora
> terem o pré-requisito real de usar agentes bem — **capacidade de especificar e revisar**.
> O Cap 10 fecha a metade Frontend com um sistema completo (clientes, fornecedores, produtos).
>
> Decisões do professor (2026-08-14):
> 1. **Dois capítulos**: Cap 09 = super aula de IA/agentes · Cap 10 = projeto completo.
> 2. **Ferramenta livre, Claude Code recomendado** — teoria agnóstica, material mostra o fluxo
>    (prompt → diff → revisão) que vale para todas; setup de 2–3 ferramentas lado a lado.
> 3. **O projeto fecha o front.** O antigo "Cap 9 — Integração real (JWT/Spring/deploy)" SAI
>    do mapa do frontend e migra para a metade backend (quando a turma construir a API).

## Amarras herdadas (não renegociar)

- Turma nova **não viu backend nem git** ([[feedback-turma-nova-sem-backend]]): backend é
  futuro ("esse json-server vira a SUA API Java na 2ª metade"); **sem git** — versões são
  cópias de pasta, com box honesto "no mercado é git, vem na metade backend".
- Stack que o aluno DOMINA (e o projeto NÃO pode extrapolar): componentes rafce/arrow, JSX,
  props, `.map()`/`key`, imagens public/assets, CSS Modules, `&&`/ternário, useState, eventos,
  formulários controlados, "estado mora no pai", useEffect (O QUE, QUANDO), json-server,
  **axios (GET, incl. por id)**, loading/erro, Router (BrowserRouter, Routes/Route, Link,
  useParams, 404, early return). **fetch não** (só box), **async/await não**, JWT não.
- Novidades técnicas permitidas no arco (todas "honestas e assumidas", padrão do Cap 8):
  **axios.post/put/delete** (o coração do CRUD), **useNavigate** (o Link via código),
  pasta **`src/pages/`** (junto da `components/`), `window.confirm` no excluir.
- RAFCE/arrow em todo componente ("Rafael do Ceará") + aviso de IDE onde `=>` aparece.
- Ligaduras OFF, escapar `<>&` em `<pre>`, PT-BR, olhinho 👀, memes só com aprovação.
- **"Forçar o VSCode" evolui, não morre**: na era do agente, o que o aluno digita de verdade
  são (a) a Fase 1 do projeto inteira no VSCode, sem agente; (b) os PROMPTS (o prompt é o
  novo código digitado — nunca copiar/colar cego); (c) as correções da revisão.
- **Regra de ouro do arco (repetir até virar mantra): nunca aceite um diff que você não
  consegue explicar em voz alta.** No mercado, código de IA sem revisão = PR reprovado.

## O truque didático central do arco: a escada "na mão → junto → você comanda"

O projeto tem 3 módulos IGUAIS em estrutura (lista + cadastrar + excluir + editar):

1. **👥 Clientes — NA MÃO** (Fase 1): o aluno constrói o módulo inteiro no VSCode, como nos
   caps anteriores. Vira o *gabarito mental*: ele sabe exatamente quanto custa e como se faz.
2. **🚚 Fornecedores — JUNTO com o agente** (Fase 2): prompts-spec prontos no material,
   um por feature, cada um seguido do **ritual de revisão**. Como ele ACABOU de fazer o
   equivalente na mão, ele sabe julgar se o agente seguiu o padrão do curso.
3. **📦 Produtos — VOCÊ COMANDA** (Fase 3): o aluno escreve os próprios prompts (padrão
   solo/olhinho — o olhinho agora guarda o *prompt de referência* + pontos de revisão).

E a joia da coroa: os alunos escrevem, com o prof, o **AGENTS.md/CLAUDE.md do projeto** —
o requisito "implementar só do jeito que estudamos" deixa de ser torcida e vira **engenharia
de contexto** (regra em arquivo > regra na conversa, que o modelo esquece). É a prova viva de
que quem não sabe React não consegue nem escrever esse arquivo.

## Vídeos (candidatos — pipeline HyperFrames/Remotion existente, 16:9 1080p loop sem áudio)

| Arquivo | Cap | Conteúdo (3 atos) |
|---|---|---|
| `loop-do-agente.mp4` | 9 | O flagship: pedido entra ("adicione um botão de curtir") → agente 🧠 planeja → 📖 lê `CartaoProduto.jsx` → ✏️ edita → 🖥️ roda → ❌ erro no console → 🔁 corrige → ✅ pronto → **payoff: a lupa do revisor (VOCÊ) aprova o diff**. A mensagem: agente = loop de tentativa com ferramentas, não mágica. |
| `proxima-palavra.mp4` | 9 | Frase se completando palavra a palavra com "chips de probabilidade" concorrendo; vira código (`const [contador, set…` → completa certinho) — código é texto MUITO previsível; fecha com um tropeço (alucinação) para plantar a seção 2. |
| `quatro-verbos.mp4` | 10 | Balcão do json-server: 4 envelopes (GET pede a lista, POST entrega ficha nova → ganha id, PUT troca uma ficha, DELETE some) e o `db.json` reagindo a cada um. Continua a gramática visual cliente↔servidor dos vídeos de fetch. |

---

# CAP 09 — `capitulos/09-ia-agentes/` · "IA & Agentes: seu novo par de programação"

**Promessa:** "Você passou 8 capítulos digitando tudo na mão. Hoje você ganha um estagiário
genial que digita a mil por hora — e descobre por que só quem fez o caminho na mão consegue
ser o CHEFE dele."

**Fio narrativo:** o que é um LLM (prever a próxima palavra) → limites (contexto, alucinação)
→ o que transforma LLM em AGENTE (ferramentas + loop) → panorama do mercado → instalar e dar
o primeiro "oi" → prompt = mini-spec → revisão como identidade profissional.

## Roteiro de seções (alvo ~2h50)

| # | Seção | Tempo | O que acontece |
|---|---|---|---|
| 0 | Hero + aquecimento | 10 min | Quiz provocativo: "Se a IA escreve código sozinha, por que você passou 8 capítulos digitando React na mão?" (opções plantam a tese: quem não sabe ler código vira refém do que a IA cospe — e o mercado paga quem REVISA). |
| 1 | 🔮 **O que é um LLM** | 25 min | Analogia: o **autocompletar do teclado turbinado** — um completador de frases que "leu a internet inteira". Prever a próxima palavra, de novo e de novo. Tokens (o texto picado). Por que funciona TÃO bem pra código: código é texto cheio de padrão (o aluno já viu: todo componente rafce é igual). Vídeo `proxima-palavra.mp4` + máquina 🔮. Concept: ele não "pensa" — prevê. E isso basta pra muita coisa. |
| 2 | 📦🤯 **Contexto & alucinação** | 20 min | Janela de contexto = a **mesa de trabalho** (cabe muita coisa, não cabe tudo; o que sai da mesa é esquecido — máquina 📦). Alucinação = completar BONITO sem saber (o modelo nunca diz "não sei" sozinho): lib inventada, método que não existe. Quiz "Verdade ou Invenção?". Regra: confiar, mas **conferir rodando**. |
| 3 | 🦾 **Do chat ao agente** | 25 min | O chat só FALA; o agente tem **MÃOS**: ferramentas (ler arquivo, escrever arquivo, rodar comando no terminal, ler o erro). O **loop do agente**: entender → planejar → agir → observar → repetir até pronto. Vídeo `loop-do-agente.mp4` + máquina 🔁 (a máquina-mor). Analogia-mor do arco: **o estagiário genial** — leu a internet inteira, digita a mil, MAS não conhece o SEU projeto, aceita qualquer ordem sem reclamar e precisa de um tech lead. O tech lead é VOCÊ. |
| 4 | 🗺️ **O mercado de agentes** | 15 min | Cards: **Claude Code** (Anthropic, terminal — o que o prof usa e recomenda), **Codex** (OpenAI), **Antigravity** (Google), Cursor, Copilot. Todos rodam o MESMO loop; muda o modelo e a embalagem. Aviso: planos/free tiers mudam rápido — checar na semana da aula. Escolha livre: o material ensina o FLUXO, que é igual em todas. |
| 5 | 🛠️ **Bora instalar** | 20 min | Setup lado a lado (blocos por ferramenta, aluno segue UM): instalar → logar → abrir na pasta de um projeto → primeiro contato. Conceito de permissão: o agente PEDE antes de mexer/rodar — ler antes de aceitar (primeira dose do ritual). |
| 6 | ✍️ **Prompt = mini-spec** | 25 min | A dor primeiro: prompt vago → resultado fora do padrão (máquina ⚖️). Os **4 ingredientes do prompt de engenheiro**: 1) CONTEXTO ("projeto React com Vite, componentes em src/components…") · 2) TAREFA (o quê, específico) · 3) RESTRIÇÕES (como sim e como NÃO: "arrow function, CSS Module, não instale nada") · 4) CRITÉRIO DE ACEITE ("pronto quando X aparecer ao clicar Y"). Escrever prompt = escrever requisito — habilidade de engenheiro, não de "usuário de IA". |
| 7 | 👀 **Revisão: a regra de ouro** | 20 min | Nunca aceite código que não consegue explicar. O **ritual de revisão** (usado no Cap 10 inteiro): ① rodou? ② li o diff linha a linha? ③ segue o padrão do curso? ④ tem algo que EU não pedi? ⑤ consigo explicar em voz alta? Truque de tutor: pedir ao próprio agente "explique o que você fez e por quê". Máquina 🕵️ Caça ao Intruso. |
| 8 | 🐛 **BugZilla do agente** | 10 min | 5 clássicos (abaixo). |
| 9 | 🏋️ **Treino encadeado** | ~40 min | Sobre uma **CÓPIA da Mini-loja** (proteger o original!) — abaixo. |
| 10 | Resumo + gancho | 5 min | "Ferramenta instalada, ritual aprendido. Cap 10: você + seu par incansável constroem um sistema de gestão COMPLETO — e ele vai trabalhar do SEU jeito." |

## Máquinas didáticas (5)

1. 🔮 **Máquina da Próxima Palavra** — o aluno escolhe o início ("O gato subiu no…" /
   `const [contador, set`) → chips de palavras candidatas com barras de probabilidade →
   a vencedora encaixa e o processo repete. Modo código mostra o acerto quase perfeito;
   um dos inícios leva a um tropeço (pré-alucinação).
2. 📦 **Mesa de Contexto** — a "mesa" vai recebendo blocos (pergunta, arquivo, conversa);
   quando enche, os blocos mais antigos caem da borda (esquecidos) — e a resposta muda.
   Botão "colocar arquivo gigante na mesa" mostra o custo. (Gancho: por isso regras de
   projeto moram em ARQUIVO que o agente relê, não na conversa — semente do AGENTS.md.)
3. 🔁 **Loop do Agente** (máquina-mor) — pedido entra e a esteira acende: 🧠 planeja →
   📖 lê `CartaoProduto.jsx` → ✏️ edita → 🖥️ roda → ❌ erro → 🔁 corrige → ✅. Console
   simulado mostra as ferramentas sendo chamadas como num agente real. Botão "pedido
   ambíguo" → o loop termina "✅" mas o resultado é OUTRA coisa (a dor da seção 6).
4. ⚖️ **Prompt Vago × Prompt Spec** — toggle entre dois prompts pro MESMO pedido; o
   resultado (código + prévia) troca junto: vago = lib nova, `function`, CSS global,
   texto em inglês; spec = rafce, CSS Module, padrão do curso. O diff de qualidade é visível.
5. 🕵️ **Caça ao Intruso** — um diff simulado (verde/vermelho) de "adicione um rodapé";
   escondidos, 3 intrusos: dependência nova no `package.json`, `function` em vez de arrow,
   `style.css` global. O aluno clica nas linhas suspeitas; acertos acendem o motivo.

## BugZilla do agente (5)

1. **A lib fantasma** — `import { useFetch } from 'react'`: alucinou um hook que não existe.
   Como perceber: rodou? quebrou? o React não tem isso — confira no que VOCÊ aprendeu.
2. **O prompt vago que virou reforma** — "melhora aí" → diff de 14 arquivos. Prompt sem
   restrição = agente decide por você. (E como pedir: "desfaça; mude SÓ o CartaoProduto".)
3. **A dependência clandestina** — pediu um formulário, ganhou `react-hook-form` no
   `package.json`. Onde olhar SEMPRE: o diff do package.json.
4. **A dívida de compreensão** — aceitou 3 diffs sem ler; agora não sabe onde nada está e
   não consegue nem PEDIR direito. (O único bug cuja vítima não é o código — é você.)
5. **A regra esquecida** — disse "use CSS Modules" lá na 5ª mensagem; 20 mensagens depois o
   agente voltou pro CSS global (a mesa de contexto encheu). Antídoto: regra em arquivo —
   é o AGENTS.md, estrela do Cap 10.

## Treino encadeado — "Domando o estagiário" (sobre CÓPIA da Mini-loja dos Caps 4–8)

P0 do treino: **copiar a pasta** da Mini-loja (`mini-loja` → `mini-loja-com-agente`) e
`npm install` na cópia. Box: "no mercado isso é um branch do git — metade backend".

| P | Tipo | ★ | Conteúdo |
|---|---|---|---|
| 1 | guiado | ★ | Instalar a ferramenta escolhida, abrir na pasta da cópia e pedir: "Explique este projeto para um iniciante". Ler a resposta e conferir com o que VOCÊ sabe (você construiu!). O agente como tutor. |
| 2 | guiado | ★ | Pergunta dirigida: "Explique linha por linha o useEffect do App.jsx". Comparar com o mnemônico (O QUE, QUANDO). Primeira constatação: ele explica BEM — e você consegue julgar porque sabe. |
| 3 | guiado | ★★ | Primeira edição com prompt-spec dado no material (rodapé `Rodape.jsx`: rafce, CSS Module, sem libs, critério de aceite) → **ritual de revisão completo** no diff, no padrão da seção 7. |
| 4 | solo | ★★ | Experimento A/B: pedir a MESMA feature (selo "🔥 Promoção" nos produtos com `preco < 100`) primeiro com prompt VAGO ("bota uma promoção aí") → analisar o estrago → pedir "desfaça" → agora com prompt-spec (4 ingredientes). Registrar as diferenças (olhinho traz um A/B de referência). |
| 5 | solo (chefão) | ★★★ | **Caça ao bug invertida**: sabote a cópia de propósito (o material dá o crime: remover a `key` do `.map()` E apagar um `import`) e peça ao agente para **diagnosticar SEM corrigir** ("me explique o que está errado, não mude nada"). Depois corrija VOCÊ na mão. Payoff: o agente é ótimo detetive — mas quem assina o conserto é o engenheiro. |

**Casa:** usar o agente como tutor de véspera: "me faça 5 perguntas de useState e useEffect e
corrija minhas respostas" + testar uma SEGUNDA ferramenta do panorama e comparar a experiência.

**Quizzes:** abertura (por que aprender na mão), Verdade ou Invenção (seção 2), qual prompt é
spec (seção 6), saída (o que fazer antes de aceitar um diff).

**Memes (aprovação prévia!):** Gigachad "EU sei o que esse código faz" (aluno revisando diff) ·
botão suado "aceitar tudo sem ler" · "estagiário genial contratado" (foto de terminal).

---

# CAP 10 — `capitulos/10-projeto-gestor/` · "Projeto: GestorPRO — clientes, fornecedores & produtos"

> Nome do sistema **a confirmar com o prof** (proposta: GestorPRO; alternativas: GestorDev,
> ControlaJá). Shape do `db.json` deve conversar com o ERP da metade backend.

**Promessa:** "Seu primeiro SISTEMA de verdade: 3 módulos, formulários que salvam, rotas,
dashboard — construído por você E pelo seu agente, do jeito que o mercado trabalha. É o
projeto que fecha o Frontend — e abre o seu portfólio."

**Fio narrativo:** a escada. Clientes na mão (gabarito mental + os 4 verbos do HTTP) →
AGENTS.md (as regras da casa) → Fornecedores junto com o agente (ritual de revisão em cada
feature; a revisão guiada do PUT é a aula de PUT) → Produtos sob seu comando → Dashboard
chefão → formatura do front.

**Formato: ~2 encontros** (Fase 1 = encontro A; Fases 2–3 + chefão = encontro B + casa).

## O sistema

- **Rotas:** `/` (dashboard) · `/clientes` · `/clientes/novo` · `/clientes/:id/editar` ·
  idem `/fornecedores/*` e `/produtos/*` · `*` (404). Navbar com `Link` em todas as páginas.
- **Pastas:** `src/pages/` (uma por rota — novidade honesta) + `src/components/` (Navbar,
  e o que repetir) + CSS Modules por página/componente + logo em `src/assets/`.
- **Dados:** json-server com `db.json` de 3 coleções (`clientes`: nome, email, telefone,
  cidade · `fornecedores`: nome, cnpj, categoria, telefone · `produtos`: nome, preco,
  estoque, categoria — **shape final a conferir com o ERP**). Listas em TABELA (as
  `<table>` do Cap 1 voltam com moral: sistema de gestão é tabela, não card).
- **Sem** login/JWT (metade backend), **sem** libs além de axios + react-router-dom.

## Roteiro — Encontro A · Fase 1: Clientes NA MÃO (alvo ~2h50)

| # | Seção | Tempo | O que acontece |
|---|---|---|---|
| 0 | Hero + a visão | 15 min | Propaganda do GestorPRO: mockup do dashboard + 3 módulos, mapa de rotas, "o json-server de hoje é a SUA API Java de amanhã". Regra do capítulo anunciada: **Fase 1 é 100% na mão — o agente só entra na Fase 2** (e por quê: sem gabarito mental não há revisão). |
| 1 | 🗺️ **Arquitetura** | 15 min | Máquina 🗺️ GPS do GestorPRO (rotas ↔ pages). Concept `src/pages/` × `src/components/` (novidade honesta: página = componente que o Router chama). `db.json` das 3 coleções. |
| 2 | 🧱 **Fundação** | 30 min | Guiado: Vite → faxina → `npm i axios react-router-dom` → `db.json` + json-server no ar → BrowserRouter + Navbar (Link) + as rotas apontando para pages vazias ("Em construção") + 404. Tudo Cap 8 — em ritmo de revisão. |
| 3 | 📮 **Os 4 verbos do HTTP** | 20 min | Até hoje, só GET. Analogia do balcão dos correios: GET consulta, POST entrega ficha nova, PUT troca a ficha, DELETE cancela. **CRUD** apresentado (agora sim o termo, com lastro). Vídeo `quatro-verbos.mp4` + máquina 📮. `axios.get/post/put/delete` — mesma cara, verbo diferente. |
| 4 | 👥 **Clientes: listar** | 25 min | Guiado: `pages/Clientes.jsx` — useEffect + axios + carregando/erro + `<table>` com `.map()`. Zero conceito novo — anunciar isso (motiva: "você já sabia fazer uma tela de sistema"). |
| 5 | ➕ **Clientes: cadastrar** | 30 min | Guiado: `/clientes/novo` — formulário controlado (Cap 6) → `axios.post('/clientes', {...})` (sem mandar id: o json-server cria) → **useNavigate** (novidade honesta: "o Link que acontece via código, depois do salvar") de volta pra lista. |
| 6 | 🗑️ **Clientes: excluir** | 20 min | Guiado→solo: botão na linha da tabela → `window.confirm` → `axios.delete` → atualizar o estado com `.filter()` (Cap 2/6). Concept-mor: **servidor e tela são dois mundos** — apagar lá não redesenha aqui. |
| 7 | ✏️ **Clientes: editar** | 25 min | Guiado: `/clientes/:id/editar` — useParams (Cap 8) + GET por id pré-enchendo o form (mesmo formulário, estado inicial da API) + `axios.put`. Fecha o CRUD na mão. (Se o tempo apertar: editar vira o 1º item do encontro B, antes do AGENTS.md.) |
| 8 | Resumo do encontro | 5 min | "Você fez UM módulo inteiro na mão e sabe o preço de cada linha. No próximo encontro, o estagiário faz o segundo — e você vira o chefe." Casa: campo extra no form (ex.: cidade com `<select>`) + 5+ clientes no db.json. |

## Roteiro — Encontro B · Fases 2–3: o agente entra (alvo ~2h50 + casa)

| # | Seção | Tempo | O que acontece |
|---|---|---|---|
| 9 | 📜 **AGENTS.md: as regras da casa** | 25 min | A estrela do capítulo. Relembrar o bug 5 do Cap 9 (regra na conversa é esquecida) → cada ferramenta lê um arquivo de regras (CLAUDE.md / AGENTS.md — padrão de mercado). Escrever JUNTOS o do GestorPRO: stack travada (só o que estudamos, lista explícita de hooks permitidos), rafce/arrow, CSS Modules, pages/components, axios (nunca fetch), PT-BR, "não instale nada", "siga o padrão do módulo Clientes". Teste imediato: pedir algo que viola (ex.: "faça com Tailwind"?) e ver o agente recusar citando a regra. Payoff da tese: **só quem sabe React escreve esse arquivo**. |
| 10 | 🚚 **Fornecedores: JUNTO** | 45 min | Um prompt-spec por feature (o material traz o prompt em code-block — o aluno digita e adapta): ① listar → ② cadastrar → ③ excluir → ④ **editar**. Cada um: prompt → **ritual de revisão** (checklist da seção 7 do Cap 9) → testar no navegador. A revisão do ④ é feita em voz alta com o prof comparando POST×PUT lado a lado — **o code review É a aula**. Cronometrar na lousa: o módulo que levou um encontro na mão sai em ~30 min — e discutir POR QUE isso não te substitui (quem validou cada diff?). |
| 11 | 📦 **Produtos: VOCÊ COMANDA** | 40 min | Solo (padrão 05b): "pedidos do cliente" com critérios de aceite (listar com preço formatado + selo "⚠️ estoque baixo" com porteiro `estoque < 5` · cadastrar · excluir · editar). O aluno escreve os próprios prompts com os 4 ingredientes; olhinho = **prompt de referência + pontos de revisão** (não só código). 🚨 PARE antes de cada olhinho, como sempre. |
| 12 | 📊 **Chefão: o Dashboard** | 25 min | Solo ★★★: `/` vira painel — 3 cards de contagem (3 GETs + `.length`), atalhos com Link, um destaque (ex.: total de produtos com estoque baixo — `.filter().length`). Aluno escolhe a via (na mão OU por prompt) — mas o ritual de revisão vale igual. É o screenshot do portfólio. |
| 13 | 🐛 **BugZilla** | 10 min | 5 bugs (abaixo). |
| 14 | 🎓 **Resumo + formatura do front** | 10 min | Recap do arco 1→10 (linha do tempo do que foi construído na mão e com agente). Gancho-mor: "na metade backend, você apaga o json-server e liga o GestorPRO na API que VOCÊ vai escrever em Java. Mesmo axios, mesmo endereço, cozinha nova." |

**Casa (encontro B):** busca/filtro nas 3 listas (payoff do Cap 6) + plural nos cards do
dashboard (ternário) + bônus ★★★ via agente COM ritual: modo escuro (useState + classe
condicional no container) e ordenação por nome (`[...lista].sort()` — dica no olhinho).

## Máquinas didáticas (3 — capítulo de projeto, mais leve, como o 05b)

1. 🗺️ **GPS do GestorPRO** — o mapa de rotas do sistema: aluno clica a URL, o miolo mostra
   qual page renderiza (e o 404 no endereço errado). Reusa o padrão do GPS do Cap 8, agora
   com as rotas REAIS do projeto (inclui `/clientes/:id/editar` acendendo o useParams).
2. 📮 **Balcão do CRUD** (máquina-mor) — escolhe o verbo + o recurso → envelope viaja até o
   json-server → resposta volta E o painel `db.json` reage: POST cria com id novo, PUT troca
   a ficha, DELETE some, GET não muda nada. O caso de erro: PUT sem `/:id` → 404 do servidor.
3. 🕵️ **Revisor de Plantão** — evolução do Caça ao Intruso do Cap 9, agora com um diff
   "real" do módulo Fornecedores violando o AGENTS.md em 3 pontos (`function` declarada,
   `fetch` em vez de axios, CSS global). O aluno marca as linhas; cada acerto mostra QUAL
   regra do AGENTS.md foi violada — treino direto pra seção 10.

## BugZilla (5)

1. **O F5 revelador** — excluiu no servidor, tela só muda no F5: esqueceu o set/`.filter()`.
   Servidor e tela são dois mundos; o estado é a ponte.
2. **O id intrometido** — mandou `id` no `axios.post` → ids duplicados/bagunçados no db.json.
   Quem batiza é o json-server (e amanhã, o banco de dados).
3. **O PUT sem endereço** — `axios.put('/fornecedores', ...)` sem `/:id` → 404: PUT troca UMA
   ficha, a URL precisa dizer QUAL. Ler a URL como endereço de uma coisa, não da coleção.
4. **O agente rebelde** — o formulário veio com `react-hook-form` (ou `useRef`): viola o
   AGENTS.md. Como corrigir SEM aceitar: "refaça seguindo o AGENTS.md — formulário controlado
   com useState, como o módulo Clientes". (O bug vira demonstração do poder do arquivo.)
5. **`Failed to fetch`, o retorno** — json-server caiu no meio da aula. Diferença pro Cap 7:
   agora o aluno diagnostica SOZINHO (ler o erro → olhar o terminal → subir de novo) — e é
   assim que se percebe que ele virou dev.

**Quizzes:** abertura (por que fase 1 é na mão), verbo certo pra cada ação (seção 3),
onde mora a regra do projeto (seção 9), saída (checklist de revisão do diff do agente).

**Memes (aprovação prévia!):** "json-server caiu" (This is fine) · Drake: "aceitar o diff
sem ler" ✋ / "revisar citando o AGENTS.md" 👉 · cronômetro Fornecedores 30min (chad aluno).

---

## Ordem de produção sugerida

1. Vídeos do Cap 9 (`loop-do-agente` primeiro — é o flagship; `proxima-palavra` se der).
2. Cap 9 completo (HTML + 5 máquinas + treino) — checklist ligaduras/escapes; blocos de
   setup por ferramenta conferidos com os planos/free tiers da SEMANA da publicação.
3. Projeto de referência do GestorPRO construído de verdade (Fase 1 na mão + AGENTS.md +
   fases 2–3 com agente) — os prompts do material saem do que FUNCIONOU aqui, não de teoria;
   mockup/screenshots do hero saem desse projeto.
4. Vídeo `quatro-verbos` → Cap 10 completo (encontros A e B).
5. Hub: destravar cards 09/10 (pills novas), botão "Próximo" do Cap 8 → Cap 9; card do
   antigo "09 integração" sai do mapa (migra pra metade backend).
6. Memes: só após aprovação das ideias listadas.
7. Registrar decisões novas no `05-decisoes.md` + atualizar `04-conteudo-curso.md` + pin.

## Pendências que dependem do professor

- **Nome do sistema** (GestorPRO?) e conferência do **shape do db.json** contra o ERP.
- ✅/❌ dos memes propostos (regra 6 do CLAUDE.md).
- **Ferramentas na semana da aula**: conferir planos/free tiers (mudam rápido) e decidir o
  plano B de sala para quem não conseguir ativar nenhuma (dupla com colega? conta do prof
  projetada?). Claude Code recomendado; Codex/Antigravity documentados.
- Validar as **novidades honestas**: useNavigate, `src/pages/`, tabelas no CRUD,
  `window.confirm` — e a decisão de **PUT ensinado na mão** (seção 7 do encontro A; se
  preferir mais enxuto, PUT pode estrear direto na revisão guiada dos Fornecedores).
- Confirmar **sem git** (cópias de pasta) para esta turma.
