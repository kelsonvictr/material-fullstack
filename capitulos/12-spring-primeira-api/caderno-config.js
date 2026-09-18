/* Mesmo motor do Cap 10, com uma folha livre e armazenamento separado. */
const CADERNO_CONFIG = {
  id: 'cap12',
  curso: 'Curso Fullstack · Programa AI',
  capitulo: 'Capítulo 12',
  titulo: 'Meu caderno de Spring',
  subtitulo: 'uma descoberta por vez',
  emoji: '🌱',
  stack: 'Spring · Docker · PostgreSQL',
  voltar: 'index.html',
  frase: 'O professor conduz. Você registra do seu jeito.<br><b>Programa AI · Prof. Kelson</b>',
  missoes: [
    {
      id: 'anotacoes', titulo: 'Minhas anotações',
      widgets: [{ tipo: 'texto', id: 'livre', linhas: 22, placeholder: '' }]
    },
    {
      id: 'rascunho', titulo: 'Meu espaço de rascunho',
      widgets: [{ tipo: 'desenho', id: 'livre', altura: 360, rotulo: 'Desenho livre', cores: [
        { cor: '#1d4ed8', rot: 'Caneta azul' },
        { cor: '#1f2937', rot: 'Caneta preta' },
        { cor: '#b45309', rot: 'Caneta laranja' }
      ] }]
    }
  ]
};
CadernoEngine.mount(document.getElementById('app'), CADERNO_CONFIG);
document.querySelector('.cad-texto').setAttribute('aria-label', 'Minhas anotações de Spring');
document.querySelector('[data-aluno]').setAttribute('aria-label', 'Seu nome');
document.querySelector('.cad-des-canvas').setAttribute('aria-label', 'Área de desenho livre; use as anotações em texto se preferir o teclado');
document.querySelectorAll('.cad-cor').forEach(button => button.setAttribute('aria-label', button.title));
