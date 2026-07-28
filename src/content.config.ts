import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projectsCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    price: z.string(),
    status: z.enum(['Under Construction', 'Delivered']),
    type: z.enum(['Residential', 'Commercial']),
    rooms: z.string().optional(),
    area: z.string().optional(),
    location: z.string(),
    amenities: z.array(z.string()).optional(),
    image: z.string().optional(),
    featured: z.boolean().default(false)
  })
});

const blogCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    excerpt: z.string(),
    image: z.string().optional()
  })
});

const faqsCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.json', base: "./src/content/faqs" }),
  schema: z.object({
    question: z.string(),
    answer: z.string()
  })
});

export const collections = {
  projects: projectsCollection,
  blog: blogCollection,
  faqs: faqsCollection
};
