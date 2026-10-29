// Gera versões responsivas (AVIF + WebP) das fotos em images-src/ e um manifesto
// tipado em src/content/images.generated.ts com dimensões e placeholder borrado.
// Uso: npm run images
import { readdir, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC = "images-src";
const OUT = "public/images";
const WIDTHS = [480, 960, 1600];

await mkdir(OUT, { recursive: true });
const files = (await readdir(SRC)).filter((f) => /\.(jpe?g|png|webp)$/i.test(f)).sort();
const manifest = {};

for (const file of files) {
  const name = path.parse(file).name;
  const input = sharp(path.join(SRC, file)).rotate();
  const { width, height } = await input.metadata();
  const widths = WIDTHS.filter((w) => w < width).concat(width > WIDTHS.at(-1) ? [] : [width]);
  const sizes = [...new Set(widths.length ? widths : [width])];

  for (const w of sizes) {
    const resized = input.clone().resize({ width: w, withoutEnlargement: true });
    await resized.clone().avif({ quality: 52, effort: 6 }).toFile(`${OUT}/${name}-${w}.avif`);
    await resized.clone().webp({ quality: 74 }).toFile(`${OUT}/${name}-${w}.webp`);
  }

  const blur = await input.clone().resize(16).webp({ quality: 40 }).toBuffer();
  manifest[name] = {
    width,
    height,
    widths: sizes,
    blur: `data:image/webp;base64,${blur.toString("base64")}`,
  };
  console.log(`✓ ${name} (${sizes.join(", ")})`);
}

const ts = `// Arquivo gerado por scripts/optimize-images.mjs — não edite à mão.
export const imageManifest = ${JSON.stringify(manifest, null, 2)} as const;

export type ImageName = keyof typeof imageManifest;
`;
await writeFile("src/content/images.generated.ts", ts);
