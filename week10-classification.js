globalThis.dmW10Classification = [
  {
    "page": 1,
    "title": "Data Mining: Classification",
    "body": "本週聚焦分類模型的實務問題。前面學過決策樹、SVM 等模型，這份講義進一步回答：該選哪些特徵、如何避免過度擬合、怎麼公平評估分類器。\n\n閱讀時把模型開發看成完整流程：輸入欄位的品質會影響分類，訓練分數不代表泛化能力，評估結果也會受資料切分及類別比例影響。本份共有 50 個 PDF 頁面；第 21 頁起頁腳編號比 PDF 頁碼多 1，以下以 PDF 頁碼對照原檔。\n\n**本頁重點：**學習主線：特徵→泛化→評估→不平衡資料。"
  },
  {
    "page": 2,
    "title": "Practical Issues in Classification",
    "body": "課程分成 Feature Selection and Engineering，以及 Overfitting、Model Evaluation and Selection、Class Imbalance。這些問題往往比單純選一個分類演算法更直接影響模型是否能用於真實資料。\n\n例如同一個 SVM，即使演算法不變，刪除無關特徵、調整模型複雜度、換成合適的驗證策略，都可能改變可靠性。四個主題是互相連動的開發決策，不是四種新的分類演算法。\n\n**本頁重點：**評估時必須考慮資料分布及不同錯誤的代價。"
  },
  {
    "page": 3,
    "title": "Feature Selection and Engineering",
    "body": "這是「特徵選擇與特徵工程」章節首頁。特徵選擇是從既有欄位挑出重要部分；特徵工程則從原始欄位轉換、組合出更有預測力的新特徵。\n\n**自編對照：**從身高、體重、學號中挑出前兩欄是特徵選擇；以體重／身高平方建立 BMI 則是特徵工程。新建欄位之後仍可再做選擇，兩者並不互斥。\n\n**本頁重點：**Selection 是選，Engineering 是建構。"
  },
  {
    "page": 4,
    "title": "Feature Selection",
    "body": "資料可能有幾百或幾千個候選特徵，並非越多越好。Relevant 特徵提供類別訊息；Irrelevant 特徵如學號對 GPA 的預測通常無幫助；Redundant 特徵如月薪與年薪可能重複傳達資訊。\n\n月薪與固定 12 倍月薪的年薪屬冗餘，因為後者未提供新的獨立資訊；學號可能在某份小資料碰巧與成績相關，卻不一定能泛化。應依訓練／驗證資料檢驗有用性，而不是僅因欄位數多就認為資訊多。\n\n**本頁重點：**目標是選出較小但有用的特徵子集。"
  },
  {
    "page": 5,
    "title": "Feature Engineering",
    "body": "特徵工程把原始資訊轉成更有意義的訊號，例如把每日確診數與檢測數轉成一週陽性率。傳統方法仰賴領域知識；深度學習則能自動從資料學得表示。\n\n若每天檢測量不同，一週陽性率應以整週陽性數除以整週檢測數，而不一定是七天陽性率的簡單平均。這是依講義例子延伸的解讀：新特徵必須有合理分母，且不能用預測時尚未取得的未來資料。\n\n**本頁重點：**新特徵應對預測目標有意義，而不是單純增加維度。"
  },
  {
    "page": 6,
    "title": "Feature Selection Methods",
    "body": "Filter 先用統計分數評估特徵，不綁定特定分類器；Wrapper 反覆用分類器驗證不同特徵子集；Embedded 則在訓練模型時同步選特徵。三種方法的核心差異是「何時選」與「是否需要訓練模型」。\n\n圖式差別可理解為：Filter 先篩特徵再建立模型；Wrapper 讓模型的驗證表現回饋到搜尋；Embedded 在同一次訓練中決定係數或分割。Filter 的單特徵評分可能忽略特徵之間的交互作用；Wrapper 較能配合模型，但需要多次訓練。\n\n**本頁重點：**Filter 快；Wrapper 計算成本高；Embedded 與模型學習整合。"
  },
  {
    "page": 7,
    "title": "Filter Methods",
    "body": "Fisher Score 衡量類別間平均值的差距，相對於類別內的變異。類別分布越分開、類別內越集中，這個特徵的分數通常越高。\n\n\\[F_r=\\frac{\\sum_{k=1}^{C}n_k(\\mu_{k,r}-\\mu_r)^2}{\\sum_{k=1}^{C}n_k\\sigma_{k,r}^2}\\]\nC 是類別數，n_k 是類別 k 樣本數，μ_k,r 與 σ²_k,r 是該類在特徵 r 的平均與變異，μ_r 是全體平均。**自編例：**兩類各 10 人，平均 0、4，類內變異都 1，總平均 2，則 F=(10×4+10×4)/(10+10)=4。分母為零時需特別處理，不能直接做一般除法。\n\n**本頁重點：**F_r = Σ_k n_k(μ_{k,r}−μ_r)² / Σ_k n_k σ²_{k,r}；分數越高通常越值得保留。"
  },
  {
    "page": 8,
    "title": "Wrapper Methods",
    "body": "Wrapper 會先選一組特徵、訓練分類器，再依驗證表現增刪或替換欄位。Exhaustive Search 有 2^p−1 組非空子集；Forward Selection 從空集合逐步增加；Backward Elimination 從全特徵逐步刪除。\n\np=10 時已經有 2¹⁰−1=1023 個非空子集；p=30 時超過十億。Forward／Backward 是較可行的貪婪搜尋，但不保證找到所有子集中最佳的一組。若使用交叉驗證，特徵選擇也應在每輪訓練資料內完成，避免驗證資訊流入搜尋。\n\n**本頁重點：**搜尋時要看 Validation，不可拿 Test Set 反覆挑特徵。"
  },
  {
    "page": 9,
    "title": "Embedded Methods",
    "body": "Embedded Method 在模型訓練過程決定重要特徵，例如 Decision Tree 依分割選欄位，LASSO 透過 L1 Regularization 使部分係數恰好變成零。\n\n\\[L(w)=\\frac12\\sum_{i=1}^{n}(y_i-w^Tx_i)^2+\\lambda\\sum_{j=1}^{d}|w_j|\\]\n第一項衡量擬合誤差，第二項懲罰係數絕對值；λ 越大通常使係數收縮更強。講義末項下限印成 j=i，此處依「遍歷所有特徵」的語意寫 j=1。係數為零可排除該特徵，但「L1 促進稀疏」不代表所有無關欄位必然都正確歸零。\n\n**本頁重點：**LASSO 目標＝預測誤差＋λΣ|w_j|；係數為零的特徵可視為被排除。"
  },
  {
    "page": 10,
    "title": "Model Overfitting",
    "body": "此頁是「模型過度擬合」章節的開始。核心問題不只是把訓練資料分對，而是模型面對未見過的資料能否維持好表現，也就是 Generalization。\n\n此頁是章節分隔，沒有新增演算法或數值實驗。後面以樹的節點數控制模型彈性，讓讀者看到「把訓練資料切得更細」與「真正更能預測」的差別。\n\n**本頁重點：**要同時觀察訓練誤差與驗證／測試誤差。"
  },
  {
    "page": 11,
    "title": "Model Overfitting",
    "body": "Training Error 是模型在用來擬合的資料上的錯誤；Test Error 是未見資料上的預期錯誤。Overfitting 是訓練誤差很低，但模型記住了雜訊與偶然模式，導致泛化表現差。\n\n**自編例：**一棵樹記住每位訓練學生的個別編號，訓練時可以全對，但新學生沒有對應規則。這就是抓到樣本特有細節而未學到一般關係。比較誤差前也要確定訓練與測試採用相同評估指標。\n\n**本頁重點：**訓練分數漂亮不代表新資料預測可靠。"
  },
  {
    "page": 12,
    "title": "Training Error Decreases with Model Complexity",
    "body": "圖中的橫軸是決策樹節點數，縱軸是訓練誤差。隨著樹增加節點，模型可以對訓練樣本切得更細，因此訓練誤差通常下降，但圖並未保證測試誤差也下降。\n\n橫軸 Number of Nodes 代表樹複雜度，縱軸 Error 代表錯誤比例；左側從極簡單模型增加少量節點，訓練誤差急降，後面緩慢下降。這是同一批訓練資料上的曲線，尚未顯示泛化的代價，因此不能據此直接選最右端的樹。\n\n**本頁重點：**不能只用最小 Training Error 選模型。"
  },
  {
    "page": 13,
    "title": "Model Overfitting — Simple Decision Tree",
    "body": "圖示展示節點數較少時的分類邊界：一棵簡單樹以少量矩形區域切分樣本，能捕捉主要結構但仍有部分訓練誤差。圖上紅圈對應特定樹複雜度。\n\n紅圈約在 5 個節點附近，箭頭連到小決策樹與右方分區圖。每個矩形區域對應樹的軸向切割，少量節點已捕捉中央資料團塊。分區圖是特徵空間，曲線圖是誤差與複雜度，兩種座標軸不要混讀。\n\n**本頁重點：**較簡單的模型偏差可能較大，但未必泛化較差。"
  },
  {
    "page": 14,
    "title": "Model Overfitting — Growing Decision Tree",
    "body": "當樹變得更複雜，圖中出現愈多分枝與切割矩形，訓練誤差進一步降低。這也增加追逐零碎資料點和雜訊的機會。\n\n紅圈移到約 40 節點處，樹的分支增加，右方矩形分區更碎。相對第 13 頁，曲線只下降一部分，卻換來大量額外切割；需用獨立資料確認新增細節是可泛化訊號，還是對特定樣本的追逐。\n\n**本頁重點：**分割愈細，不一定代表真正分類規則愈好。"
  },
  {
    "page": 15,
    "title": "Model Overfitting — 5 vs. 40 Nodes",
    "body": "本頁直接比較 5 nodes 與 40 nodes 的分類結果：40 節點的決策邊界更細碎、在訓練資料上的誤差更低。圖想強調模型複雜度和泛化能力必須分開評估。\n\n圖把兩個模型放在同一條訓練誤差曲線上：5 節點模型較粗略，40 節點模型多出局部小區塊。它只直接證明訓練擬合更細，不能單從這張圖確定 40 節點一定過擬合，還需後面的測試／驗證曲線。\n\n**本頁重點：**判斷哪棵樹較好，要看未參與訓練的資料。"
  },
  {
    "page": 16,
    "title": "Underfitting / Good Fit / Overfitting",
    "body": "Underfitting 是模型太簡單，訓練與測試誤差都高；Good Fit 兩者都低；Overfitting 則訓練誤差極低但測試誤差高。增加具代表性的訓練資料，通常有助於縮小固定模型複雜度下的泛化落差。\n\n|狀態|模型複雜度|訓練誤差|未見資料誤差|\n|---|---|---|---|\n|欠擬合|過低|高|高|\n|合宜擬合|適中|低|低|\n|過度擬合|相對資料量過高|非常低|高|\n固定複雜度下增加有代表性的資料，通常能縮小落差；若只是複製原資料，不會同樣增加新資訊。\n\n**本頁重點：**辨識三種狀態時，優先比較 Training Error 與 Test Error。"
  },
  {
    "page": 17,
    "title": "Choosing Model Complexity",
    "body": "隨模型變複雜，藍色訓練誤差通常持續下降，紅色測試誤差卻可能先降後升，呈現近似 U 型關係。實務上應藉由驗證集選擇使泛化誤差低的複雜度，而非拿測試集反覆選模型。\n\n圖的紅線先下降後上升，低點代表複雜度與泛化的取捨。若為了挑選低點反覆查看同一組「測試資料」，它實際上已成為驗證集；最終測試集應另保留。此處依後面第 23 頁的明確切分原則補充操作上的區別。\n\n**本頁重點：**原投影片寫「minimum test error」是概念示意，實際調參用 Validation，Test 留作最後一次評估。"
  },
  {
    "page": 18,
    "title": "Reasons for Model Overfitting",
    "body": "模型可能把抽樣雜訊、離群值或錯誤標籤誤認為一般規則。講義指出兩個主要因素：Limited Training Data，以及 Excessive Model Complexity。\n\n資料不足讓模型難以區分真實關係與抽樣偶然性；容量過大則讓它有能力追逐雜訊。兩者是相對關係：同一複雜模型對大量多樣資料可能合理，對極少量樣本則可能不穩，不能只看參數數量判定好壞。\n\n**本頁重點：**資料少＋模型太彈性，特別容易過度擬合。"
  },
  {
    "page": 19,
    "title": "Limited Training Data: Increasing Training Set Size",
    "body": "圖示將訓練樣本數加倍後，比較訓練與測試曲線。更多具代表性的訓練資料可以讓模型較不容易依賴小樣本的偶然規律，降低過度擬合。\n\n左圖的紅色測試誤差隨節點增加而上升，右圖訓練樣本加倍後，紅藍曲線較接近且較平坦。這是教材的示意結果，並非保證任何資料加倍都能消除過擬合；新增資料必須與預期應用分布相關。\n\n**本頁重點：**不是單純重複資料；重點是增加資訊量與代表性。"
  },
  {
    "page": 20,
    "title": "High Model Complexity",
    "body": "複雜度的定義依模型而異：決策樹可看深度或節點／葉節點數；線性模型可看特徵數與有效自由度；神經網路可看參數量及資料多樣性。\n\n**自編例：**限制樹深度會限制可形成的規則組合；線性模型增加很多無關欄位則增加可調係數。不同模型的「40 個參數」不能直接等同「40 個樹節點」，複雜度指標須在相同模型家族內搭配驗證表現解讀。\n\n**本頁重點：**模型容量要和資料規模匹配。"
  },
  {
    "page": 21,
    "title": "Model Evaluation and Selection",
    "body": "進入「模型評估與選擇」章節。模型做出預測之後，還需要可靠指標、合理資料切分及公平的模型比較，才能選出能泛化的分類器。\n\n章節從「模型是否太複雜」轉向「怎麼測量與比較模型」。先定義正負類與四格表，再推導指標；最後討論資料切分。這個順序很重要，因為錯誤代價與資料比例會影響應該優化哪個分數。\n\n**本頁重點：**先確定評估目標，再挑對指標。"
  },
  {
    "page": 22,
    "title": "Model Evaluation and Selection",
    "body": "分類器評估使用 Accuracy、Precision、Recall、F1-score、ROC/AUC 等指標。模型比較不只比較演算法，也包括特徵組合、超參數與決策門檻。\n\n**自編例：**垃圾郵件分類若把重要信誤刪，FP 的代價可能高；異常偵測若漏掉真正事件，FN 可能更重要。因此不能只問哪個模型 Accuracy 最大，還要問它在哪一種錯誤上付出代價。\n\n**本頁重點：**一個指標無法反映所有錯誤代價。"
  },
  {
    "page": 23,
    "title": "Model Evaluation and Selection — Data Splits",
    "body": "Holdout 與 Cross-Validation 是估計模型表現的常見方法。訓練／驗證資料用來開發與選擇模型，完整保留的 Test Set 用於選定最終模型後的一次性評估。\n\n訓練集估參數；驗證集或 CV 選模型、特徵、超參數及門檻；最後未碰過的測試集報告泛化表現。若看完測試結果又回頭修改設計，就不能再把同一測試分數當完全獨立的最終證據。\n\n**本頁重點：**Test Set 不能被用來來回調參。"
  },
  {
    "page": 24,
    "title": "Metrics for Evaluating Classifier Performance",
    "body": "二元分類要先指定 Positive Class 與 Negative Class，然後比較每筆資料的 Ground Truth（真實標籤）與 Predicted Label（預測標籤）。\n\n例如將罹癌定為正類，沒有罹癌為負類。「Positive」代表研究關心的事件，不是好事或壞事。若交換正負類，Accuracy 不變，但 Precision、Recall 等數值可能改變，因此報告指標要先說清楚正類。\n\n**本頁重點：**正類不一定是數值 1，需依問題定義。"
  },
  {
    "page": 25,
    "title": "Confusion Matrix — TP/TN/FP/FN",
    "body": "TP 是真實正類且預測正類；TN 是真實負類且預測負類；FP 是負類誤報成正類；FN 是正類漏判成負類。這四個數量是後續所有分類指標的基礎。\n\n記憶方式是先看 P／N：模型預測正或負；再看 T／F：這個預測是否正確。例如 FP 是「預測正但錯了」，真實其實是負。漏診則是 FN，因為實際有病卻被預測為負。\n\n**本頁重點：**FP 為誤報，FN 為漏報。"
  },
  {
    "page": 26,
    "title": "Confusion Matrix — Four Cells",
    "body": "矩陣以實際類別作為列、預測類別作為欄：Actual+／Predicted+ 是 TP；Actual+／Predicted− 是 FN；Actual−／Predicted+ 是 FP；Actual−／Predicted− 是 TN。\n\n|實際／預測|預測正|預測負|總數|\n|---|---|---|---|\n|實際正|TP|FN|P=TP+FN|\n|實際負|FP|TN|N=FP+TN|\n|總數|TP+FP|FN+TN|P+N|\n不同資料來源可能轉置矩陣，不能只記左上右下位置而不看列欄標籤。\n\n**本頁重點：**實際正類 P=TP+FN；實際負類 N=FP+TN。"
  },
  {
    "page": 27,
    "title": "Accuracy and Error Rate",
    "body": "Accuracy 衡量所有資料中正確分類的比例；Error Rate 則是錯誤分類比例，兩者相加為 1。\n\n\\[Accuracy=\\frac{TP+TN}{TP+TN+FP+FN},\\qquad Error=1-Accuracy\\]\n**自編例：**100 筆中 90 筆分對，Accuracy=90%、Error=10%。兩者把 FP 與 FN 都各算一次錯誤，所以無法區分漏報與誤報的不同成本。\n\n**本頁重點：**Accuracy=(TP+TN)/(TP+TN+FP+FN)，Error Rate=(FP+FN)/All。"
  },
  {
    "page": 28,
    "title": "Why Accuracy Can Be Misleading",
    "body": "假設罹癌比例只有 3%，分類器永遠預測沒有罹癌也能得到 97% Accuracy，但完全找不到任何正類。這是 Class Imbalance 情境下只看準確率的陷阱。\n\n若 1000 人有 30 位正類，全部判負時 TP=0、FN=30、TN=970、FP=0，因此 Accuracy=97%，Recall=0。Precision 的分母 TP+FP=0，數學上未定義；軟體可約定回傳 0，但應知道那是處理慣例，而非一般除法結果。\n\n**本頁重點：**少數類偵測需搭配 Recall／Precision。"
  },
  {
    "page": 29,
    "title": "Precision and Recall",
    "body": "Precision 衡量「預測為正類的人，有多少真的為正類」；Recall 衡量「實際為正類的人，有多少被找出」。Precision 的分母包含 FP；Recall 的分母包含 FN。\n\n\\[Precision=\\frac{TP}{TP+FP},\\qquad Recall=\\frac{TP}{TP+FN}\\]\n**自編例：**發出 20 次警報，12 次是真的，而總共存在 30 個事件，則 Precision=12/20=0.6、Recall=12/30=0.4。前者問警報可信度，後者問事件找回率。\n\n**本頁重點：**Precision=TP/(TP+FP)，Recall=TP/(TP+FN)。"
  },
  {
    "page": 30,
    "title": "F1-score and Fβ",
    "body": "F1 是 Precision 與 Recall 的調和平均，任一方很低都會拖低 F1。一般化的 Fβ 可調整權重：β>1 更重視 Recall；β<1 更重視 Precision。\n\n\\[F_1=\\frac{2PR}{P+R}=\\frac{2TP}{2TP+FP+FN},\\qquad F_\\beta=\\frac{(1+\\beta^2)PR}{\\beta^2P+R}\\]\n此處 P、R 表示 Precision、Recall，不是前頁的正類總數。若 P=1、R=0.1，F1≈0.1818，遠低於算術平均 0.55，反映它不鼓勵只做好其中一方。\n\n**本頁重點：**F1=2PR/(P+R)；Fβ=(1+β²)PR/(β²P+R)。"
  },
  {
    "page": 31,
    "title": "TPR/TNR/FPR/FNR",
    "body": "TPR（Sensitivity／Recall）是找出正類的比例；TNR（Specificity）是正確辨識負類的比例；FPR 是負類被誤報比例；FNR 是正類被漏判比例。\n\n\\[TPR=\\frac{TP}{TP+FN},\\quad TNR=\\frac{TN}{TN+FP},\\quad FPR=1-TNR,\\quad FNR=1-TPR\\]\nTPR／FNR 的分母是真實正類；TNR／FPR 的分母是真實負類。FPR 不是 1−Precision，因為後者的分母是預測正類，兩者所問的族群不同。\n\n**本頁重點：**TPR=TP/(TP+FN)；TNR=TN/(TN+FP)；FPR=FP/(FP+TN)；FNR=FN/(FN+TP)。"
  },
  {
    "page": 32,
    "title": "Confusion Matrix — Worked Exercise",
    "body": "講義例題共有 10,000 人：TP=90、FN=210、FP=140、TN=9560。算出 Accuracy=96.50%、Precision=39.13%、Recall=30%、Specificity=98.56%、F1≈33.96%。\n\n|實際／預測|癌症 yes|癌症 no|合計|\n|---|---:|---:|---:|\n|癌症 yes|90|210|300|\n|癌症 no|140|9560|9700|\n計算過程：Accuracy=(90+9560)/10000=0.965；Precision=90/230≈0.3913；Recall=90/300=0.3；Specificity=9560/9700≈0.9856；F1=180/(180+140+210)=180/530≈0.3396。直接用計數算 F1 可避免先四捨五入的誤差。\n\n**本頁重點：**先畫四格表，再決定各指標的分母。"
  },
  {
    "page": 33,
    "title": "Is 96.5% Accuracy Good?",
    "body": "此模型雖有 96.5% 準確率，但 300 名真實罹癌者只找出 90 名，漏掉 210 名（70%）。是否應優先提高 Recall、Precision，取決於漏診與誤報的代價。\n\n這組資料若全部判負，Accuracy 甚至會達 97%，高於模型的 96.5%，但 Recall 會降到零。可見不能只比較 Accuracy 就斷言全判負更適合。改善門檻通常會在漏報與誤報間取捨，應依問題成本選擇，而非只追求某個漂亮數字。\n\n**本頁重點：**醫療篩檢常特別關注 False Negative。"
  },
  {
    "page": 34,
    "title": "Comparing Three Binary Classifiers",
    "body": "圖表比較 A、B、C 三個分類器；Precision 都是 0.5，但 Recall 分別為 0.2、0.5、0.8，同時 FPR 也從 0.2 上升至 0.8。Recall 高不一定全面更好，因為誤報也可能增加。\n\n|模型|TP/FN/FP/TN|Precision|Recall|FPR|F1（重算）|\n|---|---|---|---|---|---|\n|A|10/40/10/40|0.5|0.2|0.2|0.2857|\n|B|25/25/25/25|0.5|0.5|0.5|0.5|\n|C|40/10/40/10|0.5|0.8|0.8|0.6154|\n三點都在 TPR=FPR 對角線上。講義的 F1 顯示 0.28、0.5、0.61 為較粗略截取值，以上保留四位小數。\n\n**本頁重點：**看 ROC 時必須同時比較 TPR 與 FPR。"
  },
  {
    "page": 35,
    "title": "ROC Curve: Comparing TPR and FPR",
    "body": "ROC（Receiver Operating Characteristic）以 FPR 為橫軸、TPR 為縱軸，展示改變分類門檻後的取捨。理想點是 (0,1)，左上角代表較少誤報而能抓到較多正類。\n\n固定 FPR 比較兩條 ROC，TPR 高者能在同誤報比例下找出更多正類。曲線交叉時，則要看實際允許的誤報區間。ROC 的 x 軸並不是 Precision，也不是錯誤率 FP+FN 的整體比例。\n\n**本頁重點：**(0,0) 全判負；(1,1) 全判正。"
  },
  {
    "page": 36,
    "title": "ROC Space — Four Classifiers",
    "body": "圖將 A、B、C、D 的混淆矩陣換成 ROC 平面上的點。例：D 的 TPR=0.76、FPR=0.12，代表相較某些其他點，同時兼具高召回與低誤報。\n\n四點座標依序為 A=(0.28,0.63)、B=(0.77,0.77)、C=(0.88,0.24)、D=(0.12,0.76)，所以 D 比 A 更靠左上。原頁標示 different decision threshold，但這四點不宜解讀為同一固定排序模型的完整門檻軌跡：降低門檻時 TPR、FPR 應同時不減，而 A、D 並不符合此排序關係；此圖主要用於比較 ROC 空間工作點。\n\n**本頁重點：**比較兩點時，通常選更靠左上的工作點。"
  },
  {
    "page": 37,
    "title": "Constructing an ROC Curve — Scores",
    "body": "建構 ROC 需要分類器輸出可排序的分數 s(x)，例如機率或 decision score。設定門檻 t，當 s(x)≥t 判為正類，否則判負類；改變 t 就得到不同的 TP/FP。\n\n只有硬標籤通常只能算出一個工作點；要畫完整 ROC，必須保留機率或 decision score。分數高低需有一致方向，例如越大越像正類；如果分數定義相反，就要調整排序及門檻判斷。\n\n**本頁重點：**ROC 來自同一模型在多個門檻下的表現。"
  },
  {
    "page": 38,
    "title": "Constructing an ROC Curve — Procedure",
    "body": "先把門檻放在最高分之上，此時全部判負，得到 (FPR,TPR)=(0,0)。逐步降低門檻，讓更多樣本判正，直到全部判正得到 (1,1)；依序連起各點即 ROC Curve。\n\n若正類共 P 個，每納入一個正類，TPR 增 1/P；若負類共 N 個，每納入一個負類，FPR 增 1/N。**同分注意：**實際門檻不能拆開相同分數的樣本，應把它們同時納入；單個樣本逐步走的圖需要另外說明同分處理。\n\n**本頁重點：**每個點對應一個特定 Threshold。"
  },
  {
    "page": 39,
    "title": "ROC Curve — Step-by-Step Example",
    "body": "此頁是逐個調整門檻的表格與階梯式 ROC 圖。閱讀圖時，若新加入的是正類，TPR 往上；若新加入的是負類，FPR 往右。圖上的紅圈呈現每次門檻變化後的工作點。\n\n表中正負類各 5 筆。門檻高於 0.95 時為 (0,0)，納入 0.95、0.93 兩個正類後到 (0,0.4)，再納入 0.87 的負類到 (0.2,0.4)。0.85 有兩負一正同分；講義把它們拆成階梯中間點作教學展示，但真正以同一門檻納入時會從 (0.2,0.4) 一次移到 (0.6,0.6)。因此不可把每個同分中間點都當成可單獨設定的門檻結果。\n\n**本頁重點：**正類推高曲線，負類使曲線水平右移。"
  },
  {
    "page": 40,
    "title": "AUC (Area Under ROC Curve)",
    "body": "AUC 是 ROC 曲線下面積，用來衡量模型把正類排在負類前面的整體能力。Perfect Ranking 的 AUC=1；隨機排序約為 0.5；但不同應用仍可能只關心特定 FPR 範圍。\n\n可將 AUC 理解為隨機抽一正一負，正類分數較高的機率，平手通常算半分。AUC=0.5 是隨機排名基準；AUC 高也不保證在某個門檻下 Precision 高，因為 Precision 還受正類比例影響。\n\n**本頁重點：**AUC 是跨門檻排名能力，不等同某單一門檻的 Accuracy。"
  },
  {
    "page": 41,
    "title": "Choosing a Model Depends on Operating Region",
    "body": "圖中 M1 在低 FPR 區域有較高 TPR，M2 在較高 FPR 區域反而較好。詐欺偵測與疾病篩檢能承受的誤報率不同，因此即使比較 ROC/AUC，也應依實際操作區間選模型。\n\n圖中低 FPR 約 0.1 時 M1 的 TPR 較高；高 FPR 約 0.6 時 M2 較高，所以兩曲線互有優勢。高代價的誤報情境可能偏好左側區域，較能接受誤報而優先找回事件時可能看另一區域；不能單依「詐欺／疾病」名稱預設所有應用都有相同成本。\n\n**本頁重點：**沒有脫離應用代價的絕對「最佳 ROC」。"
  },
  {
    "page": 42,
    "title": "Classifier Evaluation: Holdout Method",
    "body": "Holdout 將資料隨機分成互斥的 Training Set 與 Test Set，投影片以約 2/3 訓練、1/3 測試為例。Repeated Holdout 可重新切分多次並報告平均表現，降低單次切分偶然性。\n\nRepeated holdout 的不同輪次可能重複抽到同一筆資料，與 k-fold 的每折互斥分工不同。若此流程拿來選模型，應把被比較的一部分視為 validation，另外留 final test；不能一面反覆選參，一面稱相同資料是完全未碰過的最終測試。\n\n**本頁重點：**做模型選擇時仍需要適當的 Validation。"
  },
  {
    "page": 43,
    "title": "Classifier Evaluation: Cross-Validation",
    "body": "k-fold CV 將訓練資料分成 k 個互斥且大小接近的 folds，輪流以一份驗證、剩餘 k−1 份訓練。最後平均 k 個驗證分數；常見 k=5 或 10。\n\n\\[\\bar m=\\frac1k\\sum_{j=1}^{k}m_j\\]\nm_j 是第 j 折驗證分數。每輪都要重新訓練模型，且縮放、補值、特徵選擇等規則只能由該輪訓練折估計。CV 用來評估訓練流程與選參，不是先用全資料訓練一次，再輪流把同一模型拿去評分。\n\n**本頁重點：**每個訓練樣本會輪流進入一次 Validation Fold。"
  },
  {
    "page": 44,
    "title": "k-fold Cross-Validation Diagram",
    "body": "圖示先保留獨立 Test Set，再將 Training Data 分成 10 折。橘色是每輪 Validation Fold、綠色是 Training Folds；十次驗證分數取平均。\n\n圖上先從 full labeled dataset 切出 held-out test data；下方只把 training data 分成 D₁–D₁₀。每列橘色折輪流當驗證，其餘綠色為訓練，最後平均十次指標。選好設定後可用全部 training data 重訓，再於保留測試集評估。\n\n**本頁重點：**保留的 Test Set 完全不參加十折調參。"
  },
  {
    "page": 45,
    "title": "LOOCV and Stratified CV",
    "body": "Leave-One-Out Cross-Validation 將 n 筆樣本分成 n 折，每輪只留 1 筆驗證，常用於小資料。Stratified CV 則使每折的類別比例接近整體訓練資料，特別適合類別不平衡。\n\nLOOCV 每次訓練 n−1 筆、驗證 1 筆，共訓練 n 次，資料利用率高但計算成本可能大。Stratified k-fold 強調每折類別比例，而不是讓每折正負類強制各一半；若整體 10% 正類，各折也應大致維持 10%。\n\n**本頁重點：**LOOCV 的 k=n；Stratified 強調類別分布。"
  },
  {
    "page": 46,
    "title": "Stratified Cross-Validation Diagram",
    "body": "圖中資料包含不同顏色的類別，分折時讓每個 Fold 保留近似原始類別比例，而不是把少數類集中到某一折。這能使各輪驗證結果更可比較。\n\n底部原始資料有 A、B、C 三類，各 5 筆，共 15 筆。五折時，每折驗證各取三類一筆，比例維持 1:1:1；上方五列輪流選橘色區塊，其餘為綠色訓練。此圖示範分層原理，並非把少數類過度抽樣到相等數量。\n\n**本頁重點：**分類時通常優先考慮 Stratified k-fold。"
  },
  {
    "page": 47,
    "title": "Class Imbalance — Data-Level Methods",
    "body": "資料層級方法包括 Random Oversampling（重複少數類）、Random Undersampling（減少多數類）及 SMOTE（合成少數類樣本）。投影片特別強調：重抽樣只能作用在訓練資料，不應先對全部資料重抽樣再切分。\n\n過度抽樣可能重複少數類而更易記住樣本；欠抽樣可能丟掉多數類資訊；SMOTE 在少數類鄰近樣本間合成新點。**自編公式補充：**x_new=x_i+α(x_j−x_i)，0≤α≤1，表示線段插值。交叉驗證時也應只對當輪訓練折抽樣，驗證／測試保持自然分布。\n\n**本頁重點：**避免讓合成樣本洩漏到測試集。"
  },
  {
    "page": 48,
    "title": "Class Imbalance — Algorithm-Level Methods",
    "body": "演算法層級可降低正類判斷門檻提升 Recall、設定較高的 Minority-Class Weight，或使用 Balanced Random Forest 等集成方法。門檻要從驗證資料選，而不是直接用測試集調整。\n\n降低門檻通常使更多樣本判正，Recall 不減但可能增加 FP；提高類別權重則改變訓練目標，使少數類分錯受到更大懲罰。這兩個機制作用階段不同，不能把「模型權重變了」與「同模型的門檻變了」混為一談。\n\n**本頁重點：**Threshold Moving 改決策；Class Weight 改錯誤代價。"
  },
  {
    "page": 49,
    "title": "Summary: Building a Classification Model",
    "body": "完整分類流程先處理 Missing Values 與 Outliers，再進行特徵轉換和選擇，接著訓練多個候選模型，最後使用 Validation/CV 調整特徵、超參數與門檻。\n\n**整合自編流程：**先保留測試資料，在訓練部分做分層 CV；每折內完成補值、縮放、選特徵與必要重抽樣，再比較候選設定。選好後重訓完整訓練集。這讓比較涵蓋整個實際使用的流程，而不只孤立的分類演算法。\n\n**本頁重點：**開發階段每一步要防止 Data Leakage。"
  },
  {
    "page": 50,
    "title": "Summary: Evaluating Classification Models Responsibly",
    "body": "評估時應依問題選 Accuracy、Precision、Recall、F-score、ROC、AUC 等指標，並適當處理 Class Imbalance。好分類器不只是 Accuracy 最高，而是能對未見資料泛化，且符合實際錯誤成本。\n\n最後報告應包含正類定義、切分方式、混淆矩陣及符合任務的指標，並說明選參沒有使用最終測試集。分類器的價值在於能對新資料做出可靠預測，且漏報與誤報的取捨符合任務，而不是把所有問題都壓成單一 Accuracy。\n\n**本頁重點：**整份講義結論：Generalization 與 Error Cost 比單一高分更重要。"
  }
];
