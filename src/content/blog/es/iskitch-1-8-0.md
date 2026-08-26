---
title: "Lo que llega en iSkitch 1.8.0, y el fallo que llevaba ahí desde el primer día"
description: "Capturar una ventana nunca capturó una ventana. Arreglarlo abrió la puerta a la sombra, el fondo transparente, los atajos globales de verdad, redimensionar y exportar a GIF y BMP."
lang: "es"
pubDate: 2026-08-26
order: 6
heroAlt: "Una ventana capturada con su sombra y sus esquinas redondeadas sobre fondo transparente."
tags: ["iSkitch", "versión", "macOS"]
related: ["skitch-features-compared", "how-to-take-screenshots-on-mac"]
---

Hace un par de días publicamos una comparación función por función con el Skitch original, con la lista de lo que iSkitch todavía no sabía hacer. Repasando esa lista salió algo que no esperábamos: **capturar una ventana nunca capturó una ventana.**

## El fallo que llevaba ahí desde el principio

Eliges «Capturar ventana», haces clic en Safari y te sale una imagen de Safari. Casi siempre. Pero si había algo por encima —un panel flotante, otra ventana, una notificación— se venía dentro.

Porque la app no estaba capturando la ventana. Hacía una foto de **la pantalla entera** y recortaba el rectángulo de la ventana. Todo lo que quedara dentro de ese rectángulo entraba en la captura, fuera de la ventana o no.

La función que le pide a macOS una ventana aislada existía desde la primera versión. No la llamaba nadie. Llevaba ahí como código muerto mientras todas las capturas de ventana pasaban por el recorte.

Eso explica además algo que nos traía de cabeza: la sombra y las esquinas transparentes que acabábamos de implementar no aparecían por ningún lado. Claro que no: el código que las generaba no se ejecutaba nunca.

## Lo que ese arreglo abre

Ahora que las ventanas se capturan como ventanas, salen **con su sombra y sus esquinas redondeadas, sobre fondo transparente** en lugar de lo que hubiera detrás en el escritorio. Pegada en un documento o en un chat, esa es la diferencia entre una captura y un recorte.

Un detalle del que estamos un poco orgullosos: la sombra la dibuja iSkitch, no macOS. ScreenCaptureKit sabe hacerlo, pero la mete **dentro** del búfer que le pides: medido sobre una ventana de 2168 px, el contenido se encogía a 2038 px para dejarle sitio. Una app de capturas no puede remuestrear tu ventana a 0,94× y quedarse tan ancha. Así que la pedimos sin sombra, a resolución nativa, y la sombra la componemos nosotros.

## Los atajos que no eran atajos

⌥⌘5 para una ventana, ⌥⌘3 para la pantalla completa, ⌥⇧⌘4 para repetir la última región. Estaban documentados, estaban en el menú y, fuera de la app, **no hacían nada**. Solo ⌥⌘4 estaba registrado como atajo global; el resto eran elementos de menú normales, que necesitan tener iSkitch delante. Justo cuando no lo tienes.

Los cuatro son ya atajos globales de verdad, se les ha unido un quinto (**⌥⇧⌘5** coge la ventana que tienes delante, sin apuntar) y **los cinco se cambian uno a uno** en Ajustes ▸ Captura ▸ Atajo.

## Lo demás

- **Redimensionar la imagen** — Imagen ▸ Redimensionar imagen…, en píxeles, con proporción bloqueada y atajos al 25, 50, 75 y 100 %. Las anotaciones se reescalan con ella y ⌘Z lo deshace entero, de una vez.
- **Exportar a GIF y BMP**, que se suman a PNG, JPG, TIFF y PDF.
- **Intensidad regulable** del pixelado y el difuminado, guardada en cada anotación: en la misma captura puedes insinuar una IP y dejar una contraseña ilegible del todo.

## Una nota honesta sobre privacidad

La 1.8.0 añade una ventana que te invita a suscribirte a las novedades. Es la primera vez que iSkitch puede enviar algo, así que hemos sido precisos: la app sigue funcionando entera sin conexión, tus capturas siguen sin salir del Mac y lo único que puede salir es tu dirección de correo, y solo si la escribes, marcas la casilla y pulsas el botón.

Hemos reescrito la [política de privacidad](/es/privacy/) en consecuencia, en los ocho idiomas. Antes decía que la app «nunca se conecta a nuestros servidores», y a partir de esta versión eso dejaría de ser cierto.

## Cuándo

La 1.8.0 está terminada y camino de la revisión de App Store. Llegará como actualización gratuita para quien ya tenga iSkitch. Como siempre: sin suscripción y sin cuenta.
