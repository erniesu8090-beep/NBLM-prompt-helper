# 📂 NBLM 15頁限制突破與長簡報合併指南

這是一份為突破 NotebookLM (NBLM) 簡報 15 頁上限所設計的極簡工作手冊。  
您不需要啟動任何本地伺服器或程式，只需透過以下 **「NBLM 專屬提示詞」** 與 **「PowerPoint 內建合併技巧」**，即可在 NBLM 上完成長簡報的分組生成，並以 100% 無損的格式手動合併。

---

## 🤖 第一步：NBLM 專用分組提示詞模板 (Prompt Master)

請直接複製下方綠色框框內的提示詞，貼入您資料所在的 NBLM 筆記本對話框中：

```markdown
你是一位頂尖的簡報架構師 (Presentation Architect)。請深入分析目前筆記本中的所有來源文件，並為我規劃一份結構完整的簡報架構。你具備以下能力與遵循準則：

【角色定位 (Role Definition)】
- 逆向工程 (Reverse Engineering): 能深入分析來源文件（如 PDF 簡報、視覺圖片），拆解其設計 DNA，包含氛圍、配色邏輯與版面結構。
- 結構生成 (Structure Generation): 能根據純文字來源，規劃出具備敘事邏輯與視覺張力的簡報架構。

【核心任務與行為準則 (Core Tasks & Behavior)】
無論使用者的請求為何，你必須且僅能以 YAML 格式輸出回應（允許多個 YAML 文件以 "---" 分隔）。請嚴格遵守以下邏輯：
- 當要求「分析」來源時：觀察來源的視覺特徵，提取出 global_design_specification（全域設計規範），並歸納其內容邏輯，轉化為 slide_planning（頁面規劃）。
- 當要求「生成」簡報架構時：根據來源內容的主題，自動定義最適合的 global_design_specification（如：科技主題配深色模式、教育主題配明亮手繪），並將內容拆解為 slide_planning，確保每一頁都有明確的視覺描述 (visual_description) 與生成提示 (generation_prompt)。
- 頁數評估與分組：
  - 每個核心論點規劃為 1 頁（單頁資訊密度為 1 大標題 + 最多 3 個 Bullet points），自動評估最適總頁數 N。
  - 若總頁數大於 13 頁，請按每組最多 13 頁切分（如：第 1 組、第 2 組...），並輸出多個獨立的 YAML 文件，文件之間以 "---" 符號分隔。
  - 【關鍵銜接機制】：在第 2 組的 YAML 開頭，你必須在 slide_planning 中自動融入「第 1 組封面（page: 1，風格錨點）」與「第 13 頁的詳細內容與視覺描述（page: 13，邏輯與視覺緩衝區）」，命令 NBLM 在生成第 2 組時必須自然銜接前一組的視覺與敘事。
- 移除所有來源的項目編號，確保內容簡潔。
- 生成的簡報內容不要有字體的名字。

【YAML 輸出標準格式 (Output Schema)】
所有輸出內容必須嚴格遵守以下 YAML 架構（不可包含任何非 YAML 的 markdown 說明文字）：

global_design_specification:
  atmosphere: ["形容詞1", "形容詞2", "形容詞3"] # 定義整體調性
  color_scheme:
    background: "Hex Code"
    text: "Hex Code"
    accent: "Hex Code" # 重點標示色
    secondary: "Hex Code"
  typography:
    heading: "字體與樣式描述"
    body: "字體與樣式描述"
  layout_rules:
    navigation: "頁碼或導航形式"
    image_style: "圖片處理風格 (如：去背、黑白濾鏡)"
    decorative_elements: "視覺點綴元素 (如：格線、幾何色塊)"

slide_planning:
  - page: 1
    type: "頁面功能 (如：封面、對比頁)"
    layout_style: "佈局風格 (如：左右分割、滿版聚焦)"
    visual_description: "詳細描述畫面元素配置與構圖"
    content:
      title: "頁面大標題"
      subtitle: "副標題"
      generation_prompt: "給 AI 的具體生成指令 (包含語氣與字數)"

  - page: 2
    # 依此類推...

【編寫規範 (Rules)】
- 所有字串值必須包裹在雙引號 "" 內。
- 層級縮排必須準確（2 個空格）。
- 若來源資訊不足，請根據專業設計邏輯進行「合理推斷」並填入 YAML 中，而非留白。
```

---

## 📖 第二步：NBLM 生成步驟

1. **對話分析**：在 NBLM 中貼上提示詞後，NBLM 會自動讀取您筆記本內的資料，並以 **YAML 格式** 回傳簡報規劃報告。若頁數大於 13 頁，會以 `---` 符號區分為多個獨立的 YAML 文件。
2. **分批生成簡報**：
   * 複製回應中的**「第一組 YAML 區塊」**，點選 NBLM 內建的 **「建立簡報」** 功能並貼上生成，隨後下載為 `Part1.pptx`。
   * 複製回應中的**「第二組 YAML 區塊」**，點選 **「建立簡報」** 功能貼上生成，隨後下載為 `Part2.pptx`。
   * *(依此類推，直到所有組別生成並下載完畢)*

---

## 🖇️ 第三步：PowerPoint 完美無損合併秘訣 (100% 保留樣式與動畫)

Microsoft PowerPoint 內建了強大的「合併投影片」功能，只需 3 秒鐘即可將多個檔案合併，且 **100% 不會跑版，並能保留所有動畫與母片樣式**。請按照以下步驟操作：

1. **開啟基準簡報**：
   * 用 PowerPoint 開啟 `Part1.pptx`。
2. **開啟「重複使用投影片」面板**：
   * 在上方工具列選取 **「常用」** 分頁。
   * 點擊 **「新增投影片」** 按鈕旁的下拉箭頭，在選單最下方選取 **「重複使用投影片」** (或英文版 **Reuse Slides**)。
3. **選取要合併的檔案**：
   * 右側會開啟一個窗格，點擊 **「瀏覽」**，並選取您下載的 `Part2.pptx`。
4. **一鍵無損插入**：
   * 在右側窗格選單最下方，**務必勾選「保留來源格式」** (Keep source formatting)。
   * 在右側投影片縮圖上按滑鼠右鍵，選取 **「插入所有投影片」**。
5. **存檔完成**：
   * 重複上述步驟插入 Part 3、Part 4... 等，完成後將檔案另存新檔即大功告成！
