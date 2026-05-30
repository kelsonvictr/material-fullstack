# 03 — Padrão "olhinho 👀" (esconder a resposta)

## Filosofia
Esconder a resposta **protege o esforço** — e o aprendizado mora no esforço. Quem espia antes
de tentar perde a maior parte do ganho. Por isso a solução fica atrás de um clique consciente.

## Estrutura visual (nesta ordem)
1. **Dica** (`.concept`) — orienta SEM resolver: qual arquivo criar, quais passos, qual
   tag/função usar, referência a algo já visto. **Nunca** mostra código pronto nem o resultado.
2. **PARE!** (`.try-first`) — banner vermelho 🚨, "PARE! Tente sozinho primeiro", encorajador.
3. **Olhinho** (`.toggler`) — header clicável "👀 Só clique aqui DEPOIS de tentar"; corpo
   começa escondido (`max-height:0`) e expande suave; dentro, a solução completa.

## HTML do toggler
```html
<div class="toggler">
  <div class="toggler-header" onclick="toggleSection(this)">
    <span>👀 Só clique aqui DEPOIS de tentar — Ver solução completa</span>
    <span class="toggler-arrow">▼</span>
  </div>
  <div class="toggler-body">
    <!-- .code-block com a solução completa (sem "preencha aqui") -->
    <!-- opcional: .tip explicando uma sacada do código -->
  </div>
</div>
```
JS já existe em `shared/scripts.js` (`toggleSection`). CSS em `components.css` (`.toggler*`).

## Regras
- Dica orienta, não resolve. Try-first sempre vermelho + encorajador. Toggler mostra solução
  **completa** e funcional.
- **Quando NÃO usar:** exemplos demonstrativos (código visível de propósito), trechos de 1–2 linhas.
- Variação para quizzes: mesmo princípio — a resposta só aparece ao clicar.
</content>
