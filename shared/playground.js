/* =========================================================
   shared/playground.js — playground ao vivo
   Markup declarativo:
   <div class="playground" data-mode="web" data-title="...">
     <textarea data-pg="html"> ...código literal... </textarea>
     <textarea data-pg="css">  ...código literal... </textarea>
   </div>
   ou
   <div class="playground" data-mode="js" data-title="...">
     <textarea data-pg="js"> console.log('oi') </textarea>
   </div>
   ========================================================= */
(function(){
  let SEQ = 0;
  const LABEL = { html:'HTML', css:'CSS', js:'JavaScript' };

  function build(pg){
    const id = 'pg' + (++SEQ);
    pg.dataset.pgId = id;
    const mode = pg.dataset.mode || 'web';
    const title = pg.dataset.title || (mode === 'js' ? 'Playground JavaScript' : 'Playground ao vivo');

    // coleta editores na ordem em que aparecem
    const areas = [...pg.querySelectorAll('textarea[data-pg]')];
    const originals = areas.map(a => a.value);
    areas.forEach((a,i) => {
      a.classList.add('pg-code');
      if (i === 0) a.classList.add('active');
      a.spellcheck = false;
      a.setAttribute('autocomplete','off'); a.setAttribute('autocapitalize','off');
    });

    // barra
    const bar = document.createElement('div');
    bar.className = 'pg-bar';
    const tabsHtml = areas.map((a,i) =>
      `<button class="pg-tab${i===0?' active':''}" data-k="${a.dataset.pg}">${LABEL[a.dataset.pg]||a.dataset.pg}</button>`
    ).join('');
    bar.innerHTML =
      `<span class="pg-title">▶ ${title}</span>` + tabsHtml +
      `<button class="pg-btn pg-run">▶ Rodar</button>` +
      `<button class="pg-btn pg-reset">↺ Resetar</button>`;

    // corpo
    const body = document.createElement('div');
    body.className = 'pg-body';
    const editors = document.createElement('div');
    editors.className = 'pg-editors';
    areas.forEach(a => editors.appendChild(a));
    body.appendChild(editors);

    let out;
    if (mode === 'js') {
      out = document.createElement('div');
      out.className = 'pg-console';
      out.innerHTML = '<div class="ph">// a saída do console aparece aqui…</div>';
    } else {
      out = document.createElement('iframe');
      out.className = 'pg-preview';
      out.setAttribute('sandbox','allow-scripts');
      out.setAttribute('title','preview');
    }

    body.appendChild(out);
    pg.appendChild(bar);
    pg.appendChild(body);
    const hint = document.createElement('div');
    hint.className = 'pg-hint';
    hint.innerHTML = mode === 'js'
      ? '✏️ edite o código e veja o resultado na hora — roda no seu navegador, com segurança (sandbox)'
      : '✏️ edite o HTML/CSS e a prévia atualiza sozinha · depois, refaça no VSCode pra fixar 💪';
    pg.appendChild(hint);

    // tabs
    bar.querySelectorAll('.pg-tab').forEach(tab => {
      tab.onclick = () => {
        bar.querySelectorAll('.pg-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        areas.forEach(a => a.classList.toggle('active', a.dataset.pg === tab.dataset.k));
      };
    });

    const get = k => (areas.find(a => a.dataset.pg === k)?.value) || '';

    function run(){
      if (mode === 'js'){
        out.innerHTML = '';
        // Execução in-page (funciona em file:// e http). Captura console.log/erros.
        out.innerHTML = '';
        const code = get('js');
        const fmt = (a) => { try { return typeof a === 'object' ? JSON.stringify(a) : String(a); } catch(e){ return String(a); } };
        const append = (parts, cls) => {
          const ln = document.createElement('div');
          ln.className = 'ln' + (cls ? ' ' + cls : '');
          ln.textContent = parts.map(fmt).join(' ');
          out.appendChild(ln); out.scrollTop = out.scrollHeight;
        };
        const orig = { log: console.log, error: console.error, warn: console.warn };
        console.log = (...a) => { append(a); try{ orig.log.apply(console, a); }catch(e){} };
        console.error = (...a) => { append(a, 'err'); try{ orig.error.apply(console, a); }catch(e){} };
        console.warn = (...a) => { append(a); try{ orig.warn.apply(console, a); }catch(e){} };
        try {
          // eslint-disable-next-line no-new-func
          (new Function(code))();
        } catch (e) {
          append([e.message], 'err');
        } finally {
          console.log = orig.log; console.error = orig.error; console.warn = orig.warn;
        }
        if (!out.children.length) out.innerHTML = '<div class="ph">// (sem saída — use console.log para imprimir algo)</div>';
      } else {
        const doc = '<!DOCTYPE html><html><head><meta charset="UTF-8"><style>'
          + 'body{font-family:system-ui,Arial,sans-serif;margin:16px;color:#1a1a1a}'
          + get('css') + '</style></head><body>' + get('html') + '</body></html>';
        out.srcdoc = doc;
      }
    }

    // auto-run com debounce
    let t;
    areas.forEach(a => a.addEventListener('input', () => { clearTimeout(t); t = setTimeout(run, 600); }));
    // teclas: Tab insere 2 espaços
    areas.forEach(a => a.addEventListener('keydown', (e) => {
      if (e.key === 'Tab'){ e.preventDefault();
        const s=a.selectionStart, en=a.selectionEnd;
        a.value = a.value.slice(0,s) + '  ' + a.value.slice(en);
        a.selectionStart = a.selectionEnd = s + 2;
      }
    }));
    bar.querySelector('.pg-run').onclick = run;
    bar.querySelector('.pg-reset').onclick = () => {
      areas.forEach((a,i) => a.value = originals[i]); run();
    };

    // roda quando entra na tela (1ª vez)
    new IntersectionObserver((es,obs)=>{
      es.forEach(e=>{ if(e.isIntersecting){ run(); obs.disconnect(); } });
    },{threshold:.1}).observe(pg);
  }

  function initPlaygrounds(root){
    (root||document).querySelectorAll('.playground:not([data-pg-id])').forEach(build);
  }
  document.addEventListener('DOMContentLoaded', () => initPlaygrounds());
  window.initPlaygrounds = initPlaygrounds;
})();
