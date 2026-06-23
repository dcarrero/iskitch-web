// Generador de favicons e iconos (web + móvil/PWA) a partir de la marca iSkitch.
// Render con sharp a PNG estáticos en public/ (no depende de fuentes ni del build).
// Uso: `npm run icons`.
import sharp from "sharp";
import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC = join(__dirname, "..", "public");

// Flecha de la marca (viewBox 100×100), igual que en Nav/Footer.
const MARK = "M10.4 90.4 L77.3 28.4 L82.2 33.3 L90 10 L66.7 17.8 L71.6 22.7 L9.6 89.6 Z";

// Construye el SVG del icono. rounded=radio de esquina (0 = full-bleed),
// scale=tamaño relativo de la flecha dentro del cuadro (centrada).
function iconSvg({ rounded = 22, scale = 0.56 } = {}) {
  // La flecha ocupa ~10..90 (≈80 de ancho), centro ≈ (49.8, 50.2).
  const s = scale;
  // Centrar: tras escalar la marca por s, la recolocamos en el centro del lienzo.
  const tx = 50 - 49.8 * s;
  const ty = 50 - 50.2 * s;
  const corner = rounded > 0 ? `rx="${rounded}" ry="${rounded}"` : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#FF3366"/><stop offset="1" stop-color="#E61F5C"/>
  </linearGradient></defs>
  <rect width="100" height="100" ${corner} fill="url(#g)"/>
  <g transform="translate(${tx.toFixed(2)},${ty.toFixed(2)}) scale(${s})"><path d="${MARK}" fill="#ffffff"/></g>
</svg>`;
}

const png = (svg, size, out) =>
  sharp(Buffer.from(svg)).resize(size, size).png().toFile(join(PUBLIC, out));

async function main() {
  if (!existsSync(PUBLIC)) mkdirSync(PUBLIC, { recursive: true });

  const rounded = iconSvg({ rounded: 22, scale: 0.56 }); // esquinas redondeadas (pestañas/web)
  const bleed = iconSvg({ rounded: 0, scale: 0.52 }); // full-bleed (iOS/Android enmascaran)

  // Favicon vectorial (navegadores modernos).
  writeFileSync(join(PUBLIC, "favicon.svg"), rounded + "\n");

  // Favicons PNG para pestañas + logo del JSON-LD.
  await png(rounded, 16, "favicon-16.png");
  await png(rounded, 32, "favicon-32.png");
  await png(rounded, 512, "favicon.png"); // usado como Organization.logo

  // iOS — pantalla de inicio (sin transparencia; el sistema redondea).
  await png(bleed, 180, "apple-touch-icon.png");

  // Android / PWA (sirven como "any" y "maskable": el degradado llena el cuadro).
  await png(bleed, 192, "icon-192.png");
  await png(bleed, 512, "icon-512.png");

  // Web App Manifest.
  const manifest = {
    name: "iSkitch",
    short_name: "iSkitch",
    description: "Capture, annotate & share screenshots — native for macOS.",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any maskable" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any maskable" },
    ],
    theme_color: "#FF3366",
    background_color: "#ffffff",
    display: "standalone",
    start_url: "/",
  };
  writeFileSync(join(PUBLIC, "site.webmanifest"), JSON.stringify(manifest, null, 2) + "\n");

  console.log("✓ Iconos generados: favicon.svg, favicon-16/32.png, favicon.png, apple-touch-icon.png, icon-192/512.png, site.webmanifest");
}

main().catch((e) => { console.error(e); process.exit(1); });
