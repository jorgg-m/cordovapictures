"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

type Props = { title: string; slug: string; cover: string };

export function CategoryCard({ title, slug, cover }: Props) {
  const reduce = useReducedMotion();
  return (
    <Link href={`/gallery/${slug}`} className="group block">
      <article className="relative aspect-[4/3] overflow-hidden rounded-none bg-paper">
        <motion.div
          className="absolute inset-0"
          whileHover={reduce ? undefined : { scale: 1.03 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={cover}
            alt={title}
            fill
            sizes="(max-width:768px) 100vw, 33vw"
            className="object-cover"
            priority
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
