"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ResponsivePicture } from "@/components/ResponsivePicture";
import type { OptimizedImage } from "@/data/images";

type Props = { title: string; slug: string; cover: OptimizedImage };

export function CategoryCard({ title, slug, cover }: Props) {
  const reduce = useReducedMotion();
  return (
    <Link href={`/gallery/${slug}`} className="group block">
      <article className="relative aspect-[4/3] overflow-hidden bg-paper">
        <motion.div
          className="absolute inset-0"
          whileHover={reduce ? undefined : { scale: 1.03 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <ResponsivePicture
            image={cover}
            sizes="(max-width: 640px) 100vw, 50vw"
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20" />
        <h2 className="absolute inset-0 flex items-center justify-center px-4 text-center text-[12px] uppercase tracking-[0.28em] text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:text-[13px]">
          {title}
        </h2>
      </article>
    </Link>
  );
}
