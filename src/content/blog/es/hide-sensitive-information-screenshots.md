---
title: "Cómo ocultar información sensible en una captura (de forma segura)"
description: "Difuminar no siempre es seguro: algunos métodos se pueden revertir. Aprende a ocultar de forma fiable contraseñas, correos y datos personales en una captura en macOS antes de compartirla."
lang: "es"
pubDate: 2026-06-23
order: 4
heroAlt: "Una captura con un campo de contraseña oculto tras un bloque sólido y zonas pixeladas."
tags: ["privacidad", "capturas", "seguridad"]
related: ["how-to-take-screenshots-on-mac", "how-to-annotate-screenshots-on-mac"]
---

Estás a punto de compartir la captura de un error, una factura o una pantalla de ajustes, y hay una dirección de correo, una clave de API o un número de cuenta justo en el encuadre. Antes de darle a enviar, así es como ocultarlo para que realmente siga oculto.

## No toda la censura es segura

El instinto es difuminar la parte sensible. Pero difuminar es un **filtro reversible**: reparte cada píxel entre sus vecinos según una operación matemática conocida. Con suficiente esfuerzo —y a veces con muy poco— esa operación se puede deshacer parcialmente, sobre todo con texto corto y predecible, como un código de 6 dígitos o un formato de correo conocido. Ha habido casos reales de texto «difuminado» o pixelado que se ha recuperado.

La lección no es «no difumines nunca». Es **ajustar el método al riesgo**:

- **Poco importante, solo ordenar** — un difuminado o pixelado ligero está bien para ocultar una cara de fondo o un logo que no quieres en la imagen.
- **Realmente secreto** — contraseñas, tokens, números de tarjeta, nombres completos, direcciones: no los filtres, **tápalos**.

## La forma fiable: tapar, no filtrar

La única censura que no se puede revertir es aquella en la que los píxeles originales **desaparecen**, sustituidos por algo que no contiene información sobre ellos:

- **Bloque sólido** — un rectángulo opaco y plano sobre el secreto. No hay nada debajo que recuperar. Es la opción más segura para cualquier cosa verdaderamente sensible.
- **Rayas / barras sólidas** — la misma idea, visualmente distinta para que el lector vea que es intencionado.
- **Recórtalo** — si el secreto está en el borde, lo más limpio es eliminarlo de la imagen por completo.

Un detalle sutil pero importante: si «censuras» dibujando una caja en una herramienta que conserva capas, asegúrate de **aplanar y exportar** a una imagen estándar (PNG/JPG). Un archivo con capas o vectorial puede permitir que alguien mueva tu caja y revele lo que hay debajo. Exportar a un PNG plano fija la censura en los píxeles.

## Cómo hacerlo en macOS

El Marcado integrado de macOS puede dibujar una forma sobre el contenido, pero no está pensado para una censura fiable y no tiene una herramienta de pixelado dedicada. Para capturas que vas a compartir, una herramienta dedicada es más rápida y más segura.

[iSkitch](/es/) te da cuatro formas de ocultar información, cada una a un clic en el editor:

- **Bloque sólido** — arrastra un rectángulo opaco y plano sobre cualquier secreto. Úsalo para contraseñas, claves y números de cuenta.
- **Rayas** — una barra rayada que se lee claramente como «censurado».
- **Pixelar** — mosaico grueso para difuminados de menor riesgo (caras, ruido de fondo).
- **Difuminar** — un desenfoque suave para esos mismos usos más ligeros.

Cuando exportas a **PNG, JPG o PDF**, la censura queda **aplanada en la imagen**: lo que tapas, tapado se queda. Y como iSkitch es **privado por diseño —sin cuentas, sin seguimiento, nada sale de tu Mac—** la captura original sin censurar nunca se subió a ningún sitio.

## Una lista rápida antes de compartir

1. ¿Hay algo secreto en el encuadre? Revisa esquinas, pestañas del navegador, notificaciones y reflejos.
2. Para secretos de verdad, usa un **bloque sólido**, no difuminado.
3. Recorta todo lo que no necesites.
4. **Exporta a una imagen plana** (PNG/JPG) para que la tapa no se pueda levantar.
5. Comprueba el archivo exportado, no la vista previa del editor.

Ocultar bien los datos sensibles cuesta diez segundos y te ahorra una filtración que no podrás deshacer. Tápalo, aplánalo y luego comparte.

[Consigue iSkitch en la Mac App Store →](/es/)
