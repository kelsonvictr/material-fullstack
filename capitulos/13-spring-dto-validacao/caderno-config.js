/* Mesmo motor do Cap 10 e do Cap 12, com uma folha livre e armazenamento separado. */
const CADERNO_CONFIG = {
  id: 'cap13',
  curso: 'Curso Fullstack · Programa AI',
  capitulo: 'Capítulo 13',
  titulo: 'Meu caderno de API profissional',
  subtitulo: 'o que entra, o que sai, o que é barrado',
  emoji: '🧾',
  stack: 'DTO · Validação · @ManyToOne',
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
document.querySelector('.cad-texto').setAttribute('aria-label', 'Minhas anotações do Cap 13');
document.querySelector('[data-aluno]').setAttribute('aria-label', 'Seu nome');
document.querySelector('.cad-des-canvas').setAttribute('aria-label', 'Área de desenho livre; use as anotações em texto se preferir o teclado');
document.querySelectorAll('.cad-cor').forEach(button => button.setAttribute('aria-label', button.title));
