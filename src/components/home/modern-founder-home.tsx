"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  Sparkles,
  Code2,
  Terminal,
  Mail,
  Copy,
  Check,
  ExternalLink,
  Clock,
  Scan,
  ChevronDown,
  ChevronUp,
  X,
  Eye,
  Store,
  Compass,
  Zap,
  Flame,
  Award,
  Layers,
  Bot,
  MapPin,
  TrendingUp,
  Cpu,
  Coffee,
  Database,
  MessageCircle,
} from "lucide-react";
import { siteConfig } from "@/data/site";

// 桌面手办与灵感物件
const DESK_TOYS = [
  {
    id: "luffy",
    name: "路飞手办",
    series: "海贼王 · 出海少年",
    motto: "认准了当海贼王就绝不回头",
    desc: "12年创业无论顺境逆境，永远保持出海冒险的少年热血。认准了就走到底。",
    image: "/images/toys/luffy-figure.jpg",
    tag: "ONE PIECE // LUFFY",
  },
  {
    id: "genji",
    name: "源氏手办",
    series: "守望先锋 · 机械游侠",
    motto: "身虽为机械，心犹是人魂",
    desc: "AI 与代码是最锋利的刃，但实体商业的真实痛点与洞察才是不可替代的灵魂。",
    image: "/images/toys/overwatch-figure.jpg",
    tag: "OVERWATCH // GENJI",
  },
  {
    id: "dog",
    name: "狗哥柴犬",
    series: "图腾 · 真实皮实",
    motto: "不装逼，做点有趣且真实的事",
    desc: "接地气、诚恳、皮实耐造。十几年来在小店烟火气与代码终端之间自由穿行。",
    image: "/images/toys/dog-mascot.jpg",
    tag: "MASCOT // SHIBA",
  },
  {
    id: "eyu",
    name: "饿鱼 2014",
    series: "图腾 · 2000+ 餐饮服务",
    motto: "始于舌尖，不忘初心",
    desc: "2014-2021《舌尖上的临沂》官方徽章。吃包子的鳄鱼，记录 2000 多家实体店的烟火记忆。",
    image: "/images/brand/eyu-official-hi-res.png",
    tag: "EYU // 2014 VINTAGE",
  },
];

// 英雄大图交互热点 (基于实战工作台大图)
const HERO_HOTSPOTS = [
  {
    id: "elidashboard",
    title: "01 // 饿狸 (youeli.com) 餐饮看板",
    desc: "平板实时运行饿狸增长引擎，实时解析实体门店翻台率、毛利率与引流数据。",
    coords: "left-[76%] top-[50%]",
  },
  {
    id: "offline",
    title: "02 // 实体店压粉锤与前台小票夹",
    desc: "4年亲历开店、开吧台的实操物证。每天算毛利、抠损耗，深知实体生意的艰难。",
    coords: "left-[18%] top-[45%]",
  },
  {
    id: "toys",
    title: "03 // 出海少年与机械身代码",
    desc: "桌面常驻海贼王路飞与源氏手办。身虽由机械与代码铸就，心永远保持少年的热血出海。",
    coords: "left-[79%] top-[24%]",
  },
  {
    id: "eyutotem",
    title: "04 // 2014 饿鱼图腾与十年笔记",
    desc: "桌角真实的绿色吃包子鳄鱼徽章与创业手账本。2014 愚人节起步，12年不改其志。",
    coords: "left-[30%] top-[72%]",
  },
];

// 饿狸实战 3D 场景切换配置 (图三、四、五修改整合 · 带实时遥测数据卡片)
const ELI_SCENES = [
  {
    id: "kitchen",
    label: "后厨毛利分析",
    sub: "菜品成本与毛利率精细核算",
    image: "/images/projects/eli/eli-scene-kitchen.jpg",
    desc: "实时把脉招牌菜与低效菜品，精准把控食材毛利与出品品质。",
    telemetryTop: "🔥 招牌菜食材毛利 68.4% · 动态追踪",
    telemetryBottom: "⚠️ 预警剔除 2 款低效菜品，止损降本",
  },
  {
    id: "meeting",
    label: "餐饮增长中心",
    sub: "门店营业额与翻台率推演",
    image: "/images/projects/eli/eli-scene-meeting.jpg",
    desc: "推演淡季引流套餐与客流复购，让每一次营销活动都有据可依。",
    telemetryTop: "📈 淡季午市翻台率推演 +34.8%",
    telemetryBottom: "🎯 晚市客单价提升预测 +¥18.5",
  },
  {
    id: "desk",
    label: "商家获客工作台",
    sub: "小红书/点评文案与内容日历",
    image: "/images/projects/eli/eli-scene-desk.jpg",
    desc: "一键生成探店文案与爆款笔记，彻底告别老板不会写、员工不愿拍。",
    telemetryTop: "⚡ 小红书爆款笔记生成 · 1.8 秒输出",
    telemetryBottom: "📱 微信朋友圈/大众点评日历已排期",
  },
];

// 饿狸现场“问问饿狸”AI 真实推演模拟问题集 (小店真实痛点)
const ELI_PROMPTS = [
  {
    id: "traffic",
    label: "📢 周三写字楼没客流？",
    question: "周边写字楼周三中午没客人，怎么做低成本引流？",
    tag: "引流获客",
    response: {
      strategy: "策划「周三打工人能量充电日」限量特惠，以高毛利饮品搭售爆款主食。",
      copy: "【小红书/朋友圈爆款文案】\n‘周三过半，打工人急需回血！今天中午凭工牌到店，招牌炙烤牛肉饭立减 ¥8，再送生椰冷萃一杯！午休1小时，先把肚子喂饱～’",
      metric: "毛利率维持 68.4% · 预计提升午市翻台率 35%+",
    },
  },
  {
    id: "review",
    label: "💬 2星差评嫌上菜慢？",
    question: "大众点评被打了 2 星差评，抱怨上菜慢且态度冷淡，怎么高情商回复？",
    tag: "差评公关",
    response: {
      strategy: "真诚道歉 + 归因出餐动线整改 + 赋予主厨诚意赔付方案，转化潜在流失老客。",
      copy: "【大众点评商家回复】\n‘非常抱歉给您的用餐带来了糟糕体验！我是主厨 Salin，今天高峰期出餐协同确实出现了延误，已在店内复盘优化出品动线。诚挚邀请您凭此回复再次到店，我亲自为您下厨并加赠手作招牌甜品一份，请给我们一次弥补的机会！’",
      metric: "公关挽回率预估 78% · 消除潜在到店顾客疑虑",
    },
  },
  {
    id: "newstore",
    label: "✍️ 新店开业爆款文案？",
    question: "新店试营业第 1 周，小红书和朋友圈文案怎么写吸引年轻人自发打卡？",
    tag: "爆款文案",
    response: {
      strategy: "打造「本地宝藏新店」首发情绪共鸣 + 前 100 桌到店实体周边福利锚点。",
      copy: "【小红书种草笔记】\n‘谁懂啊！临沂这家新开的藏宝餐厅终于被我挖到了！工业风出片率 100%，招牌现熬浓汤直接香迷糊了…人均 35 吃撑！试营业前 100 桌还送饿狸限定贴纸！速冲！’",
      metric: "探店互动率预估 4.2x · 自发拍照打卡率提升 60%",
    },
  },
];

// 破冰交流建议话题
const CONVERSATION_STARTERS = [
  "你好 Salin，我想聊聊实体门店接入「饿狸」AI 获客工具",
  "Salin 好，想交流下 Salin UI 前端设计系统与 MCP 工作流",
  "你好狗哥，看了你的 12 年餐饮经历，想交流下本地生活与自媒体",
];

