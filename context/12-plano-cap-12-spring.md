# 12 — Plano do Cap 12 · Spring: nossa primeira API com banco de dados

> Rascunho inicial — 2026-09-18. Escopo solicitado pelo professor: framework → Spring
> Initializr → instalação do Docker Desktop → Docker/container → PostgreSQL → SQL/CRUD →
> IntelliJ/JDK 21 → arquitetura → CRUD de uma entidade simples. DTO e outras evoluções
> começam na próxima entidade. A primeira implementação local está disponível; veja as
> evidências e decisões ao final deste documento.

## Ponto de partida e transformação

O último capítulo disponível no hub local é o **11 — Java & OO direto ao ponto**:
`Produto`, `ProdutoService` e `Main`, com CRUD em memória. O aluno já conhece classes,
objetos, construtores, getters/setters, listas e métodos. Ainda não conhece Maven, JPA,
injeção de dependência ou a inicialização de uma aplicação Spring.

Ao final do Cap 12, deve conseguir gerar e abrir um projeto Spring, executar PostgreSQL em
Docker, manipular uma tabela com SQL e construir uma API de fornecedores. Deve verificar
no banco o efeito de uma requisição e comprovar que os registros continuam após reiniciar
a aplicação.

**Regra central:** cada parte tem uma responsabilidade; a requisição chega pelo Controller,
o Service organiza a operação, o Repository acessa os dados e o PostgreSQL os armazena.
O Model representa os dados com que essas partes trabalham.

**Caso contínuo proposto:** cadastrar a TechDistrib como fornecedor do GestorPRO, consultar,
alterar seu telefone e excluir o cadastro. A mesma história atravessa SQL, simulação e API.

**Limites:** framework não inventa regras de negócio; instalar Docker não inicia o banco;
container não é imagem nem volume; API em execução não significa que toda URL já existe.

## Recorte e ritmo propostos

Um capítulo com duas partes e dois encontros de aproximadamente 4 horas. É uma estimativa
pedagógica, a ajustar ao ritmo da turma; instalação, downloads e problemas de virtualização
podem exigir tempo adicional. Não comprimir toda essa primeira experiência em uma manhã.

| Encontro | Blocos | Checkpoint de saída |
|---|---|---|
| A — Ambiente e dados | Framework, Initializr, Docker Desktop, conceitos de Docker, PostgreSQL e SQL | ZIP gerado, banco rodando e CRUD SQL executado |
| B — Nossa primeira API | IntelliJ/JDK 21, projeto/conexão, camadas, CRUD de Fornecedor e revisão | Cinco endpoints funcionando e persistência demonstrada |

Preservar a ordem solicitada. Antes de instalar Docker, dar só uma frase de motivação:
“Vamos preparar a ferramenta que executará nosso banco.” A teoria detalhada entra depois.
Se houver preparação antes da aula, antecipar apenas downloads e verificações do ambiente.

## Roteiro do capítulo

### 1. Framework: uma estrutura pronta para trabalhar

- Abrir com a oficina equipada: ferramentas e organização prontas, mas o trabalho continua
  dependendo de quem conhece o problema. Sair da analogia para uma definição literal.
- Contrastar uma biblioteca que nosso código chama com um framework que também organiza
  a execução e chama nosso código nos pontos previstos. Evitar tratar a diferença como absoluta.
- Distinguir Java (linguagem), Spring (framework/ecossistema) e Spring Boot (facilita criar,
  configurar e executar aplicações Spring).
- Mostrar o ganho concreto: receber HTTP, converter JSON e conectar componentes sem escrever
  toda a infraestrutura do zero. A regra do cadastro continua sendo nossa.
- Decisão rápida: “Quem sabe se este fornecedor pode ser cadastrado: o Spring ou a regra
  que programamos?”

### 2. Spring Initializr: gerar a estrutura do projeto

