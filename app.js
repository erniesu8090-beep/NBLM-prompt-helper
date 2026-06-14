/* ==========================================================================
   CAST. v2 PROMPT CONSOLE - CORE LOGIC ENGINE
   ========================================================================== */

// Global Mapping for Tag-to-Preset connection
const TAG_PRESET_MAP = {
  "化工製程": "chemical_process",
  "腐蝕機制": "corrosion_mechanism",
  "儀器原理": "instrument_principle",
  "轉動設備": "rotating_equipment",
  "安全排查": "industrial_safety",
  "技術規格": "tech_doc",
  "員工SOP": "sop_training",
  "資安宣導": "security"
};

// Preset Templates Database (Specifically curated for industrial, chemistry and corporate training)
const PRESETS = {
  chemical_process: {
    topic: "化工製程精餾系統的操作優化與產能提升方案",
    audience: "專業人士",
    rhythm: "先高後穩",
    hostA: {
      name: "林工 (製程工程師)",
      gender: "男性",
      stance: "推廣單元操作的科學原理與熱力學平衡，強調提高回流比對純度的理論價值",
      style: "專業嚴謹、善用物理比喻、重邏輯與公式直覺",
      specialty: "化工製程模擬、精餾塔設計、質量與能量平衡",
      habit: "常以「氣液相平衡 (VLE) 曲線」與「理論板數」來論證，喜歡解釋閥門開度與製程穩定的物理本質。"
    },
    hostB: {
      name: "強哥 (現場操作員)",
      gender: "男性",
      stance: "代表現場生產執行，關注閥門磨損、DCS 反饋延遲與實際操作的安全性與穩定性",
      style: "務實接地氣、憑數十年經驗說話、語調沉穩直白",
      specialty: "精餾塔現場調試、DCS 自動控制操作、緊急製程排查",
      habit: "常問「如果塔底再沸器結垢，這個理論回流比還能維持純度嗎？」或「這樣調閥門會不會增加現場液位暴漲的風險？」"
    },
    interaction: "化工製程理論工程師與現場資深控制員的實戰對話，將複雜的化工熱力學理論轉譯為現場運行的實際操作經驗"
  },
  corrosion_mechanism: {
    topic: "換熱器管束應力腐蝕破裂 (SCC) 失效機制與防護對策",
    audience: "專業人士",
    rhythm: "漸強式",
    hostA: {
      name: "陳博士 (材料專家)",
      gender: "女性",
      stance: "剖析金屬微觀晶界、拉伸應力與特定腐蝕介質交互作用下的脆性斷裂機制",
      style: "學學術嚴謹、講解細緻、重視微觀金相特徵",
      specialty: "金屬腐蝕學、失效分析、電化學防護",
      habit: "喜歡討論「陽極溶解」與「氫致開裂」的微觀化學反應，常用「從斷口掃描電鏡 (SEM) 的河流花樣來看...」開場。"
    },
    hostB: {
      name: "老張 (現場巡檢員)",
      gender: "男性",
      stance: "關注宏觀的腐蝕徵兆、檢測手段 (NDT) 執行難度與設備安全更換週期",
      style: "實務經驗極為豐富、口吻通俗、直擊檢測痛點",
      specialty: "非破壞性檢測 (NDT)、設備腐蝕等級評估、大修檢測",
      habit: "常用「管壁減薄率」或「裂紋超音波檢測波形」發問，追問「我們在現場敲擊巡檢時，用什麼方法能最快預警這種微小微觀裂紋？」"
    },
    interaction: "微觀材料腐蝕科學與現場設備宏觀巡檢實務的對談，深入淺出將微觀失效機理解碼為宏觀維護指南"
  },
  instrument_principle: {
    topic: "氣相層析質譜儀 (GC-MS) 混合物定性與定量分析運作原理",
    audience: "一般大眾",
    rhythm: "W型起伏",
    hostA: {
      name: "林工程師 (儀器專家)",
      gender: "女性",
      stance: "深入解說層析柱分離、電子撞擊離子源 (EI) 與四極柱質譜儀篩選離子的核心物理原理",
      style: "科普白話、擅長趣味比喻、對精密硬體結構暸若指掌",
      specialty: "分析化學硬體設計、質譜解析學、層析管柱技術",
      habit: "擅長將「分配係數」比喻為賽跑，將「質譜圖碎片」比喻為打碎花瓶拼圖，常說「想像樣品分子在色譜柱裡像賽跑一樣跑出來...」"
    },
    hostB: {
      name: "小戴 (分析實驗員)",
      gender: "男性",
      stance: "關注日常校正、儀器保養污染、基質干擾與標準曲線定量準確度",
      style: "求真務實、語調輕快、喜好提問實操細節",
      specialty: "日常化學分析、樣品前處理、層析質譜圖譜解讀",
      habit: "常問「如果遇到背景噪聲太高，如何判斷是毛細管柱柱流失還是載氣純度不夠？」或「前處理怎麼做才能防止進樣口氣化室碳化？」"
    },
    interaction: "精密儀器研發專家與一線實驗室分析人員的實戰交流，將硬梆梆的儀器原理手冊轉譯為富有趣味與可操作性的分析實務"
  },
  rotating_equipment: {
    topic: "離心泵機械軸封洩漏原因分析與 API 沖洗方案選用指南說明",
    audience: "專業人士",
    rhythm: "W型起伏",
    hostA: {
      name: "溫工 (設備工程師)",
      gender: "男性",
      stance: "解說機械密封的摩擦副端面比壓、動靜環配合公差以及 API 沖洗系統的熱傳與屏障原理",
      style: "科學嚴謹、熱衷於畫剖面結構圖說明、講求公差標準規格",
      specialty: "流體密封工程、離心泵機械設計、API 682 標準規範",
      habit: "常以「動靜環端面間隙僅有微米級」與「高壓屏障循環」說明，喜歡把 API 沖洗方案（如 Plan 53A/B/C）比喻成水冷系統。"
    },
    hostB: {
      name: "老鐵 (檢修班長)",
      gender: "男性",
      stance: "關注現場實際安裝對中偏差、動靜環密封面崩角、彈簧疲勞以及拆裝手感細節",
      style: "直爽大氣、實戰經驗豐富、用語接地氣且切中裝配痛點",
      specialty: "離心泵檢修、機械密封解體拆檢與現場更換、聯軸器雷射對中",
      habit: "常提「現場軸向竄動過大會導致彈簧失效」或「輔助 O 型環在軸套上滑動時容易被刮傷」等實作痛點，逼問具體防範手段。"
    },
    interaction: "辦公室技術規格設計工程師與現場檢修老手的經驗交鋒，理論規格與實際安裝手藝的雙向交流"
  },
  industrial_safety: {
    topic: "化工廠製程管線異常洩漏事故檢討與應急停爐安全操作處置",
    audience: "主管與決策者",
    rhythm: "雲霄飛車",
    hostA: {
      name: "周工 (安環主任)",
      gender: "男性",
      stance: "運用 RCA 根源原因分析事故誘因，宣導製程安全連鎖防護 (PSM) 與法規合規性的絕對必要性",
      style: "嚴肅警醒、條理分明、非常注重程序規範與流程防錯",
      specialty: "製程安全管理 (PSM)、根源原因分析 (RCA)、安全儀表系統 (SIS)",
      habit: "強調防呆設計與 SIS/ESD 緊急連鎖，常用「安全是設計出來的，不是撞運氣撞出來的」來提醒合規操作的重要性。"
    },
    hostB: {
      name: "彪哥 (現場值班長)",
      gender: "男性",
      stance: "反映緊急危機狀況下現場視線模糊、毒性警報狂響與時間壓力下的手動處置決策兩難",
      style: "沉著果斷、有現場實戰氣勢、富有現場緊迫感",
      specialty: "化工工廠緊急停機操作、有毒化學品洩漏防護處置、現場緊急動員指揮",
      habit: "喜歡分享真實搶修案例（如手動手輪關閉有毒氣體閥門），常反問「如果那時中控連鎖失效，現場斷電，我們該如何最快應變？」"
    },
    interaction: "安環部門的事故根本原因與流程檢討，對比現場應變指揮官在生死交關時的一線操作心聲，既深刻又具有教育警醒作用"
  },
  tech_doc: {
    topic: "公司新版系統架構設計與程式碼規範指南說明",
    audience: "專業人士",
    rhythm: "漸強式",
    hostA: {
      name: "阿建 (架構師)",
      gender: "男性",
      stance: "宣導並推廣新技術標準，強調統一規範對系統效能與長期維護的重大價值",
      style: "專業嚴謹、耐心沉穩、著重代碼邏輯與工程細節",
      specialty: "系統架構、程式碼重構、效能瓶頸分析",
      habit: "常以「這能避免未來的技術債」或「根據官方 RFC 的規定」為論證，喜歡解釋優雅的程式設計美學。"
    },
    hostB: {
      name: "小新 (工程師)",
      gender: "女性",
      stance: "代表執行層，關注開發效率、學習曲線、日常操作痛點與過往項目相容性",
      style: "求知慾強、實事求是、口吻直白且敢於質疑不合理規定",
      specialty: "一線業務開發、框架底層應用與除錯",
      habit: "每段都會問「這會不會增加平時寫扣的時間？」或「遇到舊系統要搬移時，有沒有具體的 Before/After 對比？」"
    },
    interaction: "資深架構師與一線開發工程師的實務對話，宛如師徒制的指導，解惑技術盲點並強調實務操作流程"
  },
  sop_training: {
    topic: "新版客戶服務流程與緊急客訴處理 SOP 宣導",
    audience: "一般大眾",
    rhythm: "W型起伏",
    hostA: {
      name: "張經理 (培訓主管)",
      gender: "女性",
      stance: "推廣新版 SOP 的核心步驟，強調如何透過標準流程提升客戶滿意度與公司品牌形象",
      style: "幹練親切、條理清晰、擅長以情境案例引導學員",
      specialty: "客戶關係管理 (CRM)、第一線人員情緒管理與培訓",
      habit: "喜歡用「當客戶遇到...狀況時，我們的標準話術是...」的情境演練引導，提供立即可用的公式。"
    },
    hostB: {
      name: "阿強 (客服專員)",
      gender: "男性",
      stance: "代表第一線，提出實務上面對極端客訴時的應變壓力、時間限制與執行盲點",
      style: "反應敏捷、帶點自嘲的幽默、務實且講求效率",
      specialty: "一線客訴化解、危機溝通",
      habit: "常問「如果遇到故意刁難的客人，我們這個 SOP 真的頂得住嗎？」或「這樣照著唸會不會讓客戶覺得很敷衍？」"
    },
    interaction: "培訓主管與資深一線員工的雙向交流，透過情境模擬與常見的「Edge Cases」問答，加深員工對 SOP 記憶點"
  },
  security: {
    topic: "年度資訊安全防護與員工社交工程防範指南宣導",
    audience: "一般大眾",
    rhythm: "W型起伏",
    hostA: {
      name: "安迪 (資安官)",
      gender: "男性",
      stance: "積極宣導資安防範意識，強調日常小動作對維護公司資料安全的重要性",
      style: "專業風趣、善用生活科普比喻、警醒生動",
      specialty: "資訊安全攻防、社交工程演練、安全政策規劃",
      habit: "習慣以「真實發生過的網路釣魚信件」案例開場，給予員工實用且簡單的查驗步驟建議。"
    },
    hostB: {
      name: "小明 (業務專員)",
      gender: "男性",
      stance: "代表普通忙碌員工，反映出對繁瑣資安規定的無奈以及因工作忙碌容易產生的漏洞",
      style: "直率接地氣、講求效率、帶有部分打工人吐槽口氣",
      specialty: "日常業務處理、信件日常操作",
      habit: "常說「但我們每天收幾百封信，真的有時間一封封查網域嗎？」或「密碼設太複雜我真的會忘記...」"
    },
    interaction: "資深資安專家與普通忙碌員工的趣味日常對答，以輕鬆幽默的方式解鎖資安盲點"
  },
  accident_corrosion: {
    topic: "精餾塔底重沸器管束應力腐蝕破裂與有毒高溫介質洩漏事故",
    audience: "專業人士",
    rhythm: "漸強式",
    hostA: {
      name: "陳主管 (調查主管)",
      gender: "女性",
      stance: "法規合規性、技術規格、材料力學與裂紋擴展機制",
      style: "嚴謹專業、以客觀科學角度說明",
      specialty: "材料失效分析與安環監管",
      habit: "以法規條款與科學實驗數據開場，要求系統化合規。"
    },
    hostB: {
      name: "強哥 (現場巡檢)",
      gender: "男性",
      stance: "現場巡檢操作、異常第一時間感知（聽到高壓嘶嘶聲與看見白色煙霧）、應急處置",
      style: "務實接地氣、用語白話、強調現場經驗與實際操作限制",
      specialty: "現場巡檢與應急處置",
      habit: "常用現場操作語彙，如「帶壓堵漏」、「大修盲板」，直擊現場實際工作難點。"
    },
    interaction: "專業安環主管與現場一線操作人員的深度事故原因解析與答辯",
    accident: {
      framework: "RCA 根源原因分析",
      target: "專業事故調查報告"
    }
  },
  accident_seal: {
    topic: "運轉中原料泵浦機械軸封失效致高溫烴類洩漏起火事故",
    audience: "一般大眾",
    rhythm: "W型起伏",
    hostA: {
      name: "張總監 (安環主管)",
      gender: "男性",
      stance: "多重安全防禦障壁分析（設計缺陷、維護缺失、警報失靈、操作超期）",
      style: "嚴肅警醒、條理清晰、強調系統防範與層層防禦",
      specialty: "製程安全管理 (PSM) 與屏障分析",
      habit: "善用「瑞士乳酪理論」的孔洞比喻，強調每一道屏障的價值。"
    },
    hostB: {
      name: "大勇 (現場操作員)",
      gender: "男性",
      stance: "現場火災搶險、手動關閉隔離閥、空氣呼吸器使用與引導消防隊",
      style: "親歷者視角、帶有緊張感、白話敘述現場混亂與防護應變",
      specialty: "現場消防與應急處置",
      habit: "口吻生動緊張，描述黑煙、警報狂響，強調日常演練與應變反應。"
    },
    interaction: "安全管理總監與火災事故親歷操作員的對談，探討多重防線失效與應急處置",
    accident: {
      framework: "Swiss Cheese 瑞士乳酪理論",
      target: "員工安全培訓教材"
    }
  },
  accident_dcs: {
    topic: "DCS 控制器卡件死機致反應器超壓安全閥起跳洩壓事故",
    audience: "專業人士",
    rhythm: "雲霄飛車",
    hostA: {
      name: "溫工 (自控工程師)",
      gender: "男性",
      stance: "DCS 冗餘卡件切換機制、SIS 獨立安全防護層設計、聯鎖邏輯漏洞分析",
      style: "邏輯極強、以自控硬體與程式碼機制為主，注重本質安全",
      specialty: "工業自動化與儀表控制",
      habit: "常用「冗餘失效」、「邏輯卡死」、「SIS起跳點」論證自控安全機制。"
    },
    hostB: {
      name: "阿明 (中控室操作)",
      gender: "男性",
      stance: "操作介面 (HMI) 報警狂響、參數凍結異常、手動觸發 ESD 緊急停機過程",
      style: "緊迫、關注操作畫面失能時的慌亂應變與手動確認機制",
      specialty: "DCS 中控室操作",
      habit: "描述中控室「報警器滿屏紅字」、「滑鼠點擊無效」的當下慌亂，說明手動停機決策。"
    },
    interaction: "自控工程師與中控室操作員的技術交流，解剖軟硬體失效與人機介面安全",
    accident: {
      framework: "5 Whys 連續發問分析",
      target: "應急與SOP修訂建議"
    }
  },
  bazi: {
    topic: "2026 丙午年八字運勢解析：歲運併臨真的必有災殃嗎？",
    audience: "一般大眾",
    rhythm: "W型起伏",
    hostA: {
      name: "玄大師",
      gender: "男性",
      stance: "正統命理角度，依據天干地支與陰陽五行消長，解析運勢的起伏與劫數",
      style: "玄妙神秘、慈祥沉穩、用字文雅但通俗",
      specialty: "子平八字、紫微斗數、五行相生相剋",
      habit: "善用「天干丙火、地支午火」等術語，但會迅速轉譯成生活比喻（如烈火烤金），強調改運避凶之法。"
    },
    hostB: {
      name: "柯學家",
      gender: "女性",
      stance: "理性懷疑派，認為命理是一種心理安撫，傾向用社會學與巴納姆效應解釋",
      style: "理性實證、條理分析、帶著善意懷疑的幽默",
      specialty: "社會統計學、認知心理學",
      habit: "常問「這會不會是倖存者偏差？」或「這在現代統計數據上能得到證實嗎？」，並點出人性的期望效應。"
    },
    interaction: "命理傳統與現代科學認知的趣味碰撞，彼此探討不流於迷信或流於無情說教"
  },
  stock: {
    topic: "台股與美股半導體板塊深度解盤與未來風控配置策略",
    audience: "一般大眾",
    rhythm: "W型起伏",
    hostA: {
      name: "益師傅",
      gender: "男性",
      stance: "極度看好先進製程與 AI 帶來的半導體產業爆發潮",
      style: "熱情積極、數據導向、擅長化繁為簡",
      specialty: "半導體產業趨勢、技術分析（先進製程與 CoWoS 封裝）",
      habit: "常以關鍵出貨數據做正面解讀，習慣用「這是未來五年的黃金賽道」來鼓舞市場。"
    },
    hostB: {
      name: "小麗",
      gender: "女性",
      stance: "持保留觀望態度，強調地緣政治風險與成熟製程過剩問題",
      style: "謹慎冷靜、語氣犀利、重視地緣政治影響與產能利用率",
      specialty: "全球供應鏈宏觀分析、外資法人籌碼分析",
      habit: "每段對話至少追問 2 次「那麼成熟製程的價格戰怎麼解？」或「這真的能撐起如此高的估值嗎？」"
    },
    interaction: "專業半導體產業分析師與宏觀風控專家的實力交鋒，數據交織，既有高度專業性又有觀點衝突"
  },
  career: {
    topic: "AI 浪潮襲來，文科生如何進行跨界職涯轉型與技能重塑",
    audience: "一般大眾",
    rhythm: "W型起伏",
    hostA: {
      name: "阿建 (架構師)",
      gender: "男性",
      stance: "積極推廣工程化思維，相信 AI 工具能為文科生賦能，消除技術藩籬",
      style: "耐心指導、循循善誘、擅長給出具體行動建議",
      specialty: "系統架構、程式重構、職涯導師",
      habit: "常說「這在以前很難，但現在有 AI 可以直接幫你寫出第一版」，引導文科生運用自身邏輯與文字優勢。"
    },
    hostB: {
      name: "小新 (工程師)",
      gender: "女性",
      stance: "身為成功轉型的文科生，強調轉型過程的學習陣痛、學習曲線、日常操作痛點與實務心態建立",
      style: "求實坦率、自嘲幽默、切中痛點",
      specialty: "一線業務開發、轉型心路歷程",
      habit: "每段都會提醒「但初學者一開始看到終端機報錯真的會崩潰！」或「最難的不是寫扣，而是搞懂開發環境配置。」"
    },
    interaction: "資深架構師與過來人文科生程式員的對話，兼具技術高度與情感共鳴，給予文科生實用的轉型指南"
  }
};

