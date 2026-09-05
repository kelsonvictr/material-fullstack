/* Preferência deste capítulo e dispositivo. Primeira visita começa em silêncio. */
(() => {
  'use strict';
  const key = 'cap11:muted';
  let muted = true;
  try { const saved = localStorage.getItem(key); if (saved !== null) muted = saved !== 'false'; } catch {}
  function sync() {
    document.documentElement.dataset.capMuted = String(muted);
    document.querySelectorAll('[data-cap-audio]').forEach(button => {
      button.textContent = muted ? '🔇 Som desligado neste aparelho' : '🔊 Som ligado neste aparelho';
      button.setAttribute('aria-pressed', String(!muted));
    });
    const note = document.getElementById('cap-audio-note');
    if (note) note.textContent = muted
      ? 'Alunos: deixem desligado e acompanhem a voz no notebook do professor. Legendas e jogos continuam funcionando.'
      : 'Professor: as vozes tocam ao clicar em Assistir. Este botão controla todos os teatros deste capítulo.';
  }
  window.CAP_AUDIO = {
    isMuted: () => muted, sync,
    setMuted(value) {
      muted = Boolean(value);
      try { localStorage.setItem(key, String(muted)); } catch {}
      sync();
      document.dispatchEvent(new CustomEvent('cap-audio:change', { detail: { muted } }));
    }
  };
  document.addEventListener('click', event => {
    if (event.target.closest('[data-cap-audio]')) window.CAP_AUDIO.setMuted(!muted);
  });
  window.addEventListener('storage', event => {
    if (event.key === key || event.key === null) {
      muted = event.newValue !== 'false'; sync();
      document.dispatchEvent(new CustomEvent('cap-audio:change', { detail: { muted } }));
    }
  });
  sync();
})();
