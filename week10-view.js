// Week 10 page IDs include the lecture, so four page 1s never collide.
function week10PageId(file, page) { return 'slide-' + file + '-' + page; }
function week10Picker(s) {
 return '<label class="page-picker">跳到這份講義的 PDF 頁碼 <select data-week10-picker="'+s.file+'"><option value="">選擇頁數</option>'+s.pages.map(p=>'<option value="'+p.page+'">第 '+p.page+' 頁 · '+escapeText(p.title)+'</option>').join('')+'</select></label>';
}
function renderWeek10Reading(s) {
 const source='lectures/'+s.file+'.pdf';
 let html='<p><a class="lecture" href="'+source+'" target="_blank" rel="noopener">開啟原始 PDF · '+s.pages.length+' 頁 ↗</a></p><p class="source-note">本區逐頁對照原始教材；頁碼以 PDF 的實際頁序為準。自編例子、延伸計算與教材疑義均於文中標示。';
 if(s.file==='DM_week10')html+=' 此份 PDF 第 21–50 頁的投影片頁腳為 22–51，較實際頁序多 1。';
 html+='</p>';
 for(const p of s.pages) {
  const id=week10PageId(s.file,p.page);
  const hash='#week-10/m-'+s.file+'/p'+p.page;
  html+='<section class="lecture-page"><div class="page-target" id="'+id+'" tabindex="-1">'+mathMarkdown('### 第 '+p.page+' 頁｜'+p.title)+'</div>'+noteButton(10,id,s.title+'第 '+p.page+' 頁筆記');
  html+='<div class="page-source"><a href="'+source+'#page='+p.page+'" target="_blank" rel="noopener">對照 PDF 第 '+p.page+' 頁 ↗</a><a href="'+hash+'">本頁連結</a>';
  if(s.file==='DM_week10' && p.page>=21)html+='<span>投影片頁腳 '+(p.page+1)+'</span>';
  html+='</div>'+mathMarkdown(p.body);
  html+='<details class="slide-original"><summary>展開原始投影片 · 第 '+p.page+' 頁</summary><a href="'+source+'#page='+p.page+'" target="_blank" rel="noopener"><img loading="lazy" width="1248" height="702" src="figures/week10/'+s.file+'-'+p.page+'.webp" alt="'+escapeText(s.title)+'，PDF 第 '+p.page+' 頁：'+escapeText(p.title)+'"></a></details></section>';
 }
 return html;
}
function jumpWeek10Page() {
 const match=location.hash.match(/^#week-10\/m-([A-Za-z0-9_]+)\/p(\d+)$/);
 if(!match)return false;
 const s=sectionLists[10].find(m=>m.file===match[1]);
 const page=Number(match[2]);
 if(!s || !s.pages.some(p=>p.page===page))return false;
 const chapter=document.getElementById('p'+s.start);
 if(!chapter)return false;
 chapter.open=true;
 const body=chapter.querySelector('.reading');
 if(!body.hasChildNodes())body.innerHTML=renderWeek10Reading(s);
 const target=document.getElementById(week10PageId(s.file,page));
 target.focus({preventScroll:true});
 target.scrollIntoView({block:'start'});
 document.querySelector('aside').classList.remove('open');
 document.querySelector('#menu').setAttribute('aria-expanded','false');
 return true;
}
document.addEventListener('change',e=>{
 const picker=e.target.closest('[data-week10-picker]');
 if(!picker || !picker.value)return;
 const hash='#week-10/m-'+picker.dataset.week10Picker+'/p'+picker.value;
 picker.value='';
 if(location.hash===hash)jump();else location.hash=hash;
});
