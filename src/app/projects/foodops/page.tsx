import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, GitFork, Sparkles, AlertTriangle } from "lucide-react";
import { siteConfig } from "@/data/site";
import { Button } from "@/components/ui/button";
import { ContactCta } from "@/components/home/contact-cta";

export const metadata: Metadata = {
  title: "FoodOps 旗舰案例复盘｜狗哥的 AI 商业实践",
  description:
    "FoodOps 深度案例复盘：从餐饮企业割裂问题出发，将营业、点评、营销与协同收敛为可落地的 AI 工作流。包含问题分析、架构设计与开源验证记录。",
  alternates: { canonical: `${siteConfig.url}/projects/foodops` },
};

const foodopsModules = [
  { name: "商家知识库 (RAG)", desc: "清洗整理招牌菜故事、菜单售卖点与常见 FAQ 向量库", status: "已完成", tagClass: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" },
  { name: "AI 营销文案生成", desc: "自动衍生朋友圈、小红书种草文与活动文案", status: "已完成", tagClass: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" },
  { name: "点评智能差评抚慰", desc: "美团/大众点评评价监控并自动推荐抚慰方案", status: "已完成", tagClass: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" },
  { name: "连锁今日智能工作台", desc: "每天早晨自动排序下发门店 3 件核心任务", status: "开发中", tagClass: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
  { name: "全渠道营销内容日历", desc: "可视化拖拽排期与多平台自动分发引擎", status: "开发中", tagClass: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
  { name: "活动策划与外卖素材", desc: "节日活动方案、团购套餐设计与海报文案联动", status: "计划中", tagClass: "bg-amber-500/10 text-amber-600 border-amber-500/20" },
  { name: "品牌信息与 SOP 管理", desc: "连锁门店服务流程与后厨标准管理中台", status: "计划中", tagClass: "bg-amber-500/10 text-amber-600 border-amber-500/20" },
];

export default function FoodopsDetailPage() {
  return (
    <>
      <article className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-20 md:py-24 space-y-16">
        {/* 返回按钮 */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm hover:opacity-70 transition-opacity"
          style={{ color: "var(--text-secondary)" }}
        >
          <ArrowLeft size={16} />
          返回全部项目
        </Link>

        {/* 01 头部信息卡 */}
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-extrabold bg-[var(--brand)] text-[var(--brand-foreground)]">
              FLAGSHIP CASE · 旗舰案例
            </span>
            <span className="text-xs font-mono px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 font-bold">
              持续迭代 / 开源验证
            </span>
            <span className="text-xs font-mono text-[var(--text-secondary)]">
              最后更新：2026年7月
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight" style={{ color: "var(--text-primary)" }}>
            FoodOps 深度案例复盘
          </h1>

          <p className="text-lg sm:text-xl font-bold text-[var(--brand)]">
            面向餐饮企业的 AI 运营与内容协同系统
          </p>

          <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] grid sm:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="font-bold text-[var(--text-secondary)]">项目形式：</span>
              <span className="font-bold text-[var(--text-primary)]">开源项目 / 产品实测验证</span>
            </div>
            <div>
              <span className="font-bold text-[var(--text-secondary)]">狗哥角色：</span>
              <span className="font-bold text-[var(--text-primary)]">产品定义、需求分析、流程设计、开发推进</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-[var(--brand)] text-[var(--brand-foreground)] font-bold text-sm flex items-center gap-2 shadow-md"
            >
              <GitFork size={18} /> 访问 GitHub 代码库
            </a>
            <Button href="/contact" variant="outline" size="lg">
              交流 FoodOps 项目
            </Button>
          </div>
        </div>

        {/* 封面大图 */}
        <div className="relative w-full aspect-[16/8] rounded-3xl overflow-hidden border-2 border-[var(--brand)] shadow-2xl">
          <Image
            src="/images/projects/foodops-cover.webp"
            alt="FoodOps 案例界面大图"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* 02 为什么做 FoodOps */}
        <section className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
            <Sparkles className="text-[var(--brand)]" size={24} />
            为什么做 FoodOps？
          </h2>
          <div className="p-6 rounded-3xl border border-[var(--border)] bg-[var(--surface)] space-y-3 leading-relaxed text-sm sm:text-base text-[var(--text-secondary)]">
            <p>
              长期服务餐饮商家并亲自下场进入经营一线后，我发现门店并不缺少软件工具，而是工具与人员之间彼此严重割裂。
            </p>
            <p>
              活动、营销内容、美团点评平台运营、顾客客情、产品信息和经营数据，往往分散在不同的人、手写表格、微信聊天记录和各类软件中。
            </p>
            <p className="font-bold text-[var(--text-primary)]">
              FoodOps 的出发点不是增加另一套复杂的软件系统，而是尝试减少重复工作，让信息真正进入日常经营流程。
            </p>
          </div>
        </section>

        {/* 03 发现的真实问题 */}
        <section className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: "var(--text-primary)" }}>
            经营一线发现的 6 大真实断点
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: "经营信息散落在多工具中", desc: "点评、POS、表格、微信群各自为政，数据无法汇聚。" },
              { title: "内容生产过度依赖个人经验", desc: "店长文案水平差异极大，活动推文难以持续标准化打动客户。" },
              { title: "活动执行难以沉淀复用", desc: "每次做节日促销都像重新开始，历史有效方案没有资产化。" },
              { title: "老板看不到过程与关键结果", desc: "总部只看月末报表，对每日客情与差评缺乏实时感知。" },
              { title: "员工重复整理与复制信息", desc: "店长每天花费 1-2 小时做核对粘贴工作，挤占服务时间。" },
              { title: "AI 工具与实际业务流程脱节", desc: "购买了通用 AI 账号但缺乏私有知识库，生成的内容充满套话。" },
            ].map((prob, idx) => (
              <div key={prob.title} className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--background)] space-y-1.5">
                <div className="flex items-center gap-2 text-sm font-bold text-red-500">
                  <AlertTriangle size={15} /> 断点 {idx + 1}: {prob.title}
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {prob.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 04 我的核心判断与 05 解决逻辑流程图 */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: "var(--text-primary)" }}>
            我的核心判断与 AI 落地逻辑流程图
          </h2>
          <div className="p-6 rounded-3xl border border-[var(--border)] bg-[var(--surface-muted)] space-y-6">
            <p className="text-sm sm:text-base font-bold text-[var(--brand)]">
              💡 餐饮企业需要的不是一个“什么都能做”的无聊 AI，而是一套能够理解门店私有信息、进入日常微信协同流程、并逐步产生明确结果的工作方式。
            </p>

            {/* 流程图 */}
            <div className="grid sm:grid-cols-5 gap-3 text-center text-xs font-mono font-bold">
              <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)]">
                1. 商家资料与知识库
              </div>
              <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)]">
                2. 场景任务与目标
              </div>
              <div className="p-3.5 rounded-xl border-2 border-[var(--brand)] bg-[var(--brand)] text-[var(--brand-foreground)] shadow-md">
                3. AI 内容与运营工作流
              </div>
              <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)]">
                4. 人工快速审核执行
              </div>
              <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)]">
                5. 结果记录与持续复盘
              </div>
            </div>
          </div>
        </section>

        {/* 06 产品核心模块状态表格 */}
        <section className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: "var(--text-primary)" }}>
            FoodOps 核心模块与开发状态 (不虚构功能)
          </h2>
          <div className="rounded-2xl border border-[var(--border)] overflow-hidden bg-[var(--surface)]">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[var(--surface-muted)] border-b border-[var(--border)] font-mono font-bold text-[var(--text-secondary)]">
                <tr>
                  <th className="p-4">模块名称</th>
                  <th className="p-4">功能与解决场景描述</th>
                  <th className="p-4 w-28">当前状态</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {foodopsModules.map((mod) => (
                  <tr key={mod.name} className="hover:bg-[var(--surface-muted)]/50 transition-colors">
                    <td className="p-4 font-bold text-[var(--text-primary)]">{mod.name}</td>
                    <td className="p-4 text-[var(--text-secondary)]">{mod.desc}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold border ${mod.tagClass}`}>
                        {mod.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 07 关键反思 */}
        <section className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: "var(--text-primary)" }}>
            FoodOps 项目关键反思
          </h2>
          <div className="p-6 rounded-3xl border-l-4 border-l-[var(--brand)] border border-[var(--border)] bg-[var(--surface)] space-y-3 leading-relaxed text-sm sm:text-base text-[var(--text-secondary)]">
            <p>
              做这个项目最大的挑战，从来不是调用更多或者更贵的模型，而是<strong>判断哪些真实痛点值得被做成产品</strong>。
            </p>
            <p>
              功能的数量不是真正进度；真实用户愿不愿意把工具用进日常经营流程，才是唯一的衡量进度。
            </p>
          </div>
        </section>

        {/* 行动入口 */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl border border-[var(--border)] bg-[var(--surface-muted)]">
          <div className="space-y-1">
            <h3 className="font-bold text-lg" style={{ color: "var(--text-primary)" }}>
              感兴趣或有类似餐饮/AI 需求？
            </h3>
            <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
              欢迎随时在 GitHub 参与贡献，或者与狗哥直接预约 30 分钟拆解沟通。
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-xs font-bold flex items-center gap-1.5"
            >
              <GitFork size={15} /> GitHub
            </a>
            <Button href="/contact" variant="primary" size="sm">
              预约沟通
            </Button>
          </div>
        </div>
      </article>

      <ContactCta />
    </>
  );
}
