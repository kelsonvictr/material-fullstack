# 13 — Plano do Cap 13 · Produto e Cliente: a API fica profissional

> **IMPLEMENTADO em 2026-10-09** (ver “Implementação” no fim). Plano aprovado no mesmo dia.
> Rascunho original — 2026-10-09. Pedido do professor: próximas entidades (Produto e
> Cliente) com DTO e "coisas mais profissionais", **bem didático, bom para iniciantes, sem
> overkill, mas com o básico bom de tudo**. Revisão do mesmo dia: o **`@ManyToOne` entra
> aqui** (Produto → Fornecedor) — é importante o aluno já ter um relacionamento; a integração
> com o React fica para **bem depois**, num capítulo único feito com IA, só com o backend
> consolidado. Continua exatamente de onde o Cap 12 parou
> (`capitulos/12-spring-primeira-api/apoio/checkpoints/5`) e paga as três dívidas que o
> próprio Cap 12 deixou anotadas no `#fechamento`.
>
> Pasta proposta: `capitulos/13-spring-dto-validacao/`.

## Ponto de partida e transformação

O aluno termina o Cap 12 com o projeto `api` (pacote `br.com.gestorpro.api`, Spring Boot
4.1.1, Java 21, PostgreSQL 17 no container `gestorpro-postgres`) e o CRUD de Fornecedor em
quatro camadas, com Lombok (`@Getter`, `@Setter`, `@NoArgsConstructor`,
`@RequiredArgsConstructor` + `private final`). O JSON recebido e devolvido **é a própria
entidade**. Ele já viu, com os próprios olhos, três falhas:

| Dívida do Cap 12 | O que o aluno viu | Quem paga no Cap 13 |
|---|---|---|
| 1. Sem validação | Nome em branco gravado (201); JSON sem `nome` → 500 | Bean Validation + `@Valid` → **400** |
| 2. Sem 404 | GET de ID inexistente → 200 com `null`; DELETE de ausente → 204 | `orElseThrow` / `existsById` → **404** |
| 3. Entidade exposta | `id` no corpo do POST **sobrescreve** um cadastro existente | **DTO** de entrada sem `id` |

Ao final do Cap 13, o aluno deve conseguir:

- explicar por que a API recebe e devolve DTOs, e não a entidade;
- construir Produto do começo ao fim com DTO de entrada, DTO de saída e Mapper;
- ligar cada Produto ao seu Fornecedor com `@ManyToOne` e explicar a chave estrangeira no banco;
- usar `BigDecimal` para dinheiro e explicar por quê;
- devolver 404 de verdade e 400 com mensagem que a tela consegue mostrar;
- **construir o Cliente sozinho**, aplicando a mesma receita, com um checklist.

**Regra central (liga teoria, simulação e quiz):** *a entidade mora no banco; quem conversa
com o mundo é o DTO. Nada entra sem passar pela porta (validação), e nada é inventado
quando não existe (404).*

**Caso contínuo:** o **Teclado Mecânico** do GestorPRO (R$ 320,00, 12 em estoque,
Periféricos), comprado da **TechDistrib** (o fornecedor que o aluno cadastrou no Cap 12). O mesmo produto atravessa o lab do DTO, a validação, o 404 e os bastidores.
O "ataque" didático é sempre o mesmo JSON: `{"id": 1, "nome": "Teclado Mecânico", ...}`.

**Limites (ditos explicitamente ao aluno):**

- DTO não é segurança por si só: ele só decide **o formato** do que entra e sai.
- Validação na API não substitui a do formulário React, e a do formulário não substitui a da
  API (o F12 do Cap 12 Parte 0: qualquer um manda requisição direto, sem a tela).
- `@NotBlank` e companhia **não fazem nada sem `@Valid`** (é o Bug nº 1 do capítulo).
- 404 é "esse recurso não existe", não "o servidor quebrou" (isso é 500).
- O relacionamento é **lido do lado do Produto**: muitos produtos → um fornecedor. O
  Fornecedor não ganha lista de produtos neste capítulo (sem `@OneToMany`).

## O que entra e o que fica de fora

O "básico bom" escolhido, cada item com a necessidade que o justifica:

| Entra | Necessidade concreta que abre a porta |
|---|---|
| `record` para DTO | Precisamos de um "formulário" de dados, sem lógica; o record escreve getters/construtor para nós |
| DTO de entrada (`ProdutoRequestDTO`) | Dívida 3: cliente não pode escolher o `id` |
| DTO de saída (`ProdutoResponseDTO`) | O servidor devolve campos que o cliente nunca manda (`id`, `criadoEm`) |
| Mapper com métodos `static` | A tradução DTO ⇄ entidade se repete em todo endpoint; um lugar só para ela |
| `BigDecimal` + `@Column(precision, scale)` | Preço é dinheiro; `0.1 + 0.2` no F12 mostra o problema do `double` |
| `LocalDateTime criadoEm` | Um campo que **só o servidor** decide; prova visual de por que entrada ≠ saída |
| Lambda + `stream().map(...).toList()` | Listar precisa converter muitos produtos; ponte direta com o `.map()` do JS (Cap 5) |
| `Optional.orElseThrow` + `ResponseStatusException` | Dívida 2: o 404 |
| Bean Validation (`@NotBlank`, `@NotNull`, `@Positive`, `@PositiveOrZero`, `@Email`) + `@Valid` | Dívida 1: o 400 |
| `@RestControllerAdvice` com **um** tratador | A porta recusa, mas o 400 padrão não diz **por quê**; a tela precisa da mensagem |
| `@ManyToOne` + `@JoinColumn` (Produto → Fornecedor) | "De quem compramos esse teclado?" — a ficha do produto precisa apontar para a ficha de um fornecedor |
| Service com **dois** repositories | Para ligar o produto, o Service precisa perguntar ao `FornecedorRepository` se o fornecedor existe |

