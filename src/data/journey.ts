export type JourneyStage = {
  period: string;
  title: string;
  subtitle: string;
  description: string;
  achievements: string[];
  tags: string[];
  isCurrent?: boolean;
};

export const journeyStages: JourneyStage[] = [
  {
    period: "2014—2020",
    title: "本地内容与商家服务",
    subtitle: "扎根线下消费现场，理解商家真实生存状态",
    description:
      "运营本地生活与美食头部微信公众号及短视频矩阵，长期穿梭于临沂及周边城市的各类餐饮门店、商业街区。积累了丰富的商家流量获客、探店营销与品牌传播经验。",
    achievements: [
      "深度服务超过 2000 家本地餐饮、休闲娱乐与 retail 商家",
      "策划 100+ 场爆款本地营销活动，累计带来数千万级本地曝光",
      "建立了对餐饮成本结构、获客逻辑与老板心理的深刻理解"
    ],
    tags: ["本地生活", "餐饮探店", "内容传播", "商家营销", "爆款策划"],
  },
  {
    period: "2021—2025",
    title: "餐饮经营一线实战",
    subtitle: "亲自下场创业经营，经历实体商业的血与火",
    description:
      "从幕后的服务商转变为亲自下场的餐饮创业者。亲自负责产品研发、门店选址、装修施工、人员招募、供应链采购、外卖平台运营及每日现金流结算，切身体验实体创业的艰辛。",
    achievements: [
      "从 0 到 1 打造并运营实体餐饮门店，验证完整商业闭环",
      "真实经历疫情冲击下的现金流管理、员工流失与供应链断裂风险",
      "深刻体会到‘繁琐杂务’对管理者精力的毁灭性消耗"
    ],
    tags: ["实体经营", "餐饮产品", "门店运营", "流量获客", "现金流管理"],
  },
  {
    period: "NOW",
    title: "FDE 模式企业 AI 驻场落地",
    subtitle: "用前向部署工程师模式，深入企业现场交付 AI 生产力",
    description:
      "采用 Palantir 式的 FDE (Forward Deployed Engineer) 前向部署工程师模式。亲自入驻企业一线现场，梳理断点流程、沉淀私有知识库、快速开发垂直 Agent 并跟进员工培训，确保 AI 真正产生 ROI。",
    achievements: [
      "推行 FDE 驻场模式，帮助多家中小企业实现 70% 杂务自动化",
      "研发 FoodOps 餐饮 AI 运营系统，在内测门店实现 400% 效率提升",
      "构建饿狸 (Eli) 餐饮商家知识库与营销生成工作台"
    ],
    tags: ["FDE 驻场", "企业 AI 落地", "Agent 工作流", "私有知识库", "MVP 交付"],
    isCurrent: true,
  },
];

export const credibilityStats = [
  { number: "FDE", unit: "模式", label: "驻场入驻企业一线", sublabel: "拒做脱离业务的 PPT 方案" },
  { number: "10+", unit: "年", label: "商业与内容创业沉淀", sublabel: "经历行业周期与模式更替" },
  { number: "2000+", unit: "家", label: "实体商家服务经验", sublabel: "覆盖单店至连锁品牌" },
  { number: "100%", unit: "交付", label: "基于真实 ROI 的落地闭环", sublabel: "员工能用、老板省钱" },
];

export const focusAreas = [
  {
    index: "01",
    title: "FDE 模式企业 AI 驻场落地",
    description:
      "拒绝传统外包的‘交差心态’。以 FDE (Forward Deployed Engineer) 前向部署工程师模式，深入企业真实办公与生产现场，抓取核心断点，定制专属 Agent 工作流，全程陪伴直至员工流畅使用。",
    tags: ["FDE 驻场", "流程诊断", "专属 Agent", "私有知识库", "员工培训"],
    detailList: [
      "企业业务流现场诊断与 AI 可可行性评估",
      "企业私有 RAG 知识库与调性微调引擎搭建",
      "定制化 Agent 敏捷开发与一周快速交付",
      "驻场跟跑与员工操作习惯沉淀"
    ]
  },
  {
    index: "02",
    title: "餐饮与本地商业智能化",
    description:
      "结合五年实体店经营的惨痛教训与成功经验，帮助餐饮与本地商家建立‘低成本获客 + 智能高复购 + 自动化运营’的数字化新经营架构。",
    tags: ["餐饮经营", "品牌营销", "本地流量", "商家增长", "复购引擎"],
    detailList: [
      "大众点评/美团店铺星级与差评防御机制",
      "基于顾客生命周期的智能召回系统",
      "门店私域流量增长与内容日历"
    ]
  },
  {
    index: "03",
    title: "垂直场景 AI 产品研发",
    description:
      "将实践中验证成功的通用模式打磨为标准 SaaS 产品与工具（如 FoodOps、灵狸等），持续探索独立开发与自构建产品的商业边界。",
    tags: ["产品定义", "需求拆解", "全栈开发", "用户体验", "敏捷迭代"],
    detailList: [
      "小红书/抖音爆款文案批量生成模型",
      "品牌专属语气调性设定与合规检测",
      "多平台定时自动化分发引擎"
    ]
  },
];

