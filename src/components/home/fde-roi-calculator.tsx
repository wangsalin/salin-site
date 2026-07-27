"use client";

import { useState } from "react";
import { Calculator, TrendingUp, Clock, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FdeRoiCalculator() {
  const [employees, setEmployees] = useState(5);
  const [salary, setSalary] = useState(8000);
  const [hoursPerDay, setHoursPerDay] = useState(2.0);

  // 计算公式
  const hourlyRate = Math.round(salary / 176); // 按照每月 22 天 * 8 小时 = 176 小时计算
  const dailySavedHours = employees * hoursPerDay * 0.7; // 预估按 70% 自动化替代率计算
  const annualSavedHours = Math.round(dailySavedHours * 22 * 12);
  const annualCostSaved = Math.round(annualSavedHours * hourlyRate);
  const fdeDaysEstimate = Math.min(14, Math.max(5, Math.round(employees * 1.2)));
  const estimatedImplementationCost = fdeDaysEstimate * 2500; // 预估驻场费用基准
  const roiMultiplier = (annualCostSaved / Math.max(1, estimatedImplementationCost)).toFixed(1);

  return (
    <section className="py-12 sm:py-20 md:py-32 border-t border-[var(--border)] relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="max-w-2xl mb-8 sm:mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="p-1.5 rounded-md bg-[var(--accent)] text-[var(--accent-foreground)]">
              <Calculator size={16} />
            </span>
            <span className="text-xs font-bold tracking-widest uppercase text-[var(--brand)]">
              INTERACTIVE ROI CALCULATOR
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-3 sm:mb-4" style={{ color: "var(--text-primary)" }}>
            FDE 驻场企业 AI 落地收益计算器
          </h2>
          <p className="text-sm sm:text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            拖动下方滑动条，实时算一算如果采用 FDE (前向部署工程师) 模式将重复琐碎流程自动化，您的团队每年能省下多少时间与薪酬成本。
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6 sm:gap-8 items-stretch">
          {/* 左侧控制滑块卡片 */}
          <div className="p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-lg space-y-6 sm:space-y-8">
            {/* 滑块 1: 员工人数 */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                  <span>关联核心岗位员工人数</span>
                </label>
                <span className="text-lg font-mono font-extrabold px-3 py-1 rounded-lg bg-[var(--surface-muted)] text-[var(--brand)]">
                  {employees} 人
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                value={employees}
                onChange={(e) => setEmployees(Number(e.target.value))}
                className="w-full h-2 bg-[var(--surface-muted)] rounded-lg appearance-none cursor-pointer accent-[var(--brand)]"
              />
              <div className="flex justify-between text-[11px]" style={{ color: "var(--text-secondary)" }}>
                <span>1 人 (单店/微型)</span>
                <span>25 人 (中型团队)</span>
                <span>50 人 (多店/企业)</span>
              </div>
            </div>

            {/* 滑块 2: 平均月薪 */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                  <span>岗位平均月薪 (含社保福利)</span>
                </label>
                <span className="text-lg font-mono font-extrabold px-3 py-1 rounded-lg bg-[var(--surface-muted)] text-[var(--brand)]">
                  ¥ {salary.toLocaleString()} 元/月
                </span>
              </div>
              <input
                type="range"
                min="4000"
                max="30000"
                step="500"
                value={salary}
                onChange={(e) => setSalary(Number(e.target.value))}
                className="w-full h-2 bg-[var(--surface-muted)] rounded-lg appearance-none cursor-pointer accent-[var(--brand)]"
              />
              <div className="flex justify-between text-[11px]" style={{ color: "var(--text-secondary)" }}>
                <span>¥ 4,000</span>
                <span>¥ 15,000</span>
                <span>¥ 30,000</span>
              </div>
            </div>

            {/* 滑块 3: 每日重复工时 */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                  <span>每人每日重复杂务工时 (复制/核对/整理)</span>
                </label>
                <span className="text-lg font-mono font-extrabold px-3 py-1 rounded-lg bg-[var(--surface-muted)] text-[var(--brand)]">
                  {hoursPerDay.toFixed(1)} 小时/天
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max="5.0"
                step="0.5"
                value={hoursPerDay}
                onChange={(e) => setHoursPerDay(Number(e.target.value))}
                className="w-full h-2 bg-[var(--surface-muted)] rounded-lg appearance-none cursor-pointer accent-[var(--brand)]"
              />
              <div className="flex justify-between text-[11px]" style={{ color: "var(--text-secondary)" }}>
                <span>0.5 小时 (偶尔杂务)</span>
                <span>2.5 小时 (中度重复)</span>
                <span>5.0 小时 (重度繁琐)</span>
              </div>
            </div>
          </div>

          {/* 右侧实时收益仪表板 */}
          <div className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl border-2 border-[var(--brand)] bg-[var(--brand)] text-[var(--brand-foreground)] shadow-2xl relative overflow-hidden space-y-5 sm:space-y-6">
            <div className="flex justify-between items-center border-b border-[var(--brand-foreground)]/20 pb-4">
              <span className="text-xs font-bold uppercase tracking-widest opacity-80">预估降本增效仪表盘</span>
              <span className="text-xs px-2.5 py-1 rounded-full font-extrabold bg-[var(--accent)] text-[var(--accent-foreground)] flex items-center gap-1 shrink-0">
                <Sparkles size={12} /> ROI {roiMultiplier} 倍
              </span>
            </div>

            {/* 核心数字 1: 每年节省薪酬成本 */}
            <div>
              <p className="text-xs font-semibold uppercase opacity-75 mb-1">每年可为您直接节省的薪酬成本</p>
              <div className="text-3xl sm:text-5xl font-extrabold tracking-tight font-mono text-[var(--accent)]">
                ¥ {annualCostSaved.toLocaleString()}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[var(--brand-foreground)]/20">
              {/* 核心数字 2: 每年节省总工时 */}
              <div>
                <p className="text-xs font-semibold opacity-75 mb-1 flex items-center gap-1">
                  <Clock size={13} /> 每年释放时间
                </p>
                <p className="text-2xl font-extrabold font-mono">{annualSavedHours.toLocaleString()} 小时</p>
              </div>

              {/* 核心数字 3: 驻场开发周期 */}
              <div>
                <p className="text-xs font-semibold opacity-75 mb-1 flex items-center gap-1">
                  <TrendingUp size={13} /> 预估 FDE 驻场周期
                </p>
                <p className="text-2xl font-extrabold font-mono">{fdeDaysEstimate} 个工作日</p>
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--brand-foreground)]/20">
              <Button href="/contact" variant="accent" size="lg" className="w-full justify-center">
                预约 FDE 工程师现场诊断
                <ArrowRight size={18} />
              </Button>
              <p className="text-[11px] text-center mt-3 opacity-70">
                * 计算基于 70% 的流程自动化替代率与行业平均时薪测算，具体以现场诊断为准。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
