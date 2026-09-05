(() => {
  'use strict';

  const root = document.getElementById('java-teatro');
  if (root) {
    const scenes = [
      {
        title: '1 · Molde e objetos',
        steps: [
          {
            speaker: 'lia',
            lia: 'Precisamos cadastrar um teclado e um mouse. Como o Java sabe quais dados formam um produto?',
            beto: 'Posso criar algumas variáveis?',
            code: '// Primeiro definimos o molde.',
            memory: [],
            console: '',
            caption: '<b>Pergunta da cena:</b> como garantir que todo produto tenha a mesma estrutura?'
          },
          {
            speaker: 'tico',
            lia: 'Quero nome, preço e estoque.',
            beto: 'Então a classe é a ficha em branco?',
            code: 'public class Produto {\n  private String nome;\n  private double preco;\n  private int estoque;\n}',
            memory: [],
            console: 'Produto.java compilado',
            caption: '<b>Classe</b> é o molde. Ela declara quais dados e comportamentos pertencem a um Produto.'
          },
          {
            speaker: 'beto',
            lia: 'Agora use o molde.',
            beto: 'Vou chamar o construtor com new!',
            code: 'Produto teclado =\n    new Produto("Teclado", 320.0, 12);',
            memory: [{name:'teclado', lines:['nome = Teclado','preco = 320.0','estoque = 12']}],
            console: 'objeto teclado criado',
            caption: '<b>Objeto</b> é uma ficha concreta criada com <code>new</code>. O construtor recebe os valores iniciais.'
          },
          {
            speaker: 'tico',
            lia: 'E o mouse?',
            beto: 'Uso o mesmo molde, mas nasce outra ficha.',
            code: 'Produto mouse =\n    new Produto("Mouse", 89.0, 5);',
            memory: [
              {name:'teclado', lines:['nome = Teclado','preco = 320.0','estoque = 12']},
              {name:'mouse', lines:['nome = Mouse','preco = 89.0','estoque = 5']}
            ],
            console: '2 objetos independentes',
            caption: '<b>Regra central:</b> uma classe é o molde; cada <code>new</code> cria um objeto independente.'
          }
        ]
      },
      {
        title: '2 · A portaria do estado',
        steps: [
          {
            speaker: 'lia',
            lia: 'Alguém tentou mudar o preço do teclado para menos cinquenta.',
            beto: 'Se o campo estiver aberto, o valor entra…',
            code: 'teclado.preco = -50.0;',
            memory: [{name:'teclado', lines:['preco = 320.0','estado atual']}],
            console: 'error: preco has private access',
            caption: '<b>Problema:</b> o objeto precisa proteger um estado que não faz sentido para o negócio.'
          },
          {
            speaker: 'tico',
            lia: 'Quem decide se o valor pode entrar?',
            beto: 'O setter vira a portaria.',
            code: 'public void setPreco(double preco) {\n  if (preco >= 0) {\n    this.preco = preco;\n  }\n}',
            memory: [{name:'teclado', lines:['preco = 320.0','campo private']}],
            console: 'a regra mora no objeto',
            caption: '<code>private</code> fecha o acesso direto. O método público controla a alteração.'
          },
          {
            speaker: 'beto',
            lia: 'Teste o valor inválido pela porta certa.',
            beto: 'A portaria recusou e o preço antigo ficou intacto!',
            code: 'teclado.setPreco(-50.0);',
            memory: [{name:'teclado', lines:['preco = 320.0','-50.0 recusado']}],
            console: 'Preço inválido',
            caption: '<b>Estado preservado:</b> a tentativa aconteceu, mas o objeto continuou válido.'
          },
          {
            speaker: 'tico',
            lia: 'E trezentos e cinquenta?',
            beto: 'Passa na regra.',
            code: 'teclado.setPreco(350.0);\nSystem.out.println(teclado.getPreco());',
            memory: [{name:'teclado', lines:['preco = 350.0','valor aceito']}],
            console: '350.0',
            caption: '<b>Regra central:</b> campos guardam o estado; métodos controlam como esse estado é lido e alterado.'
          }
        ]
      },
      {
        title: '3 · O Service organiza',
        steps: [
          {
            speaker: 'lia',
            lia: 'Já temos produtos. Onde ficam cadastrar, buscar e remover?',
            beto: 'Tudo dentro do Main ficaria uma bagunça.',
            code: 'ProdutoService service =\n    new ProdutoService();',
            memory: [],
            console: 'lista vazia',
            caption: '<b>Service</b> reúne as regras e operações do caso de uso. O <code>Main</code> apenas pede o trabalho.'
          },
          {
            speaker: 'tico',
            lia: 'Cadastre os dois produtos.',
            beto: 'O Service gera os ids e guarda na lista.',
            code: 'service.cadastrar(teclado);\nservice.cadastrar(mouse);',
            memory: [
              {name:'produtos[0]', lines:['id = 1','Teclado · 12 un.']},
              {name:'produtos[1]', lines:['id = 2','Mouse · 5 un.']}
            ],
            console: '2 produtos cadastrados',
            caption: '<code>List&lt;Produto&gt;</code> é uma coleção que aceita objetos do tipo Produto.'
          },
          {
            speaker: 'beto',
            lia: 'Busque o produto dois.',
            beto: 'O método percorre a lista e devolve o mouse.',
            code: 'Produto achado = service.buscarPorId(2L);',
            memory: [
              {name:'produtos[0]', lines:['id = 1','Teclado']},
              {name:'produtos[1] ✓', lines:['id = 2','Mouse encontrado']}
            ],
            console: '#2 Mouse',
            caption: 'O método esconde o passo a passo da busca. Quem usa o Service só precisa saber o verbo.'
          },
          {
            speaker: 'tico',
            lia: 'E se o id não existir?',
            beto: 'Hoje conferimos null antes de usar.',
            code: 'Produto achado = service.buscarPorId(99L);\nif (achado != null) {\n  System.out.println(achado.getNome());\n}',
            memory: [
              {name:'produtos[0]', lines:['id = 1','Teclado']},
              {name:'produtos[1]', lines:['id = 2','Mouse']}
            ],
            console: 'achado = null',
            caption: '<b>Regra central:</b> o Service concentra as operações; quem chama trata o resultado possível.'
          }
        ]
      }
    ];

    const $ = selector => root.querySelector(selector);
    const sceneButtons = [...root.querySelectorAll('[data-jt-scene]')];
    const tracks = window.LLM_AUDIO || {};
    const names = {LIA:'Lia', BETO:'Beto', LLM:'Tico'};
    const audioBase = './assets/audio/teatro-java/audio/';
    let scene = 0;
    let step = 0;
    let playing = false;
    let muted = window.CAP_AUDIO?.isMuted() ?? true;
    let finished = false;
    let timer = null;
    let audio = null;
    let resume = null;
    let generation = 0;

    $('#jt-sound').hidden = Object.keys(tracks).length === 0;

    function setVoice(speaker, subtitle) {
      $('#jt-speaking').textContent = speaker;
      $('#jt-subtitle').textContent = subtitle;
    }

    function clearAudio() {
      if (!audio) return;
      audio.onended = null;
      audio.onerror = null;
      audio.pause();
      audio.removeAttribute('src');
      audio.load();
      audio.remove();
      audio = null;
    }

    function stop(resetQueue = true) {
      playing = false;
      clearTimeout(timer);
      timer = null;
      delete root.dataset.speaker;
      if (audio) audio.pause();
      if (resetQueue) {
        generation += 1;
        resume = null;
        clearAudio();
      }
      $('#jt-play').textContent = '▶ Assistir';
      setVoice('Pausado', resetQueue ? 'Use Assistir para ouvir esta etapa.' : 'Aperte Assistir para continuar do mesmo ponto.');
    }

    function renderMemory(items) {
      const memory = $('#jt-memory');
      memory.replaceChildren();
      if (!items.length) {
        const empty = document.createElement('span');
        empty.className = 'jt-empty';
        empty.textContent = 'nenhum objeto na memória';
        memory.append(empty);
        return;
      }
      items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'jt-object';
        const title = document.createElement('b');
        title.textContent = item.name;
        card.append(title);
        item.lines.forEach(line => {
          const span = document.createElement('span');
          span.textContent = line;
          card.append(span);
        });
        memory.append(card);
      });
    }

    function render(manual = true) {
      const currentScene = scenes[scene];
      const state = currentScene.steps[step];
      delete root.dataset.speaker;
      $('#jt-lia-line').textContent = state.lia;
      $('#jt-beto-line').textContent = state.beto;
      $('#jt-code').textContent = state.code;
      $('#jt-console').textContent = state.console || '// console aguardando';
      $('#jt-caption').innerHTML = state.caption;
      $('#jt-progress').textContent = `${step + 1} / ${currentScene.steps.length} passos`;
      $('#jt-back').disabled = step === 0;
      $('#jt-next').disabled = step === currentScene.steps.length - 1;
      sceneButtons.forEach((button, index) => button.setAttribute('aria-pressed', String(index === scene)));
      renderMemory(state.memory);
      if (manual) setVoice('Avanço manual', 'Esta etapa é silenciosa. Aperte Assistir para ouvir as falas desde este ponto.');
      else if (muted) setVoice('Vozes desligadas', 'A cena continua automaticamente usando as legendas visuais.');
      else setVoice('Preparando a fala', 'A próxima fala começa em instantes.');
    }

    function schedule() {
      const id = ++generation;
      const clips = muted ? [] : (tracks[`${scene}-${step}`] || []);
      let clipIndex = 0;

      const advanceStep = () => {
        resume = () => {
          timer = window.setTimeout(() => {
            resume = null;
            if (id !== generation || !playing) return;
            if (step < scenes[scene].steps.length - 1) {
              step += 1;
              render(false);
              schedule();
            } else {
              finished = true;
              stop(true);
              $('#jt-play').textContent = '↺ Assistir de novo';
              setVoice('Cena concluída', 'Você pode rever a cena ou escolher outra.');
            }
          }, clips.length ? 650 : 4300);
        };
        resume();
      };

      const nextClip = () => {
        if (id !== generation || !playing) return;
        clearTimeout(timer);
        delete root.dataset.speaker;
        clearAudio();
        if (clipIndex >= clips.length) {
          advanceStep();
          return;
        }

        const clip = clips[clipIndex++];
        const current = new Audio(audioBase + clip.file);
        current.hidden = true;
        current.dataset.jtAudio = 'true';
        root.append(current);
        audio = current;
        let settled = false;

        const finishClip = () => {
          if (settled || id !== generation) return;
          settled = true;
          clearTimeout(timer);
          current.pause();
          delete root.dataset.speaker;
          resume = nextClip;
          if (playing) nextClip();
        };

        current.onended = finishClip;
        current.onerror = () => {
          setVoice('Áudio indisponível', 'A legenda continua disponível; avançando para a próxima fala.');
          finishClip();
        };
        current.onplaying = () => {
          if (id !== generation || !playing) return;
          root.dataset.speaker = clip.role === 'LLM' ? 'tico' : clip.role.toLowerCase();
          setVoice(names[clip.role] || clip.role, clip.text);
        };

        resume = () => {
          timer = window.setTimeout(finishClip, Math.max(18000, (clip.duration || 12) * 1000 + 6000));
          current.play().catch(error => {
            if (id !== generation || (error.name === 'AbortError' && !playing)) return;
            setVoice('Clique necessário', 'O navegador bloqueou o áudio. Aperte Assistir novamente.');
            stop(false);
          });
        };
        resume();
      };

      nextClip();
    }

    $('#jt-play').addEventListener('click', () => {
      if (playing) {
        stop(false);
        return;
      }
      if (finished) {
        finished = false;
        step = 0;
        render(false);
      }
      playing = true;
      $('#jt-play').textContent = 'Ⅱ Pausar';
      if (resume) resume();
      else schedule();
    });

    $('#jt-next').addEventListener('click', () => {
      stop(true);
      finished = false;
      if (step < scenes[scene].steps.length - 1) step += 1;
      render(true);
    });

    $('#jt-back').addEventListener('click', () => {
      stop(true);
      finished = false;
      if (step > 0) step -= 1;
      render(true);
    });

    $('#jt-reset').addEventListener('click', () => {
      stop(true);
      finished = false;
      step = 0;
      render(true);
    });

    sceneButtons.forEach(button => button.addEventListener('click', () => {
      stop(true);
      finished = false;
      scene = Number(button.dataset.jtScene);
      step = 0;
      render(true);
    }));

    $('#jt-sound').addEventListener('click', () => window.CAP_AUDIO.setMuted(!muted));
    document.addEventListener('cap-audio:change', () => {
      stop(true);
      muted = window.CAP_AUDIO.isMuted();
      $('#jt-sound').setAttribute('aria-pressed', String(!muted));
      $('#jt-sound').textContent = muted ? '🔇 Som do capítulo desligado' : '🔊 Som do capítulo ligado';
      setVoice(muted ? 'Som desligado neste aparelho' : 'Som ligado neste aparelho', 'Clique em Assistir para continuar. Esta preferência vale para todos os teatros.');
    });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden && playing) stop(false);
    });
    document.addEventListener('duke-theater-start', () => { if (playing) stop(false); });
    document.addEventListener('visual-lab-start', () => { if (playing) stop(false); });

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(entries => {
        if (!entries[0].isIntersecting && playing) stop(false);
      }, { threshold: .08 }).observe(root);
    }

    $('#jt-sound').setAttribute('aria-pressed', String(!muted));
    $('#jt-sound').textContent = muted ? '🔇 Som do capítulo desligado' : '🔊 Som do capítulo ligado';
    render(true);
  }

  const serviceRoot = document.getElementById('service-lab');
  if (serviceRoot) {
    const list = serviceRoot.querySelector('#service-list');
    const output = serviceRoot.querySelector('#service-console');
    let products = [];
    let nextId = 1;

    function draw(message, error = false) {
      list.replaceChildren();
      if (!products.length) {
        const empty = document.createElement('span');
        empty.className = 'jt-empty';
        empty.textContent = 'lista vazia';
        list.append(empty);
      } else {
        products.forEach(product => {
          const row = document.createElement('div');
          row.className = 'service-row';
          const name = document.createElement('span');
          name.textContent = `#${product.id} ${product.nome}`;
          const stock = document.createElement('span');
          stock.textContent = `${product.estoque} un.`;
          row.append(name, stock);
          list.append(row);
        });
      }
      output.classList.toggle('error', error);
      output.textContent = message;
    }

    serviceRoot.querySelectorAll('[data-service]').forEach(button => button.addEventListener('click', () => {
      const action = button.dataset.service;
      if (action === 'add') {
        const samples = [
          {nome:'Teclado Mecânico', estoque:12},
          {nome:'Mouse Gamer', estoque:5},
          {nome:'Monitor 27 pol.', estoque:3}
        ];
        const sample = samples[products.length % samples.length];
        products.push({...sample, id:nextId++});
        draw('cadastrar(produto)\n> id gerado e produto adicionado');
      }
      if (action === 'list') {
        draw(`listar()\n> ${products.length} produto(s)`);
      }
      if (action === 'find') {
        const found = products.find(product => product.id === 2);
        draw(`buscarPorId(2L)\n> ${found ? found.nome : 'null'}`, !found);
      }
      if (action === 'remove') {
        const before = products.length;
        products = products.filter(product => product.id !== 2);
        draw(`remover(2L)\n> ${before !== products.length ? 'true' : 'false'}`);
      }
      if (action === 'reset') {
        products = [];
        nextId = 1;
        draw('// estado reiniciado');
      }
    }));

    draw('// escolha uma operação');
  }

  document.querySelectorAll('.quiz').forEach(quiz => {
    quiz.querySelectorAll('.quiz-opt').forEach(option => option.addEventListener('click', () => {
      window.setTimeout(() => {
        const feedback = quiz.querySelector('.quiz-feedback');
        if (!feedback || feedback.querySelector('.quiz-retry')) return;
        const retry = document.createElement('button');
        retry.type = 'button';
        retry.className = 'quiz-retry';
        retry.textContent = '↺ Tentar novamente';
        retry.addEventListener('click', () => {
          quiz.querySelectorAll('.quiz-opt').forEach(button => {
            button.disabled = false;
            button.classList.remove('correct', 'wrong');
          });
          feedback.classList.remove('show');
          feedback.replaceChildren();
        });
        feedback.append(retry);
      }, 0);
    }));
  });
})();