Fora deste capítulo (anotado no fechamento, sem box de "existe por aí" para não distrair):

- Interface + `ServiceImpl` (do backend antigo): sem necessidade real ainda.
- `@OneToMany` (lista de produtos dentro do Fornecedor), `@ManyToMany`, `fetch`/LAZY,
  cascata e o problema N+1: o relacionamento entra no seu formato mínimo, só de um lado.
- Endpoints aninhados (`/fornecedores/{id}/produtos`) e filtros por fornecedor.
- `enum` para categoria: o GestorPRO usa texto livre; mantém `String`.
- Exceções customizadas com herança, `ProblemDetail`, paginação, unicidade (409), CORS,
  JWT, migrations (Flyway), testes automatizados, MapStruct.
- **Integração com o React**: não é o próximo passo. Vem num capítulo único, mais adiante,
  com o backend consolidado e feita com IA. Este capítulo não promete integração.
- Refatorar o Fornecedor: vira **desafio para casa** (aplicar as 3 correções no que já existe).

## Campos

Seguem o GestorPRO (`tooling/gestorpro-referencia/db.json`), como o Cap 12 fez com Fornecedor
— o front que a turma construiu já fala com esses nomes.

**Produto** (entidade): `Long id`, `String nome`, `BigDecimal preco`, `Integer estoque`,
`String categoria`, `LocalDateTime criadoEm`, `Fornecedor fornecedor` (`@ManyToOne`,
obrigatório; coluna `fornecedor_id` com chave estrangeira). O `fornecedor` só aparece a partir
do bloco 12 — até lá a tabela abaixo vale sem as duas últimas linhas.

| Campo | Entrada (Request) | Saída (Response) | Validação |
|---|---|---|---|
| `id` | ✗ — o banco gera | ✓ | — |
| `nome` | ✓ | ✓ | `@NotBlank` |
| `preco` | ✓ | ✓ | `@NotNull` + `@Positive` |
| `estoque` | ✓ | ✓ | `@NotNull` + `@PositiveOrZero` |
| `categoria` | ✓ | ✓ | opcional |
| `criadoEm` | ✗ — o servidor decide | ✓ | — |
| `fornecedorId` | ✓ — só o número | ✓ | `@NotNull` (e precisa existir → 404) |
| `fornecedorNome` | ✗ | ✓ — achatado, sem o objeto inteiro | — |

**Cliente** (entidade): `Long id`, `String nome`, `String email`, `String telefone`,
`String cidade`. Request sem `id`; Response com `id`. Validação: `@NotBlank` em nome,
`@NotBlank` + `@Email` em email (a única anotação nova — o resto é repetição consciente).
Sem `criadoEm` no Cliente: a receita fica idêntica sem ser cópia cega.

## Recorte e ritmo

Dois encontros de ~4 h, como o Cap 12. Estimativa; ajustar à turma.

| Encontro | Blocos | Checkpoint de saída |
|---|---|---|
| A — A porta de entrada (DTO) | Dívidas, DTO/record, LAB 01, BigDecimal, Produto: POST, GET lista, GET por ID, PUT, DELETE (com 404) | Os 5 endpoints de Produto com DTO; `id` no POST ignorado; 404 real |
| B — Porta com segurança e o primeiro relacionamento | Validação (400), LAB 02, tratador de erros, **`@ManyToOne` Produto → Fornecedor**, LAB 03, **Cliente sozinho**, fechamento | Produto protegido e ligado ao fornecedor; Cliente construído pelo aluno |

O PUT e o DELETE foram para o Encontro A (depois do `buscarOuFalhar` eles são curtos) para
abrir espaço ao relacionamento no B.

Se o Encontro B atrasar, o Cliente vira tarefa de casa com o checklist e o gabarito no
olhinho — o capítulo precisa funcionar das duas formas.

## Roteiro do capítulo

### 0. Abertura: as três contas que ficaram em aberto

- Retomar o `#fechamento` do Cap 12 como **lista de dívidas** (as três da tabela acima),
  com a evidência que o aluno viu. Fazer **uma** delas ao vivo no Fornecedor (o POST com
  `"id": 1` sobrescrevendo a TechDistrib) — a dor primeiro, a solução depois.
