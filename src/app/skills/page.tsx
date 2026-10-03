"use client";

import { useState } from "react";
import { Download, Copy, Check, Terminal, FolderArchive, Folder, FileText, Search, FileCode, ArrowUpRight, Sparkles } from "lucide-react";
import { skillsData, skillCategories, SkillItem } from "@/data/skills";
import { cn } from "@/lib/cn";

export default function SkillsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredSkills = skillsData.filter((skill) => {
    const matchesCategory = activeCategory === "all" || skill.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  function handleCopySnippet(id: string, text: string) {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  function handleDownloadZip(skill: SkillItem) {
    const link = document.createElement("a");
    link.href = skill.fileUrl;
    link.download = `${skill.slug}.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-20 md:py-28 overflow-hidden">
      {/* Background ambient glows */}
      <div 
        className="pointer-events-none absolute -top-40 right-20 w-[500px] h-[500px] rounded-full blur-[140px] opacity-25 dark:opacity-15"
        style={{ background: "radial-gradient(circle, var(--brand), transparent 70%)" }}
        aria-hidden="true"
      />
      <div 
        className="pointer-events-none absolute top-1/3 -left-40 w-[500px] h-[500px] rounded-full blur-[140px] opacity-20 dark:opacity-10"
        style={{ background: "radial-gradient(circle, var(--accent), transparent 70%)" }}
        aria-hidden="true"
      />

      {/* 头部标题区 */}
      <div className="relative max-w-3xl mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase mb-6 bg-[var(--brand)]/10 text-[var(--brand)] border border-[var(--brand)]/20 shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand)] animate-pulse" />
          MULTI-FILE AGENT SKILL PACKAGES
        </div>
        
        <h1
          className="text-3xl sm:text-5xl md:text-6xl font-black leading-[1.15] tracking-tight mb-6 text-[var(--text-primary)]"
          style={{ letterSpacing: "-0.03em" }}
        >
          AI Agent 多文件技能包与 SOP 下载中心
        </h1>
        
        <p className="text-base sm:text-lg leading-relaxed text-[var(--text-secondary)] font-normal">
          AI Agent 的技能（Skill）不是单一的文本，而是包含配置文件、场景 Prompt、工具代码、测试用例与 SOP 指南的完整多文件工作包。所有技能包均提供解压即用的 <strong className="text-[var(--text-primary)] font-bold">.ZIP 源码压缩包下载</strong>。
        </p>

        {/* 狗哥资源库联动 Banner */}
        <div className="mt-8 p-6 rounded-3xl border border-emerald-500/20 bg-gradient-to-r from-emerald-500/10 via-[var(--surface-glass)] to-emerald-500/5 backdrop-blur-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-lg shadow-emerald-950/5">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[var(--brand)] text-[var(--brand-foreground)]">
                网盘精选
              </span>
              <span className="text-sm sm:text-base font-bold text-[var(--text-primary)]">
                寻找更多前沿 AI 工具、提示词与商业效率模板？
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
              欢迎前往【<strong>狗哥资源库</strong>】(主域名: zl.eyu.ink / 备用: ziliaoku.fun)，已精选收录 2,400+ 份夸克与百度网盘优质资源，100% 免密极速转存。
            </p>
          </div>
          <a
            href="https://zl.eyu.ink"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-full text-xs font-semibold bg-[var(--brand)] text-[var(--brand-foreground)] hover:opacity-90 transition-opacity shrink-0 inline-flex items-center gap-1.5 shadow-md shadow-emerald-500/20"
          >
            <span>访问狗哥资源库</span>
            <ArrowUpRight size={13} />
          </a>
        </div>
      </div>

      {/* 实时搜索与分类筛选控制栏 */}
      <div className="relative space-y-6 mb-12 border-b border-[var(--border-glass)] pb-8">
        {/* 搜索框 */}
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={17} />
          <input
            type="text"
            placeholder="搜索技能包名称、标签或场景关键词..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-14 py-3 rounded-2xl border border-[var(--border-glass)] bg-[var(--surface-glass)] text-sm font-medium focus:outline-none focus:border-[var(--brand)] focus:ring-2 focus:ring-emerald-500/20 backdrop-blur-md transition-all text-[var(--text-primary)]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            >
              清除
            </button>
          )}
        </div>

        {/* 分类标签页 */}
        <div className="flex flex-wrap gap-2">
          {skillCategories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={cn(
                "px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer backdrop-blur-md",
                activeCategory === cat.value
                  ? "bg-[var(--brand)] text-[var(--brand-foreground)] font-bold shadow-md shadow-emerald-500/20"
                  : "bg-[var(--surface-glass)] border border-[var(--border-glass)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--brand)]/30"
              )}
            >
              <span>{cat.label}</span>
              {cat.value !== "all" && (
                <span className="ml-1.5 text-xs opacity-75 font-mono">
                  ({skillsData.filter((s) => s.category === cat.value).length})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 技能卡片列表 */}
      {filteredSkills.length === 0 ? (
        <div className="p-14 text-center rounded-3xl border border-[var(--border-glass)] bg-[var(--surface-glass)] backdrop-blur-xl my-8">
          <p className="text-lg font-bold mb-2 text-[var(--text-primary)]">未找到匹配的技能包</p>
          <p className="text-sm text-[var(--text-secondary)]">尝试更换搜索词或选择“全部技能包”分类</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className="relative p-7 sm:p-8 rounded-3xl border border-[var(--border-glass)] bg-[var(--surface-glass)] backdrop-blur-xl flex flex-col justify-between hover:border-[var(--brand)]/40 hover:bg-[var(--surface-elevated)]/80 hover:shadow-2xl transition-all duration-300 group"
            >
              <div>
                {/* 卡片头部标记 */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-3 py-1 rounded-full font-bold bg-[var(--brand)] text-[var(--brand-foreground)] shadow-2xs">
                      {skill.categoryLabel}
                    </span>
                    <span className="text-xs font-mono px-2.5 py-0.5 rounded-full border border-[var(--border-glass)] bg-[var(--surface)] text-[var(--text-secondary)]">
                      {skill.version}
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 flex items-center gap-1">
                      <FolderArchive size={12} /> .ZIP
                    </span>
                  </div>
                  <span className="text-xs font-mono text-[var(--text-muted)]">
                    下载 {skill.downloadCount} 次
                  </span>
                </div>

                {/* 标题与描述 */}
                <h2 className="text-xl sm:text-2xl font-black mb-1.5 text-[var(--text-primary)] group-hover:text-[var(--brand)] transition-colors tracking-tight">
                  {skill.name}
                </h2>
                <p className="text-xs sm:text-sm font-semibold mb-3 text-[var(--brand)]">
                  {skill.subtitle}
                </p>
                <p className="text-xs sm:text-sm leading-relaxed mb-5 text-[var(--text-secondary)] line-clamp-3 font-normal">
                  {skill.description}
                </p>

                {/* 包内包含的文件清单 preview */}
                <div className="p-4 rounded-2xl border border-[var(--border-glass)] bg-[var(--surface)] mb-6 space-y-2 shadow-2xs">
                  <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2.5 flex items-center gap-1.5">
                    <Folder size={13} className="text-[var(--brand)]" />
                    <span>解压后包内文件结构 ({skill.fileStructure.length})</span>
                  </p>
                  {skill.fileStructure.slice(0, 4).map((file, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-mono text-[var(--text-primary)]">
                      <FileText size={13} className="text-[var(--text-muted)] shrink-0" />
                      <span className="truncate">{file}</span>
                    </div>
                  ))}
                  {skill.fileStructure.length > 4 && (
                    <p className="text-[11px] text-[var(--text-muted)] pt-1 italic font-mono">
                      …及另外 {skill.fileStructure.length - 4} 个工具与配置文件
                    </p>
                  )}
                </div>
              </div>

              {/* 卡片底部操作按钮 */}
              <div>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {skill.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] font-mono px-2.5 py-0.5 rounded-md border border-[var(--border-glass)] bg-[var(--surface)] text-[var(--text-secondary)]"
                    >
                      #{t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2.5 pt-4 border-t border-[var(--border-glass)]">
                  <button
                    onClick={() => { setSelectedSkill(skill); setSelectedFileIndex(0); }}
                    className="flex-1 inline-flex items-center justify-center gap-2 text-xs font-semibold py-2.5 px-3.5 rounded-full border border-[var(--border-glass)] bg-[var(--surface)] hover:border-[var(--brand)]/30 hover:text-[var(--brand)] transition-colors cursor-pointer text-[var(--text-primary)]"
                  >
                    <Terminal size={14} />
                    <span>预览目录树与架构</span>
                  </button>
                  <button
                    onClick={() => handleDownloadZip(skill)}
                    className="inline-flex items-center gap-2 text-xs font-semibold py-2.5 px-4 rounded-full bg-[var(--brand)] text-[var(--brand-foreground)] hover:opacity-90 shadow-md shadow-emerald-500/20 transition-all cursor-pointer shrink-0"
                  >
                    <Download size={14} />
                    <span>下载 .ZIP</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 代码与目录预览 Drawer / Modal */}
      {selectedSkill && (
        <div
          className="fixed inset-0 z-[var(--z-modal)] bg-black/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedSkill(null)}
        >
          <div
            className="w-full max-w-3xl bg-slate-950/95 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl backdrop-blur-2xl overflow-hidden flex flex-col max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
              <div className="flex items-center gap-2.5">
                <FolderArchive className="text-emerald-400" size={19} />
                <h3 className="font-bold text-sm sm:text-base text-slate-100">{selectedSkill.name}</h3>
              </div>
              <button
                onClick={() => setSelectedSkill(null)}
                className="text-slate-400 hover:text-white text-xs font-mono px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
              >
                ESC
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto font-mono text-xs leading-relaxed space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-2 text-slate-400 border-b border-slate-800 pb-3 text-xs">
                <span>包架构: 多文件 .ZIP 源码架构</span>
                <span>更新日期: {selectedSkill.updatedAt}</span>
              </div>

              {/* 交互文件 Tab 切换器 */}
              <div>
                <p className="text-slate-200 font-bold mb-3 font-sans text-sm flex items-center gap-2">
                  <FileCode size={16} className="text-emerald-400" /> 包内模块文件列表:
                </p>
                <div className="flex flex-wrap gap-2 bg-slate-900/80 p-2.5 rounded-2xl border border-slate-800">
                  {selectedSkill.fileStructure.map((file, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedFileIndex(idx)}
                      className={cn(
                        "px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5",
                        selectedFileIndex === idx
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold"
                          : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                      )}
                    >
                      <FileText size={12} />
                      {file.split(" ")[0]}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-slate-200 font-bold mb-3 font-sans text-sm">📁 多文件架构目录树预览:</p>
                <pre className="bg-slate-900/90 p-4 sm:p-5 rounded-2xl border border-slate-800 overflow-x-auto text-emerald-300/90 font-mono text-xs">
                  <code>{selectedSkill.codeSnippet}</code>
                </pre>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="px-6 py-4 border-t border-slate-800 bg-slate-900/60 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-slate-400 self-start sm:self-center">完整源码包开源可商用</span>
              <div className="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto">
                <button
                  onClick={() => handleCopySnippet(selectedSkill.id, selectedSkill.codeSnippet)}
                  className="inline-flex items-center justify-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-full border border-slate-700 hover:bg-slate-800 text-slate-200 transition-colors cursor-pointer w-full sm:w-auto"
                >
                  {copiedId === selectedSkill.id ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  <span>{copiedId === selectedSkill.id ? "已复制目录树" : "复制目录树"}</span>
                </button>
                <button
                  onClick={() => handleDownloadZip(selectedSkill)}
                  className="inline-flex items-center justify-center gap-2 text-xs font-semibold px-5 py-2.5 rounded-full bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition-colors cursor-pointer w-full sm:w-auto shadow-md shadow-emerald-500/30"
                >
                  <Download size={14} />
                  <span>下载 .ZIP 技能源码包</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
