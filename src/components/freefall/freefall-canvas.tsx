"use client";

import React, { useEffect, useRef } from "react";

interface CanvasProps {
  speedIntensity: number; // 0 to 1
  isFreefalling: boolean;
}

export function FreefallCanvas({ speedIntensity, isFreefalling }: CanvasProps) {
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

    interface Line {
      x: number;
      y: number;
      length: number;
      speed: number;
      opacity: number;
    }
    const lines: Line[] = Array.from({ length: 48 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      length: 25 + Math.random() * 85,
      speed: 16 + Math.random() * 26,
      opacity: 0.12 + Math.random() * 0.45,
    }));

    interface CloudPuff {
      x: number;
      y: number;
      radius: number;
      speed: number;
      opacity: number;
    }
    const puffs: CloudPuff[] = Array.from({ length: 14 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: 70 + Math.random() * 140,
      speed: 2.5 + Math.random() * 7,
      opacity: 0.06 + Math.random() * 0.16,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Cloud puffs moving up as falling down
      if (isFreefalling) {
        puffs.forEach((p) => {
          p.y -= p.speed * (1 + speedIntensity * 2.8);
          if (p.y + p.radius < 0) {
            p.y = height + p.radius;
            p.x = Math.random() * width;
          }

          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
          grad.addColorStop(0, `rgba(255, 255, 255, ${p.opacity * speedIntensity})`);
          grad.addColorStop(1, "rgba(255, 255, 255, 0)");

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      // Vertical wind speed lines
      if (speedIntensity > 0.12) {
        lines.forEach((line) => {
          line.y -= line.speed * speedIntensity * 2.0;
          if (line.y + line.length < 0) {
            line.y = height + line.length;
            line.x = Math.random() * width;
          }

          ctx.strokeStyle = `rgba(224, 242, 254, ${line.opacity * speedIntensity})`;
          ctx.lineWidth = 1.25;
          ctx.beginPath();
          ctx.moveTo(line.x, line.y);
          ctx.lineTo(line.x, line.y + line.length * (1 + speedIntensity * 1.6));
          ctx.stroke();
        });
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, [speedIntensity, isFreefalling]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-10 w-full h-full"
    />
  );
}
