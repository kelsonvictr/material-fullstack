# Vozes dos teatros de abertura

Geradas a pedido do professor usando a skill teatro-didatico-animado, ElevenLabs multilingual v2 e o elenco já aprovado (Jenifer/Lia, Lax/Beto, Will/Tico). O Duke é a representação visual do Tico; não muda sua voz.

`roteiro.json` contém oito falas; `cast.json` preserva as configurações, sem credenciais. MP3 locais em `audio/`. A validação técnica decodificou todos os arquivos; não representa avaliação subjetiva da atuação.

Para regenerar, usar `generate-audio.mjs --project <esta-pasta> --generate` da skill, com autorização de custo quando necessária. O gerador reutiliza o cache. Após gerar, trocar apenas o identificador `window.LLM_AUDIO` do manifesto para `window.DUKE_AUDIO`, como nesta integração, para não colidir com a oficina de objetos.

O player espera o término real de cada MP3; avanço manual é silencioso. `cap-audio.js` controla a preferência global de som, inicialmente desligada. Nenhuma chamada de geração é feita pelo navegador.
