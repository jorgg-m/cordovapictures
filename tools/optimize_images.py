import json
from io import BytesIO
from pathlib import Path
from PIL import Image, ImageCms, ImageOps
import pillow_avif  # noqa: F401

ROOT = Path(__file__).resolve().parents[1]
INPUT_DIR = ROOT / "originals"
OUTPUT_DIR = ROOT / "public" / "images" / "optimized"
SIZES = [480, 800, 1200, 1920]
AVIF_QUALITY = 70
WEBP_QUALITY = 82
VALID_EXTS = {".jpg", ".jpeg", ".png", ".tif", ".tiff"}


def to_srgb(img: Image.Image) -> tuple[Image.Image, bytes | None]:
    icc = img.info.get("icc_profile")
    srgb = ImageCms.createProfile("sRGB")
    srgb_bytes = ImageCms.ImageCmsProfile(srgb).tobytes()
    if not icc:
        return img.convert("RGB"), srgb_bytes
    try:
        src = ImageCms.ImageCmsProfile(BytesIO(icc))
        return ImageCms.profileToProfile(img, src, srgb, outputMode="RGB"), srgb_bytes
    except Exception:
        return img.convert("RGB"), srgb_bytes


def save_variants(resized: Image.Image, dest: Path, stem: str, w: int, icc: bytes | None):
    base = dest / f"{stem}-{w}w"
    resized.save(f"{base}.avif", format="AVIF", quality=AVIF_QUALITY, icc_profile=icc)
    resized.save(f"{base}.webp", format="WEBP", quality=WEBP_QUALITY, method=6, icc_profile=icc)


def widths_for(orig_w: int) -> list[int]:
    out: list[int] = []
    for target in SIZES:
        if target > orig_w and out:
            continue
        out.append(min(target, orig_w))
    return out


def process_one(path: Path, rel: Path, manifest: dict):
    dest = OUTPUT_DIR / rel.parent
    dest.mkdir(parents=True, exist_ok=True)
    with Image.open(path) as img:
        img = ImageOps.exif_transpose(img)
        img, icc = to_srgb(img)
        orig_w, orig_h = img.size
        generated = []
        for w in widths_for(orig_w):
            h = round(orig_h * (w / orig_w))
            save_variants(img.resize((w, h), Image.Resampling.LANCZOS), dest, path.stem, w, icc)
            generated.append(w)
    key = rel.with_suffix("").as_posix()
    manifest[key] = {"width": orig_w, "height": orig_h, "widths": generated}
    print(f"OK {rel.as_posix()} -> {generated}")


def process_images():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    manifest: dict = {}
    for path in sorted(INPUT_DIR.rglob("*")):
        if not path.is_file() or path.suffix.lower() not in VALID_EXTS:
            continue
        process_one(path, path.relative_to(INPUT_DIR), manifest)
    (OUTPUT_DIR / "manifest.json").write_text(
        json.dumps(manifest, indent=2), encoding="utf-8"
    )
    print(f"\nDone. Manifest: {OUTPUT_DIR / 'manifest.json'}")


if __name__ == "__main__":
    process_images()
