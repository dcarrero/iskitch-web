// Utilidades compartidas por las rutas del blog (índice y artículos).
export const SITE = "https://iskitch.com";
export const LANGS = ["en", "es", "fr", "de", "it", "pt", "ja", "ko"] as const;
export type Lang = (typeof LANGS)[number];

/** Slug compartido de una entrada, derivado de su id ("<lang>/<slug>"). */
export function entrySlug(id: string): string {
  const i = id.indexOf("/");
  return i === -1 ? id : id.slice(i + 1);
}

/** Ruta (relativa) de un artículo en un idioma. EN va sin prefijo. */
export function articlePath(lang: string, slug: string): string {
  return lang === "en" ? `/blog/${slug}/` : `/${lang}/blog/${slug}/`;
}

/** Ruta (relativa) del índice del blog en un idioma. */
export function blogIndexPath(lang: string): string {
  return lang === "en" ? "/blog/" : `/${lang}/blog/`;
}

/** Alternates hreflang para un slug: una URL absoluta por idioma. */
export function articleAlternates(slug: string) {
  return LANGS.map((lang) => ({ hreflang: lang, href: `${SITE}${articlePath(lang, slug)}` }));
}

/** Tiempo de lectura estimado en minutos. CJK se cuenta por carácter. */
export function readingMinutes(body: string | undefined, lang: string): number {
  const text = (body ?? "").replace(/```[\s\S]*?```/g, " ").replace(/[#>*_`|\-]/g, " ");
  if (lang === "ja" || lang === "ko") {
    const chars = (text.match(/\S/g) ?? []).length;
    return Math.max(1, Math.round(chars / 500));
  }
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

/** Etiqueta de fecha localizada (formato corto por idioma). */
export function dateLabel(date: Date, lang: string): string {
  const locale =
    { es: "es-ES", fr: "fr-FR", de: "de-DE", it: "it-IT", pt: "pt-PT", ja: "ja-JP", ko: "ko-KR" }[lang] ?? "en-US";
  return new Intl.DateTimeFormat(locale, { year: "numeric", month: "long", day: "numeric" }).format(date);
}
