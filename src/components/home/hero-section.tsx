"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function HeroSection() {
  return (
    <section
      className="relative min-h-[95vh] sm:min-h-screen flex flex-col justify-between overflow-hidden bg-[#c8cbe0] dark:bg-[#12141c] text-[#1c1d24] dark:text-[#f2f1eb] transition-colors"
      style={{
        backgroundImage:
          "radial-gradient(rgba(32, 33, 40, 0.14) 1.2px, transparent 1.2px)",
        backgroundSize: "24px 24px",
      }}
    >
      {/* 01. Giant Typographic Backdrop: "SALIN" spanning across full width */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="font-black text-[22vw] leading-none tracking-[-0.06em] text-white/95 dark:text-white/10 select-none transform -translate-y-10 sm:-translate-y-6"
          style={{
            fontFamily:
              'Impact, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          }}
        >
          SALIN
        </span>
      </div>

      {/* 02. Center 3D Character Cutout Layered in front of Backdrop Text */}
      <div
        className="absolute left-1/2 bottom-0 -translate-x-1/2 z-10 flex flex-col items-center pointer-events-none select-none w-full max-w-[680px]"
        aria-hidden="true"
      >
        <div className="relative w-full flex justify-center">
          <Image
            src="/images/salin-hero-alpha.png"
            alt="Wang Salin 狗哥 3D 虚拟形象"
            width={768}
            height={1376}
            priority
            fetchPriority="high"
            className="h-[76vh] sm:h-[84vh] max-h-[860px] min-h-[500px] w-auto object-contain object-bottom drop-shadow-[0_24px_38px_rgba(25,27,38,0.28)]"
          />
        </div>
        {/* Soft ground contact shadow */}
        <div className="w-56 sm:w-72 h-6 rounded-[100%] bg-black/30 blur-md -mt-3 shrink-0" />
      </div>

      {/* 03. Left Column: Editorial Headline & Tactile Stickers */}
      <div className="relative z-20 max-w-xl pl-6 sm:pl-12 lg:pl-20 pt-24 sm:pt-28 pb-12 sm:pb-16 flex flex-col items-start gap-4 sm:gap-5">
        {/* Eyebrow badge */}
        <p className="font-mono text-[11px] sm:text-xs font-black tracking-[0.22em] text-[#474f67] dark:text-[#a0a8c2] uppercase">
          AI APPLICATION & BUSINESS PRACTITIONER
        </p>

        {/* Big Impact Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-[62px] font-black tracking-[-0.04em] text-[#1b1d24] dark:text-white leading-[1.12]">
          你好，我是<strong className="text-[#0d0e12] dark:text-white">狗哥。</strong>
          <br />
          欢迎来到我的现场。
        </h1>

        {/* Subtitle description */}
        <p className="text-sm sm:text-[15px] text-[#424657] dark:text-[#b0b8c8] font-medium leading-[1.8] max-w-[430px]">
          用代码与实战经验探索 AI 落地。做过 6 年探店，亲自下场开过餐厅。把十多年摸爬滚打的商业死结，变成真正能跑通的 AI 实战工具。
        </p>

        {/* Tactile Stickers Stack (The signature Xiaolin-style tactile element) */}
        <div className="flex flex-col items-start gap-2.5 pt-1.5" aria-label="狗哥身份与态度标签">
          {/* Sticker 1: Lime Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#d5f085] text-[#1c1d24] font-black text-xs border border-[#202126] shadow-[2px_2px_0px_#202126] transform -rotate-1 hover:rotate-0 transition-transform cursor-default">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>身份卡 / 实体餐饮老兵 · 临沂</span>
          </div>

          {/* Sticker 2: White Paper Note (Tilted -1.5deg) */}
          <div className="inline-block px-4 py-2.5 rounded-md bg-[#fffefa] text-[#202126] font-bold text-xs sm:text-sm border border-[#202126] shadow-[3px_3px_0px_#202126] transform -rotate-1 hover:rotate-0 transition-transform cursor-default">
            喜欢把「死磕现场」
            <em className="not-italic text-[#4f5fc8] font-black underline decoration-[#c7ec73] decoration-2 ml-1">
              写成真的。
            </em>
          </div>

          {/* Sticker 3: White Paper Note (Tilted +1deg) */}
          <div className="inline-block px-4 py-2.5 rounded-md bg-[#fffefa] text-[#202126] font-bold text-xs sm:text-sm border border-[#202126] shadow-[3px_3px_0px_#202126] transform rotate-1 hover:rotate-0 transition-transform cursor-default">
            主导 FoodOps 餐饮连锁 AI 落地，
            <em className="not-italic text-[#4f5fc8] font-black ml-1">
              让好点子在现场活下去。
            </em>
          </div>
        </div>

        {/* Primary CTA Button */}
        <div className="pt-2">
          <Link
            href="#projects"
            className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#fffefa] hover:bg-[#d5f085] text-[#1c1d24] font-black text-sm border-2 border-[#202126] shadow-[4px_4px_0px_#202126] hover:shadow-[5px_6px_0px_#202126] hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            <span>进入我的工作台</span>
            <ArrowUpRight
              size={18}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </Link>
        </div>
      </div>

      {/* 04. Right Column: Status pill & Side Note */}
      <div className="hidden sm:inline-flex items-center gap-2 absolute right-6 sm:right-12 top-1/2 -translate-y-1/2 z-20 px-3.5 py-1.5 rounded-full bg-white/75 dark:bg-[#1d202b]/80 backdrop-blur border border-[#202126]/30 text-xs font-bold text-[#292c3a] dark:text-white shadow-[2px_2px_0px_rgba(0,0,0,0.15)]">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span>全国驻场 · 现场交付中</span>
      </div>

      <div className="hidden lg:block absolute right-12 bottom-12 z-20 max-w-[240px] text-right pointer-events-auto">
        <span className="text-[10px] font-mono font-black tracking-widest text-[#555d77] dark:text-[#8d96b0] uppercase block mb-1">
          ABOUT THIS SPACE
        </span>
        <p className="text-xs text-[#3f4559] dark:text-[#b4bccf] font-semibold leading-relaxed">
          七个章节，一点点认识我的经历、实战项目和正在探索的方向。
        </p>
      </div>
    </section>
  );
}
