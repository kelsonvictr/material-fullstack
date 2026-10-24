/* Cap 13 · simulações locais: nenhum comando ou request sai do navegador. */
(() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  const el = (tag, cls, text) => { const n = document.createElement(tag); if (cls) n.className = cls; if (text !== undefined) n.textContent = text; return n; };

  // Navegação: mesma do Cap 12, com foco preso no menu e Escape para fechar.
  const menu = $('#chapter-menu'), toggle = $('.menu-toggle'), overlay = $('.sidebar-overlay');
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
    if (id.startsWith('#')) { const target = $(id); target.tabIndex = -1; target.focus({ preventScroll: true }); }
    else toggle.focus();
  }));
  document.addEventListener('keydown', event => {
    if (menu.inert) return;
    if (event.key === 'Escape') { event.preventDefault(); closeMenu(); }
    if (event.key === 'Tab') {
      const items = [...menu.querySelectorAll('a,button')], first = items[0], last = items.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });

  // Copiar exatamente o texto visível do bloco (as cores e destaques não entram).
  $$('.copy-code').forEach(button => button.addEventListener('click', async () => {
    const pre = button.closest('.code-block').querySelector('pre');
    try { await navigator.clipboard.writeText(pre.textContent); button.textContent = 'Copiado ✓'; }
    catch {
      const selection = window.getSelection(), range = document.createRange();
      range.selectNodeContents(pre); selection.removeAllRanges(); selection.addRange(range);
      button.textContent = 'Selecionei: Ctrl/Cmd+C';
    }
    setTimeout(() => { button.textContent = 'Copiar'; }, 2500);
  }));

  // Quizzes: errar é permitido; o feedback explica o motivo e convida a tentar de novo.
  $$('.decision').forEach(quiz => {
    quiz.querySelectorAll('[data-choice]').forEach(button => button.addEventListener('click', () => {
      quiz.querySelectorAll('[data-choice]').forEach(option => { option.removeAttribute('data-result'); option.setAttribute('aria-pressed', 'false'); });
      const correct = button.dataset.choice === 'true';
      button.dataset.result = correct ? 'correct' : 'wrong'; button.setAttribute('aria-pressed', 'true');
      quiz.querySelector('.feedback').textContent = (correct ? '✓ Isso! ' : 'Ainda não. ') + quiz.dataset.explanation + (correct ? '' : ' Tente outra alternativa.');
    }));
  });

  // ───────── Triagem: em qual DTO cada campo entra ─────────
  const triageAnswers = {
    id: ['saida', 'o banco gera o id; quem chama a API não escolhe. Ele só aparece no comprovante.'],
    nome: ['ambos', 'é um dado do cadastro: quem chama manda, e o comprovante mostra.'],
    preco: ['ambos', 'é um dado do cadastro, como o nome.'],
    criadoEm: ['saida', 'quem decide é o relógio do servidor. Não há vaga para ele no formulário.']
  };
  $('#triage-check').addEventListener('click', () => {
    const wrong = [];
    let empty = 0;
    $$('#triagem select').forEach(select => {
      const label = select.closest('label'), [answer, why] = triageAnswers[select.dataset.field];
      if (!select.value) { empty++; label.removeAttribute('data-result'); return; }
      const ok = select.value === answer;
      label.dataset.result = ok ? 'correct' : 'wrong';
      if (!ok) wrong.push(`${select.dataset.field}: ${why}`);
    });
    const feedback = $('#triage-feedback');
    if (empty) feedback.textContent = `Faltam ${empty} campo(s) para escolher.` + (wrong.length ? ' Já há ajustes a fazer: ' + wrong.join(' ') : '');
    else if (wrong.length) feedback.textContent = 'Ainda não. ' + wrong.join(' ') + ' Ajuste e confira de novo.';
    else feedback.textContent = '✓ Isso! id e criadoEm só saem; nome e preço entram e saem. Estoque e categoria seguem o mesmo caminho do nome.';
  });
  $('#triage-reset').addEventListener('click', () => {
    $$('#triagem select').forEach(select => { select.value = ''; select.closest('label').removeAttribute('data-result'); });
    $('#triage-feedback').textContent = 'Faça suas escolhas. Você pode conferir quantas vezes quiser.';
  });

  // ───────── LAB 01 · o mesmo JSON, sem e com DTO ─────────
  // Cada passo é um estado completo: voltar ou trocar de modo nunca acumula efeitos.
  const baseRows = [[1, 'Teclado Mecânico', '09/10 09:12'], [2, 'Monitor 27 pol', '09/10 09:15']];
  const allChips = ['id', 'nome', 'preco', 'estoque', 'categoria', 'criadoEm'];
  const neutral = {};
  const entityFields = [['id', '1', 'danger'], ['nome', 'Mouse Gamer'], ['preco', '89.90'], ['estoque', '2'], ['categoria', 'Periféricos'], ['criadoEm', '2000-01-01', 'danger']];
  const dtoCases = {
    sem: [
      { chips: neutral, title: 'O QUE O JAVA MONTA', form: [], note: 'Ainda nada: o JSON acabou de chegar.', rows: baseRows,
        caption: 'O JSON chega com seis campos. Dois não deveriam estar ali: id e criadoEm. No Cap 12, o @RequestBody convertia o JSON direto na entidade.' },
      { chips: { id: 'danger', criadoEm: 'danger', nome: 'used', preco: 'used', estoque: 'used', categoria: 'used' }, title: 'ENTIDADE Produto · INTEIRA', form: entityFields, rows: baseRows,
        caption: 'A entidade tem um campo para cada chave do JSON, inclusive id e criadoEm. Tudo entra, sem perguntas.' },
      { chips: { id: 'danger', criadoEm: 'danger', nome: 'used', preco: 'used', estoque: 'used', categoria: 'used' }, title: 'ENTIDADE Produto · INTEIRA', form: entityFields, rows: baseRows,
        caption: 'O save recebe um produto com id 1. Para o JPA, id preenchido significa “este já existe”: em vez de inserir uma linha nova, ele atualiza a linha 1.' },
      { chips: { id: 'danger', criadoEm: 'danger', nome: 'used', preco: 'used', estoque: 'used', categoria: 'used' }, title: 'ENTIDADE Produto · INTEIRA', form: entityFields,
        rows: [[1, 'Mouse Gamer', '01/01/2000', 'changed'], baseRows[1]],
        caption: 'O Teclado Mecânico sumiu. A linha 1 agora é o Mouse, com data do ano 2000. Ninguém pediu para apagar o teclado.',
        response: '201 Created · {"id": 1, "nome": "Mouse Gamer", ...} · diz “criado”, mas nada foi criado.' }
    ],
    com: [
      { chips: neutral, title: 'O QUE O JAVA MONTA', form: [], note: 'Ainda nada: o JSON acabou de chegar.', rows: baseRows,
        caption: 'O mesmo JSON, com os mesmos dois campos indevidos. Agora o @RequestBody preenche um ProdutoRequestDTO.' },
      { chips: { id: 'out', criadoEm: 'out', nome: 'used', preco: 'used', estoque: 'used', categoria: 'used' }, title: 'ProdutoRequestDTO · O FORMULÁRIO',
        form: [['nome', 'Mouse Gamer'], ['preco', '89.90'], ['estoque', '2'], ['categoria', 'Periféricos']], note: 'Sem vaga para id e criadoEm.', rows: baseRows,
        caption: 'O formulário tem só quatro vagas. id e criadoEm não têm onde entrar e são ignorados, sem erro.' },
      { chips: { id: 'out', criadoEm: 'out', nome: 'used', preco: 'used', estoque: 'used', categoria: 'used' }, title: 'Produto · ENTIDADE NOVA',
        form: [['id', 'vazio · o banco decide', 'empty'], ['nome', 'Mouse Gamer'], ['preco', '89.90'], ['estoque', '2'], ['categoria', 'Periféricos'], ['criadoEm', 'agora · 09/10 14:30']], rows: baseRows,
        caption: 'O Service faz new Produto() e copia as quatro vagas para essa entidade nova, sem id. Depois carimba criadoEm com o relógio do servidor.' },
      { chips: { id: 'out', criadoEm: 'out', nome: 'used', preco: 'used', estoque: 'used', categoria: 'used' }, title: 'Produto · ENTIDADE NOVA',
        form: [['id', '3 · gerado pelo banco'], ['nome', 'Mouse Gamer'], ['preco', '89.90'], ['estoque', '2'], ['categoria', 'Periféricos'], ['criadoEm', 'agora · 09/10 14:30']],
        rows: [...baseRows, [3, 'Mouse Gamer', '09/10 14:30', 'added']],
        caption: 'Sem id, o save insere uma linha nova e o banco gera o id 3. O Teclado continua intacto na linha 1.' },
      { chips: { id: 'out', criadoEm: 'out', nome: 'used', preco: 'used', estoque: 'used', categoria: 'used' }, title: 'ProdutoResponseDTO · O COMPROVANTE',
        form: [['id', '3'], ['nome', 'Mouse Gamer'], ['preco', '89.90'], ['estoque', '2'], ['categoria', 'Periféricos'], ['criadoEm', '2026-10-09T14:30']],
        rows: [...baseRows, [3, 'Mouse Gamer', '09/10 14:30', 'added']],
        caption: 'O comprovante volta com o que o servidor decidiu: o id novo e a data de agora. Quem chamou não escolheu nenhum dos dois.',
        response: '201 Created · {"id": 3, "nome": "Mouse Gamer", ..., "criadoEm": "2026-10-09T14:30:00"}' }
    ]
  };
  let dtoMode = 'sem', dtoIndex = 0;
  function paintDto() {
    const steps = dtoCases[dtoMode], s = steps[dtoIndex];
    $$('#dto-chips [data-chip]').forEach(chip => { const st = s.chips[chip.dataset.chip]; if (st) chip.dataset.state = st; else chip.removeAttribute('data-state'); });
    $('#dto-middle-title').textContent = s.title;
    const form = $('#dto-form'); form.replaceChildren();
    for (const [k, v, cls] of s.form) { const row = el('div', cls || ''); row.append(el('b', '', k), el('span', '', v)); form.append(row); }
    if (s.note) form.append(el('p', '', s.note));
    const body = $('#dto-rows'); body.replaceChildren();
    for (const [id, nome, criado, cls] of s.rows) { const tr = el('tr', cls || ''); [id, nome, criado].forEach(v => tr.append(el('td', '', String(v)))); body.append(tr); }
    $('#dto-caption').textContent = s.caption;
    $('#dto-response').textContent = s.response || '';
    $('#dto-step').textContent = `${dtoIndex + 1} / ${steps.length}`;
    $('#dto-prev').disabled = dtoIndex === 0; $('#dto-next').disabled = dtoIndex === steps.length - 1;
    $$('[data-dto-mode]').forEach(b => b.setAttribute('aria-checked', String(b.dataset.dtoMode === dtoMode)));
  }
  $$('[data-dto-mode]').forEach(b => b.addEventListener('click', () => { dtoMode = b.dataset.dtoMode; dtoIndex = 0; paintDto(); }));
  $('#dto-next').addEventListener('click', () => { dtoIndex = Math.min(dtoCases[dtoMode].length - 1, dtoIndex + 1); paintDto(); });
  $('#dto-prev').addEventListener('click', () => { dtoIndex = Math.max(0, dtoIndex - 1); paintDto(); });
  $('#dto-reset').addEventListener('click', () => { dtoIndex = 0; paintDto(); });
  // Setas do teclado alternam o modo, como num grupo de rádio.
  $('.mode-switch').addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault(); dtoMode = dtoMode === 'sem' ? 'com' : 'sem'; dtoIndex = 0; paintDto();
    $(`[data-dto-mode="${dtoMode}"]`).focus();
  });
  paintDto();

  // ───────── LAB 02 · segurança da porta ─────────
  // Respostas iguais às observadas na API real (Boot 4.1.1, antes do TratadorDeErros).
  const rules = [['nome', '@NotBlank', 'nome'], ['precoNull', '@NotNull', 'preco'], ['precoPos', '@Positive', 'preco'], ['estoqueNull', '@NotNull', 'estoque'], ['estoquePos', '@PositiveOrZero', 'estoque']];
  const doorCases = {
    valido: { json: '{\n  "nome": "Teclado Mecânico",\n  "preco": 320.00,\n  "estoque": 12\n}', fail: [], noValid: 201, label: 'Teclado Mecânico' },
    vazio: { json: '{\n  "nome": "",\n  "preco": 320.00,\n  "estoque": 12\n}', fail: ['nome'], noValid: 201, label: 'produto com nome vazio' },
    espacos: { json: '{\n  "nome": "   ",\n  "preco": 320.00,\n  "estoque": 12\n}', fail: ['nome'], noValid: 201, label: 'produto com nome só de espaços' },
    negativo: { json: '{\n  "nome": "Teclado Mecânico",\n  "preco": -5,\n  "estoque": 12\n}', fail: ['precoPos'], noValid: 201, label: 'produto custando -5' },
    semestoque: { json: '{\n  "nome": "Teclado Mecânico",\n  "preco": 320.00\n}', fail: ['estoqueNull'], noValid: 500, label: '' }
  };
  let doorRows = 2;
  function paintDoorIdle() {
    const c = doorCases[$('#door-case').value], useValid = $('#door-valid').checked;
    $('#door-json').textContent = c.json;
    const list = $('#door-rules'); list.replaceChildren(); list.classList.toggle('off', !useValid);
    for (const [id, ann, field] of rules) { const li = el('li'); li.dataset.rule = id; const code = el('code', '', ann); li.append(code, document.createTextNode(' · ' + field)); list.append(li); }
    $('#door-status').textContent = '—'; $('#door-body').textContent = ''; $('#door-db').textContent = '';
    $('#door-rows').textContent = `${doorRows} produto(s)`;
    $('#door-caption').textContent = useValid ? 'A prancheta está na porta. Antes de enviar: este JSON passa?' : 'Sem @Valid, a prancheta fica na gaveta. Antes de enviar: o que você espera?';
  }
  $('#door-send').addEventListener('click', () => {
    const c = doorCases[$('#door-case').value], useValid = $('#door-valid').checked;
    paintDoorIdle();
    if (useValid) {
      $$('#door-rules li').forEach(li => { li.dataset.state = c.fail.includes(li.dataset.rule) ? 'fail' : 'pass'; });
      if (c.fail.length) {
        $('#door-status').textContent = '400 Bad Request';
        $('#door-body').textContent = '{"status": 400, "error": "Bad Request", "path": "/produtos"}';
        $('#door-db').textContent = 'Nada foi gravado.';
        $('#door-caption').textContent = 'Barrado na porta. O Controller, o Service e o banco nem souberam do pedido. Mas repare no corpo: não diz qual campo falhou. É o problema da seção 11.';
      } else {
        doorRows++;
        $('#door-status').textContent = '201 Created'; $('#door-body').textContent = `{"id": ${doorRows}, "nome": "Teclado Mecânico", ...}`;
        $('#door-db').textContent = 'Gravado: Teclado Mecânico.';
        $('#door-caption').textContent = 'Todas as regras passaram. O pedido entrou e seguiu o caminho normal até o banco.';
      }
    } else if (c.noValid === 500) {
      $('#door-status').textContent = '500 Internal Server Error'; $('#door-body').textContent = '{"status": 500, "error": "Internal Server Error", "path": "/produtos"}';
      $('#door-db').textContent = 'Nada foi gravado: o banco recusou.';
      $('#door-caption').textContent = 'Ninguém conferiu na porta. O pedido chegou até o banco, que recusou porque a coluna estoque é NOT NULL. Recusar estava certo; 500 é o status errado.';
    } else {
      doorRows++;
      $('#door-status').textContent = '201 Created'; $('#door-body').textContent = `{"id": ${doorRows}, ...}`;
      $('#door-db').textContent = c.fail.length ? `⚠️ Gravado: ${c.label}.` : 'Gravado: Teclado Mecânico.';
      $('#door-caption').textContent = c.fail.length ? 'As regras estão escritas no DTO, mas sem @Valid ninguém conferiu. O lixo entrou no banco sem erro nenhum.' : 'Este JSON era válido, então entrou. Mas sem @Valid, um inválido teria entrado também.';
    }
    $('#door-rows').textContent = `${doorRows} produto(s)`;
  });
  $('#door-case').addEventListener('change', paintDoorIdle);
  $('#door-valid').addEventListener('change', paintDoorIdle);
  $('#door-reset').addEventListener('click', () => { doorRows = 2; $('#door-case').value = 'valido'; $('#door-valid').checked = true; $('#door-db').textContent = ''; paintDoorIdle(); $('#door-caption').textContent = 'Tabela restaurada com 2 produtos. Escolha um caso e clique em Enviar.'; });
  paintDoorIdle();

  // ───────── LAB 03 · bastidores com porta e Tratador ─────────
  const requestCases = {
    valid: [
      ['client', 'O pedido sai', 'POST /produtos com nome, preço, estoque e fornecedorId 1.', 'Aguardando', 'Entrada: JSON com os dados do formulário.'],
      ['door', 'A porta confere', '@Valid confere a prancheta do ProdutoRequestDTO: todas as regras passam.', 'Aguardando', 'Regra de formato: dá para conferir só olhando o JSON.'],
      ['controller', 'O Controller repassa', 'cadastrar(dto) chama service.cadastrar(dto). O Controller só conhece o DTO.', 'Aguardando', 'Nenhuma regra aqui: o Controller traduz a conversa HTTP.'],
      ['service', 'Montar a entidade', 'new Produto() e os quatro set copiam o formulário para um Produto novo, sem id.', 'Aguardando', 'O Service conhece os dois lados: o DTO e a entidade.'],
      ['repository', 'Buscar o fornecedor e salvar', 'FornecedorRepository encontra a TechDistrib; depois ProdutoRepository.save(produto).', 'Aguardando', 'Regra de dados: “o fornecedor existe?” só o banco responde.'],
      ['database', 'Uma linha é gravada', 'O PostgreSQL insere o produto com fornecedor_id 1 e gera o id.', 'Aguardando', 'A chave estrangeira confere: o fornecedor 1 existe.'],
      ['service', 'Montar o comprovante', 'paraResposta(salvo) monta o ProdutoResponseDTO, com fornecedorNome.', 'Aguardando', 'A resposta mostra só o que o DTO de saída tem.'],
      ['client', 'Resposta', 'O comprovante volta em JSON.', '201 Created', 'O Tratador não foi chamado: não houve erro.']
    ],
    invalid: [
      ['client', 'O pedido sai', 'POST /produtos com "nome": "".', 'Aguardando', 'O formulário está mal preenchido.'],
      ['door', '@NotBlank recusa', 'A prancheta falha no nome. O Spring lança MethodArgumentNotValidException.', 'Aguardando', 'O método do Controller nem começa a executar.'],
      ['handler', 'O Tratador responde', 'TratadorDeErros.tratarValidacao monta {"nome": "O nome é obrigatório"}.', 'Aguardando', 'Um tratador só, para todos os Controllers.'],
      ['client', 'Resposta', 'O cliente recebe o motivo, campo por campo.', '400 Bad Request', 'Controller, Service, Repository e banco ficaram de fora.']
    ],
    missing: [
      ['client', 'O pedido sai', 'GET /produtos/99999, sem corpo.', 'Aguardando', 'Sem formulário, não há nada para a porta conferir.'],
      ['controller', 'O Controller repassa', 'buscar(99999) chama service.buscar(99999).', 'Aguardando', 'O id veio na URL, pelo @PathVariable.'],
      ['service', 'Buscar ou falhar', 'buscarOuFalhar(99999) pede o produto ao Repository.', 'Aguardando', 'Regra de dados: “existe?” só o banco responde.'],
      ['repository', 'Perguntar ao banco', 'findById(99999) envia um SELECT.', 'Aguardando', 'O resultado volta numa caixa: o Optional.'],
      ['database', 'Nenhuma linha', 'Não há produto com id 99999.', 'Aguardando', 'A caixa volta vazia.'],
      ['service', 'A caixa está vazia', 'orElseThrow lança ResponseStatusException com 404. O return nem executa.', 'Aguardando', 'Quem traduz essa exceção é o próprio Spring.'],
      ['client', 'Resposta', '"message": "Produto não encontrado".', '404 Not Found', 'O paraResposta nem foi chamado: não havia comprovante para montar.']
    ],
    supplier: [
      ['client', 'O pedido sai', 'POST /produtos com dados válidos e "fornecedorId": 99999.', 'Aguardando', 'O formulário está bem preenchido.'],
      ['door', 'A porta deixa passar', '@NotNull no fornecedorId passa: o número está lá.', 'Aguardando', 'A porta não sabe se o fornecedor 99999 existe; ela só vê o JSON.'],
      ['controller', 'O Controller repassa', 'cadastrar(dto) chama service.cadastrar(dto).', 'Aguardando', 'Até aqui, tudo igual ao caso válido.'],
      ['service', 'Montar a entidade', 'new Produto() e os quatro set copiam o formulário. Falta ligar o fornecedor.', 'Aguardando', 'O produto existe só na memória.'],
      ['repository', 'Procurar o fornecedor', 'FornecedorRepository.findById(99999).', 'Aguardando', 'Uma pergunta ao banco.'],
      ['database', 'Nenhuma linha', 'Não existe fornecedor 99999.', 'Aguardando', 'A caixa volta vazia.'],
      ['service', 'Falhar antes de salvar', 'buscarFornecedorOuFalhar lança 404. O save nunca é chamado.', 'Aguardando', 'O produto da memória é descartado; nada vai para o banco.'],
      ['client', 'Resposta', '"message": "Fornecedor não encontrado".', '404 Not Found', 'Barrado pelo Service, não pela porta: precisava consultar dados.']
    ]
  };
  let requestIndex = 0;
  function paintRequest() {
    const steps = requestCases[$('#request-case').value], [layer, title, description, response, caption] = steps[requestIndex];
    const seen = new Set(steps.slice(0, requestIndex + 1).map(s => s[0])), used = new Set(steps.map(s => s[0]));
    const last = requestIndex === steps.length - 1;
    $$('[data-layer]').forEach(node => {
      const l = node.dataset.layer;
      node.classList.toggle('active', l === layer); node.classList.toggle('visited', seen.has(l) && l !== layer);
      node.classList.toggle('skipped', last && !used.has(l));
      if (l === layer) node.setAttribute('aria-current', 'step'); else node.removeAttribute('aria-current');
    });
    $('#request-title').textContent = title; $('#request-description').textContent = description;
    $('#request-response').textContent = response;
    $('#request-records').textContent = last ? `Peças que trabalharam: ${used.size} de 7.` : `Peças acionadas até agora: ${seen.size} de 7.`;
    $('#request-caption').textContent = caption;
    $('#request-step').textContent = `${requestIndex + 1} / ${steps.length}`;
    $('#request-prev').disabled = requestIndex === 0; $('#request-next').disabled = last;
  }
  $('#request-case').addEventListener('change', () => { requestIndex = 0; paintRequest(); });
  $('#request-next').addEventListener('click', () => { requestIndex = Math.min(requestCases[$('#request-case').value].length - 1, requestIndex + 1); paintRequest(); });
  $('#request-prev').addEventListener('click', () => { requestIndex = Math.max(0, requestIndex - 1); paintRequest(); });
  $('#request-reset').addEventListener('click', () => { requestIndex = 0; paintRequest(); });
  paintRequest();
})();
