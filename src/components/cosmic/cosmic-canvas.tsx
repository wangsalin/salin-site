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

    const numStars = 280;
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

    const starColors = [
      "#ffffff",
      "#e0f2fe",
      "#bae6fd",
      "#fef08a",
      "#a7f3d0",
      "#c084fc",
      "#f472b6",
    ];

    const stars: Star[] = Array.from({ length: numStars }, () => ({
      x: (Math.random() - 0.5) * width * 2.4,
      y: (Math.random() - 0.5) * height * 2.4,
      z: Math.random() * 1000 + 1,
      size: Math.random() * 2.0 + 0.6,
      color: starColors[Math.floor(Math.random() * starColors.length)],
      baseAlpha: Math.random() * 0.7 + 0.3,
      twinkleSpeed: Math.random() * 0.04 + 0.01,
      twinklePhase: Math.random() * Math.PI * 2,
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
      length: 160,
      speed: 26,
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

    const render = () => {
      const isFlight = warpFlightRef.current;
      const effectiveWarp = isFlight ? Math.max(warpSpeed, 0.75) : warpSpeed;

      // Dark space background: with hyperspace trail blur
      const trailAlpha = effectiveWarp > 0.4 ? 0.3 : 0.48;
      ctx.fillStyle = `rgba(2, 6, 23, ${trailAlpha})`;
      ctx.fillRect(0, 0, width, height);

      // Camera center with mouse 3D parallax offset
      const mouse = mouseRef.current;
      const isStereo = stereoRef.current;
      const isBlackHole = blackHoleRef.current;

      const cx = width / 2 + (mouse?.x || 0) * 35;
      const cy = height / 2 + (mouse?.y || 0) * 35;

      // Speed increases drastically in warp flight!
      const speed = isFlight
        ? 18 + effectiveWarp * 55
        : 1.2 + effectiveWarp * 35;

      stars.forEach((star) => {
        star.z -= speed;
        if (star.z <= 0) {
          star.z = 1000;
          star.x = (Math.random() - 0.5) * width * 2.4;
          star.y = (Math.random() - 0.5) * height * 2.4;
        }

        // 3D Perspective projection
        const k = 260 / star.z;
        let px = star.x * k + cx;
        let py = star.y * k + cy;

        // Gravitational vortex distortion near Black Hole
        if (isBlackHole) {
          const dx = px - cx;
          const dy = py - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 30 && dist < 450) {
            const deflection = (220 / (dist + 30)) * 2.5;
            // Tangential spiral deflection for vortex
            const angle = Math.atan2(dy, dx) + 0.04;
            const newDist = dist - deflection * 0.3;
            px = cx + Math.cos(angle) * newDist;
            py = cy + Math.sin(angle) * newDist;
          }
        }

        if (px >= -30 && px <= width + 30 && py >= -30 && py <= height + 30) {
          const size = Math.max(0.6, star.size * k * 0.85);

          // Twinkle pulse
          star.twinklePhase += star.twinkleSpeed;
          const twinkle = 0.8 + 0.2 * Math.sin(star.twinklePhase);
          const alpha = Math.min(
            1,
            (1 - star.z / 1000) * star.baseAlpha * twinkle * (1 + effectiveWarp * 0.5)
          );

          if (effectiveWarp > 0.15) {
            // Relativistic Hyperdrive Warp Light Beams
            const streakFactor = isFlight ? 9 : 4.5;
            const prevK = 260 / (star.z + speed * streakFactor);
            const prevX = star.x * prevK + cx;
            const prevY = star.y * prevK + cy;

            // Gradient hyperdrive laser streak
            const grad = ctx.createLinearGradient(prevX, prevY, px, py);
            grad.addColorStop(0, "rgba(255, 255, 255, 0)");
            if (isBlackHole) {
              grad.addColorStop(0.7, "rgba(245, 158, 11, 0.7)");
              grad.addColorStop(1, "#fef08a");
            } else if (isFlight) {
              grad.addColorStop(0.6, "rgba(56, 189, 248, 0.8)");
              grad.addColorStop(1, "#ffffff");
            } else {
              grad.addColorStop(1, star.color);
            }

            ctx.strokeStyle = grad;
            ctx.globalAlpha = alpha;
            ctx.lineWidth = Math.min(3.5, size * 1.2);
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
