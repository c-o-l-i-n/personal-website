import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './blog-content' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    publishedDate: z.date(),
    featured: z.boolean().optional().default(false),
    thumbnail: z.string().default('/images/placeholder.webp'),
    tags: z.array(z.string()).optional(),
    published: z.boolean().default(false),
  }),
});

export const collections = { blog };
