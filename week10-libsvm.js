globalThis.dmW10Libsvm = [
  {
    "page": 1,
    "title": "Data Mining: LIBSVM",
    "body": "本講義示範使用 LIBSVM 將 SVM 的理論變成可執行的分類流程，包括資料格式、縮放、參數選擇、訓練與預測。要特別分清 Training、Cross-Validation 與 Test 的工作。\n\n此份共有 13 頁，是工具操作流程。完整實驗應保存原始資料、縮放規則、選定參數及輸出模型，才能在新資料上重現預測；同一份 model 需要搭配訓練時使用的特徵編碼與縮放方式。\n\n**本頁重點：**LIBSVM 是實作工具，不是另一種與 SVM 無關的演算法。"
  },
  {
    "page": 2,
    "title": "LIBSVM Overview",
    "body": "LIBSVM 是由臺大研究團隊發展的 Support Vector Classification／Regression 工具，可以使用命令列執行模型訓練與預測。原始講義提供官方網站，作為取得工具與文件的入口。\n\n截圖是 LIBSVM 官方工具頁面，提供分類與迴歸相關程式。它處理的是已整理好的數值特徵，不會自動理解原始文字欄位或替使用者完成所有資料清理；使用前先確定目標與資料格式。\n\n**本頁重點：**官方文件：https://www.csie.ntu.edu.tw/~cjlin/libsvm/"
  },
  {
    "page": 3,
    "title": "Download LIBSVM",
    "body": "投影片截圖示範下載 LIBSVM 壓縮檔，解壓縮後在 Windows 子目錄可找到 svm-train.exe、svm-predict.exe、svm-scale.exe。使用者不必自行撰寫完整 SVM 演算法，就能執行模型流程。\n\n圖依序展示下載壓縮檔、解壓縮後的資料夾與 Windows 執行檔位置。操作前要讓目前工作資料夾能找到程式與資料，或使用完整路徑；下載包版本可能改變，教材截圖用於理解檔案角色，不代表必須沿用圖中的舊版檔名。\n\n**本頁重點：**train 訓練；predict 預測；scale 特徵縮放。"
  },
  {
    "page": 4,
    "title": "Using SVM: svm-train",
    "body": "示範命令：svm-train.exe -t 2 -c 32 -g 0.00125 train model。其中 -t 2 選 RBF kernel，-c 32 設定懲罰參數 C，-g 0.00125 設定 gamma；train 是輸入資料，model 是輸出模型檔。\n\n```text\nsvm-train.exe -t 2 -c 32 -g 0.00125 train model\n```\nC 決定分錯的懲罰強度；RBF 的 γ 決定距離影響尺度，核函數為：\n\\[K(x,z)=\\exp(-\\gamma\\|x-z\\|^2)\\]\nγ 較大時遠方樣本的影響衰減更快。train 與 model 是檔名，可自行命名；訓練時應輸入已依訓練規則縮放的資料。\n\n**本頁重點：**C 與 gamma 應透過交叉驗證選擇；不要把示例數值當成通用最佳解。"
  },
  {
    "page": 5,
    "title": "Using SVM: svm-predict",
    "body": "指令 svm-predict.exe test model output.txt 將 test 中的樣本套用已儲存的 model，並寫入 output.txt。若需要輸出 Class Probabilities，訓練與預測時都必須使用 -b 1。\n\n```text\nsvm-predict.exe test model output.txt\n```\n上面基本指令輸出標籤；若要機率，訓練時加 `-b 1`，預測時使用 `svm-predict.exe -b 1 test model output.txt`。輸出機率欄的順序依檔案 labels 標頭判讀，不能假定第一欄永遠是正類。\n\n**本頁重點：**預測檔是每筆樣本的預測標籤；有開機率估計才會附各類機率。"
  },
  {
    "page": 6,
    "title": "Using SVM: svm-scale",
    "body": "範例 svm-scale.exe -l 0 -u 1 -s scale.params train > train.scale：把特徵縮放至 [0,1]，並用 -s 儲存縮放參數。這些參數稍後必須原封不動用於測試資料；Windows 文字重導向有時會遇到檔案編碼問題。\n\n```text\nsvm-scale.exe -l 0 -u 1 -s scale.params train > train.scale\n```\n`>` 將標準輸出寫入檔案，`-s` 另外儲存縮放規則。對非常數特徵，[0,1] 的概念公式是 (x−min_train)/(max_train−min_train)。講義提醒 Windows 重導向可能產生不合適編碼，若讀檔失敗先檢查純文字編碼與內容，而不是立刻改 SVM 參數。\n\n**本頁重點：**-l 下限、-u 上限、-s 儲存、-r 還原縮放規則。"
  },
  {
    "page": 7,
    "title": "Training Procedure",
    "body": "講義依 LIBSVM Practical Guide 整理六步驟：把資料轉成 LIBSVM 格式、縮放、考慮 RBF kernel、用 Cross-Validation 找 C 與 γ、以最佳參數訓練完整訓練集，最後測試。\n\n順序是轉格式→縮放→考慮 RBF→交叉驗證找 C、γ→用最佳設定訓練全部訓練集→最後測試。**補充指令示意：**`svm-train.exe -v 5 -t 2 -c 32 -g 0.00125 train.scale` 評估這組設定的五折分數，還需比較其他候選參數。嚴格的外層泛化評估應在每折內估前處理規則，最終 Test 絕不能參與縮放或選參。\n\n**本頁重點：**先驗證與選參，最後才碰 Test Set。"
  },
  {
    "page": 8,
    "title": "Transform Data to LIBSVM Format",
    "body": "每行是一筆資料，格式為 label index1:value1 index2:value2 ...；label 是分類標籤，index 是從 1 開始的特徵編號。測試標籤若未知，可依程式需要放佔位數，但不能用佔位數計算有意義的準確率。\n\n分類標籤可為整數且支援多類。特徵索引從 1 開始並遞增；同一索引在所有資料列要代表同一欄。測試行首標籤用於計算評估結果，不會改變已訓練模型的預測；標籤未知時可填佔位數，但程式報出的 Accuracy 就沒有實際評估意義。\n\n**本頁重點：**每筆一行，特徵索引和值必須配對。"
  },
  {
    "page": 9,
    "title": "LIBSVM Training Data Example",
    "body": "表格示範不同類別標籤（0、1）的樣本與 1:85、2:92、3:45 等特徵欄位。標籤寫在一行開頭，每個 index:value 是一個數值特徵，並非「欄位名稱:值」。\n\n圖中第一筆 `0 1:85.000000 2:92.000000 3:45.000000 4:27.000000 5:31.000000` 的 class label 是 0，五個特徵值依序 85、92、45、27、31。`1:85` 的 1 是欄位編號，不是另一個類別標籤；每一行都必須保持這種結構。\n\n**本頁重點：**理解 0 1:85 2:92 代表 label=0、feature1=85、feature2=92。"
  },
  {
    "page": 10,
    "title": "Prediction Output Example",
    "body": "圖示列出 svm-predict 輸出的一連串 0、1，代表測試集各樣本的分類結果。這些是模型預測值；若要計算 Accuracy、Recall 等，仍需對照真實標籤。\n\n輸出圖顯示每行一個預測類別，需按原測試資料行序對應。若原資料經過排序或篩選，應保留樣本識別碼另作對照，不能把預測檔和不同順序的真實標籤直接比較。未開啟 `-b 1` 時，0／1 是分類結果，並不是 0%／100% 機率。\n\n**本頁重點：**輸出行序與輸入測試資料行序相對應。"
  },
  {
    "page": 11,
    "title": "Restore Scaling for Test Data",
    "body": "先在訓練集執行 svm-scale.exe -l 0 -u 1 -s scale.params train > train.scale，再用 svm-scale.exe -r scale.params test > test.scale。不能針對 Test 重新算最小值與最大值，否則測試資訊會滲入前處理。\n\n```text\nsvm-scale.exe -r scale.params test > test.scale\n```\n**自編例：**訓練特徵範圍 10–20，測試值 15 會變 0.5；測試值 25 可能變 1.5。超出 [0,1] 不表示必須重算測試最小最大值，而是測試值超出訓練範圍。要維持模型看到的尺度一致。\n\n**本頁重點：**Scaling 的擬合只能根據 Training Data；Test 僅套用。"
  },
  {
    "page": 12,
    "title": "Categorical Features: One-Hot",
    "body": "LIBSVM 接受數值特徵，所以 Color={red, blue, green} 可轉成三個指示欄位：red=[1,0,0]、blue=[0,1,0]、green=[0,0,1]。講義展示標籤與特徵編碼放在同一行的格式。\n\n```text\n1 1:1 2:0 3:0\n0 1:0 2:1 3:0\n1 1:0 2:0 3:1\n```\n三行依序是正類紅色、負類藍色、正類綠色。行首 1／0 與後面的顏色 one-hot 是不同概念；若直接把 red=1、blue=2、green=3 當連續量，會引入不存在的順序與距離。\n\n**本頁重點：**類別的數值代碼若沒有順序意義，不應直接當連續大小比較。"
  },
  {
    "page": 13,
    "title": "Optional Sparse LIBSVM Format",
    "body": "對 One-Hot 造成的高維稀疏特徵，可以省略值為 0 的欄位。範例 dense：1 1:0 2:0 3:1 4:0 5:0 6:3.5；sparse：1 3:1 6:3.5，兩者表示相同樣本。\n\n```text\n1 1:0 2:0 3:1 4:0 5:0 6:3.5\n1 3:1 6:3.5\n```\n兩行都代表正類、六維向量 [0,0,1,0,0,3.5]。省略的是零值，不是重新編號：第三維仍寫 `3:1`，第六維仍寫 `6:3.5`。稀疏表示可節省大量 one-hot 的儲存空間，同時保留原始欄位意義。\n\n**本頁重點：**Sparse 格式節省空間，索引要與完整特徵維度一致。"
  }
];
