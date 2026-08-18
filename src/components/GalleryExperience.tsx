"use client";

import { useEffect } from "react";
import { CorridorWall } from "@/components/CorridorWall";
import { MuseumGallery } from "@/components/MuseumGallery";
import { useGalleryStore } from "@/stores/useGalleryStore";

type Props = { images: string[]; title: string };

export function GalleryExperience({ images, title }: Props) {
  const mode = useGalleryStore((s) => s.mode);
  const reset = useGalleryStore((s) => s.reset);
  useEffect(() => {
    reset();
  }, [title, reset]);
  useEffect(() => lockScroll(mode === "full"), [mode]);
  return (
    <>
      <CorridorWall images={images} title={title} />
      {mode === "full" ? (
        <MuseumGallery images={images} title={title} />
      ) : null}
    </>
  );
}

function lockScroll(lock: boolean) {
  if (!lock) return;
  const prev = document.body.style.overflow;
  document.body.style.overflow = "hidden";
  return () => {
    document.body.style.overflow = prev;
  };
}
