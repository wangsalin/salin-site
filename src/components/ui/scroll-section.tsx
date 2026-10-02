"use client";

import { motion } from "motion/react";
import React from "react";
import { cn } from "@/lib/cn";

interface ScrollSectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function ScrollSection({
  id,
  children,
  className,
  delay = 0,
}: ScrollSectionProps) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{
        duration: 0.55,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn("scroll-mt-16 w-full", className)}
    >
      {children}
    </motion.div>
  );
}
