// Hoja XSL para ver los sitemaps como tabla HTML en el navegador (Yoast-style).
import { stylesheetHandler } from "../lib/sitemap-pro/handlers";

export const prerender = true;
export const GET = stylesheetHandler({ lang: "en", brand: "iSkitch", accent: "#FF3366" });