- Usar o site oficial [start.spring.io](https://start.spring.io/), explicando cada escolha
  antes de clicar. Initializr gera um projeto inicial; não gera nosso CRUD.
- Proposta: Maven, Java, JAR, Java 21; group `br.com.gestorpro`, artifact `api`, package
  `br.com.gestorpro.api`. O projeto Java do Cap 11 permanece como referência separada.
- Selecionar uma versão estável do Spring Boot disponível no site, compatível com Java 21;
  evitar M/SNAPSHOT. Fixar a versão exata e os nomes das dependências na implementação.
- Dependências iniciais: Spring Web, Spring Data JPA, PostgreSQL Driver e Lombok. Explicar em uma
  frase o papel de cada uma; aprofundar quando forem usadas.
- Maven: organiza dependências e construção do projeto; `pom.xml` registra essas escolhas.
- Gerar, baixar e extrair o ZIP em uma pasta identificável. Abrir no IntelliJ no bloco 7.
- Lombok já nesta entidade: `@Getter`, `@Setter` e `@NoArgsConstructor`. Mostrar uma
  equivalência com os métodos escritos no Cap 11 antes de depender da geração automática.

### 3. Tutorial rápido: instalar Docker Desktop

- Oferecer abas Windows/macOS e referência oficial para Linux, com passos equivalentes e
  capturas da versão realmente usada na elaboração do capítulo.
- Windows: verificar requisitos, virtualização e WSL 2 quando necessário; orientar reinício
  apenas quando solicitado pelo instalador. Não prometer que só instalar resolve todos os PCs.
- macOS: selecionar instalador para Apple Silicon ou Intel conforme a máquina.
- Abrir Docker Desktop, aguardar o mecanismo iniciar e executar `docker version`, mostrando
  a diferença entre reconhecer o comando e conseguir conversar com o servidor Docker.
- Checkpoint visual: Docker pronto. Diagnóstico recolhido para mecanismo parado, WSL ausente
  ou incompatibilidade de ambiente, sem desviar a explicação principal.

### 4. Docker, imagem, container, porta e volume

- Apresentar os termos um por vez: Docker executa/gerencia containers; imagem é o pacote
  usado para criá-los; container é a instância isolada, que pode estar executando ou parada.
- Limite da metáfora: container não é uma máquina completa independente. Docker Desktop
  pode usar uma máquina virtual para executar containers Linux.
- Porta conecta um endereço do computador ao serviço no container. `5432` é do PostgreSQL;
  `8080` será da API Java. O navegador não conversa com PostgreSQL por HTTP.
- Volume guarda os dados separadamente do ciclo de vida do container. Parar não é remover;
  remover um container não é o mesmo que remover seu volume. Volume não equivale a backup.
- Simulação proposta: imagem → criar container → iniciar PostgreSQL → gravar registro →
  parar/iniciar → recriar usando o mesmo volume. Mostrar em cada estado onde o registro fica.
- Quiz de previsão: “O banco parou. Isso prova que o cadastro foi apagado?”

### 5. Criar nosso PostgreSQL

- Uma receita principal com `docker run`, em uma linha para funcionar no PowerShell e nos
  terminais de macOS/Linux. Explicar as opções em cartões após mostrar o resultado esperado.
- Base proposta para a receita: imagem `postgres:17`, container `gestorpro-postgres`, banco
  `gestorpro`, usuário `gestorpro`, senha identificada como exclusiva do laboratório local,
  porta `127.0.0.1:5432:5432` e volume nomeado `gestorpro-pgdata:/var/lib/postgresql/data`.
- Evitar `latest`; a imagem oficial muda o diretório de volume a partir do PostgreSQL 18.
  Se adotarmos outra major, revisar a receita inteira antes de publicar.
- Mostrar o container no Desktop e confirmar inicialização pelos logs e `pg_isready`.
  Um container listado como iniciado ainda pode estar preparando o banco.
- Ensinar `docker ps`, `docker logs`, `docker stop` e `docker start` apenas quando necessários.
  Não repetir `docker run` para iniciar um container que já existe.
- Diagnóstico: porta ocupada, nome já utilizado, banco ainda iniciando e credenciais divergentes.
  Explicar que variáveis de inicialização não redefinem credenciais de um volume já inicializado.
- SQL principal via `docker exec -it gestorpro-postgres psql -U gestorpro -d gestorpro`;
  explicar a troca do terminal do sistema pelo prompt SQL e a saída com `\q`.
  DBeaver pode ser apoio opcional do professor, sem exigir mais uma instalação na trilha principal.

### 6. SQL e CRUD: enxergar o banco antes da abstração

- Definir banco, tabela, coluna, linha, tipo e chave primária com a ficha de um fornecedor.
- SQL = Structured Query Language; CRUD = criar, ler, atualizar e excluir registros.
  Diferenciar `CREATE TABLE` (estrutura) de `INSERT` (operação de cadastro do CRUD).
- Usar tabela didática `fornecedores_treino`, com os mesmos campos da futura entidade.
  Mantê-la separada de `fornecedores`, que será mapeada pelo JPA, evitando conflitos de criação
  e preservando os exercícios SQL para revisitar.
- Ordem: `CREATE TABLE` → `INSERT ... RETURNING id` → `SELECT` → `SELECT ... WHERE id = ...`
  → `UPDATE ... WHERE id = ...` → conferir com `SELECT` → `DELETE ... WHERE id = ...` → conferir.
- Ensinar `BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY` como ID gerado pelo banco,
  `VARCHAR` como texto e `NOT NULL` no momento em que aparecerem. CNPJ/telefone são texto.
- Trabalhar com o ID realmente retornado, sem presumir que será sempre 1.
- Visualizar tabela antes/depois e quais linhas atendem ao `WHERE`. Mostrar a consequência
  de omitir `WHERE` na simulação; nos comandos reais, usar registros descartáveis identificados.
- Prática guiada: cadastrar TechDistrib. Individual: cadastrar outro fornecedor, buscar pelo
  ID, atualizar telefone e excluir somente esse segundo cadastro. Solução no olhinho.
- A API repetirá essas operações. O aluno reconhecerá o SQL que Hibernate emitir depois.

### 7. Abrir no IntelliJ e conferir JDK 21

- `File > Open`: selecionar a pasta extraída que contém `pom.xml`, importar como projeto
  Maven e aguardar sincronização. Não abrir o ZIP ou criar outro projeto vazio por engano.
- `File > Project Structure > Project`: SDK 21 e language level 21, sem preview.
  Se necessário, `Download JDK`, versão 21, reutilizando a orientação Temurin do Cap 11.
- Conferir SDK herdado pelo módulo, Java 21 no `pom.xml` e JDK do Maven/execução caso haja
  divergência. O Java que executa a IDE não define sozinho o Java do projeto.
- Checkpoint: aluno localiza projeto, `pom.xml`, `src/main/java` e `src/main/resources`.

### 8. Entender o projeto e conectar ao banco

- Explicar classe principal, `main`, `SpringApplication.run` e `@SpringBootApplication`.
  Anotação fornece metadados; não é comentário nem uma linha que o aluno pode apagar à vontade.
- Em `application.properties`, configurar URL JDBC, usuário e senha com os mesmos valores
  do container. Definir JDBC ao apresentar a conexão Java/banco.
- A aplicação roda no computador, então conecta em `localhost:5432`. Não colocar a API em
  outro container nesta aula nem antecipar redes/Compose.
- Usar `spring.jpa.hibernate.ddl-auto=update` apenas como conveniência de laboratório;
  explicar que não substitui migrações em sistemas reais. Mostrar SQL durante a explicação.
- Diferenciar JPA (especificação de persistência), Hibernate (implementação que faz o mapeamento)
  e Spring Data JPA (facilita o acesso por repositories), sem tratar os três como sinônimos.
- Só executar depois da configuração do banco: Data JPA + driver exigem uma fonte de dados.
  Confirmar aplicação iniciada; um 404 em `/` não significa falha se essa rota não foi criada.

### 9. MVC e arquitetura em camadas

Retomar a analogia do restaurante já conhecida: atendimento, organização do pedido e acesso
ao estoque. Explicitar onde termina a analogia e nomear responsabilidades reais.

```text
Cliente HTTP -> Controller -> Service -> Repository -> PostgreSQL
            <- resposta   <- retorno <- dados      <- resultado

Model (Fornecedor): representa os dados usados pelas camadas.
```

- MVC significa Model–View–Controller e não é sinônimo das quatro pastas do backend.
  A interface React cumpre o papel de apresentação no sistema; nesta API, o Controller REST
  devolve dados como JSON, sem renderizar uma página HTML no servidor.
- 🎮 Controller: HTTP, entrada e resposta. ⚙️ Service: operação e regra de negócio.
  🗄️ Repository: acesso aos dados. 📐 Model: entidade/campos. 🐘 PostgreSQL: armazenamento.
- Diferenciar **caminho da requisição** (Controller → Service → Repository) e **ordem de
  construção** (Model → Repository → Service → Controller).
- Explicar interface e os dois tipos de `JpaRepository<Fornecedor, Long>` na primeira ocorrência;
  não pressupor que o Cap 11 ensinou interfaces. Spring fornece a implementação do repository.
- Explicar que Spring cria/gerencia componentes e fornece suas dependências. Mostrar primeiro
  o construtor explícito e depois `@RequiredArgsConstructor` com campos `private final`.
  Lombok gera o construtor; Spring fornece a dependência. Aplicar no Service e no Controller,
  sem `@Autowired` em campo e sem interface + implementação de Service.
- Jogo: arrastar uma responsabilidade para a camada e prever o efeito da camada errada.

### 10. Fornecedor: um CRUD completo, operação por operação

**Campos propostos:** `Long id`, `String nome`, `String cnpj`, `String categoria`,
`String telefone`. São os campos do GestorPRO atual em `tooling/gestorpro-referencia/db.json`;
não importar automaticamente os campos/endereço do projeto antigo `backend-fullstack`.
Categoria permanece texto, sem enum nem entidade relacionada.

Arquivos: `model/Fornecedor.java`, `repository/FornecedorRepository.java`,
`service/FornecedorService.java` e `controller/FornecedorController.java`, todos sob o
pacote da classe principal. Sem DTO, Mapper, ServiceImpl ou relacionamentos nesta entidade.

| Ordem | Operação | O que entra agora | Evidência |
|---|---|---|---|
| 1 | `POST /fornecedores` | Model com construtor sem argumentos, getters/setters, `@Entity`, `@Table`, `@Id`, `@GeneratedValue`, `@Column`; Repository; Service; Controller e `@RequestBody` | `201`, JSON com ID e linha visível via SQL |
| 2 | `GET /fornecedores` | `findAll`, retorno `List<Fornecedor>` e `@GetMapping` | `200` com lista; sem registros, `[]` |
| 3 | `GET /fornecedores/{id}` | `@PathVariable`, `findById` e ausência | `200` existente; `404` inexistente |
| 4 | `PUT /fornecedores/{id}` | Buscar existente, atualizar os campos e salvar; ID vem da URL | `200` com alteração na mesma linha; `404` ausente |
| 5 | `DELETE /fornecedores/{id}` | Buscar existente e remover | `204`, GET posterior `404` e ausência no SQL |

Cada linha é um ciclo completo: intenção → teoria curta → código incremental por arquivo →
requisição real → inspeção no banco → pequena prática. Criar o esqueleto para POST e depois
revisitar apenas os arquivos que mudam; não escrever todo o Service antes do primeiro endpoint.

- Usar Insomnia como cliente HTTP proposto; incluir preparação curta antes do primeiro POST.
  Navegador basta para GET, não para ensinar envio de todos os verbos e corpos JSON.
- Retomar método, URL, corpo, `Content-Type: application/json`, resposta e status, já ligados
  ao frontend. Explicar `ResponseEntity` somente se necessário para a forma de retorno escolhida.
- Uma regra mínima do Service: nome vazio é recusado. Explicar `400` com consequência no banco.
  Não introduzir agora validação completa de CNPJ, unicidade ou Bean Validation.
- Para ID inexistente, introduzir `Optional` como resultado presente/ausente de `findById` e
  um `if` explícito. Explicar uma exceção HTTP simples, como `ResponseStatusException`, quando
  o 404 for necessário; sem lambdas, exceções customizadas ou handler global nesta primeira volta.
- POST deve gerar um novo ID, mesmo que o cliente tente enviar um ID no corpo. PUT procura o
  registro da URL e copia os campos editáveis; não usar `save` cegamente como upsert.
- Depois do POST, reiniciar a aplicação e repetir GET. Contrastar com a lista em memória do
  Cap 11. Depois, parar/iniciar o container com o volume preservado e repetir a observação.
- JSON nesta fase espelha a entidade. Essa escolha torna o fluxo visível, mas acopla contrato
  HTTP e persistência; será a motivação concreta para DTO na próxima entidade.

### 11. Fechamento e ponte para a próxima entidade

- Desafio individual na mesma entidade: executar e comprovar o ciclo completo com outro
  fornecedor, incluindo nome vazio e ID inexistente. Não exigir uma segunda entidade aqui.
- Quiz final: distinguir ferramenta/serviço, prever SQL afetado, ordenar requisição e explicar
  persistência. Erros têm feedback com causa e consequência, seguidos de nova tentativa.
- Caderno: registrar diagrama próprio, conexão local, uma requisição com resposta e um erro
  que o aluno diagnosticou. Preservar a abordagem de anotações livres do Cap 11.
- Próxima entidade proposta: **Produto**. Começar pela necessidade de separar os dados recebidos
  e devolvidos dos dados persistidos; introduzir DTO antes de acrescentar outras abstrações.
  Planejar Mapper, validação e relacionamentos no momento de sua necessidade,
  sem colocar tudo na primeira página do próximo capítulo.
- Integração React, CORS, autenticação/JWT, deploy, paginação, Dockerfile e Compose ficam fora
  do núcleo deste capítulo. O fechamento mostra onde a API substituirá o json-server.

## Experiências visuais e padrão de implementação futura

| Fundamento | Experiência proposta | Decisão/prática |
|---|---|---|
| Framework organiza infraestrutura | Uma requisição chega e aciona um método nosso | Quem implementa a regra do cadastro? |
| Imagem/container/volume | Criar, parar e recriar; registro visível no volume | Qual ação interrompe serviço e qual elimina dados? |
| SQL seleciona e modifica linhas | Tabela mostra antes/depois e filtro do WHERE | Quais linhas serão alteradas? |
| Camadas dividem responsabilidades | POST atravessa camadas, gera SQL e retorna JSON | Onde corrigir uma regra de cadastro? |

Cada experiência segue fundamentação → simulação → decisão, com o mesmo vocabulário e caso.
Não substituir a prática real por um terminal simulado. Simulações devem se identificar como
simulações e mostrar também falhas relevantes, sem fabricar logs como se fossem execução real.

Na implementação, preservar shared/design system, sidebar, progresso, conectores entre seções,
soluções no olhinho, PT-BR, ligaduras desativadas e caracteres HTML escapados nos códigos.
Teatros/modais futuros devem aplicar as skills correspondentes, ter avanço manual, pausa,
reinício, teclado, legendas e movimento reduzido. Se houver voz, áudio local integrado ao som
geral; o planejamento não implica autorização para gerar mídia paga.

Pasta futura sugerida: `capitulos/12-spring-primeira-api/`. Só marcar o capítulo disponível no
hub quando houver conteúdo implementado e verificado.

## Critérios de validação antes de disponibilizar

1. Gerar projeto novo pelo Initializr e registrar Boot/dependências exatas; compilar com JDK 21.
2. Reproduzir receita Docker em ambiente limpo e validar porta, usuário, banco e volume.
3. Executar o roteiro SQL na ordem publicada, inclusive em nova tentativa sem supor IDs fixos.
4. Construir cada checkpoint Java a partir do anterior; não depender de código ainda não ensinado.
5. Testar cinco endpoints, lista vazia, ID ausente, nome vazio, POST com ID enviado e PUT sem
   duplicação; conferir status, JSON e efeito real no PostgreSQL.
6. Reiniciar aplicação/container e confirmar persistência com o mesmo volume.
7. Revisar vocabulário como iniciante; testar interações certas/erradas, teclado, tela estreita,
   modo mudo e navegação repetida. Conteúdo textual e simulações locais devem funcionar offline;
   downloads, instalação e acesso ao Initializr precisam de internet.

## Referências oficiais consultadas para o planejamento

- [Spring Initializr](https://start.spring.io/) — geração do projeto.
- [Requisitos do Spring Boot](https://docs.spring.io/spring-boot/system-requirements.html) —
  compatibilidade de Java; a documentação consultada inclui Java 21 na faixa suportada.
- [Docker Desktop no Windows](https://docs.docker.com/desktop/setup/install/windows-install/)
  e [no macOS](https://docs.docker.com/desktop/setup/install/mac-install/) — instalação.
- [O que é container](https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-a-container/)
  e [imagem oficial PostgreSQL](https://hub.docker.com/_/postgres) — execução e volumes.
- [Tutorial SQL do PostgreSQL](https://www.postgresql.org/docs/current/tutorial-sql.html).
- [SDKs no IntelliJ](https://www.jetbrains.com/help/idea/sdk.html) — Project Structure/JDK.
- [Acesso a dados com JPA](https://spring.io/guides/gs/accessing-data-jpa/),
  [injeção por construtor](https://docs.spring.io/spring-framework/reference/core/beans/dependencies/factory-collaborators.html)
  e [corpo de resposta REST](https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-controller/ann-methods/responsebody.html).

## Primeira implementação local — 2026-09-18

- Página em `capitulos/12-spring-primeira-api/`, com 18 seções na ordem planejada. Card no hub
  e link ao fim do Cap 11. Não houve publicação, commit ou push nesta etapa.
- Java 21 + Spring Boot 4.1.1, versão confirmada nos metadados do Initializr. O ZIP inicial
  foi baixado do serviço oficial. Spring Web gera starter-webmvc nessa versão.
- Fornecedor mantém `id`, `nome`, `cnpj`, `categoria` e `telefone`, conforme o GestorPRO.
  Após revisão com o professor, Lombok gera getters/setters e o construtor sem argumentos da
  entidade; Service e Controller usam injeção por construtor, campos final e
  `@RequiredArgsConstructor`. Sem DTO/Mapper.
- Cinco operações completas e cumulativas. Cada etapa mostra os arquivos modificados inteiros,
  com imports, instrução para substituir o conteúdo e status/efeito esperado. Código HTML,
  checkpoints de apoio e ZIP final são conferidos entre si pelo validador.
- Três simulações locais com estados revisitáveis: imagem/container/volume (7 estados), SQL
  com e sem WHERE, requisição por camadas (cadastro válido, nome vazio e ID inexistente).
  Avanço manual; sem temporizadores de reprodução, narração ou chamadas a serviços externos.
- Sete quizzes permitem errar e tentar de novo; exercícios individuais com dica, PARE e
  solução em details/summary acessível. Prática real no psql, IntelliJ e Insomnia.
- Caderno livre com texto e desenho usando `caderno:cap12`, separado do Cap 11. O botão do
  caderno fica fora do conteúdo em telas estreitas para evitar sobreposição.
- ZIP inicial, ZIP completo, SQL e cinco checkpoints em `apoio/`, com README de manutenção.

### Verificação executada

`python3 tooling/validate-cap12.py --integration`:

- links/IDs locais e equivalência HTML ↔ checkpoints ↔ ZIP;
- compilação de cada um dos cinco checkpoints com Java 21;
- roteiro SQL no PostgreSQL 17 e teste de inicialização Spring gerado pelo Initializr;
- cinco endpoints reais, lista vazia, nome vazio/espaços/null, ID ausente/inválido, POST que
  ignora ID enviado, PUT que preserva a identidade e não cria outro registro, DELETE 204;
- efeito observado com SQL, persistência após reiniciar a API, parar/iniciar o container e
  recriar o container com o mesmo volume; recursos temporários removidos ao concluir.

`tooling/validate-cap12-browser.mjs`:

- Chrome, desktop 1440 px e celular 390 px;
- três simulações, voltar/reiniciar/trocar caso, tabela vazia e execução repetida;
- quizzes após erro/acerto, cópia de código, soluções recolhidas, menu com teclado/foco/Escape;
- movimento reduzido, código com ligaduras desligadas e caderno persistindo após recarregar;
- sem erros JavaScript nos cenários testados. Capturas inspecionadas visualmente.

Os tutoriais de instalação foram conferidos com documentação oficial; não foi realizada uma
instalação nova de Docker Desktop em Windows/Linux. A execução Docker e Java foi validada no
macOS, em containers e pastas temporárias independentes do projeto do aluno.

### Revisão aprovada — Lombok e injeção por construtor

- O professor preferiu ensinar o padrão por construtor já no Cap 12. A explicação retoma
  construtor/this do Cap 11, mostra a versão explícita e depois sua equivalência com Lombok.
- Explicar `final` como referência atribuída uma vez, sem prometer imutabilidade do objeto.
  Não somar o construtor explícito e a anotação quando gerariam a mesma assinatura.
- Entidade: `@Getter`, `@Setter`, `@NoArgsConstructor`; não usar `@Data` como atalho geral.
  Mostrar os métodos equivalentes e manter a regra de nome no Service.
- Initializr agora inclui Lombok. Ambos os ZIPs receberam o POM gerado pelo serviço oficial,
  incluindo o processador de anotações no Maven. Acrescentado diagnóstico de suporte ao
  Lombok e annotation processing no IntelliJ. Os cinco checkpoints seguem o mesmo padrão.
- Revalidação após a mudança: cinco checkpoints compilados em Java 21 com Lombok;
  integração com PostgreSQL e cenários de persistência aprovados. A revisão no navegador
  confirmou novamente as três simulações, sete quizzes, teclado, caderno e tela de 390 px.
