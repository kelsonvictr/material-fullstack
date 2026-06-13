# 07 — Sequência de HTTP / fetch / axios no arco do curso

> Decisão de 2026-06-12, na véspera da aula do Cap 2 (6ª turma). Pergunta do professor:
> "antecipar HTTP/REST/API + integração JS puro ↔ API já no Cap 2? E mostrar axios logo
> depois dos primeiros componentes React?" Análise feita; conclusões abaixo são a spec.

## Decisões

1. **HTTP/REST/fetch NÃO entra como conteúdo do aluno no Cap 2.** O Cap 2 fica como está
   (já é o capítulo mais denso: variáveis → objetos + treino `boletim.js` numa aula só).
2. **Teaser ao vivo no fim da aula do Cap 2** (conduzido pelo professor, aluno não digita):
   fetch de uma linha no console do navegador contra uma API pública divertida, com a ponte
   "lembra do `@GetMapping` que vocês escreveram no backend? Agora vocês estão do outro lado
   do balcão" (reaproveita a analogia do restaurante do Cap 00). Demo ≠ exercício: payoff
   motivacional sem carga cognitiva. Opcional no material: box pequeno de "spoiler do próximo
   capítulo" no fim do Cap 2 — box, não seção.
3. **Fetch para valer fica no Cap 3**, como já estava no mapa — depois de seletores/eventos,
   com o dado buscado virando DOM (cards na tela). É o primeiro capítulo onde o fetch tem
   onde aterrissar; antes disso o destino seria `console.log` (anticlímax).
4. **Axios NÃO é antecipado para o início de React.** Mencionar que existe custa uma frase;
   ensinar, só no Cap 9, junto do JWT. Progressão de ferramenta:
   **fetch vanilla (Cap 3) → fetch no `useEffect` (Cap 7) → axios quando o JWT o justifica (Cap 9)**.
5. **Mitigação do "React de brinquedo" nos Caps 4–6:** os dados mockados devem ter
   **exatamente o formato JSON da API do ERP** que o aluno construiu no backend
   (ex.: `const produtos = [...]` com os mesmos campos do endpoint Spring), com aviso
   recorrente "esse array é temporário — no Cap 7 ele vira uma chamada à sua API".
   O Cap 7 então vira recompensa teatral: apagar o `const`, plugar `json-server`/fetch,
   três linhas trocadas e a tela ganha vida.

## Racional (por que não antecipar)

### fetch no Cap 2
- **Cadeia de dependências:** `fetch` honesto exige promises/`async` e `.then()` com arrow
  function como callback — conceitos que dependem de "função", aprendida no mesmo dia.
  Ensinar assincronia (o conceito mais difícil do JS iniciante) sobre funções recém-vistas
  produz cópia mecânica, não compreensão.
- **Payoff exige DOM:** sem manipular a página, "integração real" = JSON cru no console.
- **Premissa fraca:** a integração já está a UMA aula de distância (Cap 3), não a meses.
- **Teoria de HTTP/REST é parcialmente redundante:** o aluno chega no front tendo construído
  uma API Spring (controllers, endpoints, JWT). Ele já viu HTTP do lado do servidor; o que é
  novo é o lado cliente + assincronia — e isso pertence ao Cap 3.

### axios no início de React
- **Não existe data-fetching em React sem estado:** renderizar dado buscado exige `useState`
  (Cap 6) + `useEffect` (Cap 7). Axios no Cap 4 obrigaria a apresentar hooks "por cima" antes
  da hora — fábrica dos piores bugs de iniciante (fetch no corpo do componente → loop infinito
  de re-render, array de dependências copiado sem entender, `setState` tratado como síncrono).
- **Ferramenta antes do problema:** a motivação real do axios (instância com `baseURL`,
  interceptors injetando JWT, JSON automático) só existe no Cap 9. Antes disso é "um fetch
  que precisa de `npm install`" — custo sem benefício demonstrável, durante o momento mais
  frágil (primeiro contato com Vite/JSX).
- "É padrão de mercado" justifica **exposição** (citar que existe), não **ensino** precoce.

## Princípio geral extraído

**Cada ferramenta chega com a sua razão de existir.** O aluno deve sentir a dor antes de
receber o remédio. Vale para axios, e vale como teste para qualquer pedido futuro de
antecipação de conteúdo: se o payoff da ferramenta depende de um conceito ainda não ensinado,
a resposta é teaser/demo do professor agora + ensino no capítulo onde a dependência existe.

## Impacto nos capítulos pendentes
- **Cap 3:** abrir caminho seletores → eventos → fetch+render como clímax do capítulo.
- **Caps 4–6:** mocks com shape da API real do ERP, rotulados como "futura chamada de API".
- **Cap 7:** momento "apaga o const" como recompensa; fetch (não axios) no `useEffect`.
- **Cap 9:** axios entra junto com login/JWT, motivado por interceptors.