- Promessa do capítulo em uma frase: "a mesma API, agora com porta, porteiro e recepção".
- Sem antecipar nenhuma sintaxe nova aqui.

### 1. DTO: o formulário da recepção

- Analogia: recepção de clínica. O paciente preenche **o formulário da recepção** (nome,
  telefone…), não abre o prontuário do hospital e escreve o número do próprio prontuário. O
  prontuário (entidade) fica lá dentro; quem trafega é o formulário (DTO). Na saída, ele
  recebe **o comprovante** (Response), que tem dados que ele nunca escreveu (número,
  data/hora). Limite da metáfora: DTO não "protege" sozinho; ele define formato.
- Definição literal: **DTO — Data Transfer Object**, objeto de transferência de dados. Uma
  classe só com os dados que **atravessam** a fronteira HTTP, em uma direção.
- Dois DTOs, duas direções: Request (o que o cliente pode mandar) × Response (o que a API
  mostra). Mostrar a tabela de campos acima antes de qualquer código.
- Jogo rápido de triagem: arrastar `id`, `nome`, `preco`, `criadoEm` para Entrada / Saída /
  Ambos. Erro plausível: colocar `id` na entrada ("mas o PUT não precisa do id?" → o id do
  PUT vem **da URL**, como já era no Cap 12).

### 2. `record`: um DTO em uma linha

- Antes/depois: a classe com campos `private final`, construtor e getters escrita à mão
  (o aluno conhece do Cap 11) → o mesmo como `record`. "O record escreve isso por você."
- Três diferenças que o iniciante tropeça: (1) leitura é `dto.nome()`, **não**
  `dto.getNome()`; (2) não tem setter — o record nasce pronto e não muda; (3) é por isso que
  ele é bom para DTO e ruim para entidade JPA (a entidade continua com Lombok).
- Pacote novo `dto/`. Arquivo `ProdutoRequestDTO.java` (ainda **sem** anotações de
  validação — elas entram no bloco 8).

### 3. LAB 01 · Recepção do DTO (simulação)

Torna visível a dívida 3 e sua correção. O mesmo JSON de ataque (`"id": 1` + Teclado) chega
em dois modos, alternáveis:

- **Sem DTO (Cap 12):** o JSON vira entidade inteira, o `id: 1` é aceito, a linha 1 do
  banco é **sobrescrita** (a TechDistrib… ou o Teclado original) — animação da linha trocando.
- **Com DTO:** o JSON passa pelo formulário de vagas fixas; `id` não tem vaga e **fica de
  fora** (desce em cinza "ignorado"); a entidade nasce sem id, o banco gera um novo; a
  resposta sai pelo comprovante com `id` novo e `criadoEm`.

Avanço manual, voltar/reiniciar, sem servidor real (padrão dos LABs do Cap 12). Quiz de
fechamento: "Mandei `"id": 999` no POST com DTO. O que acontece?" (novo registro com ID
gerado; o 999 é ignorado — o Spring, por padrão, não reclama de campo desconhecido).

### 4. Dinheiro não é `double`: `BigDecimal`

- Experimento que o aluno já sabe fazer: F12 no navegador, `0.1 + 0.2` →
  `0.30000000000000004`. Em Java, o mesmo num `main` do Cap 11. Não é bug do JavaScript nem
  do Java: é como o computador guarda números com vírgula em binário.
- Consequência concreta: centavos sumindo em um somatório de vendas.
- Solução: `BigDecimal`. Mostrar `new BigDecimal("0.1").add(new BigDecimal("0.2"))` → `0.3`
  e o cuidado: criar a partir de **texto**, não de `0.1` (Bug).
- No JSON nada muda: `"preco": 320.00` continua número; o Spring converte.
- Na entidade: `@Column(nullable = false, precision = 10, scale = 2)` — explicar precision
  (dígitos no total) e scale (casas decimais) com a ficha do banco; conferir a coluna
  `numeric(10,2)` no psql.
- Meme candidato (0.1 + 0.2) — **só com aprovação prévia** (`06-imagens-e-memes.md`).

### 5. Produto · POST — o primeiro ciclo completo com DTO

Ordem de construção (Model → Repository → DTOs → Mapper → Service → Controller), arquivo
inteiro com imports em cada passo, como no Cap 12:

1. `model/Produto.java` — entidade com Lombok, `BigDecimal preco`, `LocalDateTime criadoEm`.
2. `repository/ProdutoRepository.java` — igual ao do Fornecedor (reconhecimento, não novidade).
3. `dto/ProdutoRequestDTO.java` e `dto/ProdutoResponseDTO.java`.
4. `mapper/ProdutoMapper.java` — **o tradutor**: `toEntity(dto)` e `toResponse(produto)`,
   ambos `static` (retomar `static` do Cap 11: "não precisa de `new ProdutoMapper()`").
5. `service/ProdutoService.java` — `cadastrar(dto)`: traduz, define `criadoEm` (regra do
   servidor, mora no Service), salva, traduz de volta.
6. `controller/ProdutoController.java` — recebe `ProdutoRequestDTO`, devolve
   `ProdutoResponseDTO`, `@ResponseStatus(HttpStatus.CREATED)`.

