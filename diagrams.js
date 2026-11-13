// Small worked diagrams, drawn directly from the quantities shown.
function studyDiagram(week) {
 const line=(x,y,X,Y)=>'<path class="edge" d="M'+x+' '+y+'L'+X+' '+Y+'"/>';
 const txt=(x,y,t)=>'<text x="'+x+'" y="'+y+'" text-anchor="middle">'+t+'</text>';
 const box=(x,y,w,h,t)=>'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="8"/>'+txt(x+w/2,y+h/2+5,t);
 let art='',caption='';
 if(week===1){
  art=line(150,46,230,46)+line(350,46,435,46)+box(9,24,143,46,'交易紀錄')+box(216,24,145,46,'共現模式')+box(428,24,142,46,'商品推薦');
  caption='從資料到應用：以購物籃交易找出常一起購買的商品，再用於推薦。';
 }else if(week===2){
  art=line(55,50,525,50)+line(55,37,55,63)+line(525,37,525,63)+'<rect x="160" y="28" width="240" height="44"/>'+line(265,28,265,72);
  [55,160,265,400,525].forEach((x,i)=>art+=txt(x,99,['最小值 2','Q1  6','中位數 10','Q3  15','最大值 20'][i]));
  caption='無離群值的箱形圖示例。盒身包含中間 50% 的資料，寬度為 15 − 6 = 9。';
 }else if(week===4){
  [100,50,30].forEach((v,i)=>{art+=txt(75,21+i*32,['全部交易','含 A','同含 A、B'][i])+'<rect x="145" y="'+(5+i*32)+'" width="'+v*3.45+'" height="22" rx="3"/>'+txt(149+v*3.45+22,21+i*32,v)});
  caption='同一組交易可得到兩種比例。支持度為 30/100，A → B 的信賴度為 30/50。';
 }else if(week===6){
  art=line(87,55,220,55)+line(306,55,441,25)+line(306,55,441,89)+box(15,35,90,40,'root')+box(207,35,108,40,'A · 5')+box(430,5,120,40,'B · 3')+box(430,68,120,40,'C · 2');
  caption='把三筆 A,B 與兩筆 A,C 依相同順序插入樹中，兩條路徑共用 A 節點。';
 }else if(week===7){
  art=line(246,44,116,83)+line(325,44,462,83)+box(204,4,167,40,'甲 4 ／ 乙 4')+box(32,72,163,37,'甲 4 ／ 乙 0')+box(386,72,163,37,'甲 0 ／ 乙 4');
  caption='一次完全分離兩類的切分。父節點的 Gini 為 0.5，兩個子節點的 Gini 都是 0。';
 }else if(week===10){
  art=line(108,52,181,52)+line(286,52,361,52)+line(466,52,497,52)
    +box(3,28,105,45,'Week 10')+box(181,28,106,45,'LIBSVM')
    +box(361,28,106,45,'推薦系統')+box(497,28,85,45,'社群分析');
  caption='Week 10 包含四個課程範圍：DM_week10、LIBSVM、推薦系統及社群網路分析。';
 }else{
  art='<ellipse cx="185" cy="57" rx="83" ry="46" class="neighborhood"/>';
  [[142,52],[204,28],[219,75],[310,30],[340,86]].forEach(([x,y],i)=>art+=i<2?'<circle cx="'+x+'" cy="'+y+'" r="8" class="class-a"/>':'<rect x="'+(x-7)+'" y="'+(y-7)+'" width="14" height="14" class="class-b"/>');
  art+=txt(182,66,'★')+txt(462,46,'● 甲類　■ 乙類')+txt(462,79,'★ 查詢樣本');
  caption='k = 3 時只看最近的三點。兩個圓點與一個方點投票，查詢樣本被判為甲類。';
 }
 return '<figure class="diagram"><div class="kicker">觀念整理圖</div><svg viewBox="0 0 585 118" role="img" aria-label="'+caption+'">'+art+'</svg><figcaption>'+caption+'</figcaption></figure>';
}
