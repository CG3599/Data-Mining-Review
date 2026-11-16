const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),ctx=vm.createContext({});
for(const name of ['week10-classification','week10-libsvm','week10-recommendation','week10-social','week10'])vm.runInContext(fs.readFileSync(path.join(root,name+'.js'),'utf8'),ctx);
const sections=vm.runInContext('week10Sections()',ctx),modules=vm.runInContext('week10Modules',ctx);
assert.equal(sections.length,31);assert.equal(new Set(sections.map(s=>s.start)).size,31);
for(const [i,m] of modules.entries()){
 const group=sections.filter(s=>s.file===m.file);assert.equal(group[0].start,i+1);
 assert.deepEqual(Array.from(group.flatMap(s=>s.pages.map(p=>p.page))),Array.from(m.pages,p=>p.page));
 for(const s of group){assert.equal(s.pages[0].page,s.first);assert.equal(s.pages.at(-1).page,s.last);assert.equal(s.pages.length,s.last-s.first+1)}
}
console.log('31 sections cover 207 pages exactly once; 4 legacy module links preserved.');
