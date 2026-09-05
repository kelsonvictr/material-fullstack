/* Oficinas de contraste: cada quadro pode ser reconstruído sem histórico. */
(() => {
  const scenes = window.JAVA_VISUAL_SCENES;
  scenes[0].steps.splice(4, 0,
    {title:'private: o atalho bate no vidro', action:'private-door', label:'ACESSO DIRETO → ERRO DE COMPILAÇÃO', speaker:'LLM',
      talk:'Duke tenta alterar o preço diretamente pelo Main. O campo é privado: esse acesso não compila. O vidro representa uma regra da linguagem, não uma proteção contra números negativos.',
      code:'// No Main, fora de Produto — não compila:\nfone.preco = 90.0;\n// preco tem acesso private em Produto.',
      rule:'private restringe acesso ao membro. Não é uma validação de preço e não é uma mensagem no console.'},
    {title:'A porta pública chama o método', action:'public-door', label:'PUBLIC → ENTRADA · IF → REGRA', speaker:'LLM',
      talk:'Agora Duke usa a porta pública: setPreco. A chamada pode compilar, mas o método ainda precisa conferir o valor. A porta permite entrar; o código da validação decide se o preço pode mudar.',
      code:'// No Main — acesso permitido:\nfone.setPreco(90.0);\n// Dentro de Produto:\n// if (preco < 0) { ... return; }\n// this.preco = preco;',
      rule:'Zoom na entrada do método: ainda não mostramos a atribuição. Nas próximas etapas, compare a leitura e os pedidos recusado e aceito.'}
  );
  scenes.push({id:'referencias', tab:'Crachás', title:'O crachá e o morador', icon:'🪪', badge:'OFICINA 04', target:'#vl-reference-intro',
    description:'Dois quartos, produtos iguais e um Duke entregador. Siga os caminhos antes de apostar qual estoque muda.',
    limit:'Quartos A e B são identidades visuais, não endereços reais. O crachá representa uma variável cujo valor é uma referência. Igualdade de campos não significa identidade de objetos.',
    question:'Depois de apelido = outro, apelido.setEstoque(9) altera qual objeto?', choices:['O objeto A, porque apelido nasceu apontando para A.','O objeto B, destino atual de apelido.'],answer:1,
    feedback:'A atribuição muda a referência guardada em apelido. A próxima chamada alcança B. Ela não transporta nem copia A.',
    practice:'No main, crie dois produtos iguais. Faça Produto apelido = primeiro; altere o estoque por apelido e leia pelos três nomes. Depois faça apelido = outro e repita. Preveja cada saída antes de executar.',
    solution:'Produto primeiro = new Produto("Fone", 80.0, 2);\nProduto outro = new Produto("Fone", 80.0, 2);\nProduto apelido = primeiro;\napelido.setEstoque(8);\nSystem.out.println(primeiro.getEstoque()); // 8\nSystem.out.println(outro.getEstoque()); // 2\napelido = outro;\napelido.setEstoque(9);\nSystem.out.println(primeiro.getEstoque()); // 8\nSystem.out.println(outro.getEstoque()); // 9',
    steps:[
      {title:'Mesma aparência. Dois moradores.',action:'twins',label:'DOIS new → DUAS IDENTIDADES',speaker:'LLM',talk:'Bem-vindos ao hotel de objetos! Dois comandos new criaram dois fones iguais por fora. Mas cada um tem seu próprio estado. Mesmo nome, mesmo preço, quartos diferentes.',code:'Produto primeiro = new Produto("Fone", 80.0, 2);\nProduto outro = new Produto("Fone", 80.0, 2);',rule:'Cada new cria uma instância. Os campos podem começar iguais sem os objetos serem o mesmo.'},
      {title:'Uma entrega só para o quarto A',action:'independent',label:'A MUDA · B CONTINUA',speaker:'LLM',talk:'Duke segue o crachá primeiro e entrega cinco unidades ao objeto A. O estoque de B continua dois. Produtos independentes não sincronizam seus campos por terem o mesmo nome.',code:'primeiro.setEstoque(5);\nSystem.out.println(outro.getEstoque()); // 2',rule:'A chamada usa a referência à esquerda do ponto para alcançar seu objeto.'},
      {title:'Um novo crachá. Nenhum novo morador.',action:'badge',label:'ATRIBUIR REFERÊNCIA ≠ CRIAR OBJETO',speaker:'LLM',talk:'Criamos apelido recebendo a referência de primeiro. Duke conecta outro crachá ao mesmo quarto A. Conte os quartos: continuam dois. Aqui não apareceu nenhum new.',code:'Produto apelido = primeiro;',rule:'primeiro e apelido agora guardam referências ao mesmo objeto A.'},
      {title:'Aposte antes da entrega!',action:'guess-alias',label:'PAUSA DA TURMA · SEM REVELAR AINDA',speaker:'LLM',talk:'O pacote oito está endereçado por apelido. Antes de eu entregar: ao ler o estoque por primeiro, veremos cinco ou oito? Siga os caminhos. Professor, essa aposta é da turma!',code:'// Próxima instrução, ainda não executada:\napelido.setEstoque(8);\n// Depois: primeiro.getEstoque() vale quanto?',rule:'O estado ainda é A: 5 e B: 2. A próxima etapa executa a alteração.',predict:{question:'Depois dessa chamada, primeiro.getEstoque() será…',choices:['5: cada variável tem seu próprio estoque.','8: os dois nomes alcançam A.'],answer:1,feedback:'Os dois caminhos chegam a A. Avance uma etapa para acompanhar a entrega.'}},
      {title:'Dois caminhos. Uma única mudança.',action:'shared',label:'MESMO OBJETO → MESMO ESTADO',speaker:'LLM',talk:'Entrega feita! Oito fica no objeto A. Ler por primeiro ou por apelido encontra esse mesmo oito. Não atualizamos dois fones: alteramos um objeto acessível por dois nomes.',code:'apelido.setEstoque(8);\nSystem.out.println(primeiro.getEstoque()); // 8\nSystem.out.println(apelido.getEstoque()); // 8\nSystem.out.println(outro.getEstoque()); // 2',rule:'O estado pertence ao objeto; os nomes são caminhos para alcançá-lo.'},
      {title:'Trocar o destino não move o morador',action:'redirect',label:'apelido = outro → NOVO CAMINHO',speaker:'LLM',talk:'Agora apelido recebe a referência de outro. Duke reconecta o crachá ao quarto B. Nenhum objeto se mudou: A continua com oito, B continua com dois. Só o caminho mudou.',code:'apelido = outro;\nSystem.out.println(apelido.getEstoque()); // 2\nSystem.out.println(primeiro.getEstoque()); // 8',rule:'Atribuir outra referência à variável não altera os campos dos objetos.'}
    ]});
  scenes.push({id:'encomenda',tab:'Métodos',title:'A central de encomendas do método',icon:'📨',badge:'OFICINA 05',target:'#vl-method-intro',
    description:'Duke entrega argumentos, separa parâmetro de campo e traz o retorno. O console tem sua própria estação!',
    limit:'Encomendas e esteiras são metáforas. A chamada acontece no mesmo programa. subtotal é um método extra para praticar; quantidade é o pedido recebido, não o estoque do objeto.',
    question:'double total = fone.subtotal(4); imprime 320.0 sozinho?',choices:['Sim: return escreve no console.','Não: guarda o retorno em total; println é outra chamada.'],answer:1,
    feedback:'Com preço 80.0, subtotal(4) devolve 320.0. A atribuição guarda esse valor. Só System.out.println(total) o imprime.',
    practice:'Adicione subtotal(int quantidade) dentro de Produto. No main, chame com 3 e com 4. Guarde os retornos em variáveis e só depois imprima. Confira também que o estoque permanece 2.',
    solution:'// Dentro de Produto — método extra:\npublic double subtotal(int quantidade) {\n    return preco * quantidade;\n}\n// Dentro do main:\nProduto fone = new Produto("Fone", 80.0, 2);\nfone.setNome("Headset");\ndouble total = fone.subtotal(3);\ndouble outroTotal = fone.subtotal(4);\nSystem.out.println(total); // 240.0\nSystem.out.println(outroTotal); // 320.0\nSystem.out.println(fone.getEstoque()); // 2',
    steps:[
      {title:'O argumento sai de quem chama',action:'dispatch',label:'CHAMADA → OBJETO → MÉTODO',speaker:'LLM',talk:'Tem encomenda! Chamamos setNome no objeto indicado por fone. Headset é o argumento: o valor enviado nesta chamada. Duke leva esse valor até a entrada do método.',code:'fone.setNome("Headset");',rule:'Argumento é o valor fornecido na chamada. fone identifica o objeto que recebe a chamada.'},
      {title:'Parâmetro: a bandeja tem nome',action:'parameter',label:'nome RECEBE "Headset"',speaker:'LLM',talk:'A bandeja nome é o parâmetro declarado no método. Ela recebe Headset. Repare no campo do objeto: ainda está Fone. Receber o argumento não é automaticamente atribuir ao campo.',code:'public void setNome(String nome) {\n    // Ao entrar: nome vale "Headset".\n    // O campo this.nome ainda vale "Fone".\n    this.nome = nome;\n}',rule:'Zoom antes da atribuição: parâmetro e campo são lugares distintos, mesmo com o mesmo nome.'},
      {title:'this: o endereço de quem está trabalhando',action:'this-write',label:'this.nome = nome → CAMPO RECEBE PARÂMETRO',speaker:'LLM',talk:'Agora a atribuição acontece. À direita, nome é o parâmetro. À esquerda, this ponto nome é o campo deste objeto. Duke entrega Headset ao campo. O método é void: termina sem devolver um valor.',code:'public void setNome(String nome) {\n    this.nome = nome;\n}',rule:'this indica o objeto atual. Este setter muda o estado e não retorna um valor.'},
      {title:'Outra chamada: um pedido de cálculo',action:'calculate',label:'subtotal(3) · ARGUMENTO NÃO É ESTOQUE',speaker:'LLM',talk:'Nova encomenda: subtotal recebe três no parâmetro quantidade. O preço é oitenta e o estoque continua dois. O cálculo usa oitenta vezes três. Ao guardar o retorno em total, já aparece algo no console?',code:'// Método extra dentro de Produto:\npublic double subtotal(int quantidade) {\n    return preco * quantidade;\n}\n// No main:\ndouble total = fone.subtotal(3);',rule:'Quantidade pedida: 3. Estoque do objeto: 2. Este método só calcula, não vende nem baixa estoque.',predict:{question:'Guardar o retorno em total já imprime o resultado?',choices:['Sim: return e println fazem a mesma coisa.','Não: ainda falta uma chamada para imprimir.'],answer:1,feedback:'return entrega a quem chamou; println imprime. Avance para seguir a viagem do resultado.'}},
      {title:'return: a encomenda faz a viagem de volta',action:'return-value',label:'240.0 → QUEM CHAMOU → total',speaker:'LLM',talk:'O resultado duzentos e quarenta volta para quem chamou e fica em total. O console continua sem saída. Return devolveu um valor; não imprimiu e não retirou nada dos campos.',code:'double total = fone.subtotal(3);\n// total vale 240.0. Nenhum println executado.',rule:'Este retorno é um double. O cálculo preserva preço 80.0 e estoque 2.'},
      {title:'println: agora o console recebe sua encomenda',action:'print-value',label:'IMPRIMIR É UMA NOVA AÇÃO',speaker:'LLM',talk:'Agora sim: chamamos println com total. Duzentos e quarenta aparece no console. As três tarefas ficaram separadas: o método calculou, a variável guardou e println imprimiu.',code:'System.out.println(total); // 240.0\nSystem.out.println(fone.getEstoque()); // 2',rule:'Retornar não é imprimir. A segunda linha também confirma que calcular não alterou o estoque.'}
    ]});

  const esc = s => String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
  const t=(x,y,s,c='vl-svg-title')=>`<text x="${x}" y="${y}" class="${c}">${esc(s)}</text>`;
  const box=(x,y,w,h,c='vl-panel')=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" class="${c}"/>`;
  const duke=(x,y,w=90)=>`<image href="./assets/decor/duke.png" x="${x}" y="${y}" width="${w}" height="${w*1.42}"/>`;
  const route=(id,d,c='')=>`<path id="${id}" d="${d}" class="vl-route ${c}" pathLength="1" fill="none" marker-end="url(#vl-arrow)"/>`;
  const parcel=(id,label)=>`<g id="${id}">${box(-53,-23,106,46,'vl-packet')}${t(-42,7,label,'vl-dark')}<path d="M-53 -12H53M0 -23V23" stroke="#7f512833" stroke-width="3"/></g>`;
  const room=(id,x,letter)=>`<g id="${id}"><ellipse cx="${x+133}" cy="382" rx="154" ry="22" fill="#0005"/><path d="M${x-8} 135L${x+130} 75L${x+278} 135Z" fill="${letter==='A'?'#3d7674':'#695a94'}"/>${box(x,135,270,230)}${t(x+22,168,'OBJETO '+letter)}${t(x+22,194,'Produto · "Fone"','vl-mono')}${box(x+20,215,230,112,'vl-field')}${t(x+38,243,'preço: 80.0','vl-mono')}${t(x+38,280,'estoque','vl-svg-small')}<text id="vx-stock-${letter}" x="${x+173}" y="294" class="vx-number">2</text></g>`;
  const badge=(id,x,y,name)=>`<g id="${id}" transform="translate(${x} ${y})"><path d="M40 0Q65 -37 90 0" fill="none" stroke="#b6c6dd" stroke-width="4"/>${box(0,0,158,62,'vl-reference-box')}<circle cx="18" cy="21" r="5" fill="#a3ecdf"/>${t(30,40,name,'vl-mono')}</g>`;
  function render(id,action) {
    if(id==='referencias')return `${t(40,38,'HOTEL DE OBJETOS','vx-eyebrow')}${t(775,38,'MESMA APARÊNCIA ≠ MESMA IDENTIDADE','vl-svg-small')}
      ${room('vx-room-a',520,'A')}${room('vx-room-b',865,'B')}
      ${route('vx-wire-first','M208 117C365 117 360 180 520 180')}${route('vx-wire-other','M208 233C450 233 470 70 825 70Q850 70 865 180','vx-purple')}
      ${route('vx-wire-alias','M208 352C380 352 360 300 520 300')}
      ${badge('vx-first',50,88,'primeiro')}${badge('vx-other',50,204,'outro')}${badge('vx-alias',50,323,'apelido')}
      <g id="vx-courier">${duke(270,265,92)}${parcel('vx-delivery','8')}</g>
      <g id="vx-beacon"><circle cx="655" cy="278" r="48" fill="none" stroke="#a5f9df" stroke-width="3"/><circle cx="655" cy="278" r="61" fill="none" stroke="#a5f9df55" stroke-width="2"/></g>
      ${box(443,414,706,51,'vl-console-box')}<text id="vx-readout" x="465" y="447" class="vl-value"></text>`;
    if(id==='encomenda')return `${t(35,35,'CENTRAL DE ENCOMENDAS','vx-eyebrow')}
      ${box(32,82,250,285)}${t(54,117,'QUEM CHAMA')}${t(54,146,'Main · fone aponta para A','vl-svg-small')}${box(51,210,212,103,'vl-field')}${t(69,237,'variável total','vl-svg-small')}<text id="vx-total" x="69" y="279" class="vl-value">ainda não atribuída</text>
      ${box(434,65,450,306)}${t(458,99,'OBJETO A · Produto')}${t(458,126,'this = este objeto','vl-svg-small')}
      ${box(451,153,192,95,'vl-blueprint-box')}${t(465,180,'PARÂMETRO','vl-svg-small')}<text id="vx-param-label" x="465" y="207" class="vl-mono">nome</text><text id="vx-param-value" x="465" y="235" class="vl-value"></text>
      ${box(673,153,193,95,'vl-field')}${t(687,180,'CAMPO this.nome','vl-svg-small')}<text id="vx-name" x="687" y="225" class="vl-value">Fone</text>
      ${t(458,291,'preco: 80.0','vl-mono')}${t(669,291,'estoque: 2','vl-mono')}<text id="vx-calculation" x="458" y="337" class="vl-value"></text>
      ${box(947,92,221,269,'vl-console-box')}${t(968,129,'CONSOLE')}${t(968,157,'só após println','vl-svg-small')}<text id="vx-console" x="968" y="225" class="vl-value">sem saída</text><text id="vx-console-stock" x="968" y="270" class="vl-value"></text>
      ${route('vx-input-path','M282 183H432')}${route('vx-assign-path','M644 210H670')}${route('vx-return-path','M656 374C656 427 156 427 156 315')}${route('vx-print-path','M282 326C700 454 930 453 963 333')}
      <g id="vx-postman">${duke(312,239,92)}</g>${parcel('vx-envelope','Headset')}
      ${t(38,470,'ARGUMENTO → PARÂMETRO · CAMPO ≠ PARÂMETRO · RETORNO ≠ CONSOLE','vl-floor-label')}`;
    if(action==='private-door'||action==='public-door')return `${t(35,35,'A PORTARIA DO ENCAPSULAMENTO','vx-eyebrow')}
      ${box(35,88,260,220)}${t(57,125,'Main · outra classe')}${t(57,162,action==='private-door'?'fone.preco = 90.0':'fone.setPreco(90.0)','vl-mono')}
      ${box(698,79,457,309)}${t(731,118,'Produto · objeto A')}${box(890,162,236,126,'vl-field')}${t(914,199,'private preco','vl-mono')}${t(914,245,'80.0','vx-number')}
      <g id="vx-glass"><rect x="680" y="66" width="15" height="338" rx="7" fill="#8fd8f655" stroke="#b4eaff" stroke-width="2"/><path d="M664 122L708 94M664 245L708 217M664 363L708 335" stroke="#c1f5ff88" stroke-width="4"/></g>
      <g id="vx-public"><path d="M707 350V161Q707 133 733 133H829Q851 133 851 161V350" fill="#195249" stroke="#93e2c8" stroke-width="3"/>${t(720,182,'public','vl-mono')}${t(720,217,'setPreco','vl-mono')}${t(720,309,'if → regra','vl-svg-small')}<g id="vx-door">${box(710,225,135,60,'vl-gate')}${t(724,262,'ENTRADA','vl-mono')}</g></g>
      <g id="vx-guard">${duke(432,269,110)}<path d="M456 288Q466 258 489 283L494 299H448Z" fill="#82c9c7"/></g>
      ${parcel('vx-attempt','90.0')}<g id="vx-denied">${box(368,89,249,72,'vl-reject')}${t(389,132,'NÃO COMPILA')}</g>
      ${t(40,465,action==='private-door'?'private controla acesso. Não valida se o número é positivo.':'A chamada entra pelo método. A atribuição ainda virá após a regra.','vl-floor-label')}`;
    return null;
  }
  function paint(id,action,p,api) {
    const {set,words,visible}=api;
    const clamp=n=>Math.max(0,Math.min(1,n));
    const e=n=>1-(1-clamp(n))**3;
    const move=(name,x,y)=>set(name,'transform',`translate(${x} ${y})`);
    const draw=(name,n)=>{set(name,'stroke-dasharray',1);set(name,'stroke-dashoffset',1-clamp(n));};
    if(id==='referencias'){
      const k=['twins','independent','badge','guess-alias','shared','redirect'].indexOf(action);
      const a=k===0?2:k===1?(p>.6?5:2):k<4?5:k===4?(p>.6?8:5):8;
      words('vx-stock-A',a);words('vx-stock-B',2);
      visible('vx-alias',k>=2);visible('vx-wire-alias',k>=2);visible('vx-beacon',(k===1||k===4)&&p>.55&&p<.94);
      const pop=1+Math.sin(clamp((p-.55)/.4)*Math.PI)*.06;
      set('vx-beacon','transform',`translate(655 278) scale(${pop}) translate(-655 -278)`);
      move('vx-room-a',0,k===0?(1-e(p))*110:0);move('vx-room-b',0,k===0?(1-e((p-.18)/.82))*110:0);
      draw('vx-wire-first',k===0?e(p):1);draw('vx-wire-other',k===0?e((p-.2)/.8):1);
      if(k===5){const v=e(p);set('vx-wire-alias','d',`M208 352C380 352 ${360+v*400} ${300+v*90} ${520+v*345} 300`);draw('vx-wire-alias',1);}
      else draw('vx-wire-alias',k===2?e(p):1);
      move('vx-courier',(k===1||k===4)?e(p)*80:0,0);
      move('vx-delivery',k===1||k===4?373+e(p)*202:373,320-(k===1||k===4?e(p)*42:0));
      const label=document.querySelector('#vx-delivery text');if(label)label.textContent=k===1?'5':'8';
      visible('vx-delivery',k===1||k===3||k===4);set('vx-delivery','opacity',(k===1||k===4)&&p>.75?0:1);
      if(![1,3,4].includes(k))visible('vx-delivery',false);
      words('vx-readout',k===3?'Aposte: primeiro vai ler 5 ou 8?':k===5?(p>.8?'apelido → B · A: 8 · B: 2':'Reconectando o crachá…'):k===4&&p>.6?'primeiro: 8 · apelido: 8 · outro: 2':`A: ${a} · B: 2 · dois objetos distintos`);
      return true;
    }
    if(id==='encomenda'){
      const k=['dispatch','parameter','this-write','calculate','return-value','print-value'].indexOf(action);
      words('vx-name',k>2||k===2&&p>.62?'Headset':'Fone');words('vx-param-label',k>=3?'quantidade':'nome');
      words('vx-param-value',k===0?(p>.7?'Headset':'aguardando'):k>=3?'3':'Headset');
      words('vx-calculation',k>=3?'80.0 × 3 = '+(k>=4?'240.0':'?'):'setNome → void');
      words('vx-total',k>4||k===4&&p>.8?'240.0':'—');words('vx-console',k===5&&p>.7?'240.0':'sem saída');words('vx-console-stock',k===5&&p>.88?'2':'');
      visible('vx-input-path',k<=1||k===3);visible('vx-assign-path',k===2);visible('vx-return-path',k===4);visible('vx-print-path',k===5);
      draw('vx-input-path',e(p));draw('vx-assign-path',e(p));draw('vx-return-path',e(p));draw('vx-print-path',e(p));
      let x=340,y=188;
      if(k===0){x=320+e(p)*214;y=191;}
      if(k===1){x=543;y=224;}
      if(k===2){x=540+e(p)*222;y=221;}
      if(k===3){x=320+e(p)*214;y=214;}
      if(k===4){x=656-e(p)*500;y=335+Math.sin(e(p)*Math.PI)*78;}
      if(k===5){x=156+e(p)*890;y=320+Math.sin(e(p)*Math.PI)*80;}
      move('vx-envelope',x,y);set('vx-envelope','opacity',(k===1||p>.82)?0:1);
      const label=document.querySelector('#vx-envelope text');if(label)label.textContent=k>=4?'240.0':k===3?'3':'Headset';
      move('vx-postman',Math.sin(p*Math.PI)*18,-Math.sin(p*Math.PI)*8);
      return true;
    }
    if(action==='private-door'||action==='public-door'){
      const blocked=action==='private-door',u=e(p);
      visible('vx-denied',blocked&&p>.5);visible('vx-public',!blocked);
      move('vx-attempt',blocked?(p<.5?350+e(p*2)*268:618-e((p-.5)*2)*200):350+u*430,245);
      move('vx-guard',Math.sin(p*Math.PI)*32,0);set('vx-door','transform',`translate(0 ${!blocked?-u*68:0})`);
      set('vx-attempt','opacity',!blocked&&p>.85?0:1);return true;
    }
    return false;
  }
  window.JAVA_VISUAL_EXTRA={render,paint};
})();
