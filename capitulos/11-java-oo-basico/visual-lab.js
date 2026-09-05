/* Laboratório vetorial interativo. Uma linha de tempo controlável por etapa. */
(() => {
  'use strict';
  const scenes = window.JAVA_VISUAL_SCENES;
  if (!scenes) return;
  const esc = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
  const text = (x, y, value, cls = '', anchor = 'start') => `<text x="${x}" y="${y}" class="${cls}" text-anchor="${anchor}">${esc(value)}</text>`;
  const rect = (x,y,w,h,cls='',r=16) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" class="${cls}"/>`;
  const card = (x,y,w,h,title,tag='') => rect(x,y,w,h,'vl-panel') + text(x+20,y+30,title,'vl-svg-title') + (tag ? text(x+20,y+52,tag,'vl-svg-small') : '');
  const duke = (x,y,w=100) => `<image href="./assets/decor/duke.png" x="${x}" y="${y}" width="${w}" height="${w*1.42}" class="vl-duke-image"/>`;
  const path = (d, cls='vl-link', id='') => `<path d="${d}" class="${cls}" ${id ? `id="${id}"` : ''} fill="none" marker-end="url(#vl-arrow)"/>`;
  const defs = `<defs>
    <linearGradient id="vl-surface" x2=".8" y2="1"><stop stop-color="#263148"/><stop offset="1" stop-color="#141a2b"/></linearGradient>
    <linearGradient id="vl-gold" x2="1" y2="1"><stop stop-color="#ffe8a3"/><stop offset="1" stop-color="#d58a34"/></linearGradient>
    <linearGradient id="vl-blue" x2="1" y2="1"><stop stop-color="#71e9e5"/><stop offset="1" stop-color="#4b99d4"/></linearGradient>
    <marker id="vl-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 Z" fill="#7be3d7"/></marker>
    <filter id="vl-shadow" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="8" stdDeviation="9" flood-color="#000" flood-opacity=".35"/></filter>
    <pattern id="vl-grid" width="32" height="32" patternUnits="userSpaceOnUse"><path d="M32 0H0V32" fill="none" stroke="#8dafdf" stroke-opacity=".07"/></pattern>
  </defs><rect width="1200" height="490" fill="url(#vl-grid)"/><ellipse cx="620" cy="445" rx="480" ry="24" fill="#000" opacity=".22"/>`;

  function factory(action) {
    return `${card(35,65,270,280,'Produto.java','A CLASSE · O MOLDE')}
      <g class="vl-blueprint">${rect(62,142,212,150,'vl-blueprint-box')}${text(80,173,'String nome;','vl-mono')}${text(80,211,'double preco;','vl-mono')}${text(80,249,'int estoque;','vl-mono')}</g>
      ${text(170,324,'descreve a estrutura','vl-svg-small','middle')}
      <path id="vl-blueprint-link" d="M305 116 C395 45 410 45 520 85" class="vl-link" fill="none" marker-end="url(#vl-arrow)"/>
      ${text(390,54,'instanciar','vl-svg-small','middle')}
      <g id="vl-object" filter="url(#vl-shadow)">
        <path d="M495 104L521 82H810L783 104Z" fill="#907043"/><path d="M783 104L810 82V331L783 354Z" fill="#483649"/>
        ${rect(495,104,288,250,'vl-object-shell')}${text(518,140,'Produto · objeto A','vl-svg-title')}
        ${text(518,161,'campos privados · estado','vl-svg-small')}
        ${rect(514,184,250,42,'vl-field')}${text(528,211,'nome','vl-mono')}<text id="vl-name" x="746" y="211" text-anchor="end" class="vl-value">Fone</text>
        ${rect(514,235,250,42,'vl-field')}${text(528,262,'preco','vl-mono')}<text id="vl-price" x="746" y="262" text-anchor="end" class="vl-value">80.0</text>
        ${rect(514,286,250,42,'vl-field')}${text(528,313,'estoque','vl-mono')}<text id="vl-stock" x="746" y="313" text-anchor="end" class="vl-value">2</text>
      </g>
      <g id="vl-cart"><path d="M477 365H793L778 381H477L460 350H445" stroke="#d4a15d" stroke-width="8" fill="none"/><circle cx="505" cy="392" r="12" fill="#111" stroke="#a6b8cc" stroke-width="5"/><circle cx="760" cy="392" r="12" fill="#111" stroke="#a6b8cc" stroke-width="5"/></g>
      <g id="vl-duke">${duke(328,239,110)}<ellipse cx="378" cy="257" rx="23" ry="7" fill="#fac468"/><path d="M360 254Q362 226 380 229Q398 232 398 254Z" fill="url(#vl-gold)"/>
        <g id="vl-hammer" transform="translate(438 240)"><rect x="-5" y="-7" width="10" height="66" rx="4" fill="#ad7040"/><rect x="-28" y="-19" width="57" height="25" rx="5" fill="#b9d8e3"/><path d="M-24 -16H21" stroke="#fff" stroke-width="3"/></g>
      </g>
      <g id="vl-reference">${rect(82,392,164,52,'vl-reference-box')}${text(164,425,'fone','vl-svg-title','middle')}${path('M246 418 C390 465 465 420 528 354')}${text(362,461,'referência · não uma cópia','vl-svg-small','middle')}</g>
      <g id="vl-args">${rect(358,88,115,44,'vl-packet')}${text(415,116,'"Fone"','vl-dark','middle')}${rect(365,142,102,42,'vl-packet')}${text(416,169,'80.0','vl-dark','middle')}${rect(378,194,74,40,'vl-packet')}${text(415,220,'2','vl-dark','middle')}</g>
      ${card(877,100,290,255,action === 'method' ? 'Mesa de cálculo' : 'Entrada / retorno','O QUE PASSA PELO MÉTODO')}
      <text id="vl-output" x="1022" y="222" text-anchor="middle" class="vl-big">—</text>
      <text id="vl-output-note" x="1022" y="268" text-anchor="middle" class="vl-svg-small">aguardando</text>
      <g id="vl-gate">${rect(824,148,28,150,'vl-gate')}${text(837,132,'regra','vl-svg-small','middle')}<path d="M824 162L852 187M824 203L852 228M824 245L852 270" stroke="#ffd39a" stroke-width="4"/></g>
      <g id="vl-packet">${rect(-44,-23,88,46,'vl-packet')}<text id="vl-packet-label" y="7" text-anchor="middle" class="vl-dark">80.0</text></g>
      <g id="vl-sparks">${Array.from({length:6},(_,i)=>`<path d="M${495+i*5} ${160-i*7}l${(i-3)*6} -18" stroke="#ffe2a1" stroke-width="4" stroke-linecap="round"/>`).join('')}</g>
      ${text(640,437,action === 'hammer' ? 'CONSTRUTOR: os dados iniciais entram' : action === 'carry' ? 'new: uma nova instância, ainda em criação' : 'MEMÓRIA · representação simplificada','vl-floor-label','middle')}`;
  }
  function execution() {
    return `${card(32,98,238,218,'Main.java','SEU CÓDIGO-FONTE')}${text(54,190,'println("Olá, Java!")','vl-mono')}<text id="vl-semicolon" x="242" y="190" class="vl-value">;</text>${text(54,267,'dentro do main','vl-svg-small')}
      ${card(322,120,226,170,'Compilador','CONFERE E TRADUZ')}
      <g id="vl-gears"><circle cx="397" cy="229" r="27" class="vl-gear"/><path d="M397 196V262M364 229H430M374 206L420 252M374 252L420 206" stroke="#8294b8" stroke-width="7"/></g>
      ${card(608,98,211,218,'Main.class','BYTECODE')}${text(632,181,'instruções para','vl-mono')}${text(632,208,'a máquina virtual','vl-mono')}${text(632,270,'não é o texto-fonte','vl-svg-small')}
      ${card(888,120,270,170,'JVM','MÁQUINA VIRTUAL JAVA')}${text(910,233,'executa o programa','vl-mono')}
      ${path('M270 215H320')}${path('M548 215H604')}${path('M819 215H884')}${path('M1020 292V353')}
      ${rect(757,356,401,99,'vl-console-box')}${text(778,383,'CONSOLE','vl-svg-small')}<text id="vl-console-text" x="778" y="422" class="vl-value">aguardando execução…</text>
      <g id="vl-file">${rect(-33,-35,66,70,'vl-packet')}${text(0,5,'{ }','vl-dark','middle')}</g>
      <g id="vl-stop">${rect(282,154,42,123,'vl-reject')}${text(303,225,'✕','vl-svg-title','middle')}</g>
      <g id="vl-exec-duke">${duke(98,340,90)}${text(215,399,'Escrever ≠ compilar ≠ executar','vl-floor-label')}</g>`;
  }
  function repository() {
    return `${path('M203 112C470 0 727 2 862 92','vl-link vl-faint')}${path('M203 396C442 478 751 487 862 349','vl-link vl-faint')}
      ${rect(35,83,166,58,'vl-reference-box')}${text(118,119,'teclado','vl-svg-title','middle')}${rect(35,368,166,58,'vl-reference-box')}${text(118,404,'mouse','vl-svg-title','middle')}
      ${card(252,77,318,286,'ProdutoService','LIST<PRODUTO> · REFERÊNCIAS')}
      <g id="vl-slots">${rect(280,166,262,67,'vl-field')}${text(298,194,'posição 0','vl-svg-small')}<text id="vl-slot-a" x="298" y="218" class="vl-value">→ objeto A</text>
      <g id="vl-slot-second">${rect(280,248,262,67,'vl-field')}${text(298,275,'posição 1','vl-svg-small')}${text(298,300,'→ objeto B','vl-value')}</g></g>
      <g id="vl-empty">${text(410,236,'lista vazia','vl-svg-title','middle')}</g>
      <g id="vl-link-a">${path('M543 202C708 202 718 131 859 131')}</g>
      <g id="vl-link-b">${path('M543 284C696 284 722 342 859 342')}</g>
      <g id="vl-object-a">${card(862,47,302,162,'Objeto A · Teclado')}${text(881,117,'estoque: 2','vl-value')}<text id="vl-id-a" x="881" y="162" class="vl-mono">id: null</text></g>
      <g id="vl-object-b">${card(862,262,302,162,'Objeto B · Mouse')}<text id="vl-b-stock" x="881" y="331" class="vl-value">estoque: 5</text><text id="vl-id-b" x="881" y="378" class="vl-mono">id: null</text></g>
      <g id="vl-scanner">${rect(275,161,272,76,'vl-scan',12)}</g>
      <g id="vl-found">${rect(589,381,216,52,'vl-reference-box')}${text(697,415,'encontrado','vl-svg-title','middle')}${path('M805 408L859 369')}</g>
      <g id="vl-service-duke">${duke(620,200,92)}<g id="vl-stamp">${rect(698,188,55,22,'vl-packet',5)}<rect x="719" y="163" width="12" height="28" rx="4" fill="#c68d45"/></g></g>
      <g id="vl-service-value">${rect(624,98,174,57,'vl-packet')}<text id="vl-query" x="711" y="134" class="vl-dark" text-anchor="middle">ids: 1 e 2</text></g>
      ${text(405,402,'A lista guarda caminhos para objetos.','vl-svg-small','middle')}${text(601,466,'A e B são etiquetas do desenho, não endereços de memória.','vl-floor-label','middle')}`;
  }

  const dialog = document.createElement('dialog'); dialog.className = 'vl-dialog'; dialog.setAttribute('aria-labelledby','vl-title');
  dialog.innerHTML = `<div class="vl-shell"><header class="vl-header"><div><span class="vl-kicker">PROGRAMA AI · LABORATÓRIO VISUAL</span><h2 id="vl-title"></h2></div><button type="button" class="vl-close" aria-label="Fechar laboratório">✕</button></header>
    <nav class="vl-tabs" aria-label="Escolher animação"></nav><div class="vl-body"><div class="vl-step-heading"><span class="vl-label"></span><h3></h3><span class="vl-manual-hint">Passe para o lado no celular para explorar a bancada.</span></div>
    <div class="vl-stage" tabindex="0" role="region" aria-label="Bancada visual; pode ser rolada horizontalmente"><svg viewBox="0 0 1200 490" role="img" aria-labelledby="vl-svg-title vl-svg-desc"><title id="vl-svg-title"></title><desc id="vl-svg-desc"></desc><g class="vl-art"></g></svg></div>
    <div class="vl-explanation"><div class="vl-caption"><b>TICO · DUKE NOS BASTIDORES</b><p></p><div class="vl-rule"></div></div><details class="vl-code"><summary>👀 Código desta etapa</summary><pre></pre></details></div>
    <p class="vl-limit"></p><div class="vl-question"><h4></h4><div></div><p role="status"></p></div></div>
    <footer class="vl-controls"><div class="vl-timeline" aria-label="Etapas da animação"></div><div class="vl-buttons"><button type="button" data-vl="back">← Etapa</button><button type="button" data-vl="play" class="vl-play">▶ Assistir</button><button type="button" data-vl="next">Etapa →</button><button type="button" data-vl="reset">↺ Recomeçar</button><button type="button" data-cap-audio></button><span class="vl-count"></span></div><p class="vl-status" role="status">Escolha Assistir. O avanço manual é silencioso.</p></footer></div>`;
  document.body.append(dialog);
  const $ = selector => dialog.querySelector(selector);
  let scene = 0, step = 0, elapsed = 0, playing = false, ended = false, audio = null, raf = 0, lastTime = 0, generation = 0, opener = null;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const set = (id, attr, value) => { const el = dialog.querySelector('#'+id); if(el) el.setAttribute(attr,String(value)); };
  const words = (id,value) => { const el = dialog.querySelector('#'+id); if(el) el.textContent=value; };
  const visible = (id,value) => set(id,'opacity',value ? 1 : 0);
  const clamp = n => Math.min(1,Math.max(0,n));
  const ease = n => 1-Math.pow(1-clamp(n),3);

  function paint(progress) {
    const p = reduce.matches ? 1 : clamp(progress), u=ease(p);
    const action = scenes[scene].steps[step].action;
    if(window.JAVA_VISUAL_EXTRA?.paint(scenes[scene].id,action,p,{set,words,visible})) return;
    if(scene===0) {
      const carry=action==='carry', hammer=action==='hammer', getter=action==='getter', reject=action==='reject', accept=action==='accept', method=action==='method';
      const exists=action!=='blueprint';
      visible('vl-object',exists); visible('vl-cart',carry); visible('vl-hammer',hammer); visible('vl-sparks',hammer && p>.25 && p<.75);
      visible('vl-reference',['reference','getter','reject','accept','method'].includes(action));
      visible('vl-args',hammer); visible('vl-gate',reject||accept); visible('vl-packet',getter||reject||accept);
      const built=!carry && (!hammer||p>.7);
      words('vl-name',built?'Fone':'null'); words('vl-stock',built?'2':'0');
      words('vl-price',!built?'0.0':(method || (accept&&p>.65))?'90.0':'80.0');
      set('vl-object','transform',carry?`translate(${-220*(1-u)} 0)`:hammer?`translate(0 ${Math.sin(p*Math.PI*8)*(1-p)*3})`:'translate(0 0)');
      set('vl-cart','transform',`translate(${-220*(1-u)} 0)`);
      set('vl-duke','transform',carry?`translate(${-95+u*95} ${Math.sin(p*22)*(1-p)*4})`:'translate(0 0)');
      set('vl-hammer','transform',`translate(438 240) rotate(${-45+Math.sin(p*Math.PI*8)*42})`);
      set('vl-sparks','transform',`translate(${p*12} ${-p*15})`);
      set('vl-args','transform',`translate(${u*320} ${u*94})`); set('vl-args','opacity',hammer ? 1-clamp((p-.55)*4):0);
      const line=dialog.querySelector('#vl-blueprint-link'); if(line) { const len=line.getTotalLength(); line.style.strokeDasharray=String(len); line.style.strokeDashoffset=String(len*(1-u)); }
      let px=980;
      if(getter) px=730+u*290;
      if(reject) px=p<.5?980-ease(p*2)*148:832+ease((p-.5)*2)*148;
      if(accept) px=980-u*264;
      set('vl-packet','transform',`translate(${px} 215)`); words('vl-packet-label',reject?'-10.0':accept?'90.0':'80.0');
      set('vl-packet','opacity',getter||reject ? 1 : accept&&p<.75 ? 1:0);
      words('vl-output',getter&&p>.7?'80.0':reject&&p>.6?'RECUSADO':accept&&p>.65?'ACEITO':method?(p>.55?'180.0':'90.0 × 2'):action==='reference'?'fone → A':'—');
      words('vl-output-note',getter?'leitura · estado preservado':reject?'80.0 continua no objeto':accept?'mesmo objeto · novo preço':method?'retorno · campos preservados':hammer?'parâmetros → campos':carry?'valores padrão, antes do construtor':'observe a instância');
      set('vl-gate','class',reject?'vl-gate-rejected':'');
    } else if(scene===1) {
      const actionIndex=['compile-error','compile-ok','bytecode','run'].indexOf(action);
      visible('vl-semicolon',actionIndex>0); visible('vl-stop',actionIndex===0);
      const positions=[[155,210],[270,450],[450,710],[710,1010]][actionIndex];
      set('vl-file','transform',`translate(${positions[0]+u*(positions[1]-positions[0])} ${actionIndex===3&&p>.6?215+(p-.6)*375:215})`);
      set('vl-gears','transform',`rotate(${u*120} 397 229)`);
      words('vl-console-text',actionIndex===3&&p>.7?'Olá, Java!':'aguardando execução…');
      set('vl-stop','transform',`translate(${actionIndex===0?Math.sin(p*24)*(1-p)*3:0} 0)`);
    } else {
      const registered=action!=='two', remove=action==='remove', found=['find','alias'].includes(action), alias=action==='alias';
      visible('vl-slots',registered); visible('vl-empty',!registered); visible('vl-link-a',registered&&!(remove&&p>.5)); visible('vl-link-b',registered); visible('vl-found',found); visible('vl-scanner',action==='find'); visible('vl-service-value',registered);
      visible('vl-slot-second',!(remove&&p>.5)); words('vl-slot-a',remove&&p>.5?'→ objeto B':'→ objeto A');
      if(remove) dialog.querySelector('#vl-link-b path').setAttribute('d',p>.5?'M543 202C696 202 722 342 859 342':'M543 284C696 284 722 342 859 342');
      words('vl-id-a',registered&&(action!=='register'||p>.3)?'id: 1':'id: null'); words('vl-id-b',registered&&(action!=='register'||p>.6)?'id: 2':'id: null');
      words('vl-b-stock',alias&&p>.55||remove?'estoque: 8':'estoque: 5');
      set('vl-scanner','transform',`translate(0 ${u*82})`);
      set('vl-found','opacity',found ? action==='find'?clamp((p-.5)*2):1:0);
      words('vl-query',action==='register'?'ids: 1 e 2':action==='find'?(p<.5?'id 1 ≠ 2':'id 2 = 2'):alias?(p>.55?'estoque: 8':'setEstoque(8)'):'remover(1L)');
      set('vl-stamp','transform',action==='register'?`translate(0 ${Math.sin(p*Math.PI*4)*14})`:'translate(0 0)');
      set('vl-object-b','transform',alias?`translate(0 0) scale(1)`:'translate(0 0)');
    }
  }

  function releaseAudio() {
    generation++;
    if(!audio) return;
    audio.onended=audio.onerror=audio.onplaying=null; audio.pause(); audio.removeAttribute('src'); audio.load(); audio.remove(); audio=null;
  }
  function pause(message='Pausado. Observe os dados; Assistir retoma do mesmo ponto.') {
    playing=false; cancelAnimationFrame(raf); lastTime=0; audio?.pause();
    $('[data-vl="play"]').textContent='▶ Assistir'; $('.vl-status').textContent=message;
  }
  function render(finalFrame=true) {
    pause('Avanço manual silencioso. Clique em Assistir para animar e narrar esta etapa.'); releaseAudio(); elapsed=0; ended=false;
    const s=scenes[scene], current=s.steps[step];
    $('.vl-body').scrollTop=0;
    $('#vl-title').textContent=s.title; $('.vl-step-heading h3').textContent=current.title; $('.vl-label').textContent=current.label;
    $('.vl-caption p').textContent=current.talk; $('.vl-rule').textContent=current.rule; $('.vl-limit').textContent=s.limit;
    $('#vl-svg-title').textContent=current.title; $('#vl-svg-desc').textContent=current.talk+' '+current.rule;
    const pre=$('.vl-code pre'); pre.replaceChildren();
    current.code.split('\n').forEach(line=>{const span=document.createElement('span');span.className=line.trim().startsWith('//')?'vl-comment':'vl-code-line';span.textContent=line+'\n';pre.append(span);});
    $('.vl-art').innerHTML=defs+(window.JAVA_VISUAL_EXTRA?.render(s.id,current.action) ?? (scene===0?factory(current.action):scene===1?execution():repository()));
    $('.vl-count').textContent=`${step+1} / ${s.steps.length}`;
    $('[data-vl="back"]').disabled=step===0; $('[data-vl="next"]').disabled=step===s.steps.length-1;
    $('.vl-timeline').replaceChildren();
    s.steps.forEach((v,i)=>{const b=document.createElement('button');b.type='button';b.textContent=String(i+1);b.title=v.title;b.setAttribute('aria-label',`Etapa ${i+1}: ${v.title}`);b.setAttribute('aria-current',i===step?'step':'false');b.addEventListener('click',()=>{step=i;render();});$('.vl-timeline').append(b);});
    dialog.querySelectorAll('[data-scene]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.scene)===scene)));
    const quiz=current.predict||s;
    $('.vl-question').hidden=!current.predict&&step!==s.steps.length-1;
    $('.vl-question h4').textContent=quiz.question; $('.vl-question > p').textContent=''; $('.vl-question > div').replaceChildren();
    quiz.choices.forEach((choice,i)=>{const b=document.createElement('button');b.type='button';b.textContent=choice;b.addEventListener('click',()=>{pause(current.predict?'Previsão registrada. Use Etapa → para revelar.':'Pausa para discutir a previsão.');$('.vl-question > p').textContent=(i===quiz.answer?'Isso! ':'Observe novamente: ')+quiz.feedback;});$('.vl-question > div').append(b);});
    paint(finalFrame?1:0);
  }
  function play() {
    if(playing) {pause();return;}
    document.dispatchEvent(new Event('visual-lab-start'));
    const s=scenes[scene];
    if(ended) {step=0;render(false);}
    playing=true; lastTime=0; $('[data-vl="play"]').textContent='Ⅱ Pausar';
    const muted=window.CAP_AUDIO.isMuted();
    const activeClip=window.VISUAL_LAB_AUDIO?.[`${scene}-${step}`]?.[0];
    const duration=Math.max(7000,(activeClip?.duration||7)*1000+700);
    let audioDone=muted||!activeClip;
    const id=generation;
    const tick=now=>{
      if(!playing||id!==generation) return;
      if(!lastTime)lastTime=now;
      elapsed+=Math.min(now-lastTime,120); lastTime=now; paint(elapsed/4200);
      if(elapsed>duration+15000&&!audioDone) {pause('A voz demorou a responder. Desligue o som para continuar visualmente.');releaseAudio();return;}
      if(elapsed>=duration&&audioDone) {
        if(s.steps[step].predict) {pause('Aposte antes de revelar! Escolha uma resposta abaixo da cena; depois use Etapa →.');$('.vl-question').scrollIntoView({block:'nearest'});return;}
        if(step<s.steps.length-1) {step++;render(false);play();} else {ended=true;pause('Animação concluída. Faça a previsão ou reveja uma etapa.');}
        return;
      }
      raf=requestAnimationFrame(tick);
    };
    const startClock=()=>{if(!playing||id!==generation)return;$('.vl-status').textContent=muted?'Som desligado. Pause a qualquer momento para explicar.':'Tico narrando · Pause congela o movimento e a voz.'; cancelAnimationFrame(raf);lastTime=0;raf=requestAnimationFrame(tick);};
    if(!muted&&activeClip) {
      if(!audio) {audio=new Audio('./assets/audio/visual-lab/audio/'+activeClip.file);audio.hidden=true;audio.dataset.visualLabAudio='true';dialog.append(audio);}
      audioDone=audio.ended;
      audio.onplaying=startClock;
      audio.onended=()=>{audioDone=true;};
      audio.onerror=()=>{pause('Áudio indisponível. Desligue o som para seguir visualmente ou tente outra vez.');releaseAudio();};
      if(audio.ended) startClock(); else audio.play().catch(()=>{if(id===generation&&playing)pause('O navegador não iniciou a voz. Clique em Assistir para tentar novamente.');});
    } else startClock();
  }

  scenes.forEach((s,i)=>{
    const tab=document.createElement('button');tab.type='button';tab.dataset.scene=String(i);tab.textContent=s.icon+' '+(s.tab||(i===0?'Objetos':i===1?'Execução':'Service'));tab.addEventListener('click',()=>{scene=i;step=0;render();});$('.vl-tabs').append(tab);
    const launch=document.createElement('button');launch.type='button';launch.className='vl-launch';launch.setAttribute('aria-haspopup','dialog');
    launch.innerHTML=`<span class="vl-launch-art"><img src="./assets/decor/duke.png" alt=""><span>${s.icon}</span></span><span><small>${esc(s.badge)} · ANIMAÇÃO EM TELA GRANDE</small><strong>${esc(s.title)}</strong><span>${esc(s.description)}</span><b>▶ Entrar no laboratório · com pausa</b></span><span class="vl-expand" aria-hidden="true">⤢</span>`;
    launch.addEventListener('click',()=>{opener=launch;scene=i;step=0;document.dispatchEvent(new Event('visual-lab-start'));render();dialog.showModal();document.body.classList.add('vl-modal-open');$('.vl-close').focus();});
    document.querySelector(s.target)?.after(launch);
    if(s.practice){
      const practice=document.createElement('div');practice.className='vl-practice';
      const heading=document.createElement('strong');heading.textContent='⌨️ Da animação para o IntelliJ · 5 minutos';
      const prompt=document.createElement('p');prompt.textContent=s.practice;
      const details=document.createElement('details');const summary=document.createElement('summary');summary.textContent='👀 Conferir depois de tentar';
      const pre=document.createElement('pre');s.solution.split('\n').forEach(line=>{const span=document.createElement('span');span.className=line.trim().startsWith('//')?'vl-comment':'vl-code-line';span.textContent=line+'\n';pre.append(span);});
      details.append(summary,pre);practice.append(heading,prompt,details);launch.after(practice);
    }
  });
  $('.vl-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('close',()=>{pause();releaseAudio();document.body.classList.remove('vl-modal-open');opener?.focus();});
  dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
  dialog.querySelectorAll('[data-vl]').forEach(b=>b.addEventListener('click',()=>{
    const action=b.dataset.vl;
    if(action==='play') {play();return;}
    step=action==='reset'?0:Math.max(0,Math.min(scenes[scene].steps.length-1,step+(action==='next'?1:-1)));render();
  }));
  document.addEventListener('cap-audio:change',()=>{if(dialog.open){pause('Som alterado. Clique em Assistir para continuar.');releaseAudio();elapsed=0;}});
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&playing)pause('Pausado porque você saiu da aba.');});
  reduce.addEventListener('change',()=>{pause();paint(1);});
  window.CAP_AUDIO.sync();
})();
