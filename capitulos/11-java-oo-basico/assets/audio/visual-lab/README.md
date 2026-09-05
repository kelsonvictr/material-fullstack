# Laboratório visual — vozes locais

31 etapas narradas por Tico (voz Will do elenco já aprovado), acompanhando `visual-lab-scenes.js` e `visual-lab-extra.js`: fábrica (10), execução (4), Service (5), crachás (6) e encomendas (6). A ampliação inclui 14 falas novas; as 17 anteriores foram reutilizadas. Não há TTS no navegador.

- `roteiro.json`: texto das falas, com chaves cena-etapa.
- `cast.json`: modelo e elenco, sem credenciais.
- `audio/manifest.js`: manifesto `window.VISUAL_LAB_AUDIO`, separado dos outros teatros.
- MP3 normalizados pelo gerador da skill; todos os clipes referenciados foram verificados por decodificação.

Ao regenerar com `generate-audio.mjs` da skill, respeitar autorização de custo e reutilizar cache. Após gerar, trocar o nome padrão `window.LLM_AUDIO` por `window.VISUAL_LAB_AUDIO` no manifesto. Uma fala anterior de construtor permanece apenas no cache; o manifesto usa a versão que distingue explicitamente preço oitenta de estoque dois.

`node tooling/sync-cap11-visual-audio.mjs` extrai as legendas para o roteiro. Depois da geração autorizada, `node tooling/sync-cap11-visual-audio.mjs --manifest` ajusta o nome global. Esses dois comandos locais não geram voz nem acessam credenciais.

Sincronização: a etapa só avança após o término real da voz e da janela visual. Pause preserva o áudio e o progresso visual. Troca de etapa, fechamento e reinício cancelam o áudio anterior. O controle global começa mudo e é compartilhado com os demais teatros.
