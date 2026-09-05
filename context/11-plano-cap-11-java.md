# 11 — Plano do Cap 11 · Java & OO direto ao ponto

> Revisão pedagógica de 2026-09-04. O primeiro rascunho estava amplo demais e fazia muitas
> comparações com tecnologias já estudadas. A versão atual acompanha um único projeto Java do
> início ao fim e usa teatro didático para tornar visível o que acontece com os objetos.

## Transformação esperada

Antes da aula, o aluno ainda não abriu um projeto Java e mistura classe, objeto, construtor e
Service. Ao final, ele consegue criar no IntelliJ um projeto com JDK 21, explicar essas peças e
executar um CRUD em memória com `Produto`, `ProdutoService` e `Main`.

## Regra central

> Classe define o molde; objeto guarda estado; métodos controlam esse estado; Service organiza
> as operações sobre o conjunto de objetos.

Essa frase aparece na fundamentação, muda de estado no teatro, é aplicada na prática e volta no
quiz final.

## Recorte de uma manhã

Tempo-alvo: **4 horas (240 minutos)**, já incluindo 10 minutos de intervalo. As atividades têm 112 minutos de trabalho guiado/individual, além da construção das classes durante a explicação.

| Bloco | Tempo | Entrega |
|---|---:|---|
| Acolhida, sintaxe, IntelliJ + atividades 1–2 | 40 min | projeto, JDK, pacote e console |
| Tipos, if, for + atividades 3–4 | 35 min | alerta de estoque e etiquetas |
| Produto, teatro OO + atividades 5–8 | 60 min | objetos independentes e validação |
| Intervalo | 10 min | salvar o projeto |
| Service + atividades 9–10 | 45 min | cadastro, busca, remoção e ausência |
| Integração + atividades 11–12 | 35 min | contarComEstoque e repor |
| Correção, quiz, caderno e Spring | 15 min | explicar e transferir |

`pratica-fluxo.js` distribui seis duplas guiado → individual imediatamente após os conceitos correspondentes. Cada exercício traz local de edição, passos, saída esperada, dica recolhida, solução comentada em olhinho (`details/summary`, nativo e acessível) e critério de conclusão. A solução usa dados diferentes do exemplo anterior e não requer novas bibliotecas. Um único projeto; trechos no `main` são substituídos, não acumulados com variáveis duplicadas.

Validação reproduzível: `node tooling/validate-cap11-pratica.mjs` compila e executa as 12 soluções e quatro casos-limite em Java 21, usando as classes publicadas no HTML.

Margem até 5h: dúvidas, ritmo da turma e repetição dos checkpoints. Não há uma segunda entidade
obrigatória. Se sobrar tempo, o aluno pode criar `Cliente` como repetição, sem nova teoria.

## Fluxo do capítulo

1. **Uma manhã, uma entrega** — apresenta os três arquivos e o cronograma.
2. **New Project** — Java, build system IntelliJ, `Download JDK…`, versão 21, Eclipse Temurin.
3. **File > Project Structure** — confere Project SDK 21 e Language level 21.
4. **Java essencial** — `Main`, `println`, tipos, `if` e `for`; só o que será usado.
5. **Produto e OO** — classe, campos, construtor, `this`, `private`, getters, setters e `toString`.
6. **Oficina de objetos** — Lia traz a necessidade, Beto decide e Tico revela memória/código.
7. **ProdutoService** — `List<Produto>`, `ArrayList`, cadastrar, listar, buscar e remover.
8. **Construção guiada** — fecha e executa o projeto com cinco checkpoints.
9. **Ponte para Spring** — mostra Controller → Service → Repository → PostgreSQL.
10. **Checkpoint final** — decisões sobre classe/objeto, encapsulamento e responsabilidade.

## Teatro didático

O componente foi inspirado na Oficina de Falas aprovada no Cap 0 de Java Avançado. Ele preserva:

- Lia como pessoa que traz a necessidade;
- Beto como pessoa que programa e toma decisões;
- Tico como guia que abre os bastidores;
- fala curta, personagem ativo e estado visível;
- reprodução automática, pausa, avanço, retorno, troca de cena e reinício;
- legendas equivalentes e funcionamento em tela estreita;
- interrupção quando a aba ou o componente deixa de estar visível;
- respeito a `prefers-reduced-motion`.

As três cenas usam o mesmo projeto:

