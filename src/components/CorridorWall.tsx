"use client";

import Image from "next/image";
import { RefObject, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";
import { useGalleryStore } from "@/stores/useGalleryStore";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

type Props = { images: string[]; title: string };
type El = RefObject<HTMLDivElement | null>;

export function CorridorWall({ images, title }: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  useLayoutEffect(() => panWall(wrap, track, !!reduce), [reduce, images.length]);
  return (
    <section ref={wrap} className="relative overflow-hidden bg-paper" onClick={openPrint}>
      <div
        ref={track}
        className={`flex h-[100dvh] items-center px-10 ${reduce ? "overflow-x-auto" : ""}`}
      >
        {images.map((src, i) => (
          <WallFrame key={`${src}-${i}`} src={src} title={title} index={i} />
        ))}
      </div>
    </section>
  );
}

function openPrint(e: React.MouseEvent) {
  const el = (e.target as HTMLElement).closest("[data-print]");
  if (!el) return;
  const index = Number(el.getAttribute("data-print"));
  if (Number.isNaN(index)) return;
  useGalleryStore.setState({ currentIndex: index, mode: "full" });
}

function panWall(wrap: El, track: El, reduce: boolean) {
  if (reduce || !wrap.current || !track.current) return;
  const ctx = gsap.context(() => tweenTrack(wrap, track), wrap);
  return () => ctx.revert();
}

function tweenTrack(wrap: El, track: El) {
  const distance = track.current!.scrollWidth - window.innerWidth;
  gsap.to(track.current, {
    x: -distance,
    ease: "none",
    scrollTrigger: wallTrigger(wrap.current, distance),
  });
}

function wallTrigger(trigger: HTMLDivElement | null, distance: number) {
  return {
    trigger,
    start: "top top",
    end: () => `+=${distance}`,
    pin: true,
    scrub: 1,
    invalidateOnRefresh: true,
  };
}

function WallFrame(p: { src: string; title: string; index: number }) {
  return (
    <button
      type="button"
      data-print={p.index}
      className="relative mx-6 h-[62vh] w-[min(70vw,720px)] shrink-0"
    >
      <Image src={p.src} alt={`${p.title} ${p.index + 1}`} fill className="object-contain" sizes="70vw" />
    </button>
  );
}
