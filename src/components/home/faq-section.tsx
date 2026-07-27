"use client";

import { useState } from "react";
import { HelpCircle, ChevronDown, ShieldCheck, Lock, Users, Sparkles } from "lucide-react";
import { cn } from "@/lib/cn";

const faqs = [
  {
    question: "FDE 驻场落地模式适合什么规模的企业？",
    answer:
      "主要面向拥有 5-200 人规模的实体企业、连锁餐饮品牌、美业连锁以及快消供应链公司。核心要求是：企业内部存在高频、重复、基于文字/表格/对话的文本型断点流程（如报价回复、差评处理、客情关怀、知识库检索）。",
    icon: HelpCircle
  },
  {
    question: "驻场开发过程中，企业的商业机密与私有数据安全如何保证？",
    answer:
      "我们严格遵守数据安全准则。在驻场前签订法律生效的保密协议 (NDA)。所有企业私有文档的向量化与 RAG 知识库均部署在企业控制的独立隔离空间中，严格杜绝向第三方模型公网透露任何核心敏感经营数据。",
    icon: Lock
  },
  {
    question: "如果企业员工文化水平不高、学不会复杂的 AI 工具怎么办？",
    answer:
      "这恰恰是 FDE 模式的最大优势！我们坚决反对强迫员工学习新系统的‘反人性设计’。所有的 AI Agent 工具均无缝嵌入至企业现有微信群、钉钉或企微中。员工只需像平时发微信一样@AI助手即可，无需安装新软件，上手零门槛。",
    icon: Users
  },
  {
    question: "FDE 驻场服务结束后，后续有系统维护与优化保障吗？",
    answer:
      "我们提供‘1-2周现场敏捷开发 + 30天线上陪跑守护’支持。当大模型底层 API 更新或企业新增产品 SOP 时，我们将提供免费的 Prompt 微调与知识库扩增更新服务，确保系统长期稳定运行。",
    icon: ShieldCheck
  },
  {
    question: "FDE 驻场服务的合作流程与收费标准是怎样的？",
    answer:
      "流程分为：1) 线上初步沟通与意向确认；2) 签订合同与确定驻场排期；3) 1-2 周现场跟班诊断与敏捷开发；4) 员工陪跑与量化 ROI 验收。收费采用按项目阶段与量化目标验收的方式，绝不开出模糊预算。",
    icon: Sparkles
  }
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 md:py-32 border-t border-[var(--border)]" style={{ background: "var(--surface)" }}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="p-1.5 rounded-md bg-[var(--accent)] text-[var(--accent-foreground)]">
              <HelpCircle size={16} />
            </span>
            <span className="text-xs font-bold tracking-widest uppercase text-[var(--brand)]">
              FREQUENTLY ASKED QUESTIONS
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4" style={{ color: "var(--text-primary)" }}>
            常见问题与 FDE 驻场答疑
          </h2>
          <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            关于企业 AI 驻场落地、数据安全、员工培训与合作模式的常见疑问解答。
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const IconComponent = faq.icon;
            return (
              <div
                key={idx}
                className={cn(
                  "rounded-2xl border transition-all duration-200 overflow-hidden",
                  isOpen
                    ? "border-[var(--brand)] bg-[var(--background)] shadow-md"
                    : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--brand)]"
                )}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="p-2 rounded-xl bg-[var(--surface-muted)] text-[var(--brand)] shrink-0">
                      <IconComponent size={18} />
                    </span>
                    <h3 className="text-base sm:text-lg font-bold" style={{ color: "var(--text-primary)" }}>
                      {faq.question}
                    </h3>
                  </div>
                  <ChevronDown
                    size={20}
                    className={cn(
                      "text-[var(--text-secondary)] transition-transform duration-300 shrink-0",
                      isOpen && "rotate-180 text-[var(--brand)]"
                    )}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-sm leading-relaxed border-t border-[var(--border)]/50" style={{ color: "var(--text-secondary)" }}>
                    <p className="pl-11">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
