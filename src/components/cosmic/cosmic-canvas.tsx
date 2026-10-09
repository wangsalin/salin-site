"use client";

import React, { useEffect, useRef } from "react";

interface CanvasProps {
  warpSpeed: number; // 0 (calm) to 1 (full warp streak)
}

export function CosmicCanvas({ warpSpeed }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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

    const numStars = 190;
    interface Star {
      x: number;
      y: number;
      z: number;
      size: number;
      color: string;
      baseAlpha: number;
    }

    const starColors = ["#ffffff", "#e0f2fe", "#bae6fd", "#fef08a", "#a7f3d0"];

    const stars: Star[] = Array.from({ length: numStars }, () => ({
      x: (Math.random() - 0.5) * width * 2,
      y: (Math.random() - 0.5) * height * 2,
      z: Math.random() * 1000 + 1,
      size: Math.random() * 1.6 + 0.6,
      color: starColors[Math.floor(Math.random() * starColors.length)],
      baseAlpha: Math.random() * 0.7 + 0.3,
    }));

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
      length: 120,
      speed: 18,
      angle: Math.PI / 4,
      opacity: 0,
      active: false,
    };

    const triggerShootingStar = () => {
      shoot.x = Math.random() * width * 0.7;
      shoot.y = Math.random() * height * 0.4;
      shoot.opacity = 1;
      shoot.active = true;
    };

    const render = () => {
      ctx.fillStyle = "rgba(2, 6, 23, 0.4)";
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const speed = 1.2 + warpSpeed * 30;

      stars.forEach((star) => {
        star.z -= speed;
        if (star.z <= 0) {
          star.z = 1000;
          star.x = (Math.random() - 0.5) * width * 2;
          star.y = (Math.random() - 0.5) * height * 2;
        }

        const k = 250 / star.z;
        const px = star.x * k + cx;
        const py = star.y * k + cy;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const size = Math.max(0.5, star.size * k * 0.8);
          const alpha = Math.min(1, (1 - star.z / 1000) * star.baseAlpha * (1 + warpSpeed * 0.5));

          if (warpSpeed > 0.15) {
            const prevK = 250 / (star.z + speed * 3.5);
            const prevX = star.x * prevK + cx;
            const prevY = star.y * prevK + cy;

            ctx.strokeStyle = star.color;
            ctx.globalAlpha = alpha;
            ctx.lineWidth = Math.min(2.5, size * 0.8);
            ctx.beginPath();
            ctx.moveTo(prevX, prevY);
            ctx.lineTo(px, py);
            ctx.stroke();
          } else {
            ctx.fillStyle = star.color;
            ctx.globalAlpha = alpha;
            ctx.beginPath();
            ctx.arc(px, py, size, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      });

      if (Math.random() < 0.005 && !shoot.active) {
        triggerShootingStar();
      }

      if (shoot.active) {
        shoot.x += Math.cos(shoot.angle) * shoot.speed;
        shoot.y += Math.sin(shoot.angle) * shoot.speed;
        shoot.opacity -= 0.015;

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
