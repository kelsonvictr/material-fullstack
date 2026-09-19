# Cap 11 — Apresentações em grupo

Fonte editorial: `conteudo.json`. Quatro roteiros independentes; cada um tem abertura, 20 slides conceituais e defesa final (22 slides).

## Atualização

Edite o JSON e confira os quatro roteiros contra esta matriz. O gerador escapa o texto; não insira HTML nos campos. O motor local e seus assets vieram da skill `slides-grupos-capitulo`. CSS e JS em `apresentacoes/` são a fonte dos assets; o gerador os preserva. O seletor de impressão foi ajustado para que os quatro temas usem fundo branco e texto escuro no papel. Antes de regenerar, confira alterações nos arquivos de saída.

```sh
python3 tooling/cap11-slides/build_slides.py \
  tooling/cap11-slides/conteudo.json \
  capitulos/11-java-oo-basico/apresentacoes --overwrite
```

Execute dentro de `novo-material-fullstack`. A navegação é local, sem dependência de rede. Não se trata de vídeo nem de apresentação narrada.

## Matriz de cobertura

Os números abaixo apontam para os slides de cada grupo. A matriz é apoio de revisão editorial, não substitui ler os textos visíveis.

| Conceito | Grupo 1 | Grupo 2 | Grupo 3 | Grupo 4 |
|---|---:|---:|---:|---:|
| Projeto Java | 2 | 2 | 3 | 3 |
| Da escrita ao console | 3 | 3 | 4 | 2 |
| Tipos e valores | 4 | 4 | 5 | 4 |
| Decisão e limite | 5 | 5 | 9 | 5 |
| Repetição com contador | 6 | 6 | 10 | 6 |
| Classe e instâncias | 7 | 7 | 6 | 7 |
| Construtor e this | 8 | 8 | 7 | 9 |
| Entrada e retorno | 10 | 9 | 11 | 11 |
| Referências compartilhadas | 9 | 11 | 12 | 8 |
| Acesso e validação | 11 | 10 | 8 | 10 |
| Representação textual | 12 | 15 | 13 | 12 |
| Responsabilidades | 13 | 12 | 2 | 13 |
| Coleção em memória | 14 | 13 | 14 | 14 |
| Cadastro e identidade | 15 | 14 | 15 | 15 |
| Busca e ausência | 16 | 16 | 16 | 16 |
| Atualização pelo objeto | 17 | 17 | 17 | 17 |
| Remover e observar | 18 | 18 | 18 | 18 |
| Ampliação: contar itens | 19 | 19 | 19 | 19 |
| Ampliação: repor unidades | 20 | 20 | 20 | 20 |
| Limites e próximo capítulo | 21 | 21 | 21 | 21 |

## Contratos e recorte

- `Produto`: id Long, nome String, preco double, estoque int. Construtor do HTML recebe três argumentos e atribui diretamente; somente os setters de preço e estoque recusam negativos.
- `ProdutoService`: lista e contador próprios por instância; id atribuído antes de add; busca por equals de Long; ausência com null; remoção com boolean. listar devolve a própria lista.
- Referências: dois new criam instâncias; atribuição compartilha ou redireciona referência; busca devolve o mesmo objeto; remover da lista não elimina outras referências.
- Atividades 11–12 acrescentam contarComEstoque e repor ao Service base. subtotal e valorEmEstoque são exemplos extras das oficinas; não representam venda.
- Quem começou com Maven/org.example mantém a estrutura. Apoios explicam a migração do construtor de quatro para três argumentos quando o Service assumir o id.
- Spring é uma ponte futura. Cap 12 começa com Fornecedor; não afirmar que o Produto do Cap 11 já tem API, anotações ou banco.

## Integração e tempo

Seção final `#apresentacoes`, após `#resumo`, e atalho na sidebar. Nenhum marcador [01]–[26], atividade, progresso, anotação ou TXT docente foi renumerado.

Referência ajustável: preparação 20 min + quatro apresentações de 15 min + quatro rodadas de perguntas de 3 min = 92 min. É um bloco próprio; não cabe nos 15 min finais do cronograma original.

## Conferência

Validar todas as páginas em 1280×720 e 390 px; teclado depois de clicar em botões; limites inicial/final; índice; recarga por hash; apoio; tela cheia; impressão com 22 páginas; leitura contínua sem JavaScript e links às âncoras reais do capítulo.
