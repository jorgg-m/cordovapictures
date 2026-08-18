import { notFound } from "next/navigation";
import { GalleryExperience } from "@/components/GalleryExperience";
import { categories, getCategory } from "@/data/categories";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export default async function GalleryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();
  return (
    <GalleryExperience images={category.images} title={category.title} />
  );
}
