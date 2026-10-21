/* Capítulo secreto: decifra o conteúdo com a senha (AES-256-GCM + PBKDF2) e liga a página.
   Nada sai do navegador; a senha só fica guardada aqui se o aluno marcar "Lembrar". */
(() => {
  'use strict';
  const LEMBRAR = 'secreto-12b:senha';
  const CHECK = 'secreto-12b:aceite';
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const cofre = JSON.parse($('#cofre-dados').textContent);
  const b64 = s => Uint8Array.from(atob(s), c => c.charCodeAt(0));
  const ler = k => { try { return localStorage.getItem(k); } catch { return null; } };
  const gravar = (k, v) => { try { v === null ? localStorage.removeItem(k) : localStorage.setItem(k, v); } catch { /* sem storage */ } };

  async function decifrar(senha) {
    const base = await crypto.subtle.importKey('raw', new TextEncoder().encode(senha.trim().toLowerCase()), 'PBKDF2', false, ['deriveKey']);
    const chave = await crypto.subtle.deriveKey({ name: 'PBKDF2', salt: b64(cofre.s), iterations: cofre.it, hash: 'SHA-256' },
      base, { name: 'AES-GCM', length: 256 }, false, ['decrypt']);
    const claro = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: b64(cofre.i) }, chave, b64(cofre.c));
    return new TextDecoder().decode(claro);
  }

  async function abrir(senha, lembrar) {
    const html = await decifrar(senha);
    if (lembrar) gravar(LEMBRAR, senha); else gravar(LEMBRAR, null);
    document.body.classList.remove('cofre-fechado');
    $('#cofre').remove();
    document.body.insertAdjacentHTML('afterbegin', html);
    ligarPagina();
    if (location.hash) { const alvo = document.getElementById(location.hash.slice(1)); if (alvo) alvo.scrollIntoView(); }
  }

  const form = $('#cofre-form'), msg = $('#cofre-msg'), campo = $('#cofre-senha');
  form.addEventListener('submit', async event => {
    event.preventDefault();
    msg.textContent = 'Conferindo…';
    try { await abrir(campo.value, $('#cofre-lembrar').checked); }
    catch { msg.textContent = 'Senha incorreta. Confira com o professor e tente de novo.'; campo.select(); }
  });
  const salva = ler(LEMBRAR);
  if (salva) abrir(salva, true).catch(() => { gravar(LEMBRAR, null); campo.focus(); });
  else campo.focus();

  function ligarPagina() {
    // Menu lateral com foco preso enquanto aberto, como nos capítulos de Spring.
    const menu = $('#chapter-menu'), toggle = $('.menu-toggle'), overlay = $('.sidebar-overlay');
    let anterior;
    const fechar = (restaurar = true) => {
      menu.classList.remove('open'); overlay.classList.remove('open');
      menu.inert = true; toggle.setAttribute('aria-expanded', 'false');
      if (restaurar && anterior) anterior.focus();
    };
    toggle.addEventListener('click', () => {
      anterior = document.activeElement;
      menu.inert = false; menu.classList.add('open'); overlay.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true'); $('.sidebar-close').focus();
    });
    $('.sidebar-close').addEventListener('click', () => fechar());
    overlay.addEventListener('click', () => fechar());
    $$('.sidebar-link').forEach(a => a.addEventListener('click', () => {
      fechar(false);
      const alvo = $(a.getAttribute('href'));
      if (alvo) { alvo.tabIndex = -1; alvo.focus({ preventScroll: true }); }
    }));
    document.addEventListener('keydown', event => {
      if (menu.inert) return;
      if (event.key === 'Escape') { event.preventDefault(); fechar(); }
      if (event.key === 'Tab') {
        const itens = $$('a,button', menu), primeiro = itens[0], ultimo = itens.at(-1);
        if (event.shiftKey && document.activeElement === primeiro) { event.preventDefault(); ultimo.focus(); }
        if (!event.shiftKey && document.activeElement === ultimo) { event.preventDefault(); primeiro.focus(); }
      }
    });
    $('#sair-cofre')?.addEventListener('click', () => { gravar(LEMBRAR, null); location.reload(); });

    // Copiar comandos e configurações (não há código Java para copiar neste capítulo).
    $$('.copy-code').forEach(botao => botao.addEventListener('click', async () => {
      const pre = botao.closest('.code-block').querySelector('pre');
      try { await navigator.clipboard.writeText(pre.textContent); botao.textContent = 'Copiado ✓'; }
      catch {
        const sel = getSelection(), range = document.createRange();
        range.selectNodeContents(pre); sel.removeAllRanges(); sel.addRange(range);
        botao.textContent = 'Selecionei: Ctrl/Cmd+C';
      }
      setTimeout(() => { botao.textContent = 'Copiar'; }, 2500);
    }));

    // Quizzes de decisão.
    $$('.decision').forEach(quiz => {
      $$('[data-choice]', quiz).forEach(botao => botao.addEventListener('click', () => {
        $$('[data-choice]', quiz).forEach(op => { op.removeAttribute('data-result'); op.setAttribute('aria-pressed', 'false'); });
        const certo = botao.dataset.choice === 'true';
        botao.dataset.result = certo ? 'correct' : 'wrong';
        botao.setAttribute('aria-pressed', 'true');
        $('.feedback', quiz).textContent = (certo ? '✓ Isso! ' : 'Ainda não. ') + quiz.dataset.explanation + (certo ? '' : ' Tente outra alternativa.');
      }));
    });

    // Checklist de aceite: fica salvo neste navegador.
    let marcados = {};
    try { marcados = JSON.parse(ler(CHECK) || '{}'); } catch { marcados = {}; }
    const caixas = $$('.aceite input[type="checkbox"]');
    const pintar = () => {
      const feitos = caixas.filter(c => c.checked).length;
      const placar = $('#aceite-placar');
      if (placar) placar.textContent = feitos === caixas.length ? `${feitos} de ${caixas.length} · ${placar.dataset.completo || 'tudo conferido! 🎉'}` : `${feitos} de ${caixas.length} conferidos`;
    };
    caixas.forEach(c => {
      c.checked = Boolean(marcados[c.id]);
      c.addEventListener('change', () => { marcados[c.id] = c.checked; gravar(CHECK, JSON.stringify(marcados)); pintar(); });
    });
    pintar();

    // Barra de progresso de leitura.
    const barra = $('.progress-bar');
    const progresso = () => {
      const total = document.documentElement.scrollHeight - innerHeight;
      if (barra) barra.style.width = (total > 0 ? (scrollY / total) * 100 : 0) + '%';
    };
    addEventListener('scroll', progresso, { passive: true });
    progresso();
  }
})();
