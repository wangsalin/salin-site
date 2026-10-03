"use client";

import { useState, useRef, useEffect } from "react";
import { Music, Volume2, VolumeX, Play, Pause, ChevronRight, X, Disc3, Sparkles } from "lucide-react";
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
          className="absolute left-0 bottom-1 w-8 sm:w-9 h-12 sm:h-14 bg-[var(--surface-elevated)] border border-[var(--border-glass)] rounded-l-2xl flex items-center justify-center text-[var(--brand)] font-black backdrop-blur-xl shadow-lg cursor-pointer hover:bg-[var(--surface)] transition-colors"
          title="展开播放盒"
        >
          <Music size={16} />
        </button>
      )}

      {/* Main floating pill button */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setIsTucked(true)}
          className="hidden sm:flex w-7 h-7 rounded-full bg-[var(--surface-glass)] border border-[var(--border-glass)] backdrop-blur-md items-center justify-center text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--brand)]/30 transition-all cursor-pointer shadow-2xs"
          title="收进右侧边缘"
        >
          <ChevronRight size={14} />
        </button>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2.5 p-1.5 sm:px-3 sm:py-2 rounded-full sm:rounded-2xl border border-[var(--border-glass)] bg-[var(--surface-glass-heavy)] backdrop-blur-2xl shadow-xl shadow-emerald-950/10 hover:border-[var(--brand)]/30 hover:bg-[var(--surface-elevated)] transition-all cursor-pointer text-left group"
          title="狗哥的播放盒"
        >
          {/* Spinning disc indicator */}
          <span
            className={cn(
              "w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr from-[var(--brand)] to-[var(--accent)] flex items-center justify-center text-white shrink-0 shadow-md shadow-emerald-500/20",
              isPlaying && "animate-[spin_4s_linear_infinite]"
            )}
          >
            <Music size={14} />
          </span>
          <div className="hidden sm:flex flex-col min-w-0 pr-1">
            <span className="text-xs font-bold text-[var(--text-primary)] tracking-tight whitespace-nowrap">
              狗哥的播放盒
            </span>
            <span className="text-[10px] text-[var(--text-muted)] truncate max-w-[120px] font-mono">
              {isPlaying ? currentTrack.title : "环境音 · 点击选歌"}
            </span>
          </div>
          <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-[var(--brand)] ml-1" />
        </button>
      </div>

      {/* Pop-up Jukebox Panel */}
      {isOpen && (
        <div className="absolute right-0 bottom-[calc(100%+14px)] w-[calc(100vw-28px)] max-w-[340px] sm:max-w-[360px] p-5 sm:p-6 rounded-3xl border border-[var(--border-glass)] bg-[var(--surface-elevated)]/95 backdrop-blur-2xl shadow-2xl shadow-emerald-950/20 text-[var(--text-primary)] animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-start justify-between mb-4 pb-3 border-b border-[var(--border-glass)]">
            <div>
              <span className="text-[10px] font-mono font-bold text-[var(--brand)] tracking-widest uppercase block">
                THE AMBIENT JUKEBOX
              </span>
              <h3 className="text-base sm:text-lg font-black tracking-tight mt-0.5">今天，听点什么？</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 rounded-full border border-[var(--border-glass)] bg-[var(--surface)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--brand)]/30 flex items-center justify-center text-sm font-bold transition-all cursor-pointer"
            >
              <X size={14} />
            </button>
          </div>

          {/* Current track card */}
          <div className="p-3.5 rounded-2xl border border-[var(--border-glass)] bg-[var(--surface)] flex items-center gap-3.5 mb-4 shadow-sm">
            <div className="w-14 h-14 rounded-xl bg-slate-950 text-[var(--accent)] flex items-center justify-center shrink-0 border border-[var(--border-glass)] shadow-inner">
              <Disc3 size={28} className={cn(isPlaying && "animate-spin text-emerald-400")} />
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="inline-block self-start text-[9px] font-mono font-bold px-2 py-0.5 bg-[var(--brand)]/10 text-[var(--brand)] border border-[var(--brand)]/20 rounded-full mb-1">
                {currentTrack.mood}
              </span>
              <strong className="text-xs sm:text-sm font-bold truncate text-[var(--text-primary)]">{currentTrack.title}</strong>
              <small className="text-[11px] text-[var(--text-muted)] truncate">{currentTrack.artist}</small>
            </div>
          </div>

          {/* Player controls */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <button
              onClick={() => setCurrentTrackIndex((prev) => (prev > 0 ? prev - 1 : TRACKS.length - 1))}
              className="w-8 h-8 rounded-full border border-[var(--border-glass)] bg-[var(--surface)] flex items-center justify-center text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--brand)]/30 transition-all cursor-pointer"
            >
              ←
            </button>
            <button
              onClick={togglePlay}
              className="w-11 h-11 rounded-full bg-[var(--brand)] text-[var(--brand-foreground)] flex items-center justify-center text-base font-bold shadow-md shadow-emerald-500/25 hover:opacity-95 transition-all cursor-pointer"
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
            </button>
            <button
              onClick={() => setCurrentTrackIndex((prev) => (prev < TRACKS.length - 1 ? prev + 1 : 0))}
              className="w-8 h-8 rounded-full border border-[var(--border-glass)] bg-[var(--surface)] flex items-center justify-center text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--brand)]/30 transition-all cursor-pointer"
            >
              →
            </button>
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="w-8 h-8 rounded-full border border-[var(--border-glass)] bg-[var(--surface)] flex items-center justify-center text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--brand)]/30 transition-all cursor-pointer ml-1"
              title={isMuted ? "取消静音" : "静音"}
            >
              {isMuted ? <VolumeX size={14} className="text-rose-500" /> : <Volume2 size={14} />}
            </button>
          </div>

          {/* Track playlist */}
          <div className="space-y-1.5 pt-3 border-t border-[var(--border-glass)]">
            <div className="flex justify-between items-center text-[10px] font-mono font-bold uppercase text-[var(--text-muted)] px-1 mb-1.5">
              <span>随身现场 BGM</span>
              <span>03 首环境音</span>
            </div>
            {TRACKS.map((t, i) => (
              <button
                key={t.id}
                onClick={() => {
                  setCurrentTrackIndex(i);
                  setIsPlaying(true);
                }}
                className={cn(
                  "w-full px-3 py-2 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer",
                  currentTrackIndex === i
                    ? "bg-[var(--brand)]/10 border-[var(--brand)]/30 font-bold text-[var(--brand)]"
                    : "border-transparent bg-transparent hover:bg-[var(--surface)] text-[var(--text-secondary)]"
                )}
              >
                <div className="flex items-center gap-2 truncate">
                  <span className="text-[10px] font-mono opacity-60">0{i + 1}</span>
                  <span className="text-xs truncate">{t.title}</span>
                </div>
                {currentTrackIndex === i && isPlaying && (
                  <span className="text-[10px] font-mono font-bold text-[var(--brand)] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand)] animate-pulse" />
                    播放中
                  </span>
                )}
              </button>
            ))}
          </div>

          <p className="mt-3 text-[10px] text-[var(--text-muted)] text-center">
            声音由轻量现场合成器生成，默认静音，点击选歌播放。
          </p>
        </div>
      )}
    </aside>
  );
}
