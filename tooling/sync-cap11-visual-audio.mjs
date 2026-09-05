// Extrai as legendas para o gerador; nunca acessa credenciais nem serviços pagos.
import {readFileSync, writeFileSync} from 'node:fs';
import vm from 'node:vm';
const chapter=new URL('../capitulos/11-java-oo-basico/',import.meta.url);
const context={window:{}};
for(const file of ['visual-lab-scenes.js','visual-lab-extra.js'])vm.runInNewContext(readFileSync(new URL(file,chapter),'utf8'),context);
if(process.argv.includes('--manifest')){
  const path=new URL('assets/audio/visual-lab/audio/manifest.js',chapter);
  writeFileSync(path,readFileSync(path,'utf8').replace('window.LLM_AUDIO =','window.VISUAL_LAB_AUDIO ='));
}else{
  const script={};
  context.window.JAVA_VISUAL_SCENES.forEach((scene,i)=>scene.steps.forEach((step,j)=>{script[`${i}-${j}`]=[{role:step.speaker,text:step.talk}];}));
  writeFileSync(new URL('assets/audio/visual-lab/roteiro.json',chapter),JSON.stringify(script,null,2)+'\n');
  console.log(Object.keys(script).length+' etapas sincronizadas. Nenhum áudio gerado.');
}
