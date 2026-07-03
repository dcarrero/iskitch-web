// Sub-sitemap del blog: índices por idioma + todos los posts, con lastmod real.
import { urlsetHandler } from "../lib/sitemap-pro/handlers";
import { blogUrls } from "../lib/sitemap-data";

export const prerender = true;
export const GET = urlsetHandler(blogUrls);
