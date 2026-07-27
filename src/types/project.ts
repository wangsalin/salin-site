export type ProjectCategory =
  | "ai-product"
  | "restaurant-business"
  | "content-tool"
  | "brand-project";

export type ProjectStatus =
  | "开发中"
  | "内部验证"
  | "概念验证"
  | "持续迭代"
  | "已开源";

export type Project = {
  name: string;
  slug: string;
  subtitle: string;
  summary: string;
  description: string;
  category: ProjectCategory;
  status: ProjectStatus;
  year: string;
  role: string[];
  cover: string;
  logo?: string;
  gallery?: string[];
  technologies?: string[];
  featured: boolean;
  problem: string[];
  insight: string[];
  solution: string[];
  modules: {
    title: string;
    description: string;
  }[];
  progress: string;
  learnings: string[];
  externalUrl?: string;
  githubUrl?: string;
  lastUpdated: string;
};
