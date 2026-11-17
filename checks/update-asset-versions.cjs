const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..'),file=path.join(root,'index.html');
const html=fs.readFileSync(file,'utf8').replace(/(src|href)="([^"?]+\.(?:js|css))(?:\?v=[^"]+)?"/g,(_,attr,name)=>attr+'="'+name+'?v='+crypto.createHash('sha256').update(fs.readFileSync(path.join(root,name))).digest('hex').slice(0,12)+'"');
fs.writeFileSync(file,html);
console.log('Updated local JS/CSS URLs with content hashes.');
