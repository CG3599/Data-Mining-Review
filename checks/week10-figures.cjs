const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');const context=vm.createContext({document:{addEventListener(){}}});
vm.runInContext(fs.readFileSync(path.join(root,'week10-figures.js'),'utf8'),context);
const figures=vm.runInContext('Object.entries(week10Figures)',context);assert.equal(figures.length,18);
for(const [key,f] of figures){const svg=fs.readFileSync(path.join(root,f.src),'utf8');assert(svg.includes('<title')&&svg.includes('<desc'));assert(f.caption.length>30);const page=Number(key.match(/-(\d+)$/)[1]);assert(page>=1)}
for(const [threshold,want] of [[1,[0,0,5,5]],[.8,[2,1,4,3]],[.5,[4,2,3,1]],[0,[5,5,0,0]]]){const c=vm.runInContext('week10RocCounts('+threshold+')',context);assert.deepEqual([c.tp,c.fp,c.tn,c.fn],want);assert.equal(c.tp+c.fn,5);assert.equal(c.fp+c.tn,5)}
console.log('18 SVG figures and 4 independent ROC count cases verified.');
