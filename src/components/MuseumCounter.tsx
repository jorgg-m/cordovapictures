"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";

type Props = { index: number; total: number };

export function MuseumCounter({ index, total }: Props) {
  const reduce = useReducedMotion();
  const label = `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
  return (
    <div className="pointer-events-none absolute bottom-8 right-8 z-10 font-mono text-[12px] tracking-wide text-ink/70">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={label}
          initial={reduce ? false : { y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduce ? undefined : { y: -10, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block"
        >
          {label}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
