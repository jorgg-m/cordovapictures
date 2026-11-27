import {
  OptimizedImage,
  fallbackWidth,
  lightboxWidth,
  srcFor,
  srcset,
} from "@/data/images";

type Props = {
  image: OptimizedImage;
  sizes: string;
  className?: string;
  loading?: "lazy" | "eager";
  decoding?: "async" | "sync" | "auto";
  mode?: "responsive" | "lightbox";
};

export function ResponsivePicture({
  image,
  sizes,
  className,
  loading = "lazy",
  decoding = "async",
  mode = "responsive",
}: Props) {
  if (mode === "lightbox") {
    return <LightboxPicture image={image} className={className} />;
  }
  return (
    <picture>
      <source type="image/avif" srcSet={srcset(image, "avif")} sizes={sizes} />
      <img
        src={srcFor(image, fallbackWidth(image), "webp")}
        srcSet={srcset(image, "webp")}
        sizes={sizes}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading={loading}
        decoding={decoding}
        className={className}
      />
    </picture>
  );
}

function LightboxPicture({
  image,
  className,
}: {
  image: OptimizedImage;
  className?: string;
}) {
  const w = lightboxWidth(image);
  return (
    <picture>
      <source type="image/avif" srcSet={`${srcFor(image, w, "avif")} ${w}w`} />
      <img
        src={srcFor(image, w, "webp")}
        alt={image.alt}
        width={image.width}
        height={image.height}
        decoding="async"
        className={className}
      />
    </picture>
  );
}
