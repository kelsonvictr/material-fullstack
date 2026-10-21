#!/usr/bin/env node
/* Gera o capítulo secreto (capitulos/12b-secreto/index.html) com o conteúdo CRIPTOGRAFADO.

   Fonte em claro: tooling/secreto/fonte.html (ignorada pelo git; o repositório é público).
   Saída: uma página com o cadeado + o conteúdo cifrado (AES-256-GCM, chave PBKDF2-SHA256).
   O navegador do aluno decifra com a senha; sem ela, nem o código-fonte da página revela nada.

   Senha, nesta ordem: variável SENHA_SECRETO → Keychain do macOS (serviço material-fullstack-secreto)
   → pergunta no terminal. A senha é comparada sem diferenciar maiúsculas e sem espaços nas pontas.

   Uso (na raiz novo-material-fullstack):
     node tooling/build-secreto.mjs              # cifra a fonte e gera a página
     node tooling/build-secreto.mjs --extrair    # recria a fonte a partir da página publicada
     node tooling/build-secreto.mjs --salvar-senha   # guarda a senha no Keychain
*/
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { createInterface } from 'node:readline/promises';
import crypto from 'node:crypto';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const FONTE = join(ROOT, 'tooling/secreto/fonte.html');
const SAIDA = join(ROOT, 'capitulos/12b-secreto/index.html');
const KEYCHAIN = 'material-fullstack-secreto';
const ITERACOES = 310000;

const normalizar = senha => senha.trim().toLowerCase();

function senhaDoKeychain() {
  try {
    return execFileSync('security', ['find-generic-password', '-s', KEYCHAIN, '-w'], { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
  } catch { return ''; }
}

async function perguntar(texto) {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  const resposta = await rl.question(texto);
  rl.close();
  return resposta;
}

async function obterSenha() {
  const senha = process.env.SENHA_SECRETO || senhaDoKeychain() || await perguntar('Senha do capítulo secreto: ');
  if (!normalizar(senha)) throw new Error('Senha vazia.');
  return normalizar(senha);
}

function cifrar(texto, senha) {
  const salt = crypto.randomBytes(16), iv = crypto.randomBytes(12);
  const chave = crypto.pbkdf2Sync(senha, salt, ITERACOES, 32, 'sha256');
  const cipher = crypto.createCipheriv('aes-256-gcm', chave, iv);
  const corpo = Buffer.concat([cipher.update(texto, 'utf8'), cipher.final(), cipher.getAuthTag()]);
  return { v: 1, it: ITERACOES, s: salt.toString('base64'), i: iv.toString('base64'), c: corpo.toString('base64') };
}

function decifrar(cofre, senha) {
  const chave = crypto.pbkdf2Sync(senha, Buffer.from(cofre.s, 'base64'), cofre.it, 32, 'sha256');
  const dados = Buffer.from(cofre.c, 'base64');
  const decipher = crypto.createDecipheriv('aes-256-gcm', chave, Buffer.from(cofre.i, 'base64'));
  decipher.setAuthTag(dados.subarray(dados.length - 16));
  return Buffer.concat([decipher.update(dados.subarray(0, dados.length - 16)), decipher.final()]).toString('utf8');
}

const pagina = cofre => `<!DOCTYPE html>
<html lang="pt-BR"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="robots" content="noindex"><meta name="description" content="Capítulo secreto: só com a senha do professor."><title>Cap 12b · Secreto | Programa AI</title><link href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&amp;family=JetBrains+Mono:wght@400;600;700&amp;family=Nunito:wght@400;600;700;800;900&amp;display=swap" rel="stylesheet"><link rel="stylesheet" href="../../shared/styles.css"><link rel="stylesheet" href="../../shared/components.css"><link rel="stylesheet" href="../12-spring-primeira-api/cap12.css"><link rel="stylesheet" href="../12-spring-primeira-api/parte0.css"><link rel="stylesheet" href="./secreto.css"></head>
<body class="spring-chapter cofre-fechado"><div class="bg-grid" aria-hidden="true"></div>
<main class="cofre" id="cofre"><form class="cofre-card" id="cofre-form" autocomplete="off"><div class="cofre-ic" aria-hidden="true">🔒</div><span class="hero-badge">CAPÍTULO 12b · SECRETO</span><h1>Este capítulo é <em>secreto</em>.</h1><p>Ele abre só com a senha que o professor passou em sala. Sem a senha, o conteúdo continua embaralhado, até no código da página.</p><label for="cofre-senha">Senha</label><div class="cofre-linha"><input id="cofre-senha" name="senha" type="password" required autocapitalize="off" spellcheck="false"><button type="submit">Abrir 🔓</button></div><label class="cofre-lembrar"><input type="checkbox" id="cofre-lembrar" checked> Lembrar neste navegador</label><p class="cofre-msg" id="cofre-msg" role="status" aria-live="polite"></p><a class="cofre-voltar" href="../../index.html">← Voltar ao mapa do curso</a></form></main>
<noscript><p class="cofre-noscript">Ative o JavaScript para abrir o capítulo.</p></noscript>
<script type="application/json" id="cofre-dados">${JSON.stringify(cofre)}</script>
<script src="./cofre.js"></script>
</body></html>
`;

const args = process.argv.slice(2);
if (args.includes('--salvar-senha')) {
  const senha = normalizar(await perguntar('Senha para guardar no Keychain: '));
  execFileSync('security', ['add-generic-password', '-U', '-s', KEYCHAIN, '-a', process.env.USER || 'prof', '-w', senha]);
  console.log('Senha guardada no Keychain (serviço ' + KEYCHAIN + ').');
} else if (args.includes('--extrair')) {
  const html = readFileSync(SAIDA, 'utf8');
  const cofre = JSON.parse(html.match(/<script type="application\/json" id="cofre-dados">(.*?)<\/script>/s)[1]);
  const texto = decifrar(cofre, await obterSenha());
  mkdirSync(dirname(FONTE), { recursive: true });
  if (existsSync(FONTE) && !args.includes('--forcar')) throw new Error('A fonte já existe. Use --forcar para sobrescrever.');
  writeFileSync(FONTE, texto);
  console.log('Fonte recriada em ' + FONTE);
} else {
  const texto = readFileSync(FONTE, 'utf8');
  const senha = await obterSenha();
  const cofre = cifrar(texto, senha);
  if (decifrar(cofre, senha) !== texto) throw new Error('Falha na conferência da cifra.');
  mkdirSync(dirname(SAIDA), { recursive: true });
  writeFileSync(SAIDA, pagina(cofre));
  console.log(`OK: ${SAIDA} (${Math.round(texto.length / 1024)} KB em claro, cifrado com AES-256-GCM)`);
}
