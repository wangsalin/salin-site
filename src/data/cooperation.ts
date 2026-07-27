export type CooperationItem = {
  id: string;
  title: string;
  suitableFor: string;
  deliverables: string[];
  startMethod: string;
  tag: string;
};

export const cooperationItems: CooperationItem[] = [
  {
    id: "ai-product-co-creation",
    title: "AI 产品共创",
    tag: "资源 + 产品路径",
    suitableFor:
      "已经拥有行业资源、真实客户或明确业务痛点，但缺少产品定义、AI 技术落地路径与 MVP 验证的团队。",
    deliverables: [
      "真实痛点与需求可行性判断",
      "业务流程拆解与输入输出定义",
      "AI 场景规划与 Agent 架构设计",
      "UI/UX 高保真原型与 MVP 开发推进",
    ],
    startMethod: "先用一次 30 分钟沟通判断：问题是否真实、是否值得做成产品、最小验证方式是什么。",
  },
  {
    id: "enterprise-ai-landing",
    title: "企业 AI 落地 (FDE 驻场)",
    tag: "流程降本增效",
    suitableFor:
      "希望使用 AI 降低团队重复工时与错误率，但不清楚应该从哪个部门和具体流程开始试点的企业。",
    deliverables: [
      "现场岗位工时与断点场景梳理",
      "企业私有知识库清洗与向量化",
      "无需新软件系统的微信/企微协同 Agent",
      "员工陪跑培训与量化 ROI 结果验收",
    ],
    startMethod: "不先承诺建设庞大的“企业 AI 大脑”，而是先挑选一个能明确计算 ROI 的具体流程动手试点。",
  },
  {
    id: "restaurant-local-business",
    title: "餐饮与本地商业顾问",
    tag: "实体经营 + AI",
    suitableFor:
      "餐饮连锁品牌、独立门店、本地生活服务项目以及希望升级线上协同的实体商业团队。",
    deliverables: [
      "品牌定位与全渠道内容爆款规划",
      "点评好评防御与智能差评抚慰工作流",
      "美团/大众点评/小红书营销素材库生成",
      "门店采购与盘点经营流程拆解优化",
    ],
    startMethod: "针对实际经营中的客情、流量或采购痛点，制定 1-2 周内即可看到结果的落地动作。",
  },
];

export const unsuitableItems = [
  {
    title: "只需要简单套用套路模板",
    desc: "不愿投入时间拆解真实业务流程，只想买个通用号称“万能”软件工具的团队。",
  },
  {
    title: "没有真实业务负责人参与",
    desc: "决策人离一线太远，缺乏能对最终业务结果和落地流程直接负责的项目牵头人。",
  },
  {
    title: "希望 AI 自动解决一切经营问题",
    desc: "将 AI 视为魔法，期望不改动任何低效流程就能自动带来盈利的幻想法。",
  },
  {
    title: "只务虚讨论概念，不愿意动手验证",
    desc: "停留在 PPT 宏大叙事层级，不愿意从小场景做 MVP 验证与数据迭代的沟通。",
  },
];
