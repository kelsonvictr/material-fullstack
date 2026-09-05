/* Atividades do mesmo projeto: enunciado aberto, dica e solução recolhidas. */
(() => {
  'use strict';
  const blocks = [
    { target: '#java .anatomy-legend', after: true, title: 'Parada 1 · Eu escrevo, o Java executa',
      theory: 'O main é o ponto de entrada deste programa. println mostra uma linha no console. Primeiro vamos usar essa estrutura; não é preciso decorar todas as palavras hoje.',
      exercises: [
        { title: 'Uma mensagem que é sua', guided: true, minutes: 7,
          where: 'Main.java · substitua o arquivo pelo modelo da solução durante a construção com o professor.',
          task: ['Com o professor, crie Main no pacote br.com.gestorpro e escreva a estrutura do main apresentada acima.', 'Dentro do main, mostre duas linhas: “Meu primeiro programa Java” e “Programa AI”. Antes de rodar, preveja a ordem.', 'Execute pelo ▶ do IntelliJ. Tire apenas o ; da primeira instrução, observe o aviso e recoloque-o.'],
          hint: 'Cada println é uma instrução. A primeira mensagem deve vir antes da segunda no código.',
          code: 'package br.com.gestorpro;\n\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("Meu primeiro programa Java");\n        System.out.println("Programa AI");\n    }\n}',
          full: true, output: 'Meu primeiro programa Java\nPrograma AI',
          why: 'O programa executa as instruções na ordem. As aspas fazem parte da escrita do texto, mas não da saída.',
          check: 'Aponte o par de chaves do main e o da classe. Qual aviso apareceu quando faltou o ponto e vírgula?' },
        { title: 'Seu crachá no console', minutes: 6,
          where: 'Main.java · mantenha package, classe e main; substitua apenas as instruções dentro do main.',
          task: ['Sem copiar a solução, imprima três linhas: “Aluno: Ana”, “Turma: Fullstack” e “Meta: aprender Java”.', 'Depois substitua Ana pelo seu nome e execute outra vez.', 'Anote no caderno qual trecho você mudou e por que as demais linhas continuaram iguais.'],
          hint: 'Você precisa de três chamadas a System.out.println, cada uma com seu texto entre aspas.',
          code: 'System.out.println("Aluno: Ana");\nSystem.out.println("Turma: Fullstack");\nSystem.out.println("Meta: aprender Java");',
          output: 'Aluno: Ana\nTurma: Fullstack\nMeta: aprender Java',
          why: 'A estrutura do programa não muda para cada mensagem. Você alterou os textos, não a regra de escrita.',
          check: 'Feche o olhinho e acrescente sozinho uma quarta linha: “Bora praticar!”.' }
      ] },
    { target: '#java > .card', title: 'Parada 2 · Dados, decisão e repetição',
      theory: 'Uma variável guarda um valor de um tipo. O operador * multiplica números; + soma números ou junta texto quando há uma String. if executa seu bloco quando a condição é verdadeira. No for abaixo, i++ aumenta i em 1 após cada volta.',
      exercises: [
        { title: 'O alerta de reposição', guided: true, minutes: 9,
          where: 'Dentro do main · substitua o conteúdo anterior para não declarar variáveis repetidas.',
          task: ['Declare nome = “Caderno”, preco = 15.0 e estoque = 3, escolhendo String, double e int.', 'Calcule o valor do estoque multiplicando preço por quantidade. Mostre esse valor.', 'Se estoque for menor que 5, mostre “Repor Caderno”. Execute com 3 e depois com 5: a mensagem de reposição deve desaparecer no segundo teste.'],
          hint: 'O limite é “menor que 5”, não “menor ou igual a 5”. Guarde o total em double.',
          code: 'String nome = "Caderno";\ndouble preco = 15.0;\nint estoque = 3;\ndouble total = preco * estoque;\nSystem.out.println("Valor em estoque: " + total);\nif (estoque < 5) {\n    System.out.println("Repor " + nome);\n}',
          output: 'Com estoque 3:\nValor em estoque: 45.0\nRepor Caderno\n\nCom estoque 5:\nValor em estoque: 75.0',
          why: 'Com 5 unidades, 5 < 5 é falso. A condição é verificada antes de entrar no bloco. O cálculo usa os valores atuais das variáveis.',
          check: 'Antes de executar com estoque 0, preveja o total e se haverá alerta.' },
        { title: 'Etiquetas sem copiar e colar', minutes: 10,
          where: 'Dentro do main · faça esta atividade com um main limpo.',
          task: ['Declare int quantidade = 4.', 'Use for para imprimir “Etiqueta 1”, “Etiqueta 2”, “Etiqueta 3” e “Etiqueta 4”. Não escreva quatro println separados.', 'Troque quantidade por 1 e depois por 0. Preveja quantas linhas aparecem em cada caso antes de executar.'],
          hint: 'Comece i em 1; continue enquanto i <= quantidade; aumente i com i++.',
          code: 'int quantidade = 4;\nfor (int i = 1; i <= quantidade; i++) {\n    System.out.println("Etiqueta " + i);\n}',
          output: 'Com quantidade 4:\nEtiqueta 1\nEtiqueta 2\nEtiqueta 3\nEtiqueta 4\n\nCom quantidade 1: apenas Etiqueta 1.\nCom quantidade 0: nenhuma linha.',
          why: 'O limite inclui a última etiqueta. Com zero, 1 <= 0 já é falso na primeira verificação, então o corpo não executa.',
          check: 'Explique por que i < quantidade deixaria de imprimir a etiqueta 4.' }
      ] },
    { target: '#oo > .card', title: 'Parada 3 · O molde vira objetos',
      theory: 'O construtor recebe nome, preço e estoque nessa ordem. new cria uma instância; o getter lê um campo. Para os exercícios seguintes, mantenha Produto.java igual ao modelo acima, com seus métodos e validações.',
      exercises: [
        { title: 'Duas fichas na mesma bancada', guided: true, minutes: 10,
          where: 'Dentro do main · Produto.java já deve existir. Substitua as instruções da atividade anterior.',
          task: ['Crie um Produto “Teclado” com preço 100.0 e estoque 2.', 'Crie outro Produto “Mouse” com preço 50.0 e estoque 6.', 'Mostre nome e estoque de cada um usando getters. Aponte no código os dois objetos e a classe usada como molde.'],
          hint: 'A declaração tem a forma Produto teclado = new Produto(...). O ponto escolhe o objeto que recebe a chamada.',
          code: 'Produto teclado = new Produto("Teclado", 100.0, 2);\nProduto mouse = new Produto("Mouse", 50.0, 6);\nSystem.out.println(teclado.getNome() + ": " + teclado.getEstoque());\nSystem.out.println(mouse.getNome() + ": " + mouse.getEstoque());',
          output: 'Teclado: 2\nMouse: 6',
          why: 'A classe é a mesma, mas cada new recebeu seus próprios valores. O getter não cria outro produto; lê o objeto já existente.',
          check: 'O que mudaria se você trocasse apenas o nome passado ao segundo construtor?' },
        { title: 'Só o monitor recebeu unidades', minutes: 9,
          where: 'Dentro do main · use um trecho novo, mantendo Produto.java.',
          task: ['Crie “Monitor” com preço 800.0 e estoque 1 e “Cabo” com preço 20.0 e estoque 8.', 'Chame setEstoque(4) somente no monitor.', 'Antes de rodar, escreva os dois estoques esperados no caderno. Depois imprima ambos com getters.'],
          hint: 'Use monitor.setEstoque(4). Não crie outro monitor nem altere cabo.',
          code: 'Produto monitor = new Produto("Monitor", 800.0, 1);\nProduto cabo = new Produto("Cabo", 20.0, 8);\nmonitor.setEstoque(4);\nSystem.out.println(monitor.getEstoque());\nSystem.out.println(cabo.getEstoque());',
          output: '4\n8', why: 'O setter foi chamado na referência monitor. O objeto cabo é independente e permaneceu com estoque 8.',
          check: 'Qual linha exata você mudaria para atualizar o cabo em vez do monitor?' }
      ] },
    { target: '#teatro > .card', title: 'Parada 4 · Teste a portaria de verdade',
      theory: 'No nosso Produto, private impede alteração direta de fora da classe. O setter aplica a regra: valor negativo é recusado. São duas proteções diferentes; private sozinho não valida o número.',
      exercises: [
        { title: 'Um preço recusado e um aceito', guided: true, minutes: 8,
          where: 'Dentro do main · use Produto.java do capítulo, sem modificar sua validação.',
          task: ['Crie “Fone” com preço 80.0 e estoque 2.', 'Tente setPreco(-10.0) e imprima getPreco(). Depois tente setPreco(90.0) e imprima outra vez.', 'Com o professor, tente temporariamente fone.preco = 1.0 fora da classe Produto. Observe o erro de acesso e remova essa linha antes de executar novamente.'],
          hint: 'Uma chamada recusada pelo setter não apaga o valor válido que o objeto já tinha.',
          code: 'Produto fone = new Produto("Fone", 80.0, 2);\nfone.setPreco(-10.0);\nSystem.out.println(fone.getPreco());\nfone.setPreco(90.0);\nSystem.out.println(fone.getPreco());',
          output: 'Preço inválido\n80.0\n90.0', why: 'O setter retorna sem atribuir o número negativo. Já a tentativa de acesso direto nem compila por causa de private.',
          check: 'Diga qual erro acontece antes de executar e qual tentativa é tratada enquanto o programa roda.' },
        { title: 'Zero também é um estoque válido', minutes: 8,
          where: 'Dentro do main · mantenha a mesma classe Produto.',
          task: ['Crie “Caneta” com preço 2.0 e estoque 6.', 'Tente alterar o estoque para -1 e leia o estoque. Depois altere para 0 e leia de novo.', 'Não mude o setter para fazer o teste passar: compare o comportamento com a regra “estoque não pode ser negativo”.'],
          hint: 'Zero não é negativo. Compare estoque < 0 com estoque <= 0.',
          code: 'Produto caneta = new Produto("Caneta", 2.0, 6);\ncaneta.setEstoque(-1);\nSystem.out.println(caneta.getEstoque());\ncaneta.setEstoque(0);\nSystem.out.println(caneta.getEstoque());',
          output: 'Estoque inválido\n6\n0', why: 'A primeira tentativa é recusada e mantém 6. A segunda representa um produto esgotado: zero é permitido.',
          check: 'Se o preço inicial fosse negativo no construtor, ele não manteria 80.0: o campo começa em 0.0. Explique por que esse caso é diferente do exercício guiado.' }
      ] },
    { target: '#service > .card', title: 'Parada 5 · Quem organiza o cadastro?',
      theory: 'Produto guarda o estado de um item. ProdutoService organiza uma lista de produtos. Cada new ProdutoService() começa uma lista vazia e um contador em 1. buscarPorId devolve Produto ou null; remover devolve true ou false.',
      exercises: [
        { title: 'Cadastrar, encontrar e remover', guided: true, minutes: 10,
          where: 'Dentro do main · Produto.java e ProdutoService.java devem estar prontos conforme o capítulo. Use um Service novo para reproduzir estes ids.',
          task: ['Crie o Service e cadastre “Livro” (30.0, 2) e “Lápis” (3.0, 10), nessa ordem.', 'Busque 2L, confira se o resultado não é null e mostre seu nome. O L indica um número long, usado pelo id.', 'Remova 1L e liste os nomes restantes usando for-each: ele entrega um Produto da lista a cada volta.'],
          hint: 'Cadastre usando service.cadastrar(new Produto(...)). Para percorrer: for (Produto produto : service.listar()).',
          code: 'ProdutoService service = new ProdutoService();\nservice.cadastrar(new Produto("Livro", 30.0, 2));\nservice.cadastrar(new Produto("Lápis", 3.0, 10));\nProduto encontrado = service.buscarPorId(2L);\nif (encontrado != null) {\n    System.out.println(encontrado.getNome());\n}\nSystem.out.println(service.remover(1L));\nfor (Produto produto : service.listar()) {\n    System.out.println(produto.getNome());\n}',
          output: 'Lápis\ntrue\nLápis', why: 'Os ids vieram da ordem de cadastro. O Service remove o item 1; a lista devolvida agora contém apenas o item 2.',
          check: 'Preveja o retorno de remover(1L) se você chamar de novo.' },
        { title: 'O produto que não existe', minutes: 10,
          where: 'Dentro do main · comece com um Service novo e dois cadastros, como no guiado.',
          task: ['Cadastre “Pasta” (12.0, 3) e “Régua” (4.0, 5).', 'Busque 99L. Se não existir, imprima “Produto não encontrado” sem chamar getter na ausência.', 'Tente remover 99L, mostre o retorno e depois liste os dois nomes para provar que nenhum cadastro sumiu.'],
          hint: 'Use if (encontrado == null) para a mensagem de ausência. Essa verificação não precisa chamar método algum.',
          code: 'ProdutoService service = new ProdutoService();\nservice.cadastrar(new Produto("Pasta", 12.0, 3));\nservice.cadastrar(new Produto("Régua", 4.0, 5));\nProduto encontrado = service.buscarPorId(99L);\nif (encontrado == null) {\n    System.out.println("Produto não encontrado");\n}\nSystem.out.println(service.remover(99L));\nfor (Produto produto : service.listar()) {\n    System.out.println(produto.getNome());\n}',
          output: 'Produto não encontrado\nfalse\nPasta\nRégua', why: 'null representa ausência na busca; false representa uma remoção que não aconteceu. Nenhum deles é um Produto.',
          check: 'Explique por que buscarPorId(99L).getNome() seria inseguro.' }
      ] },
    { target: '#pratica > .card', title: 'Parada 6 · Agora você amplia o projeto',
      theory: 'Um método pode devolver um resultado calculado. Um contador começa em zero e aumenta a cada item que atende à condição. Os próximos métodos entram na classe ProdutoService, fora de qualquer outro método; as chamadas de teste ficam no main.',
      exercises: [
        { title: 'Quantos produtos ainda têm estoque?', guided: true, minutes: 10,
          where: 'Adicione o método abaixo em ProdutoService.java, antes da última chave da classe. Substitua o corpo do main pelo teste indicado.',
          task: ['Com o professor, crie public int contarComEstoque(). O retorno é a quantidade de produtos com estoque maior que zero, não a soma das unidades.', 'Percorra produtos, conte os itens que passam na condição e retorne o contador depois do laço.', 'Teste com estoques 2, 0 e 5. Depois explique por que o resultado deve ser 2, não 7.'],
          hint: 'Declare int quantidade = 0 antes do for. Dentro do if, quantidade++. Deixe return quantidade depois do for.',
          method: 'public int contarComEstoque() {\n    int quantidade = 0;\n    for (Produto produto : produtos) {\n        if (produto.getEstoque() > 0) {\n            quantidade++;\n        }\n    }\n    return quantidade;\n}',
          code: 'ProdutoService service = new ProdutoService();\nservice.cadastrar(new Produto("Livro", 30.0, 2));\nservice.cadastrar(new Produto("Pasta", 12.0, 0));\nservice.cadastrar(new Produto("Régua", 4.0, 5));\nSystem.out.println(service.contarComEstoque());',
          output: '2', why: 'O contador cresce uma vez por produto com estoque positivo. O return fica fora do laço para não encerrar a contagem no primeiro produto.',
          check: 'Teste antes de cadastrar qualquer produto. A lista vazia deve resultar em 0.' },
        { title: 'Recebemos uma reposição!', minutes: 15,
          where: 'ProdutoService.java · crie public boolean repor(Long id, int quantidade). Mantenha os métodos anteriores. Use o main abaixo apenas depois da sua tentativa.',
          task: ['Se quantidade for menor ou igual a zero, devolva false sem alterar o produto.', 'Busque o id. Se não existir, devolva false. Se existir, some quantidade ao estoque atual pelo setter e devolva true.', 'Teste um produto com estoque 2: repor 3 unidades deve produzir estoque 5; repor 0 e repor no id 99 devem retornar false sem mudar esse estoque.'],
          hint: 'Reaproveite buscarPorId(id). Depois da verificação de null, use produto.setEstoque(produto.getEstoque() + quantidade).',
          method: 'public boolean repor(Long id, int quantidade) {\n    if (quantidade <= 0) {\n        return false;\n    }\n    Produto produto = buscarPorId(id);\n    if (produto == null) {\n        return false;\n    }\n    produto.setEstoque(produto.getEstoque() + quantidade);\n    return true;\n}',
          code: 'ProdutoService service = new ProdutoService();\nProduto livro = new Produto("Livro", 30.0, 2);\nservice.cadastrar(livro);\nSystem.out.println(service.repor(1L, 3));\nSystem.out.println(livro.getEstoque());\nSystem.out.println(service.repor(1L, 0));\nSystem.out.println(service.repor(99L, 3));\nSystem.out.println(livro.getEstoque());',
          output: 'true\n5\nfalse\nfalse\n5', why: 'O Service encontra o produto e organiza a reposição; o Produto continua sendo alterado pelo setter. Usamos pequenas quantidades nesta aula, sem tratar o limite máximo de int.',
          check: 'Faça também repor(1L, -2). O retorno deve ser false e o estoque deve continuar em 5. Conte ao professor onde cada regra foi aplicada.' }
      ] }
  ];

  // Sintaxe destacada por categorias locais; nunca interpreta código do aluno.
  function codeBlock(text, label) {
    const wrap = document.createElement('div'); wrap.className = 'code-block';
    const head = document.createElement('div'); head.className = 'code-header'; head.textContent = label;
    const pre = document.createElement('pre');
    const parts = text.split(/("(?:\\.|[^"\\])*"|\b(?:package|public|class|static|void|int|double|boolean|if|for|return|new|private|true|false|null)\b|\b\d+(?:\.\d+)?L?\b|\b[A-Z][A-Za-z]*\b)/g);
    parts.forEach(part => {
      const span = document.createElement('span');
      span.className = part.startsWith('"') ? 'st' : /^(package|public|class|static|void|int|double|boolean|if|for|return|new|private|true|false|null)$/.test(part) ? 'kw' : /^\d/.test(part) ? 'num' : /^[A-Z][A-Za-z]*$/.test(part) ? 'cls' : 'punc';
      span.textContent = part; pre.append(span);
    });
    wrap.append(head, pre); return wrap;
  }
  const textNode = (tag, text, className) => { const el = document.createElement(tag); el.textContent = text; if (className) el.className = className; return el; };
  let number = 0;
  blocks.forEach(block => {
    const host = document.querySelector(block.target); if (!host) return;
    const section = document.createElement('section'); section.className = 'practice-pair';
    section.append(textNode('h3', block.title), textNode('p', block.theory, 'practice-theory'));
    block.exercises.forEach(ex => {
      const article = document.createElement('article'); article.className = `practice-task ${ex.guided ? 'guided' : 'solo'}`;
      article.id = `atividade-${++number}`;
      article.append(textNode('span', `${ex.guided ? '🤝 COM O PROFESSOR' : '✍️ AGORA SOZINHO'} · ${ex.minutes} min`, 'practice-tag'), textNode('h4', `${number}. ${ex.title}`), textNode('p', ex.where, 'practice-where'));
      const list = document.createElement('ol'); ex.task.forEach(task => list.append(textNode('li', task))); article.append(list);
      article.append(textNode('p', 'Resultado para conferir — preveja antes de executar:', 'practice-label'), textNode('pre', ex.output, 'practice-output'));
      const hint = document.createElement('details'); hint.className = 'practice-reveal'; hint.append(textNode('summary', '💡 Uma dica, sem abrir a solução'), textNode('p', ex.hint));
      const solution = document.createElement('details'); solution.className = 'practice-reveal practice-solution';
      solution.append(textNode('summary', '👀 Ver solução comentada — depois de tentar'));
      if (ex.method) solution.append(codeBlock(ex.method, 'ProdutoService.java · novo método dentro da classe'));
      solution.append(codeBlock(ex.code, ex.full ? 'Main.java · arquivo completo' : 'Main.java · somente dentro do main'), textNode('p', ex.why));
      article.append(hint, solution, textNode('p', `✓ Só considere concluído quando: ${ex.check}`, 'practice-check'));
      section.append(article);
    });
    section.append(textNode('p', 'Ritual: prever → escrever → executar → comparar → explicar. Se travar, abra a dica; depois da solução, feche o olhinho e refaça.', 'practice-ritual'));
    if (block.after) host.after(section); else host.append(section);
  });
})();
