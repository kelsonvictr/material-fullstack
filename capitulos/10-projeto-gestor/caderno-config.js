/* =========================================================
   CONFIG do Caderno de Engenharia — Cap 10 · GestorPRO
   Compartilhado por caderno.html (aluno) e pela versão do
   professor. Ver context/10-caderno-engenharia.md.
   ========================================================= */
const CADERNO_CONFIG = {
  id: 'cap10',
  curso: 'Curso Fullstack · programa AI',
  capitulo: 'Capítulo 10',
  titulo: 'Mapa de Engenharia — GestorPRO',
  subtitulo: 'o sistema inteiro, documentado por você',
  emoji: '🗂️',
  stack: 'React · axios · json-server',
  voltar: 'index.html',

  missoes: [

    /* ── M1 · A FUNDAÇÃO ── */
    {
      id: 'm1', selo: 'M1',
      titulo: '⓪ A Fundação — Passo 1',
      sub: 'marque cada item conforme fizer · preencha as portas e as gavetas do cartório',
      widgets: [
        { tipo:'checklist', id:'fund', itens:[
          { id:'vite',  html:'<code>npm create vite@latest gestorpro</code> (React + JavaScript) + faxina' },
          { id:'pecas', html:'<code>npm install axios react-router-dom</code> (as 2 peças do projeto)' },
          { id:'db',    html:'criar o <code>db.json</code> na raiz — são as gavetas aqui debaixo 👇' },
          { id:'terms', html:'2 terminais rodando ao mesmo tempo (o salão e a cozinha)' }
        ]},
        { tipo:'blanks', id:'portas', linhas:[
          '<b>npm run dev</b> (o salão) responde na porta [[p5173|6|mono]] &nbsp;·&nbsp; <b>npx json-server db.json</b> (a cozinha) responde na porta [[p3000|6|mono]]'
        ]},
        { tipo:'nota', html:'🗄️ <b>db.json — o arquivo de fichas do cartório.</b> A gaveta "clientes" você já conhece: <code>{ "id", "nome", "email", "telefone", "cidade" }</code>. Complete as outras duas:' },
        { tipo:'blanks', id:'gavetas', linhas:[
          '🚚 <b>"fornecedores"</b> — responde em /[[endf|13|mono]] · campos: { "id", "[[f1|6|mono]]", "[[f2|6|mono]]", "[[f3|10|mono]]", "[[f4|9|mono]]" }',
          '📦 <b>"produtos"</b> — responde em /[[endp|9|mono]] · campos: { "id", "[[p1|6|mono]]", "[[p2|6|mono]]", "[[p3|8|mono]]", "[[p4|10|mono]]" }',
          '⚠️ fora o id, os DOIS campos que você digita como <b>NÚMEROS</b> (sem aspas) são: [[num1|8|mono]] e [[num2|8|mono]]',
          '🏤 e quem carimba o id de uma ficha nova? [[carimba|12]]'
        ]}
      ]
    },

    /* ── M2 · O MAPA QUE CRESCE ── */
    {
      id: 'm2', selo: 'M2',
      titulo: '② O Mapa que Cresce (App.jsx)',
      sub: 'tela primeiro, rota depois — marque ☐ quando cada rota NASCER de verdade no seu projeto',
      widgets: [
        { tipo:'checklist', id:'rotas', itens:[
          { id:'r1', html:'<b>[Passo 2]</b> <code>/</code> → <code>&lt;Dashboard /&gt;</code>' },
          { id:'r2', html:'<b>[Passo 2]</b> <code>/clientes</code> → <code>&lt;Clientes /&gt;</code>' },
          { id:'r3', html:'<b>[Passo 2]</b> <code>/fornecedores</code> → <code>&lt;<span class="cad-mono">?</span>&gt;</code> <i>(escreva embaixo)</i>' },
          { id:'r4', html:'<b>[Passo 2]</b> <code>/produtos</code> → <code>&lt;Produtos /&gt;</code>' },
          { id:'r5', html:'<b>[Passo 2]</b> <code>*</code> → o curinga do 404' },
          { id:'r6', html:'<b>[Passo 4]</b> a rota do CADASTRO de cliente' },
          { id:'r7', html:'<b>[Passo 6]</b> a rota do EDITAR de cliente' }
        ]},
        { tipo:'blanks', id:'lacunas', linhas:[
          '<code>/fornecedores</code> aponta pro componente &lt;[[compf|13|mono]] /&gt; &nbsp;·&nbsp; o curinga <code>*</code> aponta pra &lt;[[comp404|14|mono]] /&gt;',
          'a rota do cadastro é <code>/clientes/[[novo|5|mono]]</code> &nbsp;·&nbsp; a do editar é <code>/clientes/[[id|4|mono]]/editar</code> → &lt;[[compedit|14|mono]] /&gt;',
          'e no Encontro B entram mais [[mais|3|mono]] rotas — as mesmas 2 de 🚚 e 📦, escritas pelo agente e revisadas por VOCÊ'
        ]}
      ]
    },

    /* ── M3 · A ESTRADA DO CRUD ── */
    {
      id: 'm3', selo: 'M3',
      titulo: '📮 A Estrada do CRUD',
      sub: 'desenhe as setas de POST, PUT e DELETE — ida E volta (o GET está de exemplo) · depois complete a legenda',
      widgets: [
        { tipo:'nota', html:'Exemplo (GET): <span style="color:var(--get);font-weight:800">pedido ─────▶</span> &nbsp;e a volta&nbsp; <span style="color:var(--get);font-weight:800">◀─ ─ ─ 200 + as fichas (res.data)</span>. Agora é sua vez — use uma cor por verbo e escreva nas setas o que viaja em cada direção:' },
        { tipo:'desenho', id:'setas', altura:230, espessura:2.6,
          rotulo:'✏️ 🧑‍💻 você (navegador) fica à ESQUERDA · o 🏤 json-server à DIREITA',
          cores:[
            { cor:'#047857', rot:'POST (verde)' },
            { cor:'#b45309', rot:'PUT (âmbar)' },
            { cor:'#b91c1c', rot:'DELETE (vermelho)' },
            { cor:'#1d4ed8', rot:'anotações (azul)' }
          ],
          fundo:'<div style="display:flex;flex-direction:column;gap:26px;padding-top:4px">'+
            '<div><span class="cad-verbo" style="background:#047857">POST</span> /clientes &nbsp;<i>corpo: a ficha nova, SEM id</i></div>'+
            '<div><span class="cad-verbo" style="background:#b45309">PUT</span> /clientes/2 &nbsp;<i>corpo: a ficha inteira</i></div>'+
            '<div><span class="cad-verbo" style="background:#b91c1c">DELETE</span> /clientes/3 &nbsp;<i>(sem corpo)</i></div></div>'
        },
        { tipo:'nota', html:'📛 <b>O nome de mercado: C.R.U.D.</b> — a linha do GET vai de exemplo: <b>GET = R</b> (ler as fichas · id só no "por id"). Complete as outras três:' },
        { tipo:'blanks', id:'legenda', linhas:[
          '<span class="cad-mono" style="background:#047857;color:#fff;border-radius:5px;padding:1px 8px;font-weight:700">POST</span> = letra [[lpost|3]] · ação no cartório: [[apost|20]] · o id vai… [[ipost|20]]',
          '<span class="cad-mono" style="background:#b45309;color:#fff;border-radius:5px;padding:1px 8px;font-weight:700">PUT</span> = letra [[lput|3]] · ação no cartório: [[aput|20]] · o id vai… [[iput|20]]',
          '<span class="cad-mono" style="background:#b91c1c;color:#fff;border-radius:5px;padding:1px 8px;font-weight:700">DELETE</span> = letra [[ldel|3]] · ação no cartório: [[adel|20]] · o id vai… [[idel|20]]'
        ]}
      ]
    },

    /* ── M4 · ANATOMIA & CICLO ── */
    {
      id: 'm4', selo: 'M4',
      titulo: '📄 Anatomia da listagem & o Ciclo',
      sub: 'os hooks da Clientes.jsx — e o filme completo de uma listagem, montado por você',
      widgets: [
        { tipo:'blanks', id:'anatomia', linhas:[
          'a lista mora em: <code>const [clientes, setClientes] = use[[hook1|6|mono]]([])</code>',
          'quem busca quando a página monta: <code>use[[hook2|7|mono]](() =&gt; { ... }, [])</code>',
          'quem faz o pedido HTTP: <code>[[quem|6|mono]].get("http://localhost:3000/[[rota|9|mono]]")</code>',
          'a resposta entra na tela por: <code>setClientes(res.[[data|5|mono]])</code> + <code>.map()</code> + <code>key</code>'
        ]},
        { tipo:'nota', html:'🔁 <b>O ciclo de UMA listagem</b> — os passos 1 e 6 já estão fixos; arraste as 4 palavras do banco para a ordem certa:' },
        { tipo:'wordbank', id:'ciclo',
          sequencia:[
            { fixo:true, num:'1', rotulo:'página monta<br>(1ª renderização)' },
            { id:'s2', num:'2' },
            { id:'s3', num:'3' },
            { id:'s4', num:'4' },
            { id:'s5', num:'5' },
            { fixo:true, num:'6', rotulo:'tabela na tela 🎉' }
          ],
          palavras:[ 'setClientes(...) redesenha', 'o useEffect dispara', 'a resposta chega (res.data)', 'axios.get viaja' ]
        }
      ]
    },

    /* ── M5 · RITUAL & AGENTS.md ── */
    {
      id: 'm5', selo: 'M5',
      titulo: '🕵️ O Ritual & o AGENTS.md',
      sub: 'complete o ritual ①–⑤ de memória · e escreva a SUA regra da casa',
      widgets: [
        { tipo:'blanks', id:'ritual', linhas:[
          '① rodou sem erro? &nbsp;·&nbsp; ② li o [[r2|8]]? &nbsp;·&nbsp; ③ segue o [[r3|11]]?',
          '④ veio algo que eu [[r4|10]]? &nbsp;·&nbsp; ⑤ sei [[r5|9]] em voz alta?'
        ]},
        { tipo:'nota', html:'✍️ <b>A regra do AGENTS.md que EU acho mais importante</b> (e por quê — não existe resposta errada, existe engenheiro justificando):' },
        { tipo:'texto', id:'regra', linhas:3, placeholder:'escreva aqui com suas palavras…' },
        { tipo:'nota', html:'💡 os 4 ingredientes do prompt-spec, só de lembrete: <b>CONTEXTO</b> (qual arquivo é o modelo) · <b>TAREFA</b> (específica, uma por vez) · <b>RESTRIÇÕES</b> (o AGENTS.md!) · <b>CRITÉRIO DE ACEITE</b> ("pronto quando…").' }
      ]
    },

    /* ── M6 · TERMO DE ACEITE ── */
    {
      id: 'm6', selo: 'M6',
      titulo: '🖋️ Termo de Aceite',
      sub: 'nada entra no sistema sem revisão: marque os 5 checks do ritual e ASSINE cada feature (desenhe a assinatura!)',
      widgets: [
        { tipo:'aceite', id:'termo', linhas:[
          { id:'cli',  feature:'👥 Clientes (CRUD completo)',          via:'NA MÃO',       viaClasse:'mao' },
          { id:'fl',   feature:'🚚 Fornecedores: listar',              via:'JUNTO',        viaClasse:'junto' },
          { id:'fce',  feature:'🚚 Fornecedores: cadastrar + excluir', via:'JUNTO',        viaClasse:'junto' },
          { id:'fe',   feature:'🚚 Fornecedores: editar (no telão)',   via:'JUNTO',        viaClasse:'junto' },
          { id:'pl',   feature:'📦 Produtos: listar (selo ⚠️)',        via:'VOCÊ COMANDA', viaClasse:'cmd' },
          { id:'pce',  feature:'📦 Produtos: cadastrar + excluir',     via:'VOCÊ COMANDA', viaClasse:'cmd' },
          { id:'pe',   feature:'📦 Produtos: editar',                  via:'VOCÊ COMANDA', viaClasse:'cmd' },
          { id:'dash', feature:'📊 Dashboard (o chefão)',              via:'VOCÊ ESCOLHE', viaClasse:'cmd' }
        ]},
        { tipo:'nota', html:'🖋️ Na linha do Clientes (feito NA MÃO, sem diff) os 5 checks viram um só combinado: <b>testei tudo?</b> Feature sem assinatura = feature que não existe.' }
      ]
    },

    /* ── M7 · FICHÁRIO DAS ENTIDADES (só no Caderno digital) ── */
    {
      id: 'm7', selo: 'M7',
      titulo: '📇 Fichário das Entidades',
      sub: 'a documentação completa do sistema — uma ficha por entidade; preencha quando o módulo dela ficar PRONTO',

      widgets: [

        /* ····· 👥 CLIENTES ····· */
        { tipo:'nota', html:'━━━━━ 👥 <b>FICHA 1 · CLIENTES</b> — <span style="color:var(--get);font-weight:800">FASE 1 · NA MÃO</span> (o gabarito da casa) · preencha ao fechar o Passo 6 ━━━━━' },
        { tipo:'blanks', id:'cli', linhas:[
          'endpoint: <code>localhost:3000/[[end|9|mono]]</code> &nbsp;·&nbsp; campos: { "id", "[[c1|5|mono]]", "[[c2|6|mono]]", "[[c3|9|mono]]", "[[c4|7|mono]]" }',
          'rotas: listar <code>/[[r1|9|mono]]</code> &nbsp;·&nbsp; cadastrar <code>/clientes/[[r2|5|mono]]</code> &nbsp;·&nbsp; editar <code>/clientes/[[r3|4|mono]]/editar</code>',
          'arquivos em <code>src/pages/</code>: [[a1|9|mono]].jsx · [[a2|12|mono]].jsx · [[a3|14|mono]].jsx &nbsp;(+ os .module.css)',
          'quem digitou cada linha: [[quem|8]] 💪'
        ]},
        { tipo:'checklist', id:'clicheck', itens:[
          { id:'g',   html:'<b>GET</b> — a tabela lista os clientes' },
          { id:'gid', html:'<b>GET por id</b> — o editar abre pré-enchido' },
          { id:'p',   html:'<b>POST</b> — cadastra e volta pra lista (corpo SEM id!)' },
          { id:'u',   html:'<b>PUT</b> — salva a edição (id na URL)' },
          { id:'d',   html:'<b>DELETE</b> — exclui com confirm + <code>.filter()</code> avisando a tela' }
        ]},

        /* ····· 🚚 FORNECEDORES ····· */
        { tipo:'nota', html:'━━━━━ 🚚 <b>FICHA 2 · FORNECEDORES</b> — <span style="color:var(--miss);font-weight:800">FASE 2 · JUNTO</span> (o agente executa, você revisa) · preencha ao fechar o Passo 10 ━━━━━' },
        { tipo:'blanks', id:'forn', linhas:[
          'endpoint: <code>localhost:3000/[[end|13|mono]]</code> &nbsp;·&nbsp; campos: { "id", "[[f1|5|mono]]", "[[f2|5|mono]]", "[[f3|10|mono]]", "[[f4|9|mono]]" }',
          'rotas: listar <code>/[[r1|13|mono]]</code> &nbsp;·&nbsp; cadastrar <code>/fornecedores/[[r2|5|mono]]</code> &nbsp;·&nbsp; editar <code>/fornecedores/[[r3|4|mono]]/editar</code>',
          'arquivos: [[a1|13|mono]].jsx · [[a2|15|mono]].jsx · [[a3|17|mono]].jsx',
          'o modelo que o agente seguiu foi o módulo [[modelo|9]] &nbsp;·&nbsp; quem escreveu o código: [[quem|9]] &nbsp;·&nbsp; quem revisou CADA diff e assinou: [[rev|6]]'
        ]},
        { tipo:'checklist', id:'forncheck', itens:[
          { id:'g',   html:'<b>GET</b> — os fornecedores na tabela' },
          { id:'gid', html:'<b>GET por id</b> — editar pré-enchido' },
          { id:'p',   html:'<b>POST</b> — cadastro funcionando' },
          { id:'u',   html:'<b>PUT</b> — o diff do editar foi lido NO TELÃO, linha por linha' },
          { id:'d',   html:'<b>DELETE</b> — com confirm + <code>.filter()</code>' }
        ]},

        /* ····· 📦 PRODUTOS ····· */
        { tipo:'nota', html:'━━━━━ 📦 <b>FICHA 3 · PRODUTOS</b> — <span style="color:var(--post);font-weight:800">FASE 3 · VOCÊ COMANDA</span> (os prompts são seus) · preencha ao fechar o Passo 13 ━━━━━' },
        { tipo:'blanks', id:'prod', linhas:[
          'endpoint: <code>localhost:3000/[[end|9|mono]]</code> &nbsp;·&nbsp; campos: { "id", "[[p1|5|mono]]", "[[p2|6|mono]]", "[[p3|8|mono]]", "[[p4|10|mono]]" }',
          'rotas: listar <code>/[[r1|9|mono]]</code> &nbsp;·&nbsp; cadastrar <code>/produtos/[[r2|5|mono]]</code> &nbsp;·&nbsp; editar <code>/produtos/[[r3|4|mono]]/editar</code>',
          'arquivos: [[a1|9|mono]].jsx · [[a2|12|mono]].jsx · [[a3|14|mono]].jsx',
          '⚠️ os 2 campos NUMÉRICOS [[n1|6|mono]] e [[n2|8|mono]] passam por [[conv|9|mono]] no formulário — senão viram texto!',
          'regra de negócio: o selo "⚠️ estoque baixo" aparece quando <code>[[campo|8|mono]] &lt; [[val|3|mono]]</code> (porteiro <code>&amp;&amp;</code> do Cap 5)',
          'os prompts deste módulo foram escritos por: [[quem2|9]] 🧑‍✈️'
        ]},
        { tipo:'checklist', id:'prodcheck', itens:[
          { id:'g',   html:'<b>GET</b> — tabela com preço "R$ " e o selo ⚠️ nos certos (Monitor e Mouse do seed)' },
          { id:'gid', html:'<b>GET por id</b> — editar pré-enchido' },
          { id:'p',   html:'<b>POST</b> — cadastro com <code>Number()</code> (conferi no db.json: SEM aspas nos números)' },
          { id:'u',   html:'<b>PUT</b> — edição salvando números como números' },
          { id:'d',   html:'<b>DELETE</b> — com confirm + <code>.filter()</code>' }
        ]},

        { tipo:'nota', html:'💡 <b>Repare na simetria:</b> as 3 fichas são estruturalmente IDÊNTICAS — só mudam nomes e campos. Essa repetição é o que tornou possível delegar pro agente com segurança. Documentação assim é o que separa "código que funciona" de "sistema que uma equipe consegue manter".' }
      ]
    },

    /* ── M8 · CAIXA DE FERRAMENTAS & DIÁRIO DE BUGS ── */
    {
      id: 'm8', selo: 'M8',
      titulo: '🧰 Ferramentas novas & Diário de Bugs',
      sub: 'o que entrou na sua caixa neste capítulo — e o registro dos perrengues que VOCÊ enfrentou',
      widgets: [
        { tipo:'nota', html:'🧰 <b>As novidades honestas do capítulo</b> — complete o que cada uma faz:' },
        { tipo:'blanks', id:'ferr', linhas:[
          'o <code>useNavigate</code> me dá o <code>navigate("/clientes")</code> — um [[l1|5]] programável: navegar via [[l2|7]], ex. dentro do <code>.then()</code> depois de salvar',
          'o <code>window.confirm("Tem certeza?")</code> abre OK/Cancelar e devolve [[c1|5|mono]] ou [[c2|6|mono]] — um boolean, perfeito pra um <code>if</code>',
          'o <code>Number("320")</code> converte o texto do input pra [[n1|7]] — sem ele, preco e estoque entram como [[n2|6]] no db.json e as contas quebram',
          'a família completa do axios: <code>.get</code> lê · <code>.[[v1|5|mono]]</code> cria · <code>.[[v2|4|mono]]</code> troca · <code>.[[v3|7|mono]]</code> apaga'
        ]},
        { tipo:'nota', html:'🌍 <b>O conceito-mor — dois mundos:</b> complete a lição que carrega o capítulo:' },
        { tipo:'blanks', id:'mundos', linhas:[
          'o <code>axios.delete</code> apaga a ficha no [[m1|9]] — mas a tela mostra o [[m2|7]], que é outro mundo. Por isso o <code>.then()</code> chama <code>setClientes(clientes.[[m3|7|mono]](...))</code>: os dois mundos em paz.'
        ]},
        { tipo:'nota', html:'🐛 <b>Diário de Bugs</b> — engenheiro registra incidente: marque os que VOCÊ pegou hoje…' },
        { tipo:'checklist', id:'peguei', itens:[
          { id:'b1', html:'<b>Bug 1 · o F5 revelador</b> — excluiu e a tela só mudou no F5' },
          { id:'b2', html:'<b>Bug 2 · o id intrometido</b> — mandou id no POST e o db.json bagunçou' },
          { id:'b3', html:'<b>Bug 3 · o PUT sem endereço</b> — 404 na cara' },
          { id:'b4', html:'<b>Bug 4 · o agente rebelde</b> — diff com coisa proibida no AGENTS.md' },
          { id:'b5', html:'<b>Bug 5 · Network Error</b> — o json-server caiu' }
        ]},
        { tipo:'nota', html:'…e escreva o <b>conserto</b> de cada um (mesmo os que não pegou — vão cair na prova da vida):' },
        { tipo:'blanks', id:'conserto', linhas:[
          '<b>Bug 1:</b> [[b1|38]]',
          '<b>Bug 2:</b> [[b2|38]]',
          '<b>Bug 3:</b> [[b3|38]]',
          '<b>Bug 4:</b> [[b4|38]]',
          '<b>Bug 5:</b> [[b5|38]]'
        ]},
        { tipo:'nota', html:'🔦 <b>Macete de ouro do diagnóstico</b> — em 30 segundos você sabe se o problema é de quem PEDE ou de quem RESPONDE. Complete:' },
        { tipo:'blanks', id:'macete', linhas:[
          'CRUD com defeito se investiga pela aba [[aba|9]] do F12: o verbo está certo? a URL tem o [[id|3|mono]] quando devia? os números vieram sem [[aspas|6]]? o status voltou 200/201 ou [[st|4|mono]]?'
        ]}
      ]
    },

    /* ── M9 · OFICINA DE PROMPTS ── */
    {
      id: 'm9', selo: 'M9',
      titulo: '📝 Oficina de Prompts (Produtos)',
      sub: 'rascunhe AQUI cada prompt dos Passos 11–13 ANTES de mandar pro agente — e confira os 4 ingredientes',
      widgets: [
        { tipo:'nota', html:'Os 4 ingredientes de um prompt-spec (Cap 9): <b>CONTEXTO</b> (qual arquivo é o modelo) · <b>TAREFA</b> (específica, uma por vez) · <b>RESTRIÇÕES</b> (o AGENTS.md!) · <b>CRITÉRIO DE ACEITE</b> ("pronto quando…"). Escreva, confira os 4, e SÓ ENTÃO mande.' },

        { tipo:'nota', html:'━━━ 📦 <b>PROMPT 1 · a vitrine</b> (Passo 11) — o cliente pediu: tabela com preço "R$" e selo ⚠️ quando o estoque estiver baixo ━━━' },
        { tipo:'texto', id:'p1', linhas:4, placeholder:'escreva seu prompt aqui antes de mandar…' },
        { tipo:'checklist', id:'p1ck', itens:[
          { id:'ctx', html:'tem CONTEXTO (citei o arquivo-modelo: Clientes.jsx)' },
          { id:'tar', html:'tem TAREFA específica (tabela + R$ + selo com &amp;&amp;)' },
          { id:'res', html:'tem RESTRIÇÕES (segue o AGENTS.md · não mexa em outros arquivos)' },
          { id:'ace', html:'tem ACEITE ("pronto quando: Monitor e Mouse com selo, os demais sem")' }
        ]},

        { tipo:'nota', html:'━━━ 📦 <b>PROMPT 2 · cadastrar &amp; excluir</b> (Passo 12) — atenção: preco e estoque são NÚMEROS ━━━' },
        { tipo:'texto', id:'p2', linhas:4, placeholder:'seu prompt…' },
        { tipo:'checklist', id:'p2ck', itens:[
          { id:'ctx', html:'tem CONTEXTO (modelos: ClienteNovo.jsx e a função excluir)' },
          { id:'tar', html:'tem TAREFA (cadastro + excluir com confirm)' },
          { id:'num', html:'pedi a conversão com Number() — o detalhe de ouro' },
          { id:'ace', html:'tem ACEITE (números SEM aspas no db.json)' }
        ]},

        { tipo:'nota', html:'━━━ 📦 <b>PROMPT 3 · editar</b> (Passo 13) — o último PUT, sem olhinho ━━━' },
        { tipo:'texto', id:'p3', linhas:4, placeholder:'seu prompt…' },
        { tipo:'checklist', id:'p3ck', itens:[
          { id:'ctx', html:'tem CONTEXTO (modelo: ClienteEditar.jsx)' },
          { id:'tar', html:'tem TAREFA (useParams + GET pré-enche + PUT com id na URL)' },
          { id:'res', html:'tem RESTRIÇÕES (AGENTS.md · Number() nos numéricos)' },
          { id:'ace', html:'tem ACEITE (editar preço e ver na listagem e no db.json)' }
        ]},

        { tipo:'nota', html:'💎 <b>Regra da oficina:</b> prompt sem os 4 ingredientes = decisão delegada ao estagiário. Buraco no pedido, surpresa no diff.' }
      ]
    },

    /* ── M10 · RETROSPECTIVA & DEMO DAY ── */
    {
      id: 'm10', selo: 'M10',
      titulo: '🎤 Retrospectiva & Demo Day',
      sub: 'sábado tem demo day: 2 minutos por aluno — prepare o SEU roteiro e feche o projeto como engenheiro',
      widgets: [
        { tipo:'nota', html:'🎬 <b>Roteiro dos meus 2 minutos</b> — o que vou mostrar, em ordem (dica: dashboard → um cadastro ao vivo → o selo de estoque):' },
        { tipo:'texto', id:'roteiro', linhas:3, placeholder:'1) … 2) … 3) …' },
        { tipo:'nota', html:'🔍 <b>O diff que vou explicar</b> — mostrar prova que o agente é rápido; EXPLICAR prova que o engenheiro é você. Qual diff você domina de olhos fechados, e por quê?' },
        { tipo:'texto', id:'diff', linhas:3, placeholder:'o diff de … porque …' },
        { tipo:'nota', html:'🎫 <b>A pergunta de saída, respondida como engenheiro</b> — "editei um produto: o que viaja até o servidor?"' },
        { tipo:'blanks', id:'saida', linhas:[
          'um [[verbo|4|mono]] para <code>/produtos/[[alvo|3|mono]]</code> — o id na [[onde|4]] diz QUAL ficha, e o [[oque|6]] leva o objeto completo (números como números!)'
        ]},
        { tipo:'nota', html:'🪞 <b>Retrospectiva</b> (isso é ritual de equipe de verdade — sprint fecha com retro):' },
        { tipo:'texto', id:'aprendi', linhas:2, placeholder:'o que EU mais aprendi neste projeto foi…' },
        { tipo:'texto', id:'travei', linhas:2, placeholder:'onde travei e como saí…' },
        { tipo:'texto', id:'orgulho', linhas:2, placeholder:'meu maior orgulho no GestorPRO é…' },
        { tipo:'nota', html:'🎓 <b>Frontend: CONCLUÍDO.</b> Este caderno é a prova documentada: você domina o padrão, delega a repetição e revisa tudo. Leve-o pro demo day — e guarde o .json de backup!' }
      ]
    },

    /* ── rascunho livre (sem selo — não conta no progresso) ── */
    {
      id: 'rascunho',
      titulo: '✍️ Rascunho livre',
      sub: 'anote o que o prof desenhar no quadro, dúvidas pra perguntar, ideias pro seu sistema',
      widgets: [
        { tipo:'texto', id:'notas', linhas:4, placeholder:'suas anotações…' },
        { tipo:'desenho', id:'sketch', altura:220, rotulo:'✏️ área de desenho livre',
          cores:[ { cor:'#1d4ed8', rot:'azul' }, { cor:'#b91c1c', rot:'vermelho' },
                  { cor:'#047857', rot:'verde' }, { cor:'#1f2a4d', rot:'preto' } ] }
      ]
    }
  ]
};
