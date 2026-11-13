// One worked example per week, at the page where the concept is introduced.
function workedExample(week, page) {
 const pages={1:55,2:88,4:50,6:79,7:87};
 if(page!==pages[week])return '';
 const label=(x,y,t)=>'<text x="'+x+'" y="'+y+'" text-anchor="middle">'+t+'</text>';
 const edge=(x,y,X,Y)=>'<path class="edge" d="M'+x+' '+y+'L'+X+' '+Y+'"/>';
 const box=(x,y,w,t)=>'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="32" rx="6"/>'+label(x+w/2,y+21,t);
 let art='',title='',caption='';
 switch(week){
 case 1:
  title='離群值與群聚';art=edge(55,100,475,100)+edge(55,100,55,12);
  for(const [x,y] of [[110,72],[125,57],[138,79],[143,62],[160,70],[166,52],[175,82],[183,67],[201,60]])art+='<circle class="class-a" cx="'+x+'" cy="'+y+'" r="5"/>';
  art+='<circle cx="408" cy="20" r="7" class="class-b"/>'+label(305,26,'孤立的觀測值')+label(145,123,'常見的觀測範圍');
  caption='大多數觀測值集中在左下。右上角的點值得回查原始資料，再判斷是輸入錯誤或真實的罕見事件。';break;
 case 2:
  title='用箱平均值平滑';art=label(85,25,'排序後的資料')+box(170,4,162,'2　4　6')+box(348,4,162,'10　12　14')+edge(251,39,251,70)+edge(429,39,429,70)+label(85,94,'平滑後的資料')+box(170,73,162,'4　4　4')+box(348,73,162,'12　12　12');
  caption='每三筆分成一箱，將每個值換成該箱平均值。第一箱為 (2 + 4 + 6) ÷ 3 = 4，第二箱為 12。';break;
 case 4:
  title='Apriori 剪枝示例';art=box(201,4,178,'候選 {A, B, C}')+edge(290,36,106,78)+edge(290,36,290,78)+edge(290,36,475,78)+box(20,78,170,'AB　頻繁')+box(205,78,170,'AC　不頻繁')+box(390,78,170,'BC　頻繁');
  caption='只要子集 AC 的支持度低於門檻，所有同時含 A、B、C 的交易也不可能更多，因此可直接刪去 ABC。';break;
 case 6:
  title='Lift 的基準是 1';art=edge(64,65,520,65);
  [82,290,499].forEach((x,i)=>{art+=edge(x,54,x,75)+label(x,40,['0.5','1','1.5'][i])+label(x,103,['比預期少','符合獨立預期','比預期多'][i])});
  caption='若 B 的購買率為 40%，買 A 的人有 60% 也買 B，則 Lift = 60% ÷ 40% = 1.5。';break;
 case 7:
  title='從次數讀出條件機率';art=box(15,40,130,'10 天')+edge(145,57,232,24)+edge(145,57,232,95)+box(232,8,160,'打球　6 天')+box(232,78,160,'沒打球　4 天')+edge(392,24,435,24)+box(435,8,137,'晴天　3 天');
  caption='在自編的 10 天紀錄中，先限定「打球」的 6 天，再數其中 3 個晴天：P(晴天｜打球) = 3/6。';break;

 }
 return '<figure class="diagram"><div class="kicker">自編範例圖 · '+title+'</div><svg role="img" aria-label="'+title+'" viewBox="0 0 585 135">'+art+'</svg><figcaption>'+caption+'</figcaption></figure>';
}
function lectureCard(n,p,title) {
 const src='figures/w'+n+'-p'+p+'.webp';
 return '<a href="'+src+'" target="_blank" rel="noopener"><img loading="lazy" src="'+src+'" alt="'+title+'"><small>講義原圖 · P. '+p+' ↗</small><strong>'+title+'</strong></a>';
}

