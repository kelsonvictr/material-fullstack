# 11 — Plano do Cap 11 · "Java & OO: a base antes do Spring"

> Sessão de planejamento 2026-09-03/04. Pedido do prof: *"um próximo cap sobre Java e OO Básico Pré Spring, algo muito top, didático, que em uma manhã de sábado vire o jogo para quem vai aprender Java e Spring do zero e precisa de uma base de Java. Ultra mega hiper didático. Fluxos animados."*
>
> Método: painel de 3 propostas pedagógicas (lentes "tradutor JS→Java", "engenharia reversa do Spring", "primeiro a dor, depois a máquina") + rascunho do orquestrador → 3 juízes (professor / aluno iniciante / engenheiro de material) → síntese com enxertos. Vencedora: **"primeiro a dor, depois a máquina"**. Levantamento prévio do `backend-fullstack` revelou que **não existe nenhum material de Java básico no workspace** e que o backend assume sem ensinar: package/import, construtor, getters/setters, static, final, interface, `List<T>`, null/Optional, anotações — este cap cobre exatamente esse buraco. Mensagens de erro do javac/JVM 21 foram todas capturadas compilando de verdade (catálogo) e citadas verbatim.

Pasta: `capitulos/11-java-oo-basico/index.html`. Lente vencedora do painel: **"primeiro a dor, depois a máquina"**
(+ enxertos dos juízes). Este SPEC foi o CONTRATO dos agentes construtores. Companheiros: `11a-levantamento-backend.md` (o que o
backend assume/ensina) e **`11b-catalogo-erros-javac.md` (mensagens REAIS do javac/JVM 21 — sempre citar verbatim)**.

**Promessa:** "Você passou 10 capítulos no salão. Hoje entra na cozinha: em uma manhã você aprende a FALAR Java
o bastante pra escrever o GestorPRO de bolso — Produto, Cliente e um Service com cadastrar/listar/buscar/remover —
sem rede, sem Spring. No próximo sábado o Spring vai parecer 'a mesma coisa com etiquetas'."

**Fio narrativo:** o JS e o json-server são a cozinha de brinquedo: aceitam `"32" + 1`, aceitam produto sem estoque,
aceitam `preco: "banana"` — e você só descobre quando o dashboard mostra `NaN`. Java é a cozinha de verdade: tem um
**fiscal (javac)** que lê a receita inteira ANTES de acender o fogão. Cada seção: **dor → analogia → código → máquina →
🧨 provoque o erro (no SEU IntelliJ) → digita aí**. A estrela é a **ficha de cadastro 🗂️**: o `{ nome, preco, estoque }`
que seu React já consome vira uma classe `Produto` com molde, construtor, cofre (`private`) e balcão (getters/setters);
a lista `[]` vira `ArrayList<Produto>`; o CRUD do GestorPRO vira `ProdutoService` em memória — o Spring sem as
anotações. A Ponte 🌉 fecha: o salão (React) nem percebe quando a cozinha troca. Frase-âncora (custa zero):
**"Spring é o React do backend."**

**Ritual fixo "🧨 provoque o erro":** box `.warning` com ícone 🧨, uma linha errada para o aluno digitar de propósito no
IntelliJ, o sublinhado vermelho/mensagem que vai aparecer (do catálogo), e o conserto. Substitui o playground (não há
Java no navegador). Aparece 1× por seção de conceito.

## Recorte final para uma manhã — decisão de implementação (2026-09-04)

O capítulo foi implementado para caber em **4h25 de núcleo**, incluindo intervalo, prática e uma
pequena margem de conferência. A meta não é "ensinar toda a orientação a objetos", e sim deixar o
aluno capaz de **ler e escrever a estrutura Java que o Spring exigirá no sábado seguinte**.

- Núcleo obrigatório: compilação/JVM, tipos, métodos, classe/objeto, construtor/`this`,
  encapsulamento, `List<Produto>`, `ProdutoService`, `null` e a ponte para Spring.
- Prática obrigatória: `Produto` + `ProdutoService` com cadastrar, listar, estoque baixo, buscar e
  remover, no mesmo projeto.
- Extensão de até 20 min: `Cliente` + `ClienteService`, somente se a turma estiver fluindo; caso
  contrário vira casa.
- Casa/gancho: `Fornecedor`, que será a primeira `@Entity` do sábado seguinte.
- Fora do núcleo: herança, polimorfismo, classe abstrata, API de `Optional`, streams/lambdas,
  DTOs, Maven, JPA e injeção de dependência. Esses temas aparecem apenas como cheiro/transferência.

O desenho segue a skill `capitulo-didatico-interativo`: cada núcleo abre com um problema, declara
uma regra verificável, torna o mecanismo visível em uma simulação e pede uma decisão ou prática.
As máquinas cumprem o papel de teatro visual; personagens/vozes não foram adicionados porque
alongariam a manhã sem melhorar o modelo mental deste conteúdo.

## 1. Tabela-mestra

| # | arquivo-fragmento | id | emoji + título | subtítulo | min | step-number | máquina (prefixo) |
|---|---|---|---|---|---|---|---|
| 0 | (hero, no skeleton) | — | ☕ Java & OO: a base antes do Spring | — | 3 | — | — |
| 1 | 01-dores | `dores` | 🩹 Três dores que o JS te deixou passar | O salão e a cozinha de brinquedo nunca dizem "não" | 6 | sn-red | quadro estático salão × cozinha |
| 2 | 02-compilar | `compilar` | 🏭 O fiscal que barra antes de rodar | .java → javac → .class → JVM | 10 | sn-java | 🏭 Duas Esteiras (`cp-`) |
| 3 | 03-instalar | `instalar` | 🛠️ JDK 21 + IntelliJ: montando a cozinha | Sua primeira troca de IDE — e o primeiro programa | 25 | sn-js | terminal typewriter + `.anat` do main |
| 4 | 04-intervalo | `intervalo` | ☕ Intervalo | Salva o projeto e levanta (9 min) | 9 | sn-mint | card curto (sem connector duplo) |
| 5 | 05-tipos | `tipos` | 🔤 A caixa tem etiqueta: tipos | String, int, double, boolean — e a caixa que aceita null | 18 | sn-yellow | 🛃 Alfândega de Tipos (`al-`) |
| 6 | 06-fluxo | `fluxo` | 🔁 80% você já sabe: if, for, operadores | O Cap 2 traduzido, token a token | 8 | sn-blue | tradutor lado a lado ESTÁTICO (`ts-` só CSS) |
| 7 | 07-metodos | `metodos` | ⚙️ Métodos: a receita com tipo | Parâmetros e retorno com etiqueta — e o tal do static | 10 | sn-purple | ⚙️ Funil de Métodos (`mf-`) |
| 8 | 08-classes | `classes` | 🗂️ Classe e objeto: a ficha de cadastro | Em Java não existe { } solto — precisa do molde | 20 | sn-java | 🏭 Fábrica de Fichas (`ff-`) + pareamento JSON ↔ classe estático (`pj-`) |
| 9 | 09-construtor | `construtor` | 🏗️ Construtor e this: a ficha exige preenchimento | Sem campo esquecido — e a primeira anotação | 15 | sn-yellow | `.anat` do construtor + "voo dos argumentos" estático (`va-` só CSS) |
| 10 | 10-cofre | `cofre` | 🔒 private, getters e setters: o cofre e o balcão | A regra mora num lugar só — e é assim que o JSON nasce | 14 | sn-red | 🏦 Balcão do Cofre (`bc-`) |
| 11 | 11-listas | `listas` | 🚂 ArrayList<Produto>: a lista que só aceita Produto | add, get, size, remove e o for-each | 15 | sn-green | 🚂 Trem Tipado (`tt-`) |
| 12 | 12-servico | `servico` | 🧩 ProdutoService: o CRUD em memória | static × instância, e a dor do null | 14 | sn-purple | quadro static × instância (estático) |
| 13 | 13-ponte | `ponte` | 🌉 A Ponte pro Spring | O que você escreveu hoje, com etiquetas | 10 | style="background:var(--spring);color:#0a0a12" | 🌉 A Ponte (`pt-`) |
| 14 | 14-bugzilla | `bugzilla` | 🐛 BugZilla do Java | Os 8 tropeços clássicos de quem chega do JS | 5 | sn-red | — |
| 15 | 15-pratica | (sem id) | PROGRAMAÇÃO É PRÁTICA 💪 | card centralizado curto (padrão dos caps) | 1 | — | — |
| 16 | 16-treino | `treino` | ⌨️ Treino: GestorPRO de bolso | 6 passos encadeados no mesmo projeto | 57 | sn-java | consoles `.mini-browser.console` por passo |
| 17 | 17-resumo | `resumo` | 🎒 O que você leva | E o Raio-X: como você lia de manhã, como lê agora | 5 | sn-mint | Raio-X estático (`rx-` só CSS) |

