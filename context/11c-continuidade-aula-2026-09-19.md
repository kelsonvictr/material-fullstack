# Cap 11 — Continuidade da aula de Java em 19/09/2026

Planejamento elaborado em 18/09/2026 a partir da transcrição integral fornecida pelo professor
(00:00:02–03:48:13), do capítulo 11 e de suas atividades e oficinas. Duração assumida para
amanhã: quatro horas, incluindo intervalo. Os tempos abaixo são relativos ao início da aula.

## Decisão pedagógica

Concluir o Java básico com um cadastro em memória antes de começar a construção da API.
A entrega é `Main`, `Produto` e `ProdutoService` trabalhando juntos, com o aluno capaz de
prever e explicar os resultados. Spring pode aparecer como uma ponte curta ao final, se os
checkpoints forem atingidos.

A transcrição registra explicação e prática acompanhada; ela não permite afirmar que todos
dominaram os conceitos ou cumpriram o estudo dos quinze dias. Começar por uma tarefa curta
que mostre o estado real da turma.

Regra central da continuação:

> Produto cuida do estado de um item. A lista reúne referências a produtos. ProdutoService
> organiza as operações do cadastro. Main chama essas operações e mostra seus resultados.

## Até onde a aula efetivamente chegou

| Tempo na gravação | Evidência | Implicação para amanhã |
|---|---|---|
| 00:50:19–00:58:41 | Escolha alterada para Maven; JDK 21; projeto com código de exemplo e `pom.xml` | Reabrir o projeto existente. Maven e POM foram usados, mas sua explicação ficou prometida |
| 01:06–01:24 | Limpeza do Main, prints, compilação/execução e crachá no console | Não repetir instalação, introdução longa ou viagem completa do código |
| 01:25–01:54 | Tipos, boolean, concatenação, if, for, alerta de reposição e etiquetas | Recuperar if e repetição quando necessários, sem supor fluência |
| 02:03:43 | Atividade ainda incompleta para alguns fica para casa | Não contabilizar a prática de for como concluída por todos |
| 02:04–02:29 | Fábrica de objetos: classe, new, construtor, referência, private/public, getters/setters | Houve exposição visual; isso não prova implementação das validações |
| 02:30–03:04 | `Produto` em `org.example`; campos `Long id`, `String nome`, `double preco`, `int estoque`; getters/setters e construtor gerados | Este é o ponto de partida prático, diferente do código atual do HTML |
| 02:58:30–03:00:45 | Sugestão de apresentação de duas duplas e promessa de aprofundar construtor com todos os argumentos | Aproveitar apenas se as duplas tiverem sido combinadas; retomar argumentos no exemplo inicial |
| 03:06–03:15 | Central de encomendas: argumento, parâmetro, this, void, return e println | Retomar com código executado, principalmente o que entra e o que volta |
| 03:16:27 | Exercício da animação explicitamente dispensado em favor da condução do professor | Não tratar essa atividade como realizada |
| 03:17–03:30 | `new Produto(1L, "Fone Logitech", 300.0, 30)` e criação de outros produtos | Os alunos trabalharam com quatro argumentos e ids manuais |
| 03:31–03:40 | Impressão do objeto, getNome, setNome para Fone JBL e nova impressão | Ponto exato de retomada. Surgiu a dúvida se o setter criava outro objeto |
| 03:41–03:45 | Regras do backend, memória temporária e futura persistência | Usar a perda dos cadastros ao reiniciar como motivação para o Cap 12 |
| 03:45:45–03:46:18 | Promessa de lista resolvida após definir o ponto de parada | Há 12 atividades no material atual; não há evidência aqui de entrega de uma lista adicional |

**Não há evidência de construção em aula** de `ProdutoService`, `List<Produto>`, `ArrayList`,
busca por id, tratamento de `null`, remoção, contador automático de ids ou `toString` próprio.
O Service foi apresentado conceitualmente no início. A validação de preço foi mostrada na
simulação; os setters gerados na IDE não ganham essa validação automaticamente.

## Compatibilizar a aula real com o material