// Rhythm details helper for prompt injection
const RHYTHM_DETAILS = {
  "W型起伏": {
    name: "W型起伏節奏曲線",
    description: "對話節奏具多次高低起伏與轉折。開場熱烈，中段在探討難點時稍微沉寂，隨後在解決問題與實用建議時攀上另一個高峰，結尾溫和有力，最能吸引聽眾注意力。"
  },
  "漸強式": {
    name: "漸強式節奏曲線",
    description: "論點由淺入深，主持人的語氣與交鋒張力漸漸加強。從前期的基礎現況報告，一步步挖掘出底層的關鍵痛點，並在後半段的深度討論中達到高熱度觀點碰撞。"
  },
  "先高後穩": {
    name: "先高後穩節奏曲線",
    description: "在節目的第一分鐘以驚人數據或衝突性論點引爆，迅速鎖定聽眾，隨後雙方切換至冷靜、條理的理性解析與行動步驟，適合科普解讀或商務決策。"
  },
  "雲霄飛車": {
    name: "雲霄飛車節奏曲線",
    description: "節奏變幻莫測，全程有多個「反轉與追問」。CH-A 每拋出一個樂觀數據，CH-B 隨即以犀利觀點質疑，雙方快速拋接球、多次交鋒，適合立場分明的辯論型節目。"
  }
};