// 十二年创业历程四阶段交互数据
const ODYSSEY_STAGES = [
  {
    id: "2014-origin",
    step: "01",
    era: "2014.04.01",
    tag: "THE APRIL FOOL'S ORIGIN",
    title: "创业的愚人节 · 从 0 到 1 创立《舌尖上的临沂》",
    role: "初创者 · 本地美食自媒体拓荒者",
    quote: "“创业就像开了一个天大的愚人节玩笑，我用它拉开了长达十二年对商业摸爬滚打的序幕。”",
    desc: "在地方微信自媒体刚刚萌芽的时代，拿着相机和纸笔走街串巷。从零起步创立《舌尖上的临沂》，开辟了临沂本地美食与生活消费的第一线矩阵阵地。",
    metrics: [
      { label: "开局节点", value: "2014.04.01" },
      { label: "初创初心", value: "吃遍临沂" },
      { label: "官方图腾", value: "饿鱼吃包子" },
    ],
    primaryImage: "/images/portrait/salin-2017-flag-full.jpg",
    logoBadge: "/images/brand/eyu-official-hi-res.png",
    badgeTitle: "2014 饿鱼图腾 · 舌尖上的临沂",
    stamp: "LINYI // 2014.04.01 FOUNDING ODYSSEY",
    accent: "from-amber-400 to-emerald-400",
    watermark: "2014 ORIGIN",
  },
  {
    id: "2014-2021-service",
    step: "02",
    era: "2014 — 2021",
    tag: "2000+ MERCHANTS SERVED",
    title: "餐饮服务者 · 七年深耕服务超 2000+ 实体餐饮",
    role: "餐饮自媒体主力军 · 探店与营销服务者",
    quote: "“吃了整整 7 年的大街小巷，见证了 2000 多家小店的排队火爆与黯然退场。实体老板有多难，我亲眼看了 7 年。”",
    desc: "公众号矩阵累计深度服务超 2000 家本地实体餐饮。做爆款策划、写探店推文、推排队引流套餐，亲眼见证餐饮老板每一个营销无助与获客焦虑的真实痛点。",
    metrics: [
      { label: "服务门店", value: "2,000+ 家" },
      { label: "深耕时间", value: "整整 7 年" },
      { label: "实战策划", value: "1,500+ 场" },
    ],
    primaryImage: "/images/portrait/salin-2017-food.png",
    logoBadge: "/images/brand/shejian-official-hi-res.png",
    badgeTitle: "舌尖上的临沂 · 官方印鉴",
    stamp: "LINYI // 2017.06.18 HOTPOT EXPEDITION",
    accent: "from-emerald-400 to-teal-300",
    watermark: "2,000+ MERCHANTS",
  },
  {
    id: "2021-2025-practice",
    step: "03",
    era: "2021 — 2025.H2",
    tag: "IN THE TRENCHES · OWNED SHOPS",
    title: "餐饮从业者 · 躬身开店四年，从岸上变成店老板",
    role: "实体餐饮店主 · 亲自下场管店",
    quote: "“从岸上的看客下场变成水里的游泳者。亲自算毛利、抠损耗、顶房租、带员工，只有真金白银亏过赚过，才知开店之艰。”",
    desc: "整整四年亲力亲为开店经营。站在吧台后抓出品、守在后厨抓品控、半夜算当天的毛利与物料损耗。彻底打破纸上谈兵的局外视角，深刻理解每天的跑冒滴漏与真实获客成本。",
    metrics: [
      { label: "亲自开店", value: "整整 4 年" },
      { label: "身份蜕变", value: "服务者 → 从业者" },
      { label: "核心体悟", value: "毛利与损耗" },
    ],
    primaryImage: "/images/evidence/kitchen-frontline.png",
    logoBadge: "/images/brand/eyu-official-hi-res.png",
    badgeTitle: "一线后厨实操物证",
    stamp: "IN THE TRENCHES // 2021-2025 KITCHEN OPS",
    accent: "from-orange-400 to-amber-300",
    watermark: "IN THE TRENCHES",
  },
  {
    id: "2026-rebirth",
    step: "04",
    era: "2026 NOW",
    tag: "AI × REAL COMMERCE",
    title: "认知觉醒 · 重返服务者，自研 AI 饿狸彻底破局",
    role: "AI 获客工具主理人 · 实体商业认知赋能者",
    quote: "“这次回到餐饮服务者行列，带来的是对实体商业完全通透的认知。让自研 AI（饿狸）不再悬浮，真正帮餐饮人解决获客难题！”",
    desc: "将 12 年的餐饮服务经验、实体开店血泪，与全栈 AI 代码工程深度融合。打造「饿狸 (youeli.com)」，把复杂的营销推演和内容日历做成小老板一键能用的工具流水线。",
    metrics: [
      { label: "旗舰产品", value: "饿狸 youeli.com" },
      { label: "技术军火", value: "252+ Salin UI" },
      { label: "终极使命", value: "让 AI 斩断实体痛点" },
    ],
    primaryImage: "/images/projects/eli/eli-scene-kitchen.jpg",
    logoBadge: "/images/brand/eyu-official-hi-res.png",
    badgeTitle: "饿狸 ELI · 2026 实体 AI 武器",
    stamp: "COGNITIVE REBIRTH // 2026 AI × MERCHANTS",
    accent: "from-emerald-300 to-cyan-300",
    watermark: "2026 AI REBIRTH",
  },
];


