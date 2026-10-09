"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, RotateCcw, Mail, MessageSquare, ExternalLink, Sparkles, CheckCircle2 } from "lucide-react";

export function FreefallLandingBaseCamp({ onJumpAgain }: { onJumpAgain: () => void }) {
  const [showWechatModal, setShowWechatModal] = useState(false);

  return (
    <section
      id="ground-camp"
      className="relative z-30 bg-slate-950 text-white border-t border-emerald-500/20 py-20 px-4 sm:px-6 lg:px-8 select-text"
    >
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Touchdown Header Banner */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-400 font-mono text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>TOUCHDOWN SUCCESSFUL · 0 FT · 安全着陆</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            欢迎来到狗哥地面指挥部
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
            从万米高空的奇思妙想，到落地生根的真实代码与商业交付。
          </p>
        </div>

        {/* Profile Card & Story */}
        <div className="rounded-3xl p-6 sm:p-10 bg-slate-900/80 border border-white/10 backdrop-blur-xl shadow-2xl grid md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-1 flex flex-col items-center text-center">
            <div className="relative w-32 h-32 rounded-3xl overflow-hidden border-2 border-emerald-400/40 shadow-2xl mb-4 bg-slate-800">
              <Image
                src="/images/salin-hero-alpha.png"
                alt="狗哥 Wang Salin"
                fill
                className="object-contain"
              />
            </div>
            <h3 className="text-xl font-bold text-white">狗哥 (Wang Salin)</h3>
            <p className="text-xs text-emerald-400 font-mono mt-1">
              AI 商业落地 · 餐饮实体操盘手
            </p>
          </div>

          <div className="md:col-span-2 space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed">
            <p>
              做过本地生活内容，亲自下场经营过餐饮门店。把十多年积累的商业洞察、后厨动线与供应链痛点，转化为真正能为企业和团队赚钱的 AI 工具。
            </p>
            <p>
              不坐而论道，不靠空洞概念兜售焦虑。信奉作品为王、代码交付、ROI 为先。
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-xs font-mono">
                ✓ Salin UI 创作者
              </span>
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-mono">
                ✓ 实体连锁数字化全案
              </span>
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-mono">
                ✓ 企业 Agent 工作流落地
              </span>
            </div>
          </div>
        </div>

        {/* Matrix of Core Projects */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <span>核心工程与产品展厅</span>
            </h3>
            <Link
              href="/projects"
              className="text-xs font-mono text-emerald-400 hover:underline flex items-center gap-1"
            >
              <span>查看全部档案</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Link
              href="/ui/"
              className="p-6 rounded-2xl bg-slate-900/60 hover:bg-slate-900 border border-emerald-500/30 hover:border-emerald-400 transition-all duration-200 group block"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-emerald-400 font-semibold">
                  FLAGSHIP PRODUCT
                </span>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
              <h4 className="text-lg font-bold text-white mb-1">Salin UI (AI 界面弹药库)</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                252+ 界面资产，单文件 TSX 一键克隆，原生 MCP 协议支持 Cursor / Claude。
              </p>
            </Link>

            <Link
              href="/projects/gouge-hub"
              className="p-6 rounded-2xl bg-slate-900/60 hover:bg-slate-900 border border-white/10 hover:border-amber-400/50 transition-all duration-200 group block"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-amber-400 font-semibold">
                  KNOWLEDGE BASE
                </span>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
              <h4 className="text-lg font-bold text-white mb-1">狗哥资源库 (Gouge Hub)</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                实体商业获客、本地生活操盘与团队避坑指南。
              </p>
            </Link>

            <Link
              href="/projects/foodops"
              className="p-6 rounded-2xl bg-slate-900/60 hover:bg-slate-900 border border-white/10 hover:border-rose-400/50 transition-all duration-200 group block"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-rose-400 font-semibold">
                  ENTERPRISE FDE
                </span>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-rose-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
              <h4 className="text-lg font-bold text-white mb-1">FoodOps 餐饮供应链系统</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                单店至连锁门店供应链降本 18%、后厨工单排班数字化全案。
              </p>
            </Link>

            <Link
              href="/notes"
              className="p-6 rounded-2xl bg-slate-900/60 hover:bg-slate-900 border border-white/10 hover:border-blue-400/50 transition-all duration-200 group block"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-blue-400 font-semibold">
                  FIELD NOTES
                </span>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
              <h4 className="text-lg font-bold text-white mb-1">AI 商业实战手记</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                10+ 篇一线商业复盘长文，用真金白银的落地经验说话。
              </p>
            </Link>
          </div>
        </div>

        {/* Cooperation Directions & Contact */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-emerald-950/30 border border-emerald-500/20 shadow-2xl">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              聊点真实的业务，做点能交付的作品
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              适合交流：AI 工具与 Agent 工作流开发、实体餐饮与供应链数字化、Salin UI 共建、早期创业项目共创。
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => setShowWechatModal(true)}
                className="px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-emerald-500/25 flex items-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>微信沟通</span>
              </button>

              <Link
                href="/contact"
                className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>商务对接页面</span>
              </Link>

              <button
                type="button"
                onClick={onJumpAgain}
                className="px-6 py-3 rounded-full bg-slate-800 hover:bg-slate-700 text-emerald-400 hover:text-emerald-300 font-mono text-sm border border-emerald-500/30 transition-all flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>从 13,500 FT 再次跳伞 ↺</span>
              </button>
            </div>
          </div>
        </div>

        {/* WeChat Modal */}
        {showWechatModal && (
          <div
            onClick={() => setShowWechatModal(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="p-6 rounded-3xl bg-slate-900 border border-white/20 max-w-sm w-full text-center space-y-4"
            >
              <h4 className="text-lg font-bold text-white">添加狗哥微信</h4>
              <p className="text-xs text-slate-400">
                请备注来意（如：AI 工具定制 / 商业合作 / Salin UI）
              </p>
              <div className="relative w-56 h-56 mx-auto rounded-2xl overflow-hidden border border-white/10 bg-white p-2">
                <Image
                  src="/images/wechat-qr.jpg"
                  alt="狗哥微信二维码"
                  fill
                  className="object-contain"
                />
              </div>
              <button
                type="button"
                onClick={() => setShowWechatModal(false)}
                className="w-full py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold cursor-pointer"
              >
                关闭
              </button>
            </div>
          </div>
        )}

        {/* Minimal Footer */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-mono gap-4">
          <div>© {new Date().getFullYear()} WANG SALIN · ALL RIGHTS RESERVED.</div>
          <div className="flex items-center gap-4">
            <Link href="https://github.com/wangsalin" target="_blank" className="hover:text-slate-300">
              GitHub
            </Link>
            <Link href="https://x.com/EyuSalin" target="_blank" className="hover:text-slate-300">
              X (Twitter)
            </Link>
            <Link href="/ui/" className="hover:text-emerald-400">
              Salin UI 弹药库
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
