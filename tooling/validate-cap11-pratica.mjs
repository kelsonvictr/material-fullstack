// Gera projetos temporários de teste; não altera o projeto Java do aluno.
import { readFileSync, mkdtempSync, mkdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { runInNewContext } from 'node:vm';
import assert from 'node:assert/strict';

const chapter = new URL('../capitulos/11-java-oo-basico/', import.meta.url);
const source = readFileSync(new URL('pratica-fluxo.js', chapter), 'utf8');
const start = source.indexOf('const blocks = ') + 'const blocks = '.length;
const blocks = runInNewContext(source.slice(start, source.indexOf('\n\n  // Sintaxe')).trim().replace(/;$/, ''));
const html = readFileSync(new URL('index.html', chapter), 'utf8');
const snippets = [...html.matchAll(/<pre[^>]*>([\s\S]*?)<\/pre>/g)].map(m => m[1].replace(/<[^>]*>/g, '').replaceAll('&lt;', '<').replaceAll('&gt;', '>').replaceAll('&quot;', '"').replaceAll('&amp;', '&'));
const produto = snippets.find(s => /public class Produto\s*\{/.test(s));
const service = snippets.find(s => /public class ProdutoService\s*\{/.test(s));
assert(produto && service, 'Classes do capítulo precisam existir');
const expected = [
  'Meu primeiro programa Java\nPrograma AI',
  'Aluno: Ana\nTurma: Fullstack\nMeta: aprender Java',
  'Valor em estoque: 45.0\nRepor Caderno',
  'Etiqueta 1\nEtiqueta 2\nEtiqueta 3\nEtiqueta 4',
  'Teclado: 2\nMouse: 6', '4\n8', 'Preço inválido\n80.0\n90.0',
  'Estoque inválido\n6\n0', 'Lápis\ntrue\nLápis',
  'Produto não encontrado\nfalse\nPasta\nRégua', '2', 'true\n5\nfalse\nfalse\n5'
];
const tasks = blocks.flatMap(b => b.exercises);
assert.equal(tasks.length, 12);
assert.equal(tasks.reduce((n, ex) => n + ex.minutes, 0), 112);
const javaHome = process.env.JAVA_HOME || execFileSync('/usr/libexec/java_home', ['-v', '21'], {encoding: 'utf8'}).trim();
const temp = mkdtempSync(join(tmpdir(), 'cap11-pratica-'));
function test(ex, output, name) {
  const dir = join(temp, name); mkdirSync(dir);
  const main = ex.full ? ex.code : `package br.com.gestorpro;\npublic class Main { public static void main(String[] args) {\n${ex.code}\n} }`;
  writeFileSync(join(dir, 'Main.java'), main);
  writeFileSync(join(dir, 'Produto.java'), ex.productMethod ? produto.replace(/}\s*$/, ex.productMethod + '\n}') : produto);
  writeFileSync(join(dir, 'ProdutoService.java'), ex.method ? service.replace(/}\s*$/, ex.method + '\n}') : service);
  execFileSync(join(javaHome, 'bin/javac'), ['-encoding', 'UTF-8', '-d', dir, ...['Main', 'Produto', 'ProdutoService'].map(n => join(dir, n + '.java'))]);
  const actual = execFileSync(join(javaHome, 'bin/java'), ['-cp', dir, 'br.com.gestorpro.Main'], {encoding: 'utf8'}).trim();
  assert.equal(actual, output, name); console.log('OK ' + name);
}
tasks.forEach((ex, i) => test(ex, expected[i], `atividade-${i + 1}`));
test({...tasks[2], code: tasks[2].code.replace('estoque = 3', 'estoque = 5')}, 'Valor em estoque: 75.0', 'limite-estoque-5');
test({...tasks[3], code: tasks[3].code.replace('quantidade = 4', 'quantidade = 0')}, '', 'limite-etiquetas-zero');
test({...tasks[10], code: 'ProdutoService service = new ProdutoService(); System.out.println(service.contarComEstoque());'}, '0', 'lista-vazia');
test({...tasks[11], code: tasks[11].code + '\nSystem.out.println(service.repor(1L, -2));\nSystem.out.println(livro.getEstoque());'}, expected[11] + '\nfalse\n5', 'reposicao-negativa');
test({productMethod: 'public double valorEmEstoque() { return preco * estoque; }', code: 'Produto fone = new Produto("Fone", 80.0, 2); fone.setPreco(90.0); System.out.println(fone.valorEmEstoque());'}, '180.0', 'visual-metodo-calculo');
const visual = {window:{}};
runInNewContext(readFileSync(new URL('visual-lab-scenes.js',chapter),'utf8'),visual);
test({code:visual.window.JAVA_VISUAL_SCENES[2].steps.map(s=>s.code).join('\n')}, '8\n1\nTeclado', 'visual-referencias-service');
runInNewContext(readFileSync(new URL('visual-lab-extra.js',chapter),'utf8'),visual);
test({code:visual.window.JAVA_VISUAL_SCENES[3].solution}, '8\n2\n8\n9', 'visual-crachas-pratica');
test({code:visual.window.JAVA_VISUAL_SCENES[3].steps.filter(s=>!s.predict).map(s=>s.code).join('\n')}, '2\n8\n8\n2\n2\n8', 'visual-crachas-sequencia');
const methodSolution=visual.window.JAVA_VISUAL_SCENES[4].solution.split('// Dentro do main:');
test({productMethod:methodSolution[0],code:methodSolution[1]}, '240.0\n320.0\n2', 'visual-encomenda-pratica');
test({productMethod:methodSolution[0],code:'Produto fone = new Produto("Fone", 80.0, 2); double total = fone.subtotal(3);'}, '', 'visual-return-nao-imprime');
test({code:'Produto fone = new Produto("Fone", 80.0, 2); fone.setNome("Headset"); System.out.println(fone.getNome());'}, 'Headset', 'visual-this-campo');
const failDir=join(temp,'visual-private');mkdirSync(failDir);
writeFileSync(join(failDir,'Produto.java'),produto);
writeFileSync(join(failDir,'Main.java'),'package br.com.gestorpro; public class Main { public static void main(String[] args) { Produto fone = new Produto("Fone",80,2); fone.preco = 90; } }');
let rejected=false;
try{execFileSync(join(javaHome,'bin/javac'),['-encoding','UTF-8','-d',failDir,join(failDir,'Produto.java'),join(failDir,'Main.java')],{stdio:'pipe'});}catch(error){rejected=error.status!==0 && /private/.test(error.stderr.toString());}
assert(rejected,'Acesso direto ao campo private precisa falhar na compilação');console.log('OK visual-private-nao-compila');
console.log('24 cenários Java 21 passaram. Projetos temporários: ' + temp);
