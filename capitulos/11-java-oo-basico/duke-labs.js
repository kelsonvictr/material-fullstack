/* Teatros com áudios locais: sem TTS ou execução de Java no navegador. */
(() => {
  'use strict';
  const activities = [
    {
      target: '#boas-vindas .analogy', after: true,
      title: 'O ponto e vírgula desaparecido', time: '3 minutos',
      intro: 'Queremos mostrar uma mensagem. Acompanhe Beto escrevendo, o Java conferindo e o console respondendo. É uma simulação: a execução real será no IntelliJ.',
      steps: [
        ['Lia', 'Quero ver “Bora aprender Java!” na tela. Como peço isso?', 'System.out.println("Bora aprender Java!");', 'Objetivo → mostrar uma mensagem', 'Console ainda vazio: escrever não é executar.'],
        ['Beto', 'Copiei a linha… opa, deixei o ponto e vírgula para trás!', 'System.out.println("Bora aprender Java!")', 'Conferência → falta ; ao final', 'Esta versão não compila. A mensagem ainda não aparece.'],
        ['Tico', 'É um ajuste na escrita, não um monstro! Recoloque o ; que encerra esta instrução.', 'System.out.println("Bora aprender Java!");', 'Conferência → sintaxe corrigida', 'Agora podemos compilar e executar o programa que contém a linha.'],
        ['Beto', 'Executei! As aspas delimitam o texto no código; não aparecem na mensagem.', 'System.out.println("Bora aprender Java!");', 'Execução → console', 'Bora aprender Java!']
      ],
      question: 'Sua vez: qual linha mostra “Produto cadastrado!”?',
      choices: ['System.out.println("Produto cadastrado!")', 'System.out.println("Produto cadastrado!");', 'System.out.println(Produto cadastrado!);'], answer: 1,
      effects: ['Não compila: falta o ; que encerra esta instrução.', 'Console: Produto cadastrado!', 'Não compila: sem aspas, as palavras não formam um texto literal.'],
      rule: 'Sintaxe é o jeito de escrever: aqui, aspas delimitam o texto, parênteses envolvem o argumento e ; encerra a instrução.',
      transfer: 'No IntelliJ, leia o aviso e confira a linha. Um erro de escrita é uma pista para corrigir, não um motivo para desistir.'
    },
    {
      target: '#java > .card', title: 'A caixa que prometeu guardar um número', time: '3 minutos',
      intro: 'int guarda números inteiros; String guarda texto. O tipo é uma promessa que o compilador confere. A caixa é só uma analogia para a variável.',
      steps: [
        ['Lia', 'Chegaram doze teclados. Precisamos guardar a quantidade.', 'int estoque = 12;', 'estoque · tipo int', 'Valor: 12 → número inteiro'],
        ['Beto', 'Se eu colocar aspas, fica a mesma coisa?', 'int estoque = "12";', 'Tentativa → texto em variável int', 'Incompatível: esta versão não compila.'],
        ['Tico', 'Parece igual para nós, mas "12" é texto. O tipo verifica o valor, não sua aparência.', 'String etiqueta = "12";', 'etiqueta · tipo String', 'Valor: "12" → texto, em outra variável'],
        ['Beto', 'Para contar o estoque, uso o número sem aspas.', 'int estoque = 12;\nestoque = estoque + 1;', 'estoque · tipo int', 'Antes: 12 → depois: 13']
      ],
      question: 'Chegaram mais produtos. Qual declaração permite começar uma contagem em 8?',
      choices: ['int quantidade = "8";', 'boolean quantidade = 8;', 'int quantidade = 8;'], answer: 2,
      effects: ['Texto recusado: "8" não é um int.', 'Valor recusado: boolean aceita true ou false, não 8.', 'Caixa quantidade → int → valor 8. Agora podemos somar números.'],
      rule: 'O valor precisa ser compatível com o tipo declarado.',
      transfer: 'Essa mesma decisão aparece ao escolher os campos estoque, preco e nome da classe Produto.'
    },
    {
      target: '#teatro > .card', title: 'Dois produtos, uma decisão sua', time: '2 minutos',
      intro: 'O teatro mostrou dois objetos criados com new. Agora preveja o efeito de uma alteração antes de revelar o resultado.',
      question: 'teclado tem estoque 12 e mouse tem estoque 5. Após teclado.setEstoque(7), como ficam os dois objetos independentes?',
      choices: ['teclado: 7 · mouse: 7', 'teclado: 7 · mouse: 5', 'teclado: 12 · mouse: 5'], answer: 1,
      initial: 'teclado [estoque: 12]     mouse [estoque: 5]\nAção: teclado.setEstoque(7);',
      effects: ['Resultado real: teclado [7] · mouse [5]. Compartilhar a classe não compartilha o estado dos dois objetos.', 'Resultado real: teclado [7] · mouse [5]. Só o objeto que recebeu a chamada foi alterado.', 'Resultado real: teclado [7] · mouse [5]. O setter aceita 7; o teclado não permanece em 12.'],
      rule: 'Objetos independentes têm estados independentes. O método atua no objeto que recebeu a chamada.',
      transfer: 'Experimente essa alteração no Main e imprima os dois produtos. Prever, executar e comparar é uma ótima forma de aprender.'
    }
  ];

  const players = [];
  activities.forEach((activity, index) => {
    const host = document.querySelector(activity.target);
    if (!host) return;
    const root = document.createElement('section');
    root.className = 'duke-lab';
    root.setAttribute('aria-labelledby', `duke-lab-${index}`);
    // Apenas estrutura fixa; conteúdo pedagógico é inserido como texto.
    root.innerHTML = `<header><span class="jt-kicker"></span><h3 id="duke-lab-${index}"></h3><p></p></header>
      <div class="duke-scene"><div class="duke-cast"><span data-person="Lia">🙋 Lia</span><span data-person="Beto">🧑‍💻 Beto</span><span data-person="Tico"><img src="./assets/decor/duke.png" alt="">Tico · Duke</span></div><p class="duke-dialogue"></p><div class="duke-bench"><pre class="duke-code"></pre><div><b class="duke-state"></b><output class="duke-result"></output></div></div><div class="duke-controls"><button type="button" data-action="play">▶ Assistir com legendas</button><button type="button" data-action="back">← Voltar</button><button type="button" data-action="next">Próximo →</button><button type="button" data-action="reset">↺ Recomeçar</button><span class="duke-progress"></span></div><small>Teatro legendado, sem áudio. Avance no seu ritmo ou use Assistir.</small></div>
      <div class="duke-game"><h4></h4><pre class="duke-before"></pre><div class="duke-choices"></div><p class="duke-feedback" role="status"></p><button type="button" class="duke-retry">↺ Tentar novamente</button></div><p class="duke-transfer"></p>`;
    const $ = selector => root.querySelector(selector);
    $('header .jt-kicker').textContent = `${activity.steps ? 'TEATRO + JOGO' : 'JOGO DE PREVISÃO'} · ${activity.time}`;
    $('h3').textContent = activity.title;
    $('header p').textContent = activity.intro;
    $('.duke-game h4').textContent = activity.question;
    $('.duke-before').textContent = activity.initial || 'Escolha uma linha e observe a consequência.';
    $('.duke-transfer').textContent = activity.transfer;
    $('.duke-retry').hidden = true;
    let step = 0, timer = null, playing = false, media = null, generation = 0, finished = false;
    const dispose = () => {
      generation++;
      if (!media) return;
      media.onended = media.onerror = media.onplaying = null;
      media.pause(); media.removeAttribute('src'); media.load(); media.remove(); media = null;
    };
    const stop = (reset = false) => {
      clearTimeout(timer); playing = false; media?.pause();
      if (reset) dispose();
      root.classList.remove('is-playing'); $('[data-action="play"]').textContent = '▶ Assistir';
    };
    const render = () => {
      const [speaker, line, code, state, result] = activity.steps[step];
      $('.duke-dialogue').textContent = `${speaker}: “${line}”`;
      $('.duke-code').textContent = code;
      $('.duke-state').textContent = state;
      $('.duke-result').textContent = result;
      root.querySelectorAll('[data-person]').forEach(el => el.classList.toggle('is-active', el.dataset.person === speaker));
      $('.duke-progress').textContent = `${step + 1} / ${activity.steps.length}`;
      $('[data-action="back"]').disabled = step === 0;
      $('[data-action="next"]').disabled = step === activity.steps.length - 1;
    };
    const advance = () => {
      if (!playing) return;
      dispose();
      if (step === activity.steps.length - 1) { finished = true; stop(); $('.duke-scene > small').textContent = 'Cena concluída. Agora experimente o jogo!'; return; }
      step++; render(); schedule();
    };
    const schedule = () => {
      clearTimeout(timer);
      if (window.CAP_AUDIO.isMuted()) {
        $('.duke-scene > small').textContent = 'Som desligado neste aparelho. As legendas avançam automaticamente; você pode pausar.';
        timer = setTimeout(advance, 8500); return;
      }
      if (!media) {
        const clip = window.DUKE_AUDIO?.[`${index}-${step}`]?.[0];
        if (!clip) { $('.duke-scene > small').textContent = 'Áudio indisponível nesta etapa. Continue pelas legendas.'; timer = setTimeout(advance, 8500); return; }
        media = new Audio('./assets/audio/duke-labs/audio/' + clip.file);
        media.hidden = true; media.dataset.dukeAudio = 'true'; root.append(media);
        const current = media, id = generation;
        const valid = () => media === current && id === generation && playing;
        current.onplaying = () => {
          if (!valid()) return;
          root.classList.add('is-playing');
          $('.duke-scene > small').textContent = 'Narração local. Pause para conversar sobre a cena; o avanço manual é silencioso.';
        };
        current.onended = () => {
          if (!valid()) return;
          clearTimeout(timer); root.classList.remove('is-playing'); timer = setTimeout(advance, 700);
        };
        current.onerror = () => {
          if (!valid()) return;
          stop(true); $('.duke-scene > small').textContent = 'Não foi possível tocar o áudio. Use Próximo ou tente Assistir novamente.';
        };
      }
      if (media.ended) { timer = setTimeout(advance, 700); return; }
      const current = media;
      timer = setTimeout(() => { stop(true); $('.duke-scene > small').textContent = 'Áudio demorou a responder. Tente Assistir novamente ou avance manualmente.'; }, 30000);
      current.play().catch(() => {
        if (media !== current || !playing) return;
        stop(); $('.duke-scene > small').textContent = 'Reprodução bloqueada. Clique em Assistir para tentar novamente.';
      });
    };
    if (activity.steps) {
      players.push(stop);
      $('[data-action="play"]').textContent = '▶ Assistir';
      $('.duke-scene > small').textContent = 'Vozes locais de Lia, Beto e Tico. O avanço manual é silencioso. Use o controle geral para ligar o som.';
      const sound = document.createElement('button'); sound.type = 'button'; sound.dataset.capAudio = '';
      $('.duke-controls').append(sound);
      document.addEventListener('cap-audio:change', () => {
        stop(true);
        $('.duke-scene > small').textContent = window.CAP_AUDIO.isMuted()
          ? 'Som desligado em todos os teatros. Clique em Assistir para continuar com legendas.'
          : 'Som ligado neste aparelho. Clique em Assistir para ouvir.';
      });
      render();
      root.querySelectorAll('[data-action]').forEach(button => button.addEventListener('click', () => {
        const action = button.dataset.action;
        if (action === 'play' && playing) { stop(); return; }
        players.forEach(pause => { if (pause !== stop) pause(); });
        document.dispatchEvent(new Event('duke-theater-start'));
        if (action === 'play') {
          if (finished) { step = 0; finished = false; dispose(); }
          playing = true;
          button.textContent = 'Ⅱ Pausar'; render(); schedule();
        } else { stop(true); finished = false; step = action === 'reset' ? 0 : Math.max(0, Math.min(activity.steps.length - 1, step + (action === 'next' ? 1 : -1))); render(); $('.duke-scene > small').textContent = 'Avanço manual silencioso. Clique em Assistir para narrar a partir desta etapa.'; }
      }));
      if ('IntersectionObserver' in window) new IntersectionObserver(entries => { if (!entries[0].isIntersecting) stop(); }).observe(root);
    } else $('.duke-scene').remove();
    activity.choices.forEach((choice, choiceIndex) => {
      const button = document.createElement('button'); button.type = 'button'; button.textContent = choice;
      button.addEventListener('click', () => {
        if (activity.steps) stop();
        $('.duke-feedback').textContent = `${choiceIndex === activity.answer ? 'Isso! ' : 'Vamos observar: '}${activity.effects[choiceIndex]} ${activity.rule}`;
        $('.duke-before').textContent = activity.effects[choiceIndex];
        root.querySelectorAll('.duke-choices button').forEach(el => { el.disabled = true; });
        button.setAttribute('aria-pressed', 'true');
        $('.duke-retry').hidden = false;
      });
      $('.duke-choices').append(button);
    });
    $('.duke-retry').addEventListener('click', () => {
      $('.duke-feedback').textContent = '';
      $('.duke-before').textContent = activity.initial || 'Escolha uma linha e observe a consequência.';
      root.querySelectorAll('.duke-choices button').forEach(el => { el.disabled = false; el.removeAttribute('aria-pressed'); });
      $('.duke-retry').hidden = true; $('.duke-choices button').focus();
    });
    if (activity.after) host.after(root); else host.append(root);
  });
  window.CAP_AUDIO.sync();
  document.addEventListener('visual-lab-start', () => players.forEach(stop => stop()));
  document.addEventListener('visibilitychange', () => { if (document.hidden) players.forEach(stop => stop()); });
  document.getElementById('jt-play')?.addEventListener('click', () => players.forEach(stop => stop()));
})();
