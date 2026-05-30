# 06 — Imagens e memes

## Política
- O professor **gosta de imagens**: logos das tecnologias, SVGs, e **memes BR** que dão
  engajamento na aula — **sem ser forçado**, sempre a serviço da didática.
- Memes/imagens geradas por IA **precisam de aprovação prévia** do professor antes de gastar
  créditos. Proponha descrições, ele aprova, aí gera.
- Sempre que possível, preferir **SVG** (logos oficiais, diagramas) — leve, nítido, escalável.

## Chave OpenAI
Mora no **Keychain do macOS**, service `OPENAI_API_KEY`. Recuperar sem expor o valor:
```bash
security find-generic-password -s OPENAI_API_KEY -w
```
Geração de imagem (modelo `gpt-image-1`, bom com texto), salvando direto:
```bash
KEY=$(security find-generic-password -s OPENAI_API_KEY -w)
curl -s https://api.openai.com/v1/images/generations \
  -H "Authorization: Bearer $KEY" -H "Content-Type: application/json" \
  -d '{"model":"gpt-image-1","prompt":"...","size":"1024x1024","n":1}' \
  | python3 -c "import sys,json,base64;open('assets/memes/nome.png','wb').write(base64.b64decode(json.load(sys.stdin)['data'][0]['b64_json']))"
```

## Memes aprovados (2026-05-29)
1. **Intro/Hub** — hype "é ISSO que você vai construir": dev orgulhoso apontando para uma tela
   com um dashboard/ERP bonito. Tom empolgante, BR.
2. **HTML/CSS** — o clássico sofrimento de **"centralizar a div"**: dev de madrugada lutando
   pra centralizar um quadradinho na tela. Muito relacionável.
3. **JavaScript** — o meme do **`0.1 + 0.2 = 0.30000000000000004`**: cara confuso olhando o
   console. Clássico do JS.
Logos oficiais em SVG: HTML5, CSS3, JavaScript, React (e depois Vite, Node, json-server).

## Convenções de arquivo
- Memes: `assets/memes/meme-NN-slug.png`
- Logos/SVGs: `assets/svg/` ou `assets/logos-empresas/` (logos de empresas do "sobre").
- Sempre com `alt` descritivo no `<img>`.
</content>