| Aspecto | Aula gravada | HTML atual | Decisão proposta |
|---|---|---|---|
| Projeto | Nome sugerido: aula Java básico; Maven | gestorpro-java; build IntelliJ | Continuar no projeto de cada aluno |
| Pacote/pasta | `org.example`; estrutura Maven | `br.com.gestorpro`; exemplos em `src/br/...` | Manter pacote existente e classes em `src/main/java/org/example/` quando esse for o projeto do aluno |
| Construtor | id, nome, preço, estoque | nome, preço, estoque | Começar com quatro argumentos; migrar explicitamente ao introduzir o id do Service |
| Métodos | Getters/setters gerados | Setters com validação e toString | Implementar e observar a mudança antes de usar os exercícios correspondentes |
| Id | Definido no Main | Atribuído pelo Service | Explicar quem passa a ser responsável por gerar o id |

Não colar o arquivo completo do HTML sobre o projeto do aluno sem explicar essas diferenças.
Os exercícios 5–8 e as oficinas usam três argumentos: antes da migração, acrescentar o id
nas chamadas feitas na IDE. Depois da migração, os exercícios seguintes passam a coincidir
com o material, exceto por pacote e caminho.

## Roteiro de quatro horas

| Minutos | Bloco | Resultado observável |
|---|---|---|
| 00–20 | Reabrir projeto e desafio de retomada | Criar, ler e alterar um objeto sem copiar a solução |
| 20–45 | Dois objetos, referência compartilhada e toString | Prever quem muda; imprimir uma descrição legível |
| 45–70 | Private e validação de preço/estoque | Negativo recusado, valor anterior preservado, zero aceito |
| 70–105 | Lista de produtos e for-each no Main | Adicionar dois produtos e percorrer os dois |
| 105–115 | Intervalo | Projeto salvo |
| 115–170 | Extrair ProdutoService; cadastrar/listar; responsabilidade pelo id | Cadastro atribui ids 1 e 2; Main chama o Service |
| 170–210 | Buscar, alterar e remover | Busca existente/ausente, atualização e remoção demonstradas |
| 210–230 | Desafio individual e correção | Evidência de autonomia com dados novos |
| 230–240 | Fechamento e ponte condicional para Spring | Explicar memória, persistência e próxima entrega |

### 00–20 — Abrir exatamente de onde pararam

Fala sugerida:

> Na última aula, a gente criou um fone e mudou o nome dele de Logitech para JBL.
> Hoje vamos transformar esses produtos soltos em um cadastro: cadastrar, procurar,
> alterar e remover. Primeiro, vamos ver o que ficou daquela criação.

Nos cinco primeiros minutos, reabrir o projeto e executar o Main. Explicar Maven e `pom.xml`
em cerca de dois minutos: ferramenta de construção e dependências; arquivo que descreve
o projeto e suas configurações. Aprofundar dependências quando entrarem no Spring.

Desafio de retomada, mantendo o construtor da aula anterior:

1. Criar um produto com id 10L, nome Teclado, preço 120.0 e estoque 2.
2. Imprimir seu nome com getter.
3. Alterar o nome para Teclado USB com setter.
4. Imprimir novamente e explicar quantos objetos Produto foram criados.

Dar cerca de sete minutos para a tentativa e usar o restante para diagnóstico/correção.
Pedir explicações também a alunos remotos. Se duas duplas prepararam apresentação,
usar duas demonstrações de até três minutos dentro desse bloco; não somar uma abertura longa.

Perguntas: onde está a classe? Onde acontece o new? Quais valores são argumentos?
O setter criou outro objeto? Quem efetivamente imprimiu?

### 20–45 — Resolver a dúvida que ficou aberta

Primeiro, criar dois produtos com `new`, alterar apenas um e prever o outro.
Depois acrescentar `Produto apelido = fone;`: uma variável nova, mesmo objeto.

Exemplo para escrever DENTRO do main, substituindo o trecho anterior:

```java
Produto fone = new Produto(1L, "Fone Logitech", 300.0, 30);
Produto outro = new Produto(2L, "Fone Logitech", 300.0, 30);
Produto apelido = fone;
apelido.setNome("Fone JBL");
System.out.println(fone.getNome());
System.out.println(outro.getNome());
```

Previsão: dois objetos Produto; saídas Fone JBL e Fone Logitech.
Usar a oficina **O crachá e o morador**, somente até a referência compartilhada se o
ritmo exigir. A reatribuição de apelido pode ficar como ampliação para casa.

Retomar `System.out.println(fone)` e gerar `toString` no IntelliJ. Explicar que ele
devolve uma representação textual e que println a exibe. `@Override` indica que estamos
substituindo a implementação herdada desse método; não abrir uma aula de herança.

