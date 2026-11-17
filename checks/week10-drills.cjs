const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),ctx=vm.createContext({drills:{}});
for(const f of ['week10-classification','week10-libsvm','week10-recommendation','week10-social','week10','week10-drills'])vm.runInContext(fs.readFileSync(path.join(root,f+'.js'),'utf8'),ctx);
const rows=ctx.drills[10],modules=vm.runInContext('week10Modules',ctx);assert.equal(rows.length,28);assert.equal(new Set(rows.map(q=>q[5]+'-'+q[0])).size,28);
const expected={
 DM_week10:[(10*4+10*4)/(10+10),(30+55)/100,24/(24+6),2*.8*.6/(.8+.6),8/40,.5*(0+1)/2+.5*(1+1)/2,100-100/5,900-100],
 DM_week10_libsvm:[(30-10)/(90-10),120-120/5,(110-10)/(90-10),4],
 DM_recommendation:[(1*2+2*1)/(Math.sqrt(5)*Math.sqrt(5)),4/Math.sqrt(2*8),3+(.8*(5-4)+.2*(2-3))/(.8+.2),4*5,1*3+2*4,(5-4)**2+.1*(2+3),Math.sqrt(((5-2)**2+(2-6)**2)/2),2/3],
 DM_social_network:[2/(5-1),3/(1+2+3),6/10-(13/20)**2+3/10-(7/20)**2,2/(3+5-2),3*4,.2+.35,.005*80*20,.005*80*20-.1*20]
};
for(const m of modules){const qs=rows.filter(q=>q[5]===m.file);assert.equal(qs.length,expected[m.file].length);qs.forEach((q,i)=>{assert(m.pages.some(p=>p.page===q[0]));assert(Math.abs(q[3]-expected[m.file][i])<1e-10,q[1]);assert(q[2].length>20&&q[4].length>20);assert(Number.isFinite(q[3]));});}
console.log('28 exercise answers independently recomputed; PDF/page keys and explanations verified.');