Evidência no Insomnia: POST normal → 201 com `id` e `criadoEm`; **POST de ataque** com
`"id": 1` → 201 com **outro** id, e o SELECT prova que nada foi sobrescrito. Dívida 3 paga ✓.

Diagrama "quem fala com quem" atualizado: o Controller só conhece DTO; o Repository só
conhece entidade; o Service está no meio e usa o Mapper.

### 6. Produto · GET lista — a esteira (primeira lambda)

- Problema: `findAll()` devolve `List<Produto>`, mas precisamos de `List<ProdutoResponseDTO>`.
- Primeiro a versão que o aluno já sabe: `for` montando uma lista nova (Cap 11).
- Depois a forma curta, **como foi com a arrow function no Cap 2**:
  `repository.findAll().stream().map(produto -> ProdutoMapper.toResponse(produto)).toList()`.
  Ponte explícita com o JS do Cap 5: `produtos.map(p => ...)` — mesma ideia, setas diferentes
  (`=>` no JS, `->` no Java).
- **Aviso de ligadura obrigatório** (primeira lambda do material de backend): a IDE pode
  desenhar `→`, mas se digita `-` seguido de `>`. Keycaps como no vídeo da arrow function.
- Analogia da esteira (🏭, já usada no Cap 5): cada produto entra, passa pelo tradutor, sai
  como DTO. `stream()` = ligar a esteira; `map` = estação de trabalho; `toList()` = caixa no fim.
- Não mostrar referência de método (`ProdutoMapper::toResponse`) — fica para depois.

### 7. Produto · GET por ID — o 404 de verdade

- Retomar o Optional do Cap 12 (a caixa de presente 🎁 que podia vir vazia). Até agora o
  Controller devolvia a caixa fechada, e a caixa vazia virava `null` com 200.
- `orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Produto não encontrado"))`:
  "abra a caixa; se estiver vazia, pare tudo e responda 404". Segunda lambda — agora sem
  parâmetro (`()`), mesma seta.
- `throw` sai do método no meio do caminho: o `return` nem acontece (prever antes de rodar).
- Evidência: GET de ID existente → 200; GET de 99999 → **404**. Dívida 2 começa a ser paga ✓.
- Nesta etapa o corpo do 404 é o padrão do Spring (sem a mensagem); dizer isso com
  honestidade e prometer o conserto no bloco 9. **Verificar na implementação** o corpo exato
  do Boot 4.1.1 e citá-lo literalmente.

### 8. Produto · PUT e DELETE — buscar antes de mexer

- **PUT**: corrige outro atalho do Cap 12 (`setId` + `save`). Agora: buscar o existente (404
  se não houver) → copiar os campos do DTO → salvar. Novo método no Mapper:
  `atualizar(produto, dto)`. Prova: o `criadoEm` **não muda** depois do PUT (com o atalho
  antigo, ele seria apagado — mostrar o contraste).
- Refatoração pequena e motivada: o `orElseThrow` apareceu duas vezes → método privado
  `buscarOuFalhar(id)` no Service. "Escreveu duas vezes, vira um nome."
- **DELETE**: `if (!repository.existsById(id))` → 404; senão `deleteById`. Evidência: DELETE
  repetido agora dá 404 na segunda vez (no Cap 12 dava 204). Dívida 2 paga por inteiro ✓.

**Fim do Encontro A.** Checkpoint 5 (Produto completo, ainda sem validação e sem fornecedor).

### 9. Validação — o segurança da porta (400)

- Reprise da dívida 1 no Produto: POST com `"nome": ""` e `"preco": -5` → 201, o lixo está
  no banco (SELECT).
- Analogia: segurança na porta do show, com uma lista de regras na prancheta. Ele confere
  **antes** de deixar entrar; quem é barrado nem chega no balcão (Service) nem no banco.
- Passo de infraestrutura: o Initializr do Cap 12 **não** incluiu Validation. Adicionar
  `spring-boot-starter-validation` ao `pom.xml` e recarregar o Maven no IntelliJ (ícone do
  Maven). Diagnóstico: "anotação vermelha / cannot find symbol" = dependência não carregada.
- Anotações uma por vez, cada uma com o JSON que ela barra: `@NotBlank` (nome),
  `@NotNull` + `@Positive` (preço), `@NotNull` + `@PositiveOrZero` (estoque). Diferença
  `@NotNull` × `@NotBlank` com três casos (`null`, `""`, `"   "`). Mensagens em português
  com `message = "..."` (não depender do idioma padrão do validador).
- **`@Valid` no `@RequestBody`** do POST e do PUT — e o experimento de tirá-lo: as regras
  continuam escritas e **ninguém confere**. Bug nº 1.
- Evidência: POST inválido → 400 e o SELECT mostra que **nada** foi gravado.

### 10. LAB 02 · Segurança da porta (simulação)

