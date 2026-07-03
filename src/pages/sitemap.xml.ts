// Índice de sitemaps (Yoast/RankMath-style). Apunta a los sub-sitemaps por tipo.
import { sitemapIndexHandler } from "../lib/sitemap-pro/handlers";
import { subs } from "../lib/sitemap-data";

export const prerender = true;
export const GET = sitemapIndexHandler(subs);
