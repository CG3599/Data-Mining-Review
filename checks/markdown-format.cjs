const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),marked=require(path.join(root,'marked.js')),ctx=vm.createContext({notes:{}});
for(const name of ['week1','week2','week4','week6','week7','week9','week10-classification','week10-libsvm','week10-recommendation','week10-social'])vm.runInContext(fs.readFileSync(path.join(root,name+'.js'),'utf8'),ctx);
const entries=[...Object.entries(ctx.notes).map(([n,s])=>['Week '+n,s]),...Object.entries(ctx).filter(([k,v])=>Array.isArray(v)).flatMap(([k,v])=>v.map(p=>[k+' P.'+p.page,p.body]))];
for(const [name,s] of entries)assert(!marked.parse(s).includes('**'),name+' has unrendered bold markers');
assert(marked.parse(ctx.dmW10Classification[4].body).includes('<strong>本頁重點</strong>：'));
assert(marked.parse(ctx.notes[9]).includes('<strong>Combined Classifier（C*）</strong>'));
console.log('All course notes render without leftover bold markers; Chinese labels and literal C* verified.');
