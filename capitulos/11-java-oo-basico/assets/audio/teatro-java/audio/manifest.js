// Áudios locais gerados via ElevenLabs. Sem credenciais.
window.LLM_AUDIO = {
  "0-0": [
    {
      "file": "lia-8338769dddc463cb6e84.mp3",
      "role": "LIA",
      "text": "Beto, precisamos cadastrar um teclado e um mouse. Como o Java sabe quais dados formam um produto?",
      "duration": 7.291066
    },
    {
      "file": "beto-0f51ad69dc4db0495ce3.mp3",
      "role": "BETO",
      "text": "Posso criar algumas variáveis?",
      "duration": 1.671837
    }
  ],
  "0-1": [
    {
      "file": "llm-3bd46dadc123600c5dd2.mp3",
      "role": "LLM",
      "text": "Primeiro definimos o molde. A classe Produto declara que todo produto possui nome, preço e estoque.",
      "duration": 8.405624
    },
    {
      "file": "beto-789c02aeae10446ab978.mp3",
      "role": "BETO",
      "text": "Então a classe é como uma ficha em branco.",
      "duration": 2.229116
    }
  ],
  "0-2": [
    {
      "file": "beto-5f59573ed7edf8d83729.mp3",
      "role": "BETO",
      "text": "Agora uso new e chamo o construtor para criar o teclado.",
      "duration": 3.065034
    },
    {
      "file": "llm-32d8b51d5e309f6e1aa6.mp3",
      "role": "LLM",
      "text": "Exato. New cria um objeto na memória. O construtor recebe os valores iniciais dessa nova ficha.",
      "duration": 7.523265
    }
  ],
  "0-3": [
    {
      "file": "lia-62c4bc80917b513fbd0a.mp3",
      "role": "LIA",
      "text": "E para cadastrar o mouse?",
      "duration": 1.300317
    },
    {
      "file": "beto-0b9e2e32e6cecdabc0a5.mp3",
      "role": "BETO",
      "text": "Uso o mesmo molde, mas crio outra ficha com new.",
      "duration": 2.832834
    },
    {
      "file": "llm-c5d08587f22d769ecdde.mp3",
      "role": "LLM",
      "text": "Essa é a regra: uma classe é o molde. Cada new cria um objeto independente.",
      "duration": 7.244626
    }
  ],
  "1-0": [
    {
      "file": "lia-f4c9a5ecc3f2c5acd451.mp3",
      "role": "LIA",
      "text": "Alguém tentou mudar o preço do teclado para menos cinquenta.",
      "duration": 3.157914
    },
    {
      "file": "beto-f30a64605a3d8c173904.mp3",
      "role": "BETO",
      "text": "Se o campo estiver aberto, esse valor inválido entra no objeto.",
      "duration": 3.390113
    }
  ],
  "1-1": [
    {
      "file": "lia-c84df838db81ca1a1538.mp3",
      "role": "LIA",
      "text": "Quem decide se o novo preço pode entrar?",
      "duration": 2.182676
    },
    {
      "file": "beto-de15cf8d344a63832a35.mp3",
      "role": "BETO",
      "text": "O setter vira a portaria do preço.",
      "duration": 2.089796
    },
    {
      "file": "llm-7fc005c73bbbdf6310dd.mp3",
      "role": "LLM",
      "text": "Private fecha o acesso direto. O método público verifica a regra antes de alterar o estado.",
      "duration": 7.337506
    }
  ],
  "1-2": [
    {
      "file": "lia-d6727fd4a4204defc0a1.mp3",
      "role": "LIA",
      "text": "Teste menos cinquenta pela porta certa.",
      "duration": 2.182676
    },
    {
      "file": "beto-d8dbb61862fdbf75c7bb.mp3",
      "role": "BETO",
      "text": "A portaria recusou. O preço continua trezentos e vinte.",
      "duration": 3.250794
    },
    {
      "file": "llm-9f0c2f16049c09d2a70a.mp3",
      "role": "LLM",
      "text": "A tentativa aconteceu, mas o objeto permaneceu válido. O estado anterior foi preservado.",
      "duration": 7.012426
    }
  ],
  "1-3": [
    {
      "file": "lia-b514fa27a2d346c70e18.mp3",
      "role": "LIA",
      "text": "E o preço trezentos e cinquenta?",
      "duration": 1.904036
    },
    {
      "file": "beto-f0eb5591e76efd80140b.mp3",
      "role": "BETO",
      "text": "Esse passa na regra e atualiza o objeto.",
      "duration": 2.368435
    },
    {
      "file": "llm-430cd73b33760db3a01d.mp3",
      "role": "LLM",
      "text": "Campos guardam o estado. Métodos controlam como esse estado é lido e alterado.",
      "duration": 7.058866
    }
  ],
  "2-0": [
    {
      "file": "lia-72605dd06b62958b50d2.mp3",
      "role": "LIA",
      "text": "Já temos produtos. Onde ficam as operações de cadastrar, buscar e remover?",
      "duration": 4.458231
    },
    {
      "file": "beto-1f38b9d48bf610d366da.mp3",
      "role": "BETO",
      "text": "Se eu colocar tudo no Main, ele vira uma bagunça.",
      "duration": 2.647075
    }
  ],
  "2-1": [
    {
      "file": "lia-7bb4d9adfcf307fe58d7.mp3",
      "role": "LIA",
      "text": "Cadastre o teclado e o mouse.",
      "duration": 1.671837
    },
    {
      "file": "beto-26e13b61f18106e3d032.mp3",
      "role": "BETO",
      "text": "O Produto Service gera os identificadores e guarda os objetos na lista.",
      "duration": 3.854512
    },
    {
      "file": "llm-5a588c69ae3ea0bd7a2a.mp3",
      "role": "LLM",
      "text": "List de Produto é uma coleção que aceita objetos do tipo Produto.",
      "duration": 5.479909
    }
  ],
  "2-2": [
    {
      "file": "lia-df46bb502b7a2d550a03.mp3",
      "role": "LIA",
      "text": "Agora busque o produto de identificador dois.",
      "duration": 2.414875
    },
    {
      "file": "beto-3ccbf5b1bee17da089c0.mp3",
      "role": "BETO",
      "text": "O método percorre a lista e devolve o mouse.",
      "duration": 2.507755
    },
    {
      "file": "llm-e92cb871ed91be373c2e.mp3",
      "role": "LLM",
      "text": "Quem usa o Service pede o verbo. O passo a passo da busca fica escondido dentro do método.",
      "duration": 6.640907
    }
  ],
  "2-3": [
    {
      "file": "lia-42641078b8da48796731.mp3",
      "role": "LIA",
      "text": "E se o identificador não existir?",
      "duration": 2.182676
    },
    {
      "file": "beto-8abfa071caf86504f984.mp3",
      "role": "BETO",
      "text": "Hoje eu confiro se o resultado é nulo antes de chamar outro método.",
      "duration": 3.482993
    },
    {
      "file": "llm-8e423bb4502b1f277015.mp3",
      "role": "LLM",
      "text": "O Service concentra as operações. Quem chama trata o resultado possível. No Spring, vamos evoluir esse caso.",
      "duration": 8.544943
    }
  ]
};
