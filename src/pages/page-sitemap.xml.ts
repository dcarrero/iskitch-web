// Sub-sitemap de páginas estáticas (home + secciones), una URL por idioma con hreflang.
import { urlsetHandler } from "../lib/sitemap-pro/handlers";
import { pageUrls } from "../lib/sitemap-data";

export const prerender = true;
export const GET = urlsetHandler(pageUrls);
