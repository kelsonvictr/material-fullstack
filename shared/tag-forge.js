/* =========================================================
   shared/tag-forge.js — "Forja de Tags"
   Animação didática (Motion via CDN) que mostra cada tag HTML
   VOAR do editor de código até o navegador e VIRAR o elemento
   real renderizado — com faíscas no "encaixe".

   Carregado como <script type="module">. Se a CDN do Motion
   falhar (ou prefers-reduced-motion), faz fallback: revela tudo
   instantaneamente, sem quebrar a página.

   Markup esperado (ver capitulos/01-html-css/index.html):
   <div class="forge" data-forge>
     <div class="forge-stage">
       <div class="forge-pane code"> ...
         <span class="brick" data-brick="0" data-msg="...">&lt;h1&gt;</span> ...
       </div>
       <div class="forge-pane browser"> ...
         <div class="fp-paint">
           <h1 data-paint="0">...</h1> ...
         </div>
       </div>
     </div>
     <div class="forge-hud">
       <button class="forge-btn" data-forge-play>▶ Renderizar</button>
       <span class="forge-msg"></span>
     </div>
   </div>
   ========================================================= */
const SPARK_COLORS = ['#f7b731', '#ff8a5c', '#61dafb', '#06d6a0', '#a78bfa'];
const FLY_MS = 920;     // duração do voo de cada tijolo
const PAINT_MS = 460;   // pausa após pintar o elemento

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const forges = document.querySelectorAll('[data-forge]');
  if (!forges.length) return;

  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  let animate = null;
  if (!reduce) {
    try {
      ({ animate } = await import('https://cdn.jsdelivr.net/npm/motion@11/+esm'));
    } catch (e) {
      console.warn('[tag-forge] Motion não carregou; usando fallback estático.', e);
    }
  }

  forges.forEach((forge) => setupForge(forge, animate));
})();

function setupForge(forge, animate) {
  const stage   = forge.querySelector('.forge-stage');
  const bricks  = [...forge.querySelectorAll('.brick[data-brick]')]
                    .sort((a, b) => (+a.dataset.brick) - (+b.dataset.brick));
  const paints  = new Map(
    [...forge.querySelectorAll('[data-paint]')].map((el) => [el.dataset.paint, el])
  );
  const msgEl   = forge.querySelector('.forge-msg');
  const playBtn = forge.querySelector('[data-forge-play]');
  let playing = false;

  // Sem Motion (fallback): mostra o botão como "ver resultado" e
  // simplesmente revela tudo de uma vez, sem voo.
  async function play() {
    if (playing) return;
    playing = true;
    reset();

    for (const brick of bricks) {
      const target = paints.get(brick.dataset.brick);
      brick.classList.remove('dim');
      if (msgEl) msgEl.textContent = brick.dataset.msg || '';

      if (animate && target) {
        await flyBrick(stage, brick, target, animate);
      }
      brick.classList.add('flew');
      if (target) {
        target.classList.add('painted');
        if (animate) sparkle(stage, target, animate);
      }
      await wait(animate ? PAINT_MS : 240);
    }

    if (msgEl) {
      msgEl.textContent = '✅ pronto! cada tag virou um pedaço da página. Isso é renderizar. 🪄';
    }
    bricks.forEach((b) => b.classList.remove('dim'));
    playing = false;
  }

  function reset() {
    bricks.forEach((b) => { b.classList.remove('flew'); b.classList.add('dim'); });
    paints.forEach((p) => p.classList.remove('painted'));
    forge.querySelectorAll('.brick-fly, .forge-spark').forEach((n) => n.remove());
  }

  playBtn?.addEventListener('click', play);

  // toca sozinho quando entra na tela (o aluno não precisa caçar botão)
  new IntersectionObserver((entries, obs) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { play(); obs.disconnect(); }
    });
  }, { threshold: 0.4 }).observe(forge);
}

/* Voa um clone do tijolo do editor até o elemento de destino,
   descrevendo um arco (keyframe do meio sobe um pouco). */
function flyBrick(stage, brick, target, animate) {
  return new Promise((resolve) => {
    const sRect = stage.getBoundingClientRect();
    const bRect = brick.getBoundingClientRect();
    const tRect = target.getBoundingClientRect();

    const fly = document.createElement('span');
    fly.className = 'brick-fly';
    fly.textContent = brick.textContent;
    fly.style.transform =
      `translate(${bRect.left - sRect.left}px, ${bRect.top - sRect.top}px)`;
    stage.appendChild(fly);

    const x0 = bRect.left - sRect.left;
    const y0 = bRect.top  - sRect.top;
    const x1 = tRect.left - sRect.left;
    const y1 = tRect.top  - sRect.top;
    const xm = x0 + (x1 - x0) * 0.5;
    const ym = y0 + (y1 - y0) * 0.5 - 30;  // arco para cima

    animate(fly, {
      transform: [
        `translate(${x0}px, ${y0}px) rotate(0deg) scale(1)`,
        `translate(${xm}px, ${ym}px) rotate(-8deg) scale(1.14)`,
        `translate(${x1}px, ${y1}px) rotate(0deg) scale(0.86)`,
      ],
      opacity: [1, 1, 0],
    }, { duration: FLY_MS / 1000, easing: [0.22, 1, 0.36, 1] });

    // resolve por tempo (robusto entre versões do Motion) e limpa o clone
    setTimeout(() => { fly.remove(); resolve(); }, FLY_MS);
  });
}

/* Pequena explosão de faíscas no ponto onde a tag "encaixou". */
function sparkle(stage, target, animate) {
  const sRect = stage.getBoundingClientRect();
  const tRect = target.getBoundingClientRect();
  const cx = tRect.left - sRect.left + Math.min(tRect.width, 120) / 2;
  const cy = tRect.top  - sRect.top + 18;

  for (let i = 0; i < 10; i++) {
    const s = document.createElement('span');
    s.className = 'forge-spark';
    s.style.left = cx + 'px';
    s.style.top  = cy + 'px';
    s.style.background = SPARK_COLORS[i % SPARK_COLORS.length];
    stage.appendChild(s);

    const angle = (Math.PI * 2) * (i / 10);
    const dist  = 30 + Math.random() * 42;
    animate(s, {
      transform: ['translate(0,0) scale(1)',
                  `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px) scale(0)`],
      opacity: [1, 0],
    }, { duration: 0.7, easing: 'ease-out' });
    setTimeout(() => s.remove(), 720);
  }
}
