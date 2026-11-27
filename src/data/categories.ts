import manifest from "../../public/images/optimized/manifest.json";
import type { OptimizedImage } from "@/data/images";

type Meta = { width: number; height: number; widths: number[] };

export type Category = {
  slug: string;
  title: string;
  cover: OptimizedImage;
  images: OptimizedImage[];
};

const DIRS = [
  { slug: "portraits", title: "Portraits", dir: "Portraits" },
  {
    slug: "personal-arts-and-crafts",
    title: "Personal Arts and crafts",
    dir: "Personal Arts and crafts",
  },
  { slug: "vogue", title: "Vogue", dir: "Vogue" },
  {
    slug: "weddings-and-events",
    title: "Weddings & Events",
    dir: "Weddings & Events",
  },
] as const;

function toImage(key: string, meta: Meta): OptimizedImage {
  return {
    key,
    alt: key.split("/").at(-1) ?? key,
    width: meta.width,
    height: meta.height,
    widths: meta.widths,
  };
}

function imagesFor(dir: string): OptimizedImage[] {
  const prefix = `v1/${dir}/`;
  const data = manifest as Record<string, Meta>;
  return Object.entries(data)
    .filter(([key]) => key.startsWith(prefix))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, meta]) => toImage(key, meta));
}

export const categories: Category[] = DIRS.map((d) => {
  const images = imagesFor(d.dir);
  return { slug: d.slug, title: d.title, cover: images[0], images };
});

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}