Escolher um JSON de uma lista (válido · nome vazio · nome com espaços · preço negativo ·
estoque faltando · **válido mas sem `@Valid`** · inválido mas sem `@Valid`). A simulação
acende cada regra da prancheta (verde/vermelho), mostra o desfecho (201 ou 400) e o estado
do banco. O caso "sem `@Valid`" deixa a prancheta apagada e o lixo entra — o contraste é o
ponto do lab. Quiz: prever o status de 4 JSONs novos antes de enviar.

### 11. Tratador de erros — a recepção explica o "não"

- Problema concreto: o 400 padrão diz **que** foi recusado, mas não **por quê**; a tela do
  React (que o aluno fez no Cap 10) precisa mostrar "O nome é obrigatório" embaixo do campo.
- `@RestControllerAdvice` = uma recepção que atende **todos** os Controllers quando algo dá
  errado. Uma classe, um método com `@ExceptionHandler(MethodArgumentNotValidException.class)`
  e `@ResponseStatus(HttpStatus.BAD_REQUEST)` que devolve um `Map<String, String>`
  campo → mensagem, montado com um **`for`** (sem stream aqui: um conceito novo por vez).
- Resultado no Insomnia: `{"nome": "O nome é obrigatório", "preco": "O preço deve ser maior que zero"}`.
- Mensagem do 404: ver a decisão 3 no fim do documento.

### 12. Produto ganha um fornecedor — o primeiro relacionamento (`@ManyToOne`)

- Pergunta do negócio: "o Teclado acabou; de quem compramos para repor?" Hoje o produto não
  sabe. A informação já existe — está na tabela de fornecedores; falta **ligar** as fichas.
- Analogia: na ficha do produto há um campo "fornecedor nº ___" com o número da ficha da
  TechDistrib (não uma cópia dela). Muitos produtos podem ter o mesmo número → **muitos para
  um**, lido a partir do Produto. Limite da metáfora: quem garante que o número aponta para
  uma ficha que existe é o **banco**, não a gente.
- Primeiro no banco (o aluno viu SQL no Cap 12): coluna `fornecedor_id` e **chave
  estrangeira** (FK — *foreign key*: uma coluna que guarda a chave primária de outra tabela).
  Conferir com `\d produtos` no psql depois de rodar a API. Box opcional "com o professor":
  um `SELECT` com `JOIN` mostrando produto + nome do fornecedor.
- Na entidade: `@ManyToOne` + `@JoinColumn(name = "fornecedor_id", nullable = false)` e o
  campo do tipo **`Fornecedor`** (o objeto, não um `Long`) — "em Java a gente liga objetos;
  o Hibernate transforma isso no número da FK".
- No Request entra **só o número**: `@NotNull Long fornecedorId` (a regra vai para a mesma
  prancheta do bloco 9). Por que não o fornecedor inteiro no JSON? Porque o cliente da API
  não deve poder **criar ou alterar** um fornecedor de carona no cadastro de produto — de novo
  o motivo do DTO.
- No Service: segundo repository (`private final FornecedorRepository fornecedorRepository`)
  e um `buscarFornecedorOuFalhar(id)` gêmeo do `buscarOuFalhar` → 404 "Fornecedor não
  encontrado". O Mapper **não** consulta o banco (só traduz); quem busca é o Service.
- No Response sai **achatado**: `fornecedorId` + `fornecedorNome`, via encadeamento
  `produto.getFornecedor().getNome()` (explicar a leitura da esquerda para a direita).
  Contraste: sem DTO, o JSON do produto carregaria o fornecedor inteiro (CNPJ, telefone…)
  em todo produto da lista.
- PUT também pode trocar o fornecedor (mesmo `buscarFornecedorOuFalhar`).
- **Dados que já existem:** o `ddl-auto=update` não consegue criar uma coluna `NOT NULL` numa
  tabela com produtos sem fornecedor. Roteiro: apagar os produtos de teste do Encontro A
  (`DELETE FROM produtos;` no psql, com explicação) antes de rodar. **Verificar o erro real
  no Boot 4.1.1 + Postgres 17** e citá-lo literalmente no BugZilla.
- Limite observado ao vivo: tentar `DELETE /fornecedores/{id}` da TechDistrib com o Teclado
  ligado → o banco recusa (FK) e a API responde **500**. Leitura certa: o banco protegeu os
  dados; a API ainda não sabe traduzir essa recusa. Fica anotada como **dívida nova** (409),
  no mesmo espírito das três do Cap 12.
- Evidência: POST de produto com `fornecedorId` da TechDistrib → 201 com `fornecedorNome`;
  com `fornecedorId: 99999` → 404; sem `fornecedorId` → 400.

### 13. LAB 03 · Bastidores v2 — quem barra o quê (simulação)

Evolução do LAB 03 do Cap 12 (mesmo visual de camadas), agora com o Mapper e o Tratador
como fichas novas. Casos:

- POST válido: Controller → `@Valid` ok → Service → Mapper → Repository → banco → volta pelo
  Mapper → 201.
- POST inválido: para **na porta do Controller**; Service e banco ficam apagados → Tratador → 400.
- GET de ID inexistente: vai até o Repository, volta a caixa vazia, o Service lança → 404.
- POST com `fornecedorId` inexistente: passa pela porta (o número está lá), o Service
  pergunta ao **FornecedorRepository**, a caixa volta vazia → 404. Mostra o Service falando
  com dois repositories.

