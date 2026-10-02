"use client";

import { useState, useRef, useEffect } from "react";
import { Music, Volume2, VolumeX, Play, Pause, ChevronRight, X, Disc3 } from "lucide-react";
import { cn } from "@/lib/cn";

interface Track {
  id: string;
  title: string;
  artist: string;
  mood: string;
  type: "lofi" | "rain" | "keyboard";
}

const TRACKS: Track[] = [
  { id: "1", title: "深夜敲代码 (Lo-Fi Chords)", artist: "Wang Salin · 沉浸工作流", mood: "深夜 / 专注沉浸", type: "lofi" },
  { id: "2", title: "临沂清晨与热咖啡", artist: "现场环境音 · 驻场纪实", mood: "清晨 / 慢下来思考", type: "rain" },
  { id: "3", title: "机械键盘与代码生成", artist: "FDE 现场 · 交付中", mood: "实战 / 灵感流动", type: "keyboard" },
];

export function SoundDock() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isTucked, setIsTucked] = useState(false);

  // Web Audio Context for synthesized relaxing ambient soundtrack
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorNodesRef = useRef<any[]>([]);
  const gainNodeRef = useRef<GainNode | null>(null);

  const currentTrack = TRACKS[currentTrackIndex];

  const stopAudio = () => {
    if (audioCtxRef.current) {
      try {
        oscillatorNodesRef.current.forEach((n) => {
          try { n.stop(); n.disconnect(); } catch {}
        });
        oscillatorNodesRef.current = [];
        if (gainNodeRef.current) {
          gainNodeRef.current.disconnect();
          gainNodeRef.current = null;
        }
      } catch {}
    }
  };

  const startAudio = () => {
    stopAudio();
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(isMuted ? 0 : 0.08, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Generate a warm soothing ambient triad pad chord
      const freqs = currentTrack.type === "lofi" ? [220, 277.18, 329.63] : currentTrack.type === "rain" ? [174.61, 220, 261.63] : [196, 246.94, 293.66];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // subtle LFO modulation for warm vinyl feel
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.setValueAtTime(0.2 + idx * 0.1, ctx.currentTime);
        lfoGain.gain.setValueAtTime(1.5, ctx.currentTime);
        lfo.connect(osc.frequency);
        lfo.start();

        oscGain.gain.setValueAtTime(0.04, ctx.currentTime);
        osc.connect(oscGain);
        oscGain.connect(masterGain);
        osc.start();

        oscillatorNodesRef.current.push(osc, lfo);
      });
    } catch (e) {
      console.error("Audio synthesis error:", e);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      startAudio();
    } else {
      stopAudio();
    }
    return () => stopAudio();
  }, [isPlaying, currentTrackIndex]);

  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(isMuted ? 0 : 0.08, audioCtxRef.current.currentTime);
    }
  }, [isMuted]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <aside
      className={cn(
        "fixed z-50 right-3 sm:right-7 bottom-[calc(14px+env(safe-area-inset-bottom,0px))] sm:bottom-7 transition-all duration-300 font-sans",
        isTucked ? "translate-x-[calc(100%-36px)]" : "translate-x-0"
      )}
      aria-label="狗哥的现场播放盒"
    >
      {/* Return button when tucked */}
      {isTucked && (
        <button
          onClick={() => setIsTucked(false)}
          className="absolute left-0 bottom-1 w-8 sm:w-9 h-12 sm:h-14 bg-[#d5f085] border-2 border-[#202126] rounded-l-xl flex items-center justify-center text-[#202126] font-black shadow-[-3px_3px_0px_#202126] cursor-pointer hover:bg-[#c6e86b]"
          title="展开播放盒"
        >
          ♫
        </button>
      )}

      {/* Main floating pill button */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        <button
          type="button"
          onClick={() => setIsTucked(true)}
          className="hidden sm:flex w-7 h-7 rounded-full bg-[#d5f085] border border-[#202126] items-center justify-center text-xs font-bold text-[#202126] shadow-[2px_2px_0px_#202126] hover:bg-[#fff] cursor-pointer"
          title="收进右侧边缘"
        >
          →
        </button>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 p-1 sm:px-3 sm:py-2 bg-[#fffdf5] border-2 border-[#202126] rounded-full sm:rounded-2xl shadow-[3px_3px_0px_#202126] sm:shadow-[4px_4px_0px_#202126] hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#202126] transition-all cursor-pointer text-left"
          title="狗哥的播放盒"
        >
          {/* Spinning disc indicator */}
          <span
            className={cn(
              "w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-[#202126] bg-[#d5f085] flex items-center justify-center text-xs sm:text-base text-[#202126] shrink-0",
              isPlaying && "animate-[spin_4s_linear_infinite]"
            )}
          >
            ♫
          </span>
          <div className="hidden sm:flex flex-col min-w-0 pr-1">
            <span className="text-xs font-black text-[#202126] tracking-tight whitespace-nowrap">
              狗哥的播放盒
            </span>
            <span className="text-[10px] text-[#6b6775] font-semibold truncate max-w-[110px]">
              {isPlaying ? currentTrack.title : "默认安静 · 点击选歌"}
            </span>
          </div>
          <span className="hidden sm:inline text-xs font-bold text-[#202126] pl-1">↗</span>
        </button>
      </div>

      {/* Pop-up Jukebox Panel */}
      {isOpen && (
        <div className="absolute right-0 bottom-[calc(100%+12px)] w-[calc(100vw-28px)] max-w-[340px] sm:max-w-[350px] p-4 sm:p-5 bg-[#fffdf7] border-2 border-[#202126] rounded-2xl shadow-[6px_6px_0px_#202126] sm:shadow-[8px_9px_0px_#202126] text-[#202126] animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-start justify-between mb-4 pb-2 border-b border-[#202126]/20">
            <div>
              <span className="text-[10px] font-mono font-black text-[#6355b8] tracking-widest uppercase block">
                THE LITTLE JUKEBOX / 01
              </span>
              <h3 className="text-lg font-black tracking-tight mt-0.5">今天，听点什么？</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 rounded-full border border-[#202126] bg-white flex items-center justify-center text-sm font-bold hover:bg-[#d5f085] cursor-pointer"
            >
              ×
            </button>
          </div>

          {/* Current track card */}
          <div className="p-3.5 bg-[#ebe7ff] border-2 border-[#202126] rounded-xl flex items-center gap-3.5 mb-4 shadow-[3px_3px_0px_#202126]">
            <div className="w-16 h-16 rounded-lg bg-[#202126] flex items-center justify-center text-[#d5f085] text-2xl font-black shrink-0 border border-[#202126]">
              <Disc3 size={32} className={cn(isPlaying && "animate-spin")} />
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="inline-block self-start text-[9px] font-black px-1.5 py-0.5 bg-[#d5f085] rounded text-[#202126] mb-1">
                {currentTrack.mood}
              </span>
              <strong className="text-sm font-black truncate">{currentTrack.title}</strong>
              <small className="text-[11px] text-[#635d72] font-semibold truncate">{currentTrack.artist}</small>
            </div>
          </div>

          {/* Player controls */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <button
              onClick={() => setCurrentTrackIndex((prev) => (prev > 0 ? prev - 1 : TRACKS.length - 1))}
              className="w-8 h-8 rounded-full border border-[#202126] bg-white flex items-center justify-center text-xs font-black hover:bg-[#ebe7ff] cursor-pointer"
            >
              ←
            </button>
            <button
              onClick={togglePlay}
              className="w-11 h-11 rounded-full border-2 border-[#202126] bg-[#d5f085] flex items-center justify-center text-base font-black shadow-[3px_3px_0px_#202126] hover:bg-[#c8e86e] cursor-pointer"
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
            </button>
            <button
              onClick={() => setCurrentTrackIndex((prev) => (prev < TRACKS.length - 1 ? prev + 1 : 0))}
              className="w-8 h-8 rounded-full border border-[#202126] bg-white flex items-center justify-center text-xs font-black hover:bg-[#ebe7ff] cursor-pointer"
            >
              →
            </button>
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="w-8 h-8 rounded-full border border-[#202126] bg-white flex items-center justify-center text-xs font-black hover:bg-[#ebe7ff] cursor-pointer ml-2"
              title={isMuted ? "取消静音" : "静音"}
            >
              {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </button>
          </div>

          {/* Track playlist */}
          <div className="space-y-1.5 pt-2 border-t border-[#202126]/20">
            <div className="flex justify-between items-center text-[11px] font-black text-[#555260] px-1 mb-1">
              <span>狗哥的随身现场 BGM</span>
              <span className="font-mono">03 首环境音</span>
            </div>
            {TRACKS.map((t, i) => (
              <button
                key={t.id}
                onClick={() => {
                  setCurrentTrackIndex(i);
                  setIsPlaying(true);
                }}
                className={cn(
                  "w-full px-2.5 py-1.5 rounded-lg border text-left flex items-center justify-between transition-colors cursor-pointer",
                  currentTrackIndex === i
                    ? "bg-[#eff8d7] border-[#202126] font-black"
                    : "border-transparent hover:bg-slate-100 font-medium text-[#444]"
                )}
              >
                <div className="flex items-center gap-2 truncate">
                  <span className="text-[10px] font-mono text-[#888]">0{i + 1}</span>
                  <span className="text-xs truncate">{t.title}</span>
                </div>
                {currentTrackIndex === i && isPlaying && (
                  <span className="text-[10px] font-black text-[#5844bb]">播放中</span>
                )}
              </button>
            ))}
          </div>

          <p className="mt-3 text-[10px] text-[#7d7986] font-medium text-center">
            声音由现场合成器轻量播放，默认静音，点播放才会响起。
          </p>
        </div>
      )}
    </aside>
  );
}
