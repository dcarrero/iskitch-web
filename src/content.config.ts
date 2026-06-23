import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Blog / guías. Un fichero markdown por (idioma, slug) en src/content/blog/<lang>/<slug>.md.
// El id de cada entrada queda como "<lang>/<slug>", de donde derivamos idioma y slug.
const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    lang: z.enum(["en", "es", "fr", "de", "it", "pt", "ja", "ko"]),
    // El slug NO va en el frontmatter: es un campo reservado por Astro y, al
    // compartirse entre idiomas, colisionaría entre carpetas. Se deriva del
    // nombre de archivo (ver entrySlug() en lib/blog.ts).
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    // Orden en el índice (menor = primero).
    order: z.number().default(99),
    heroAlt: z.string().optional(),
    tags: z.array(z.string()).default([]),
    related: z.array(z.string()).default([]),
  }),
});

export const collections = { blog };
