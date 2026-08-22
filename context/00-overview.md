# 00 — Visão geral do projeto

## O que é
Material didático **da metade Frontend** do curso presencial **Programação Fullstack** (programa AI
e turmas relacionadas). Site estático (HTML/CSS/JS vanilla, sem build), modular — um capítulo
por pasta — servido como página web.

## Público
**Iniciantes.** Muitos nunca escreveram uma linha de frontend. Clareza, literalidade e
progressão lenta importam mais que estética. Português do Brasil em todo conteúdo do aluno.

## Professor
Kelson Almeida — MSc, Senior Software Engineer (NTT Data @ Itaú), professor na UNIESP.
Curso presencial, **15 sábados**, consolidado, **6ª turma** (≈200 alunos já formados em 5 turmas,
muitos indicados por ele a grandes empresas/consultorias no Brasil e no exterior).

## Como o front se conecta ao back (importante!)
O curso é fullstack. A **metade de backend já tem material próprio** (`../backend-fullstack`):
Java 21 + Spring Boot + PostgreSQL + JWT, construindo um **Sistema de Gestão (ERP)** com
entidades Fornecedor, Produto, Cliente. Este material de **frontend culmina consumindo essa
mesma API** — o aluno constrói a interface React do mesmo ERP que ele programou no back.

O projeto-case final mora em `../projetos-fullstack/final` (`api/` Spring + `web/` React 19 +
Vite + React Router + Axios + Context JWT). É o destino: tudo que ensinamos leva até lá.

## Stack que o aluno vai aprender (front)
HTML5 · CSS3 (Flexbox, CSS Modules) · JavaScript (ES moderno, DOM, fetch) ·
React (Vite, componentes, JSX, props, useState, useEffect) · React Router DOM ·
json-server (mock) · Axios + integração com a API real (JWT).

> Decisão de modernização: os slides antigos usavam **Bootstrap** e Node "na marra". O novo
> material moderniza para **Vite + CSS Modules**, dentro das skills do professor. Ver `05-decisoes.md`.

## Stack do material em si
HTML5, CSS3, JavaScript vanilla. Sem framework, sem build. Fontes via Google Fonts
(Nunito, JetBrains Mono, Caveat). Animações: **Motion (motion.dev) via CDN** como principal,
**Remotion** pontualmente para videoclipes mais elaborados. Imagens: SVGs/logos oficiais +
memes BR gerados via OpenAI (ver `06-imagens-e-memes.md`).
</content>
