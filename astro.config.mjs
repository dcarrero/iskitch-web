import { defineConfig } from 'astro/config';

// iskitch.com — Astro config.
// Sale en /dist, con EN como idioma por defecto (sin prefijo) y ES bajo /es/.
export default defineConfig({
  site: 'https://iskitch.com',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: { prefixDefaultLocale: false }
  },
  build: {
    inlineStylesheets: 'auto'
  }
});
