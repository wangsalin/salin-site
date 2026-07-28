export type EvidenceCategory = "content" | "restaurant" | "business" | "ai";

export type EvidenceItem = {
  id: string;
  title: string;
  category: EvidenceCategory;
  categoryName: string;
  yearRange: string;
  summary: string;
  description: string;
  image: string;
  tags: string[];
  metrics?: string;
  alt: string;
};

export const evidenceItems: EvidenceItem[] = [
  {
    id: "local-life-content",
    title: "本地生活与餐饮内容流沉淀",
    category: "content",
    categoryName: "本地生活内容",
    yearRange: "2014 — 2020 年",
    summary: "持续深入临沂及周边本地美食探店与社群内容运营。",
    description:
      "长达 6 年深入餐饮门店、批发市场与城市消费一线，创作数千篇高黏性本地吃喝玩乐探店图文与短视频，积累了对真实消费者痛点与老板诉求的极敏锐嗅觉。",
    image: "/images/evidence/local-life.png",
    tags: ["探店内容", "微信公众号", "本地社群", "流量爆款"],
    metrics: "累计爆款阅读 1000万+",
    alt: "狗哥本地生活探店内容真实记录",
  },
  {
    id: "merchant-service",
    title: "服务 2000+ 餐饮商家营销拓客",
    category: "restaurant",
    categoryName: "餐饮商家服务",
    yearRange: "2017 — 2022 年",
    summary: "帮助中小型连锁餐饮解决营销、团购与客情留存难题。",
    description:
      "深入 2000 多家实体餐饮门店，制定团购套餐、活动海报、点评好评防御与老客复购流转方案，深谙餐饮商家在流量、成本与效率上的核心割裂痛点。",
    image: "/images/evidence/merchant-service.png",
    tags: ["美团点评运营", "团购策划", "客情维护", "私域复购"],
    metrics: "服务商家 2000+ 家",
    alt: "狗哥服务餐饮商家推广活动现场记录",
  },
  {
    id: "restaurant-operations-frontline",
    title: "亲自下场经营餐饮门店一线",
    category: "business",
    categoryName: "餐饮经营一线",
    yearRange: "2021 — 2024 年",
    summary: "从服务商视角跨越至实体开店经营者视角。",
    description:
      "亲自投资并参与餐饮门店实际经营，亲自操盘食材采购、后厨标准化、人员排班、损耗控制与现金流管理。这段经历了为什么“单纯的软件工具”往往在门店用不起来。",
    image: "/images/evidence/kitchen-frontline.png",
    tags: ["门店采购", "损耗控制", "后厨标准化", "现金流操盘"],
    metrics: "亲自开店实操 3 年+",
    alt: "狗哥餐饮门店经营现场实拍记录",
  },
  {
    id: "ai-product-practice",
    title: "AI 工具与业务工作流工程化",
    category: "ai",
    categoryName: "AI 产品实践",
    yearRange: "2024 — 至今",
    summary: "将实体经营中的重复痛点用 AI 提炼为软件与 Agent。",
    description:
      "将经营中极具重复性的报价核对、点评差评抚慰、营销文案创作与库存盘点，拆解为最小可验证的 AI 工具、开源框架与微信协同工作流。",
    image: "/images/evidence/ai-dashboard.png",
    tags: ["FoodOps 开源", "Agent 架构", "微信工作流", "私有知识库"],
    metrics: "开源 MVP 验证中",
    alt: "狗哥 AI 产品开发界面与架构图",
  },
];
