# Regras do projeto GestorPRO
Sistema de gestão feito por um aluno do curso Fullstack (UNIESP).

## Stack permitida (NÃO use NADA fora desta lista)
- React com Vite (JavaScript puro — sem TypeScript)
- axios para TODA chamada HTTP (nunca fetch)
- react-router-dom: Routes, Route, Link, useParams, useNavigate
- Hooks permitidos: useState e useEffect — NENHUM outro
- CSS Modules (Arquivo.module.css + import styles)
  (nunca CSS global, styled-components ou Tailwind)
- NÃO instale nenhuma dependência nova

## Padrões do código
- Componente = arrow function com export default:
  const Nome = () => { ... }   (nunca function Nome() {})
- Páginas em src/pages/, componentes reutilizáveis em src/components/
- Formulários controlados: um useState por campo, value + onChange
  (nunca useRef, nunca biblioteca de formulário)
- Requisições com .then()/.catch() (não use async/await)
- A API é o json-server em http://localhost:3000
- Textos da interface em português do Brasil
- O módulo Clientes (src/pages/Cliente*.jsx) é O PADRÃO da casa:
  toda tela nova segue a estrutura dele

## O que NÃO fazer
- Não refatore nem "melhore" arquivos fora da tarefa pedida
- Não mude o db.json sem pedido explícito
- Não crie testes, README ou configurações extras sem pedido
