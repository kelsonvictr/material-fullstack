# Cap 11 — Apresentações de revisão em quatro grupos

Adicionado em 19/09/2026, a pedido de Kelson, usando a skill `slides-grupos-capitulo`.

O fim de `capitulos/11-java-oo-basico/index.html` ganhou a seção `#apresentacoes`,
com quatro links diretos e atalho na sidebar. Cada grupo revisa o capítulo inteiro,
em 22 slides, por uma narrativa própria:

1. **O cadastro sob investigação:** causas e provas dos resultados.
2. **A viagem de um produto:** percurso dos dados e mudanças de estado.
3. **As escolhas do cadastro:** decisões, benefícios e limites.
4. **Parece certo. Será?:** revisão de confusões com correção explícita no slide.

Os HTMLs, CSS e JS estão em `capitulos/11-java-oo-basico/apresentacoes/`.
A fonte editorial e a matriz de cobertura estão em `tooling/cap11-slides/`.
Cada deck tem perguntas de explicação e apoio recolhido com links ao capítulo.
As páginas não exigem rede, não têm avanço automático e admitem leitura sem JS.

## Decisões pedagógicas

- Mesmos 20 tópicos conceituais nos quatro grupos, incluindo as oficinas de referências
  e métodos e as atividades de contagem e reposição.
- Preservados os valores e contratos do capítulo: construtor de três argumentos com
  atribuição direta, validação somente nos setters correspondentes, ids pelo Service,
  null na busca, boolean na remoção e lista de referências em memória.
- A atualização ocorre pelo setter do objeto encontrado. Não se inventou um método
  atualizar no Service base.
- Métodos extras são identificados como ampliações. Spring/API/PostgreSQL são futuros;
  a entrada no Cap 12 usa Fornecedor, conforme o material atual.
- Os apoios reconhecem o projeto iniciado com Maven/org.example e a migração do
  construtor de quatro argumentos quando o Service passar a gerar ids.
- Sugestão ajustável de 92 minutos: 20 de preparação, 4 × 15 de apresentação e 4 × 3
  de perguntas. A seção esclarece que isso exige um bloco próprio, além dos 15 minutos
  de fechamento do roteiro original.
- Marcadores [01]–[26], atividades, TXT docente, caderno e conteúdo anterior preservados.

## Conferência executada

- Todos os 88 slides percorridos no Chrome em 1280×720: conteúdo e controles cabem
  com apoio fechado. Em 390 px, sem overflow horizontal.
- Botões, índice, setas após clicar em botões, Home/End, limites inicial/final,
  recarga com hash, abertura/fechamento do apoio e entrada/saída de tela cheia.
- Impressão gerada e inspecionada: 22 páginas não vazias por apresentação;
  uma página por slide. Leitura contínua de todos os slides sem JavaScript.
- Nenhuma requisição remota nas apresentações; nenhum erro JavaScript observado.
- Quatro links de abertura e todas as 20 âncoras de apoio conferidos no capítulo
  carregado, inclusive as atividades inseridas pelo JavaScript existente.
- Inspeção visual de projeção, celular, integração e amostra impressa.

Não houve commit, push ou publicação nesta alteração.
