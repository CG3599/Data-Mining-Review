# Data-Mining-Review

繁體中文資料探勘課程複習網站。

- 網站：https://cg3599.github.io/Data-Mining-Review/
- Week 10：https://cg3599.github.io/Data-Mining-Review/#week-10

## Week 10 教材對照

|課程區塊|原始教材|PDF 頁數|
|---|---|---:|
|分類實務與模型評估|[DM_week10.pdf](lectures/DM_week10.pdf)|50|
|LIBSVM 操作與驗證|[DM_week10_libsvm.pdf](lectures/DM_week10_libsvm.pdf)|13|
|推薦系統|[DM_recommendation.pdf](lectures/DM_recommendation.pdf)|73|
|社群網路探勘|[DM_social_network.pdf](lectures/DM_social_network.pdf)|71|

共 207 頁，每頁包含繁體中文講解、原檔頁碼連結、可展開原圖及獨立筆記。公式、圖表推演與例題依教材整理；補充計算、教材疑義與自編例子於文內標示。分類講義 PDF 第 21–50 頁的頁腳標號為 22–51，網站使用實際 PDF 頁序。

四份教材 SHA-256 與頁數見 `week10-sources.json`。逐頁資料位於 `week10-classification.js`、`week10-libsvm.js`、`week10-recommendation.js`、`week10-social.js`；`week10.js` 組合四個課程區塊，`week10-view.js` 提供講義範圍內的頁碼跳轉與呈現。舊週次內容及儲存鍵保留。

單頁連結格式：`#week-10/m-DM_recommendation/p44`。章節舊連結 `#week-10/p1` 到 `p4` 繼續可用。

## 本機預覽與驗證

此站為靜態網站，不需要編譯。以任意靜態 HTTP server 提供倉庫根目錄即可。以 Node.js 執行 `node checks/week10-data.cjs` 可驗證 207 頁連續性、來源雜湊、原圖存在與公式語法。

瀏覽器驗證涵蓋四區塊、頁碼跳轉、單頁直達、個人筆記及已讀狀態重新載入保存、手機版面、207 張原圖，以及原有 Week 1、2、4、6、7、9 的章節閱讀與頁碼跳轉。

## Week 10 輔助圖解

新增 18 張 SVG 教學圖表與 1 個互動 ROC 示範，位於對應頁面講解旁，並提供圖解索引。圖表清楚區分教材數據重繪與自編示意；原有 207 頁文字不變。資料與呈現位於 `week10-figures.js`，圖檔位於 `figures/week10-examples/`。執行 `node checks/week10-figures.cjs` 可驗證圖檔與 ROC 計數。

## Week 1–9 補充圖解

現有教材週次各新增 5 張 SVG，共 30 張；另於 Week 2 P.52、Week 9 P.12 加入變異數與 k-NN 互動示例。原有課程文字、PDF、筆記與進度儲存不變。Week 3、5、8 無現有教材，未新增課程內容。

|週次|補充圖解頁數|
|---|---|
|Week 1|23、28、49、52、64|
|Week 2|28、33、52、60、71|
|Week 4|10、27、36、42、47|
|Week 6|11、23、26、45、55|
|Week 7|38、39、45、59、63|
|Week 9|12、36、41、49、65|

每週「圖解複習」下方提供補充圖解索引；單頁連結如 `#week-9/slide-12` 可直接開啟對應章節。圖檔位於 `figures/course-examples/`，呈現與互動位於 `course-figures.js`。執行 `node checks/course-figures.cjs` 驗證圖檔、週次數量及互動計算。
