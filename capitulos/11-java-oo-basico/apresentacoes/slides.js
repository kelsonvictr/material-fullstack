(() => {
  'use strict';
  const slides = [...document.querySelectorAll('.slide')];
  if (!slides.length) return;
  const prev = document.querySelector('#prev');
  const next = document.querySelector('#next');
  const index = document.querySelector('#slide-index');
  const counter = document.querySelector('#counter');
  const progress = document.querySelector('.progress');
  let current = 0;

  function fromHash() {
    const match = location.hash.match(/^#slide-(\d+)$/);
    return match ? Number(match[1]) - 1 : 0;
  }

  function show(value, writeHash = true) {
    current = Math.max(0, Math.min(slides.length - 1, value));
    slides.forEach((slide, position) => {
      slide.hidden = position !== current;
      if (position !== current) slide.querySelectorAll('details[open]').forEach(note => note.open = false);
    });
    prev.disabled = current === 0;
    next.disabled = current === slides.length - 1;
    index.value = String(current + 1);
    counter.textContent = `${current + 1} / ${slides.length}`;
    progress.setAttribute('aria-valuenow', String(current + 1));
    progress.firstElementChild.style.width = `${(current + 1) / slides.length * 100}%`;
    if (writeHash) history.replaceState(null, '', `#slide-${current + 1}`);
    window.scrollTo(0, 0);
  }

  document.body.classList.add('js');
  document.querySelector('.controls').hidden = false;
  document.querySelector('#print').hidden = false;
  prev.addEventListener('click', () => show(current - 1));
  next.addEventListener('click', () => show(current + 1));
  index.addEventListener('change', () => show(Number(index.value) - 1));
  window.addEventListener('hashchange', () => show(fromHash(), false));
  document.addEventListener('keydown', event => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.target.closest('select,input,textarea,summary,[contenteditable]')) return;
    const destinations = { ArrowRight:current + 1, ArrowLeft:current - 1, PageDown:current + 1, PageUp:current - 1, Home:0, End:slides.length - 1 };
    if (!(event.key in destinations)) return;
    event.preventDefault();
    show(destinations[event.key]);
  });
  document.querySelector('#print').addEventListener('click', () => window.print());
  const full = document.querySelector('#fullscreen');
  if (document.fullscreenEnabled) {
    full.hidden = false;
    full.addEventListener('click', async () => {
      try {
        if (document.fullscreenElement) await document.exitFullscreen();
        else await document.documentElement.requestFullscreen();
      } catch {
        document.querySelector('#status').textContent = 'Tela cheia indisponível neste navegador. A navegação continua funcionando.';
      }
    });
    document.addEventListener('fullscreenchange', () => { full.textContent = document.fullscreenElement ? 'Sair da tela cheia' : 'Tela cheia'; });
  }
  show(fromHash(), false);
})();
