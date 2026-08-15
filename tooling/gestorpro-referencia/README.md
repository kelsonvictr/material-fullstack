# GestorPRO — projeto de referência do Cap 10

Implementação completa do sistema construído no **Cap 10** do material
(clientes, fornecedores e produtos com CRUD + dashboard), seguindo exatamente
o código e as convenções do capítulo — inclusive o `AGENTS.md` das regras.

Serve para: ensaiar a aula, comparar com o que os alunos produzirem e testar
mudanças no capítulo antes de publicar.

## Rodar (dois terminais)

```
npm install
npx json-server db.json     # terminal 1 → API na porta 3000
npm run dev                 # terminal 2 → app na porta 5173
```

Ou, via preview do Claude Code: configs `gestorpro-api` e `gestorpro`
no `.claude/launch.json` da raiz do workspace.

## Notas de teste (2026-08-14)

- Todos os fluxos verificados no Chrome: listar/cadastrar/excluir/editar dos
  3 módulos, selo de estoque baixo, `Number()` nos campos numéricos,
  dashboard com contagens + alerta, 404, navegação sem reload. Console limpo.
- **json-server v1 (npx atual)**: gera ids como códigos aleatórios
  (`"XKp8zR..."`), converte ids do seed para string na primeira escrita e
  acrescenta uma chave `$schema` ao db.json — comportamento normal, já
  refletido no texto do capítulo.
- `db.seed.json` é a cópia limpa dos dados: `cp db.seed.json db.json` zera o
  sistema para a próxima aula/demo.
