const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),context=vm.createContext({});
for(const stem of ['classification','libsvm','recommendation','social'])vm.runInContext(fs.readFileSync(path.join(root,'week10-'+stem+'.js'),'utf8'),context);
const katex=require(path.join(root,'katex.min.js'));
const manifest=JSON.parse(fs.readFileSync(path.join(root,'week10-sources.json'),'utf8'));
const variables=['dmW10Classification','dmW10Libsvm','dmW10Recommendation','dmW10Social'];let total=0,formulas=0;
manifest.forEach((m,i)=>{
 const pages=context[variables[i]];assert.equal(pages.length,m.pages);
 assert.equal(crypto.createHash('sha256').update(fs.readFileSync(path.join(root,'lectures',m.file+'.pdf'))).digest('hex'),m.sha256);
 pages.forEach((p,index)=>{assert.equal(p.page,index+1);assert(p.title && p.body.length>60);assert(fs.existsSync(path.join(root,'figures/week10',m.file+'-'+p.page+'.webp')));
  for(const match of p.body.matchAll(/\\\[([\s\S]*?)\\\]|\\\((.*?)\\\)/g)){katex.renderToString(match[1]??match[2],{strict:'ignore'});formulas++}
  total++;
 });
});assert.equal(total,207);console.log(JSON.stringify({pages:total,modules:manifest.length,formulas,sourceHashes:'verified',slideImages:'verified'}));

