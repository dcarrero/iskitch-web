import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// iskitch.com — Astro config.
// Sale en /dist, con EN como idioma por defecto (sin prefijo) y ES bajo /es/.
export default defineConfig({
  site: 'https://iskitch.com',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'fr'],
    routing: { prefixDefaultLocale: false }
  },
  build: {
    // Inlinea todo el CSS en el HTML: nuestro bundle es ~4 KiB, así que evitar
    // la solicitud render-blocking adicional baja el LCP unos cientos de ms.
    inlineStylesheets: 'always'
  },
  integrations: [
    sitemap({
      // Una URL por idioma con sus alternates hreflang.
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', es: 'es', fr: 'fr' }
      }
    })
  ]
});
