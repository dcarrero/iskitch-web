// Datos del sitemap para iSkitch. El paquete (src/lib/sitemap-pro) renderiza el XML;
// aquí se construyen las listas de URLs con `lastmod` HONESTO: la fecha real de cada
// post (updatedDate ?? pubDate) y una fecha FIJA para las páginas estáticas (que solo
// se sube cuando su contenido cambia, no en cada build). Ver la guía SEO/GEO.
import { getCollection } from "astro:content";
import type { SitemapUrl, SubSitemap } from "./sitemap-pro/core";
import { LANGS, SITE, articlePath, blogIndexPath, entrySlug } from "./blog";

/** Última revisión de las páginas estáticas (home, faq, terms…). Súbela solo cuando
 *  cambie el contenido de esas páginas — nunca la pongas a "hoy" en cada build. */
const SITE_REVISION = "2026-07-03";

type StaticPage = { seg: string; priority: number; changefreq: SitemapUrl["changefreq"] };

/** Páginas que existen en los 8 idiomas (EN sin prefijo). */
const STATIC_PAGES: StaticPage[] = [
  { seg: "", priority: 1.0, changefreq: "weekly" }, // home
  { seg: "changelog", priority: 0.7, changefreq: "weekly" },
  { seg: "faq", priority: 0.5, changefreq: "monthly" },
  { seg: "support", priority: 0.5, changefreq: "monthly" },
  { seg: "privacy", priority: 0.3, changefreq: "yearly" },
  { seg: "terms", priority: 0.3, changefreq: "yearly" },
];

/** Ruta de una página estática en un idioma (EN sin prefijo). */
function pagePath(lang: string, seg: string): string {
  const base = lang === "en" ? "" : `/${lang}`;
  return seg ? `${base}/${seg}/` : `${base}/`;
}

/** Alternates hreflang recíprocos (8 idiomas + x-default=EN) de una página estática. */
function pageAlternates(seg: string) {
  const alts = LANGS.map((l) => ({ hreflang: l, href: `${SITE}${pagePath(l, seg)}` }));
  alts.push({ hreflang: "x-default", href: `${SITE}${pagePath("en", seg)}` });
  return alts;
}

/** Sub-sitemap de páginas estáticas (home + secciones), una URL por idioma. */
export function pageUrls(): SitemapUrl[] {
  const urls: SitemapUrl[] = [];
  for (const page of STATIC_PAGES) {
    const alternates = pageAlternates(page.seg);
    for (const lang of LANGS) {
      urls.push({
        loc: `${SITE}${pagePath(lang, page.seg)}`,
        lastmod: SITE_REVISION,
        changefreq: page.changefreq,
        priority: page.priority,
        alternates,
      });
    }
  }
  return urls;
}

/** Sub-sitemap del blog: índices por idioma + todos los posts, con lastmod real. */
export async function blogUrls(): Promise<SitemapUrl[]> {
  const entries = await getCollection("blog");

  // Idiomas presentes por slug, para alternates recíprocos reales (no todos los posts
  // están traducidos a los 8 idiomas).
  const langsBySlug = new Map<string, Set<string>>();
  // Fecha del post más reciente por idioma, para el lastmod del índice de blog.
  const latestByLang = new Map<string, Date>();
  for (const e of entries) {
    const slug = entrySlug(e.id);
    if (!langsBySlug.has(slug)) langsBySlug.set(slug, new Set());
    langsBySlug.get(slug)!.add(e.data.lang);
    const d = (e.data.updatedDate ?? e.data.pubDate) as Date;
    const cur = latestByLang.get(e.data.lang);
    if (!cur || d > cur) latestByLang.set(e.data.lang, d);
  }

  const urls: SitemapUrl[] = [];

  // Índices del blog por idioma.
  const indexAlternates = LANGS.map((l) => ({ hreflang: l, href: `${SITE}${blogIndexPath(l)}` }));
  indexAlternates.push({ hreflang: "x-default", href: `${SITE}${blogIndexPath("en")}` });
  for (const lang of LANGS) {
    const latest = latestByLang.get(lang);
    if (!latest) continue;
    urls.push({
      loc: `${SITE}${blogIndexPath(lang)}`,
      lastmod: latest,
      changefreq: "weekly",
      priority: 0.7,
      alternates: indexAlternates,
    });
  }

  // Posts individuales, con lastmod real y alternates solo de los idiomas que existen.
  for (const e of entries) {
    const slug = entrySlug(e.id);
    const langs = [...(langsBySlug.get(slug) ?? [])];
    const alternates = langs.map((l) => ({ hreflang: l, href: `${SITE}${articlePath(l, slug)}` }));
    if (langs.includes("en")) {
      alternates.push({ hreflang: "x-default", href: `${SITE}${articlePath("en", slug)}` });
    }
    urls.push({
      loc: `${SITE}${articlePath(e.data.lang, slug)}`,
      lastmod: (e.data.updatedDate ?? e.data.pubDate) as Date,
      changefreq: "monthly",
      priority: 0.6,
      alternates,
    });
  }
  return urls;
}

/** Índice: lista los sub-sitemaps por tipo de contenido. */
export function subs(): SubSitemap[] {
  return [
    { loc: `${SITE}/page-sitemap.xml` },
    { loc: `${SITE}/blog-sitemap.xml` },
  ];
}
