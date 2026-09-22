// Menciones en prensa y reseñas en otras webs. Se citan tal cual (titular en
// su idioma, sin traducir ni retocar) y con enlace: el enlace es la prueba.
// Añadir una mención = añadir una entrada; la fecha se localiza sola en cada
// idioma del sitio. Mientras haya pocas, salen como una línea más de la franja
// de hechos verificables de Precio; con tres o más, pasar a una sección propia.

export type PressMention = {
  outlet: string;   // nombre del medio, tal como se escribe él mismo
  title: string;    // titular literal
  url: string;
  date: string;     // ISO, fecha de publicación
  lang: string;     // idioma del artículo (para lang/hreflang)
  byline?: string;  // firma tal como aparece en el artículo
};

export const PRESS: PressMention[] = [
  {
    outlet: "appgefahren.de",
    title: "iSkitch für macOS: Der kleine Screenshot-Helfer mit Skitch-DNA",
    url: "https://www.appgefahren.de/iskitch-fuer-macos-der-kleine-screenshot-helfer-mit-skitch-dna-405507.html",
    date: "2026-09-16",
    lang: "de",
    byline: "Mel",
  },
];

// Locales de Intl para cada idioma del sitio (en-US porque el resto de fechas
// del sitio van como «September 17, 2026»).
const LOCALES: Record<string, string> = {
  en: "en-US", es: "es-ES", de: "de-DE", fr: "fr-FR",
  it: "it-IT", pt: "pt-PT", ja: "ja-JP", ko: "ko-KR",
};

export function formatPressDate(iso: string, lang: string): string {
  return new Intl.DateTimeFormat(LOCALES[lang] ?? "en-US", {
    year: "numeric", month: "long", day: "numeric", timeZone: "UTC",
  }).format(new Date(iso));
}
