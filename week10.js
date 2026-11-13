// Week 10: four course scopes. These are topic-level outlines, not lecture PDF transcriptions.
const week10Modules=[
 {title:"DM_week10｜第十週課程",file:"DM_week10",content:`### 第十週課程範圍
**講義：** DM_week10

本區已加入 Week 10，作為第十週主講義的入口。**原始講義 PDF 已附在本章的開啟連結**；目前的文字是課程範圍概覽，未冒充原始投影片逐頁講解。

**複習銜接：** 可以先回顧 Week 9 的分類模型、SVM 與集成學習；實際課程章節仍以 DM_week10 講義為準。`},
 {title:"DM_week10_libsvm｜LIBSVM",file:"DM_week10_libsvm",content:`### LIBSVM（Support Vector Machine 工具）
**講義：** DM_week10_libsvm（完整 PDF 可從本章連結開啟）

LIBSVM 是實作支援向量機（Support Vector Machine, SVM）的工具。以下是主題導讀，不是講義逐頁講解。

- **資料格式**：常見 LIBSVM 稀疏格式為「標籤 index:value ...」。
- **分類與迴歸**：可進行 SVM 分類、支援向量迴歸（SVR）等任務。
- **參數**：C 是懲罰參數；採用 RBF 核時，gamma 控制核函數尺度。
- **前處理與驗證**：特徵縮放、訓練與測試資料分離、交叉驗證是重要步驟。
- **評估**：視資料與任務選用準確率、Precision、Recall、F1 等指標。

**逐頁整理待補：** 原始指令、實驗範例及投影片頁碼。`},
 {title:"DM_recommendation｜推薦系統",file:"DM_recommendation",content:`### 推薦系統（Recommendation Systems）
**講義：** DM_recommendation（完整 PDF 可從本章連結開啟）

推薦系統根據使用者、項目與互動資訊，對候選項目進行評分或排序。以下為通用觀念導讀。

- **協同過濾（Collaborative Filtering）**：利用使用者與項目的互動或相似性推薦。
- **內容式推薦（Content-based Filtering）**：根據項目特徵與使用者偏好推薦。
- **矩陣分解（Matrix Factorization）**：以潛在因子表達使用者及項目。
- **冷啟動（Cold Start）**：新使用者或新項目缺乏互動資料時較難產生可靠推薦。
- **評估**：可使用 Precision@K、Recall@K、NDCG 等排序指標。

**逐頁整理待補：** 講義指定公式、案例、演算法與原始頁碼。`},
 {title:"DM_social_network｜社群網路分析",file:"DM_social_network",content:`### 社群網路分析（Social Network Analysis）
**講義：** DM_social_network（完整 PDF 可從本章連結開啟）

社群網路通常使用圖（Graph）表示：節點代表人或實體，邊代表它們的連結。以下為通用觀念導讀。

- **節點與邊（Node / Edge）**：有向、無向、加權與非加權關係。
- **度中心性（Degree Centrality）**：反映節點的直接連結數量。
- **中介中心性（Betweenness Centrality）**：衡量節點出現在其他節點最短路徑上的程度。
- **PageRank**：利用連結結構估計節點的重要性。
- **社群偵測（Community Detection）**：找出連結較緊密的群體。
- **連結預測（Link Prediction）**：從網路結構估計可能新增的連結。

**逐頁整理待補：** 課堂指定圖例、計算題、演算法與原始頁碼。`}
];
