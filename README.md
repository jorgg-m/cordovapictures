# Cordova Pictures

Next.js photography portfolio for Eduardo Cordova.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Image optimization (local Python tool)

`tools/optimize_images.py` prepares web images from raw photos. It is local-only and lives outside the Netlify publish output.

### What it does

1. Reads nested files from `originals/` (`.jpg`, `.jpeg`, `.png`, `.tif`, `.tiff`)
2. Applies EXIF orientation and converts color to sRGB
3. Writes AVIF + WebP variants at `480`, `800`, `1200`, and `1920` widths
4. Saves files under `public/images/optimized/`, preserving the folder structure
5. Writes `public/images/optimized/manifest.json` with original size and generated widths

Example output:

```text
public/images/optimized/v1/Portraits/Raquel/Raquel Web-1-800w.avif
public/images/optimized/v1/Portraits/Raquel/Raquel Web-1-800w.webp
```

### Setup

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r tools/requirements.txt
```

`.venv/`, `originals/`, and `__pycache__/` are gitignored.

### Usage

1. Put source photos in `originals/` (nested folders are fine)
2. Run:

```bash
source .venv/bin/activate
python tools/optimize_images.py
```

Or without activating the venv:

```bash
.venv/bin/python tools/optimize_images.py
```

### Notes

- Photos smaller than a target width are not upscaled past their original size
- Commits that only touch `tools/` or `originals/` do not trigger a Netlify deploy
- Optimized files under `/images/optimized/*` are cached as immutable on Netlify
