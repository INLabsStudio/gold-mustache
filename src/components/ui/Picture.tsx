import type { CSSProperties } from "react";
import { imageManifest, type ImageName } from "../../content/images.generated";

type Props = {
  name: ImageName;
  alt: string;
  /** Atributo `sizes` responsivo. */
  sizes?: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  style?: CSSProperties;
};

/**
 * Imagem responsiva com AVIF/WebP, dimensões intrínsecas (sem CLS)
 * e placeholder borrado enquanto carrega.
 */
export function Picture({ name, alt, sizes = "100vw", className = "", imgClassName = "", priority, style }: Props) {
  const img = imageManifest[name];
  const set = (ext: string) => img.widths.map((w) => `/images/${name}-${w}.${ext} ${w}w`).join(", ");
  const fallback = `/images/${name}-${img.widths[Math.min(1, img.widths.length - 1)]}.webp`;

  return (
    <picture className={className} style={style}>
      <source type="image/avif" srcSet={set("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={set("webp")} sizes={sizes} />
      <img
        src={fallback}
        alt={alt}
        width={img.width}
        height={img.height}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : "auto"}
        className={imgClassName}
        style={{ backgroundImage: `url(${img.blur})`, backgroundSize: "cover", backgroundPosition: "center" }}
      />
    </picture>
  );
}