Pergunta que o lab responde (aberta na teoria): **em que camada cada erro é descoberto?**
Quiz de transferência: "e-mail com formato inválido no Cliente — quem barra?" (a porta) ×
"cliente 77 não existe — quem descobre?" (o Service, depois de perguntar ao Repository).

### 14. Sua vez: Cliente do começo ao fim

Fase "você comanda" do capítulo. Sem código pronto no corpo da seção — só:

- o pedido (campos e regras da tabela de Cliente, incluindo `@Email`);
- **a receita dos 7 arquivos** como checklist, na ordem de construção: Model → Repository →
  RequestDTO → ResponseDTO → Mapper → Service → Controller (o Tratador já serve para todos);
- um **roteiro de aceite** no Insomnia: POST válido 201 · POST com `id` ignorado · POST com
  e-mail `ana@` → 400 com a mensagem · GET lista · GET 404 · PUT · DELETE 204 → DELETE 404;
- dica → PARE → gabarito por arquivo no olhinho 👀 (`03-padrao-olhinho.md`).

Se o tempo acabar, é a tarefa de casa (decidido no ritmo acima).

### 15. Fechamento

- Tabela "antes × depois" das três dívidas, agora pagas, com os status reais — e a dívida
  nova (excluir fornecedor com produtos → 500) anotada para depois.
- Diagrama final das camadas com DTO/Mapper/Tratador e a seta Produto → Fornecedor.
- Quiz final misto (DTO, BigDecimal, 400 × 404 × 500, `@Valid`, de que lado mora a FK).
- Para casa ★★: **pagar as dívidas no Fornecedor** (DTOs, Mapper, validação, 404) — mesmo
  roteiro de aceite do Cliente. Ninguém recebe código pronto aqui; o gabarito fica no ZIP.
- Ponte: "a API agora fala direito e as fichas se conhecem". O próximo passo continua no
  **backend** (consolidar). Não prometer integração com o React aqui — ela vem num capítulo
  próprio, mais adiante, feita com IA.
- Caderno `caderno:cap13`: desenho do caminho com DTO, uma requisição barrada com a
  resposta real, e o erro que o aluno diagnosticou.

## Código-alvo de Produto (estado final, para aprovação)

Rascunho do formato; a versão publicada é a que compilar e passar no validador.

```java
// dto/ProdutoRequestDTO.java
public record ProdutoRequestDTO(
        @NotBlank(message = "O nome é obrigatório")
        String nome,

        @NotNull(message = "O preço é obrigatório")
        @Positive(message = "O preço deve ser maior que zero")
        BigDecimal preco,

        @NotNull(message = "O estoque é obrigatório")
        @PositiveOrZero(message = "O estoque não pode ser negativo")
        Integer estoque,

        String categoria,

        @NotNull(message = "O fornecedor é obrigatório")
        Long fornecedorId
) {
}

// dto/ProdutoResponseDTO.java
public record ProdutoResponseDTO(
        Long id,
        String nome,
        BigDecimal preco,
        Integer estoque,
        String categoria,
        LocalDateTime criadoEm,
        Long fornecedorId,
        String fornecedorNome
) {
}

// mapper/ProdutoMapper.java
public class ProdutoMapper {
    public static Produto toEntity(ProdutoRequestDTO dto) {
        Produto produto = new Produto();
        atualizar(produto, dto);
        return produto;
    }

    public static void atualizar(Produto produto, ProdutoRequestDTO dto) {
        produto.setNome(dto.nome());
        produto.setPreco(dto.preco());
        produto.setEstoque(dto.estoque());
        produto.setCategoria(dto.categoria());
    }

    public static ProdutoResponseDTO toResponse(Produto produto) {
        return new ProdutoResponseDTO(
                produto.getId(),
                produto.getNome(),
                produto.getPreco(),
                produto.getEstoque(),
                produto.getCategoria(),
                produto.getCriadoEm(),
                produto.getFornecedor().getId(),
                produto.getFornecedor().getNome()
        );
    }
}

// model/Produto.java (trecho)
@ManyToOne
@JoinColumn(name = "fornecedor_id", nullable = false)
private Fornecedor fornecedor;

// service/ProdutoService.java (trecho)
private final ProdutoRepository repository;
private final FornecedorRepository fornecedorRepository;

public ProdutoResponseDTO cadastrar(ProdutoRequestDTO dto) {
    Produto produto = ProdutoMapper.toEntity(dto);
    produto.setFornecedor(buscarFornecedorOuFalhar(dto.fornecedorId()));
    produto.setCriadoEm(LocalDateTime.now());
    return ProdutoMapper.toResponse(repository.save(produto));
}

public List<ProdutoResponseDTO> listar() {
    return repository.findAll().stream()
            .map(produto -> ProdutoMapper.toResponse(produto))
            .toList();
}

public ProdutoResponseDTO buscar(Long id) {
    return ProdutoMapper.toResponse(buscarOuFalhar(id));
}

public ProdutoResponseDTO atualizar(Long id, ProdutoRequestDTO dto) {
    Produto produto = buscarOuFalhar(id);
    ProdutoMapper.atualizar(produto, dto);
    produto.setFornecedor(buscarFornecedorOuFalhar(dto.fornecedorId()));
    return ProdutoMapper.toResponse(repository.save(produto));
}

public void excluir(Long id) {
    if (!repository.existsById(id)) {
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Produto não encontrado");
    }
    repository.deleteById(id);
}

private Produto buscarOuFalhar(Long id) {
    return repository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Produto não encontrado"));
}

private Fornecedor buscarFornecedorOuFalhar(Long id) {
    return fornecedorRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Fornecedor não encontrado"));
}

// controller/ProdutoController.java (trecho)
@PostMapping
@ResponseStatus(HttpStatus.CREATED)
public ProdutoResponseDTO cadastrar(@RequestBody @Valid ProdutoRequestDTO dto) {
    return service.cadastrar(dto);
}

// exception/TratadorDeErros.java
@RestControllerAdvice
public class TratadorDeErros {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, String> tratarValidacao(MethodArgumentNotValidException ex) {
        Map<String, String> erros = new HashMap<>();
        for (FieldError erro : ex.getBindingResult().getFieldErrors()) {
            erros.put(erro.getField(), erro.getDefaultMessage());
        }
        return erros;
    }
}
```

