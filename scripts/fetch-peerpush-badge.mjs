// Descarga el badge de PeerPush a public/assets/ para servirlo desde nuestro
// dominio (iskitch.com no hace ninguna petición a peerpush.com).
//
// La imagen del badge es dinámica: PeerPush cambia el texto según el estado
// del producto ("Trending Now", "#1 of the day", etc.). Al alojarla nosotros
// queda congelada, así que hay que volver a ejecutar esto para actualizarla:
//
//   npm run peerpush:badge
//
// ⚠️ TEMPORAL: borrar este script (y la entrada de package.json) cuando
// termine la campaña de PeerPush.
import { writeFile, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const SRC = "https://peerpush.com/p/iskitch/badge.png";
const DEST = fileURLToPath(new URL("../public/assets/peerpush-badge.png", import.meta.url));

const res = await fetch(SRC, { redirect: "follow" });
if (!res.ok) {
  console.error(`✗ PeerPush respondió ${res.status} ${res.statusText}`);
  process.exit(1);
}

const buf = Buffer.from(await res.arrayBuffer());
// Comprobación mínima: que sea un PNG de verdad y no una página de error.
if (buf.subarray(0, 8).toString("hex") !== "89504e470d0a1a0a") {
  console.error("✗ La respuesta no es un PNG. No se sobrescribe el fichero.");
  process.exit(1);
}

const previous = await readFile(DEST).catch(() => null);
if (previous && previous.equals(buf)) {
  console.log("· El badge no ha cambiado.");
  process.exit(0);
}

await writeFile(DEST, buf);
// Cabecera IHDR: ancho y alto en big-endian.
const w = buf.readUInt32BE(16);
const h = buf.readUInt32BE(20);
console.log(`✓ Badge actualizado (${w}×${h}, ${(buf.length / 1024).toFixed(1)} KB) → public/assets/peerpush-badge.png`);
