// Supplementary visuals; original lecture notes remain unchanged.
const week10Figures = {
  "DM_week10-6": {
    "title": "三種特徵選擇：差別在選擇與訓練的關係",
    "src": "figures/week10-examples/selection.svg",
    "caption": "Filter 先用統計指標篩選；Wrapper 依驗證表現反覆搜尋；Embedded 在訓練時一起完成。圖為流程整理，未表示某一方法永遠最好。",
    "kind": "自編教學示意"
  },
  "DM_week10-17": {
    "title": "選模型看驗證表現，不只看訓練誤差",
    "src": "figures/week10-examples/overfit.svg",
    "caption": "自編示意曲線，並非教材的實測數據。複雜度增加時訓練誤差持續下降，但驗證誤差可能先降後升；以驗證資料選設定，最終測試集留到最後。",
    "kind": "自編教學示意"
  },
  "DM_week10-32": {
    "title": "同一組數字，四種預測結果",
    "src": "figures/week10-examples/confusion.svg",
    "caption": "依教材例題重繪。Recall=90/300=30%；Precision=90/230≈39.13%。高 Accuracy 96.5% 主要受到大量真負類影響，不能代表正類找得好。",
    "kind": "教材例題重繪"
  },
  "DM_week10-33": {
    "title": "96.5% 準確率，仍可能漏掉七成正類",
    "src": "figures/week10-examples/metrics.svg",
    "caption": "依同一混淆矩陣計算，條長採共同的 0–100% 尺度。Recall 30% 意味 300 位實際正類中只找出 90 位；四個指標的分母與用途不同。",
    "kind": "教材數據圖表"
  },
  "DM_week10-43": {
    "title": "五折交叉驗證：每一折輪流驗證一次",
    "src": "figures/week10-examples/cv.svg",
    "caption": "自編五折示例；教材另有十折圖。每輪必須重新訓練，縮放、補值、選特徵和重抽樣都只能使用當輪訓練折。",
    "kind": "自編教學示意"
  },
  "DM_week10-47": {
    "title": "抽樣改變的是訓練資料的類別組成",
    "src": "figures/week10-examples/resampling.svg",
    "caption": "自編計數示例：原始為 12:3；過度抽樣重複少數類至 12:12；欠抽樣刪減多數類至 3:3。前者可能重複記憶，後者可能損失資訊。",
    "kind": "自編教學示意"
  },
  "DM_week10_libsvm-11": {
    "title": "測試資料只套用，不重新估計縮放範圍",
    "src": "figures/week10-examples/scale.svg",
    "caption": "自編例：訓練最小值 10、最大值 20，縮放到 [0,1]。測試值 25 轉成 1.5 是合理的超出範圍結果，不應為了塞回 [0,1] 而重新估計測試集的規則。",
    "kind": "自編教學示意"
  },
  "DM_week10_libsvm-13": {
    "title": "省略零值，不重新編排特徵索引",
    "src": "figures/week10-examples/sparse.svg",
    "caption": "依教材六維例子重繪。行首 1 是類別標籤；非零值仍位於第 3、6 維。稀疏表示與完整向量具有相同語意。",
    "kind": "教材例題重繪"
  },
  "DM_recommendation-22": {
    "title": "歌曲 A 的曲風組合更接近使用者",
    "src": "figures/week10-examples/music.svg",
    "caption": "依教材六維向量畫圖，三列均採 0–10 共同尺度。U 與 A 的餘弦相似度約 0.9972，與 B 約 0.0566；比較的是整體方向，不是單一曲風的最高值。",
    "kind": "教材數據圖表"
  },
  "DM_recommendation-35": {
    "title": "同一互動矩陣，兩種比較方向",
    "src": "figures/week10-examples/cf.svg",
    "caption": "自編矩陣示意。左圖強調比較列、右圖強調比較欄；著色只標示比較方向，不代表本示例已算得相似度。○、× 是偏好回饋，? 是未知。",
    "kind": "自編教學示意"
  },
  "DM_recommendation-36": {
    "title": "4 分不一定比 3 分更喜歡",
    "src": "figures/week10-examples/centering.svg",
    "caption": "依教材評分尺度例重繪。A 給 4 分比自己平均低 0.5；B 給 3 分卻比自己平均高 1。平均校正比較相對偏好，再加回目標使用者的平均。",
    "kind": "教材例題重繪"
  },
  "DM_recommendation-48": {
    "title": "矩陣分解：用共享的 k 維空間配對",
    "src": "figures/week10-examples/mf.svg",
    "caption": "尺寸圖為概念示意，方框寬高不按 m、n、k 比例。m 位使用者、n 個項目；兩側內部維度 k 必須相同，才能得到 m×n 的預測矩陣。",
    "kind": "自編教學示意"
  },
  "DM_recommendation-72": {
    "title": "命中兩項之外，排序位置也影響分數",
    "src": "figures/week10-examples/topk.svg",
    "caption": "依教材 Top-3 例題重繪。第二名 B 不相關，沒有收益；C 排第三名受到位置折扣。理想清單把三個相關項目都排在前三名。",
    "kind": "教材例題重繪"
  },
  "DM_social_network-17": {
    "title": "中間的人，不一定是朋友最多的人",
    "src": "figures/week10-examples/centrality.svg",
    "caption": "依教材鏈狀圖重繪。B、C、D 的 degree 都是 2，但中介中心性分別為 3、4、3；端點 A、E 不在其他節點對的最短路徑中。",
    "kind": "教材例題重繪"
  },
  "DM_social_network-42": {
    "title": "模組度：先數內部邊，再扣掉隨機期望",
    "src": "figures/week10-examples/modularity.svg",
    "caption": "依教材四點完全圖加三角形的結構重繪。黃色為唯一跨群橋接邊；它也會計入兩端的度數，不能在計算期望值時漏掉。",
    "kind": "教材例題重繪"
  },
  "DM_social_network-48": {
    "title": "交集數人頭，聯集不要重複計算",
    "src": "figures/week10-examples/neighbors.svg",
    "caption": "自編具名集合，沿用教材的 3 與 5 位鄰居、交集 2 位之計數。聯集大小為 3+5−2=6；共同鄰居與 Jaccard 的差別在正規化。",
    "kind": "自編教學示意"
  },
  "DM_social_network-56": {
    "title": "LTM：沿教材例子追蹤活化次序",
    "src": "figures/week10-examples/ltm.svg",
    "caption": "依教材前四步重繪，僅突顯本次成功活化的鏈。下方比較式為傳入影響與節點門檻，不是成功機率；完整網路仍請對照原始投影片。",
    "kind": "教材例題重繪"
  },
  "DM_social_network-62": {
    "title": "四種模型，差別在恢復後往哪裡走",
    "src": "figures/week10-examples/epidemic.svg",
    "caption": "自編狀態轉移整理。SIS、SIRS 右側再出現的 S 是回到原本易感狀態，並非新增一種人口。SIR 不回 S；SIRS 需先經 R，待免疫消退才回 S。",
    "kind": "自編教學示意"
  }
};
function week10Supplement(file,page) {
 const f=week10Figures[file+'-'+page];
 let html='';
 if(f)html='<figure class="diagram week10-example"><div class="kicker">'+escapeText(f.kind)+' · P. '+page+'</div><a href="'+f.src+'" target="_blank" rel="noopener" aria-label="放大圖解：'+escapeText(f.title)+'"><img loading="lazy" src="'+f.src+'" alt="'+escapeText(f.title)+'。'+escapeText(f.caption)+'"></a><figcaption>'+escapeText(f.caption)+' <a href="'+f.src+'" target="_blank" rel="noopener">放大圖解 ↗</a></figcaption></figure>';
 if(file==='DM_week10' && page===35)html+=week10RocDemo();
 return html;
}
// Deliberately distinct scores: a single threshold gives an unambiguous operating point.
const week10RocSamples=[{score:.95,y:1},{score:.90,y:1},{score:.80,y:0},{score:.75,y:1},{score:.65,y:0},{score:.55,y:1},{score:.45,y:0},{score:.35,y:0},{score:.20,y:1},{score:.10,y:0}];
function week10RocCounts(t) {
 let tp=0,fp=0,tn=0,fn=0;
 for(const s of week10RocSamples){if(s.score>=t){if(s.y)tp++;else fp++}else{if(s.y)fn++;else tn++}}
 return {tp,fp,tn,fn,tpr:tp/5,fpr:fp/5};
}
function week10RocResult(t) {
 const c=week10RocCounts(t),points=[1,...week10RocSamples.map(s=>s.score)].map(v=>week10RocCounts(v));
 const xy=v=>(55+250*v.fpr)+','+(285-250*v.tpr);
 const svg='<svg viewBox="0 0 360 330" role="img" aria-label="ROC 橫軸為誤報率，縱軸為召回率。目前 FPR '+c.fpr+'，TPR '+c.tpr+'"><path d="M55 35V285H305" fill="none" stroke="#adc1da"/><path d="M55 285L305 35" stroke="#71849f" stroke-dasharray="5 5"/><polyline points="'+points.map(xy).join(' ')+'" fill="none" stroke="#8ac6ff" stroke-width="3"/><circle cx="'+(55+c.fpr*250)+'" cy="'+(285-c.tpr*250)+'" r="8" fill="#ffd17c" stroke="#080d16" stroke-width="2"/><g fill="#edf4ff" font-size="14"><text x="42" y="307">0</text><text x="300" y="307">1</text><text x="34" y="40">1</text><text x="160" y="326">FPR 誤報率 →</text><text x="8" y="20">TPR 召回率 ↑</text></g></svg>';
 return '<div class="roc-chart">'+svg+'</div><div><div class="roc-counts"><span>TP 找到正類<strong>'+c.tp+'</strong></span><span>FP 誤報負類<strong>'+c.fp+'</strong></span><span>FN 漏掉正類<strong>'+c.fn+'</strong></span><span>TN 正確排除<strong>'+c.tn+'</strong></span></div><p class="roc-status" role="status">門檻 '+t.toFixed(2)+'：Recall = '+c.tp+'/5 = '+(c.tpr*100)+'%；FPR = '+c.fp+'/5 = '+(c.fpr*100)+'%。</p><p>黃色圓點是目前工作點；藍線由同一組分數在不同門檻下計算。降低門檻會讓更多樣本被判為正類。</p></div>';
}
function week10RocDemo() {
 return '<figure class="diagram week10-roc"><div class="kicker">自編互動示例 · P. 35</div><h4>改變分類門檻，看看 ROC 工作點怎麼移動</h4><label class="page-picker">分類門檻 <select data-roc-threshold>'+[1,.95,.9,.8,.75,.65,.55,.5,.45,.35,.2,.1,0].map(t=>'<option value="'+t+'"'+(t===.5?' selected':'')+'>'+t.toFixed(2)+(t===1?'（全判負）':t===0?'（全判正）':'')+'</option>').join('')+'</select></label><div class="roc-result">'+week10RocResult(.5)+'</div><figcaption>自編 10 筆資料，正負類各 5 筆；分數 ≥ 門檻即判正。此圖不取代教材原例。</figcaption><details><summary>查看示範資料與判讀方式</summary><p>依分數由高到低：'+week10RocSamples.map(s=>s.score.toFixed(2)+'（'+(s.y?'正':'負')+'）').join('、')+'。正／負指真實類別；分數越高越傾向預測為正。</p></details></figure>';
}
document.addEventListener('change',e=>{
 if(!e.target.matches('[data-roc-threshold]'))return;
 e.target.closest('.week10-roc').querySelector('.roc-result').innerHTML=week10RocResult(Number(e.target.value));
});
function week10FigureIndex() {
 const groups=week10Modules.map(m=>{
  const items=m.pages.flatMap(p=>{const f=week10Figures[m.file+'-'+p.page];const title=f?.title||(m.file==='DM_week10'&&p.page===35?'互動 ROC：改變分類門檻':'');return title?['<li><a href="#week-10/m-'+m.file+'/p'+p.page+'">P. '+p.page+' · '+escapeText(title)+'</a></li>']:[]});
  return '<div><h4>'+escapeText(m.title)+'</h4><ul>'+items.join('')+'</ul></div>';
 });
 return '<details class="figure-index week10-figure-index"><summary>輔助圖解索引 · 18 張圖表＋1 個互動示例<span class="arrow">›</span></summary><div class="week10-figure-links">'+groups.join('')+'</div></details>';
}