// Select DOM Elements
const topicInput = document.getElementById("topic-input");
const tagPills = document.querySelectorAll("#audio-overview-workspace .tag-pill");
const copyBtn = document.getElementById("copy-btn");
const promptOutput = document.getElementById("prompt-output");
const presetButtons = document.querySelectorAll("#audio-overview-workspace .preset-btn");

// Host A inputs
const hostAName = document.getElementById("hostA-name");
const hostAGender = document.getElementById("hostA-gender");
const hostAStance = document.getElementById("hostA-stance");
const hostAStyle = document.getElementById("hostA-style");
const hostASpecialty = document.getElementById("hostA-specialty");
const hostAHabit = document.getElementById("hostA-habit");

// Host B inputs
const hostBName = document.getElementById("hostB-name");
const hostBGender = document.getElementById("hostB-gender");
const hostBStance = document.getElementById("hostB-stance");
const hostBStyle = document.getElementById("hostB-style");
const hostBSpecialty = document.getElementById("hostB-specialty");
const hostBHabit = document.getElementById("hostB-habit");

const interactionStyle = document.getElementById("interaction-style");

// Get radio selection value helper
function getRadioValue(name) {
  const elements = document.getElementsByName(name);
  for (let el of elements) {
    if (el.checked) return el.value;
  }
  return "";
}

