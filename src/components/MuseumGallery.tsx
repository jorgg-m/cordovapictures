"use client";

import { X } from "@phosphor-icons/react";
import Image from "next/image";
import { useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { MuseumCounter } from "@/components/MuseumCounter";
import { useGalleryStore } from "@/stores/useGalleryStore";

type Props = { images: string[]; title: string };

export function MuseumGallery({ images, title }: Props) {
  const reduce = useReducedMotion();
  const { currentIndex, next, closeFull } = useGalleryStore();
  useEffect(() => bindEscape(closeFull), [closeFull]);
  return (
    <section
      role="button"
      tabIndex={0}
      aria-label={`${title} gallery. Click for next. Escape to close.`}
      onClick={() => next(images.length)}
      onKeyDown={(e) => onKey(e, () => next(images.length))}
      className="fixed inset-0 z-40 overflow-hidden bg-paper outline-none"
    >
      <CloseButton onClose={closeFull} />
      <Slide src={images[currentIndex]} title={title} index={currentIndex} reduce={!!reduce} />
      <MuseumCounter index={currentIndex} total={images.length} />
    </section>
  );
}

function bindEscape(close: () => void) {
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") close();
  };
  window.addEventListener("keydown", onKey);
  return () => window.removeEventListener("keydown", onKey);
}

function onKey(e: React.KeyboardEvent, advance: () => void) {
  if (e.key === "Enter" || e.key === " ") advance();
}

function CloseButton({ onClose }: { onClose: () => void }) {
  return (
    <button
      type="button"
      aria-label="Close"
      onClick={(e) => { e.stopPropagation(); onClose(); }}
      className="absolute left-8 top-20 z-10 text-ink/80 hover:text-ink"
    >
      <X size={22} weight="light" />
    </button>
  );
}

function Slide(p: { src: string; title: string; index: number; reduce: boolean }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={p.src}
        initial={p.reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={p.reduce ? undefined : { opacity: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 flex items-center justify-center px-4 pb-16 pt-20 md:px-12"
      >
        <Print src={p.src} title={p.title} index={p.index} />
      </motion.div>
    </AnimatePresence>
  );
}

function Print(p: { src: string; title: string; index: number }) {
  return (
    <div className="relative h-full max-h-[78dvh] w-full max-w-5xl">
      <Image src={p.src} alt={`${p.title} ${p.index + 1}`} fill className="object-contain" sizes="100vw" priority />
    </div>
  );
}
