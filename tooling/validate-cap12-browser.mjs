// Requer Playwright instalado; veja apoio/README.md.
import { mkdtempSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.CAP12_BASE_URL || 'http://127.0.0.1:8762';
const screenshots = mkdtempSync(join(tmpdir(), 'cap12-browser-'));
const macChrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const executablePath = process.env.CHROME_PATH || (existsSync(macChrome) ? macChrome : undefined);
import assert from 'node:assert/strict';
const browser=await chromium.launch({executablePath,headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000}});
await page.context().grantPermissions(['clipboard-read','clipboard-write'],{origin:base});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto(base + '/capitulos/12-spring-primeira-api/');await page.evaluate(()=>document.fonts.ready);
await page.screenshot({path:join(screenshots, 'desktop.png')});
await page.locator('#docker-lab').scrollIntoViewIfNeeded();
assert.equal(await page.locator('[data-container]').innerText(),'Não criado');
for(let i=0;i<6;i++)await page.locator('[data-docker-next]').click();
assert.equal(await page.locator('[data-container]').innerText(),'B · executando');
assert.equal(await page.locator('[data-volume]').innerText(),'1 · TechDistrib');
await page.locator('[data-docker-prev]').click();assert.equal(await page.locator('[data-container]').innerText(),'A · removido');
await page.locator('[data-docker-reset]').click();assert.equal(await page.locator('[data-docker-step]').innerText(),'1 / 7');
await page.locator('#docker-lab').screenshot({path:join(screenshots, 'docker.png')});
await page.locator('#sql-scope').selectOption('all');await page.locator('#sql-operation').selectOption('update');await page.locator('#sql-run').click();
assert.match(await page.locator('#sql-feedback').innerText(),/2 linha/);assert.equal(await page.locator('#sql-rows tr.affected').count(),2);
await page.locator('#sql-operation').selectOption('delete');await page.locator('#sql-run').click();assert.match(await page.locator('#sql-rows').innerText(),/0 registros/);
await page.locator('#sql-reset').click();await page.locator('#sql-operation').selectOption('delete');await page.locator('#sql-run').click();assert.match(await page.locator('#sql-rows').innerText(),/Papelaria/);assert.doesNotMatch(await page.locator('#sql-rows').innerText(),/TechDistrib/);
await page.locator('#sql-run').click();assert.match(await page.locator('#sql-feedback').innerText(),/0 linha/);
await page.locator('#sql-reset').click();await page.locator('#sql-run').click();assert.match(await page.locator('#sql-feedback').innerText(),/1 linha.*consulta não alterou/);
for(const [scenario,count,status] of [['valid','1 registro','201'],['invalid','0 registro','400'],['missing','0 registro','404']]){
 await page.locator('#request-case').selectOption(scenario);
 while(await page.locator('#request-next').isEnabled())await page.locator('#request-next').click();
 assert.match(await page.locator('#request-records').innerText(),new RegExp(count));assert.match(await page.locator('#request-response').innerText(),new RegExp(status));
 await page.locator('#request-prev').click();await page.locator('#request-next').click();
 await page.locator('#request-reset').click();assert.match(await page.locator('#request-step').innerText(),/^1/);
}
for(const quiz of await page.locator('.decision').all()){
 await quiz.locator('[data-choice="false"]').first().click();assert.match(await quiz.locator('.feedback').innerText(),/Ainda não/);
 await quiz.locator('[data-choice="true"]').click();assert.match(await quiz.locator('.feedback').innerText(),/Isso/);
}
await page.locator('.menu-toggle').click();assert.equal(await page.locator('#chapter-menu').evaluate(e=>e.inert),false);
await page.keyboard.press('Shift+Tab');assert.equal(await page.evaluate(()=>document.activeElement.textContent.trim()),'📓 Meu caderno ↗');
await page.keyboard.press('Escape');assert.equal(await page.locator('#chapter-menu').evaluate(e=>e.inert),true);assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'false');
await page.locator('.menu-toggle').click();await page.locator('.sidebar-link[href="#initializr"]').click();assert.equal(await page.evaluate(()=>document.activeElement.id),'initializr');
await page.locator('#post .copy-code').first().click();await page.waitForFunction(()=>/Copiado|Selecionei/.test(document.querySelector('#post .copy-code').textContent));
await page.locator('#sql .exercise summary').last().click();assert.equal(await page.locator('#sql .exercise details').last().getAttribute('open'),'');
const ligatures=await page.locator('pre').first().evaluate(e=>({variant:getComputedStyle(e).fontVariantLigatures,feature:getComputedStyle(e).fontFeatureSettings}));assert.equal(ligatures.variant,'none');
await page.setViewportSize({width:390,height:844});await page.evaluate(()=>window.scrollTo(0,0));await page.screenshot({path:join(screenshots, 'mobile.png')});
for(const id of ['mapa','initializr','docker','sql','camadas','post','viagem','missao']){
 await page.locator('#'+id).scrollIntoViewIfNeeded();
 const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);assert.equal(overflow,false,id);
}
await page.locator('#request-lab').screenshot({path:join(screenshots, 'mobile-lab.png')});
await page.emulateMedia({reducedMotion:'reduce'});assert.equal(await page.locator('.step-section').first().evaluate(e=>getComputedStyle(e).transitionDuration),'0s');
await page.goto(base + '/capitulos/12-spring-primeira-api/caderno.html');
await page.locator('.cad-texto').fill('Teste Cap 12: container e volume são diferentes.');
await page.waitForTimeout(600);await page.reload();assert.match(await page.locator('.cad-texto').inputValue(),/Teste Cap 12/);
assert.equal(errors.length,0,errors.join('\n'));
console.log('OK: desktop, 390px, 3 simulações, 7 quizzes com erro/acerto, cópia, olhinhos, menu/teclado, movimento reduzido e caderno persistente.');
console.log('Capturas: ' + screenshots);
await browser.close();
