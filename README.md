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
