"use client";

import { useEffect, useState } from "react";
import { ChevronUp, ChevronDown, Compass, Sparkles } from "lucide-react";
import { cn } from "@/lib/cn";

export interface SectionItem {
  id: string;
  number: string;
  name: string;
  shortName: string;
}

export const SECTIONS: SectionItem[] = [
  { id: "hero", number: "01", name: "首屏现场", shortName: "现场" },
  { id: "credibility", number: "02", name: "真实可信数据", shortName: "数据" },
  { id: "now", number: "03", name: "NOW 重点聚焦", shortName: "聚焦" },
  { id: "journey", number: "04", name: "狗哥真实经历", shortName: "经历" },
  { id: "evidence", number: "05", name: "真实实践证据", shortName: "证据" },
  { id: "foodops", number: "06", name: "FoodOps 旗舰案例", shortName: "旗舰" },
  { id: "projects", number: "07", name: "代表项目矩阵", shortName: "项目" },
  { id: "method", number: "08", name: "现场工作方式", shortName: "方式" },
  { id: "cooperation", number: "09", name: "合作与双向选择", shortName: "合作" },
  { id: "notes", number: "10", name: "现场实践记录", shortName: "手记" },
  { id: "faq", number: "11", name: "现场常见答疑", shortName: "答疑" },
  { id: "contact", number: "12", name: "现场联系预约", shortName: "预约" },
];

export function SectionNavigator() {
  const [activeId, setActiveId] = useState<string>("hero");
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    // 监听当前滚动到哪个分区
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (scrollY / totalHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));

      // 滚动离开首屏后优雅浮现
      setIsVisible(scrollY > 320);

      // 检查当前在哪个 section 视口中
      const sectionElements = SECTIONS.map((sec) => document.getElementById(sec.id)).filter(Boolean);
      
      const scrollMiddle = scrollY + window.innerHeight * 0.38;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const el = sectionElements[i];
        if (el && el.offsetTop <= scrollMiddle) {
          setActiveId(SECTIONS[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeIndex = SECTIONS.findIndex((s) => s.id === activeId);
  const currentSection = SECTIONS[activeIndex] || SECTIONS[0];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIndex > 0) {
      scrollToSection(SECTIONS[activeIndex - 1].id);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIndex < SECTIONS.length - 1) {
      scrollToSection(SECTIONS[activeIndex + 1].id);
    }
  };

  return (
    <>
      {/* 桌面端：右侧悬浮章节交互导航条 */}
      <aside
        className={cn(
          "hidden lg:flex fixed right-5 top-1/2 -translate-y-1/2 z-40 flex-col items-end transition-all duration-300 font-sans select-none",
          isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"
        )}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        aria-label="页面分区交互导航"
      >
        {/* 核心微型交互胶囊面板 */}
        <div className="flex flex-col items-end gap-1.5 p-2 rounded-2xl bg-white/90 dark:bg-[#1a1d27]/90 backdrop-blur-md border-2 border-[#202126] shadow-[4px_4px_0px_#202126] transition-all">
          {/* 顶部：当前分区状态胶囊 */}
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-xl bg-[#202126] text-[#fffdf5] dark:bg-black text-[11px] font-black w-full justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d5f085] animate-pulse" />
              <span className="font-mono text-[10px] text-[#d5f085]">{currentSection.number}</span>
              <span className="truncate max-w-[85px]">{currentSection.shortName}</span>
            </div>
            <div className="flex items-center gap-0.5">
              <button
                type="button"
                onClick={handlePrev}
                disabled={activeIndex === 0}
                className="w-5 h-5 rounded hover:bg-white/20 flex items-center justify-center disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                title="上一区"
              >
                <ChevronUp size={12} />
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={activeIndex === SECTIONS.length - 1}
                className="w-5 h-5 rounded hover:bg-white/20 flex items-center justify-center disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                title="下一区"
              >
                <ChevronDown size={12} />
              </button>
            </div>
          </div>

          {/* 章节垂直点选滑动轨 */}
          <div className="flex flex-col gap-1 py-1 w-full">
            {SECTIONS.map((sec, idx) => {
              const isActive = sec.id === activeId;
              return (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => scrollToSection(sec.id)}
                  className={cn(
                    "group relative flex items-center justify-end gap-2 px-2 py-1 rounded-lg text-left transition-all cursor-pointer",
                    isActive
                      ? "bg-[#d5f085] text-[#202126] font-black shadow-[1.5px_1.5px_0px_#202126]"
                      : "hover:bg-black/5 dark:hover:bg-white/5 text-[#555d72] dark:text-[#a0a8be] font-bold"
                  )}
                  title={`滑动至：${sec.number} ${sec.name}`}
                >
                  {/* 展开时显示的文字 */}
                  {isExpanded && (
                    <span className="text-[11px] truncate whitespace-nowrap">
                      {sec.number} {sec.name}
                    </span>
                  )}

                  {/* 未展开时的指示圆点 / 短杠 */}
                  <span
                    className={cn(
                      "transition-all shrink-0 rounded-full",
                      isActive
                        ? "w-4 h-1.5 bg-[#202126]"
                        : "w-1.5 h-1.5 bg-[#202126]/30 dark:bg-white/30 group-hover:scale-125 group-hover:bg-[#202126]"
                    )}
                  />
                </button>
              );
            })}
          </div>

          {/* 底部细滚动进度条 */}
          <div className="w-full h-1 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#5867d2] transition-all duration-150"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
        </div>
      </aside>

      {/* 移动端/平板：左下角微型分区滑动 HUD */}
      <aside
        className={cn(
          "lg:hidden fixed left-3.5 bottom-[calc(14px+env(safe-area-inset-bottom,0px))] z-40 transition-all duration-300 pointer-events-auto",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
        )}
        aria-label="移动端分区导航"
      >
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/95 dark:bg-[#161922]/95 backdrop-blur-md border-2 border-[#202126] shadow-[2.5px_2.5px_0px_#202126] text-[#202126] dark:text-white">
          <span className="w-1.5 h-1.5 rounded-full bg-[#d5f085] animate-pulse" />
          <span className="font-mono text-[10px] font-black text-[#5867d2]">{currentSection.number}</span>
          <span className="text-[11px] font-black truncate max-w-[85px]">{currentSection.shortName}</span>
          <div className="h-3 w-px bg-[#202126]/20 mx-0.5" />
          <button
            type="button"
            onClick={handlePrev}
            disabled={activeIndex === 0}
            className="w-5 h-5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 flex items-center justify-center disabled:opacity-20 cursor-pointer"
            title="上一区"
          >
            <ChevronUp size={12} />
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={activeIndex === SECTIONS.length - 1}
            className="w-5 h-5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 flex items-center justify-center disabled:opacity-20 cursor-pointer"
            title="下一区"
          >
            <ChevronDown size={12} />
          </button>
        </div>
      </aside>
    </>
  );
}