export const workingMethod = [
  {
    step: "01",
    title: "FDE 驻场深入现场",
    description: "不听汇报、不看虚假需求。以 FDE 模式亲自入驻企业现场，跟踪员工真实办公流程，找出最耗时、最折磨人的环节。",
    example: "如：连续 3 天跟班观察客服与运营团队，记录重复复制粘贴与人工查找文档的时间。"
  },
  {
    step: "02",
    title: "拆解业务为 Agent 链条",
    description: "将混乱的业务流程梳理为清晰的‘输入-处理-决策-输出’链条，识别出可以用 AI Agent 代替的非结构化环节。",
    example: "如：客户询价 = 识别产品型号 + 检索知识库政策 + 匹配折扣 + 拟定报价单。"
  },
  {
    step: "03",
    title: "敏捷开发与现场部署",
    description: "在一周内交付可用的 MVP 工具，直接部署到员工日常使用的微信群或内部看板中，单次交互控制在 30 秒内。",
    example: "如：搭建一个可直接在微信发送‘@AI助手’查询产品库存与配方的内部 Agent。"
  },
  {
    step: "04",
    title: "陪跑培训与 ROI 验收",
    description: "驻场指导员工使用，根据真实使用频率与省下的工时微调 Prompt，确保 AI 真正产生明确的降本增效指标。",
    example: "如：以‘客服响应时间缩短 60%’与‘员工加班减少 1 小时’为最终验收依据。"
  },
];

export const aboutPrinciples = [
  {
    title: "FDE 前向部署：绝不脱离一线现场",
    desc: "软件的灵魂在一线。坐在办公室里拍脑袋做出的企业系统 90% 都会沦为摆设，只有驻场观察到的需求才是真需求。"
  },
  {
    title: "真实问题高于热门概念",
    desc: "绝不为了用 AI 而用 AI。如果 Excel 或一张纸能更高效地解决问题，那就用最简单的手段。"
  },
  {
    title: "完成验证高于追求完美",
    desc: "完美是敏捷的敌人。在真实业务中快速拿到反馈并修正，远比在房间里幻想一个大而全的系统有价值。"
  },
  {
    title: "技术必须服务于明确的 ROI",
    desc: "无论是降本、增效、还是直接带来营收增长，不能产生明确商业价值的技术落地都是自嗨。"
  }
];

export const aboutSkills = [
  "FDE (Forward Deployed Engineer) 驻场落地实战",
  "企业流程诊断与 Agent 架构设计",
  "商业敏锐度与实体经营全流程理解",
  "企业私有 RAG 知识库与 Prompt 精调",
  "全栈开发 (Next.js/TypeScript/Tailwind/Node.js)",
  "员工培训与落地习惯陪跑"
];

export const toolBoxItems = [
  { category: "FDE 落地工具", items: ["FDE 驻场诊断表", "企业知识库 RAG", "Dify/Coze", "OpenAI/DeepSeek API", "LangChain"] },
  { category: "开发框架", items: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Node.js"] },
  { category: "数据库 & 基础设施", items: ["PostgreSQL", "Prisma", "Redis", "VectorDB", "Vercel"] },
  { category: "设计 & 效率", items: ["Figma", "Motion", "Lucide Icons", "Markdown/MDX", "Raycast"] }
];

export const contactDirections = [
  { label: "FDE 模式企业 AI 驻场落地咨询", suitable: true, desc: "工程师亲自入驻企业现场，诊断断点并在一周内交付专属 Agent 流程" },
  { label: "AI 产品共创与方案落地", suitable: true, desc: "寻找有垂直真实业务场景、想用 AI 改造流程的伙伴" },
  { label: "餐饮/本地商业数字化转型", suitable: true, desc: "为实体门店提供客流增长、点评防御与智能运营指导" },
  { label: "创业项目交流与产品拆解", suitable: true, desc: "同频创业者互相拆解商业逻辑、分享实战经验" },
  { label: "纯技术外包与廉价抠图", suitable: false, desc: "不承接缺乏商业思考与驻场落地的纯代码代写需求" },
  { label: "大而全的大型企业 ERP 招标", suitable: false, desc: "专注敏捷 MVP 与 FDE 高效落地，不参与繁重传统招投标" }
];
