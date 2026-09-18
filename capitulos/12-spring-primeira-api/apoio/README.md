# Apoio do Cap 12 — Spring: nossa primeira API

O aluno acompanha `../index.html`. Este diretório permite conferir o código depois de tentar.

- `api-inicial.zip`: projeto gerado pelo Spring Initializr, sem o CRUD.
- `api-completa.zip`: o mesmo projeto com o CRUD final de Fornecedor e a configuração local.
- `checkpoints/1` a `checkpoints/5`: arquivos Java completos ao concluir POST, GET coleção,
  GET por ID, PUT e DELETE, respectivamente. São referência, não cinco projetos independentes.
- `treino.sql`: comandos para executar no psql; substituir IDs de exemplo pelos retornados.
- `application.properties`: configuração local usada na aula.

Versões verificadas: Java 21, Spring Boot 4.1.1, Maven/Wrapper gerado pelo Initializr e
PostgreSQL na imagem oficial `postgres:17`. Dependências: Spring Web (starter-webmvc no Boot
4.1), Spring Data JPA, PostgreSQL Driver e Lombok (incluindo o processador de anotações no Maven). Nenhuma dependência adicional para a página HTML.

## Executar a API de conferência

1. Crie o container conforme o capítulo e aguarde `pg_isready` confirmar as conexões.
2. Extraia `api-completa.zip` e abra a pasta `api`, com `pom.xml`, no IntelliJ.
3. Selecione JDK 21; confira porta/credenciais em `application.properties` caso tenha adaptado
   a receita Docker. Sincronize o Maven para carregar Lombok e seu processador de anotações.
   Banco/usuário: `gestorpro`; senha didática local: `gestorpro_local`.
4. Execute `ApiApplication`. A URL base é `http://localhost:8080/fornecedores`.
5. Execute uma cópia da API por vez para não disputar a porta. Não há autenticação neste capítulo.

## Padrão de código

Fornecedor usa `@Getter`, `@Setter` e `@NoArgsConstructor`. Service e Controller usam
`@RequiredArgsConstructor` com dependências `private final`. Lombok gera os construtores;
o Spring resolve e entrega as dependências. A comparação com o construtor explícito está
no capítulo. O tutorial do IntelliJ inclui diagnóstico de plugin/processamento de anotações.

## Manutenção e validação

A página é estática e não precisa de build. Edite seu HTML/CSS/JS localmente. Os blocos Java do
HTML são comparados com os checkpoints e com o ZIP final pelo validador; alterações devem manter
os três coerentes. Não publique código diferente do que foi testado.

A partir da raiz `novo-material-fullstack`:

```sh
python3 tooling/validate-cap12.py --static-only
python3 tooling/validate-cap12.py
python3 tooling/validate-cap12.py --integration
```

A primeira opção confere links locais e equivalência do código. A segunda também compila os
cinco checkpoints com Java 21. A terceira exige Docker iniciado; cria seu próprio PostgreSQL
em porta livre e volume descartável, executa SQL e testes HTTP, comprova persistência e remove
somente os recursos que criou. Não usa nem limpa o banco do aluno. Maven baixa dependências na
primeira execução. O código Java é extraído dos blocos publicados no HTML para a compilação.

Para verificar a página no navegador, sirva a raiz e execute o validador Playwright em outro
terminal, com Playwright e um navegador Chromium disponíveis:

```sh
python3 -m http.server 8762 --bind 127.0.0.1
node tooling/validate-cap12-browser.mjs
```

Se Playwright não estiver resolvível no ambiente, `PLAYWRIGHT_MODULE` aceita o caminho absoluto
para seu `index.mjs`; `CHROME_PATH` aceita o caminho do executável. O script usa Chrome instalado
no caminho padrão de macOS quando disponível. `CAP12_BASE_URL` permite outra URL de prévia.
As capturas ficam em uma pasta temporária informada no resultado. Não há dependência Playwright
no site entregue ao aluno.

A validação de navegador usa contexto isolado: não altera as anotações do caderno pessoal.