1. **Molde e objetos** — a classe surge e dois objetos independentes aparecem na memória.
2. **Estado protegido** — preço inválido é recusado e o valor anterior permanece.
3. **Service organiza** — objetos entram na lista, são buscados e o caso `null` fica visível.

O teatro possui 31 falas locais produzidas com ElevenLabs após autorização do professor. O elenco
reutiliza as vozes aprovadas no Cap 0: Jenifer/Lia, Lax/Beto e Will/Tico. O player inicia áudio
somente após ação do aluno, espera o término real de cada fala, preserva o ponto ao pausar e
interrompe a fila ao trocar de cena, avançar manualmente, reiniciar, ocultar a aba ou sair do palco.

## Conteúdo deliberadamente removido

- abertura longa comparando linguagens e ambientes;
- execução e exemplos de Node;
- tradução token a token entre linguagens;
- seção isolada sobre compilador/JVM;
- catálogo completo de erros dentro da aula;
- uma seção para cada pequeno conceito;
- Cliente e Fornecedor como entregas obrigatórias;
- herança, polimorfismo, abstração, interfaces, streams, lambdas, DTO e API de `Optional`;
- Maven, JPA e injeção de dependência antes da aula de Spring.

Compilador e JVM ainda são nomeados no momento em que o aluno clica em Run, mas não desviam o
fluxo principal.

## Decisões de código

- Java 21.
- Pacote `br.com.gestorpro`.
- Build system IntelliJ, sem Maven nesta aula.
- JDK baixada pelo seletor do IntelliJ; nenhum download externo.
- `double` apenas por simplicidade didática, com aviso de promoção para `BigDecimal` no Spring.
- `Long id` para antecipar a entidade futura.
- `buscarPorId` devolve `null` nesta primeira aula; `Optional` e exceções entram depois.
- Getters, setters e `toString` podem ser gerados por `Code > Generate` para economizar tempo.

## Evidência de aprendizagem

### Laboratório visual em modal

- Três entradas locais no fluxo: após a anatomia do main (compilação/execução); abertura de OO (fábrica); depois do simulador de Service (referências).
- A fábrica tem 8 etapas: molde → new/alocação simplificada → construtor/inicialização → atribuição da referência → getter → setter recusado → setter aceito → método de cálculo. Duke usa carrinho, capacete e martelo; campos e retornos mudam explicitamente.
- A viagem do código tem 4 etapas: erro de sintaxe → correção → bytecode → JVM/console. Não acrescenta comandos de instalação ou terminal.
- O depósito tem 5 etapas: dois objetos → cadastro → busca → alteração pela mesma referência → remoção da lista. Diferencia ids de negócio das etiquetas visuais A/B; não sugere que remover destrói imediatamente o objeto.
- `valorEmEstoque()` é identificado como exemplo extra de método para adicionar a Produto, não como parte já existente do arquivo. Validado com resultado 180.0; sequência de referências também compilada pelo validador.
- Metáforas e limites aparecem em texto. Modal nativo prende foco e fecha por Escape; fechamento pausa/cancela vozes e devolve foco. Controles sempre disponíveis, avanço manual silencioso e passos revisitáveis; preferência global de áudio respeitada. Redução de movimento mostra o estado final sem deslocamentos.
- Aplicação das skills teatro-didatico-animado e HyperFrames/animation: cena vetorial, chegada suave, setas desenhadas e movimento com propósito. A integração interativa existente dispensa render de vídeo ou dependências novas. SVG é dirigido por uma única linha de tempo por etapa, congelável pelo professor.
- 17 falas locais ElevenLabs, manifesto próprio; sem geração de voz no navegador. As oficinas são recursos de explicação nos blocos existentes: escolher a visualização necessária em vez de repetir todas as demonstrações na aula de 4 horas.

### Ampliação dos laboratórios — setembro/2026

