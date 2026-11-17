const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),ctx=vm.createContext({notes:{},marked:require(path.join(root,'marked.js')),katex:require(path.join(root,'katex.min.js')),escapeText:s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;')});
for(const name of ['week1','week2','week4','week6','week7','week9','week10-classification','week10-libsvm','week10-recommendation','week10-social','math-layout'])vm.runInContext(fs.readFileSync(path.join(root,name+'.js'),'utf8'),ctx);
const strings=[...Object.values(ctx.notes),...Object.values(ctx).filter(Array.isArray).flatMap(v=>v.map(p=>p.body))];
for(const source of strings){ctx.source=source;const html=vm.runInContext('mathMarkdown(source)',ctx);assert(!/[\uE200-\uE202]|\*\*|&amp;(?:lt|gt|amp);/.test(html),'Unparsed formatting remains');}
for(const source of ['`a < b > c & d`','```\na < b > c & d\n```']){ctx.source=source;const html=vm.runInContext('mathMarkdown(source)',ctx);assert(html.includes('a &lt; b &gt; c &amp; d'));assert(!html.includes('&amp;lt;'));}
ctx.source='`<img src=x onerror=alert(1)>`';assert(!vm.runInContext('mathMarkdown(source)',ctx).includes('<img'));
ctx.source='\\[x^*=\\arg\\max_x f(x)\\]';assert(vm.runInContext('mathMarkdown(source)',ctx).includes('<math'));
console.log('All imported notes, code escaping, HTML safety and math rendering verified.');
