/* Simulações locais: nenhum comando ou request sai do navegador. */
(() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  // A navegação local complementa a sidebar compartilhada com foco e teclado.
  const menu = $('#chapter-menu');
  const toggle = $('.menu-toggle');
  const overlay = $('.sidebar-overlay');
  let previousFocus;
  function closeMenu(restore = true) {
    menu.classList.remove('open'); overlay.classList.remove('open');
    menu.inert = true; toggle.setAttribute('aria-expanded', 'false');
    if (restore && previousFocus) previousFocus.focus();
  }
  toggle.addEventListener('click', () => {
    previousFocus = document.activeElement;
    menu.inert = false; menu.classList.add('open'); overlay.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true'); $('.sidebar-close').focus();
  });
  $('.sidebar-close').addEventListener('click', () => closeMenu());
  overlay.addEventListener('click', () => closeMenu());
  $$('.sidebar-link').forEach(a => a.addEventListener('click', () => {
    closeMenu(false);
    const id = a.getAttribute('href');
    if (id.startsWith('#')) {
      const target = $(id); target.tabIndex = -1;
      target.focus({ preventScroll: true });
    } else toggle.focus();
  }));
  document.addEventListener('keydown', event => {
    if (menu.inert) return;
    if (event.key === 'Escape') { event.preventDefault(); closeMenu(); }
    if (event.key === 'Tab') {
      const items = [...menu.querySelectorAll('a,button')];
      const first = items[0], last = items.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });
  // Leitura e cópia do código visível, sem reconstruir ou interpretar seu conteúdo.
  $$('.copy-code').forEach(button => button.addEventListener('click', async () => {
    const pre = button.closest('.code-block').querySelector('pre');
    try {
      await navigator.clipboard.writeText(pre.textContent);
      button.textContent = 'Copiado ✓';
    } catch {
      const selection = window.getSelection(), range = document.createRange();
      range.selectNodeContents(pre); selection.removeAllRanges(); selection.addRange(range);
      button.textContent = 'Selecionei: Ctrl/Cmd+C';
    }
    setTimeout(() => { button.textContent = 'Copiar'; }, 2500);
  }));
  $$('.decision').forEach(quiz => {
    quiz.querySelectorAll('[data-choice]').forEach(button => button.addEventListener('click', () => {
      quiz.querySelectorAll('[data-choice]').forEach(option => {
        option.removeAttribute('data-result'); option.setAttribute('aria-pressed', 'false');
      });
      const correct = button.dataset.choice === 'true';
      button.dataset.result = correct ? 'correct' : 'wrong';
      button.setAttribute('aria-pressed', 'true');
      quiz.querySelector('.feedback').textContent = (correct ? '✓ Isso! ' : 'Ainda não. ') + quiz.dataset.explanation + (correct ? '' : ' Tente outra alternativa.');
    }));
  });
  const dockerStates = [
    ['Não criado', 'Só temos o pacote da imagem.', 'Ainda não criado', 'Nenhum registro.', 'Imagem não é container: baixar o pacote ainda não colocou o PostgreSQL para executar.', false],
    ['A · executando', 'PostgreSQL pronto para conexões.', 'gestorpro-pgdata', 'Nenhum registro ainda.', 'Criamos o container A com um volume nomeado conectado. A aplicação pode se conectar pela porta publicada.', true],
    ['A · executando', 'Aceita consultas e alterações.', '1 · TechDistrib', 'Registro gravado no volume.', 'Um INSERT foi executado. O registro está nos arquivos do PostgreSQL, guardados no volume.', true],
    ['A · parado', 'Sem serviço para receber conexões.', '1 · TechDistrib', 'Registro continua guardado.', 'Parar interrompe o processo. Não remove o container nem seu volume. O cadastro continua lá, mas o serviço não responde.', false],
    ['A · executando', 'Podemos consultar novamente.', '1 · TechDistrib', 'Mesmo registro, mesmo volume.', 'Iniciar o mesmo container reabre o banco. Um SELECT encontra o cadastro que já existia.', true],
    ['A · removido', 'A instância antiga não existe mais.', '1 · TechDistrib', 'Volume nomeado preservado.', 'Neste cenário, removemos somente o container. O volume nomeado continua existindo. Isso é diferente de apagar o volume.', false],
    ['B · executando', 'Nova instância, mesma imagem.', '1 · TechDistrib', 'Mesmo volume conectado ao B.', 'Recriamos usando a mesma versão e o mesmo volume. O PostgreSQL lê os dados existentes. Não houve novo cadastro.', true]
  ];
  let dockerIndex = 0;
  function paintDocker() {
    const [container,cn,volume,vn,caption,running] = dockerStates[dockerIndex];
    $('[data-container]').textContent=container; $('[data-container-note]').textContent=cn;
    $('[data-volume]').textContent=volume; $('[data-volume-note]').textContent=vn;
    $('[data-docker-caption]').textContent=caption;
    $('#container-card').dataset.running=String(running);
    $('[data-docker-step]').textContent=`${dockerIndex + 1} / ${dockerStates.length}`;
    $('[data-docker-prev]').disabled=dockerIndex===0;
    $('[data-docker-next]').disabled=dockerIndex===dockerStates.length-1;
  }
  $('[data-docker-prev]').addEventListener('click',()=>{dockerIndex=Math.max(0,dockerIndex-1);paintDocker();});
  $('[data-docker-next]').addEventListener('click',()=>{dockerIndex=Math.min(dockerStates.length-1,dockerIndex+1);paintDocker();});
  $('[data-docker-reset]').addEventListener('click',()=>{dockerIndex=0;paintDocker();});
  paintDocker();
  let rows;
  const initialRows = () => [{id:1,nome:'TechDistrib',telefone:'(83) 3333-1000'},{id:2,nome:'Papelaria Nordeste',telefone:'(83) 3333-4000'}];
  function paintRows(affected = []) {
    const body = $('#sql-rows'); body.replaceChildren();
    for (const row of rows) {
      const tr = document.createElement('tr');
      if (affected.includes(row.id)) tr.className='affected';
      for (const value of [row.id,row.nome,row.telefone]) {
        const td=document.createElement('td');td.textContent=String(value);tr.append(td);
      }
      body.append(tr);
    }
    if (!rows.length) {
      const tr=document.createElement('tr'), td=document.createElement('td');
      td.colSpan=3;td.textContent='Tabela vazia · 0 registros';tr.append(td);body.append(tr);
    }
  }
  function sqlPreview() {
    const operation=$('#sql-operation').value, all=$('#sql-scope').value==='all';
    const start={select:'SELECT * FROM fornecedores_treino',update:"UPDATE fornecedores_treino SET telefone = '(83) 3333-9999'",delete:'DELETE FROM fornecedores_treino'}[operation];
    $('#sql-preview').textContent=start+(all?'':' WHERE id = 1')+';';
    $('#sql-feedback').textContent='Antes de executar: quantas linhas você espera atingir?';
    paintRows();
  }
  $('#sql-scope').addEventListener('change',sqlPreview);
  $('#sql-operation').addEventListener('change',sqlPreview);
  $('#sql-run').addEventListener('click',()=>{
    const operation=$('#sql-operation').value, all=$('#sql-scope').value==='all';
    const affected=rows.filter(r=>all||r.id===1).map(r=>r.id);
    if(operation==='update') rows=rows.map(r=>affected.includes(r.id)?{...r,telefone:'(83) 3333-9999'}:r);
    if(operation==='delete') rows=rows.filter(r=>!affected.includes(r.id));
    paintRows(affected);
    const action={select:'encontrada(s). A consulta não alterou os registros',update:'alterada(s)',delete:'excluída(s)'}[operation];
    $('#sql-feedback').textContent=`${affected.length} linha(s) ${action}. ${all?'Sem WHERE, todas as linhas existentes participaram.':'O filtro selecionou somente id = 1, se existente.'}`;
  });
  $('#sql-reset').addEventListener('click',()=>{
    rows=initialRows();$('#sql-scope').value='one';$('#sql-operation').value='select';sqlPreview();
    $('#sql-feedback').textContent='Dois registros restaurados. Escolha uma operação e preveja o resultado.';
  });
  rows=initialRows();sqlPreview();
  // Cada passo é um estado completo: voltar/reiniciar nunca acumula registros.
  const requestCases={
    valid:[
      ['client','Um pedido de cadastro','O cliente envia POST /fornecedores com nome TechDistrib, sem id.',0,'Aguardando','Entrada: JSON com os dados do fornecedor.'],
      ['controller','JSON vira objeto','Spring encontra @PostMapping; @RequestBody preenche um Fornecedor.',0,'Aguardando','Controller chama service.cadastrar(fornecedor).'],
      ['service','O Service organiza','Nesta primeira volta, o Service repassa o fornecedor ao Repository.',0,'Aguardando','O Service chama repository.save(fornecedor).'],
      ['repository','Pedir a persistência','A implementação do Repository aciona JPA/Hibernate para persistir a entidade.',0,'Aguardando','O SQL será executado no PostgreSQL; ainda não mostramos uma linha gravada.'],
      ['database','Uma linha é gravada','PostgreSQL executa o INSERT e gera o ID. Aqui usamos 1 apenas como exemplo.',1,'ID 1 gerado','O volume passa a conter os dados do novo cadastro.'],
      ['controller','Voltar com o resultado','O retorno atravessa Repository e Service até o Controller; Spring serializa o objeto.',1,'201 Created','Saída: JSON do fornecedor com ID. O cliente recebe o resultado.']
    ],
    list:[
      ['client','Pedir a coleção','O cliente envia GET /fornecedores. O banco simulado já tem 1 fornecedor.',1,'Aguardando','GET não envia corpo JSON: ele só pede.'],
      ['controller','Encontrar o método','Spring encontra @GetMapping sem caminho extra; Controller chama service.listar().',1,'Aguardando','Nenhum objeto precisa ser convertido na entrada.'],
      ['service','Repassar a consulta','O Service chama repository.findAll().',1,'Aguardando','Consultar não altera nenhum registro.'],
      ['database','Ler as linhas','PostgreSQL executa um SELECT e devolve todas as linhas da tabela.',1,'Consulta concluída','O Repository transforma as linhas em uma List<Fornecedor>.'],
      ['controller','Responder com a lista','Spring serializa a lista em JSON, entre colchetes.',1,'200 OK','Saída: [ { "id": 1, "nome": "TechDistrib", ... } ]. Com a tabela vazia, seria [] e também 200.']
    ],
    remove:[
      ['client','Excluir um alvo','O cliente envia DELETE /fornecedores/1, sem corpo.',1,'Aguardando','O ID viaja na URL e diz qual fornecedor sai.'],
      ['controller','Ler a variável do caminho','@PathVariable recebe 1; Controller chama service.excluir(1).',1,'Aguardando','O método do Controller é void: não haverá corpo na resposta.'],
      ['service','Pedir a remoção','O Service chama repository.deleteById(1).',1,'Aguardando','O Repository aciona JPA/Hibernate.'],
      ['database','Uma linha sai','PostgreSQL executa o DELETE da linha com ID 1.',0,'Linha removida','Os outros fornecedores continuam na tabela.'],
      ['controller','Responder sem conteúdo','Spring devolve 204: deu certo e não há nada no corpo.',0,'204 No Content','Um GET desse ID agora devolve null, por enquanto.']
    ]
  };
  let requestIndex=0;
  function paintRequest(){
    const steps=requestCases[$('#request-case').value];
    const [layer,title,description,count,response,caption]=steps[requestIndex];
    $$('[data-layer]').forEach(node=>{node.classList.toggle('active',node.dataset.layer===layer);if(node.dataset.layer===layer)node.setAttribute('aria-current','step');else node.removeAttribute('aria-current');});
    $('#request-title').textContent=title;$('#request-description').textContent=description;
    $('#request-records').textContent=`${count} registro(s) no banco`;
    $('#request-response').textContent=response;$('#request-caption').textContent=caption;
    $('#request-step').textContent=`${requestIndex+1} / ${steps.length}`;
    $('#request-prev').disabled=requestIndex===0;$('#request-next').disabled=requestIndex===steps.length-1;
  }
  $('#request-case').addEventListener('change',()=>{requestIndex=0;paintRequest();});
  $('#request-next').addEventListener('click',()=>{requestIndex=Math.min(requestCases[$('#request-case').value].length-1,requestIndex+1);paintRequest();});
  $('#request-prev').addEventListener('click',()=>{requestIndex=Math.max(0,requestIndex-1);paintRequest();});
  $('#request-reset').addEventListener('click',()=>{requestIndex=0;paintRequest();});
  paintRequest();
})();
