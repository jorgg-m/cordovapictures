export type Category = {
  slug: string;
  title: string;
  cover: string;
  images: string[];
};

const pool = [
  "/images/portraits.jpg",
  "/images/people.jpg",
  "/images/personal.jpg",
  "/images/studio.jpg",
  "/images/passing.jpg",
  "/images/popup.jpg",
  "/images/cover.jpg",
  "/images/holding.jpg",
  "/images/pride.jpg",
];

function gallery(cover: string) {
  return [cover, ...pool.filter((p) => p !== cover)];
}

function cat(slug: string, title: string, cover: string): Category {
  return { slug, title, cover, images: gallery(cover) };
}

export const categories: Category[] = [
  cat("portraits", "Portraits", "/images/portraits.jpg"),
  cat("people-you-may-know", "People You May Know", "/images/people.jpg"),
  cat("personal-projects", "Personal Projects", "/images/personal.jpg"),
  cat("studio-visits", "Studio Visits", "/images/studio.jpg"),
  cat("passing-through", "Passing Through", "/images/passing.jpg"),
  cat("pop-up-studios", "Pop-Up Studios", "/images/popup.jpg"),
  cat("cover-stories", "Cover Stories", "/images/cover.jpg"),
  cat("holding-space", "Holding Space", "/images/holding.jpg"),
  cat("pride-projects", "Pride Projects", "/images/pride.jpg"),
];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}
