"use client";

import { useState } from "react";
import { Sparkles, Terminal, Play, RefreshCw, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/cn";

const sampleScenarios = [
  {
    id: "review-1",
    label: "餐饮点评差评回复",
    type: "餐饮点评",
    inputText: "今天和朋友去吃水煮鱼，整整等了快 40 分钟才上菜！而且鱼肉有点偏咸，叫服务员加米饭叫了三次才送过来，真的太失望了！",
    stars: 2,
    outputReply: "这位客官实在对不住！今天用餐高峰期后厨为了保证活鱼现点现杀现做，确实让您久等了，这真不应该！至于水煮鱼偏咸的问题，掌柜我已经记下，今晚就跟厨师长调整料汁配比。咱做餐饮讲的就是真诚，大叔私信送您一张 20 元无门槛卷，下次来提前找大叔，我亲自在后厨盯为您安排！",
    sentiment: "情绪高负面 (85%) · 上菜慢+咸",
    tags: ["得体致歉", "诚恳解释", "代金券抚慰"]
  },
  {
    id: "review-2",
    label: "美容院护理回访",
    type: "美业关怀",
    inputText: "顾客李姐，3 天前做了【水光补水项目】，今日需要进行第 3 天吸收情况回访。",
    stars: 5,
    outputReply: "李姐早安呀！今天是您做完水光深层补水的第 3 天，刚好是皮肤营养吸收的最佳代谢期~ 您摸摸脸是不是感觉水润度提高了很多？今天记得多喝水、防晒涂够。如果有任何皮肤泛红或疑问，随时微信问我哦！",
    sentiment: "正向服务关怀 · 21天周期节点",
    tags: ["21天生命周期", "无推销感", "护理师人设"]
  },
  {
    id: "review-3",
    label: "小红书爆款文案生成",
    type: "营销文案",
    inputText: "门店：蜀味轩，招牌：毛血旺，活动：立秋双人套餐 5 折，城市：临沂",
    stars: 5,
    outputReply: "疯狂安利！在临沂我不允许还有人没吃过蜀味轩的毛血旺😭！吸满红油辣汁的鸭血跟毛肚，一口咬下去真的香迷糊了！立秋限定双人餐居然直接 5 折！手慢无，快带上对象/闺蜜冲！地址在天元大厦负一层！ #临沂美食 #蜀味轩 #毛血旺 #周末去哪儿",
    sentiment: "小红书爆款种草 · 高转化率",
    tags: ["感官描写", "限时饥饿感", "防封规则"]
  }
];

export function AiPlaygroundSimulator() {
  const [selectedScenario, setSelectedScenario] = useState(sampleScenarios[0]);
  const [customInput, setCustomInput] = useState(sampleScenarios[0].inputText);
  const [isGenerating, setIsGenerating] = useState(false);
  const [displayedOutput, setDisplayedOutput] = useState(sampleScenarios[0].outputReply);

  function handleSelect(sc: typeof sampleScenarios[0]) {
    setSelectedScenario(sc);
    setCustomInput(sc.inputText);
    setDisplayedOutput(sc.outputReply);
  }

  function handleRunSimulation() {
    setIsGenerating(true);
    setDisplayedOutput("");
    let currentText = "";
    const targetText = selectedScenario.outputReply;
    let i = 0;

    const interval = setInterval(() => {
      if (i < targetText.length) {
        currentText += targetText[i];
        setDisplayedOutput(currentText);
        i++;
      } else {
        clearInterval(interval);
        setIsGenerating(false);
      }
    }, 15);
  }

  return (
    <section className="py-24 md:py-32 border-t border-[var(--border)]" style={{ background: "var(--surface)" }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="p-1.5 rounded-md bg-[var(--accent)] text-[var(--accent-foreground)]">
              <Sparkles size={16} />
            </span>
            <span className="text-xs font-bold tracking-widest uppercase text-[var(--brand)]">
              LIVE AGENT PLAYGROUND
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4" style={{ color: "var(--text-primary)" }}>
            AI 垂直场景回复 & 文案生成模拟器
          </h2>
          <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            挑选一个真实业务场景，点击“实时生成”亲自体验 AI Agent 如何摆脱套话，生成兼具人情味、专业度与高转化率的定制文本。
          </p>
        </div>

        {/* 交互核心面板 */}
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* 左侧：选择与输入卡片 */}
          <div className="p-6 md:p-8 rounded-3xl border border-[var(--border)] bg-[var(--background)] flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <label className="text-sm font-bold block" style={{ color: "var(--text-primary)" }}>
                选择预设真实场景：
              </label>
              <div className="flex flex-wrap gap-2">
                {sampleScenarios.map((sc) => (
                  <button
                    key={sc.id}
                    onClick={() => handleSelect(sc)}
                    className={cn(
                      "px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border",
                      selectedScenario.id === sc.id
                        ? "bg-[var(--brand)] text-[var(--brand-foreground)] border-[var(--brand)]"
                        : "bg-[var(--surface)] text-[var(--text-secondary)] border-[var(--border)] hover:border-[var(--brand)]"
                    )}
                  >
                    {sc.label}
                  </button>
                ))}
              </div>

              <div className="pt-2 space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] flex justify-between">
                  <span>输入业务原文 / 指令</span>
                  <span>{selectedScenario.type}</span>
                </label>
                <textarea
                  rows={4}
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  className="w-full p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-sm font-medium focus:outline-none focus:border-[var(--brand)] transition-colors resize-none"
                  style={{ color: "var(--text-primary)" }}
                />
              </div>
            </div>

            <button
              onClick={handleRunSimulation}
              disabled={isGenerating}
              className="w-full py-3.5 px-6 rounded-xl font-bold bg-[var(--brand)] text-[var(--brand-foreground)] hover:opacity-90 transition-opacity flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <RefreshCw size={16} className="animate-spin" />
                  AI Agent 正在实时推理生成中...
                </>
              ) : (
                <>
                  <Play size={16} />
                  实时运行 Agent 模拟生成
                </>
              )}
            </button>
          </div>

          {/* 右侧：代码与回复渲染输出终端 */}
          <div className="p-6 md:p-8 rounded-3xl border border-slate-800 bg-slate-950 text-slate-100 flex flex-col justify-between space-y-6 shadow-2xl relative">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                  <Terminal size={15} />
                  <span>Agent Output Terminal</span>
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono">
                  {selectedScenario.sentiment}
                </span>
              </div>

              <div className="min-h-[160px] text-sm leading-relaxed font-mono p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-200">
                {displayedOutput ? (
                  <p>{displayedOutput}</p>
                ) : (
                  <span className="text-slate-500 italic">点击左侧“实时运行”按钮查看 Agent 生成结果...</span>
                )}
              </div>

              {/* 调性与逻辑亮点标签 */}
              <div className="space-y-2">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Agent 策略逻辑判定标签：</p>
                <div className="flex flex-wrap gap-2">
                  {selectedScenario.tags.map((t) => (
                    <span key={t} className="text-xs px-2.5 py-1 rounded bg-slate-800 text-emerald-300 font-mono border border-slate-700 flex items-center gap-1">
                      <CheckCircle2 size={12} /> {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 pt-3 border-t border-slate-800 flex justify-between items-center font-mono">
              <span>模型: GPT-4o-mini / DeepSeek精调</span>
              <span>响应时效: 0.8秒</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
