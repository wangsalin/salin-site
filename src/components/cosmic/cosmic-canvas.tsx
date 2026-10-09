"use client";

import React, { useEffect, useRef } from "react";

interface CanvasProps {
  warpSpeed: number; // 0 (calm) to 1 (full warp streak)
  mouseOffset?: { x: number; y: number }; // normalized -1 to 1
  stereo3D?: boolean; // 3D glasses anaglyph split mode
  isNearBlackHole?: boolean; // Gravitational lensing distortion
  isWarpFlight?: boolean; // In interstellar transit phase
}

export function CosmicCanvas({
  warpSpeed,
  mouseOffset = { x: 0, y: 0 },
  stereo3D = false,
  isNearBlackHole = false,
  isWarpFlight = false,
}: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const mouseRef = useRef(mouseOffset);
  const stereoRef = useRef(stereo3D);
  const blackHoleRef = useRef(isNearBlackHole);
  const warpFlightRef = useRef(isWarpFlight);

  useEffect(() => {
    mouseRef.current = mouseOffset;
  }, [mouseOffset]);

  useEffect(() => {
    stereoRef.current = stereo3D;
  }, [stereo3D]);

  useEffect(() => {
    blackHoleRef.current = isNearBlackHole;
  }, [isNearBlackHole]);

  useEffect(() => {
    warpFlightRef.current = isWarpFlight;
  }, [isWarpFlight]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Deep space stellar population: 340 stars
    const numStars = 340;
    interface Star {
      x: number;
      y: number;
      z: number;
      size: number;
      color: string;
      baseAlpha: number;
      twinkleSpeed: number;
      twinklePhase: number;
    }

    // Stellar spectral classes: O (blue), B (blue-white), A (white), F (yellow-white), G (yellow), K (orange), M (red)
    const starColors = [
      "#ffffff",
      "#f0f9ff",
      "#bae6fd",
      "#7dd3fc",
      "#fef08a",
      "#fed7aa",
      "#fbcfe8",
      "#c084fc",
    ];

    const stars: Star[] = Array.from({ length: numStars }, () => ({
      x: (Math.random() - 0.5) * width * 2.6,
      y: (Math.random() - 0.5) * height * 2.6,
      z: Math.random() * 1000 + 1,
      size: Math.random() * 1.8 + 0.5,
      color: starColors[Math.floor(Math.random() * starColors.length)],
      baseAlpha: Math.random() * 0.75 + 0.25,
      twinkleSpeed: Math.random() * 0.04 + 0.015,
      twinklePhase: Math.random() * Math.PI * 2,
    }));

    // Deep space drifting cosmic dust motes (foreground 3D particles)
    const dustMotes = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5 + 0.5,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.4 + 0.1,
    }));

    // Shooting stars
    interface ShootingStar {
      x: number;
      y: number;
      length: number;
      speed: number;
      angle: number;
      opacity: number;
      active: boolean;
    }
    const shoot: ShootingStar = {
      x: 0,
      y: 0,
      length: 180,
      speed: 28,
      angle: Math.PI / 4,
      opacity: 0,
      active: false,
    };

    const triggerShootingStar = () => {
      shoot.x = Math.random() * width * 0.8;
      shoot.y = Math.random() * height * 0.35;
      shoot.opacity = 1;
      shoot.active = true;
    };

    let nebulaTick = 0;

    const render = () => {
      nebulaTick += 0.003;
      const isFlight = warpFlightRef.current;
      const effectiveWarp = isFlight ? Math.max(warpSpeed, 0.75) : warpSpeed;

      // Dark space background: with subtle hyperspace trail persistence
      const trailAlpha = effectiveWarp > 0.4 ? 0.28 : 0.45;
      ctx.fillStyle = `rgba(2, 6, 23, ${trailAlpha})`;
      ctx.fillRect(0, 0, width, height);

      const mouse = mouseRef.current;
      const isStereo = stereoRef.current;
      const isBlackHole = blackHoleRef.current;

      const cx = width / 2 + (mouse?.x || 0) * 35;
      const cy = height / 2 + (mouse?.y || 0) * 35;

      // =========================================================================
      // REAL DEEP SPACE INTERSTELLAR NEBULAE (深空星云与星际尘埃)
      // =========================================================================
      if (!isFlight) {
        // Nebula 1: Deep Cyan / Teal Gas Cloud (Top-Left)
        const neb1X = width * 0.25 + Math.sin(nebulaTick) * 30 + (mouse?.x || 0) * 15;
        const neb1Y = height * 0.3 + Math.cos(nebulaTick) * 20 + (mouse?.y || 0) * 15;
        const grad1 = ctx.createRadialGradient(neb1X, neb1Y, 10, neb1X, neb1Y, width * 0.45);
        grad1.addColorStop(0, "rgba(6, 182, 212, 0.055)");
        grad1.addColorStop(0.5, "rgba(14, 116, 144, 0.025)");
        grad1.addColorStop(1, "rgba(2, 6, 23, 0)");
        ctx.fillStyle = grad1;
        ctx.fillRect(0, 0, width, height);

        // Nebula 2: Deep Violet / Magenta Star Nursery (Bottom-Right)
        const neb2X = width * 0.75 + Math.cos(nebulaTick * 0.8) * 40;
        const neb2Y = height * 0.65 + Math.sin(nebulaTick * 0.8) * 25;
        const grad2 = ctx.createRadialGradient(neb2X, neb2Y, 10, neb2X, neb2Y, width * 0.5);
        grad2.addColorStop(0, isBlackHole ? "rgba(245, 158, 11, 0.07)" : "rgba(168, 85, 247, 0.05)");
        grad2.addColorStop(0.6, "rgba(79, 70, 229, 0.02)");
        grad2.addColorStop(1, "rgba(2, 6, 23, 0)");
        ctx.fillStyle = grad2;
        ctx.fillRect(0, 0, width, height);
      }

      // Foreground drifting dust motes
      dustMotes.forEach((mote) => {
        mote.x += mote.speedX;
        mote.y += mote.speedY;
        if (mote.x < 0) mote.x = width;
        if (mote.x > width) mote.x = 0;
        if (mote.y < 0) mote.y = height;
        if (mote.y > height) mote.y = 0;

        ctx.fillStyle = "rgba(186, 230, 253, 0.35)";
        ctx.globalAlpha = mote.alpha;
        ctx.beginPath();
        ctx.arc(mote.x, mote.y, mote.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // =========================================================================
      // RELATIVISTIC 3D STARFIELD & HYPERSPACE JUMP BEAMS
      // =========================================================================
      const speed = isFlight
        ? 20 + effectiveWarp * 60
        : 1.2 + effectiveWarp * 35;

      stars.forEach((star) => {
        star.z -= speed;
        if (star.z <= 0) {
          star.z = 1000;
          star.x = (Math.random() - 0.5) * width * 2.6;
          star.y = (Math.random() - 0.5) * height * 2.6;
        }

        const k = 260 / star.z;
        let px = star.x * k + cx;
        let py = star.y * k + cy;

        // Gravitational vortex distortion near Black Hole
        if (isBlackHole) {
          const dx = px - cx;
          const dy = py - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 30 && dist < 480) {
            const deflection = (240 / (dist + 30)) * 2.8;
            const angle = Math.atan2(dy, dx) + 0.045;
            const newDist = dist - deflection * 0.35;
            px = cx + Math.cos(angle) * newDist;
            py = cy + Math.sin(angle) * newDist;
          }
        }

        if (px >= -30 && px <= width + 30 && py >= -30 && py <= height + 30) {
          const size = Math.max(0.5, star.size * k * 0.85);

          star.twinklePhase += star.twinkleSpeed;
          const twinkle = 0.8 + 0.2 * Math.sin(star.twinklePhase);
          const alpha = Math.min(
            1,
            (1 - star.z / 1000) * star.baseAlpha * twinkle * (1 + effectiveWarp * 0.5)
          );

          if (effectiveWarp > 0.15) {
            // Relativistic Hyperdrive Warp Light Beams
            const streakFactor = isFlight ? 9.5 : 4.8;
            const prevK = 260 / (star.z + speed * streakFactor);
            const prevX = star.x * prevK + cx;
            const prevY = star.y * prevK + cy;

            const grad = ctx.createLinearGradient(prevX, prevY, px, py);
            grad.addColorStop(0, "rgba(255, 255, 255, 0)");
            if (isBlackHole) {
              grad.addColorStop(0.7, "rgba(245, 158, 11, 0.75)");
              grad.addColorStop(1, "#fef08a");
            } else if (isFlight) {
              grad.addColorStop(0.6, "rgba(56, 189, 248, 0.85)");
              grad.addColorStop(1, "#ffffff");
            } else {
              grad.addColorStop(1, star.color);
            }

            ctx.strokeStyle = grad;
            ctx.globalAlpha = alpha;
            ctx.lineWidth = Math.min(3.6, size * 1.3);
            ctx.beginPath();
            ctx.moveTo(prevX, prevY);
            ctx.lineTo(px, py);
            ctx.stroke();
          } else if (isStereo) {
            // 3D GLASSES ANAGLYPH STEREO MODE
            const stereoShift = Math.max(1, (1 - star.z / 1000) * 5.0);

            // Red channel (left eye)
            ctx.fillStyle = "rgba(255, 30, 80, 0.8)";
            ctx.globalAlpha = alpha * 0.85;
            ctx.beginPath();
            ctx.arc(px - stereoShift, py, size, 0, Math.PI * 2);
            ctx.fill();

            // Cyan channel (right eye)
            ctx.fillStyle = "rgba(0, 230, 255, 0.8)";
            ctx.globalAlpha = alpha * 0.85;
            ctx.beginPath();
            ctx.arc(px + stereoShift, py, size, 0, Math.PI * 2);
            ctx.fill();
          } else {
            // Standard Photorealistic star rendering
            ctx.fillStyle = star.color;
            ctx.globalAlpha = alpha;
            ctx.beginPath();
            ctx.arc(px, py, size, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      });

      // Shooting stars
      if (Math.random() < 0.007 && !shoot.active && !isFlight) {
        triggerShootingStar();
      }

      if (shoot.active && !isFlight) {
        shoot.x += Math.cos(shoot.angle) * shoot.speed;
        shoot.y += Math.sin(shoot.angle) * shoot.speed;
        shoot.opacity -= 0.016;

        if (shoot.opacity <= 0) {
          shoot.active = false;
        } else {
          ctx.strokeStyle = `rgba(255, 255, 255, ${shoot.opacity})`;
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.moveTo(shoot.x, shoot.y);
          ctx.lineTo(
            shoot.x - Math.cos(shoot.angle) * shoot.length,
            shoot.y - Math.sin(shoot.angle) * shoot.length
          );
          ctx.stroke();
        }
      }

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, [warpSpeed]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 w-full h-full"
    />
  );
}
