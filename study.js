const storageKey = 'dm.course.chapter-progress.v1';
let completed = new Set();
let storageOK = true;
try {
 const saved = JSON.parse(localStorage.getItem(storageKey) || '[]');
 if (Array.isArray(saved)) completed = new Set(saved.filter(x => typeof x === 'string'));
} catch {storageOK = false}
const weekNumber = () => Number(location.hash.match(/^#week-([1-9]\d*)(?:$|\/)/)?.[1] || 1);
const sectionKey = (n,start) => 'w'+n+'-p'+start;
function sectionsFor(n) {
 if (!weeks[n]) return [];
 const list=chapters(n).map(s=>{const [start,end]=s.range.match(/\d+/g).map(Number);return {...s,start,end}});
 const last=list.at(-1).end;
 if(last<weeks[n][2])list.push({start:last+1,end:weeks[n][2],range:'P. '+(last+1)+' – '+weeks[n][2],title:'接續講義與複習',content:''});
 return list;
}
const sectionLists=Object.fromEntries(Object.keys(weeks).map(n=>[n,sectionsFor(Number(n))]));
function pagePicker(start,end,label){
 const options=[];
 for(let page=start;page<=end;page++)options.push('<option value="'+page+'">第 '+page+' 頁</option>');
 return '<label class="page-picker">'+label+' <select data-page-picker><option value="">選擇頁數</option>'+options.join('')+'</select></label>';
}
function drillForm(n,q){
 const [p,title,prompt]=q;
 return '<form class="drill" data-week="'+n+'" data-page="'+p+'"><div class="practice-tag">計算題 · P. '+p+'</div><h4>'+title+'</h4><p>'+prompt+'</p><label>你的答案 <input name="answer" autocomplete="off" placeholder="數值、百分比或分數" required></label> <button>送出答案</button><output aria-live="polite"></output></form>';
}
function answerValue(raw){
 const s=raw.normalize('NFKC').trim().replace(/\s+/g,'');
 const number='[+-]?(?:\\d+(?:\\.\\d*)?|\\.\\d+)';
 const m=s.match(new RegExp('^('+number+')(?:/('+number+')|(%))?$'));
 if(!m)return NaN;
 return Number(m[1])/(m[3]?100:m[2]?Number(m[2]):1);
}
function renderReading(n,s){
 const qs=drills[n].filter(q=>q[0]>=s.start && q[0]<=s.end);
 const images=new Map(figures[n].filter(([p])=>p>=s.start && p<=s.end));
 const blocks=s.content.split(/(?=^(?:### |\*\*)(?:P\.?\s*\d+|第\s*\d+\s*頁))/m);
 let html='',placed=new Set();
 for(const block of blocks){
  if(!block.trim())continue;
  const page=Number(block.match(/^(?:### |\*\*)(?:P\.?\s*|第\s*)(\d+)/)?.[1]);
  if(page){
   const firstLine=block.indexOf('\n');
   const title=firstLine<0?block:block.slice(0,firstLine);
   html+='<div class="page-target" id="slide-'+page+'" tabindex="-1">'+mathMarkdown(title)+'</div>'+noteButton(n,'slide-'+page,'第 '+page+' 頁筆記');
   if(firstLine>=0)html+=mathMarkdown(block.slice(firstLine+1));
  }else html+=mathMarkdown(block);
  if(n===4 && page===44)html+='<p>通過支持度門檻的頻繁項目集，必定屬於同一層的候選項目集。</p>'+typeset('L_{k+1} \\subseteq C_{k+1}',true);
  if(images.has(page)){
   html+='<div class="gallery inline-figure">'+lectureCard(n,page,images.get(page))+'</div>'+workedExample(n,page);
   images.delete(page);
  }
  const figure=topicFigures[n][page];
  if(figure){
   const [title,caption]=figure;
   const src='figures/example-w'+n+'-p'+page+'.svg';
   html+='<figure class="diagram topic-example"><div class="kicker">自編範例 · P. '+page+'</div><h4>'+title+'</h4><a href="'+src+'" target="_blank" rel="noopener"><img loading="lazy" src="'+src+'" alt="'+title+'"></a><figcaption>'+caption+'</figcaption></figure>';
  }
  const plot=coordinatePlots[n+'-'+page];
  if(plot){
   const [title,caption]=plot;
   const src='figures/plot-w'+n+'-p'+page+'.svg';
   html+='<figure class="diagram topic-example"><div class="kicker">座標圖 · P. '+page+'</div><h4>'+title+'</h4><a href="'+src+'" target="_blank" rel="noopener"><img loading="lazy" src="'+src+'" alt="'+title+'"></a><figcaption>'+caption+'</figcaption></figure>';
  }
  for(const q of qs.filter(q=>q[0]===page)){html+=drillForm(n,q);placed.add(q)}
 }
 if(!s.content)html+='<p><a class="lecture" target="_blank" rel="noopener" href="lectures/'+lectureFiles[n]+'#page='+s.start+'">從 P. '+s.start+' 開啟講義 ↗</a></p>';
 for(const [page,title] of images){
  html+='<div class="gallery inline-figure">'+lectureCard(n,page,title)+'</div>'+workedExample(n,page);
 }
 return html+qs.filter(q=>!placed.has(q)).map(q=>drillForm(n,q)).join('');
}
function rail(n){
 const nav=document.querySelector('nav');
 nav.innerHTML=Object.keys(weeks).map(Number).map(w=>{
  const list=sectionLists[w],done=list.filter(s=>completed.has(sectionKey(w,s.start))).length;
  let links='';
  if(w===n&&list.length){
   links='<div class="subnav"><a href="#week-'+n+'/visual">圖解複習</a>'+list.map(s=>{
    const read=completed.has(sectionKey(n,s.start));return '<a class="'+(read?'is-read':'')+'" href="#week-'+n+'/p'+s.start+'"><span>'+(read?'✓':'○')+'</span>'+ '<span>'+escapeText(s.title)+'<small class="side-pages">P. '+s.start+'–'+s.end+'</small></span></a>'
   }).join('')+'</div>';
  }
  return '<div class="weekblock"><a class="week-link '+(w===n?'active ':'')+(list.length?'':'pending')+'" href="#week-'+w+'"><span><strong>Week '+w+'</strong><small>'+(weeks[w]?.[0]||'尚無筆記')+'</small></span>'+(list.length?'<span class="counter" aria-label="已讀章節">'+(done===list.length?'✓ ':'')+done+'/'+list.length+'</span>':'')+'</a>'+links+'</div>';
 }).join('');
 nav.querySelectorAll('a').forEach(a=>{if(a.hash===location.hash)a.setAttribute('aria-current','location')});
}
function jump(){
 const n=weekNumber(),target=location.hash.split('/')[1];
 const el=target&&document.getElementById(target);
 if(el){if(el.tagName==='DETAILS')el.open=true;el.scrollIntoView({block:'start'})}
 else window.scrollTo(0,0);
 rail(n);
 document.querySelector('aside').classList.remove('open');
 document.querySelector('#menu').setAttribute('aria-expanded','false');
}
let currentWeek;
function showWeek(){
 if (!weeks[weekNumber()]) { location.replace("#week-1"); return }
 const n=weekNumber();
 if(currentWeek!==n){
  currentWeek=n;
  render();
  if(weeks[n]){
   const article=document.querySelector('article');
   const headings=article.querySelectorAll('.sectiontitle');
   const cards=figures[n].map(([p,t])=>lectureCard(n,p,t));
   const gallery=n===10?'':'<details class="figure-index"><summary>本週講義圖表（'+cards.length+' 張）<span class="arrow">›</span></summary><div class="gallery">'+cards.join('')+'</div></details>';
   headings[1].insertAdjacentHTML('beforebegin','<section id="visual"><div class="sectiontitle"><h2>圖解複習</h2></div>'+studyDiagram(n)+gallery+'</section>');
   article.querySelector('.hero').insertAdjacentHTML('afterbegin',noteButton(n,'overview','本週總筆記'));
   if(n!==10)article.querySelector('.hero').insertAdjacentHTML('beforeend',pagePicker(1,weeks[n][2],'跳到本週講義頁'));
   headings[0].insertAdjacentHTML('afterend',noteButton(n,'highlights','本週重點筆記'));
   headings[1].insertAdjacentHTML('afterend',noteButton(n,'chapters','章節總筆記'));
   article.querySelectorAll('.card').forEach((card,i)=>card.insertAdjacentHTML('afterbegin',noteButton(n,'concept-'+i,card.querySelector('h3').textContent+'筆記')));
   article.querySelector('#visual .sectiontitle').insertAdjacentHTML('afterend',noteButton(n,'visual','圖解複習筆記'));
   article.querySelectorAll(':scope > details').forEach(el=>el.remove());
   sectionLists[n].forEach(s=>{
    const key=sectionKey(n,s.start),qs=drills[n].filter(q=>q[0]>=s.start&&q[0]<=s.end);
    const el=document.createElement('details');el.id='p'+s.start;
    el.innerHTML='<summary><span>'+escapeText(s.title)+'</span>'+(qs.length?'<small class="practice-tag">計算題 ×'+qs.length+'</small>':'')+'<span class="range">'+s.range+'</span><span class="arrow">›</span></summary><div class="readbar"><label><input type="checkbox" data-key="'+key+'" '+(completed.has(key)?'checked':'')+'> 已讀本章</label><span>'+s.range+'</span></div><div class="reading"></div>';
    el.querySelector('summary').insertAdjacentHTML('afterend',(n===10?'':pagePicker(s.start,s.end,'跳到本章講義頁'))+noteButton(n,'chapter-'+s.start,s.title+'筆記'));
    el.addEventListener('toggle',()=>{const body=el.querySelector('.reading');if(el.open&&!body.hasChildNodes()){body.innerHTML=renderReading(n,s);convertPlainMath(body)}});
    article.append(el);
   });
   if(!storageOK)article.insertAdjacentHTML('beforeend','<p>目前瀏覽器無法儲存進度，勾選僅保留於本次閱讀。</p>');
   addLectureLink();convertPlainMath(article);
  }
 }
 jump();
}
document.addEventListener('change',e=>{
 if(e.target.matches('[data-page-picker]')){
  const page=Number(e.target.value),week=weekNumber();
  if(!page)return;
  e.target.value='';
  const section=sectionLists[week].find(s=>s.start<=page && page<=s.end);
  if(section){
   const chapter=document.getElementById('p'+section.start);
   chapter.open=true;
   const body=chapter.querySelector('.reading');
   if(!body.hasChildNodes()){body.innerHTML=renderReading(week,section);convertPlainMath(body)}
   const target=document.getElementById('slide-'+page);
   if(target){target.focus({preventScroll:true});target.scrollIntoView({block:'start'});return}
  }
  location.assign('lectures/'+lectureFiles[week]+'#page='+page);
  return;
 }
 if(!e.target.matches('[data-key]'))return;
 const key=e.target.dataset.key;e.target.checked?completed.add(key):completed.delete(key);
 try{localStorage.setItem(storageKey,JSON.stringify([...completed]))}catch{if(!document.querySelector('.storage-warning'))document.querySelector('.readbar').insertAdjacentHTML('afterend','<p class="storage-warning">此瀏覽器無法儲存進度，勾選僅保留於本次閱讀。</p>')}
 rail(weekNumber());
});
document.addEventListener('submit',e=>{
 if(!e.target.matches('.drill'))return;
 e.preventDefault();const f=e.target,q=drills[f.dataset.week].find(x=>x[0]===Number(f.dataset.page)),v=answerValue(f.elements.answer.value),out=f.querySelector('output');
 if(!Number.isFinite(v)){out.textContent='請輸入有效數字、百分比或分數，例如 0.5、50% 或 1/2。';return}
 const right=Math.abs(v-q[3])<=0.000501;
 out.className=right?'correct':'incorrect';out.textContent=(right?'答對了。':'答錯了。')+q[4];convertPlainMath(out);
});
document.querySelector('nav').addEventListener('click',e=>{const a=e.target.closest('a');if(!a)return;if(a.hash===location.hash)jump();const hash=a.hash;const highlight=()=>{if(location.hash!==hash)return;const id=hash.split('/')[1];const select=(id?document.getElementById(id):document.querySelector('.hero'))?.querySelector('[data-page-picker]');if(!select)return;select.classList.remove('picker-highlight');void select.offsetWidth;select.classList.add('picker-highlight')};if(hash===location.hash)highlight();else window.addEventListener('hashchange',highlight,{once:true})});
window.addEventListener('hashchange',showWeek);
showWeek();









