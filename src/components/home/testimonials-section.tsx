"use client";

import { Quote, Star, CheckCircle2 } from "lucide-react";

const testimonials = [
  {
    quote:
      "Salin 驻场 5 天就把我们 6 家连锁店的大众点评差评给拦截并得体抚慰了。过去各店店长回复得五花八门，现在每天早晨 AI 自动生成包含人情味与补偿建议的方案，各店评分一个月内全部回升到了 4.8 分以上！",
    author: "张总",
    role: "临沂某知名连锁餐饮品牌创始人",
    metric: "好评率回升至 4.8+",
    tag: "餐饮连锁 FDE",
    highlight: "好评防御与连锁协同"
  },
  {
    quote:
      "最让我惊喜的是 FDE 工程师直接坐在我们美容院店长旁边跟班！没有搞那些虚无缥缈的软件大系统，而是直接在企微群里调教了一个‘21 天客户护理回访助手’，老客复购率直接拉提升了 18%！",
    author: "李院长",
    role: "悦颜皮肤管理连锁机构负责人",
    metric: "老客复购率 +18%",
    tag: "美业 SaaS FDE",
    highlight: "无压迫感关怀"
  },
  {
    quote:
      "我们做传统快消批发的，本来觉得 AI 离我们太远。Salin 驻场把我们 500 多种商品规格和报价整理成了向量知识库，现在员工在微信群里输入菜品规格，AI 3 秒钟就能给出准确报价，再也不用翻厚账本了！",
    author: "王总",
    role: "鲁南某食品供应链企业总经理",
    metric: "报价效率缩短 90%",
    tag: "供应链知识库 FDE",
    highlight: "私有知识库"
  }
];

export function TestimonialsSection() {
  return (
    <section className="py-24 md:py-32 border-t border-[var(--border)] relative overflow-hidden bg-grid-pattern">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="p-1.5 rounded-md bg-[var(--accent)] text-[var(--accent-foreground)]">
              <Quote size={16} />
            </span>
            <span className="text-xs font-bold tracking-widest uppercase text-[var(--brand)]">
              CLIENT TESTIMONIALS
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4" style={{ color: "var(--text-primary)" }}>
            来自企业现场的真实声音
          </h2>
          <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            最好的交付不是交出一堆冷冰冰的代码，而是看合作企业的管理者与一线员工在实际工作中收获了怎样的改变。
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-3xl border border-[var(--border)] bg-[var(--surface)] glass-card-hover flex flex-col justify-between"
            >
              <div>
                {/* 5 星评价与标签 */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>
                  <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[var(--brand)] text-[var(--brand-foreground)]">
                    {item.tag}
                  </span>
                </div>

                {/* 证言内容 */}
                <p className="text-sm leading-relaxed mb-6 italic" style={{ color: "var(--text-primary)" }}>
                  “{item.quote}”
                </p>
              </div>

              {/* 底部作者与指标 */}
              <div className="pt-4 border-t border-[var(--border)] space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
                      {item.author}
                    </h4>
                    <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                      {item.role}
                    </p>
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg">
                  <CheckCircle2 size={13} /> {item.metric}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
