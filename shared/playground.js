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
   ou (modo React — precisa dos vendors em shared/vendor/)
   <div class="playground" data-mode="react" data-title="...">
     <textarea data-pg="jsx"> const App = () => { ... } </textarea>
   </div>
   O código do aluno DEVE definir um componente `App`; o playground
   renderiza <App /> sozinho. React 18 UMD + Babel standalone locais
   (offline-first). JSX transpilado na hora; erros aparecem no painel.
   ========================================================= */
(function(){
  let SEQ = 0;
  const LABEL = { html:'HTML', css:'CSS', js:'JavaScript', jsx:'App.jsx' };

  /* base = pasta shared/ (derivada do src deste script) p/ achar os vendors */
  const SHARED_BASE = (() => {
    const s = document.querySelector('script[src*="playground.js"]');
    return s ? s.getAttribute('src').replace(/playground\.js.*$/, '') : '../../shared/';
  })();

  /* vendors carregados sob demanda, uma vez, só se a página tiver playground react */
  let vendorsPromise = null;
  function loadVendors(){
    if (vendorsPromise) return vendorsPromise;
    const add = (file) => new Promise((ok, fail) => {
      const el = document.createElement('script');
      el.src = SHARED_BASE + 'vendor/' + file;
      el.onload = ok; el.onerror = () => fail(new Error('não carregou ' + file));
      document.head.appendChild(el);
    });
    vendorsPromise = add('react.production.min.js')
      .then(() => add('react-dom.production.min.js'))
      .then(() => add('babel.min.js'));
    return vendorsPromise;
  }

  /* error boundary: erro de render do aluno vira mensagem, não página quebrada */
  let ErrorCatcher = null;
  function ensureErrorCatcher(){
    if (ErrorCatcher || typeof React === 'undefined') return;
    ErrorCatcher = class extends React.Component {
      constructor(p){ super(p); this.state = { err: null }; }
      static getDerivedStateFromError(err){ return { err }; }
      componentDidCatch(err){ if (this.props.onError) this.props.onError(err.message); }
      render(){ return this.state.err ? null : this.props.children; }
    };
  }

  /* o playground react mais recente recebe os console.log (efeitos rodam depois do run) */
  let reactLogSink = null;
  let consoleHooked = false;
  function hookConsole(){
    if (consoleHooked) return; consoleHooked = true;
    const orig = console.log;
    console.log = function(...a){
      if (reactLogSink) { try { reactLogSink(a); } catch(e){} }
      try { orig.apply(console, a); } catch(e){}
    };
  }

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

    let out, rconsole = null, reactRoot = null;
    if (mode === 'js') {
      out = document.createElement('div');
      out.className = 'pg-console';
      out.innerHTML = '<div class="ph">// a saída do console aparece aqui…</div>';
    } else if (mode === 'react') {
      out = document.createElement('div');
      out.className = 'pg-react';
      out.innerHTML = '<div class="pg-react-stage"><div class="ph">⚛️ carregando o React…</div></div>'
        + '<div class="pg-rerr" hidden></div>';
      rconsole = document.createElement('div');
      rconsole.className = 'pg-rconsole';
      rconsole.innerHTML = '<div class="ph">// console — os console.log aparecem aqui</div>';
      out.appendChild(rconsole);
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
      : mode === 'react'
      ? '⚛️ laboratório: brinque à vontade — mas o exercício de verdade é no VSCode 💪 (defina sempre um componente <b>App</b>)'
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
      } else if (mode === 'react') {
        const stage = out.querySelector('.pg-react-stage');
        const errBox = out.querySelector('.pg-rerr');
        const showErr = (msg) => { errBox.hidden = false; errBox.textContent = '💥 ' + msg; };
        errBox.hidden = true; errBox.textContent = '';
        const logLine = (parts) => {
          if (rconsole.querySelector('.ph')) rconsole.innerHTML = '';
          const fmt = (a) => { try { return typeof a === 'object' ? JSON.stringify(a) : String(a); } catch(e){ return String(a); } };
          const ln = document.createElement('div'); ln.className = 'ln';
          ln.textContent = parts.map(fmt).join(' ');
          rconsole.appendChild(ln); rconsole.scrollTop = rconsole.scrollHeight;
          while (rconsole.children.length > 40) rconsole.removeChild(rconsole.firstChild);
        };
        hookConsole();
        loadVendors().then(() => {
          rconsole.innerHTML = '<div class="ph">// console — os console.log aparecem aqui</div>';
          reactLogSink = logLine;   // este playground passa a receber os logs (inclusive dos efeitos)
          let compiled;
          try {
            compiled = Babel.transform(get('jsx'), { presets: [['react']] }).code;
          } catch (e) { showErr(e.message); return; }
          ensureErrorCatcher();
          if (!reactRoot) { stage.innerHTML = ''; reactRoot = ReactDOM.createRoot(stage); }
          try {
            const factory = new Function('React', 'ReactDOM', 'useState', 'useEffect',
              compiled + '\n; if (typeof App === "undefined") { throw new Error("Defina um componente chamado App (const App = () => { ... })"); } return App;');
            const App = factory(React, ReactDOM, React.useState, React.useEffect);
            reactRoot.render(React.createElement(ErrorCatcher, { onError: showErr }, React.createElement(App)));
          } catch (e) { showErr(e.message); }
        }).catch((e) => showErr('React não carregou (' + e.message + '). Confira shared/vendor/.'));
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
