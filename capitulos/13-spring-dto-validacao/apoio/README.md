# Apoio do Cap 13 — Produto e Cliente: a API fica profissional

O aluno acompanha `../index.html`. Este diretório permite conferir o código depois de tentar.

- `api-inicio-cap13.zip`: ponto de partida. É o `api-completa.zip` do Cap 12 (CRUD de Fornecedor).
- `api-completa.zip`: o mesmo projeto ao fim do Cap 13 — Produto (DTOs, Mapper, validação, 404,
  ligado a Fornecedor por `@ManyToOne`), Cliente (gabarito da seção 14), `TratadorDeErros`,
  `pom.xml` com `spring-boot-starter-validation` e `application.properties` com
  `spring.web.error.include-message=always`. O código do Fornecedor continua igual ao do Cap 12
  (refatorá-lo é o desafio para casa).
- `checkpoints/1` a `checkpoints/9`: os arquivos novos do Cap 13, completos, ao fim de cada etapa:
  1 POST · 2 GET lista · 3 GET por ID · 4 PUT · 5 DELETE · 6 Validação · 7 Tratador de erros ·
  8 Produto → Fornecedor · 9 Cliente. São referência, não nove projetos independentes.

Versões verificadas: Java 21, Spring Boot 4.1.1 (Hibernate 7.4), PostgreSQL 17 (`postgres:17`).

## De onde vem cada arquivo (não edite à mão)

O código Java tem **uma fonte só**: `tooling/cap13/codigo.py`. O texto da página fica em
`tooling/cap13/pagina-*.html`, com marcadores (`<!--JAVA n arquivo-->`, `<!--CODE …-->`) que o
gerador substitui por blocos coloridos e escapados. Depois de editar qualquer um deles, a partir
da raiz `novo-material-fullstack`:

```bash
python3 tooling/build-cap13.py
```

Isso regenera `index.html`, os checkpoints e os dois ZIPs. As linhas com fundo verde nos blocos
(o que mudou na etapa) são calculadas pelo gerador comparando com a etapa anterior.

## Validação

```bash
python3 tooling/validate-cap13.py --static-only
```

```bash
python3 tooling/validate-cap13.py --integration
```

`--static-only` confere IDs, links, blocos do HTML = `codigo.py` = checkpoints, `pom`/`properties`
e o conteúdo dos ZIPs (inclusive que os arquivos do Cap 12 não mudaram). Sem flag, também compila as
9 etapas e a variante com `for` da seção 06. `--integration` cria um PostgreSQL 17 descartável
(nunca usa o banco do aluno) e verifica, com a API rodando de verdade:

- `id` e `criadoEm` enviados no POST são ignorados; `preco` vira `numeric(10,2)`;
- 404 em GET/PUT/DELETE; PUT preserva `criadoEm`; DELETE repetido = 404; `/produtos/abc` = 400;
- etapa 6: 400 com corpo genérico; etapa 7: 400 campo a campo e 404 com `message`;
- etapa 8: com produtos antigos a coluna `fornecedor_id NOT NULL` não é criada (todo `/produtos`
  = 500, aviso `contains null values`); depois de `DELETE FROM produtos;` a FK
  `fkje6bg3cu81l0e4nfprc0c7wwc` aparece no `\d produtos`; fornecedor inexistente = 404; sem
  `fornecedorId` = 400; excluir fornecedor ligado = 500 (`violates foreign key constraint`);
- etapa 9: os 8 passos do roteiro de aceite do Cliente.

Para o navegador, sirva a raiz e rode o validador Playwright (mesmo esquema do Cap 12):

```bash
npx --yes http-server . -p 8762 -c-1 -s
```

```bash
node tooling/validate-cap13-browser.mjs
```

Se o Playwright não estiver resolvível, `PLAYWRIGHT_MODULE` aceita o caminho absoluto do módulo
(`playwright` ou `playwright-core`); o Chrome instalado no macOS é usado automaticamente.

## Achados reais registrados no capítulo

- No Spring Boot 4, `server.error.include-message` foi substituída por
  `spring.web.error.include-message` (a antiga é ignorada).
- Por padrão o Spring ignora campos do JSON que não existem no record (não dá erro).
- `ddl-auto=update` não consegue adicionar coluna `NOT NULL` em tabela com linhas: o Hibernate só
  registra um WARN e a API sobe sem a coluna.
