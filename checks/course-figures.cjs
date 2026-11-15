const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),context=vm.createContext({document:{addEventListener(){}}});
vm.runInContext(fs.readFileSync(path.join(root,'course-figures.js'),'utf8'),context);
const figures=vm.runInContext('Object.entries(courseFigures)',context);assert.equal(figures.length,30);
for(const n of [1,2,4,6,7,9])assert.equal(figures.filter(([k])=>k.startsWith(n+'-')).length,5);
for(const [key,f] of figures){const svg=fs.readFileSync(path.join(root,f.src),'utf8');assert(svg.includes('<title')&&svg.includes('<desc'));assert(f.caption.length>30);assert(Number(key.split('-')[1])>0)}
for(const [x,mean,pop,sample] of [[6,'5.00','0.67','1.00'],[9,'6.00','4.67','7.00'],[15,'8.00','24.67','37.00']]){const html=vm.runInContext('courseSpread('+x+')',context);for(const value of [mean,pop,sample])assert(html.includes(value))}
for(const [k,winner] of [[1,'A'],[3,'B'],[5,'B'],[7,'A']])assert(vm.runInContext('courseNeighbors('+k+')',context).includes('預測 '+winner));
console.log('30 SVG figures, 6 weeks, 3 variance cases and 4 k-NN votes verified.');