- Cinco oficinas, 31 etapas narradas: fábrica (10), execução (4), Service (5), crachás (6) e encomendas (6). A extensão `visual-lab-extra.js` reutiliza o modal, relógio, som geral e cancelamento do player; não cria um segundo player concorrente.
- Crachás: contraste entre objetos com campos iguais, alteração independente, referência compartilhada e reatribuição. Quartos/etiquetas são metáforas, não endereços reais.
- Encomendas: argumento chega ao parâmetro, `this.nome = nome` modifica o campo, `subtotal(3)` calcula usando quantidade recebida (não estoque), `return` entrega e `println` imprime. O método subtotal é explicitamente extra e não representa venda nem baixa de estoque.
- Fábrica ampliada: vidro do `private` bloqueia acesso pelo Main na compilação; porta `public` permite chamar o método, cuja validação é separada do controle de acesso.
- Dois pontos de previsão interrompem o avanço automático antes de revelar. A turma responde com feedback e usa Etapa →; avanço manual continua silencioso.
- Duas práticas de 5 min com solução no olhinho, usadas como variações dentro dos blocos existentes ou retomadas após a aula. Evitar repetir todas as demonstrações do mesmo conceito para preservar as 4h e a prática no IntelliJ.
- 14 falas novas locais e 17 reutilizadas. Sincronizador do roteiro em `tooling/sync-cap11-visual-audio.mjs`; manifesto separado `VISUAL_LAB_AUDIO`. Gerações futuras exigem autorização própria.
- Skills aplicadas: laboratório visual (estados revisitáveis/modal), capítulo didático (teoria → previsão → prática), teatro (voz/legenda/pausa) e direção de animação (trajetos desenhados, chegadas suaves). Desktop coloca legenda ao lado do palco; móvel mantém rolagem interna do diagrama.
- Validação: 24 cenários Java 21, 31 clipes correspondentes/decodificados e teste determinístico das 14 etapas novas em cinco pontos de tempo. Navegador: sequência de encomendas até o fim com parada de previsão, pausa da entrega preservando posição e currentTime, som global interrompendo vozes, desktop sem sobreposição palco/limite e móvel 390 px sem overflow da página.

### Caderno livre do aluno — implementação

- `caderno.html` e `caderno-config.js` reutilizam o motor e o estilo do caderno do Cap 10, sem alterar sua configuração ou seus dados.
- Conteúdo inicial em branco: uma área expansível de texto e uma área de desenho livre. Sem respostas, exercícios ou tópicos preenchidos; o professor conduz as anotações em aula.
- Chave própria `caderno:cap11`; o nome do aluno mantém o padrão compartilhado `caderno:aluno`. Persistência local no mesmo navegador/origem, com exportação/restauração JSON e impressão do motor existente.
- Acesso pelo Duke flutuante “Bora fazer anotações?” e pela navegação lateral. Abre em outra aba para manter o capítulo disponível.

### Reforço interativo — Duke e jogos (setembro/2026)

- Tico continua com seu nome e suas vozes locais; a representação visual agora é o Duke oficial, sem xícara/robô.
- Após a primeira explicação de sintaxe: teatro legendado de quatro passos (intenção → erro de escrita → correção → console) e jogo de diagnóstico em outra mensagem.
- Após Java essencial: teatro legendado contrastando `12` e `"12"`, seguido de decisão sobre compatibilidade entre tipo e valor.
- Após a oficina de objetos: jogo de previsão de estado de dois objetos independentes ao chamar um setter em apenas um deles.
- Regras verificáveis: sintaxe organiza a escrita; tipo limita os valores; objetos independentes mantêm estados independentes. As consequências erradas são explicadas sem punição e todas as decisões permitem nova tentativa.
- Reservar aproximadamente 8 minutos dentro dos blocos existentes de explicação/prática; não acrescentar um novo tópico ao recorte da manhã.
- Todos os teatros têm vozes locais. Os dois novos receberam 8 falas ElevenLabs (33,4 s) após pedido explícito do professor, com o mesmo elenco. O manifesto novo usa `window.DUKE_AUDIO`, separado da oficina (`window.LLM_AUDIO`).
- `cap-audio.js` segue o padrão do Cap 0 de Java Avançado: primeira visita em modo mudo, preferência `cap11:muted` no aparelho, botão fixo durante a rolagem e controles locais sincronizados. Silenciar interrompe qualquer narração; ligar som não inicia reprodução. Mudanças também sincronizam entre abas. Animações/legendas e jogos funcionam em modo mudo.
- Controles isolados, pausa ao sair da tela/aba, retomada da fala e exclusão mútua entre teatros; imagens e lógica locais em `duke-labs.js`.

O aluno concluiu quando consegue:

1. mostrar JDK 21 em `File > Project Structure`;
2. explicar por que dois `new Produto(...)` criam estados independentes;
3. explicar por que `preco` é `private`;
4. executar cadastrar, listar, buscar e remover;
5. tratar a ausência antes de chamar um método;
6. apontar onde `Produto` e `ProdutoService` reaparecerão no Spring.
