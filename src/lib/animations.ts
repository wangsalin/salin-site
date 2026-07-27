export const animations = {
  transitions: {
    fast: { duration: 0.15, ease: "easeOut" } as const,
    base: { duration: 0.25, ease: "easeOut" } as const,
    slow: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] } as const,
  },
  reveal: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideUp: {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0 },
  },
};