Corrigir a interpretação da impressão padrão: `Produto@...` não deve ser lido como endereço
físico da RAM. O formato padrão combina nome da classe e hash em hexadecimal.
Fonte: [Object.toString — Java 21](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Object.html#toString()).

### 45–70 — Dar uma função concreta ao encapsulamento

Pergunta disparadora: “O atributo está private. Isso sozinho impede preço negativo?”

1. Em um objeto com preço 80.0, testar o setter gerado com -10.0: ele aceita se só atribuir.
2. Inserir a regra no `setPreco`: se negativo, mostrar mensagem e executar `return;`
   antes da atribuição.
3. Recriar o objeto com preço 80.0 e testar de novo: tentativa negativa mantém 80.0;
   tentativa com 90.0 altera para 90.0.
4. Aluno adapta a regra ao estoque: -1 recusado, 0 aceito.
5. Manter o construtor com atribuições diretas: `this.preco = preco` e
   `this.estoque = estoque`, como ensinado na aula anterior. A validação entra apenas
   nas alterações feitas pelos setters, sem misturar os dois passos nesta introdução.

Usar as atividades **7 — Um preço recusado e um aceito** e **8 — Zero também é um estoque
válido**, adaptando as chamadas para quatro argumentos neste momento.

Limite explícito do modelo: o construtor atribui diretamente os valores recebidos e não
valida preço ou estoque. Os cadastros desta aula começam com dados válidos; a regra dos
setters é demonstrada ao alterar um objeto existente. Validação também na criação fica
para uma evolução posterior. Simplificação solicitada pelo professor em 18/09/2026.

`void` significa não devolver valor. Pode existir `return;` para encerrar o método cedo.
Essa distinção é necessária porque a fala anterior associou void à ausência da palavra return.
Fonte: [JLS 21, return](https://docs.oracle.com/javase/specs/jls/se21/html/jls-14.html#jls-14.17).

### 70–105 — Criar a necessidade da lista antes do Service

Gancho: “Três variáveis funcionaram. Como vamos listar cem produtos sem escrever cem prints?”

Adicionar no Main uma `List<Produto>` criada com `new ArrayList<>()`; usar os imports de
`java.util`. Explicar `List<Produto>` como o tipo da coleção, cujos elementos são Produto,
e ArrayList como a implementação escolhida. Basta essa distinção agora.

Adicionar as referências a dois produtos já criados com `add`, observar `size` e percorrer
com `for (Produto produto : produtos)`. Ler em voz alta: “para cada produto da lista”.
Cada iteração dá acesso ao próximo item; não nasce uma cópia do Produto.

Prática: inserir um terceiro produto e listar id, nome e estoque. Se houver dúvida sobre
repetição, traçar manualmente duas iterações, sem repetir toda a aula de sintaxe do for.

Checkpoint antes do intervalo: a turma consegue identificar objeto, lista e item atual do laço.

### 115–170 — ProdutoService como organização do código que já funciona

Problema: Main já está cuidando de criação, coleção e apresentação. Mover a organização
do cadastro para `ProdutoService`, no mesmo pacote. O Service é uma classe Java comum.

Construir em incrementos executáveis:

1. Criar a classe e mover a lista para um campo privado. Se usar `final` como no HTML,
   explicar: impede trocar a referência da lista; ainda podemos adicionar/remover itens.
2. Criar `cadastrar(Produto produto)` com add e retorno do produto. Chamar no Main e executar.
3. Criar `listar()`, devolver a lista e percorrer no Main. Executar novamente.
4. Introduzir o problema do id manual repetido. O Service assumirá a sequência de ids.
5. **Migração explícita:** remover o parâmetro id do construtor de Produto e sua atribuição;
   manter campo/getter/setter; corrigir todas as chamadas para três argumentos. O id começa
   null até o cadastro. Não criar uma sobrecarga adicional nesta passagem.
6. Adicionar `long proximoId = 1` ao Service e atribuir o id antes do add. Primeiro mostrar
   `produto.setId(proximoId); proximoId++;` em duas instruções. Só depois relacionar com
   `produto.setId(proximoId++);` usado no HTML.
7. Cadastrar dois produtos e mostrar ids 1 e 2. Cada objeto novo deve ser cadastrado uma vez.

Trabalhar com um único `ProdutoService` no Main. Um segundo `new ProdutoService()` teria
outra lista e outro contador; ele não consulta os cadastros do primeiro.

Conectar `new ProdutoService()` à dúvida sobre construtores: nesta classe simples, sem
construtor declarado, Java fornece o construtor padrão sem argumentos. Ao declarar um
construtor, esse padrão deixa de ser fornecido automaticamente.
Fonte: [JLS 21, construtor padrão](https://docs.oracle.com/javase/specs/jls/se21/html/jls-8.html#jls-8.8.9).

Limites do exercício: listar devolve a própria lista e cadastrar ainda não bloqueia recadastro
do mesmo objeto. Não apresentar isso como API pronta para produção. Não abrir defensividade
de coleções, concorrência ou validação completa nesta primeira experiência.

### 170–210 — Busca, alteração e remoção, uma operação por vez

1. **Buscar:** escrever `buscarPorId(Long id)` com for-each e `getId().equals(id)`.
   Para estes ids Long, equals compara os valores. Testar id 2L antes de escrever remoção.
2. **Ausência:** retornar null depois de percorrer sem encontrar. Testar 99L e guardar o
   resultado antes de verificar `!= null`. Só então chamar getters/setters.
3. **Alterar:** buscar 2L, chamar `setNome` e listar outra vez. A busca devolveu referência
   ao mesmo objeto da lista; não precisa adicionar novamente para aplicar a mudança.
4. **Remover:** usar buscarPorId; se null, devolver false; senão remover da lista e devolver
   o resultado. Testar o mesmo id duas vezes: true e depois false.

Reaproveitar a oficina **O depósito de referências** e a atividade **9 — Cadastrar,
encontrar e remover**. Mostrar a alteração pelo objeto encontrado entre busca e remoção,
pois ela completa o U do CRUD mesmo sem criar ainda um método chamado atualizar.

Limite: retirar uma referência da lista não destrói imediatamente o objeto. Se Main ainda
possui uma referência, pode acessá-lo. Também não houve exclusão em banco nesta aula.

### 210–230 — Evidência individual

Usar a atividade **10 — O produto que não existe**, com uma extensão curta de atualização:

- Cadastrar Pasta (12.0, 3) e Régua (4.0, 5), em um Service novo.
- Buscar 2L e alterar apenas o nome para Régua escolar. Listar para comprovar.
- Buscar 99L e mostrar Produto não encontrado sem chamar getter em null.
- Remover 1L duas vezes, prever e observar true/false.
- Listar e comprovar que restou somente Régua escolar.

Primeiros oito minutos sem abrir a solução; depois oferecer dica antes do olhinho.
Quem termina explica por que alterar a referência encontrada muda o item da lista.
Quem precisa de apoio recebe o esqueleto do Main com lacunas, mantendo a mesma tarefa.

As atividades **11 — Quantos produtos ainda têm estoque?** e **12 — Recebemos uma reposição!**
ficam como tarefa e ampliação para quem termina cedo, não como obrigação adicional da manhã.

### 230–240 — Encerramento e decisão sobre Spring

Checkpoint de saída: sem copiar o professor, aluno consegue criar/cadastrar, buscar,
tratar ausência e explicar uma alteração/remoção. Como regra prática de ritmo, se cerca
de 80% resolverem o núcleo, usar até dez minutos para a ponte; não é uma medida formal
de domínio. Os demais recebem retomada dirigida.

Ponte: reiniciar a execução e explicar que a lista é recriada. Se o Main cadastrar os mesmos
dados outra vez, eles reaparecem por causa das instruções, não porque foram persistidos.

> Hoje o Main fez os pedidos e a lista guardou os produtos durante a execução.
> Na próxima etapa, vamos receber pedidos HTTP e guardar os registros em PostgreSQL.

Mostrar o fluxo Controller → Service → Repository → PostgreSQL; Model representa os dados.
Se houver tempo, abrir somente a introdução conceitual do Cap 12. O plano desse capítulo já
prevê dois encontros próprios para ambiente/dados e API. Não encaixar instalação de Docker,
SQL e CRUD Spring nos minutos finais.

O Cap 12 usa **Fornecedor** (`id`, `nome`, `cnpj`, `categoria`, `telefone`). Explicar que
vamos transferir o padrão aprendido, mudando o caso; não se trata de renomear automaticamente
o Produto da aula. Lombok gera código e Spring entrega dependências — essa distinção entra
quando essas ferramentas forem apresentadas.

## Se o ritmo for mais lento

- Se a retomada consumir mais de 30 minutos, encurtar toString e usar só as etapas necessárias
  da oficina de referências. Preservar o tempo de prática.
- Se lista/for-each ainda estiverem frágeis no intervalo, concluir cadastrar/listar/buscar e
  ausência. Remoção e desafio completo passam para a retomada seguinte; ponte Spring fica adiada.
- Se a turma avançar rápido, usar repor como operação do Service com validação e retorno boolean.
  Isso aprofunda o mesmo modelo antes de aumentar o número de tecnologias.
- Preservar analogias, perguntas e exemplos de estoque. As explicações novas entram em blocos
  curtos, sempre seguidos de previsão e execução. Evitar reproduzir e narrar integralmente
  todas as animações já vistas.

## Ajustes de precisão para distribuir pela aula

São pequenos refinamentos de linguagem, motivados pelo próximo exemplo; não uma abertura
com uma lista de correções. A transcrição tem erros de reconhecimento, então não tratar
cada expressão transcrita como citação literal do professor.

| Ideia que pode ter ficado | Formulação para a continuação |
|---|---|
| this altera os privados lá de cima | this identifica o objeto atual; a atribuição é que altera seu campo |
| Getter mostra no console | Getter devolve um valor; println imprime |
| Setter sempre valida | O setter gerado apenas atribui. A regra precisa ser escrita |
| Void não pode ter return | Void não devolve valor; return sem valor pode encerrar a execução |
| Java só executa o que está no Main | Neste programa, main é o ponto de entrada e chama código de outros métodos |
| Produto@... é localização física | É uma representação textual padrão, não uma localização física para inspecionar |
| Toda classe exige escrever construtor | Classe comum sem construtor declarado pode receber o padrão sem argumentos |
| Declarar tipo significa forte versus fraco | A distinção tratada naquele exemplo é tipagem estática versus dinâmica; Python é dinamicamente tipado |
| Letra maiúscula em classe é exigência da linguagem | É convenção de nomenclatura que adotaremos; a grafia do nome declarado precisa ser respeitada |
| Backend só processa; servidor ligado garante dados | A aplicação pode persistir dados por meio do banco; memória e persistência têm durações diferentes |

Sobre tipagem, manter o foco em Java 21 e não reabrir uma comparação longa entre linguagens.
Referência: [Tutorial oficial do Python — tipagem dinâmica](https://docs.python.org/3/tutorial/appetite.html).

## Preparação do professor e continuidade

Antes da aula, preparar um projeto de recuperação com Maven/JDK 21 e o Produto de quatro
argumentos, equivalente ao fim da gravação. Preparar também uma versão de conferência
com três argumentos e Service, sem entregá-la como ponto inicial. Esses projetos são uma
ação proposta pelo planejamento; este documento não os cria.

Na projeção, deixar acessíveis o trecho de OO, Crachás, atividades 7–10 e o depósito de
referências. Usar som só na máquina do professor no presencial. A modalidade remota precisa
de uma checagem de saída/explicação em cada bloco, além da pergunta coletiva sobre dúvidas.

Ao final, pedir exportação do caderno e três anotações curtas: criar versus alterar;
objeto versus lista; retornar versus imprimir. A tarefa é refazer o cadastro e tentar
contarComEstoque/repor, com solução consultada somente depois da primeira tentativa.

Arquivos de referência: `capitulos/11-java-oo-basico/index.html`, `pratica-fluxo.js`,
`visual-lab-scenes.js`, `visual-lab-extra.js`, `context/11-plano-cap-11-java.md` e
`context/12-plano-cap-12-spring.md`. Este registro acrescenta evidência da aula real ao
plano original. Após a discussão do roteiro, o construtor do material local foi simplificado
para atribuições diretas com `this`; exercícios e oficina foram alinhados a essa decisão.


## Apoio rápido para condução

`capitulos/11-java-oo-basico/professor.txt` é a cola rápida: poucas linhas por
ponto, ação e resultado esperado. Resoluções completas e explicações ficam em
`professor-resolucoes.txt`, na mesma pasta, com os mesmos pontos [01]–[26].
Os marcadores do capítulo incluem as atividades. Não há links públicos para
os TXTs. Ao alterar pontos ou exercícios, manter a numeração do HTML,
de `pratica-fluxo.js` e dos dois roteiros sincronizada.
