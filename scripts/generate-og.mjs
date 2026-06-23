// Generador de imágenes Open Graph (1200×630) para el blog y la portada.
// Renderiza un SVG de marca con sharp y lo rasteriza a PNG. Se ejecuta LOCALMENTE
// (`npm run og`) y los PNG resultantes se sirven como estáticos desde public/,
// así no dependemos de las fuentes del entorno de build (Cloudflare).
import sharp from "sharp";
import { readFileSync, readdirSync, mkdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const BLOG_DIR = join(ROOT, "src/content/blog");
const OUT_DIR = join(ROOT, "public/blog/og");
const W = 1200, H = 630;

// Tipografías del sistema; el stack mixto cubre latino + CJK (probado en macOS).
const FONT = "Helvetica Neue, Hiragino Sans, Hiragino Kaku Gothic ProN, Apple SD Gothic Neo, Arial, sans-serif";
const EYEBROW = { en: "GUIDE", es: "GUÍA", fr: "GUIDE", de: "ANLEITUNG", it: "GUIDA", pt: "GUIA", ja: "ガイド", ko: "가이드" };
const CJK = new Set(["ja", "ko"]);

function esc(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

// Frontmatter mínimo: extrae title y lang sin dependencias.
function frontmatter(md) {
  const m = md.match(/^---\n([\s\S]*?)\n---/);
  const block = m ? m[1] : "";
  const get = (k) => {
    const r = block.match(new RegExp(`^${k}:\\s*"?(.*?)"?\\s*$`, "m"));
    return r ? r[1] : "";
  };
  return { title: get("title"), lang: get("lang") };
}

// Ajuste de línea. CJK no tiene espacios: se parte por carácter.
function wrap(text, lang, maxChars) {
  if (CJK.has(lang)) {
    const lines = [];
    for (let i = 0; i < text.length; i += maxChars) lines.push(text.slice(i, i + maxChars));
    return lines;
  }
  const words = text.split(/\s+/);
  const lines = [];
  let line = "";
  for (const w of words) {
    if ((line + " " + w).trim().length > maxChars) { if (line) lines.push(line); line = w; }
    else line = (line + " " + w).trim();
  }
  if (line) lines.push(line);
  return lines;
}

const MARK = "M10.4 90.4 L77.3 28.4 L82.2 33.3 L90 10 L66.7 17.8 L71.6 22.7 L9.6 89.6 Z";

function svg({ title, lang, eyebrow }) {
  const cjk = CJK.has(lang);
  const maxChars = cjk ? 17 : 26;
  let lines = wrap(title, lang, maxChars);
  // Tamaño de fuente adaptado al número de líneas para que nunca se desborde.
  let fontSize = 68;
  if (lines.length > 3) fontSize = cjk ? 50 : 56;
  if (lines.length > 4) { fontSize = cjk ? 44 : 48; lines = lines.slice(0, 5); }
  const lineH = fontSize * 1.18;
  const blockH = lines.length * lineH;
  // Posiciones absolutas, bloque de título centrado verticalmente.
  const yy = Math.round(320 - blockH / 2 + fontSize * 0.9);
  const tspans = lines.map((l, i) => `<tspan x="90" y="${yy + Math.round(i * lineH)}">${esc(l)}</tspan>`).join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#FF3366"/><stop offset="1" stop-color="#E61F5C"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="#FFFFFF"/>
  <rect width="${W}" height="14" fill="url(#g)"/>
  <!-- marca de agua del logo -->
  <g transform="translate(880,300) scale(5.4)" opacity="0.06"><path d="${MARK}" fill="#E61F5C"/></g>
  <!-- logo + wordmark -->
  <g transform="translate(90,84)">
    <rect x="0" y="-4" width="46" height="46" rx="11" fill="url(#g)"/>
    <g transform="translate(8,4) scale(0.30)"><path d="${MARK}" fill="#ffffff"/></g>
    <text x="62" y="30" font-family="${FONT}" font-size="30" font-weight="800" fill="#1D1D1F">iSkitch</text>
  </g>
  <!-- eyebrow -->
  <text x="90" y="200" font-family="${FONT}" font-size="26" font-weight="800" letter-spacing="3" fill="#E61F5C">${esc(eyebrow)}</text>
  <!-- title -->
  <text font-family="${FONT}" font-size="${fontSize}" font-weight="800" fill="#1D1D1F" letter-spacing="-0.5">${tspans}</text>
  <!-- footer -->
  <text x="90" y="575" font-family="${FONT}" font-size="26" font-weight="700" fill="#6E6E73">iskitch.com</text>
</svg>`;
}

async function render(svgStr, outPath) {
  await sharp(Buffer.from(svgStr)).png().toFile(outPath);
}

async function main() {
  if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });
  let count = 0;

  for (const lang of readdirSync(BLOG_DIR)) {
    const dir = join(BLOG_DIR, lang);
    for (const file of readdirSync(dir).filter((f) => f.endsWith(".md"))) {
      const slug = file.replace(/\.md$/, "");
      const { title, lang: fmLang } = frontmatter(readFileSync(join(dir, file), "utf8"));
      const L = fmLang || lang;
      const out = join(OUT_DIR, `${L}-${slug}.png`);
      await render(svg({ title, lang: L, eyebrow: EYEBROW[L] || "GUIDE" }), out);
      count++;
      console.log(`og  ${L}-${slug}.png`);
    }
  }

  // Portada por defecto (la que referencia el Layout para páginas no-blog).
  const cover = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FF3366"/><stop offset="1" stop-color="#E61F5C"/></linearGradient></defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <g transform="translate(470,210) scale(2.6)" opacity="0.16"><path d="${MARK}" fill="#ffffff"/></g>
  <g transform="translate(90,150)"><g transform="translate(0,0) scale(0.92)"><path d="${MARK}" fill="#ffffff"/></g></g>
  <text x="90" y="380" font-family="${FONT}" font-size="78" font-weight="800" fill="#ffffff" letter-spacing="-1">iSkitch</text>
  <text x="90" y="450" font-family="${FONT}" font-size="36" font-weight="600" fill="#ffffff" opacity="0.95">Capture. Annotate. Share — for macOS.</text>
  <text x="90" y="575" font-family="${FONT}" font-size="26" font-weight="700" fill="#ffffff" opacity="0.9">iskitch.com</text>
</svg>`;
  await render(cover, join(ROOT, "public/og-cover.png"));
  console.log("og  og-cover.png (default)");
  console.log(`\n✓ ${count} OG de artículo + 1 portada generados en public/`);
}

main().catch((e) => { console.error(e); process.exit(1); });
