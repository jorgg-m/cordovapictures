import { CategoryCard } from "@/components/CategoryCard";
import { categories } from "@/data/categories";

export default function PortfolioIndex() {
  return (
    <section className="min-h-[100dvh] bg-paper px-4 pb-16 pt-20 md:px-8">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-[2vw] sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <CategoryCard
            key={c.slug}
            slug={c.slug}
            title={c.title}
            cover={c.cover}
          />
        ))}
      </div>
    </section>
  );
}
