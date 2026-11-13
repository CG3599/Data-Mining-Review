const weeks={
1:['資料探勘導論','Introduction to Data Mining',70,'資料、模式與知識','從交易、文字或影像中找出重複出現的模式，再判斷它能回答什麼問題。','描述與預測','關聯規則與分群描述資料的結構；分類則利用已知標籤預測新資料。','知識發現流程','從清理、整合與轉換資料，到探勘、評估模式與呈現知識。'],
2:['資料前處理','Data Preprocessing',111,'辨識資料品質','先檢查遺漏值、雜訊與不一致的紀錄，再決定如何清理。','理解屬性尺度','名目、順序、區間與比例尺度，決定哪些比較與統計運算有意義。','觀察資料分布','搭配中位數、四分位距與箱形圖，檢視偏態、離散程度與可能的離群值。'],
4:['頻繁樣式與關聯規則','Frequent Pattern Mining',70,'支持度與信賴度','支持度看組合在全部交易中出現的比例；信賴度只看含有前件的交易。','封閉與極大項目集','封閉項目集沒有支持度相同的真超集；極大頻繁項目集沒有頻繁的真超集。','Apriori 剪枝','若某個子集不頻繁，包含它的候選項目集就可直接排除。'],
6:['頻繁樣式探勘進階','Advanced Frequent Pattern Mining',82,'減少候選項目集','DHP 利用雜湊桶的計數，先排除不可能達到最低支持度的候選組合。','FP-Growth','把交易壓縮成共享前綴的 FP-Tree，再透過條件樣式基底遞迴挖掘。','評估關聯規則','搭配提升度比較條件機率和基準機率，檢查高信賴度是否只來自商品本身熱門。'],
7:['分類與決策樹','Classification',92,'監督式學習','以具有類別標籤的資料訓練模型，再用獨立的測試資料評估預測能力。','選擇分割屬性','比較資訊增益、增益率或 Gini 不純度，找出能讓子節點類別更一致的切法。','貝氏分類','結合先驗機率與特徵的概似度，預測後驗機率最高的類別。'],
9:['分類模型與集成學習','Classification & Ensemble Methods',67,'鄰近樣本與案例','k-NN 透過鄰居投票預測類別；CBR 從相似案例尋找可調整的解法。','線性分類器','邏輯斯迴歸把線性分數轉換成機率；SVM 尋找能擴大分類間隔的邊界。','集成方法','Bagging、Boosting 與隨機森林以不同方式組合多個模型的預測。'],
10:['分類、推薦與社群網路','Classification · Recommendation · Social Networks',207,'分類實務與 LIBSVM','從特徵選擇、泛化評估到 SVM 的訓練、縮放與驗證。','推薦系統','內容式推薦、協同過濾、潛在因子、跨領域冷啟動與排名評估。','社群網路探勘','中心性、社群偵測、連結預測、資訊傳播與流行病模型。']};
const icons=['<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v13c0 4 16 4 16 0V5M4 11c0 4 16 4 16 0"/>','<path d="m3 6 9-4 9 4-9 5zM3 11l9 5 9-5M3 16l9 5 9-5"/>','<path d="M4 3v17h17M7 15l4-5 4 2 5-7"/><circle cx="20" cy="5" r="1"/>'];
const escapeText=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
function chapters(n){
 if(n===10)return week10Modules.map((m,i)=>({...m,start:i+1,end:i+1,content:'',range:'P. 1 – '+m.pages.length}));
 let raw=notes[n]; // Display complete lecture-page blocks from the imported notes.
 if(n===1)raw=raw.split('## 第一週考試重點總整理')[0];
 else {const pages=[...raw.matchAll(/^### (?:P\.?\s*\d+|第\s*\d+\s*頁).*$/gm)];raw=raw.slice(0,pages.at(-1).index)}
 return raw.split(/^## 第[一二三四五六七八九十]+部分[：:]/m).slice(1).map(part=>{
 const [line,...body]=part.trim().split('\n'),content=body.join('\n').trim();
 const title=line.replace(/（[^（）]*）\s*$/,'');const pageNumbers=[...content.matchAll(/^(?:### |\*\*)(?:P\.?\s*|第\s*)(\d+)/gm)].map(m=>m[1]);
 return {title,content,range:'P. '+pageNumbers[0]+' – '+pageNumbers.at(-1)}
 }).filter(c=>c.content&& !c.range.includes('undefined'))
}
function drawTerrain(){
 const c=document.querySelector('canvas'),ctx=c.getContext('2d'),w=c.clientWidth,h=c.clientHeight,dpr=Math.min(devicePixelRatio,2);if(!w||!h)return;c.width=w*dpr;c.height=h*dpr;ctx.scale(dpr,dpr);
 ctx.fillStyle='#405375';for(let x=8;x<w;x+=17)for(let y=8;y<h;y+=17)ctx.fillRect(x,y,1,1);
 for(let k=0;k<51;k++){const r=9+k*4.3;ctx.beginPath();for(let i=0;i<=240;i++){const a=i*Math.PI/120,f=1+.13*Math.sin(3*a+r/120)+.065*Math.cos(5*a-r/100)+.13*Math.sin(2*a);const x=w*.61+r*f*Math.cos(a)*1.34,y=h*.49+r*f*Math.sin(a)*.72+.18*(x-w*.61);if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y)}ctx.closePath();ctx.strokeStyle=k%6===0?'#66b1ff':'#356bb0';ctx.lineWidth=k%6===0?1.25:.75;ctx.stroke()}
}
function render(){
 const n=weekNumber(),data=weeks[n];
 const label='Week '+n;document.title=label+' · '+(data?.[0]||'尚無筆記')+'｜資料探勘';document.querySelector('#crumb').textContent=label;
 const sections=data?chapters(n):[];
 let html='<section class="hero"><canvas aria-hidden="true"></canvas><div class="kicker">WEEK '+String(n).padStart(2,'0')+'</div><h1>'+(data?.[0]||'尚無筆記')+'</h1><div class="english">'+(data?.[1]||'')+'</div>'+(data?'<div class="meta"><span>'+(n===10?'4 份講義 · 207 頁逐頁講解':'講義 '+data[2]+' 頁')+'</span><span>'+sections.length+' 個筆記章節</span></div>':'')+'</section>';
 if(data){
 html+='<div class="sectiontitle"><h2>本週重點</h2></div><div class="cards">'+icons.map((icon,i)=>'<section class="card"><svg aria-hidden="true" viewBox="0 0 24 24">'+icon+'</svg><h3>'+data[3+i*2]+'</h3><p>'+data[4+i*2]+'</p></section>').join('')+'</div><div class="sectiontitle"><h2>章節筆記</h2>'+(sourceIds[n]?'<a target="_blank" rel="noopener" href="https://chatgpt.com/c/'+sourceIds[n]+'">完整原始筆記 ↗</a>':'<span>依 PDF 實際頁碼 · 原圖與講解對照</span>')+'</div>';
 html+=sections.map((s,i)=>'<details><summary><span class="idx">'+String(i+1).padStart(2,'0')+'</span>'+escapeText(s.title)+'<span class="range">'+s.range+'</span><span class="arrow">›</span></summary><div class="reading"></div></details>').join('');
 }else html+='<p class="empty">目前的課程整理中尚無 '+label+' 的筆記。</p>';
 document.querySelector('article').innerHTML=html;document.querySelectorAll('details').forEach((d,i)=>d.addEventListener('toggle',()=>{if(d.open&&!d.lastElementChild.childNodes.length)d.lastElementChild.innerHTML=marked.parse(escapeText(sections[i].content))}));
 document.querySelector('aside').classList.remove('open');document.querySelector('#menu').setAttribute('aria-expanded','false');window.scrollTo(0,0);drawTerrain()
}
const lectureFiles={1:'DM_week1_introduction.pdf',2:'DM_week2_preprocessing.pdf',4:'DM_week4.pdf',6:'DM_week6.pdf',7:'DM_week7.pdf',9:'DM_week9.pdf'};
function addLectureLink(){
 const week=weekNumber();
 if(!lectureFiles[week])return;
 const end=Number(chapters(week).at(-1).range.split(' – ')[1]);
 const link=document.createElement('a');
 link.className='lecture';link.target='_blank';link.rel='noopener';
 link.href='lectures/'+lectureFiles[week]+'#page='+(end<weeks[week][2]?end+1:1);
 link.textContent=end<weeks[week][2]?'接續閱讀講義 · P. '+(end+1)+'–'+weeks[week][2]+' ↗':'開啟本週講義 ↗';
 document.querySelector('article').append(link);
}document.querySelector('#menu').onclick=e=>e.currentTarget.setAttribute('aria-expanded',document.querySelector('aside').classList.toggle('open'));window.addEventListener('resize',drawTerrain);
