export type OptimizedImage = {
  key: string;
  alt: string;
  width: number;
  height: number;
  widths: number[];
};

export function encodeBase(key: string) {
  return `/images/optimized/${key.split("/").map(encodeURIComponent).join("/")}`;
}

export function srcFor(img: OptimizedImage, w: number, ext: "avif" | "webp") {
  return `${encodeBase(img.key)}-${w}w.${ext}`;
}

export function srcset(img: OptimizedImage, ext: "avif" | "webp") {
  return img.widths.map((w) => `${srcFor(img, w, ext)} ${w}w`).join(", ");
}

export function fallbackWidth(img: OptimizedImage) {
  if (img.widths.includes(800)) return 800;
  return img.widths[Math.floor(img.widths.length / 2)] ?? img.widths.at(-1)!;
}

export function lightboxWidth(img: OptimizedImage) {
  if (img.widths.includes(1920)) return 1920;
  return Math.max(...img.widths);
}
