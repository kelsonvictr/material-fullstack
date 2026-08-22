# 10 — Caderno de Engenharia (documentador digital do aluno)

Criado em 2026-08-22, a partir do pedido do prof: *"não consegui imprimir [o Mapa de
Engenharia]; pensei em algo interativo e bem criativo para eles documentarem essas coisas,
como um documentador digital, moderno, que reaproveitaremos em outros capítulos e materiais,
com export e localStorage"*.

## Decisões travadas (perguntadas ao prof, 2026-08-22)

| Decisão | Escolha |
|---|---|
| Formato | **Página própria** (`caderno.html` por capítulo) + atalhos nos selos ✏️ M1–M6 do capítulo |
| Correção automática | **NÃO** — igual ao papel: preenchimento livre, quem confere é o prof (gabarito) |
| Nome/marca | **Caderno de Engenharia** |
| Ritmo | Sem pressa, caprichado, duas fases |

## O conceito

Não é "a folha que virou página web" — é **o caderno pessoal do aluno**, que acumula uma
página por capítulo ao longo do curso. A identidade herda a prancheta impressa
(`mapa-engenharia.html`): papel claro quadriculado, moldura técnica, carimbo com o nome do
aluno ("eng. responsável"), tinta manuscrita. O aluno escreve e o texto sai em **Caveat azul
caneta** (o gabarito do prof usa laranja — cores nunca se confundem).

Momento-assinatura do produto: ao concluir uma missão, o aluno **carimba** a área
(animação de carimbo batendo, com data) — ecoa o cartório do capítulo ("quem carimba o id é
o servidor"; quem carimba a missão é o engenheiro). 6/6 carimbos → confete.

## Arquitetura

```
shared/caderno.css        estilos do caderno (papel, tinta, widgets, carimbo, print)
shared/caderno.js         O MOTOR — window.CadernoEngine.mount(el, CONFIG)
capitulos/NN-x/caderno.html   página fina: inclui shared/*, declara o CONFIG e monta
```

**Capítulo novo = escrever um CONFIG declarativo. Zero código novo.**

### CONFIG (contrato)

```js
{
  id: 'cap10',                  // vira a chave do localStorage: caderno:cap10
  curso: 'Curso Fullstack · programa AI',
  capitulo: 'Capítulo 10',
  titulo: 'Mapa de Engenharia — GestorPRO',
  stack: 'React · axios · json-server',
  voltar: 'index.html',         // link de volta pro capítulo
  missoes: [ { id:'m1', selo:'M1', titulo, sub, widgets:[…] }, … ]
}
```

### Widgets (tipos do motor)

| tipo | o que renderiza | estado salvo |
|---|---|---|
| `nota` | HTML explicativo (sem interação) | — |
| `checklist` | itens com ☐ clicável | `c[path]=true` |
| `blanks` | linhas HTML com lacunas `[[id|size]]` (ou `[[id|size|mono]]`) que viram inputs-caneta | `v[path]=texto` |
| `texto` | textarea manuscrita autoexpansível | `v[path]` |
| `wordbank` | banco de palavras → slots (clicar-palavra→clicar-slot E arrastar) | `s[path]=palavra` |
| `desenho` | canvas de traço livre (mouse/dedo), canetas coloridas, desfazer/limpar | `d[path]=[{cor,pts}]` (coords normalizadas 0..1) |
| `aceite` | tabela: feature × via × checks ①–⑤ × **assinatura desenhada** (canvas) | `c[…]` + `d[…]` |

Lacunas em `blanks`: sintaxe `[[campo|tamanho]]` dentro da string HTML.
Mono (código) ganha kill de ligatures — regra inegociável do workspace vale aqui.

### Persistência

- `caderno:aluno` → `{nome}` — **global**, compartilhado por todos os capítulos (o nome
  aparece no carimbo técnico de qualquer página do caderno).
- `caderno:<id>` → `{v,c,s,d,carimbos,atualizado}` — autosave com debounce ~400ms,
  indicador "✓ salvo" no topo.
- Canvas guarda **traços** (não dataURL): compacto, redesenha nítido em qualquer DPI/resize.

### Exportar / restaurar

1. **🖨️ Imprimir preenchido** — CSS `@media print` (A4 retrato, papel branco): o aluno
   imprime a versão DELE — recupera o artefato físico por outra via.
2. **💾 Baixar .json** — backup completo do estado (localStorage morre se limpar o
   navegador; o material AVISA isso). **📂 Restaurar** lê o .json de volta.
3. **📸 Baixar imagem (PNG)** — via `html2canvas` vendorizado em `shared/vendor/`
   (offline-first, mesmo padrão do React UMD). Progressivo: sem o vendor, o botão some.

### Regras herdadas do workspace

PT-BR · ligatures OFF em qualquer mono · escapar `<>&` no HTML dos configs · sem build ·
funciona offline (fonts degradam) · `prefers-reduced-motion` desliga carimbo/confete.

## Fases

- **Fase 1 (entregue junto com esta spec):** motor completo + `caderno.html` do Cap 10 com
  as missões M1–M6 espelhando a folha impressa + rascunho livre; atalhos nos selos do
  capítulo; imprimir/JSON/PNG.
- **Fase 2 (backlog):** card "📓 Meu Caderno" no hub com progresso agregado de todos os
  capítulos; páginas de caderno para capítulos anteriores; PNG estilizado "card de
  compartilhamento"; possível import no curso de Python (o motor não tem nada de React).

## Conteúdo do caderno do Cap 10 (espelha `mapa-engenharia.html`)

- **M1 · A Fundação** — checklist dos 4 passos, portas 5173/3000, gavetas do db.json
  (campos de fornecedores/produtos), "quem carimba o id".
- **M2 · O Mapa que Cresce** — as 8 linhas de rota com ☐ + etiqueta do passo + lacunas.
- **M3 · A Estrada do CRUD** — canvas para DESENHAR as setas de POST/PUT/DELETE (GET vem
  de exemplo no fundo) + legenda C.R.U.D. em lacunas.
- **M4 · Anatomia & Ciclo** — lacunas dos hooks da `Clientes.jsx` + banco de palavras
  arrastável do ciclo da listagem.
- **M5 · Ritual & AGENTS.md** — ritual ①–⑤ em lacunas + "a regra que EU acho mais
  importante" em texto livre.
- **M6 · Termo de Aceite** — as 8 features com ①–⑤ e **assinatura desenhada** por linha.
- **✍️ Rascunho livre** — canvas + notas, sem missão (não conta pro progresso).

O gabarito continua sendo o da folha: `mapa-engenharia-preenchido.html` (sem link, só o prof).
