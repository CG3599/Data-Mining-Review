// Supplemental examples for existing Week 1–9 lectures.
const courseFigures = {
  "1-23": {
    "title": "資料表：橫向讀一筆，縱向讀一種屬性",
    "src": "figures/course-examples/w1-table.svg",
    "caption": "自編顧客資料。ID 用於識別紀錄；年齡與城市描述顧客。資料以列和欄組織，不表示所有欄位都適合直接拿來計算距離。",
    "kind": "自編教學示意"
  },
  "1-28": {
    "title": "先釐清要描述資料，還是預測結果",
    "src": "figures/course-examples/w1-tasks.svg",
    "caption": "自編任務對照。描述式可找共現、群體或分布；預測式使用已知資料推測未知結果。差別在任務目標，不是資料檔案格式。",
    "kind": "自編教學示意"
  },
  "1-49": {
    "title": "分群：從相似性找出資料的群體",
    "src": "figures/course-examples/w1-clusters.svg",
    "caption": "自編兩群示意，圓與方塊用來區分結果。分群依所選特徵與相似度而變；圖中兩團清楚分開只是容易理解的例子，不代表所有資料都有明確群界。",
    "kind": "自編教學示意"
  },
  "1-52": {
    "title": "三種學習設定：差別在已知標籤",
    "src": "figures/course-examples/w1-labels.svg",
    "caption": "自編資料標籤示意，? 表示未標記。半監督式同時利用有標籤與未標籤資料；未標記不等於負類，也不代表資料沒有其他特徵。",
    "kind": "自編教學示意"
  },
  "1-64": {
    "title": "TF-IDF：常出現，也要有辨識力",
    "src": "figures/course-examples/w1-tfidf.svg",
    "caption": "自編概念圖。TF 衡量詞在文件中的頻率，IDF 降低普遍詞的權重；兩者的具體正規化與平滑版本可能不同，本圖不指定某一版本。",
    "kind": "自編教學示意"
  },
  "2-28": {
    "title": "非對稱二元資料：共同缺席可能不重要",
    "src": "figures/course-examples/w2-binary.svg",
    "caption": "自編二元特徵例。只有 a 共同出現，a、b 至少在一方出現；Jaccard 為 1/2。這是忽略共同零值的一種相似度示範，是否適用仍取決於任務。",
    "kind": "自編教學示意"
  },
  "2-33": {
    "title": "等距與比例尺度：零點的意義不同",
    "src": "figures/course-examples/w2-scales.svg",
    "caption": "自編對照。攝氏零度不代表沒有熱力學溫度；公斤的零表示該重量為零。量尺決定哪些運算與敘述具有意義。",
    "kind": "自編教學示意"
  },
  "2-52": {
    "title": "同樣平均，分散程度仍可能相差很大",
    "src": "figures/course-examples/w2-spread.svg",
    "caption": "自編兩組資料，使用母體分母 N=3。A 的平方偏差和為 2，B 為 32；若視為樣本，改用 n−1=2，樣本變異數分別為 1、16。",
    "kind": "自編教學示意"
  },
  "2-60": {
    "title": "共變異數矩陣：先看對角線，再看成對關係",
    "src": "figures/course-examples/w2-covariance.svg",
    "caption": "自編三變數符號圖。對角線是各變數和自己計算的共變異數，也就是變異數；非對角線描述兩變數共同變動，不能把它直接當相關係數。",
    "kind": "自編教學示意"
  },
  "2-71": {
    "title": "Q-Q 圖比較分位數，不是個別樣本配對",
    "src": "figures/course-examples/w2-qq.svg",
    "caption": "自編三種形狀。接近 y=x 表示兩分布較接近；其他直線可反映位置或尺度不同；系統性彎曲表示形狀差異。圖形是示意，不是統計檢定結論。",
    "kind": "自編教學示意"
  },
  "4-10": {
    "title": "支持計數：逐筆檢查是否完整包含項目集",
    "src": "figures/course-examples/w4-support.svg",
    "caption": "自編四筆交易，三筆包含 B 與 C。每筆交易只計一次；分母是全部四筆交易，而不是出現 B 或 C 的商品個數。",
    "kind": "自編教學示意"
  },
  "4-27": {
    "title": "一個三項集，拆出六條候選規則",
    "src": "figures/course-examples/w4-rules.svg",
    "caption": "自編以 A、B、C 替代項目名稱。前後件互斥，聯集都為 ABC，所以六條規則的支持度相同；前件支持度不同，信賴度可能不同。",
    "kind": "自編教學示意"
  },
  "4-36": {
    "title": "三個項目的完整格狀結構",
    "src": "figures/course-examples/w4-lattice.svg",
    "caption": "自編三項集 lattice。每條線表示新增一個項目；由上往下集合變大，但能包含整個集合的交易數不會增加。空集合只作結構起點，不當成候選規則前件。",
    "kind": "自編教學示意"
  },
  "4-42": {
    "title": "項目越多，能符合條件的交易只會更少",
    "src": "figures/course-examples/w4-monotone.svg",
    "caption": "自編包含關係示例。所有包含 ABC 的交易一定包含 AB，所有包含 AB 的交易一定包含 A；這是 Apriori 反單調性與剪枝的依據。",
    "kind": "自編教學示意"
  },
  "4-47": {
    "title": "逐層搜尋：候選集合與頻繁集合不要混淆",
    "src": "figures/course-examples/w4-levels.svg",
    "caption": "自編 Apriori 流程。從 Lk 連接並剪枝得到候選，再掃描交易計數得到 Lk+1；若下一層沒有可保留項目集，搜尋便停止。",
    "kind": "自編教學示意"
  },
  "6-11": {
    "title": "兩種支持計數方法，應得到同一個答案",
    "src": "figures/course-examples/w6-counting.svg",
    "caption": "自編三筆交易。候選導向逐候選檢查交易，交易導向逐交易列出所含候選；實際效率也取決於候選索引與資料結構，不由示意箭頭決定。",
    "kind": "自編教學示意"
  },
  "6-23": {
    "title": "全域頻繁，必須至少在一區域頻繁",
    "src": "figures/course-examples/w6-partition.svg",
    "caption": "自編例，所有分區使用相同相對門檻 40%。X 在第一區域頻繁，全域也恰達門檻；局部頻繁不保證全域頻繁，所以合併候選後仍須全資料驗證。加總時按區域筆數加權。",
    "kind": "自編教學示意"
  },
  "6-26": {
    "title": "Negative border：緊貼頻繁區域外側的項目集",
    "src": "figures/course-examples/w6-border.svg",
    "caption": "依現有講義筆記集合重繪：負邊界為 B、AC、AD；單項 B 的真子集只有空集合。若完整資料驗證時有邊界項目變頻繁，表示抽樣可能漏掉模式。",
    "kind": "教材集合重繪"
  },
  "6-45": {
    "title": "FP-Tree：相同前綴共享節點並累加次數",
    "src": "figures/course-examples/w6-fptree.svg",
    "caption": "自編三筆交易的完整樹，並非教材九筆交易的原圖。根不代表商品；節點計數代表經過該前綴的交易數，不能把樹的所有節點計數加總當交易總數。",
    "kind": "自編教學示意"
  },
  "6-55": {
    "title": "單一路徑：列舉組合，再接上固定後綴",
    "src": "figures/course-examples/w6-path.svg",
    "caption": "依筆記的條件樹 b:2→a:2 與後綴 e 重繪。非空節點組合為 a、b、ab，得到 ae、be、abe；e 本身的支持度另由其原始計數決定。",
    "kind": "教材例題重繪"
  },
  "7-38": {
    "title": "純節點：目前資料已沒有類別不確定性",
    "src": "figures/course-examples/w7-pure.svg",
    "caption": "以教材的四筆 YES 概念重繪。節點純淨描述的是落入此節點的訓練資料，不保證所有未來資料都會分類正確。",
    "kind": "自編教學示意"
  },
  "7-39": {
    "title": "特徵用完仍混雜：用多數類別決定葉節點",
    "src": "figures/course-examples/w7-majority.svg",
    "caption": "依教材 YES、YES、YES、NO 重繪。當沒有可用特徵繼續切分，採多數類 YES；不要把這個多數決葉誤認成純節點。",
    "kind": "教材例題重繪"
  },
  "7-45": {
    "title": "類別屬性可以多路切，也可以分成兩組",
    "src": "figures/course-examples/w7-splits.svg",
    "caption": "自編顏色屬性。多路分割各類一個分支；二元分割把類別集合分成兩群。這是不同的切分方案，哪個更好仍須按加權不純度與演算法規則評估。",
    "kind": "自編教學示意"
  },
  "7-59": {
    "title": "資訊增益：子節點熵要乘上各組比例",
    "src": "figures/course-examples/w7-gain.svg",
    "caption": "依教材的 14 筆資料計算。Middle 是純節點、熵為 0；另兩組各占 5/14。三個熵不能直接除以 3，因為子節點大小不同。",
    "kind": "教材數據重繪"
  },
  "7-63": {
    "title": "很多分支可能帶來很高的資訊增益",
    "src": "figures/course-examples/w7-id.svg",
    "caption": "自編六筆 ID 切分。父節點熵 1 bit，分割後熵 0，Gain=1；SplitInfo=log₂6≈2.585，GainRatio≈0.387。Gain Ratio 對分支分布作校正，但不保證任意資料都不會選 ID。",
    "kind": "自編教學示意"
  },
  "9-12": {
    "title": "改變 k，就可能改變投票結果",
    "src": "figures/course-examples/w9-knn.svg",
    "caption": "自編鄰居順序，採不加權多數決。較小 k 更受局部樣本影響；較大 k 會納入更遠的樣本。這裡只示範單一查詢點，不代表增大 k 必然提升準確率。",
    "kind": "自編教學示意"
  },
  "9-36": {
    "title": "支援向量限制分類邊界能留下多大間隔",
    "src": "figures/course-examples/w9-margin.svg",
    "caption": "自編可線性分離的二維資料，未對應教材 B1/B2 的原始座標。兩條邊界間完整寬度為 2/‖w‖（標準化約束下）；每側距分類超平面為 1/‖w‖。",
    "kind": "自編教學示意"
  },
  "9-41": {
    "title": "Soft-margin：落進間隔不一定已經分錯",
    "src": "figures/course-examples/w9-slack.svg",
    "caption": "自編左側類別示意。ξ=0 表示滿足間隔；0<ξ<1 為正確側但間隔不足；ξ>1 才越過分類邊界。C 是對違反間隔的懲罰權重，不直接等於錯誤率。",
    "kind": "自編教學示意"
  },
  "9-49": {
    "title": "多類 SVM：一對其餘與兩兩對戰",
    "src": "figures/course-examples/w9-multiclass.svg",
    "caption": "依教材四類數量例重繪。OvR 每類建一個分類器；OvO 每個無序類別配對建一個。圖上列的是子問題，最後仍需彙整分數或投票。",
    "kind": "教材數量例重繪"
  },
  "9-65": {
    "title": "隨機森林的兩種隨機性",
    "src": "figures/course-examples/w9-forest.svg",
    "caption": "自編三棵樹流程。不同訓練抽樣降低資料重複性，節點隨機特徵子集降低樹之間相似性；圖中列出的特徵只是某個節點候選，不是整棵樹永遠只能用那些特徵。",
    "kind": "自編教學示意"
  }
};
function courseSupplement(n,page){
 const f=courseFigures[n+'-'+page];if(!f)return '';
 let html='<figure class="diagram topic-example course-example"><div class="kicker">'+escapeText(f.kind)+' · P. '+page+'</div><h4>'+escapeText(f.title)+'</h4><a href="'+f.src+'" target="_blank" rel="noopener"><img loading="lazy" src="'+f.src+'" alt="'+escapeText(f.title)+'"></a><figcaption>'+escapeText(f.caption)+' <a href="'+f.src+'" target="_blank" rel="noopener">放大圖解 ↗</a></figcaption></figure>';
 if(n===2&&page===52)html+='<figure class="diagram course-demo"><h4>互動：最後一筆資料改變，分散程度如何變化？</h4><label class="page-picker">第三筆數值 <select data-spread>'+[6,9,15].map(x=>'<option>'+x+'</option>').join('')+'</select></label><div class="course-result">'+courseSpread(6)+'</div><figcaption>自編資料 4、5、x。母體變異數除以 n；樣本變異數除以 n−1，請依資料用途選擇。</figcaption></figure>';
 if(n===9&&page===12)html+='<figure class="diagram course-demo"><h4>互動：改變 k，觀察多數決</h4><label class="page-picker">鄰居數 k <select data-neighbors>'+[1,3,5,7].map(x=>'<option>'+x+'</option>').join('')+'</select></label><div class="course-result">'+courseNeighbors(1)+'</div><figcaption>自編的距離排序例，圓形 A、方形 B。採等權重投票，無距離同分；k 必須透過驗證資料選擇，不能只看這一個查詢點。</figcaption></figure>';
 return html;
}
function courseSpread(x){
 const a=[4,5,x],mean=a.reduce((s,v)=>s+v,0)/3,ss=a.reduce((s,v)=>s+(v-mean)**2,0);
 return '<div class="course-bars">'+a.map((v,i)=>'<div>資料 '+(i+1)+'：'+v+'<span style="width:'+v/15*100+'%"></span></div>').join('')+'</div><p role="status">平均數 = '+mean.toFixed(2)+'；離均差平方和 = '+ss.toFixed(2)+'<br>母體變異數 = '+(ss/3).toFixed(2)+'；樣本變異數 = '+(ss/2).toFixed(2)+'</p><p>每條長度代表數值，比例尺固定為 0–15。平方和先計算每筆與新平均數的差，再平方相加。</p>';
}
function courseNeighbors(k){
 const labels=['A','B','B','A','B','A','A'],a=labels.slice(0,k).filter(x=>x==='A').length,b=k-a;
 return '<div class="neighbor-row">'+labels.map((v,i)=>'<span class="neighbor '+(i<k?'chosen':'')+'"><small>第 '+(i+1)+' 近</small><b>'+(v==='A'?'● A':'■ B')+'</b><small>'+(i<k?'參與投票':'未選入')+'</small></span>').join('')+'</div><p role="status">k = '+k+'：A 得 '+a+' 票，B 得 '+b+' 票 → 預測 '+(a>b?'A':'B')+'</p><p>由左至右距離遞增；只計入前 k 位鄰居。較大的 k 會擴大參考範圍，不保證準確率一定提高。</p>';
}
document.addEventListener('change',e=>{
 if(e.target.matches('[data-spread], [data-neighbors]'))e.target.closest('.course-demo').querySelector('.course-result').innerHTML=e.target.matches('[data-spread]')?courseSpread(Number(e.target.value)):courseNeighbors(Number(e.target.value));
});
function courseFigureIndex(n){
 const items=Object.entries(courseFigures).filter(([key])=>key.startsWith(n+'-'));
 return '<details class="figure-index course-index"><summary>補充圖解索引 · '+items.length+' 張'+([2,9].includes(n)?'＋1 個互動示例':'')+'<span class="arrow">›</span></summary><ul>'+items.map(([key,f])=>'<li><a href="#week-'+n+'/slide-'+key.split('-')[1]+'">P. '+key.split('-')[1]+' · '+escapeText(f.title)+'</a></li>').join('')+'</ul></details>';
}
function openCoursePage(n,target){
 const m=target?.match(/^slide-(\d+)$/);if(!m||n===10)return;
 const page=Number(m[1]),s=sectionLists[n]?.find(s=>s.start<=page&&page<=s.end);if(!s)return;
 const chapter=document.getElementById('p'+s.start);if(!chapter)return;
 chapter.open=true;const body=chapter.querySelector('.reading');if(!body.hasChildNodes()){body.innerHTML=renderReading(n,s);convertPlainMath(body)}
 const picker=chapter.querySelector('[data-page-picker]');if(picker)picker.value=String(page);
 document.getElementById(target)?.focus({preventScroll:true});
}