Sidebar (grupo "Neste capítulo", nesta ordem, com dot na cor do step): dores · compilar · instalar · intervalo · tipos ·
fluxo · metodos · classes · construtor · cofre · listas · servico · ponte · bugzilla · treino · resumo.

## 2. Convenções Java do capítulo (travadas)

- **Java 21, IntelliJ IDEA Community**, projeto `gestorpro-java` (New Project → Java, build system IntelliJ, JDK 21,
  "Add sample code" marcado). Pacote **`br.com.sistemagestao.api`** criado na seção 3 (o mesmo endereço do Spring).
  Toda classe começa com `package br.com.sistemagestao.api;`. Classes: `Main`, `Produto`, `ProdutoService`, `Cliente`,
  `ClienteService` (treino), `Fornecedor`/`FornecedorService` (casa). Um arquivo por classe, criado por
  botão direito em `br.com.sistemagestao.api` → New → Java Class.
- Campos de `Produto`: `Long id` (nasce `null`; quem preenche é o Service; no backend, o banco), `String nome`,
  `double preco`, `int estoque`. **Nunca** chamar `double` de "certo pra dinheiro": box com `0.1 + 0.2` (Java imprime
  `0.30000000000000004` igual ao JS) + "no backend dinheiro é `BigDecimal`; hoje `double` pra aprender OO sem tropeço".
  Campos de `Cliente`: `Long id, String nome, String email, String telefone, String cidade`.
