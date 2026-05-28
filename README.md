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

## Formulario de Beta (Pages Function + Cloudflare KV)

La landing tiene un formulario para recopilar emails de la beta privada. Los emails
se guardan en **Cloudflare KV** (gratis: 100k lecturas/día, 1k escrituras/día, 1 GB
de almacenamiento) y se pueden exportar por un endpoint admin.

> Acumbamail bloquea las IPs salientes de Cloudflare Workers, por eso no podemos
> usar su API directamente desde la Pages Function. Por eso almacenamos en KV y se
> exportan los emails a Acumbamail manualmente cuando quieras.

### 1) Crear el namespace de KV
1. **Cloudflare Dashboard → Workers & Pages → KV** (en el menú lateral).
2. **Create a namespace** → nombre p. ej. `iskitch_subscribers` → Create.

### 2) Bindear el namespace al proyecto Pages
1. **Workers & Pages → `iskitch-web` → Settings → Bindings** (o *Functions* en interfaces antiguas).
2. **Add binding → KV namespace**.
3. Variable name: `SUBSCRIBERS` · Namespace: `iskitch_subscribers`.
4. Guardar para *Production* **y** *Preview*.

### 3) Crear el secreto de admin
En **Settings → Environment variables → Add variable** (Production + Preview):

| Variable | Valor | Type |
|---|---|---|
| `ADMIN_KEY` | un string aleatorio (p. ej. `openssl rand -hex 24`) | **Secret** 🔒 |

> Las antiguas `ACUMBAMAIL_AUTH_TOKEN` y `ACUMBAMAIL_LIST_ID` ya **no se usan**, puedes borrarlas.

### 4) Probar
- Formulario en la web → status `ok` (verde).
- `GET https://iskitch.com/api/subscribe` → debe devolver `{"configured":{"kv_subscribers":true}}`.
- `GET https://iskitch.com/api/admin/subscribers?key=TU_ADMIN_KEY` → JSON con lista de suscriptores.
- `GET https://iskitch.com/api/admin/subscribers?key=TU_ADMIN_KEY&format=csv` → descarga CSV.

### 5) Exportar a Acumbamail
1. Visitar el URL CSV de arriba en el navegador → descarga `iskitch-beta-subscribers-YYYY-MM-DD.csv`.
2. En Acumbamail → tu lista 1355595 → **Importar suscriptores** → subir el CSV (columnas: `email,lang,timestamp,country`).
3. Listo. (Opcional: borrar los emails ya importados de KV.)

### Notas
- El formulario tiene **honeypot** anti-bots (campo invisible).
- La clave KV es `subscriber:<email>` → re-suscripciones del mismo email sobrescriben en vez de duplicar.
- KV guarda además `__meta:count` (total acumulado) y `__meta:last` (timestamp última suscripción).
- Validación de email del lado cliente (`type="email"`) y servidor (regex).

### Pruebas locales
La Pages Function NO se ejecuta con `npm run dev` (Astro dev). Para probarla en
local con KV simulado:

```sh
npm i -g wrangler
npm run build
wrangler pages dev dist --kv SUBSCRIBERS --binding ADMIN_KEY=test
```

## Pendiente
- [ ] `src/pages/privacy.astro` + `src/pages/es/privacy.astro` (texto base en `mac/LAUNCH.md` §7).
- [ ] `public/og-cover.png` — 1200×630 para Open Graph.
- [ ] `public/favicon.png` — 32×32 + 180×180 apple-touch-icon.
- [ ] Cuando esté la app en la Store, actualizar el enlace de descarga (`#download`) con la URL real de App Store Connect.
