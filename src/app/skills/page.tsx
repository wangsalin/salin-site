"use client";

import { useState } from "react";
import { Download, Copy, Check, Terminal, FolderArchive, Folder, FileText, Search, FileCode } from "lucide-react";
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
    <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-24">
      {/* 头部标题区 */}
      <div className="max-w-3xl mb-12">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] animate-pulse" />
          <span
            className="text-xs font-extrabold tracking-widest uppercase"
            style={{ color: "var(--brand)" }}
          >
            MULTI-FILE AGENT SKILL PACKAGES
          </span>
        </div>
        <h1
          className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4"
          style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}
        >
          AI Agent 多文件技能包与 SOP 下载中心
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          AI Agent 的技能（Skill）不是单一的文本，而是包含配置文件、场景 Prompt、工具代码、测试用例与 SOP 指南的完整多文件工作包。所有技能包均提供解压即用的 <strong style={{ color: "var(--text-primary)" }}>.ZIP 源码压缩包下载</strong>。
        </p>
      </div>

      {/* 实时搜索与分类筛选控制栏 */}
      <div className="space-y-6 mb-12 border-b border-[var(--border)] pb-8">
        {/* 搜索框 */}
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" size={18} />
          <input
            type="text"
            placeholder="搜索技能包名称、标签或场景关键词..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] text-sm font-medium focus:outline-none focus:border-[var(--brand)] transition-all"
            style={{ color: "var(--text-primary)" }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
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
                "px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer",
                activeCategory === cat.value
                  ? "bg-[var(--brand)] text-[var(--brand-foreground)] font-bold shadow-sm"
                  : "bg-[var(--surface)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-muted)]"
              )}
            >
              {cat.label}
              {cat.value !== "all" && (
                <span className="ml-2 text-xs opacity-70">
                  ({skillsData.filter((s) => s.category === cat.value).length})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 技能卡片列表 */}
      {filteredSkills.length === 0 ? (
        <div className="p-12 text-center rounded-3xl border border-[var(--border)] bg-[var(--surface)] my-8">
          <p className="text-lg font-bold mb-2" style={{ color: "var(--text-primary)" }}>未找到匹配的技能包</p>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>尝试更换搜索词或选择“全部技能包”分类</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] flex flex-col justify-between hover:border-[var(--brand)] transition-all duration-200"
            >
              <div>
                {/* 卡片头部标记 */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-[var(--brand)] text-[var(--brand-foreground)]"
                    >
                      {skill.categoryLabel}
                    </span>
                    <span
                      className="text-xs font-mono px-2 py-0.5 rounded border border-[var(--border)]"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {skill.version}
                    </span>
                    <span
                      className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 flex items-center gap-1"
                    >
                      <FolderArchive size={12} /> .ZIP 多文件包
                    </span>
                  </div>
                  <span className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
                    下载 {skill.downloadCount} 次
                  </span>
                </div>

                {/* 标题与描述 */}
                <h2 className="text-xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>
                  {skill.name}
                </h2>
                <p className="text-xs font-semibold mb-3 text-[var(--brand)]">
                  {skill.subtitle}
                </p>
                <p className="text-sm leading-relaxed mb-4 line-clamp-3" style={{ color: "var(--text-secondary)" }}>
                  {skill.description}
                </p>

                {/* 包内包含的文件清单 preview */}
                <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--background)] mb-5 space-y-1.5">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-2 flex items-center gap-1">
                    <Folder size={12} className="text-[var(--brand)]" /> 解压后包内文件结构 ({skill.fileStructure.length})
                  </p>
                  {skill.fileStructure.slice(0, 4).map((file, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-mono text-[var(--text-primary)]">
                      <FileText size={12} className="text-[var(--text-secondary)] shrink-0" />
                      <span className="truncate">{file}</span>
                    </div>
                  ))}
                  {skill.fileStructure.length > 4 && (
                    <p className="text-[11px] text-[var(--text-secondary)] pt-1 italic">
                      …及另外 {skill.fileStructure.length - 4} 个工具与配置文件
                    </p>
                  )}
                </div>
              </div>

              {/* 卡片底部操作按钮 */}
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {skill.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] px-2 py-0.5 rounded border border-[var(--border)] bg-[var(--background)]"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      #{t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-[var(--border)]">
                  <button
                    onClick={() => { setSelectedSkill(skill); setSelectedFileIndex(0); }}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-bold py-2.5 px-3 rounded-xl border border-[var(--border)] bg-[var(--background)] hover:bg-[var(--surface-muted)] transition-colors cursor-pointer"
                    style={{ color: "var(--text-primary)" }}
                  >
                    <Terminal size={14} />
                    预览目录树与架构
                  </button>
                  <button
                    onClick={() => handleDownloadZip(skill)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold py-2.5 px-4 rounded-xl bg-[var(--brand)] text-[var(--brand-foreground)] hover:opacity-90 transition-opacity cursor-pointer shrink-0"
                  >
                    <Download size={14} />
                    下载 .ZIP 技能包
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
          className="fixed inset-0 z-[var(--z-modal)] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedSkill(null)}
        >
          <div
            className="w-full max-w-3xl bg-slate-900 text-slate-100 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <div className="flex items-center gap-2">
                <FolderArchive className="text-amber-400" size={18} />
                <h3 className="font-bold text-sm text-slate-200">{selectedSkill.name}</h3>
              </div>
              <button
                onClick={() => setSelectedSkill(null)}
                className="text-slate-400 hover:text-white text-sm font-mono px-2.5 py-1 rounded bg-slate-800 cursor-pointer"
              >
                ESC
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto font-mono text-xs leading-relaxed space-y-5">
              <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-3 text-[11px]">
                <span>包类型: 多文件 .ZIP 源码架构</span>
                <span>更新日期: {selectedSkill.updatedAt}</span>
              </div>

              {/* 交互文件 Tab 切换器 */}
              <div>
                <p className="text-slate-300 font-bold mb-2 font-sans text-sm flex items-center gap-2">
                  <FileCode size={16} className="text-emerald-400" /> 包内模块文件列表 (点击切换查看):
                </p>
                <div className="flex flex-wrap gap-1.5 bg-slate-950 p-2 rounded-xl border border-slate-800">
                  {selectedSkill.fileStructure.map((file, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedFileIndex(idx)}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5",
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
                <p className="text-slate-300 font-bold mb-2 font-sans text-sm">📁 多文件架构目录树预览:</p>
                <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 overflow-x-auto text-amber-300 font-mono text-xs">
                  <code>{selectedSkill.codeSnippet}</code>
                </pre>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="px-6 py-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between gap-3">
              <span className="text-xs text-slate-400">完整源代码包开源可直接商用</span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleCopySnippet(selectedSkill.id, selectedSkill.codeSnippet)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-lg border border-slate-700 hover:bg-slate-800 text-slate-200 transition-colors cursor-pointer"
                >
                  {copiedId === selectedSkill.id ? <Check size={14} /> : <Copy size={14} />}
                  {copiedId === selectedSkill.id ? "已复制目录树" : "复制目录树"}
                </button>
                <button
                  onClick={() => handleDownloadZip(selectedSkill)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-lg bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-colors cursor-pointer"
                >
                  <Download size={14} />
                  下载 .ZIP 技能源码包
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