- Comparação: primitivos com `==`; objetos (`String`, `Long`) com `.equals()`. Literais `Long`: `2L`, `99L`.
- `static`: explicado na seção 7 (telefone da empresa × celular de cada funcionário; "no `Main` tudo é `static` por
  enquanto — volto nisso na seção do Service") e fechado na 12 com o erro `non-static method … static context`.
- `final`: 1 box na seção 5 — "a caixinha LACRADA do `const` do Cap 2; no backend aparece como `private final`".
- `package`/`import`: `package` na seção 3 (CEP da classe); `import java.util.ArrayList; import java.util.List;` na 11
  (o IntelliJ oferece Alt+Enter; mostrar o erro `cannot find symbol … class List` sem o import).
- Anotação: `@Override` no `toString` (seção 9) = "post-it que alguém lê" + mini-tabela: javac lê `@Override` · Lombok lê
  `@Data` · Spring lê `@Service`. Não usar outras anotações fora do quadro-ponte/raio-x.
- `interface`/`implements`: só cheiro (box na seção 11: `List` × `ArrayList` = cardápio × cozinha; "por isso o
  `FornecedorRepository` do backend fica VAZIO: é o cardápio, a cozinha vem pronta"). `Optional`: só a ideia (caixa de
  presente que pode vir vazia) na seção 12. `throw new`: 1 linha na 12 ("no Spring, em vez de `null`, lança-se um erro
  que vira resposta HTTP"). `record`, lambdas, streams: NÃO aparecem (se citar `->`, aviso de ligadura).
- Console: sem emoji dentro de `println` (Windows imprime `?`) — usar `ALERTA:`. Sempre que aparecer `Produto@…`:
  "o seu número vai ser outro". Sempre que aparecer NPE com nome de variável: "no IntelliJ aparece assim".
- Aviso de IDE (`>=`, `!=`, `==` podem ser desenhados como ≥ ≠ ⩵): 1× na seção 6 (primeiro `>=`) e 1× no BugZilla.
- Indentação 4 espaços; nomes em português sem acento; `toString` escrito à mão (legível), getters/setters e
  construtores **gerados pelo IntelliJ** (Alt+Insert no Windows/Linux, Cmd+N no Mac) — mostrando o código gerado.

## 3. Seções em detalhe

### 01 · `dores` (6 min) — 🩹 Três dores que o JS te deixou passar
- Objetivo: o aluno reconhece que JS/json-server "nunca dizem não" ANTES de ouvir a palavra compilador. **Demonstrar
  com código + console** (não dizer "você já sentiu" — o Cap 2 não tem esses exemplos).
- Dor 1 (bloco JS + mini-browser console): `let idade = "32"; console.log(idade + 1)` → `321`. "Rodou. E mentiu."
- Dor 2: `const p = { nome: "Mouse Gamer", preco: 89 }; console.log(p.estoque)` → `undefined` — o card do GestorPRO
  mostra "estoque: undefined" e ninguém avisa.
- Dor 3 (mini-browser console, estilo devtools): `axios.post("http://localhost:3000/produtos", { nome: "Cabo HDMI",
  preco: "banana" })` → json-server responde `201 Created`; no dashboard, `preco * 2` vira `NaN`. A cozinha de brinquedo
  aceitou banana como preço.
- Quadro estático `.analogy` "🍽️ O salão e a cozinha": React = salão (Caps 1–10, pronto e publicado); json-server =
  cozinha de brinquedo; Java + Spring = cozinha de verdade, com FISCAL. "Spring é o React do backend" + 1 linha
  Java ≠ JavaScript ("carro × carpete": nomes parecidos por marketing de 1995, línguas diferentes).
- Mapa da manhã (lista `.about-bullets` com 6 itens: fiscal → instalar → tipos → ficha (classe/objeto/construtor/cofre)
  → lista → Service + Ponte). Nada de mercado/salário.
- Quiz 1: "Java é a versão séria do JavaScript?" — certa: "Não: nomes parecidos por marketing; línguas diferentes,
  regras diferentes. O que vale é que você já programa — muda o sotaque."

### 02 · `compilar` (10 min) — 🏭 O fiscal que barra antes de rodar
- Analogia "👨‍🍳 O revisor lê a receita inteira antes de acender o fogão" (JS acende e descobre no meio que faltou ovo).
- Conceitos: `.java` (receita) → **javac** (fiscal/compilador) → `.class` (bytecode) → **JVM** (o fogão que roda em
  qualquer máquina) → console. "Erro de compilação não é castigo — é o bug sendo pego de graça, antes de rodar."
- Código: `Main.java` mínimo (`public class Main { public static void main(String[] args) { int idade = 32;
  System.out.println(idade + 1); } }`) → `33`. Não explicar o ritual do `main` aqui (só "aceite por 10 min; a
  anatomia vem na instalação").
- **Máquina 🏭 Duas Esteiras `cp-`** (raiz `#cp-root.cpm`): chips `✅ certinho` · `🧨 "32" no int` · `🧨 faltou o ;`.
  Duas esteiras horizontais: em cima (amarela, JS) `main.js → [Node] → console`, a bolinha SEMPRE chega, semáforo verde;
  embaixo (laranja, Java) `Main.java → [javac 🧑‍⚖️] → Main.class → [JVM ☕] → console`. O código do caso aparece nas
  duas línguas acima das esteiras (mono, `.cp-mono`). Casos: certinho → JS `33`, Java passa nas 4 estações, `33`;
  "32" no int → JS `321` ✓ (nota: *"Rodou. E mentiu. Você só descobre olhando a tela."*), Java PARA no javac (pisca
  vermelho), console `! Main.java:3: error: incompatible types: String cannot be converted to int` + a linha com o `^`
  (nota: *"O fiscal leu a receita inteira e nem deixou acender o fogão."*); faltou `;` → JS imprime `oi` (nota: *"o JS até
  adivinha o ; por você"*), Java `! Main.java:3: error: ';' expected`. Nota-síntese fixa embaixo: "Erro de compilação
  não é castigo — é o bug sendo pego de graça." Autoplay no chip 2 ao entrar na tela; botão ▶ rodar de novo.
- Concept "🧠 O que é a JVM (versão curta)": o Java compila pra um formato que a JVM roda em Windows, Mac, Linux e
  servidor — por isso "write once, run anywhere". Sem aprofundar.

### 03 · `instalar` (25 min) — 🛠️ JDK 21 + IntelliJ: montando a cozinha
- Dor: "cadê o `node` do Java?" → Analogia "🍳 JDK = fogão + panelas + o fiscal; JRE = só o fogão; IDE = a cozinha
  montada". Por que trocar VSCode → IntelliJ: é a IDE do backend, gera construtores/getters/setters, roda com ▶.
- **Warning de véspera** (`.warning` 📦): "Instale ANTES do sábado — JDK ~190 MB + IntelliJ ~800 MB não cabem no wi-fi da
  sala. O prof manda os links no grupo e leva pendrive." Mac Apple Silicon = versão **aarch64**.
- Passo 1 — JDK 21: `adoptium.net` (Temurin 21 LTS) → instalador Win x64 / Mac (aarch64 ou x64) → next-next. Verificar:
  terminal typewriter `java -version` com output real (do catálogo; nota "Temurin imprime Temurin-21.0.x no lugar de
  Corretto"). Erros previsíveis: `'java' não é reconhecido…` (Windows: PATH — feche e reabra o terminal; se persistir,
  reinstale marcando "Set JAVA_HOME"), Mac "command not found" (abra um terminal NOVO).
- Passo 2 — IntelliJ IDEA **Community** (`jetbrains.com/idea/download` → role até Community Edition, o Ultimate é
  trial pago). Primeira abertura: pular plugins/telemetria ("Skip"). Tema Dracula opcional.
- Passo 3 — Novo projeto: New Project → nome `gestorpro-java` → Language Java → Build system **IntelliJ** → JDK 21 (se não
  aparecer, "Add JDK…" apontando pra pasta instalada) → marcar "Add sample code" → Create. Tour de 3 linhas: `src/`,
  `Main.java`, o ▶ verde.
- Anatomia do `main` (`.anat`): `public static void main(String[] args)` — 5 peças: `public` (porta aberta) · `static`
  (não precisa de ficha — sim, explico daqui a pouco) · `void` (não devolve nada) · `main` (o nome que a JVM procura) ·
  `String[] args` (ritual: aceite hoje). Concept: "ritual = decore por hoje; cada palavra volta na hora certa".
- `System.out.println("Hello, GestorPRO!")` = `console.log` com sobrenome. Bloco `Main.java` completo + console
  esperado (`Hello, GestorPRO!`). Explicar o ▶ (Run 'Main') e o painel Run embaixo.
- Passo 4 — o pacote: botão direito em `src` → New → Package → `br.com.sistemagestao.api`; arrastar `Main.java` pra
  dentro (IntelliJ pergunta "Move" → OK) — o arquivo ganha a 1ª linha `package br.com.sistemagestao.api;`. Concept
  "📮 package = o CEP da classe": pasta com nome, domínio invertido = endereço único; **é exatamente o endereço que o
  Spring Initializr vai criar no próximo sábado**. Rodar de novo → mesmo Hello.
- Erros previsíveis (warning "🧯 4 perrengues da primeira vez"): JDK não detectado (Project Structure → SDK), `Main.java`
  fora do pacote ("class Main is public, should be declared…" NÃO — o erro real de mover errado é o `package` não bater:
  mostrar `error: class Main is public, should be declared in a file named Main.java` só para renomear errado), esqueceu
  o `;` (sublinhado vermelho antes de rodar — o IntelliJ é o fiscal em tempo real), botão ▶ cinza (esperou o índice?
  espere a barra de progresso terminar).
- 🧨 provoque: apague o `;` do println → veja o sublinhado + `';' expected` no painel Build. Conserte.

### 04 · `intervalo` (9 min) — ☕ Intervalo
- Card curto (`.card` centralizado, Caveat): "Salva o projeto (Ctrl+S) e levanta. 9 minutos. Quem ainda está instalando:
  o prof passa na sua mesa." + 1 tip: "volte com o IntelliJ aberto no `Main.java`".

### 05 · `tipos` (18 min) — 🔤 A caixa tem etiqueta: tipos
- Dor: a dor 1 (`"32" + 1`). Analogia "🏷️ A caixa com etiqueta": no Cap 2 a variável era caixinha com nome; em Java a
  caixinha tem **etiqueta de tipo** e a alfândega só deixa entrar o que a etiqueta diz.
- Tradução (`.duo` JS × Java): `let nome = "Ana"` → `String nome = "Ana";` · `let idade = 25` → `int idade = 25;` ·
  `const pi = 3.14` → `double pi = 3.14;` · `let aprovado = true` → `boolean aprovado = true;`. Tabela `.cmp-table`
  dos 4 tipos + `Long`/`Integer` ("a versão com maiúscula é OBJETO: aceita `null` — é assim que o `id` nasce no
  backend: `Long id` vazio até o banco dar o número") + `long`/`char` citados em 1 linha como "existem".
- Texto junta com `+` (sem crase/template): `"Preço: " + preco`. `==` para primitivos, `.equals()` para objetos —
  a regra, sem demonstração de `==` em String (fica pro BugZilla).
- Box "🔒 final": `final double TAXA = 0.1;` = a caixinha LACRADA do `const`; "no backend aparece como `private final`".
- Box "💸 0.1 + 0.2 de novo": `System.out.println(0.1 + 0.2)` → `0.30000000000000004` (o meme do Cap 2 vive!) — "por
  isso no backend dinheiro é `BigDecimal`; hoje usamos `double` pra aprender OO sem tropeço; no Spring você promove".
- **Máquina 🛃 Alfândega de Tipos `al-`** (raiz `#al-root.alm`): o aluno clica um VALOR (`"Teclado Mecânico"` · `320` ·
  `3.5` · `true` · `"32"` · `null`) e depois uma CAIXA (`String nome` · `int estoque` · `double preco` ·
  `boolean ativo` · `Long id`); a ficha do valor desliza até a caixa; carimbo ✓ APROVADO ou 🚫 BARRADO; console com a
  linha `int estoque = "32";` e a mensagem real. Matriz: `String` aceita `"Teclado…"`, `"32"` (nota "é texto, mesmo
  parecendo número"), `null` (nota "String é objeto: aceita null — guarde isso"); barra `320` (`int cannot be converted
  to String`), `3.5` (`double cannot be converted to String`), `true` (`boolean cannot be converted to String`).
  `int` aceita `320`; barra `"32"` (`String cannot be converted to int` — nota "o compilador não converte por você"),
  `3.5` (`possible lossy conversion from double to int`), `true`, `null` (`<null> cannot be converted to int`).
  `double` aceita `320` (vira `320.0` — nota "int cabe em double: promoção") e `3.5`; barra `"32"`, `true`, `null`.
  `boolean` só `true`. `Long` aceita `null` (nota "é assim que o id nasce no backend") e barra `320`
  (`int cannot be converted to Long` — nota "wrapper é chato: escreva 320L"), `3.5`, `"32"`, `true`.
  Autoplay: `"32"` → `int`.
- 🧨 provoque: `int estoque = "12";` → sublinhado + `incompatible types: String cannot be converted to int`.
- Digita aí: bloco `Main.java` com 4 variáveis do Teclado (`String nome = "Teclado Mecânico"; double preco = 320;
  int estoque = 12; boolean estoqueBaixo = estoque < 5;`) + println de cada + console esperado
  (`Teclado Mecânico` / `320.0` / `12` / `false`). Nota sobre `320.0`.
- Quiz 2: `int preco = 320; preco = 3.5;` compila? → "Não: possible lossy conversion from double to int — a caixa int não
  guarda 3.5."

### 06 · `fluxo` (8 min) — 🔁 80% você já sabe
- Dor: "vou reaprender tudo?" Não. Visual estático **tradutor lado a lado** (`.ts-` só CSS: dois blocos `.duo`, tokens
  que MUDAM em laranja `.ts-new`, iguais apagados `.ts-same`; contador em texto "5 de 23 tokens mudaram"). 3 pares
  usando linhas do Cap 2: (a) `if (media >= 7) { console.log("Aprovado! 🎉") } else { … }` → Java idêntico com `double
  media = 7.5;` e `System.out.println`; (b) `for (let i = 1; i <= 3; i++)` → `for (int i = 1; i <= 3; i++)`; (c)
  `estoque < 5 && preco > 100` → igual. O que muda: `;` obrigatório, tipo no `i`, `println`. `while` só citado (1 linha).
- **Aviso de IDE obrigatório** (`.warning` 🔤): "seu editor pode DESENHAR `>=` como ≥ e `!=` como ≠ — são dois
  caracteres; o IntelliJ vem com isso desligado, mas quem usa Fira Code no VSCode já viu".
- 🧨 provoque: `estoque = 4;` sem declarar → `cannot find symbol … variable estoque … location: class Main`
  (nota: "Em Java a caixa não nasce sozinha: declare com tipo").
- Quiz 3: qual linha NÃO compila? opções: `int i = 0;` / `if (estoque < 5) {` / `let total = 10;` (certa: `let` não
  existe em Java) / `System.out.println(i);`.

### 07 · `metodos` (10 min) — ⚙️ Métodos: a receita com tipo
- Dor: a função do Cap 2 aceita qualquer coisa: `const dobro = (n) => n * 2; dobro("5")` → `10` por sorte
  (`"5" * 2` coage), `dobro("cinco")` → `NaN` em silêncio. Não prometer erro que não acontece.
- Analogia "📋 A receita diz '2 ovos', não '2 alguma coisa'": parâmetros e retorno com etiqueta.
- Tradução `.duo`: `const dobro = (n) => n * 2` → `static int dobro(int n) { return n * 2; }`. Anatomia em prosa: tipo de
  retorno · nome · parâmetros tipados · `return`. `void` = não devolve (só faz). Chamar do `main`: `int r = dobro(5);`.
- Código `Main.java` com `static double aplicarDesconto(double preco, int porcentagem) { return preco - preco *
  porcentagem / 100; }` e `static void avisar() { System.out.println("Estoque baixo!"); }` + main chamando
  (`aplicarDesconto(320, 10)` → `288.0`; `avisar()` → `Estoque baixo!`). Console esperado.
- Concept "☎️ E esse static?": telefone da empresa (1 número, pertence à empresa — `static`) × celular de cada
  funcionário (cada ficha tem o seu — sem `static`). "No `Main` tudo é `static` por enquanto; quando a gente tiver
  fichas (objetos), os métodos vão morar nelas. Volto nisso na seção do Service — prometo." Exemplo `Math.max(3, 9)`
  funciona sem `new` porque é `static`.
- **Máquina ⚙️ Funil de Métodos `mf-`** (raiz `#mf-root.mfm`): método fixo no palco (`aplicarDesconto` + `avisar`).
  Chips: `aplicarDesconto(320, 10)` → duas bolinhas descem pelas bocas `double` e `int`, engrenagens giram, sai `288.0`
  pela rampa `return`; `🧨 aplicarDesconto("320", 10)` → a bolinha `"320"` bate na grade: `! error: incompatible types:
  String cannot be converted to double` (nota: "no JS isso 'funcionava' por coerção — e um dia não vai");
  `🧨 aplicarDesconto(320)` → `! error: method aplicarDesconto in class Main cannot be applied to given types;
  required: double,int  found: int  reason: actual and formal argument lists differ in length`; `avisar()` → console
  `Estoque baixo!`, rampa vazia (nota "void = não devolve; só faz"); `🧨 double x = avisar();` → `! error: incompatible
  types: void cannot be converted to double`.
- Quiz 4: `static void saudacao(String nome)` — o `void` diz o quê? → "que o método não devolve nada: só executa".

### 08 · `classes` (20 min) — 🗂️ Classe e objeto: a ficha de cadastro
- Dor: no GestorPRO, 4 produtos como `{}` soltos; um sem `estoque` → `undefined` no card (dor 2). Em Java **não existe
  `{}` solto** — antes de criar UM produto você descreve o MOLDE.
- Analogia "🗂️ A ficha de cadastro": classe = ficha em branco da papelaria (os campos impressos); objeto = ficha
  preenchida; `new` = pegar uma ficha em branco da pilha. (Mesma analogia que o backend usa para `@Entity`.)
- Código `Produto.java` v1 (arquivo NOVO: botão direito no pacote → New → Java Class → `Produto`):
  ```java
  package br.com.sistemagestao.api;

  public class Produto {
      String nome;
      double preco;
      int estoque;
  }
  ```
  Concept "📁 Um arquivo por classe": nome do arquivo = nome da classe pública; PascalCase pra classe, camelCase pra
  campo/método. Em `Main`: `Produto p1 = new Produto(); p1.nome = "Teclado Mecânico"; p1.preco = 320; p1.estoque = 12;`
  + `Produto p2 = new Produto(); p2.nome = "Mouse Gamer";` + println de `p1.nome`, `p2.nome`, `p2.estoque` (→ `0`),
  `p2.preco` (→ `0.0`) + `System.out.println(p1)` → `br.com.sistemagestao.api.Produto@15db9742` ("o seu número vai ser
  outro — é o 'endereço' da ficha; o Java ainda não sabe imprimir seu Produto; ensinamos com `toString` daqui a pouco").
  Valores padrão: `null` / `0.0` / `0` — "o null já apareceu aqui de propósito; volta na seção do Service".
- **Método de instância ("a receita grampeada na ficha")**: adicionar em `Produto` `boolean estoqueBaixo() { return
  estoque < 5; }` e chamar `p1.estoqueBaixo()` → `false`, `p2.estoqueBaixo()` → `true` (Mouse com estoque 0…
  usar `p2.estoque = 2` antes). Nota: "o método olha o estoque DESTA ficha — no JS você passava `p` de fora; aqui ele já
  está dentro. Sem `static`: é da ficha, não da empresa."
- Visual estático **pareamento JSON ↔ classe `pj-`**: `.duo` com o trecho REAL do `db.json`
  (`{ "id": 1, "nome": "Teclado Mecânico", "preco": 320, "estoque": 12 }`) à esquerda e a classe à direita, com linhas
  coloridas pareando `"nome"` ↔ `String nome`, `320` ↔ `double preco` (sub-nota BigDecimal), `12` ↔ `int estoque`, `1` ↔
  `Long id` ("entra na próxima seção"). Título Caveat: "Sua classe Produto É o JSON que o seu React consome".
- **Máquina 🏭 Fábrica de Fichas `ff-`** (raiz `#ff-root.ffm`): molde à esquerda (`class Produto { String nome; double
  preco; int estoque; }`), bancada à direita. Chips: `new Produto()` (cospe ficha `p1` com `nome = null`, `preco = 0.0`,
  `estoque = 0` e etiqueta `Produto@15db9742`; 2º clique cria `p2` `Produto@4554617c` — nota "o seu número vai ser
  outro"); `p1.nome = "Teclado Mecânico"` · `p1.preco = 320` · `p1.estoque = 12` · `p2.nome = "Mouse Gamer"` (o campo da
  ficha certa acende, a outra NÃO muda — nota "duas fichas, duas vidas"); `System.out.println(p1)` → console
  `br.com.sistemagestao.api.Produto@15db9742`; `🧨 p1.categoria = "Periféricos"` → `! error: cannot find symbol
  symbol: variable categoria  location: variable p1 of type Produto` (nota "no JS isso criava o campo na hora; em Java o
  molde manda"); `🧨 Produto p3; p3.nome = "x";` → `! error: variable p3 might not have been initialized` (nota "esqueceu
  o new: declarou a etiqueta, não pegou a ficha"). Autoplay: `new Produto()`.
- 🧨 provoque: `p1.categoria = "Periféricos";` no seu Main.
- Quiz 5: `Produto a = new Produto(); Produto b = new Produto(); a.nome = "Teclado";` — quanto vale `b.nome`? → `null` —
  duas fichas, duas vidas.

### 09 · `construtor` (15 min) — 🏗️ Construtor e this
- Dor: 3 linhas por produto e, se esquecer `estoque`, fica `0` **em silêncio** — Java também tem bug silencioso.
- Analogia "🏨 A recepção não entrega ficha sem os campos obrigatórios".
- Código `Produto.java` v2: `+ Long id;` (campo, "nasce null: quem dá o número é o Service — no backend, o banco") +
  construtor vazio `public Produto() { }` + cheio `public Produto(String nome, double preco, int estoque) { this.nome
  = nome; this.preco = preco; this.estoque = estoque; }` (id NÃO entra) + `estoqueBaixo()` mantido + `toString`:
  ```java
  @Override
  public String toString() {
      return "#" + id + " " + nome + " - R$ " + preco + " (estoque: " + estoque + ")";
  }
  ```
- `.anat` do construtor: `public Produto(String nome, double preco, int estoque)` — sem tipo de retorno · nome = nome
  da classe · parâmetros com tipo. `this.nome = nome`: "this = ESTA ficha (a gaveta); nome = o que chegou pela porta".
  Visual estático "voo dos argumentos" (`va-` só CSS): `new Produto("Teclado Mecânico", 320, 12)` com setas coloridas
  argumento → campo.
- IntelliJ gera: Alt+Insert / Cmd+N → Constructor → selecionar nome/preco/estoque (não id) → OK; e "Select None" pro
  vazio. Mostrar o código gerado. Concept "🧬 Escreveu o cheio → o vazio some": Java só dá o construtor vazio de graça
  enquanto você não escreve nenhum; quer os dois? escreva os dois — **é exatamente por isso que o backend escreve
  `@NoArgsConstructor` E `@AllArgsConstructor`**. Erro real: `constructor Produto in class Produto cannot be applied to
  given types; required: String,double,int  found: no arguments` (catálogo #15) e o de argumento faltando (#14).
- `@Override` = a 1ª anotação: concept "📌 Anotação é um post-it que alguém lê": não é código que roda; é informação
  colada em cima de classe/campo/método. Mini-tabela `.cmp-table`: `@Override` → quem lê: javac ("confere se estou mesmo
  sobrescrevendo") · `@Data` → Lombok (gera getters/setters) · `@Service`/`@Entity` → Spring. "No backend você vai colar
  20 desses. Todos são post-its."
- `Main` novo: `Produto teclado = new Produto("Teclado Mecânico", 320, 12); System.out.println(teclado);` → console
  `#null Teclado Mecânico - R$ 320.0 (estoque: 12)` — **explicar o `#null` ANTES do console** (id ainda não existe).
- 🧨 provoque: `new Produto("Mouse Gamer", 89)` → catálogo #14.
- Quiz 6: só existe o construtor cheio; `new Produto()` faz o quê? → "Não compila: constructor … cannot be applied to
  given types — o vazio sumiu quando você escreveu o cheio."

### 10 · `cofre` (14 min) — 🔒 private, getters e setters
- Dor: `teclado.preco = -50;` — qualquer um escreve besteira em qualquer lugar do programa.
- Analogia "🏦 O cofre e o balcão": `private` tranca o campo; `getX`/`setX` são o balcão, com regra.
- Código `Produto.java` v3: todos os campos `private`; getters/setters gerados pelo IntelliJ (Alt+Insert → Getter and
  Setter → selecionar todos) — mostrar o gerado; então EDITAR `setPreco`/`setEstoque` com regra:
  ```java
  public void setPreco(double preco) {
      if (preco < 0) {
          System.out.println("Preco invalido: " + preco);
          return;
      }
      this.preco = preco;
  }
  ```
  (idem `setEstoque` com `"Estoque invalido: " + estoque`). `getId/setId` existem (o Service vai usar).
- Convenção `getX/setX/isX` **não é frescura**: é por ela que o Spring descobre os campos pra montar o JSON
  `{ "nome": … }` que o seu React lê. Encadeamento em 1 tip: `pedido.getProduto().getNome()` — "pega o objeto, depois
  pergunta; você vai ver isso no backend".
- Concept "🤖 E o Lombok?": no backend `@Data` gera tudo isso; você escreve à mão HOJE, uma vez na vida, pra saber o
  que ele gera (senão `@Data` é magia).
- **Máquina 🏦 Balcão do Cofre `bc-`** (raiz `#bc-root.bcm`): ficha `p` com cadeados nos campos (`private double preco
  = 320.0`, `private int estoque = 12`) e balcão com `getPreco()` / `setPreco(double)` / `setEstoque(int)`. Chips:
  `🧨 p.preco = -50` → mão bate no cadeado, `! error: preco has private access in Produto`; `p.setPreco(-50)` → balcão
  balança a cabeça, console `Preco invalido: -50.0`, campo continua `320.0` (nota "a regra mora num lugar só");
  `p.setPreco(350)` → campo `350.0`; `p.getPreco()` → console `350.0`; `p.setEstoque(-3)` → `Estoque invalido: -3`;
  **`{ } virar JSON`** → monta getter a getter `{"id":null,"nome":"Teclado Mecânico","preco":350.0,"estoque":12}`
  (cada `getNome()` acende e vira `"nome"` — nota "é assim que o JSON do seu React nasce no Spring"). Autoplay: `p.preco = -50`.
- 🧨 provoque: `teclado.preco = -50;` no Main → `preco has private access in Produto`.
- Quiz 7: por que `getNome()` importa pro Spring? → "É por ele que o framework descobre o campo pra montar o JSON."

### 11 · `listas` (15 min) — 🚂 ArrayList<Produto>
- Dor: `produtos.push("banana")` no JS passa e o `.map` quebra depois.
- Analogia "🚂 O trem que só engata vagão Produto".
- Código: `import java.util.ArrayList; import java.util.List;` (mostrar o erro SEM import: catálogo #24 e o Alt+Enter do
  IntelliJ). `List<Produto> produtos = new ArrayList<>();` — `<>` = "lista DE quê". `add`, `get(0)`, `size()`,
  `remove(obj)`. **for-each**: `for (Produto p : produtos) { System.out.println(p); }` = o `for...of`/`.map` do Cap 2
  ("PARA CADA p EM produtos"). Console esperado com os 2 produtos (`#null …`).
- Box "🍽️ existe por aí — vem na hora certa": `List` × `ArrayList` = cardápio × cozinha; `List` é uma **interface**
  (só a lista do que dá pra fazer), `ArrayList` é quem faz. "O Spring devolve `List`. E é por isso que o
  `FornecedorRepository` do backend fica VAZIO: é o cardápio; a cozinha (JPA) vem pronta." Sem código de interface.
- **Máquina 🚂 Trem Tipado `tt-`** (raiz `#tt-root.ttm`): locomotiva `List<Produto> produtos = new ArrayList<>();` +
  trilho com vagões `[0] [1] …`. Chips: `produtos.add(teclado)` / `produtos.add(monitor)` (vagão engata); `🧨
  produtos.add("banana")` → cancela fecha: `! error: incompatible types: String cannot be converted to Produto`;
  `produtos.size()` → `2`; `produtos.get(0).getNome()` → `Teclado Mecânico` (nota "encadeou: pega o vagão, depois
  pergunta o nome"); `🧨 produtos.get(7)` → passa no javac, EXPLODE na JVM: `! Exception in thread "main"
  java.lang.IndexOutOfBoundsException: Index 7 out of bounds for length 2` (nota "isso o fiscal NÃO pega — explode
  rodando"); `for (Produto p : produtos)` → lanterna percorre vagão a vagão imprimindo o nome. Autoplay: add teclado.
- Quiz 8: `produtos.get(produtos.size())` → "Explode: o último índice é size() - 1."

### 12 · `servico` (14 min) — 🧩 ProdutoService
- Dor: o `Main` está virando um monstro; quem guarda a lista e as regras? Analogia "⚙️ O gerente da loja" (mesmo emoji
  do backend): o Service tem a lista e os verbos.
- Código `ProdutoService.java` completo (glossário §6). Métodos SEM `static` → precisa de `new ProdutoService()`.
  Quadro estático `.cmp-table` **static × instância**: `Math.max(3, 9)` (da empresa, sem new) × `service.cadastrar(p)`
  (da ficha, com new). Erro real (catálogo #18): `ProdutoService.cadastrar(p)` → `non-static method cadastrar(Produto)
  cannot be referenced from a static context` — "promessa cumprida da seção de métodos".
- `Main`: `new ProdutoService()`, cadastra 2 produtos, `for (Produto p : service.listar())` → console com `#1`, `#2`
  (o Service carimbou o id — "no backend, o banco").
- Dor do `null`: `buscarPorId(99L)` devolve `null`; `.getNome()` → NPE real (forma encadeada do catálogo, que não depende
  de -g) + a forma com variável ("no IntelliJ aparece assim: because "achado" is null"). Porteiro `if (achado != null)`.
  Box "🎁 existe por aí": `Optional` = caixa de presente que pode vir vazia (o backend usa; a API vem na hora certa);
  `throw new …` = "em vez de devolver null, lança um erro que o Spring transforma em resposta HTTP 404" (1 linha).
- Quiz 9: por que `Math.max(3, 9)` funciona sem `new`? → "porque é static: pertence à classe, não a uma ficha".

### 13 · `ponte` (10 min) — 🌉 A Ponte pro Spring
- **Quadro de tradução** `.cmp-table` (9 linhas, coluna "hoje (Java puro)" × "próximo sábado (Spring)"): `public class
  Produto` + private + getters/setters → `@Entity` + `@Data` (+`@NoArgsConstructor`/`@AllArgsConstructor`) · `Long id`
  setado pelo Service → `@Id @GeneratedValue` setado pelo 🐘 · `double preco` → `BigDecimal preco` · `List<Produto>` no
  Service → `ProdutoRepository extends JpaRepository` + 🐘 PostgreSQL · `cadastrar/listar/buscarPorId` → `save/findAll/
  findById` (que devolve `Optional`) · `new ProdutoService()` no Main → `@Service` + 💉 injeção · `Main` + `println` →
  `@RestController` + `@GetMapping("/produtos")` devolvendo JSON pelos getters · `return null` → `throw new` → HTTP 404 ·
  console → `axios.get("…/produtos")` no SEU React.
- **Máquina 🌉 A Ponte `pt-`** (raiz `#pt-root.ptm`): fluxo horizontal `React (cards do GestorPRO) → axios.get →
  🎮 Controller → ⚙️ ProdutoService.listar() → 🗄️ (hoje: List<Produto> | depois: Repository + 🐘) → objetos Produto →
  JSON → cards`. Chips: `▶ GET /produtos` (pacote viaja ida e volta; no retorno o JSON `[{ "id": 1, "nome": "Teclado
  Mecânico", "preco": 320.0, "estoque": 12 }, …]` se materializa em 4 cards); `🔀 trocar a cozinha` (json-server ⇄ API
  Java: só a caixa 🗄️ muda; o React não muda um pixel — nota "o salão nem percebe"); `🧨 sem getters` → JSON `{}` vazio e
  cards em branco (nota "sem getNome, o Spring não enxerga o campo"); `🧨 POST preco "trezentos"` → `400 Bad Request —
  JSON parse error: Cannot deserialize value of type double from String "trezentos"` (nota "a etiqueta de tipo protege
  o banco — lembra da dor 3?"). Autoplay: GET.
- Fecho: "Tudo que você vai aprender de Spring é ligar essas 4 peças com etiquetas. As peças, você acabou de escrever."

### 14 · `bugzilla` (5 min) — 8 bugs (mensagens do catálogo, verbatim)
1. `';' expected` — o `^` aponta o fim da linha ANTERIOR; o IntelliJ sublinha antes de rodar.
2. Maiúscula importa — `system.out` → `package system does not exist`; `string nome` → `cannot find symbol … class
   string`; `Nome` × `nome` → `cannot find symbol … variable Nome`.
3. O `L` do Long — `service.buscarPorId(2)` → `int cannot be converted to Long` → `2L` (liga com a Alfândega).
4. NullPointerException — `Produto achado = service.buscarPorId(99L); achado.getNome();` → mensagem com `because
   "achado" is null` ("no IntelliJ aparece assim") → porteiro `if`.
5. Chamou método de ficha sem ficha — `ProdutoService.cadastrar(p)` → `non-static method … static context` → `new`.
6. Arquivo ≠ classe — `class Produto is public, should be declared in a file named Produto.java` → crie pela IDE.
7. `==` em String — `String suf = "a"; String nome1 = "Ana"; String nome2 = "An" + suf; nome1 == nome2` → `false`;
   `.equals` → `true` ("copie exatamente; com dois literais o Java te engana e dá true").
8. `missing return statement` — `buscarPorId` com for-each sem o `return null;` final (o erro mais comum do P4).
Toggler "👀 Macete de ouro": leia o erro de baixo pra cima (`Main.java:5` = linha · `error:` = o quê · `^` = onde);
clique na linha vermelha do painel Build que o IntelliJ te leva lá; `println` como lanterna (Cap 2).

### 15 · card "PROGRAMAÇÃO É PRÁTICA 💪" (padrão dos caps): "IntelliJ aberto no gestorpro-java — no fim do treino ele vai
ter Produto, Cliente e dois Services. Sem rede. Sem Spring. Só Java."

### 16 · `treino` (57 min) — ⌨️ GestorPRO de bolso
Warning inicial: mesmo projeto `gestorpro-java`; cada passo continua o anterior; 👀 só depois de tentar. `.arena-track`
1→2→3→4→5→🏆 (P6 com selo "se sobrar tempo"). Dados do db.json do GestorPRO. Consoles em `.mini-browser.console`.
- **P1 guiado (8) — `Produto` completa.** Conferir/gerar: 2 construtores, getters/setters, regra no `setPreco`/
  `setEstoque`, `estoqueBaixo()`, `toString`. `Main` cria os 4 produtos e imprime. Explicar `#null` ANTES do console.
  Console: `#null Teclado Mecânico - R$ 320.0 (estoque: 12)` / `#null Monitor 27 pol - R$ 1450.0 (estoque: 4)` /
  `#null Cadeira Gamer - R$ 980.0 (estoque: 7)` / `#null Mouse Gamer - R$ 89.0 (estoque: 2)`.
- **P2 guiado (10) — `ProdutoService` com `cadastrar` + `listar`.** Bloco completo do Service (só esses 2 métodos + campos)
  e do Main. Console: `=== Produtos cadastrados ===` + `#1 …` `#2 …` `#3 …` `#4 …`. 🧨 `ProdutoService.cadastrar(p)` → bug 5.
- **P3 guiado (7) — `estoqueBaixo()` no Service: o alerta do dashboard.** `public List<Produto> estoqueBaixo()` (for-each +
  `p.estoqueBaixo()` + lista nova). Main imprime `ALERTA: 2 produtos com estoque baixo` + `#2 Monitor …` + `#4 Mouse …`.
- **P4 solo ★★ (12) — `buscarPorId(Long id)` + `remover(Long id)`.** Dica: for-each, `p.getId().equals(id)`, `return null`
  no fim (senão bug 8); `remover` reusa `buscarPorId` e só remove se `!= null`. Main: busca `2L`, busca `99L` com porteiro,
  remove `4L`, lista. 🚨 PARE → 👀 solução. Console: `Achei: #2 Monitor 27 pol - R$ 1450.0 (estoque: 4)` / `Nao achei o id
  99` / `=== Produtos cadastrados ===` / `#1 …` `#2 …` `#3 …`. 🧨 tire o `if` do 99 → NPE (bug 4).
- **P5 solo ★★ (10) — `Cliente.java`.** Campos do db.json + `Long id`, `private`, 2 construtores, getters/setters pela IDE,
  `toString` → `"#" + id + " " + nome + " - " + email + " - " + cidade`. Dica: "é o Produto com outros campos — deixe a IDE
  trabalhar". 👀 solução completa (glossário).
- **P6 chefão ★★★ (10, "se sobrar tempo" — senão vira casa) — `ClienteService` + tour.** Mesmo shape do ProdutoService.
  Main cadastra Ana Souza / Bruno Lima / Carla Dias, lista, remove `2L`, lista, busca `2L` sem explodir. Console:
  `=== Clientes cadastrados ===` / `#1 Ana Souza - ana@gmail.com - João Pessoa` / `#2 Bruno Lima - bruno@gmail.com -
  Campina Grande` / `#3 Carla Dias - carla@gmail.com - Recife` / `--- removendo #2 ---` / `=== Clientes cadastrados ===` /
  `#1 …` / `#3 …` / `Nao achei o id 2`.
- **🏠 Casa —** `Fornecedor` (`id, nome, cnpj, categoria, telefone`) com `setCnpj` que recusa `cnpj.length() != 18`
  (`"12.345.678/0001-90"` tem 18) + `FornecedorService` com `cadastrar/listar` + `relatorio()` imprimindo
  `Fornecedores: 2`. Bônus ★★★: `ProdutoService.atualizarPreco(Long id, double novoPreco)` usando `buscarPorId` +
  `setPreco`. "Traga sábado — é o dia do Spring: o Fornecedor é literalmente a 1ª @Entity do backend."

### 17 · `resumo` (5 min)
- Bullets "o que você leva" (compilar/JVM · tipos e wrappers · métodos tipados · classe/objeto/new · construtor/this ·
  private/getters/setters e a convenção · ArrayList/for-each/import · Service/static × instância/null · quadro-ponte).
- Box "🧳 existe por aí — vem na hora certa": `interface`/`implements`, `Optional`, `throw new`, `record`, lambdas `->`
  (aviso de seta), `BigDecimal`, Maven/Initializr, Lombok.
- **Raio-X estático** (`rx-` só CSS): o código do dia 1 do backend (`Fornecedor` @Entity + Lombok, ~14 linhas, +
  `FornecedorService` com `List` e `void`, ~8 linhas) num `.code-block` com os tokens que o cap ensinou em laranja
  (`.rx-on`: `public class`, `private Long id`, `private String nome`, `List<Fornecedor>`, `void`, `new`, `return`,
  `getX/setX`) e os de Spring apagados (`.rx-off`: `@Entity @Data @Id @GeneratedValue @Column @Service @Autowired`) com
  legenda "laranja = você já lê; cinza = isso o Spring escreve (próximo sábado)". Título: "Assim você via de manhã /
  assim você vê agora".
- Quiz de saída: `Produto p = service.buscarPorId(99L); System.out.println(p.getNome());` sem o 99 cadastrado → "Compila,
  mas explode rodando: NullPointerException — precisa do porteiro if (p != null)".
- Gancho + botões: "← voltar ao hub" (`../../index.html`) e um `<span>` tracejado (padrão do Cap 10) "Próxima parada:
  Spring Boot — a cozinha de verdade 🔒 em breve".

## 4. Hero (no skeleton, escrito pelo orquestrador)
- `.hero-icons`: `<img java.svg>` ☕ 🗂️; badge `hero-badge java` "Capítulo 11 · A ponte para o Backend"; h1
  "<span style=color:var(--java)>Java &amp; OO</span>: a base antes do Spring"; subtítulo (a promessa); chips:
  `☕ Java 21` (java) · `🧠 IntelliJ IDEA` (java) · `🗂️ classe & objeto` (js) · `🚂 ArrayList` (js) · `🌿 Spring: próximo
  sábado` (spring).

## 5. Glossário de nomes fixos
Seções/ids: dores compilar instalar intervalo tipos fluxo metodos classes construtor cofre listas servico ponte bugzilla
treino resumo. Máquinas: `cp-`(#cp-root .cpm) `al-`(#al-root .alm) `mf-`(#mf-root .mfm) `ff-`(#ff-root .ffm)
`bc-`(#bc-root .bcm) `tt-`(#tt-root .ttm) `pt-`(#pt-root .ptm). Visuais estáticos: `ts-` `pj-` `va-` `rx-`.
Classes Java: Main, Produto, ProdutoService, Cliente, ClienteService, Fornecedor, FornecedorService. Métodos:
`cadastrar(Produto)`, `listar()`→`List<Produto>`, `estoqueBaixo()` (em Produto → boolean; no Service → List<Produto>),
`buscarPorId(Long)`, `remover(Long)`, `atualizarPreco(Long,double)` (casa), `relatorio()` (casa), `aplicarDesconto`,
`avisar`, `dobro`. Campos: id nome preco estoque (Produto); id nome email telefone cidade (Cliente); id nome cnpj
categoria telefone (Fornecedor). Projeto: `gestorpro-java`; pacote `br.com.sistemagestao.api`.

## 6. Códigos canônicos (versão FINAL do treino — os construtores derivam as versões parciais daqui; tudo compila)

```java
// ═══ Produto.java ═══
package br.com.sistemagestao.api;

public class Produto {
    private Long id;
    private String nome;
    private double preco;
    private int estoque;

    public Produto() {
    }

    public Produto(String nome, double preco, int estoque) {
        this.nome = nome;
        this.preco = preco;
        this.estoque = estoque;
    }

    public boolean estoqueBaixo() {
        return estoque < 5;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public double getPreco() {
        return preco;
    }

    public void setPreco(double preco) {
        if (preco < 0) {
            System.out.println("Preco invalido: " + preco);
            return;
        }
        this.preco = preco;
    }

    public int getEstoque() {
        return estoque;
    }

    public void setEstoque(int estoque) {
        if (estoque < 0) {
            System.out.println("Estoque invalido: " + estoque);
            return;
        }
        this.estoque = estoque;
    }

    @Override
    public String toString() {
        return "#" + id + " " + nome + " - R$ " + preco + " (estoque: " + estoque + ")";
    }
}
```

```java
// ═══ ProdutoService.java ═══
package br.com.sistemagestao.api;

import java.util.ArrayList;
import java.util.List;

public class ProdutoService {
    private List<Produto> produtos = new ArrayList<>();
    private Long proximoId = 1L;

    public void cadastrar(Produto produto) {
        produto.setId(proximoId);
        proximoId++;
        produtos.add(produto);
    }

    public List<Produto> listar() {
        return produtos;
    }

    public List<Produto> estoqueBaixo() {
        List<Produto> baixos = new ArrayList<>();
        for (Produto p : produtos) {
            if (p.estoqueBaixo()) {
                baixos.add(p);
            }
        }
        return baixos;
    }

    public Produto buscarPorId(Long id) {
        for (Produto p : produtos) {
            if (p.getId().equals(id)) {
                return p;
            }
        }
        return null;
    }

    public void remover(Long id) {
        Produto p = buscarPorId(id);
        if (p != null) {
            produtos.remove(p);
        }
    }
}
```

```java
// ═══ Main.java (fim do P4) ═══
package br.com.sistemagestao.api;

public class Main {
    public static void main(String[] args) {
        ProdutoService service = new ProdutoService();
        service.cadastrar(new Produto("Teclado Mecânico", 320, 12));
        service.cadastrar(new Produto("Monitor 27 pol", 1450, 4));
        service.cadastrar(new Produto("Cadeira Gamer", 980, 7));
        service.cadastrar(new Produto("Mouse Gamer", 89, 2));

        System.out.println("=== Produtos cadastrados ===");
        for (Produto p : service.listar()) {
            System.out.println(p);
        }

        List<Produto> baixos = service.estoqueBaixo();   // precisa de import java.util.List;
        System.out.println("ALERTA: " + baixos.size() + " produtos com estoque baixo");
        for (Produto p : baixos) {
            System.out.println(p);
        }

        Produto achado = service.buscarPorId(2L);
        System.out.println("Achei: " + achado);

        Produto fantasma = service.buscarPorId(99L);
        if (fantasma != null) {
            System.out.println("Achei: " + fantasma);
        } else {
            System.out.println("Nao achei o id 99");
        }

        service.remover(4L);
        System.out.println("=== Produtos cadastrados ===");
        for (Produto p : service.listar()) {
            System.out.println(p);
        }
    }
}
```
(Nota: o `Main` acima usa `List` → precisa de `import java.util.List;` — o construtor do treino DEVE incluir a linha de
import no bloco e explicar. Alternativa mais simples para o P3: `for (Produto p : service.estoqueBaixo())` sem variável.)

```java
// ═══ Cliente.java ═══
package br.com.sistemagestao.api;

public class Cliente {
    private Long id;
    private String nome;
    private String email;
    private String telefone;
    private String cidade;

    public Cliente() {
    }

    public Cliente(String nome, String email, String telefone, String cidade) {
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.cidade = cidade;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getTelefone() { return telefone; }
    public void setTelefone(String telefone) { this.telefone = telefone; }
    public String getCidade() { return cidade; }
    public void setCidade(String cidade) { this.cidade = cidade; }

    @Override
    public String toString() {
        return "#" + id + " " + nome + " - " + email + " - " + cidade;
    }
}
```
(No HTML, os getters/setters do Cliente devem aparecer no formato de 3 linhas gerado pelo IntelliJ, não em 1 linha.)

`ClienteService.java` = `ProdutoService` com `Cliente` no lugar de `Produto`, sem `estoqueBaixo`. `Fornecedor`/
`FornecedorService` (casa) seguem o mesmo molde; `setCnpj` com `if (cnpj.length() != 18) { System.out.println("CNPJ
invalido: " + cnpj); return; }`.