Observação de didática progressiva: `fornecedor`, `fornecedorId`, `fornecedorNome` e
`buscarFornecedorOuFalhar` só entram no bloco 12; os checkpoints do Encontro A não os têm.
O `toEntity` chamando `atualizar` só aparece no bloco 8 (PUT). No POST (bloco 5), o `toEntity` copia os campos direto; a refatoração é um beat
"repetiu → reaproveita", como o `buscarOuFalhar`.

## BugZilla do capítulo (erros previsíveis, com mensagem real a capturar na implementação)

1. Esqueceu o `@Valid` → regras ignoradas, 201 com lixo.
2. `dto.getNome()` num record → `cannot find symbol` (é `dto.nome()`).
3. Dependência de validation não carregada → `package jakarta.validation.constraints does not exist`.
4. Campo esquecido no Mapper → resposta com `null` naquele campo (sem erro nenhum — o pior tipo).
5. `new BigDecimal(0.1)` → `0.1000000000000000055511151231257827…`.
6. Seta da lambda digitada como `→` (copiado da IDE com ligadura) → `illegal character`.
7. Controller devolvendo `Produto` em vez de `ProdutoResponseDTO` → funciona, mas a dívida
   volta (discussão, não erro de compilação).
8. Coluna `fornecedor_id NOT NULL` em tabela com produtos antigos → a API não sobe ou a
   coluna não é criada (capturar o comportamento real do `ddl-auto=update`).
9. Excluir fornecedor que tem produtos → 500 com violação de chave estrangeira no log
   (é o limite do bloco 12, não um bug do aluno).

Mensagens citadas verbatim, como no `11b-catalogo-erros-javac.md` — capturar compilando.

## Experiências visuais (resumo)

| Fundamento | Experiência | Decisão pedida ao aluno |
|---|---|---|
| Entrada ≠ saída | Triagem de campos (bloco 1) | Onde mora o `id`? |
| DTO protege o formato | LAB 01 Recepção do DTO (sem × com) | O `id: 999` entra? |
| Validação antes do Service | LAB 02 Segurança da porta | 201 ou 400? E sem `@Valid`? |
| Ficha aponta para ficha | Bloco 12: produto com "fornecedor nº" + FK no psql | Onde mora o número: em Produto ou em Fornecedor? |
| Onde cada erro nasce | LAB 03 Bastidores v2 | Quem barra / quem descobre? |

Teatro com personagens e vozes (skill `teatro-didatico-animado`) é **opcional** e depende
de aprovação explícita (gera custo no ElevenLabs). Candidato natural: LAB 01, com três
papéis (cliente apressado mandando `id`, recepcionista/DTO, arquivista/banco). Sem vídeo
HyperFrames novo por padrão; se o professor quiser, o candidato é "a esteira do stream".

## Apoio, validação e entrega (mesmo padrão do Cap 12)

- `apoio/`: `api-inicio-cap13.zip` (= ZIP final do Cap 12, para quem faltou),
  `api-completa-cap13.zip` (Produto ligado a Fornecedor + Cliente + Tratador; o código do Fornecedor fica intocado),
  checkpoints por etapa de Produto e gabarito do Cliente, README.
- `tooling/validate-cap13.py --integration`: HTML ↔ checkpoints ↔ ZIP iguais; compilar cada
  checkpoint em Java 21; rodar contra PostgreSQL 17 os cenários do roteiro de aceite (POST
  com `id` ignorado, 400 por campo, 404 em GET/PUT/DELETE, `criadoEm` preservado no PUT,
  `numeric(10,2)` no banco, FK `fornecedor_id`, 404 de fornecedor inexistente, resposta com
  `fornecedorNome`, e o 500 ao excluir fornecedor com produto — documentado como esperado).
