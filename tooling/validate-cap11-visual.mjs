// Testes determinísticos dos estados SVG; complementar com verificação no navegador.
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
import assert from 'node:assert/strict';
const chapter=new URL('../capitulos/11-java-oo-basico/',import.meta.url);
let nodes;
const context={window:{},document:{querySelector(selector){return nodes.get(selector.split(' ')[0].slice(1));}}};
for(const file of ['visual-lab-scenes.js','visual-lab-extra.js','assets/audio/visual-lab/audio/manifest.js'])runInNewContext(readFileSync(new URL(file,chapter),'utf8'),context);
const {JAVA_VISUAL_SCENES:scenes,JAVA_VISUAL_EXTRA:extra,VISUAL_LAB_AUDIO:audio}=context.window;
let narrations=0,frames=0;
for(const [i,scene] of scenes.entries())for(const [j,step] of scene.steps.entries()){
  assert.equal(audio[`${i}-${j}`][0].text,step.talk);narrations++;
  const svg=extra.render(scene.id,step.action);if(!svg)continue;
  const ids=[...svg.matchAll(/id="([^"]+)"/g)].map(m=>m[1]);assert.equal(ids.length,new Set(ids).size);
  function sample(progress,history=[]){
    nodes=new Map(ids.map(id=>[id,{attributes:{},textContent:''}]));
    const api={set(id,key,value){assert(nodes.has(id),id);assert(!/NaN|Infinity/.test(String(value)));nodes.get(id).attributes[key]=value;},words(id,text){assert(nodes.has(id),id);nodes.get(id).textContent=text;},visible(id,value){this.set(id,'opacity',value?1:0);}};
    api.visible=(id,value)=>api.set(id,'opacity',value?1:0);
    for(const p of [...history,progress])assert.equal(extra.paint(scene.id,step.action,p,api),true);
    return Object.fromEntries(nodes);
  }
  for(const p of [0,.2,.5,.8,1])assert.deepEqual(sample(p),sample(p,[1,.7,0]),`${scene.id}/${step.action}/${p}`);
  const final=sample(1);
  if(scene.id==='referencias'){
    assert.equal(String(final['vx-stock-A'].textContent),String([2,5,5,5,8,8][j]));
    assert.equal(final['vx-stock-B'].textContent,2);
  }
  if(scene.id==='encomenda'){
    assert.equal(final['vx-name'].textContent,j>=2?'Headset':'Fone');
    assert.equal(final['vx-total'].textContent,j>=4?'240.0':'—');
    assert.equal(final['vx-console'].textContent,j===5?'240.0':'sem saída');
  }
  frames++;
}
assert.equal(narrations,31);assert.equal(frames,14);
console.log('31 legendas correspondentes; 14 cenas novas com 5 pontos de tempo revisitáveis e estados finais corretos.');
