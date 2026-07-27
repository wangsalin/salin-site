"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { animations } from "@/lib/animations";

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: React.ElementType;
};

export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={animations.reveal.hidden}
      animate={isInView ? animations.reveal.visible : animations.reveal.hidden}
      transition={{ ...animations.transitions.slow, delay }}
    >
      <Tag>{children}</Tag>
    </motion.div>
  );
}
