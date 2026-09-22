---
title: "iSkitch 1.9.0 y 1.8.1: WebP, un JPEG que dice la verdad y capturas sin permiso"
description: "Dos versiones en un mes, las dos nacidas de correos de soporte: pegar una captura sin el permiso de Grabación de pantalla, capturas nítidas en pantallas escaladas, exportar a WebP, la calidad en el diálogo de guardar y el deslizador JPEG que decía 80 % y escribía 94."
lang: "es"
pubDate: 2026-09-22
order: 7
heroAlt: "El diálogo de guardar de iSkitch con el desplegable Formato en WebP y el deslizador Calidad."
tags: ["iSkitch", "versión", "macOS"]
related: ["iskitch-1-8-0", "how-to-take-screenshots-on-mac"]
---

Desde la [1.8.0](/es/blog/iskitch-1-8-0/) han llegado dos actualizaciones a la Mac App Store: la 1.8.1 el 17 de septiembre y la 1.9.0 el 22. Las dos empezaron como correos de soporte. Uno venía de alguien con un Mac de empresa que no podía concederle a iSkitch el permiso de Grabación de pantalla. El otro venía de Austria, con cuatro sugerencias y, unos días después, una medición que nos hizo retirar una build de la revisión de Apple.

## 1.8.1: ¿sin permiso de Grabación de pantalla? También se puede

En un Mac gestionado por la empresa, sin derechos de administrador, no puedes conceder el permiso de Grabación de pantalla. Y sin él, «Capturar» no sirve de nada. Skitch resolvió esto hace años con el portapapeles: haces la captura con macOS y la pegas en Skitch. iSkitch no sabía hacerlo.

Ahora sí. **Archivo ▸ Nuevo desde el portapapeles (⇧⌘N**, el atajo de Skitch) abre como documento nuevo la imagen que haya en el portapapeles. Y **⌘V hace lo mismo** siempre que ningún campo de texto esté esperando el pegado, así que vuelve el hábito de siempre: ⌃⇧⌘4 de macOS y pegar. Nada de esto pasa por la captura de pantalla, así que no hace falta permiso, y una captura Retina conserva sus píxeles a 2×.

Cuando una captura falla por falta de permiso, el aviso explica ahora las dos alternativas (seguir con ⇧⌘4 de macOS y que iSkitch abra cada captura, o pegar con ⇧⌘N) y lleva un botón que activa la primera ahí mismo.

### La captura borrosa de la que se habían quejado tres personas

Esa misma persona nos mandó un vídeo desde un Mac mini con un monitor 4K a 2560×1440, y por fin se vio de dónde venían las quejas de «baja resolución». No del export, como creíamos. De la propia captura.

Le pedíamos a ScreenCaptureKit un bitmap del tamaño de `CGDisplayPixelsWide`, que pese al nombre devuelve **puntos** en cualquier modo Retina. En una pantalla escalada, la captura de región salía a 1×; en aquel Mac mini llegaba a 2×, pero interpolada, blanda. Las capturas de región y de pantalla completa pasan ahora por la misma maquinaria que el ⇧⌘4 de macOS. Medido contra `screencapture` sobre el mismo rectángulo: **cero píxeles distintos**.

## 1.9.0: WebP, y la calidad donde se guarda

macOS lee WebP desde hace años y sigue sin escribirlo. iSkitch trae ahora su propio codificador (libwebp, el oficial de Google; el aviso está en «Acerca de»), así que **WebP se suma a PNG, JPG, TIFF, PDF, GIF y BMP** en Ajustes, en el botón de guardar del editor y en el diálogo de guardar, con calidad graduable y transparencia. **El 100 % guarda sin pérdida**, como hacen las herramientas de WebP. Y como el formato no tiene campo de resolución, la escribimos en un chunk EXIF que Vista Previa e ImageIO leen: una captura Retina se abre a 144 dpi y a su tamaño real, no al doble.

Al propio diálogo de guardar le han salido un desplegable **Formato** y, para JPEG y WebP, un deslizador **Calidad**, como la hoja de Exportar de Vista Previa. Lo que elijas ahí se queda como valor por defecto.

Y **Redimensionar imagen** ha salido de su escondite. Estaba en el menú Imagen desde la 1.8.0 y no lo encontraba nadie, tampoco quien nos escribió desde Austria, que lo pidió como función nueva. Ahora tiene atajo (**⇧⌘R**), un botón en la barra de recorte y otro junto a las medidas en píxeles de la parte baja del editor; hacer clic en las cifras «An × Al px» también lo abre.

## El 80 % que era un 94

Entre las cuatro sugerencias venía una queja que creíamos contestada: los JPEG de iSkitch pesaban demasiado. Nuestra primera respuesta decía que el archivo estaba bien y que su herramienta de medir se equivocaba. Entonces esa persona midió la misma captura en cinco apps con el mismo «80 %». iSkitch: 131 KB. Las demás: entre 31 y 46 KB.

Tenía razón. El codificador JPEG de macOS tiene su propia escala de calidad, y su 80 escribe las tablas de cuantización que Affinity, XnConvert, Squoosh, ImageMagick y libjpeg llaman **94**. Leímos las tablas nosotros mismos para confirmarlo: el 0,5 de Apple es el 80 estándar, y su 0,85 y su 0,9 escriben exactamente el mismo archivo.

La build 25 ya estaba en revisión en Apple. La retiramos. La build 26 traduce el valor del deslizador a la escala del codificador con una tabla medida punto a punto, así que el número que eliges es el que cualquier herramienta lee del archivo, y el tamaño queda a la par del resto. Si tenías una calidad ajustada, verás archivos más pequeños con el mismo número; el 90 % por defecto es ahora un 90 de verdad.

## Lo demás

- **La barra de recorte hablaba en puntos.** En una captura Retina decía 1280 × 800 mientras la barra inferior decía 2560 × 1600. Ahora trabaja en píxeles, lo dice, y escribir 1281 recorta exactamente a 1281 (antes daba 1282).
- **Las imágenes pequeñas se abren centradas**, en vez de pegadas a la esquina superior izquierda de la ventana mínima de 800 × 600 del editor.
- **Una petición de valoración.** Tras cinco exportaciones y al menos tres días de uso, iSkitch pide una valoración con la hoja nativa del sistema: una vez por versión, nunca más de una cada cuatro meses y nunca en respuesta a un clic. Nada a cambio. Lo contamos aquí porque es la segunda cosa, después de la ventana del boletín, que la app puede enseñarte sin que se lo pidas.

## Ya disponible

La 1.9.0 está en la Mac App Store desde el 22 de septiembre de 2026. Actualización gratuita para quien ya tenga iSkitch, sin suscripción y sin cuenta.