- `tooling/validate-cap13-browser.mjs`: LABs com erro/acerto/reinício, quizzes, 390 px,
  movimento reduzido, **ligaduras desligadas (conferir `->` da lambda)**, caderno.
- Card no hub; Cap 12 `#fechamento` passa a linkar o Cap 13; roteiro do professor separado,
  como no Cap 11.
- Nada de commit/push/publicação sem pedido.

## Decisões do professor (2026-10-09)

1. `@ManyToOne` Produto → Fornecedor **entra** (bloco 12), formato mínimo.
2. `criadoEm` **mantido**.
3. Mensagem do 404 via **uma linha** no `application.properties` (opção A). Achado na
   implementação: no Boot 4 a propriedade é `spring.web.error.include-message`;
   `server.error.include-message` está depreciada com nível *error* e é **ignorada**.
4. Tratador em `exception/TratadorDeErros`.
5. Teatro com vozes: **não** (sem custo de ElevenLabs).
6. Meme do `0.1 + 0.2`: **não** gerado (sem imagem nova).

## Implementação — 2026-10-09

Pasta `capitulos/13-spring-dto-validacao/` com 17 seções (00–16): os blocos 8 do plano viraram
duas seções (08 PUT, 09 DELETE) e entrou uma seção 15 · BugZilla com 10 erros reais.
Sidebar dividida em Encontro A / Encontro B. Card no hub; fim do Cap 12 linka o Cap 13.

**Fonte única (novidade de infraestrutura):** o Java mora em `tooling/cap13/codigo.py` (9 etapas,
cada uma só com os arquivos que mudam) e o texto em `tooling/cap13/pagina-*.html` com marcadores.
`tooling/build-cap13.py` gera `index.html` (coloração, escape de `<>&`, linhas novas da etapa com
fundo verde via difflib), `apoio/checkpoints/1..9` e os ZIPs. Não editar o HTML gerado à mão.
Padrão reaproveitável para os próximos capítulos de backend.

**Etapas:** 1 POST · 2 GET lista · 3 GET por ID · 4 PUT · 5 DELETE · 6 Validação (+ pom) ·
7 Tratador (+ properties) · 8 Produto → Fornecedor · 9 Cliente (gabarito no olhinho).

**Interações:** triagem de campos (entrada/saída/ambos) · LAB 01 Recepção do DTO (sem × com,
mesmo JSON com `id: 1` e data falsa) · LAB 02 Segurança da porta (5 JSONs × checkbox `@Valid`;
sem `@Valid` + sem estoque = 500 do banco) · LAB 03 Bastidores v2 (8 peças; as que nunca
trabalham ficam tracejadas no fim) · 15 quizzes.

**Achados reais (Boot 4.1.1 + Hibernate 7.4 + Postgres 17), citados no capítulo:**
- Campos desconhecidos no JSON são ignorados (sem erro): `id`/`criadoEm` no POST somem.
- 404 sem a propriedade: `{"timestamp","status","error","path"}` (sem `message`).
- 400 da validação sem tratador: mesmo formato genérico. Com o tratador: `Map` campo → mensagem
  (ordem varia; HashMap).
- `ddl-auto=update` com produtos antigos: `alter table ... add column fornecedor_id bigint not
  null` falha (`contains null values`), Hibernate só loga WARN, API sobe e todo `/produtos` = 500.
  Conserto ensinado: `DELETE FROM produtos;` e reiniciar.
- FK gerada: `fkje6bg3cu81l0e4nfprc0c7wwc` (determinística). Excluir fornecedor ligado = 500
  (`DataIntegrityViolationException`) — anotado como **conta nova** (409) para depois.
- javac: `cannot find symbol … method getNome()` (record), `package jakarta.validation.constraints
  does not exist`, `illegal character: '\u2192'`, `illegal start of expression` (`=>` no Java).
- Ferramenta de escrita: o Write converteu `\u2192` em `→` no template; corrigido à mão.
  Atenção ao escrever escapes `\uXXXX` em arquivos.

**Correção visual:** `.tip/.warning` do CSS compartilhado são `display:flex` (quebra o texto em
colunas); o Cap 12 corrigia no `parte0.css`. O Cap 13 traz `display:block` no `cap13.css`.

**Verificação executada:**
- `python3 tooling/validate-cap13.py --integration`: 31 blocos Java = `codigo.py` = checkpoints;
  ZIP final com os arquivos do Cap 12 intactos; 9 etapas + variante com `for` compilam em Java 21;
  roteiro completo em PostgreSQL 17 descartável (todos os achados acima viram asserts).
- `node tooling/validate-cap13-browser.mjs` (playwright-core + Chrome do sistema): 1440 px e
  390 px sem rolagem horizontal, triagem, 3 LABs (voltar/reiniciar/trocar), 15 quizzes com
  erro/acerto, menu/teclado, cópia sem HTML, olhinho, ligaduras off, linhas novas, movimento
  reduzido e caderno `cap13`.
- `validate-cap12.py --static-only` continua passando após o link novo.
