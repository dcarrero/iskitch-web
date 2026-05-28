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

## Formulario de Beta (Pages Function + Acumbamail)

La landing tiene un formulario para recopilar emails de la beta privada. Funciona con
una **Cloudflare Pages Function** (`functions/api/subscribe.ts`) que añade el email
a una lista de **Acumbamail** vía su API.

### Variables de entorno en Cloudflare Pages
En el panel del proyecto → **Settings** → **Environment variables**, añadir (para
*Production* y *Preview*):

| Variable | Valor |
|---|---|
| `ACUMBAMAIL_AUTH_TOKEN` | tu `auth_token` de la API de Acumbamail |
| `ACUMBAMAIL_LIST_ID` | el ID de la lista "iSkitch Beta" |

Sin ambas variables, el endpoint responde `500 server_not_configured`.

### Pruebas locales
La Pages Function NO se ejecuta con `npm run dev` (Astro dev). Para probarla en
local hace falta usar **Wrangler** del lado de Cloudflare:

```sh
npm i -g wrangler
wrangler pages dev dist --compatibility-date=2025-01-01 \
  --binding ACUMBAMAIL_AUTH_TOKEN=xxx \
  --binding ACUMBAMAIL_LIST_ID=yyy
```

### Notas
- El formulario tiene **honeypot** anti-bots (campo invisible).
- La función fuerza `double_optin=1`: Acumbamail manda email de confirmación.
- Validación de email también del lado del cliente (`type="email"` + regex en server).
- Si Acumbamail falla, devuelve `502 acumbamail_error`.

## Pendiente
- [ ] `src/pages/privacy.astro` + `src/pages/es/privacy.astro` (texto base en `mac/LAUNCH.md` §7).
- [ ] `public/og-cover.png` — 1200×630 para Open Graph.
- [ ] `public/favicon.png` — 32×32 + 180×180 apple-touch-icon.
- [ ] Cuando esté la app en la Store, actualizar el enlace de descarga (`#download`) con la URL real de App Store Connect.
