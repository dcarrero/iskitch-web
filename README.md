# iskitch-web

Sitio público de **iSkitch** — landing, política de privacidad y soporte.
Construido con **[Astro](https://astro.build)** (multi-idioma EN/ES) y desplegado en **Cloudflare Pages**.

## Estructura
```
.
├── astro.config.mjs        # config Astro + i18n (en / es)
├── package.json
├── tsconfig.json
├── public/                 # estáticos servidos tal cual
│   └── assets/
│       ├── editor-hero.png
│       └── app-icon.png
├── src/
│   ├── i18n/
│   │   ├── en.json         # traducciones inglés (idioma por defecto)
│   │   └── es.json         # traducciones español
│   ├── layouts/Layout.astro
│   ├── components/         # Nav, Hero, Features, Tools, CTA, Footer
│   ├── pages/
│   │   ├── index.astro     # EN → /
│   │   └── es/index.astro  # ES → /es/
│   └── styles/global.css
└── dist/                   # SALIDA del build (ignorado en git)
```

## Desarrollo local
```sh
npm install
npm run dev       # → http://localhost:4321
```

## Build
```sh
npm run build     # genera dist/
npm run preview   # sirve dist/ para verificar
```

## Despliegue en Cloudflare Pages
1. **Create a project → Connect to Git → seleccionar `iskitch-web`**.
2. Build settings:
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - **Build output directory: `dist`**
   - Node version: 20 (o superior)
3. Conectar el dominio **iskitch.com** en *Custom domains*.

> Cloudflare publicará solo el contenido de `dist/`. Los `.md`, configs y `src/`
> se quedan en el repo pero **no se sirven**.

## i18n
- **Inglés** es el idioma por defecto → URL raíz `/`.
- **Español** está bajo `/es/`.
- El selector de idioma vive en la navegación (botón EN/ES).
- Para añadir un idioma nuevo:
  1. Copiar `src/i18n/en.json` → `src/i18n/xx.json` y traducir.
  2. Crear `src/pages/xx/index.astro` (basado en `es/index.astro`).
  3. Añadir `xx` a `locales` en `astro.config.mjs`.
  4. Añadir un `hreflang` en `src/layouts/Layout.astro`.

## Pendiente
- [ ] `src/pages/privacy.astro` + `src/pages/es/privacy.astro` (texto base en `mac/LAUNCH.md` §7).
- [ ] `public/og-cover.png` — 1200×630 para Open Graph.
- [ ] `public/favicon.png` — 32×32 + 180×180 apple-touch-icon.
- [ ] Cuando esté la app en la Store, actualizar el enlace de descarga (`#download`) con la URL real de App Store Connect.
