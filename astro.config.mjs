import { defineConfig } from 'astro/config';

// iskitch.com — Astro config.
// Sale en /dist, con EN como idioma por defecto (sin prefijo) y ES bajo /es/.
// El sitemap lo generan endpoints propios (src/pages/sitemap.xml.ts + sub-sitemaps),
// con lastmod honesto y XSL — ver src/lib/sitemap-pro y src/lib/sitemap-data.ts.
export default defineConfig({
  site: 'https://iskitch.com',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'fr', 'de', 'it', 'pt', 'ja', 'ko'],
    routing: { prefixDefaultLocale: false }
  },
  build: {
    // Inlinea todo el CSS en el HTML: nuestro bundle es ~4 KiB, así que evitar
    // la solicitud render-blocking adicional baja el LCP unos cientos de ms.
    inlineStylesheets: 'always'
  }
});
