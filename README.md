# iskitch.com — sitio público

Landing y página de privacidad de **iSkitch**. Pensado para **Cloudflare Pages**.

## Estructura
```
.
├── README.md           # docs del repo (NO se despliega)
├── .gitignore
└── public/             # 👈 Cloudflare Pages publica SOLO esta carpeta
    ├── index.html      # landing principal
    ├── styles.css      # estilos (light + dark automático)
    ├── assets/
    │   ├── editor-hero.png   # captura del editor (sección hero)
    │   └── app-icon.png      # icono 1024×1024 (marketing)
    └── (futuro)
        ├── privacy.html      # política de privacidad
        ├── support.html
        ├── og-cover.png      # 1200×630 para Open Graph
        └── favicon.png
```

## Desarrollo local
```sh
cd public
python3 -m http.server 8080
# abrir http://localhost:8080
```

## Despliegue en Cloudflare Pages
1. En Cloudflare Pages: **Create a project → Connect to Git → seleccionar el repo `iskitch-web`**.
2. Build settings:
   - Framework preset: **None**
   - Build command: *(vacío — es estático puro)*
   - **Build output directory: `public`** ← clave: solo publica esa carpeta
3. Conectar el dominio **iskitch.com** en *Custom domains*.

> Con `Build output directory: public`, Cloudflare **NO sube** `README.md`,
> `.gitignore` ni nada fuera de `public/`. Los `.md` de documentación se quedan en el repo.

## Pendiente
- [ ] `public/privacy.html` — política de privacidad (texto base en `mac/LAUNCH.md` §7).
- [ ] `public/og-cover.png` — 1200×630 para previsualizaciones en redes (Open Graph).
- [ ] `public/favicon.png` — favicon 32×32 / 180×180 (apple-touch-icon).
- [ ] Cuando esté la app en la Store, **actualizar enlaces de descarga** con la URL real `apps.apple.com/.../iskitch/idXXXXXXXXXX`.