// Set radio selection helper
function setRadioValue(name, value) {
  const elements = document.getElementsByName(name);
  for (let el of elements) {
    if (el.value === value) {
      el.checked = true;
      // Trigger change event to styles if needed
      el.dispatchEvent(new Event('change'));
      break;
    }
  }
}

// Generate the prompt based on UI state
function updatePrompt() {
  const topic = topicInput.value.trim() || "未設定主題";
  const audience = getRadioValue("audience");
  const rhythmName = getRadioValue("rhythm");
  const rhythm = RHYTHM_DETAILS[rhythmName] || { name: rhythmName, description: "" };

  const accFrameworkSelect = document.getElementById("accident-framework");
  const accTargetSelect = document.getElementById("accident-target");
  const accFramework = accFrameworkSelect ? accFrameworkSelect.value : "無";
  const accTarget = accTargetSelect ? accTargetSelect.value : "無";

  const data = {
    topic: topic,
    audience: audience,
    rhythm: rhythm,
    hostA: {
      name: hostAName.value.trim() || "主持人 A",
      gender: hostAGender.value,
      stance: hostAStance.value.trim() || "積極正面立場",
      style: hostAStyle.value.trim() || "流暢、生動",
      specialty: hostASpecialty.value.trim() || "未設定",
      habit: hostAHabit.value.trim() || "無特別習慣"
    },
    hostB: {
      name: hostBName.value.trim() || "主持人 B",
      gender: hostBGender.value,
      stance: hostBStance.value.trim() || "保留或批判立場",
      style: hostBStyle.value.trim() || "冷靜、理智",
      specialty: hostBSpecialty.value.trim() || "未設定",
      habit: hostBHabit.value.trim() || "無特別習慣"
    },
    interaction: interactionStyle.value.trim() || "輕鬆對談",
  };

  let finalPrompt = "";

  if (accFramework !== "無") {
    finalPrompt = `你是一位資深的工業安全與事故調查專家。請針對我上傳的事故報告與製程資料進行深度解析，以「${accFramework}」為核心思維，為我規劃並輸出適合「${accTarget}」的雙通道語音對談解說腳本。
━━━━━━━ 🚨 CAST. v2 ACCIDENT DEBRIEF CONSOLE 🚨 ━━━━━━━

【一、事故基本資訊】
- 事故主體：${data.topic}
- 目標聽眾：${data.audience} (對應調整討論深度與語意難易度)
- 安全分析框架：${accFramework}
- 解說目標導向：${accTarget}

【二、雙通道解說人設】
■ 角色 A (引導人 - 主持人 ${data.hostA.name} / ${data.hostA.gender})
- 立場態度/專長：${data.hostA.stance} (專長: ${data.hostA.specialty})
- 語氣與發言習慣：${data.hostA.style} (發言習慣: ${data.hostA.habit})

■ 角色 B (現場執行者/回應者 - 主持人 ${data.hostB.name} / ${data.hostB.gender})
- 立場態度/專長：${data.hostB.stance} (專長: ${data.hostB.specialty})
- 語氣與發言習慣：${data.hostB.style} (發言習慣: ${data.hostB.habit})

【三、解說結構與要求】 (請依據以下順序與結構生成五段式對談腳本)
1. 第一段【時序重建 (Timeline)】：由 ${data.hostB.name} 描述事故發生前一刻現場的一線狀態（包含聽覺、視覺等感知特徵），${data.hostA.name} 隨後從系統、製程層次梳理正式的事故時間軸。
2. 第二段【根本原因剖析 (Framework Analysis)】：雙方深度套用「${accFramework}」進行剖析。
   - 由 ${data.hostA.name} 逐步解碼底層技術原理與防禦失效漏洞。
   - 由 ${data.hostB.name} 結合現場實際安裝對中、大修檢測、或習慣性違章等實操面進行答辯，將學術化道理轉譯為一線經驗。
3. 第三段【應急處置評估 (Emergency Response)】：聚焦討論事故當下人員的應變決策（如手動閥門隔離難度、穿戴防護裝備的局限性、應急自控 SIS 起跳等）。
4. 第四段【糾正與預防措施 (CAPA)】：針對「${accTarget}」導向，雙方討論並提出 3-4 項具體可行、包含防呆設計（Poka-Yoke）的預防措施與 SOP 優化對策。
5. 第五段【安全警醒與結語】：兩位角色作金句總結，${data.hostA.name} 給予系統性安環警告，${data.hostB.name} 給予第一線員工安全自護的警示。

【四、內容規則】
- 必須嚴格引用上傳製程文件中的工藝參數（如溫度、壓力、流量）、閥門編號、金屬材質，不可憑空捏造。
- 對話方式應維持雙向互動，角色 A 不要單向說教，角色 B 應隨時提出現場的現實限制與回饋。
- 維持對談調性：${data.interaction}。`;
  } else {
    finalPrompt = `你是一位專業的 Podcast 腳編劇，擅長將資料文件轉化為生動的雙人對談語音摘要。請根據以下設定，閱讀我上傳的資料，並生成一份完整的語音摘要對話腳本。
━━━━━━━ CAST. v2 PROMPT CONSOLE ━━━━━━━

【一、分析主題】
主題名稱：${data.topic}

【二、目標聽眾】
聽眾類型：${data.audience}
（對應調整：調整討論深度與專業術語的密度，聚焦此聽眾最關心的層面）

【三、情緒節奏曲線】
節奏模式：${data.rhythm.name}
（執行指引：${data.rhythm.description}）

【四、主持人設定】
■ 主持人 A (正方通道 CH-A)
- 姓名：${data.hostA.name} (${data.hostA.gender})
- 立場態度：${data.hostA.stance}
- 語氣風格：${data.hostA.style}
- 專長定位：${data.hostA.specialty}
- 發言習慣與句型：${data.hostA.habit}

■ 主持人 B (反方通道 CH-B)
- 姓名：${data.hostB.name} (${data.hostB.gender})
- 立場態度：${data.hostB.stance}
- 語氣風格：${data.hostB.style}
- 專長定位：${data.hostB.specialty}
- 發言習慣與句型：${data.hostB.habit}

■ 主持人互動對談調性
- 雙方維持 ${data.interaction}。語氣自然、說話不要像在唸稿、字句流暢。觀點雖有交鋒但彼此尊重，像好朋友聊天一樣。主持人 B 應適時扮演追問與風險防範的角色，不要一味附和。

【五、節目設定】
- 節目長度與引導：開場時，兩位主持人需先進行簡短的自我介紹（包含姓名、專長領域與今天討論的主題「${data.topic}」）。

【六、節目結構】 (請依據以下順序生成腳本)
1. 第一段【開場破題】：由 ${data.hostA.name} 用一個來自上傳資料的驚人數據或衝突性觀點破題，${data.hostB.name} 立即接話，引出今日核心主題。
2. 第二段【現況解析】：從上傳資料萃取 2-3 個核心數據或關鍵事實。${data.hostA.name} 解讀正面面向，${data.hostB.name} 至少追問 2 次，${data.hostA.name} 逐一回應。
3. 第三段【深度討論】(情緒高峰)：針對資料中具爭議或最核心的議題正面交鋒，雙方提出具體案例與數據佐證立場。
4. 第四段【實用建議】：${data.hostA.name} 提供 2-3 個「可立即行動」的具體建議，${data.hostB.name} 為每個建議補充「風險或前提條件」。
5. 第五段【結語】：${data.hostA.name} 先做收尾與激勵性總結，${data.hostB.name} 補充現實提醒，兩人各說一句對今日主題的「金句總結」。

【七、內容規則】 (必須做到)
- 全程使用上傳資料中的具體數據、名詞、案例，不可憑空捏造。
- 引用數據時以自然語氣說出處（例如：「這份報告提到...」、「文件中提到...」、「數據顯示...」）。
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;
  }

  promptOutput.textContent = finalPrompt;
}

// Load Preset Config
function loadPreset(presetKey) {
  const config = PRESETS[presetKey];
  if (!config) return;

  // Set Inputs
  topicInput.value = config.topic;
  setRadioValue("audience", config.audience);
  setRadioValue("rhythm", config.rhythm);

  // Host A
  hostAName.value = config.hostA.name;
  hostAGender.value = config.hostA.gender;
  hostAStance.value = config.hostA.stance;
  hostAStyle.value = config.hostA.style;
  hostASpecialty.value = config.hostA.specialty;
  hostAHabit.value = config.hostA.habit;

  // Host B
  hostBName.value = config.hostB.name;
  hostBGender.value = config.hostB.gender;
  hostBStance.value = config.hostB.stance;
  hostBStyle.value = config.hostB.style;
  hostBSpecialty.value = config.hostB.specialty;
  hostBHabit.value = config.hostB.habit;

  interactionStyle.value = config.interaction;

  // Set Accident parameters
  const accFrameworkSelect = document.getElementById("accident-framework");
  const accTargetSelect = document.getElementById("accident-target");
  if (config.accident) {
    if (accFrameworkSelect) accFrameworkSelect.value = config.accident.framework;
    if (accTargetSelect) accTargetSelect.value = config.accident.target;
  } else {
    if (accFrameworkSelect) accFrameworkSelect.value = "無";
    if (accTargetSelect) accTargetSelect.value = "無";
  }

  // Update Active Preset button style
  presetButtons.forEach(btn => {
    if (btn.getAttribute("data-preset") === presetKey) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  // Sync tag pills active styling
  const activeTag = Object.keys(TAG_PRESET_MAP).find(key => TAG_PRESET_MAP[key] === presetKey) || "";
  tagPills.forEach(pill => {
    if (pill.getAttribute("data-tag") === activeTag) {
      pill.classList.add("active");
    } else {
      pill.classList.remove("active");
    }
  });

  updatePrompt();
}

// Setup Event Listeners
function init() {
  // Input triggers
  const allInputs = [
    topicInput, hostAName, hostAGender, hostAStance, hostAStyle, hostASpecialty, hostAHabit,
    hostBName, hostBGender, hostBStance, hostBStyle, hostBSpecialty, hostBHabit, interactionStyle
  ];
  
  allInputs.forEach(input => {
    input.addEventListener("input", updatePrompt);
    input.addEventListener("change", updatePrompt);
  });

  // Radios change listener
  const allRadios = [...document.getElementsByName("audience"), ...document.getElementsByName("rhythm")];
  allRadios.forEach(radio => {
    radio.addEventListener("change", updatePrompt);
  });

  // Tag pills selection - using optimized mapping
  tagPills.forEach(pill => {
    pill.addEventListener("click", () => {
      const tagText = pill.getAttribute("data-tag");
      const presetKey = TAG_PRESET_MAP[tagText];
      if (presetKey) {
        loadPreset(presetKey);
      }
    });
  });

  // Presets load triggers
  presetButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const presetKey = btn.getAttribute("data-preset");
      loadPreset(presetKey);
    });
  });

  // Copy to clipboard
  copyBtn.addEventListener("click", () => {
    const textToCopy = promptOutput.textContent;
    
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        // Visual feedback
        copyBtn.classList.add("success");
        const origText = copyBtn.querySelector(".btn-text").textContent;
        copyBtn.querySelector(".btn-text").textContent = "✓ 已複製提示詞！";
        
        setTimeout(() => {
          copyBtn.classList.remove("success");
          copyBtn.querySelector(".btn-text").textContent = origText;
        }, 2000);
      })
      .catch(err => {
        console.error("複製失敗：", err);
        alert("複製失敗，請手動選取文字複製。");
      });
  });

  // Tab Navigation switching
  const tabBtns = document.querySelectorAll(".tab-btn");
  const workspaces = document.querySelectorAll(".workspace-tab-content");
  
  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetTab = btn.getAttribute("data-tab");
      
      // Update active state of buttons
      tabBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      
      // Update active state of workspaces
      workspaces.forEach(ws => {
        if (ws.id === `${targetTab}-workspace`) {
          ws.classList.add("active");
        } else {
          ws.classList.remove("active");
        }
      });

      // Update header tagline text based on active tab
      const headerTitle = document.getElementById("header-title");
      const headerDesc = document.getElementById("header-desc");
      if (headerTitle && headerDesc) {
        if (targetTab === "audio-overview") {
          headerTitle.textContent = "調出兩個聲音的對話節奏";
          headerDesc.textContent = "為主持人設定人設與節奏，一鍵輸出完美對話提示詞";
        } else if (targetTab === "presentation-helper") {
          headerTitle.textContent = "突破簡報 15 頁的生成限制";
          headerDesc.textContent = "自動分組規劃與首尾銜接，無損合併完美長簡報";
        } else if (targetTab === "video-summary") {
          headerTitle.textContent = "精煉影片逐字稿的核心細節";
          headerDesc.textContent = "自訂技術焦點與筆記結構，一鍵提取影音實操精華";
        }
      }
    });
  });

  // Copy PPT Template to Clipboard
  const copyPptBtn = document.getElementById("copy-ppt-btn");
  const pptTemplateText = document.getElementById("ppt-template-text");
  
  if (copyPptBtn && pptTemplateText) {
    copyPptBtn.addEventListener("click", () => {
      const textToCopy = pptTemplateText.textContent;
      
      navigator.clipboard.writeText(textToCopy)
        .then(() => {
          // Visual feedback
          copyPptBtn.classList.add("success");
          const origText = copyPptBtn.querySelector(".btn-text").textContent;
          copyPptBtn.querySelector(".btn-text").textContent = "✓ 已複製簡報規劃提示詞！";
          
          setTimeout(() => {
            copyPptBtn.classList.remove("success");
            copyPptBtn.querySelector(".btn-text").textContent = origText;
          }, 2000);
        })
        .catch(err => {
          console.error("複製失敗：", err);
          alert("複製失敗，請手動選取文字複製。");
        });
    });
  }

  // Accident dropdown triggers
  const accFrameworkSelect = document.getElementById("accident-framework");
  const accTargetSelect = document.getElementById("accident-target");
  if (accFrameworkSelect) {
    accFrameworkSelect.addEventListener("change", updatePrompt);
  }
  if (accTargetSelect) {
    accTargetSelect.addEventListener("change", updatePrompt);
  }

  // VIDEO WORKSPACE INITIALIZATION
  const videoTopicInput = document.getElementById("video-topic-input");
  if (videoTopicInput) {
    videoTopicInput.addEventListener("input", updateVideoPrompt);
    videoTopicInput.addEventListener("change", updateVideoPrompt);
  }

  const videoRadios = [
    ...document.getElementsByName("video-focus"),
    ...document.getElementsByName("video-format")
  ];
  videoRadios.forEach(radio => {
    radio.addEventListener("change", updateVideoPrompt);
  });

  const videoTagPills = document.querySelectorAll(".video-tag-pill");
  videoTagPills.forEach(pill => {
    pill.addEventListener("click", () => {
      videoTagPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      
      const tagValue = pill.getAttribute("data-tag");
      if (videoTopicInput) {
        videoTopicInput.value = `關於「${tagValue}」的製程與操作細節解說影片`;
        updateVideoPrompt();
      }
    });
  });

  // Video Presets
  const VIDEO_PRESETS = {
    operation: {
      topic: "分餾系統製程操作與現場閥門切換說明影片",
      focus: "化工/製程講解",
      format: "操作重點與 SOP 清單"
    },
    safety: {
      topic: "原料進料泵異常洩漏引發火警現場應急處置與搶修錄影",
      focus: "安全與事故還原",
      format: "結構化時間軸筆記"
    },
    training: {
      topic: "離心式轉動設備機械振動頻譜分析與故障診斷實務講座",
      focus: "學術/技術講座",
      format: "問答與培訓考核庫"
    },
    finance: {
      topic: "柴鼠存股分析與日常理財規劃工具使用說明影片",
      focus: "生活理財/3C評測",
      format: "操作重點與 SOP 清單"
    },
    cooking: {
      topic: "法式紅酒燉牛肉家庭料理實作與火候控制教學影片",
      focus: "生活理財/3C評測",
      format: "結構化時間軸筆記"
    }
  };

  function loadVideoPreset(key) {
    const preset = VIDEO_PRESETS[key];
    if (!preset) return;

    if (videoTopicInput) videoTopicInput.value = preset.topic;
    setRadioValue("video-focus", preset.focus);
    setRadioValue("video-format", preset.format);

    // Toggle active style of preset buttons
    ["operation", "safety", "training", "finance", "cooking"].forEach(k => {
      const btn = document.getElementById(`video-preset-${k}`);
      if (btn) {
        if (k === key) {
          btn.classList.add("active");
        } else {
          btn.classList.remove("active");
        }
      }
    });

    updateVideoPrompt();
  }

  ["operation", "safety", "training", "finance", "cooking"].forEach(key => {
    const btn = document.getElementById(`video-preset-${key}`);
    if (btn) {
      btn.addEventListener("click", () => loadVideoPreset(key));
    }
  });

  const copyVideoBtn = document.getElementById("copy-video-btn");
  const videoPromptOutput = document.getElementById("video-prompt-output");
  if (copyVideoBtn && videoPromptOutput) {
    copyVideoBtn.addEventListener("click", () => {
      const textToCopy = videoPromptOutput.textContent;
      navigator.clipboard.writeText(textToCopy)
        .then(() => {
          copyVideoBtn.classList.add("success");
          const origText = copyVideoBtn.querySelector(".btn-text").textContent;
          copyVideoBtn.querySelector(".btn-text").textContent = "✓ 已複製影片摘要提示詞！";
          
          setTimeout(() => {
            copyVideoBtn.classList.remove("success");
            copyVideoBtn.querySelector(".btn-text").textContent = origText;
          }, 2000);
        })
        .catch(err => {
          console.error("複製失敗：", err);
          alert("複製失敗，請手動選取文字複製。");
        });
    });
  }

  // Initial load for video workspace
  loadVideoPreset("operation");

  // Load default preset (chemical_process) on load
  loadPreset("chemical_process");
}

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", init);

// Global update function for Video Prompt
function updateVideoPrompt() {
  const topicInputEl = document.getElementById("video-topic-input");
  const topic = (topicInputEl ? topicInputEl.value.trim() : "") || "未設定影片主題";
  const formatSelectEl = document.getElementById("video-format-select");
  const format = formatSelectEl ? formatSelectEl.value : "Explainer (說明解說)";
  const audienceInputEl = document.getElementById("video-audience-input");
  const audience = (audienceInputEl ? audienceInputEl.value.trim() : "") || "一般大眾";
  const style = getRadioValue("video-style") || "Watercolor (水彩)";
  const lengthSelectEl = document.getElementById("video-length-select");
  const length = lengthSelectEl ? lengthSelectEl.value : "10-12 分鐘";
  const directivesInputEl = document.getElementById("video-directives-input");
  const directives = (directivesInputEl ? directivesInputEl.value.trim() : "") || "無特殊微調指令";

  let formatDetail = "";
  if (format.includes("Explainer")) {
    formatDetail = `【影片格式：Explainer 說明解說模式】
- 敘事要求：著重於深入、結構化且具邏輯性的觀念解說。針對影片逐字稿中的關鍵背景知識進行脈絡梳理，由淺入深說明「為什麼」與「怎麼做」，避免碎片化的簡短條列。
- 節奏安排：語氣沉穩有條理，給予觀眾足夠的吸收時間，並確保專有名詞有清晰定義與例證說明。`;
  } else {
    formatDetail = `【影片格式：Brief 摘要速覽模式】
- 敘事要求：精簡高效，以極高密度濃縮影片核心重點。開門見山直接切入核心結論，列出關鍵要點（Key Takeaways），不拖泥帶水，方便觀眾快速獲取核心資訊。
- 節奏安排：節奏明快、語調簡練，將龐雜的逐字稿內容提煉成一目了然的摘要金句與重點清單。`;
  }

  let styleDetail = "";
  if (style.includes("Watercolor")) {
    styleDetail = `- 影像風格：指定採用「Watercolor (水彩)」風格。
- 視覺特徵：利用 Nano Banana 模型生成柔和的水彩筆觸、漸層渲染的色彩以及富有藝術質感的手繪插圖分鏡，整體畫面要呈現出溫馨、寫意且具人文感的美學視覺。`;
  } else if (style.includes("Papercraft")) {
    styleDetail = `- 影像風格：指定採用「Papercraft (紙藝)」風格。
- 視覺特徵：利用 Nano Banana 模型生成 3D 立體摺紙、紙張重疊的陰影明暗以及精緻的紙張紋理與邊緣剪裁感，營造出充滿工藝感、立體且新穎的分鏡視覺特徵。`;
  } else if (style.includes("Anime")) {
    styleDetail = `- 影像風格：指定採用「Anime (動漫風)」風格.
- 視覺特徵：利用 Nano Banana 模型生成日系二次元動漫插圖，以明亮通透的色彩、精緻乾淨的線條和動感的構圖，營造出充滿青春活力與敘事表現力的美學畫面。`;
  } else if (style.includes("Whiteboard")) {
    styleDetail = `- 影像風格：指定採用「Whiteboard (白板)」風格。
- 視覺特徵：利用 Nano Banana 模型生成簡潔生動的手繪黑板/白板塗鴉、圖示與流程指示箭頭，模擬真人在白板上邊講邊畫的現場解說感，視覺直觀且易於理解。`;
  } else if (style.includes("Retro Print")) {
    styleDetail = `- 影像風格：指定採用「Retro Print (復古印刷)」風格。
- 視覺特徵：利用 Nano Banana 模型生成帶有網點紋理、粗獷套色印痕與懷舊偏色的半色調質感畫面，模擬老式海報或舊書插圖，呈現濃郁的時代感與經典設計風格。`;
  } else if (style.includes("Heritage")) {
    styleDetail = `- 影像風格：指定採用「Heritage (古典)」風格。
- 視覺特徵：利用 Nano Banana 模型生成高雅端莊的歷史古典視覺，採用羊皮紙般的古樸色調、細膩的復古鋼筆線描插畫與沉穩的暗色系配色，展現深厚的文化底蘊與權威質感。`;
  }

  const finalPrompt = `你是一位專業的 NotebookLM 影片總覽 (Video Overviews) 生成專家。請為我即將生成的教學影片規劃一套符合 Nano Banana 視覺生成與語音合成的客製化引導語。請嚴格依據我上傳的參考資料與影片逐字稿，產出符合以下條件的影片腳本、分鏡引導與旁白大綱：

━━━━━━━━ 📹 NOTEBOOKLM VIDEO OVERVIEWS INSTRUCTION ━━━━━━━

【一、影片核心主題與設定】
- 影片主題：${topic}
- 目標受眾：${audience}
- 預估時長：${length}
- 格式模式：${format}

【二、格式與敘事結構要求】
${formatDetail}

【三、Nano Banana 視覺風格指令】
${styleDetail}
- 畫面生成原則：影片中的視覺插圖必須與旁白提及的內容在 context 上高度契合，切忌生成與內容無關的裝飾圖案。

【四、客製微調指令 / 敘事焦點】
- 敘事與微調指示：
  ${directives}

【五、逐字稿名詞校正與產出約束】
- 請自動識別逐字稿中可能的語音辨識錯誤，並修正為正確的名詞與術語。
- 所有影片旁白與畫面文字均應使用繁體中文（台灣）呈現。
- 嚴格僅使用上傳文檔中的事實與數據，不得虛構或捏造影片內容。`;

  const outputEl = document.getElementById("video-prompt-output");
  if (outputEl) {
    outputEl.textContent = finalPrompt;
  }
}