export function ModernFounderHome() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [timeStr, setTimeStr] = useState("");
  const [copiedWechat, setCopiedWechat] = useState(false);
  const [copiedMcp, setCopiedMcp] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedTopic, setCopiedTopic] = useState<string | null>(null);
  const [showQrModal, setShowQrModal] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [selectedToy, setSelectedToy] = useState<typeof DESK_TOYS[0]>(DESK_TOYS[0]);
  const [activeEliScene, setActiveEliScene] = useState<typeof ELI_SCENES[0]>(ELI_SCENES[0]);
  const [activeEliPrompt, setActiveEliPrompt] = useState(0);
  const [activeOdysseyStage, setActiveOdysseyStage] = useState(0);
  // 电影级原位破晓开幕光效状态 (In-Situ Cinematic Dawn Reveal · 无黑屏·零等待·眼前一亮)
  const [isDawnRevealing, setIsDawnRevealing] = useState(true);
  const [dawnFlareStep, setDawnFlareStep] = useState<"igniting" | "flaring" | "settled">("igniting");

  // 触发破晓光效动画 (850ms 丝滑流畅)
  const triggerDawnReveal = useCallback(() => {
    setIsDawnRevealing(true);
    setDawnFlareStep("igniting");
    const t1 = setTimeout(() => {
      setDawnFlareStep("flaring");
      const t2 = setTimeout(() => {
        setDawnFlareStep("settled");
        const t3 = setTimeout(() => {
          setIsDawnRevealing(false);
        }, 300);
        return () => clearTimeout(t3);
      }, 420);
      return () => clearTimeout(t2);
    }, 50);
    return () => clearTimeout(t1);
  }, []);

  // 页面首屏无缝自动播放破晓光效
  useEffect(() => {
    const cleanup = triggerDawnReveal();
    return () => {
      if (cleanup) cleanup();
    };
  }, [triggerDawnReveal]);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalSlides = 5;

  // 实时时钟更新
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString("zh-CN", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // 监听容器滚动，计算当前 Slide 索引
  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollTop, clientHeight } = containerRef.current;
    const index = Math.round(scrollTop / clientHeight);
    if (index !== activeSlide && index >= 0 && index < totalSlides) {
      setActiveSlide(index);
    }
  };

  // 跳转到指定 Slide
  const scrollToSlide = (index: number) => {
    if (!containerRef.current) return;
    const targetY = index * containerRef.current.clientHeight;
    containerRef.current.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
    setActiveSlide(index);
  };

  // 键盘快捷键监听 (上/下方向键)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        if (activeSlide < totalSlides - 1) {
          scrollToSlide(activeSlide + 1);
        }
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        if (activeSlide > 0) {
          scrollToSlide(activeSlide - 1);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeSlide]);

  const handleCopyWechat = () => {
    navigator.clipboard.writeText(siteConfig.wechat);
    setCopiedWechat(true);
    setTimeout(() => setCopiedWechat(false), 2000);
  };

  const handleCopyMcp = () => {
    navigator.clipboard.writeText("npx salin-ui add @mcp/server");
    setCopiedMcp(true);
    setTimeout(() => setCopiedMcp(false), 2000);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(siteConfig.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyTopic = (topic: string) => {
    navigator.clipboard.writeText(topic);
    setCopiedTopic(topic);
    setTimeout(() => setCopiedTopic(null), 2000);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#050806] text-[#E1E8E3] select-none font-sans">
      {/* 顶部悬浮取景器 HUD */}
      <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none px-4 sm:px-8 py-3.5 flex items-center justify-between border-b border-white/[0.07] bg-[#050806]/80 backdrop-blur-md">
        {/* 左侧：Salin 品牌与实时坐标 */}
        <div className="pointer-events-auto flex items-center gap-3">
          <button
            onClick={() => scrollToSlide(0)}
            className="flex items-center gap-2 group text-left cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981] animate-pulse" />
            <span className="font-mono text-xs sm:text-sm font-bold tracking-wider text-white group-hover:text-emerald-400 transition-colors">
              SALIN // BUILDER & FOUNDER
            </span>
          </button>
          <span className="hidden md:inline text-white/30 text-xs font-mono">|</span>
          <div className="hidden lg:flex items-center gap-2 font-mono text-[11px] text-white/60">
            <span>LINYI [35.1041° N, 118.3561° E]</span>
            <span className="text-white/30">·</span>
            <span className="text-emerald-400 font-semibold">{timeStr || "21:10:00"} CST</span>
            <span className="text-white/30">·</span>
            <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[10px]">
              12Y ODYSSEY
            </span>
          </div>
        </div>

        {/* 中间：全屏画卷 5 大页快速切换器 */}
        <nav className="pointer-events-auto hidden md:flex items-center gap-1 bg-white/[0.04] p-1 rounded-full border border-white/[0.08] shadow-inner font-mono text-xs">
          {[
            { id: 0, label: "01 封面画卷" },
            { id: 1, label: "02 十二年历程" },
            { id: 2, label: "03 饿狸 (youeli.com)" },
            { id: 3, label: "04 军火库 (SalinUI+资源库)" },
            { id: 4, label: "05 生活与连接" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => scrollToSlide(tab.id)}
              className={`px-3 py-1 rounded-full transition-all duration-300 cursor-pointer ${
                activeSlide === tab.id
                  ? "bg-emerald-500 text-black font-semibold shadow-[0_0_12px_rgba(16,185,129,0.5)]"
                  : "text-white/70 hover:text-white hover:bg-white/[0.06]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* 右侧：触达与页码指示 */}
        <div className="pointer-events-auto flex items-center gap-2 sm:gap-3 font-mono text-xs">
          <button
            onClick={handleCopyWechat}
            className="px-2.5 py-1 rounded-lg border border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 font-medium inline-flex items-center gap-1.5 transition-colors cursor-pointer text-[11px] sm:text-xs"
          >
            {copiedWechat ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            <span>{copiedWechat ? "已复制微信" : `微信号: ${siteConfig.wechat}`}</span>
          </button>
          <button
            onClick={() => setShowQrModal(true)}
            className="hidden sm:inline-flex px-2.5 py-1 rounded-lg border border-white/10 hover:border-white/20 bg-white/[0.04] text-white/80 hover:text-white transition-colors cursor-pointer text-[11px]"
          >
            <Scan className="w-3 h-3 mr-1 text-emerald-400" />
            二维码
          </button>
          <button
            onClick={triggerDawnReveal}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/[0.04] hover:bg-emerald-500/20 border border-white/10 hover:border-emerald-500/40 text-white/70 hover:text-emerald-300 font-mono text-[11px] transition-all cursor-pointer"
            title="重播电影级破晓开幕光效"
          >
            <Sparkles className="w-3 h-3 text-emerald-400" />
            电影光效
          </button>
          <div className="px-2 py-1 rounded bg-white/[0.06] border border-white/10 text-white font-mono text-[11px] font-bold">
            [{String(activeSlide + 1).padStart(2, "0")} / 05]
          </div>
        </div>
      </header>

      {/* 右侧垂直滑动导轨与指示器 */}
      <div className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col items-center gap-3">
        <button
          onClick={() => activeSlide > 0 && scrollToSlide(activeSlide - 1)}
          disabled={activeSlide === 0}
          className="p-1.5 rounded-full border border-white/10 bg-black/40 hover:bg-white/10 disabled:opacity-20 text-white/70 hover:text-white transition-all cursor-pointer"
          title="上一页 (Arrow Up)"
        >
          <ChevronUp className="w-4 h-4" />
        </button>

        <div className="flex flex-col gap-2 py-2">
          {[0, 1, 2, 3, 4].map((idx) => (
            <button
              key={idx}
              onClick={() => scrollToSlide(idx)}
              className="group relative flex items-center justify-center p-1 cursor-pointer"
              title={`跳转到第 ${idx + 1} 页`}
            >
              <span
                className={`transition-all duration-300 rounded-full ${
                  activeSlide === idx
                    ? "w-2.5 h-6 bg-emerald-400 shadow-[0_0_10px_#10b981]"
                    : "w-2 h-2 bg-white/20 group-hover:bg-white/50"
                }`}
              />
              <span className="absolute right-6 px-2 py-0.5 rounded bg-black/80 border border-white/10 text-[10px] font-mono text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                0{idx + 1}
              </span>
            </button>
          ))}
        </div>

        <button
          onClick={() => activeSlide < totalSlides - 1 && scrollToSlide(activeSlide + 1)}
          disabled={activeSlide === totalSlides - 1}
          className="p-1.5 rounded-full border border-white/10 bg-black/40 hover:bg-white/10 disabled:opacity-20 text-white/70 hover:text-white transition-all cursor-pointer"
          title="下一页 (Arrow Down)"
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* 全屏滑动主体容器 (Snap Scrolling 100vh) */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="w-full h-full overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar"
        style={{ scrollBehavior: "smooth" }}
      >
        {/* ============================================================ */}
        {/* SLIDE 01: 封面画卷 (实战工作台大图 · 融合开店物证与 AI 终端) */}
        {/* ============================================================ */}
        <section
          id="slide-0"
          className="w-full h-screen min-h-[680px] snap-start snap-always relative overflow-hidden flex flex-col justify-between"
        >
          {/* 100vh 全屏巨幕铺满：实战创作者与开店工作台大图 (全屏铺开！) */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/showcase/salin-hero-workbench.jpg"
              alt="Salin 真实创作者与开店实操工作台全屏大图"
              fill
              priority
              sizes="100vw"
              className={`object-cover object-center transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isDawnRevealing ? "scale-[1.03] blur-[2px] brightness-90" : "scale-100 blur-0 brightness-100"
              }`}
            />
            {/* 电影级侧向与底部暗角保护层，保证左侧排版极清阅读，同时右侧工作台与手办清晰透出 */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#050806] via-[#050806]/75 to-[#050806]/20 z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050806] via-transparent to-[#050806]/80 z-10" />
            <div className="absolute inset-0 bg-radial from-transparent via-[#050806]/20 to-[#050806]/60 z-10" />
          </div>

          {/* 取景器四角十字标记 */}
          <div className="absolute top-18 left-6 sm:left-12 font-mono text-xs text-white/30 select-none z-20">+</div>
          <div className="absolute top-18 right-6 sm:right-12 font-mono text-xs text-white/30 select-none z-20">+</div>
          <div className="absolute bottom-16 left-6 sm:left-12 font-mono text-xs text-white/30 select-none z-20">+</div>
          <div className="absolute bottom-16 right-6 sm:right-12 font-mono text-xs text-white/30 select-none z-20">+</div>

          {/* 巨幅建筑字体水印 SALIN (上浮天际线布局 · 不割裂屏幕与笔记本 · 气势宏大) */}
          <div className={`absolute inset-x-0 top-[4%] sm:top-[6%] z-10 flex items-center justify-start overflow-hidden pointer-events-none select-none pl-6 sm:pl-14 lg:pl-20 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isDawnRevealing ? "opacity-30 translate-y-2" : "opacity-100 translate-y-0"
          }`}>
            <span
              className="text-[19vw] sm:text-[18vw] font-black text-transparent bg-clip-text bg-gradient-to-r from-white/[0.22] via-white/[0.08] to-transparent whitespace-nowrap font-mono select-none uppercase drop-shadow-sm"
              style={{
                WebkitTextStroke: "1.2px rgba(255, 255, 255, 0.2)",
                letterSpacing: "0.04em",
              }}
            >
              SALIN
            </span>
          </div>

          {/* 全屏交互探针：直接锚定在全屏实景物体上 */}
          {HERO_HOTSPOTS.map((spot) => (
            <div
              key={spot.id}
              className={`absolute ${spot.coords} -translate-x-1/2 -translate-y-1/2 z-30`}
            >
              <button
                onClick={() => setActiveHotspot(activeHotspot === spot.id ? null : spot.id)}
                className="relative flex items-center justify-center w-8 h-8 rounded-full bg-black/70 border border-emerald-400/90 text-emerald-300 hover:scale-125 transition-all shadow-[0_0_15px_rgba(16,185,129,0.7)] cursor-pointer"
                title={spot.title}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping absolute" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              </button>

              {activeHotspot === spot.id && (
                <div className="absolute left-1/2 bottom-10 -translate-x-1/2 w-72 p-3.5 rounded-xl bg-black/95 border border-emerald-500/60 backdrop-blur-xl shadow-2xl z-40 font-sans text-left">
                  <div className="font-mono text-xs text-emerald-400 font-bold mb-1">
                    {spot.title}
                  </div>
                  <p className="text-xs text-white/85 leading-relaxed">
                    {spot.desc}
                  </p>
                </div>
              )}
            </div>
          ))}

          {/* 核心排版：左侧铺开！左对齐！不要居中！ */}
          <div className={`relative z-20 flex-1 flex flex-col justify-center px-6 sm:px-14 lg:px-20 pt-20 sm:pt-24 max-w-4xl space-y-5 text-left transition-all duration-700 ease-out ${
            isDawnRevealing ? "opacity-40 translate-y-3" : "opacity-100 translate-y-0"
          }`}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 font-mono text-xs w-fit backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10b981]" />
              SALIN // 2014.04.01 — 2026 ODYSSEY
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12] text-white drop-shadow-xl">
              从实体餐饮 <span className="text-emerald-400 font-serif italic">2000+</span> 商家服务，
              <br />
              到自研 AI 商业化落地。
            </h1>

            <p className="text-sm sm:text-base text-white/85 leading-relaxed max-w-2xl drop-shadow font-sans">
              我是 <strong className="text-white font-semibold">Salin</strong>（身边朋友大多叫我<span className="text-emerald-400 font-semibold">狗哥</span>）。12年真实摸爬滚打 · 实体店创业者 · 全栈独立开发者 · 饿狸 (youeli.com) 创始人。
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="https://youeli.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold font-mono text-xs sm:text-sm inline-flex items-center gap-2 shadow-[0_0_25px_rgba(16,185,129,0.5)] transition-all cursor-pointer hover:scale-105"
              >
                <Sparkles className="w-4 h-4" />
                <span>体验旗舰：饿狸 (youeli.com) ↗</span>
              </a>
              <button
                onClick={() => scrollToSlide(1)}
                className="px-5 py-3 rounded-xl border border-white/20 hover:border-white/50 bg-white/[0.08] hover:bg-white/[0.15] text-white font-mono text-xs sm:text-sm inline-flex items-center gap-2 transition-all cursor-pointer backdrop-blur-md"
              >
                <span>下滑检阅 12 年史诗</span>
                <ChevronDown className="w-4 h-4 text-emerald-400 animate-bounce" />
              </button>
            </div>
          </div>

          {/* 底部全宽铺开参数台：从最左铺到最右，不限宽！ */}
          <div className="relative z-20 w-full px-6 sm:px-14 lg:px-20 py-3.5 flex flex-wrap items-center justify-between border-t border-white/10 bg-[#050806]/85 backdrop-blur-md font-mono text-xs">
            <div className="flex flex-wrap items-center gap-6 sm:gap-10 text-left">
              <div>
                <span className="text-white/40 text-[10px] block">ORIGIN</span>
                <span className="text-white font-bold">2014.04.01 愚人节</span>
              </div>
              <div>
                <span className="text-white/40 text-[10px] block">RESTAURANTS</span>
                <span className="text-emerald-400 font-bold">2,000+ 实体餐饮</span>
              </div>
              <div>
                <span className="text-white/40 text-[10px] block">DEV ARSENAL</span>
                <span className="text-white font-bold">252+ TSX / 2400+ 资源</span>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-2 text-white/60 text-[11px]">
              <span className="text-emerald-400">●</span>
              <span>全屏实景物证：点击右侧发光探针检视开店物证、手办与 AI 仪表盘</span>
            </div>

            <div className="flex items-center gap-2 text-white/50 text-[11px]">
              <span>[ 01 / 05 // THE FOUNDER CANVAS ]</span>
            </div>
          </div>
        </section>

        <section
          id="slide-1"
          className="w-full h-screen min-h-[680px] snap-start snap-always relative overflow-hidden flex flex-col justify-between px-6 sm:px-14 lg:px-20 2xl:px-28 pt-18 pb-6 bg-gradient-to-b from-[#050806] via-[#070d09] to-[#050806]"
        >
          {/* ============================================================ */}
          {/* 背景层次化质感增强：测绘网格 + 命运曲率光弧 + 动态纪元光晕 + 水印 */}
          {/* ============================================================ */}
          
          {/* 1. 80px 极简工程测绘微网格 (避免纯黑空洞) */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.05] z-0 select-none"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)`,
              backgroundSize: "80px 80px",
            }}
          />

          {/* 2. 十二年命运曲率轨迹线 (SVG 渐变流动虚线光弧) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-25 select-none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M -100,550 C 350,180 850,650 1920,220"
              fill="none"
              stroke="url(#odyssey-curve-grad)"
              strokeWidth="1.5"
              strokeDasharray="6 8"
            />
            <defs>
              <linearGradient id="odyssey-curve-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
                <stop offset="30%" stopColor="#10b981" stopOpacity="0.7" />
                <stop offset="70%" stopColor="#f97316" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
              </linearGradient>
            </defs>
          </svg>

          {/* 3. 随 4 大纪元联动的环境漫反射氛围光晕 (Ambient Aura) */}
          <div
            className={`absolute w-[65vw] h-[50vh] left-[18%] top-[20%] rounded-full blur-[140px] pointer-events-none transition-all duration-700 z-0 ${
              activeOdysseyStage === 0
                ? "bg-amber-500/[0.08]"
                : activeOdysseyStage === 1
                ? "bg-emerald-500/[0.08]"
                : activeOdysseyStage === 2
                ? "bg-orange-500/[0.07]"
                : "bg-emerald-400/[0.1]"
            }`}
          />

          {/* 4. 随当前纪元动态联动的巨型天际线建筑文字水印 (全屏铺开) */}
          <div className="absolute inset-x-0 top-[6%] sm:top-[7%] z-0 flex items-center justify-start overflow-hidden pointer-events-none select-none pl-6 sm:pl-14 lg:pl-20">
            <span
              key={ODYSSEY_STAGES[activeOdysseyStage].id}
              className="text-[20vw] sm:text-[18vw] font-black text-transparent bg-clip-text bg-gradient-to-r from-white/[0.14] via-white/[0.04] to-transparent whitespace-nowrap font-mono select-none uppercase drop-shadow-sm animate-in fade-in duration-500"
              style={{
                WebkitTextStroke: "1px rgba(255, 255, 255, 0.12)",
                letterSpacing: "0.02em",
              }}
            >
              {ODYSSEY_STAGES[activeOdysseyStage].watermark}
            </span>
          </div>

          {/* 5. 边缘测绘十字与档案流水标牌 (dsgnbyhl.com 取景器美学) */}
          <div className="absolute top-18 left-6 sm:left-12 font-mono text-xs text-white/30 select-none z-20 flex items-center gap-2">
            <span>[02]</span>
            <span className="hidden sm:inline text-white/20">|</span>
            <span className="hidden sm:inline text-[10px] text-white/30">STREAM // 4,380 DAYS FOUNDING ARCHIVE</span>
          </div>
          <div className="absolute top-18 right-6 sm:right-12 font-mono text-xs text-white/30 select-none z-20 flex items-center gap-2">
            <span className="hidden sm:inline text-[10px] text-emerald-400/50">PROVENANCE: LINYI · LOCAL COMMERCE</span>
            <span>THE 12-YEAR ARCHIVE // 2014—2026</span>
          </div>

          {/* 顶栏：全屏横向动态穿梭时光轨 (4 大阶段交互药丸切换器) */}
          <div className="relative z-20 w-full pt-1 pb-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2.5 border-b border-white/10">
              <div>
                <div className="inline-flex items-center gap-2 font-mono text-xs text-emerald-400 tracking-wider">
                  <Clock className="w-3.5 h-3.5 animate-pulse" />
                  INTERACTIVE TIME CAPSULE // 十二年实战演进时光轨
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight pt-0.5">
                  从餐饮服务者，到餐饮从业者，再重返服务者。
                </h2>
              </div>

              {/* 阶段快速切换按钮 */}
              <div className="flex items-center gap-1.5 font-mono text-xs">
                <span className="text-white/40 text-[11px] mr-2">
                  [{String(activeOdysseyStage + 1).padStart(2, "0")} / 04 纪元]
                </span>
                <button
                  onClick={() => setActiveOdysseyStage((prev) => (prev > 0 ? prev - 1 : ODYSSEY_STAGES.length - 1))}
                  className="px-2.5 py-1 rounded-lg border border-white/20 bg-white/[0.05] hover:bg-white/[0.12] text-white transition-colors cursor-pointer"
                  title="上一纪元"
                >
                  ← 上一阶段
                </button>
                <button
                  onClick={() => setActiveOdysseyStage((prev) => (prev < ODYSSEY_STAGES.length - 1 ? prev + 1 : 0))}
                  className="px-2.5 py-1 rounded-lg border border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 font-bold transition-colors cursor-pointer"
                  title="下一纪元"
                >
                  下一阶段 →
                </button>
              </div>
            </div>

            {/* 横向横跨的 4 大阶段时光刻度按钮条 (全屏铺开) */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 pt-2.5">
              {ODYSSEY_STAGES.map((stg, idx) => {
                const isActive = activeOdysseyStage === idx;
                return (
                  <button
                    key={stg.id}
                    onClick={() => setActiveOdysseyStage(idx)}
                    className={`relative p-2.5 sm:p-3 rounded-xl border text-left transition-all duration-300 cursor-pointer group ${
                      isActive
                        ? "border-emerald-400 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.25)]"
                        : "border-white/10 bg-white/[0.02] hover:border-white/30 hover:bg-white/[0.05]"
                    }`}
                  >
                    {isActive && (
                      <span className="absolute -top-[1px] left-3 right-3 h-[2px] bg-emerald-400 rounded-full shadow-[0_0_8px_#10b981]" />
                    )}
                    <div className="flex items-center justify-between font-mono text-xs mb-1">
                      <span className={`font-bold ${isActive ? "text-emerald-400" : "text-white/60"}`}>
                        STAGE {stg.step}
                      </span>
                      <span className={`text-[10px] ${isActive ? "text-emerald-300 font-bold" : "text-white/40"}`}>
                        {stg.era}
                      </span>
                    </div>
                    <div className="font-sans text-xs font-bold text-white line-clamp-1 group-hover:text-emerald-300 transition-colors">
                      {stg.title.split(" · ")[0]}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 中间核心：大舞台双翼联动 (随当前阶段平滑切换大图与深度叙事) */}
          {(() => {
            const currentStage = ODYSSEY_STAGES[activeOdysseyStage];
            return (
              <div
                key={currentStage.id}
                className="relative z-20 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-center my-auto animate-in fade-in zoom-in-95 duration-300"
              >
                {/* 左翼 (50%)：巨幕实拍档案大图展示 (平滑联动切换) */}
                <div className="lg:col-span-6 flex flex-col items-center">
                  <div className="relative w-full aspect-[16/10] max-h-[46vh] rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-black group">
                    <Image
                      src={currentStage.primaryImage}
                      alt={currentStage.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                    {/* 正版官方 Logo 标牌 (动态对应阶段) */}
                    <div className="absolute top-4 left-4 flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-black/85 border border-emerald-500/40 backdrop-blur-md shadow-xl">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden bg-white/10 p-0.5">
                        <Image
                          src={currentStage.logoBadge}
                          alt={currentStage.badgeTitle}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <div className="font-mono text-xs font-bold text-white flex items-center gap-1.5">
                          <span>{currentStage.badgeTitle}</span>
                          <span className="text-[10px] text-emerald-400">STAGE {currentStage.step}</span>
                        </div>
                        <div className="text-[10px] text-white/60">{currentStage.role}</div>
                      </div>
                    </div>

                    {/* 照片底部参数 */}
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between font-mono text-[11px] text-white/70">
                      <span className="px-2 py-0.5 rounded bg-black/75 border border-white/10">
                        [ {currentStage.stamp} ]
                      </span>
                      <span className="text-emerald-400 font-bold hidden sm:inline">
                        ● 纪元存档物证
                      </span>
                    </div>
                  </div>
                </div>

                {/* 右翼 (50%)：大字号纪元主标题、独白与三项核心指标 */}
                <div className="lg:col-span-6 flex flex-col justify-center space-y-3 text-left">
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-2 font-mono text-xs text-emerald-400 tracking-wider">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 font-bold">
                        {currentStage.tag}
                      </span>
                      <span className="text-white/40">/</span>
                      <span className="text-white/70">{currentStage.role}</span>
                    </div>

                    <div className="text-3xl sm:text-5xl font-black font-mono tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-white to-white/80">
                      {currentStage.era}
                    </div>

                    <h3 className="text-lg sm:text-2xl font-bold text-white tracking-tight">
                      {currentStage.title}
                    </h3>
                  </div>

                  {/* 真实感悟语录框 */}
                  <div className="p-2.5 sm:p-3 rounded-xl bg-white/[0.03] border-l-2 border-emerald-400 border-y border-r border-white/10 font-sans">
                    <p className="text-xs sm:text-sm text-emerald-100 italic leading-relaxed">
                      {currentStage.quote}
                    </p>
                  </div>

                  {/* 深度叙事段落 */}
                  <p className="text-xs text-white/75 leading-relaxed font-sans">
                    {currentStage.desc}
                  </p>

                  {/* 该纪元 3 项硬核数据 */}
                  <div className="grid grid-cols-3 gap-2 font-mono text-xs pt-1 border-t border-white/10">
                    {currentStage.metrics.map((m, i) => (
                      <div key={i} className="p-2 rounded-lg bg-white/[0.02] border border-white/5">
                        <div className="text-white/40 text-[10px]">{m.label}</div>
                        <div className="text-sm font-bold text-emerald-300 pt-0.5">{m.value}</div>
                      </div>
                    ))}
                  </div>

                  {/* 快速下一步 */}
                  <div className="flex items-center gap-3 pt-1">
                    {activeOdysseyStage < 3 ? (
                      <button
                        onClick={() => setActiveOdysseyStage(activeOdysseyStage + 1)}
                        className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold font-mono text-xs inline-flex items-center gap-1.5 transition-all cursor-pointer shadow-md hover:scale-105"
                      >
                        <span>检视下一阶段：{ODYSSEY_STAGES[activeOdysseyStage + 1].era}</span>
                        <ChevronDown className="w-3.5 h-3.5 -rotate-90" />
                      </button>
                    ) : (
                      <a
                        href="https://youeli.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold font-mono text-xs inline-flex items-center gap-1.5 transition-all cursor-pointer shadow-md hover:scale-105"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>体验 2026 旗舰成果：饿狸 (youeli.com) ↗</span>
                      </a>
                    )}
                    <button
                      onClick={() => scrollToSlide(2)}
                      className="text-white/60 hover:text-white font-mono text-xs transition-colors cursor-pointer"
                    >
                      跳过直接看产品 →
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* 底部全宽进度刻度 */}
          <div className="relative z-20 w-full pt-2 flex items-center justify-between border-t border-white/10 font-mono text-xs text-white/40">
            <div className="flex items-center gap-3">
              <span>ODYSSEY TRACK // 2014 愚人节</span>
              <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden hidden sm:block">
                <div
                  className="h-full bg-emerald-400 transition-all duration-500 shadow-[0_0_8px_#10b981]"
                  style={{ width: `${((activeOdysseyStage + 1) / 4) * 100}%` }}
                />
              </div>
              <span>2026 饿狸 AI</span>
            </div>
            <div className="text-[11px] text-emerald-400">
              ● 点击上方药丸刻度或按钮穿梭时光纪元
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SLIDE 03: 饿狸 (旗舰案例 · 实体餐饮 AI 解决方案 · youeli.com) */}
        {/* ============================================================ */}
        <section
          id="slide-2"
          className="w-full h-screen min-h-[680px] snap-start snap-always relative overflow-hidden flex flex-col justify-center px-4 sm:px-10 lg:px-16 2xl:px-24 pt-14 pb-6 bg-[#040705]"
        >
          {/* 动态全景背光光晕：随当前场景平滑切换环境色温 */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-1/4 -right-1/4 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full bg-emerald-500/10 blur-[140px] transition-all duration-1000" />
            <div className="absolute -bottom-1/4 -left-1/4 w-[70vw] h-[70vw] max-w-[700px] max-h-[700px] rounded-full bg-teal-500/10 blur-[130px] transition-all duration-1000" />
            {/* 微点阵背景纹理 */}
            <div
              className="absolute inset-0 opacity-[0.035]"
              style={{
                backgroundImage: "radial-gradient(#10b981 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />
          </div>

          {/* 巨幅建筑字体水印 YOUELI.COM (天际线延展 · 宏大品牌气势) */}
          <div className="absolute inset-x-0 top-[2%] sm:top-[3.5%] z-0 flex items-center justify-start overflow-hidden pointer-events-none select-none pl-6 sm:pl-14 lg:pl-20">
            <span
              className="text-[18vw] sm:text-[17vw] font-black text-transparent bg-clip-text bg-gradient-to-r from-white/[0.14] via-white/[0.04] to-transparent whitespace-nowrap font-mono select-none uppercase tracking-wider"
              style={{
                WebkitTextStroke: "1px rgba(255, 255, 255, 0.16)",
                letterSpacing: "0.03em",
              }}
            >
              YOUELI.COM
            </span>
          </div>

          {/* HUD 取景器标记 */}
          <div className="absolute top-18 left-6 sm:left-12 font-mono text-xs text-white/30 select-none z-10">
            [03] // FLAGSHIP AI PRODUCT
          </div>
          <div className="absolute top-18 right-6 sm:right-12 font-mono text-xs text-white/30 select-none z-10 hidden sm:block">
            AI AGENT FOR LOCAL COMMERCE · youeli.com
          </div>
          <div className="absolute bottom-16 left-6 sm:left-12 font-mono text-xs text-white/20 select-none z-10">+</div>
          <div className="absolute bottom-16 right-6 sm:right-12 font-mono text-xs text-white/20 select-none z-10">+</div>

          {/* 全屏铺开 50/50 网格主体 */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 xl:gap-14 items-center relative z-10">
            {/* 左侧 (50%)：主标语 + 饿狸吉祥物 + 现场实时“问问饿狸”AI 体验器 */}
            <div className="lg:col-span-6 flex flex-col justify-center space-y-3.5 text-left">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono text-xs backdrop-blur-sm">
                    <Bot className="w-3.5 h-3.5" />
                    FLAGSHIP // 实体商家 AI 获客武器
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-emerald-500/20 bg-black/60 text-emerald-300 font-mono text-[11px] backdrop-blur-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    饿狸 AI 正在线 · 随时提问
                  </div>
                  <a
                    href="https://youeli.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/20 bg-white/[0.06] hover:bg-white/[0.12] text-white font-mono text-xs transition-colors"
                  >
                    <span>youeli.com</span>
                    <ArrowUpRight className="w-3 h-3 text-emerald-400" />
                  </a>
                </div>

                {/* 用户钦定主标语 */}
                <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                  “餐饮营销没思路，
                  <br />
                  <span className="text-emerald-400 font-serif italic">问问饿狸。”</span>
                </h2>

                <div className="text-sm sm:text-lg font-bold font-mono text-emerald-300 tracking-wide">
                  找客流 | 做活动 | 写文案，问问饿狸。
                </div>
              </div>

              {/* 现场实时体验舱：真实餐饮场景 AI 推演交互 */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.03] border border-emerald-500/30 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)] space-y-2.5">
                <div className="flex items-center justify-between text-xs font-mono text-white/60 border-b border-white/10 pb-2">
                  <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    现场体验「问问饿狸」AI 决策
                  </span>
                  <span className="text-[10px] text-white/40">点击下方痛点 · 实时推演</span>
                </div>

                {/* 3 个实战问题标签 */}
                <div className="flex flex-wrap gap-1.5">
                  {ELI_PROMPTS.map((p, idx) => (
                    <button
                      key={p.id}
                      onClick={() => setActiveEliPrompt(idx)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                        activeEliPrompt === idx
                          ? "bg-emerald-500 text-black font-bold shadow-[0_0_12px_rgba(16,185,129,0.5)]"
                          : "bg-white/[0.05] hover:bg-white/10 text-white/70 hover:text-white border border-white/10"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>

                {/* 动态回复卡片 */}
                <div className="p-3 rounded-xl bg-black/60 border border-emerald-500/20 space-y-2 text-xs font-sans">
                  <div className="flex items-center justify-between text-[11px] font-mono text-emerald-400/80">
                    <span>💡 【{ELI_PROMPTS[activeEliPrompt].tag}】实操策略：</span>
                    <span className="text-[10px] text-white/40">用时 0.4s · 真实餐饮实战方案</span>
                  </div>
                  <div className="text-white/90 text-[12px] font-medium leading-relaxed">
                    {ELI_PROMPTS[activeEliPrompt].response.strategy}
                  </div>
                  <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5 font-mono text-[11px] text-emerald-300/90 whitespace-pre-line leading-relaxed">
                    {ELI_PROMPTS[activeEliPrompt].response.copy}
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-white/5 font-mono text-[10px] text-white/50">
                    <span>📈 预估成效：{ELI_PROMPTS[activeEliPrompt].response.metric}</span>
                    <a
                      href="https://youeli.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1 font-bold"
                    >
                      在 youeli.com 完整生成 ↗
                    </a>
                  </div>
                </div>
              </div>

              {/* 行动按钮 */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href="https://youeli.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold font-mono text-xs sm:text-sm inline-flex items-center gap-2 shadow-[0_0_25px_rgba(16,185,129,0.45)] transition-all cursor-pointer group"
                >
                  <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  立即访问 youeli.com 官网 ↗
                </a>
                <Link
                  href="/projects/eli"
                  className="px-4 py-2.5 rounded-xl border border-white/20 hover:border-emerald-500/50 bg-white/[0.05] hover:bg-white/[0.08] text-white font-mono text-xs sm:text-sm inline-flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Layers className="w-4 h-4 text-emerald-400" />
                  查看案例复盘
                </Link>
                <button
                  onClick={() => setShowQrModal(true)}
                  className="px-4 py-2.5 rounded-xl border border-white/20 hover:border-white/40 bg-white/[0.05] text-white font-mono text-xs sm:text-sm inline-flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Scan className="w-4 h-4 text-emerald-400" />
                  预约门店方案
                </button>
              </div>
            </div>

            {/* 右侧 (50%)：饿狸 3D 真实实战场景画卷 + 浮动数据 HUD 遥测芯片 */}
            <div className="lg:col-span-6 flex flex-col items-center space-y-2.5 w-full">
              {/* 场景切换药丸导航 */}
              <div className="flex items-center gap-1.5 p-1 rounded-full bg-white/[0.04] border border-white/10 font-mono text-[11px] w-full max-w-lg justify-between">
                {ELI_SCENES.map((scene) => (
                  <button
                    key={scene.id}
                    onClick={() => setActiveEliScene(scene)}
                    className={`flex-1 py-1.5 px-2 rounded-full transition-all cursor-pointer text-center text-xs ${
                      activeEliScene.id === scene.id
                        ? "bg-emerald-500 text-black font-bold shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                        : "text-white/70 hover:text-white hover:bg-white/[0.05]"
                    }`}
                  >
                    {scene.label}
                  </button>
                ))}
              </div>

              {/* 大图容器 (带浮动 HUD 数据卡片) */}
              <div className="relative w-full aspect-[16/10] max-h-[50vh] rounded-2xl overflow-hidden border border-emerald-500/40 shadow-[0_0_60px_rgba(16,185,129,0.25)] bg-black group">
                <Image
                  src={activeEliScene.image}
                  alt={activeEliScene.label}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                />
                {/* 景深暗角与渐变过渡 */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30 pointer-events-none" />

                {/* 浮动 HUD 遥测芯片 (顶部) */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                  <div className="px-2.5 py-1 rounded-lg bg-black/80 border border-emerald-500/40 backdrop-blur-md font-mono text-[11px] text-emerald-300 flex items-center gap-1.5 shadow-lg">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    {activeEliScene.telemetryTop}
                  </div>
                  <div className="px-2.5 py-1 rounded-lg bg-black/80 border border-white/15 backdrop-blur-md font-mono text-[10px] text-white/70 hidden sm:block">
                    LIVE PRODUCTION SCENE
                  </div>
                </div>

                {/* 浮动 HUD 遥测芯片 (底部信息卡) */}
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-black/85 border border-white/15 backdrop-blur-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div className="space-y-0.5 text-left">
                    <div className="font-mono text-xs text-emerald-400 font-bold flex items-center gap-1.5">
                      <span>[ {activeEliScene.label} // {activeEliScene.sub} ]</span>
                    </div>
                    <div className="text-[11px] text-white/80 line-clamp-1">
                      {activeEliScene.desc}
                    </div>
                  </div>
                  <a
                    href="https://youeli.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 px-3 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 hover:text-white font-mono text-[11px] font-bold transition-colors inline-flex items-center gap-1"
                  >
                    <span>youeli.com</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* 场景简要说明条 */}
              <div className="w-full max-w-lg flex items-center justify-between text-[11px] font-mono text-white/40 px-2">
                <span>📍 12年实体餐饮一线方法论打包</span>
                <span className="text-emerald-400/80 font-bold">已服务 2000+ 家门店</span>
              </div>
            </div>
          </div>
        </section>


        {/* ============================================================ */}
        {/* SLIDE 04: 双核开发者与商业军火库 (Salin UI + 狗哥资源库) */}
        {/* ============================================================ */}
        <section
          id="slide-3"
          className="w-full h-screen min-h-[680px] snap-start snap-always relative overflow-hidden flex flex-col justify-center px-4 sm:px-12 lg:px-20 pt-16 pb-8 bg-gradient-to-b from-[#050806] via-[#090e0b] to-[#050806]"
        >
          <div className="absolute top-18 left-6 sm:left-12 font-mono text-xs text-white/20 select-none">[04]</div>
          <div className="absolute top-18 right-6 sm:right-12 font-mono text-xs text-white/20 select-none">
            DUAL ARSENAL // UI & RESOURCES
          </div>

          <div className="w-full px-6 sm:px-14 lg:px-20 2xl:px-28 space-y-5">
            <div className="text-center max-w-3xl mx-auto space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono text-xs">
                <Database className="w-3.5 h-3.5" />
                BUILDER ECOSYSTEM // 开发者与实体商业双核弹药
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                前端纯净代码库，与两千份落地商业资产。
              </h2>
            </div>

            {/* 双大卡横向对比布局 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch pt-1">
              {/* 卡片 A: Salin UI */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:p-5 flex flex-col justify-between hover:border-emerald-500/40 transition-all group">
                <div className="space-y-3">
                  <div className="relative w-full aspect-[16/9] max-h-[28vh] rounded-xl overflow-hidden border border-white/10 bg-black">
                    <Image
                      src="/images/showcase/project-salin-ui.jpg"
                      alt="Salin UI 开发者组件弹药库大图"
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 border border-white/10 font-mono text-[10px] text-emerald-400">
                      252+ TSX COMPONENTS
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between font-mono text-xs text-emerald-400 mb-1">
                      <span className="font-bold">SALIN UI // 前端设计军火库</span>
                      <span className="text-white/40">REACT 19 & TAILWIND V4</span>
                    </div>
                    <p className="text-xs text-white/70 leading-relaxed font-sans">
                      专为 Cursor、Claude、Antigravity 调教极致优雅的前端骨架。零冗余三方包、纯净 TSX，原生 MCP 协议支持。
                    </p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-black/80 border border-white/10 font-mono text-xs flex items-center justify-between">
                    <code className="text-emerald-300 text-[11px] truncate">
                      npx salin-ui add @mcp/server
                    </code>
                    <button
                      onClick={handleCopyMcp}
                      className="px-2 py-1 rounded bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-[10px] inline-flex items-center gap-1 cursor-pointer"
                    >
                      {copiedMcp ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedMcp ? "已复制" : "复制"}</span>
                    </button>
                  </div>
                </div>

                <div className="pt-3 flex items-center justify-between border-t border-white/10 font-mono text-xs">
                  <span className="text-white/40 text-[11px]">文档: salin.wang/ui</span>
                  <a
                    href="https://salin.wang/ui"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-white/[0.08] hover:bg-white/[0.15] text-white font-bold inline-flex items-center gap-1 transition-colors"
                  >
                    <span>体验 Salin UI ↗</span>
                  </a>
                </div>
              </div>

              {/* 卡片 B: 狗哥资源站 (Gouge Hub) */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:p-5 flex flex-col justify-between hover:border-emerald-500/40 transition-all group">
                <div className="space-y-3">
                  <div className="relative w-full aspect-[16/9] max-h-[28vh] rounded-xl overflow-hidden border border-white/10 bg-black">
                    <Image
                      src="/images/showcase/project-gouge-hub.jpg"
                      alt="狗哥资源库 2400+ 免费商业资产大图"
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 border border-white/10 font-mono text-[10px] text-emerald-400">
                      2,400+ 免费商业与 AI 资产
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between font-mono text-xs text-emerald-400 mb-1">
                      <span className="font-bold">狗哥资源库 // GOUGE HUB</span>
                      <span className="text-white/40">zl.eyu.ink · 免费开放</span>
                    </div>
                    <p className="text-xs text-white/70 leading-relaxed font-sans">
                      汇集 12 年沉淀的餐饮营销策划、自媒体运营模版、实战 Prompt 词库与商业闭环 SOP，永久免费开放给全国创业者与开发者。
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-2 font-mono text-[11px] text-center">
                    <div className="p-1.5 rounded bg-white/[0.03] border border-white/5 text-white/80">
                      2400+ 资产
                    </div>
                    <div className="p-1.5 rounded bg-white/[0.03] border border-white/5 text-white/80">
                      实体店策划
                    </div>
                    <div className="p-1.5 rounded bg-white/[0.03] border border-white/5 text-emerald-400">
                      永久免费
                    </div>
                  </div>
                </div>

                <div className="pt-3 flex items-center justify-between border-t border-white/10 font-mono text-xs">
                  <span className="text-white/40 text-[11px]">备用: ziliaoku.fun</span>
                  <a
                    href="https://zl.eyu.ink"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-bold inline-flex items-center gap-1 transition-colors"
                  >
                    <span>进入狗哥资源库 ↗</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SLIDE 05: 真实生活、手办与触达优化 (三栏画卷 左实拍人物，中手办展柜，右触达控制台) */}
        {/* ============================================================ */}
        <section
          id="slide-4"
          className="w-full h-screen min-h-[680px] snap-start snap-always relative overflow-hidden flex flex-col justify-center px-4 sm:px-12 lg:px-20 pt-16 pb-6 bg-gradient-to-b from-[#050806] via-[#09100c] to-[#040605]"
        >
          <div className="absolute top-18 left-6 sm:left-12 font-mono text-xs text-white/20 select-none">[05]</div>
          <div className="absolute top-18 right-6 sm:right-12 font-mono text-xs text-white/20 select-none">
            STUDIO & CONNECT // 真实与触达
          </div>

          <div className="w-full px-6 sm:px-14 lg:px-20 2xl:px-28 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* 栏 1 (左 28%)：2025 山路人物实拍大图 */}
            <div className="lg:col-span-3 hidden lg:flex flex-col items-center">
              <div className="relative w-full aspect-[3/4] max-h-[56vh] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black group">
                <Image
                  src="/images/portrait/salin-2025.jpg"
                  alt="2025年 Salin 在山路上的实拍照片"
                  fill
                  sizes="(max-width: 1024px) 100vw, 30vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 font-mono text-[10px] text-white/70 flex items-center justify-between">
                  <span className="px-1.5 py-0.5 rounded bg-black/70 border border-white/10">
                    2025 · MOUNTAIN ROAD
                  </span>
                  <span className="text-emerald-400">KEEP REAL</span>
                </div>
              </div>
            </div>

            {/* 栏 2 (中 44%)：桌面手办与灵感物件展柜 */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-3">
              <div>
                <div className="inline-flex items-center gap-1.5 font-mono text-xs text-emerald-400 tracking-wider mb-1">
                  <Coffee className="w-3.5 h-3.5" />
                  DESK TOYS & SPIRIT INSPIRATION
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  桌面上的公仔，写代码时的少年气。
                </h3>
              </div>

              {/* 4 个手办网格 */}
              <div className="grid grid-cols-4 gap-2">
                {DESK_TOYS.map((toy) => (
                  <button
                    key={toy.id}
                    onClick={() => setSelectedToy(toy)}
                    className={`p-1.5 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedToy.id === toy.id
                        ? "border-emerald-400 bg-emerald-500/10 shadow-[0_0_12px_rgba(16,185,129,0.3)]"
                        : "border-white/10 bg-white/[0.02] hover:border-white/30"
                    }`}
                  >
                    <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-black/60 mb-1">
                      <Image
                        src={toy.image}
                        alt={toy.name}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <div className="font-mono text-[11px] font-bold text-white truncate text-center">
                      {toy.name}
                    </div>
                  </button>
                ))}
              </div>

              {/* 当前选中手办独白 */}
              <div className="p-3 rounded-xl bg-white/[0.04] border border-emerald-500/30 font-sans space-y-1">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="font-bold text-emerald-400">{selectedToy.series}</span>
                  <span className="text-white/40 text-[10px]">{selectedToy.tag}</span>
                </div>
                <div className="text-xs font-bold text-white italic">
                  “{selectedToy.motto}”
                </div>
                <p className="text-[11px] text-white/75 leading-relaxed">
                  {selectedToy.desc}
                </p>
              </div>

              {/* 破冰交流建议 */}
              <div className="space-y-1.5 font-mono text-[11px]">
                <div className="text-white/40 flex items-center gap-1">
                  <MessageCircle className="w-3 h-3 text-emerald-400" />
                  <span>点击快捷复制沟通意向（可直接在微信中粘贴）：</span>
                </div>
                <div className="flex flex-col gap-1">
                  {CONVERSATION_STARTERS.map((topic, i) => (
                    <button
                      key={i}
                      onClick={() => handleCopyTopic(topic)}
                      className="px-2.5 py-1 rounded bg-white/[0.03] hover:bg-emerald-500/10 border border-white/10 hover:border-emerald-500/40 text-left text-white/80 hover:text-white transition-all cursor-pointer flex items-center justify-between group"
                    >
                      <span className="truncate">{topic}</span>
                      <span className="text-[10px] text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity ml-2 shrink-0">
                        {copiedTopic === topic ? "已复制!" : "复制"}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 栏 3 (右 28%~32%)：直达连接控制台 */}
            <div className="lg:col-span-4 flex flex-col justify-center space-y-3.5 p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/10 shadow-xl">
              <div>
                <div className="font-mono text-xs text-emerald-400 font-bold mb-1">
                  DIRECT ACCESS // 快速联系
                </div>
                <h4 className="text-lg font-bold text-white">随时与 Salin 打个招呼</h4>
                <p className="text-xs text-white/60 pt-0.5">
                  实体获客、代码合作、亦或交流创业经历，皆可直接沟通。
                </p>
              </div>

              {/* 微信控制卡片 */}
              <div className="p-3 rounded-xl bg-black/60 border border-emerald-500/40 space-y-2">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowQrModal(true)}
                    className="relative w-14 h-14 rounded-lg overflow-hidden border border-emerald-500/50 bg-white p-0.5 shrink-0 cursor-pointer group"
                    title="点击放大二维码"
                  >
                    <Image
                      src="/images/wechat-qr.jpg"
                      alt="Salin 微信二维码缩略图"
                      fill
                      className="object-contain p-0.5 group-hover:scale-105 transition-transform"
                    />
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] text-white/40 font-mono">WECHAT ID</div>
                    <div className="text-sm font-mono font-bold text-emerald-400 truncate">
                      {siteConfig.wechat}
                    </div>
                    <div className="text-[10px] text-white/60">扫码或复制均可添加</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 font-mono text-xs pt-1">
                  <button
                    onClick={handleCopyWechat}
                    className="py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-bold inline-flex items-center justify-center gap-1 cursor-pointer transition-colors"
                  >
                    {copiedWechat ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedWechat ? "已复制" : "复制微信"}</span>
                  </button>
                  <button
                    onClick={() => setShowQrModal(true)}
                    className="py-1.5 rounded-lg border border-white/20 hover:border-white/40 bg-white/[0.05] text-white font-medium inline-flex items-center justify-center gap-1 cursor-pointer transition-colors"
                  >
                    <Scan className="w-3 h-3 text-emerald-400" />
                    <span>查看大码</span>
                  </button>
                </div>
              </div>

              {/* 邮箱直达 */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/10 font-mono text-xs">
                <div className="truncate">
                  <span className="text-white/40 text-[10px] block">EMAIL</span>
                  <span className="text-white text-xs">{siteConfig.email}</span>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="px-2 py-1 rounded bg-white/[0.08] hover:bg-white/[0.15] text-white text-[11px] cursor-pointer"
                >
                  {copiedEmail ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>

              {/* 阵地链接 */}
              <div className="pt-1 flex flex-wrap items-center gap-3 font-mono text-[11px] text-white/50 border-t border-white/10 pt-2">
                <a href="https://github.com/wangsalin" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
                  GitHub ↗
                </a>
                <a href="https://x.com/EyuSalin" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
                  X (Twitter) ↗
                </a>
                <a href="https://zl.eyu.ink" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
                  资源库 ↗
                </a>
                <span>公众号: 狗哥的胡思乱想</span>
              </div>
            </div>
          </div>

          {/* 极简底部声明 */}
          <div className="absolute bottom-1.5 left-0 right-0 text-center font-mono text-[10px] text-white/25">
            © 2014—2026 SALIN. ALL RIGHTS RESERVED. 35.1041° N, 118.3561° E.
          </div>
        </section>
      </div>

      {/* 微信二维码高清弹窗 */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm rounded-2xl bg-[#0c120e] border border-emerald-500/40 p-6 text-center shadow-2xl space-y-4">
            <button
              onClick={() => setShowQrModal(false)}
              className="absolute top-4 right-4 p-1 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <div className="font-mono text-xs text-emerald-400 font-bold tracking-wider">
                WECHAT DIRECT // 微信直接沟通
              </div>
              <h3 className="text-xl font-bold text-white">扫描二维码添加微信</h3>
              <p className="text-xs text-white/60">
                微信号: <code className="text-emerald-400 font-mono font-bold">{siteConfig.wechat}</code>
              </p>
            </div>

            <div className="relative w-56 h-56 mx-auto rounded-xl overflow-hidden border-2 border-emerald-500/50 bg-white p-2 shadow-inner">
              <Image
                src="/images/wechat-qr.jpg"
                alt="Salin 微信二维码"
                fill
                className="object-contain p-1"
              />
            </div>

            <div className="pt-1">
              <button
                onClick={handleCopyWechat}
                className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold font-mono text-xs inline-flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                {copiedWechat ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedWechat ? "微信号已成功复制" : "复制微信号 50219067"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    
      {/* ============================================================ */}
            {/* ============================================================ */}
      {/* 电影级原位破晓开幕光效 (In-Situ Cinematic Dawn Reveal · 无遮挡·眼前一亮) */}
      {/* ============================================================ */}
      <div
        className={`fixed inset-0 z-50 pointer-events-none flex items-center justify-center transition-opacity duration-700 ${
          isDawnRevealing ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* 顶部宽银幕轻量遮幅条 (2.39:1 瞬时扩展展开) */}
        <div
          className={`absolute top-0 inset-x-0 bg-black/75 backdrop-blur-xs border-b border-white/10 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-between px-6 sm:px-12 ${
            dawnFlareStep === "igniting" || dawnFlareStep === "flaring"
              ? "h-7 sm:h-8 translate-y-0"
              : "h-7 sm:h-8 -translate-y-full"
          }`}
        >
          <div className="font-mono text-[10px] text-emerald-400/80 tracking-widest flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            SALIN // CINEMATIC ODYSSEY 2014—2026
          </div>
          <div className="font-mono text-[10px] text-white/40 tracking-wider hidden sm:block">
            ASPECT: 2.39:1 WIDESCREEN REVEAL
          </div>
        </div>

        {/* 底部宽银幕轻量遮幅条 */}
        <div
          className={`absolute bottom-0 inset-x-0 bg-black/75 backdrop-blur-xs border-t border-white/10 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-between px-6 sm:px-12 ${
            dawnFlareStep === "igniting" || dawnFlareStep === "flaring"
              ? "h-7 sm:h-8 translate-y-0"
              : "h-7 sm:h-8 translate-y-full"
          }`}
        >
          <div className="font-mono text-[10px] text-white/40 tracking-wider">
            35.1041° N, 118.3561° E · LINYI
          </div>
          <div className="font-mono text-[10px] text-emerald-400/90 font-bold">
            FOUNDER CANVAS: LIVE
          </div>
        </div>

        {/* 宽银幕破晓水平激光激光束 (Anamorphic Laser Flare Beam) */}
        <div
          className={`w-full h-[2px] bg-gradient-to-r from-transparent via-emerald-100 via-white to-transparent shadow-[0_0_35px_#10b981,0_0_80px_rgba(52,211,153,0.9)] transition-all duration-700 ease-out ${
            dawnFlareStep === "igniting"
              ? "scale-x-0 opacity-0"
              : dawnFlareStep === "flaring"
              ? "scale-x-100 opacity-100 scale-y-100"
              : "scale-x-100 opacity-0 scale-y-[20]"
          }`}
        />

        {/* 中央破晓环晕 */}
        <div
          className={`absolute w-[500px] h-[500px] rounded-full bg-radial from-emerald-400/25 via-emerald-500/5 to-transparent blur-3xl transition-all duration-700 ease-out ${
            dawnFlareStep === "flaring" ? "scale-100 opacity-100" : "scale-140 opacity-0"
          }`}
        />
      </div>
</div>
  );
}
