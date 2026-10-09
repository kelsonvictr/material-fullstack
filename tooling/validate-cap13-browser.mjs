// Requer Playwright (ou playwright-core) e um Chrome; veja capitulos/13-spring-dto-validacao/apoio/README.md.
import { mkdtempSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import assert from 'node:assert/strict';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.CAP13_BASE_URL || 'http://127.0.0.1:8762';
const shots = mkdtempSync(join(tmpdir(), 'cap13-browser-'));
const macChrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const executablePath = process.env.CHROME_PATH || (existsSync(macChrome) ? macChrome : undefined);
const browser = await chromium.launch({ executablePath, headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await page.context().grantPermissions(['clipboard-read', 'clipboard-write'], { origin: base });
const errors = []; page.on('pageerror', e => errors.push(e.message));
await page.goto(base + '/capitulos/13-spring-dto-validacao/'); await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: join(shots, 'desktop.png') });

// Triagem
await page.locator('#triagem select[data-field="id"]').selectOption('entrada');
await page.locator('#triage-check').click(); assert.match(await page.locator('#triage-feedback').innerText(), /Faltam 3/);
for (const [f, v] of [['id', 'saida'], ['nome', 'ambos'], ['preco', 'ambos'], ['criadoEm', 'saida']]) await page.locator(`#triagem select[data-field="${f}"]`).selectOption(v);
await page.locator('#triage-check').click(); assert.match(await page.locator('#triage-feedback').innerText(), /^✓ Isso/);

// LAB 01: sem DTO sobrescreve a linha 1; com DTO cria a linha 3; trocar de modo reinicia
await page.locator('#dto-lab').scrollIntoViewIfNeeded();
while (await page.locator('#dto-next').isEnabled()) await page.locator('#dto-next').click();
assert.equal(await page.locator('#dto-rows tr.changed td').first().innerText(), '1');
assert.match(await page.locator('#dto-response').innerText(), /nada foi criado/);
await page.locator('[data-dto-mode="com"]').click(); assert.equal(await page.locator('#dto-step').innerText(), '1 / 5');
while (await page.locator('#dto-next').isEnabled()) await page.locator('#dto-next').click();
assert.equal(await page.locator('#dto-rows tr.added td').first().innerText(), '3');
assert.equal(await page.locator('#dto-chips [data-chip="id"]').getAttribute('data-state'), 'out');
await page.locator('#dto-prev').click(); assert.equal(await page.locator('#dto-step').innerText(), '4 / 5');
await page.locator('#dto-reset').click(); assert.equal(await page.locator('#dto-rows tr').count(), 2);
await page.locator('#dto-lab').screenshot({ path: join(shots, 'lab01.png') });

// LAB 02: com e sem @Valid, inclusive o 500 do banco
const door = async (c, valid) => {
  await page.locator('#door-case').selectOption(c); await page.locator('#door-valid').setChecked(valid);
  await page.locator('#door-send').click(); return page.locator('#door-status').innerText();
};
await page.locator('#door-lab').scrollIntoViewIfNeeded();
assert.equal(await door('valido', true), '201 Created');
assert.equal(await door('vazio', true), '400 Bad Request'); assert.equal(await page.locator('#door-rules [data-state="fail"]').count(), 1);
assert.equal(await door('negativo', false), '201 Created'); assert.match(await page.locator('#door-db').innerText(), /⚠️/);
assert.equal(await door('semestoque', false), '500 Internal Server Error');
assert.equal(await door('semestoque', true), '400 Bad Request');
await page.locator('#door-reset').click(); assert.equal(await page.locator('#door-rows').innerText(), '2 produto(s)');

// LAB 03: peças que nunca trabalham ficam marcadas no último passo
for (const [c, status, skipped] of [['valid', '201', ['handler']], ['invalid', '400', ['controller', 'service', 'mapper', 'repository', 'database']], ['missing', '404', ['door', 'mapper', 'handler']], ['supplier', '404', ['handler']]]) {
  await page.locator('#request-case').selectOption(c);
  while (await page.locator('#request-next').isEnabled()) await page.locator('#request-next').click();
  assert.match(await page.locator('#request-response').innerText(), new RegExp(status));
  const off = await page.locator('[data-layer].skipped').evaluateAll(ns => ns.map(n => n.dataset.layer));
  assert.deepEqual(off.sort(), [...skipped].sort(), c);
  await page.locator('#request-prev').click(); assert.equal(await page.locator('[data-layer].skipped').count(), 0);
  await page.locator('#request-reset').click(); assert.match(await page.locator('#request-step').innerText(), /^1 \//);
}

// Quizzes: errar mostra explicação e convite; acertar confirma
const quizzes = await page.locator('.decision').all();
for (const quiz of quizzes) {
  await quiz.locator('[data-choice="false"]').first().click(); assert.match(await quiz.locator('.feedback').innerText(), /Ainda não/);
  await quiz.locator('[data-choice="true"]').click(); assert.match(await quiz.locator('.feedback').innerText(), /Isso/);
}

// Menu, teclado, cópia, olhinhos, ligaduras e linhas destacadas
await page.locator('.menu-toggle').click(); assert.equal(await page.locator('#chapter-menu').evaluate(e => e.inert), false);
await page.keyboard.press('Escape'); assert.equal(await page.locator('#chapter-menu').evaluate(e => e.inert), true);
await page.locator('.menu-toggle').click(); await page.locator('.sidebar-link[href="#fornecedor"]').click();
assert.equal(await page.evaluate(() => document.activeElement.id), 'fornecedor');
await page.locator('#post .copy-code').first().click();
await page.waitForFunction(() => /Copiado|Selecionei/.test(document.querySelector('#post .copy-code').textContent));
const copiado = await page.evaluate(() => navigator.clipboard.readText().catch(() => ''));
if (copiado) assert.ok(!copiado.includes('<span'), 'cópia não pode levar HTML');
await page.locator('#cliente details.answer').last().locator('summary').click();
assert.equal(await page.locator('#cliente details.answer').last().getAttribute('open'), '');
const lig = await page.locator('pre[data-stage="2"]').first().evaluate(e => getComputedStyle(e).fontVariantLigatures);
assert.equal(lig, 'none');
assert.ok(await page.locator('pre[data-stage="2"][data-file="service/ProdutoService.java"] .novo').count() >= 5);
assert.equal(await page.locator('pre[data-stage="9"] .novo').count(), 0, 'arquivos novos não destacam linhas');

// Celular: nada de rolagem horizontal; avisos em texto corrido
await page.setViewportSize({ width: 390, height: 844 }); await page.evaluate(() => window.scrollTo(0, 0));
await page.screenshot({ path: join(shots, 'mobile.png') });
for (const id of await page.locator('.step-section').evaluateAll(ns => ns.map(n => n.id))) {
  await page.locator('#' + id).scrollIntoViewIfNeeded();
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, id);
}
assert.equal(await page.locator('.warning').first().evaluate(e => getComputedStyle(e).display), 'block');
await page.locator('#door-lab').screenshot({ path: join(shots, 'mobile-lab02.png') });
await page.emulateMedia({ reducedMotion: 'reduce' });
assert.equal(await page.locator('.step-section').first().evaluate(e => getComputedStyle(e).transitionDuration), '0s');

// Caderno separado do Cap 12
await page.goto(base + '/capitulos/13-spring-dto-validacao/caderno.html');
await page.locator('.cad-texto').fill('Teste Cap 13: o DTO conversa com o mundo.');
await page.waitForTimeout(600); await page.reload();
assert.match(await page.locator('.cad-texto').inputValue(), /Teste Cap 13/);
assert.equal(await page.evaluate(() => Object.keys(localStorage).some(k => k.includes('cap13'))), true);

assert.equal(errors.length, 0, errors.join('\n'));
console.log(`OK: desktop e 390px, triagem, 3 simulações (incl. voltar/reiniciar/trocar caso), ${quizzes.length} quizzes com erro/acerto, menu/teclado, cópia, olhinhos, ligaduras, linhas novas, movimento reduzido e caderno cap13.`);
console.log('Capturas: ' + shots);
await browser.close();
