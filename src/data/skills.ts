export type SkillCategory =
  | "agent-skill"
  | "prompt-pack"
  | "enterprise-sop"
  | "content-workflow";

export type SkillItem = {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  category: SkillCategory;
  categoryLabel: string;
  version: string;
  format: "ZIP";
  fileStructure: string[];
  updatedAt: string;
  downloadCount: number;
  tags: string[];
  features: string[];
  codeSnippet: string;
  fileUrl: string;
  featured?: boolean;
};

export const skillCategories: { value: string; label: string }[] = [
  { value: "all", label: "全部技能包" },
  { value: "agent-skill", label: "AI Agent 技能包" },
  { value: "prompt-pack", label: "爆款 Prompt 提示词库" },
  { value: "enterprise-sop", label: "FDE 企业落地 SOP" },
  { value: "content-workflow", label: "内容自动化工作流" },
];

export const skillsData: SkillItem[] = [
  {
    id: "skill-01",
    slug: "restaurant-review-reply-agent",
    name: "餐饮大众点评差评得体抚慰 Agent 多文件技能包",
    subtitle: "包含 Manifest、系统 Prompt、规则表、校验工具与 20+ 测试集的完整 Agent 技能包",
    description:
      "包含多文件结构的商业级 Agent 技能包。内含主配置文件 skill.json、系统 Prompt、情绪分析器、补偿规则表、Python/JS 校验工具脚本与 20 组真实大众点评/美团差评测试集。",
    category: "agent-skill",
    categoryLabel: "AI Agent 技能包",
    version: "v1.2.0",
    format: "ZIP",
    updatedAt: "2025-07-20",
    downloadCount: 1420,
    fileUrl: "/downloads/skills/restaurant-review-reply-agent.zip",
    fileStructure: [
      "skill.json (技能主配置文件)",
      "prompts/system_prompt.md (主系统 Prompt 与少样本示范)",
      "prompts/sentiment_classifier.md (情绪分析与负面因子抽取)",
      "prompts/compensation_rules.md (代金券与到店补偿匹配规则)",
      "tools/keyword_extractor.py (关键词提取 Python 脚本)",
      "tools/reply_formatter.js (格式化与字数拦截 JS 校验器)",
      "evals/test_reviews.json (20 组真实差评测试集)",
      "README.md (部署与导入指南)"
    ],
    tags: ["餐饮点评", "差评防御", "多文件Agent", "Dify/Coze通用"],
    featured: true,
    features: [
      "完整多文件文件夹架构，解压后包含 8 个模块化配置文件",
      "自动提取差评关键词（具体菜名、服务人员动作）",
      "预设 5 种不同店铺人设语气（豪爽大叔、雅致掌柜、亲切邻家）",
      "兼容 OpenAI / DeepSeek / Dify / Coze 直接导入使用"
    ],
    codeSnippet: `restaurant-review-reply-agent/
├── skill.json                  # 技能主配置文件与参数定义
├── README.md                   # 部署与导入指南
├── prompts/
│   ├── system_prompt.md        # 主系统 Prompt 与多少样本示范
│   ├── sentiment_classifier.md # 情绪分析与负面因子抽取
│   └── compensation_rules.md   # 代金券与到店补偿匹配规则
├── tools/
│   ├── keyword_extractor.py    # 关键词提取 Python 脚本
│   └── reply_formatter.js      # 格式化与字数校验器
└── evals/
    └── test_reviews.json       # 20 组真实大众点评/美团差评测试集`
  },
  {
    id: "skill-02",
    slug: "fde-onsite-ai-diagnostic-sop",
    name: "FDE 模式企业 AI 驻场诊断多文件工具包",
    subtitle: "前向部署工程师入驻企业现场时的全阶段 SOP 指南、观察记录表与 ROI 计算模版",
    description:
      "完整多文件结构的 FDE (Forward Deployed Engineer) 驻场交付 SOP。包含 4 阶段落地手册、断点捕获观察模版、RAG 清洗规范以及可自动计算工时节省与月度收益的 ROI 计算表格。",
    category: "enterprise-sop",
    categoryLabel: "FDE 企业落地 SOP",
    version: "v2.0.0",
    format: "ZIP",
    updatedAt: "2025-07-25",
    downloadCount: 980,
    fileUrl: "/downloads/skills/fde-onsite-ai-diagnostic-sop.zip",
    fileStructure: [
      "manifest.json (SOP 软件包清单)",
      "docs/01_onsite_audit_sop.md (Day 1-3 现场跟班与断点捕获 SOP)",
      "docs/02_rag_cleaning_guide.md (Day 4-7 私有知识库清洗指引)",
      "docs/03_roi_formula_spec.md (Day 8-14 陪跑与 ROI 量化公式)",
      "templates/onsite_observation_log.csv (现场观察记录 CSV 模版)",
      "templates/roi_calculator.csv (自动计算 ROI 的表格模版)",
      "README.md (使用说明)"
    ],
    tags: ["FDE 驻场", "企业 AI 诊断", "多文件SOP", "ROI 评估"],
    featured: true,
    features: [
      "解压即用的多文档 SOP 工具包与自动计算表格",
      "现场跟班观察记录表 (涵盖 8 种高频重复断点特征)",
      "企业私有向量知识库数据清洗与架构整理清单",
      "包含月度工时与经济收益自动计算公式 CSV"
    ],
    codeSnippet: `fde-onsite-ai-diagnostic-sop/
├── manifest.json               # 软件包清单
├── README.md                   # 使用说明手册
├── docs/
│   ├── 01_onsite_audit_sop.md  # Day 1-3 现场跟班与断点捕获 SOP
│   ├── 02_rag_cleaning_guide.md# Day 4-7 私有知识库清洗指引
│   └── 03_roi_formula_spec.md  # Day 8-14 陪跑与 ROI 量化公式
└── templates/
    ├── onsite_observation_log.csv # 现场观察记录 CSV 模版
    └── roi_calculator.csv       # 自动计算 ROI 表格模版`
  },
  {
    id: "skill-03",
    slug: "xiaohongshu-food-copywriting-pack",
    name: "小红书餐饮爆款文案生成多文件提示词矩阵",
    subtitle: "含 12 套不同场景场景 Prompt、爆款标题库、五感描述集与敏感词过滤字典",
    description:
      "模块化多文件的小红书美食营销文案生成包。解压后包含 12 套场景 Prompt、10 个爆款疑问与价格标题公式、五感肉感描述词集以及包含 500+ 避坑词的敏感词字典。",
    category: "prompt-pack",
    categoryLabel: "爆款 Prompt 提示词库",
    version: "v3.1.0",
    format: "ZIP",
    updatedAt: "2025-07-15",
    downloadCount: 2310,
    fileUrl: "/downloads/skills/xiaohongshu-food-copywriting-pack.zip",
    fileStructure: [
      "skill.json (提示词矩阵配置)",
      "prompts/viral_hooks.md (10 个高爆款标题公式)",
      "prompts/sensory_descriptions.md (五感描述词库)",
      "prompts/scenarios/seasonal.md (节气贴秋膘场景 Prompt)",
      "prompts/scenarios/discount.md (折扣限时抢场景 Prompt)",
      "filters/sensitive_words.json (小红书防封敏感词与替代词字典)",
      "README.md (使用说明)"
    ],
    tags: ["小红书文案", "餐饮营销", "多文件提示词", "避坑字典"],
    featured: true,
    features: [
      "包含‘种草向’、‘打折促销向’、‘情感共鸣向’三大模块",
      "自动插入表情符号 (Emoji) 与热门搜索标签",
      "内置小红书算法避坑规则，防止限流敏感词",
      "附带图片拍摄布光与构图建议"
    ],
    codeSnippet: `xiaohongshu-food-copywriting-pack/
├── skill.json                  # 提示词矩阵配置
├── README.md                   # 使用说明
├── prompts/
│   ├── viral_hooks.md          # 10 个高爆款标题公式
│   ├── sensory_descriptions.md # 五感描述词库
│   └── scenarios/              # 场景化 Prompt 目录
│       ├── seasonal.md         # 节气贴秋膘场景
│       └── discount.md         # 折扣限时抢场景
└── filters/
    └── sensitive_words.json    # 小红书防封敏感词字典`
  },
  {
    id: "skill-04",
    slug: "beauty-customer-21day-retention-flow",
    name: "美业老客 21 天黄金召回 Agent 自动化工作流包",
    subtitle: "含工作流定义、4 阶段关怀 Prompt、时间计算脚本与通知模板",
    description:
      "针对美业打造的 21 天黄金生命周期流转多文件工作流。包含完整节点的 workflow.json、第 1/3/7/21 天关怀 Prompt 文件及 JS 时间节点计算助手脚本。",
    category: "content-workflow",
    categoryLabel: "内容自动化工作流",
    version: "v1.0.0",
    format: "ZIP",
    updatedAt: "2025-06-18",
    downloadCount: 860,
    fileUrl: "/downloads/skills/beauty-customer-21day-retention-flow.zip",
    fileStructure: [
      "workflow.json (多节点工作流定义)",
      "prompts/day_01_care.md (第1天防敏关怀)",
      "prompts/day_03_absorption.md (第3天吸收确认)",
      "prompts/day_07_homecare.md (第7天家居保养提醒)",
      "prompts/day_21_metabolism_recall.md (第21天代谢周期召回)",
      "scripts/calculate_next_visit.js (日期计算脚本)",
      "README.md (使用说明)"
    ],
    tags: ["美业SaaS", "旧客召回", "多文件工作流", "自动化提醒"],
    featured: false,
    features: [
      "多节点解耦架构，可导入 n8n / Dify / 自建系统",
      "自动计算客户皮肤代谢周期与二次预约节点",
      "去除商业推销感，强化‘专业护理师’的关心人设",
      "支持复制直接发微信，带可个性化编辑槽位"
    ],
    codeSnippet: `beauty-customer-21day-retention-flow/
├── workflow.json               # 多节点工作流定义
├── README.md                   # 使用说明
├── prompts/
│   ├── day_01_care.md          # 第1天防敏关怀
│   ├── day_03_absorption.md    # 第3天吸收确认
│   ├── day_07_homecare.md      # 第7天家居保养提醒
│   └── day_21_metabolism_recall.md # 第21天代谢周期召回
└── scripts/
    └── calculate_next_visit.js # 日期计算脚本`
  },
  {
    id: "skill-05",
    slug: "merchant-rag-data-cleaning-schema",
    name: "中小商家私有 RAG 知识库清洗 Schema 多文件包",
    subtitle: "含 Schema 定义、Python 自动化分词向量化脚本与标准 Chunk 样例",
    description:
      "多文件 RAG 向量知识库数据工程包。解压后包含规范定义 schema.json、Python 分词向量化脚本与完整的问答 Chunk 样例 JSON 文件。",
    category: "enterprise-sop",
    categoryLabel: "FDE 企业落地 SOP",
    version: "v1.1.0",
    format: "ZIP",
    updatedAt: "2025-07-02",
    downloadCount: 650,
    fileUrl: "/downloads/skills/merchant-rag-data-cleaning-schema.zip",
    fileStructure: [
      "schema.json (知识库清洗 Schema 规范)",
      "scripts/chunk_and_vectorize.py (Python 分词向量化脚本)",
      "templates/faq_chunk_sample.json (标准问答 Chunk 样例)",
      "README.md (使用说明)"
    ],
    tags: ["RAG 知识库", "数据清洗", "Python脚本", "向量数据库"],
    featured: false,
    features: [
      "基于问答对 (Chunking) 的 250-400 字黄金切割标准",
      "提供可直接运行的 Python LangChain 分词脚本",
      "元数据 (Metadata) 标签设计规范（部门、权限、生效时间）",
      "防止大模型幻觉的‘否定回答模版’"
    ],
    codeSnippet: `merchant-rag-data-cleaning-schema/
├── schema.json                 # 知识库清洗 Schema 规范
├── README.md                   # 使用说明
├── scripts/
│   └── chunk_and_vectorize.py  # Python 分词向量化脚本
└── templates/
    └── faq_chunk_sample.json   # 标准问答 Chunk 样例`
  },
  {
    id: "skill-06",
    slug: "ad-compliance-and-sensitive-wordlist",
    name: "商家社交平台营销合规与敏感词检测多文件包",
    subtitle: "含分类敏感词典 wordlist.json、Python 检测脚本与 JS 工具脚本",
    description:
      "包含完整的 2025 敏感词分类字典及自动化检测工具代码的多文件包。内置新广告法极限词、美业/餐饮违禁词、平台引流词以及 Python/JS 双语言自动扫描脚本。",
    category: "prompt-pack",
    categoryLabel: "爆款 Prompt 提示词库",
    version: "v2.5.0",
    format: "ZIP",
    updatedAt: "2025-07-10",
    downloadCount: 1890,
    fileUrl: "/downloads/skills/ad-compliance-and-sensitive-wordlist.zip",
    fileStructure: [
      "manifest.json (软件包清单)",
      "wordlist.json (分类敏感词典与替代表词汇库)",
      "scripts/compliance_checker.py (Python 自动扫描脚本)",
      "scripts/compliance_checker.js (JS/TS 检测工具函数)",
      "README.md (使用说明)"
    ],
    tags: ["广告法合规", "敏感词库", "Python脚本", "合规校验"],
    featured: false,
    features: [
      "涵盖‘第一’、‘顶级’、‘国家级’等 50+ 禁限词汇",
      "针对美业、餐饮、养生行业的特殊违禁词清单",
      "提供 Python/JS 自动扫描与替代词建议代码",
      "JSON 格式便于直接集成至自动化系统"
    ],
    codeSnippet: `ad-compliance-and-sensitive-wordlist/
├── manifest.json               # 软件包清单
├── README.md                   # 使用说明
├── wordlist.json               # 分类敏感词典与替代词
└── scripts/
    ├── compliance_checker.py   # Python 自动扫描脚本
    └── compliance_checker.js   # JS 检测工具函数`
  }
];

export function getSkillBySlug(slug: string): SkillItem | undefined {
  return skillsData.find((s) => s.slug === slug);
}

export function getFeaturedSkills(): SkillItem[] {
  return skillsData.filter((s) => s.featured);
}
