/* Parte 0 · Como a web conversa — player fluxo a fluxo e dois labs locais.
   Nada sai do navegador: o filme é um mp4 local e os labs são simulações. */
(() => {
  'use strict';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  /* ---------- Player fluxo a fluxo ----------
     Fronteiras espelhadas de tooling/hyperframes/jornada-http/index.html.
     Sem autoplay: cada fluxo toca só quando alguém aperta ▶ e pausa sozinho no fim. */
  const FLUXOS = [
    { n: 1, start: 0, end: 18, title: 'URL e DNS' },
    { n: 2, start: 18, end: 40, title: 'O navegador pede a página' },
    { n: 3, start: 40, end: 61, title: 'O frontend só mostra telas' },
    { n: 4, start: 61, end: 97, title: 'Requisição até a API e o banco' },
    { n: 5, start: 97, end: 118, title: 'A resposta volta' },
    { n: 6, start: 118, end: 140, title: 'Quando o pedido vem errado' }
  ];
  const players = [];

  function buildPlayer(box) {
    const video = $('video', box);
    const only = box.dataset.only ? box.dataset.only.split(',').map(Number) : FLUXOS.map(f => f.n);
    const list = FLUXOS.filter(f => only.includes(f.n));
    video.removeAttribute('controls');
    video.autoplay = false; video.loop = false; video.muted = true;
    let index = 0, playing = false, raf = 0;

    const stage = document.createElement('div'); stage.className = 'fp-stage';
    video.replaceWith(stage); stage.append(video);
    const bigPlay = document.createElement('button');
    bigPlay.type = 'button'; bigPlay.className = 'fp-big'; bigPlay.setAttribute('aria-label', 'Tocar fluxo');
    bigPlay.textContent = '▶'; stage.append(bigPlay);

    const chips = document.createElement('div'); chips.className = 'fp-chips'; chips.setAttribute('role', 'group');
    chips.setAttribute('aria-label', 'Escolher fluxo');
    list.forEach((f, i) => {
      const b = document.createElement('button'); b.type = 'button';
      b.innerHTML = `<b>${f.n}</b><span>${f.title}</span>`;
      b.addEventListener('click', () => select(i, true));
      chips.append(b);
    });

    const bar = document.createElement('div'); bar.className = 'fp-bar';
    bar.innerHTML = `
      <button type="button" data-a="prev" aria-label="Fluxo anterior">◀ Anterior</button>
      <button type="button" data-a="play" class="fp-play">▶ Tocar fluxo</button>
      <button type="button" data-a="again" aria-label="Repetir este fluxo">↺ Repetir</button>
      <button type="button" data-a="next" aria-label="Próximo fluxo">Próximo ▶</button>
      <label class="fp-speed">Velocidade <select aria-label="Velocidade do filme">
        <option value="0.75">0,75×</option><option value="1" selected>1×</option><option value="1.25">1,25×</option></select></label>
      <button type="button" data-a="full" aria-label="Tela cheia">⛶ Tela cheia</button>`;
    const status = document.createElement('p'); status.className = 'fp-status'; status.setAttribute('aria-live', 'polite');
    const progress = document.createElement('div'); progress.className = 'fp-progress';
    progress.innerHTML = '<i></i>';
    box.append(progress, chips, bar, status);
    box.tabIndex = 0;

    const cur = () => list[index];
    const playBtn = $('[data-a="play"]', bar);

    function paint() {
      $$('button', chips).forEach((b, i) => {
        b.classList.toggle('on', i === index);
        b.setAttribute('aria-pressed', String(i === index));
      });
      $('[data-a="prev"]', bar).disabled = index === 0;
      $('[data-a="next"]', bar).disabled = index === list.length - 1;
      playBtn.textContent = playing ? '⏸ Pausar' : '▶ Tocar fluxo';
      const f = cur();
      const t = video.currentTime;
      // O ▶ grande só aparece no começo do fluxo: pausado no fim, não cobre o quadro explicado.
      bigPlay.hidden = playing || t > f.start + 0.5;
      const done = t >= f.end - 0.1;
      const where = playing ? 'tocando…' : done ? 'terminou — explique e avance quando quiser' : 'pronto para tocar';
      status.textContent = `Fluxo ${f.n} de 6 · ${f.title} · ${where}`;
      const pct = Math.min(100, Math.max(0, (t - f.start) / (f.end - f.start) * 100));
      $('i', progress).style.width = pct + '%';
    }
    function seek(t) {
      try { video.currentTime = t; } catch { /* metadados ainda carregando */ }
    }
    function select(i, fromUser) {
      pause();
      index = Math.max(0, Math.min(list.length - 1, i));
      seek(cur().start + 0.01);
      paint();
      if (fromUser) box.focus({ preventScroll: true });
    }
    function tick() {
      const f = cur();
      if (video.currentTime >= f.end - 0.06) {
        pause(); seek(f.end - 0.04);
      }
      paint();
      if (playing) raf = requestAnimationFrame(tick);
    }
    function play() {
      const f = cur();
      if (video.currentTime >= f.end - 0.1 || video.currentTime < f.start) seek(f.start + 0.01);
      players.forEach(p => { if (p !== api) p.pause(); });
      video.playbackRate = Number($('select', bar).value);
      const started = video.play();
      playing = true; paint();
      cancelAnimationFrame(raf); raf = requestAnimationFrame(tick);
      if (started && started.catch) started.catch(() => {
        playing = false; paint();
        status.textContent = 'Não foi possível tocar o vídeo aqui. Confira se o arquivo assets/video/jornada-http.mp4 existe.';
      });
    }
    function pause() {
      if (!video.paused) video.pause();
      playing = false; cancelAnimationFrame(raf); paint();
    }
    function toggle() { playing ? pause() : play(); }

    bigPlay.addEventListener('click', play);
    stage.addEventListener('click', e => { if (e.target === video) toggle(); });
    bar.addEventListener('click', e => {
      const a = e.target.closest('button')?.dataset.a;
      if (a === 'play') toggle();
      if (a === 'prev') select(index - 1);
      if (a === 'next') select(index + 1);
      if (a === 'again') { select(index); play(); }
      if (a === 'full') {
        if (document.fullscreenElement) document.exitFullscreen();
        else if (box.requestFullscreen) box.requestFullscreen().catch(() => {});
      }
    });
    $('select', bar).addEventListener('change', e => { video.playbackRate = Number(e.target.value); });
    box.addEventListener('keydown', e => {
      if (e.target.tagName === 'SELECT') return;
      if (e.key === ' ' || e.key === 'k') { e.preventDefault(); toggle(); }
      if (e.key === 'ArrowRight') { e.preventDefault(); select(index + 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); select(index - 1); }
      if (e.key === 'r') { select(index); play(); }
    });
    video.addEventListener('loadedmetadata', () => { if (!playing) seek(cur().start + 0.01); paint(); });
    video.addEventListener('pause', () => { if (playing) { playing = false; paint(); } });
    // Freio reserva: rAF congela em aba oculta; timeupdate continua disparando.
    video.addEventListener('timeupdate', () => {
      if (playing && video.currentTime >= cur().end - 0.06) { pause(); seek(cur().end - 0.04); }
    });
    video.addEventListener('error', () => {
      status.textContent = 'O vídeo não carregou. O texto das seções explica cada fluxo mesmo sem ele.';
    });

    const api = { pause };
    players.push(api);
    paint();
  }
  $$('.fluxo-player').forEach(buildPlayer);

  /* ---------- LAB H1 · Qual status volta? ---------- */
  const statusRounds = [
    { q: 'GET /fornecedores — a tabela existe, mas ainda não tem nenhum fornecedor.', ok: '200',
      why: 'A consulta funcionou e encontrou zero registros. A resposta é 200 com uma lista vazia [], não um erro.' },
    { q: 'POST /fornecedores com nome, CNPJ, categoria e telefone preenchidos.', ok: '201',
      why: 'Um registro novo foi criado. 201 Created, e o corpo devolve o fornecedor com o id gerado pelo banco.' },
    { q: 'POST /fornecedores com o nome em branco.', ok: '400',
      why: 'O pedido veio com dado inválido: quem pediu precisa corrigir. Nenhuma linha é gravada no banco.' },
    { q: 'GET /fornecedores/999 — nenhum fornecedor tem esse id.', ok: '404',
      why: 'O servidor entendeu o pedido, mas o recurso não existe. 404 Not Found.' },
    { q: 'DELETE /fornecedores/7 — o fornecedor existia e foi removido.', ok: '204',
      why: 'Deu certo e não há nada para devolver no corpo. 204 No Content.' },
    { q: 'PUT /fornecedores/7 com um telefone novo; o fornecedor 7 existe.', ok: '200',
      why: 'A atualização funcionou. 200 OK, com o fornecedor já alterado no corpo.' },
    { q: 'A API tentou gravar, mas o código tinha uma falha que ninguém previu e o método quebrou no meio.', ok: '500',
      why: 'O pedido estava certo; quem falhou foi o servidor. Família 5xx: 500 Internal Server Error.' }
  ];
  const wrongHints = {
    '200': '200 é sucesso “normal” de consulta ou atualização.',
    '201': '201 só aparece quando algo NOVO foi criado.',
    '204': '204 é sucesso sem corpo, típico do DELETE.',
    '400': '400 culpa o pedido: dados inválidos enviados por quem pediu.',
    '404': '404 diz que o recurso procurado não existe.',
    '500': '500 culpa o servidor: uma falha inesperada do lado da API.'
  };
  const statusLab = $('#status-lab');
  if (statusLab) {
    let r = 0, score = 0, answered = false;
    const opts = $('#status-options');
    ['200', '201', '204', '400', '404', '500'].forEach(code => {
      const b = document.createElement('button'); b.type = 'button'; b.dataset.code = code;
      b.className = 's-opt f' + code[0]; b.textContent = code;
      b.addEventListener('click', () => answer(b));
      opts.append(b);
    });
    function show() {
      answered = false;
      const round = statusRounds[r];
      $('#status-q').textContent = round.q;
      $$('button', opts).forEach(b => { b.removeAttribute('data-result'); b.setAttribute('aria-pressed', 'false'); });
      $('#status-feedback').textContent = 'Qual código a API deve responder?';
      $('#status-count').textContent = `Situação ${r + 1} de ${statusRounds.length} · acertos de primeira: ${score}`;
      $('#status-next').disabled = true;
    }
    function answer(b) {
      const round = statusRounds[r];
      const correct = b.dataset.code === round.ok;
      b.dataset.result = correct ? 'correct' : 'wrong'; b.setAttribute('aria-pressed', 'true');
      if (correct) {
        if (!answered) score++;
        $('#status-feedback').textContent = `✓ ${round.ok}! ${round.why}`;
        $('#status-next').disabled = r === statusRounds.length - 1;
        if (r === statusRounds.length - 1) $('#status-feedback').textContent += ` Fim: ${score} de ${statusRounds.length} de primeira.`;
      } else {
        $('#status-feedback').textContent = `Ainda não. ${wrongHints[b.dataset.code]} Pergunte: quem precisa agir, quem pediu ou o servidor? Tente outro código.`;
      }
      answered = true;
      $('#status-count').textContent = `Situação ${r + 1} de ${statusRounds.length} · acertos de primeira: ${score}`;
    }
    $('#status-next').addEventListener('click', () => { if (r < statusRounds.length - 1) { r++; show(); } });
    $('#status-reset').addEventListener('click', () => { r = 0; score = 0; show(); });
    show();
  }

  /* ---------- LAB H2 · Monte a requisição ---------- */
  const reqTasks = [
    { task: 'A tela de fornecedores abriu e precisa mostrar todos os cadastrados.', m: 'GET', p: '/fornecedores',
      res: '200 OK · [ { "id": 7, "nome": "TechDistrib", … } ]' },
    { task: 'Cadastrar a nova fornecedora Editora Farol.', m: 'POST', p: '/fornecedores',
      res: '201 Created · { "id": 8, "nome": "Editora Farol", … }' },
    { task: 'Abrir a ficha só do fornecedor de id 7.', m: 'GET', p: '/fornecedores/7',
      res: '200 OK · { "id": 7, "nome": "TechDistrib", … }' },
    { task: 'Trocar o telefone do fornecedor 7.', m: 'PUT', p: '/fornecedores/7',
      res: '200 OK · { "id": 7, "telefone": "(83) 3333-5000", … }' },
    { task: 'Excluir o fornecedor 7 do cadastro.', m: 'DELETE', p: '/fornecedores/7',
      res: '204 No Content · (sem corpo)' }
  ];
  const reqLab = $('#req-lab');
  if (reqLab) {
    let t = 0;
    const method = $('#req-method'), path = $('#req-path');
    const preview = () => { $('#req-preview').textContent = `${method.value} ${path.value}`; };
    function show() {
      $('#req-task').innerHTML = `<strong>Pedido ${t + 1} de ${reqTasks.length}:</strong> ${reqTasks[t].task}`;
      $('#req-feedback').textContent = 'Monte o pedido e envie.';
      $('#req-count').textContent = '';
      $('#req-next').disabled = true;
      preview();
    }
    function diagnose(task, m, p) {
      if (p === '/cadastrarFornecedor') return 'Em REST, a URL é um substantivo (o recurso). A ação “cadastrar” já está no método. Troque o caminho.';
      if (m === task.m && p === task.p) return null;
      if (m === task.m) {
        if (p === '/fornecedores/7' && task.p === '/fornecedores') {
          return task.m === 'POST'
            ? 'Quem cria ainda não tem id: o banco gera o número. POST vai para a coleção /fornecedores.'
            : '/fornecedores/7 aponta para um só fornecedor. Aqui o pedido é sobre a coleção inteira.';
        }
        return 'O método está certo, mas o caminho não. Para agir sobre UM fornecedor específico, o id vai na URL.';
      }
      const hints = {
        GET: 'GET só consulta: nada é criado, alterado ou apagado.',
        POST: 'POST cria um registro novo.',
        PUT: 'PUT atualiza um registro que já existe.',
        DELETE: 'DELETE exclui.'
      };
      return `${hints[m]} Qual verbo combina com a intenção do pedido?`;
    }
    [method, path].forEach(s => s.addEventListener('change', preview));
    $('#req-send').addEventListener('click', () => {
      const task = reqTasks[t];
      const problem = diagnose(task, method.value, path.value);
      if (problem) {
        $('#req-feedback').textContent = `✖ ${method.value} ${path.value} · ${problem}`;
      } else {
        $('#req-feedback').textContent = `✓ Resposta da API (simulada): ${task.res}`;
        $('#req-next').disabled = t === reqTasks.length - 1;
        $('#req-count').textContent = t === reqTasks.length - 1 ? 'Os cinco endpoints do capítulo! 🎉' : '';
      }
    });
    $('#req-next').addEventListener('click', () => { if (t < reqTasks.length - 1) { t++; show(); } });
    show();
  }
  /* ---------- LAB da seringa (seção 09 · injeção de dependência) ----------
     Avanço manual; a transição do êmbolo é CSS e some com prefers-reduced-motion. */
  const diLab = $('#di-lab');
  if (diLab) {
    const states = [
      { dose: '🗄️ FornecedorRepository', target: '⚙️ FornecedorService', slot: '', done: false,
        cap: 'O FornecedorService declarou no construtor que precisa de um FornecedorRepository. Ele não usa new: só pede.' },
      { dose: '🗄️ FornecedorRepository', target: '⚙️ FornecedorService', slot: 'repository ✓', done: true,
        cap: 'O Spring aplicou: criou o Repository e o entregou pelo construtor. Isso é injeção de dependência. Por baixo, é como new FornecedorService(repository), só que quem chama é o Spring.' },
      { dose: '⚙️ FornecedorService', target: '🎮 FornecedorController', slot: '', done: false,
        cap: 'Agora o Controller precisa do Service. Mesmo padrão: um campo private final e o construtor gerado pelo @RequiredArgsConstructor.' },
      { dose: '⚙️ FornecedorService', target: '🎮 FornecedorController', slot: 'service ✓', done: true,
        cap: 'Corrente montada: o Controller recebe o pedido HTTP e chama o Service, que usa o Repository. Nenhuma dessas classes criou a outra com new.' }
    ];
    let i = 0;
    const paint = () => {
      const st = states[i];
      diLab.dataset.injected = String(st.done);
      $('[data-di-dose]', diLab).textContent = st.dose;
      $('[data-di-target]', diLab).textContent = st.target;
      $('[data-di-slot]', diLab).textContent = st.slot || '…';
      $('[data-di-caption]', diLab).textContent = st.cap;
      $('[data-di-step]', diLab).textContent = `${i + 1} / ${states.length}`;
      $('[data-di-prev]', diLab).disabled = i === 0;
      $('[data-di-next]', diLab).disabled = i === states.length - 1;
    };
    $('[data-di-prev]', diLab).addEventListener('click', () => { if (i > 0) { i--; paint(); } });
    $('[data-di-next]', diLab).addEventListener('click', () => { if (i < states.length - 1) { i++; paint(); } });
    $('[data-di-reset]', diLab).addEventListener('click', () => { i = 0; paint(); });
    paint();
  }
})();
