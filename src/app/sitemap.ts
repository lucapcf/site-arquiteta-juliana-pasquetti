import fs from 'fs';
import path from 'path';
import type { MetadataRoute } from 'next';

const BASE_URL = 'https://arquitetajulianapasquetti.com.br';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    { url: BASE_URL, lastModified: new Date(), priority: 1.0 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), priority: 0.8 },
    { url: `${BASE_URL}/services`, lastModified: new Date(), priority: 0.8 },
    { url: `${BASE_URL}/projects`, lastModified: new Date(), priority: 0.8 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), priority: 0.8 },
  ];

  const projectsDir = path.join(process.cwd(), 'content/projects');
  let projectPages: MetadataRoute.Sitemap = [];

  try {
    const files = await fs.promises.readdir(projectsDir);
    projectPages = files
      .filter((file) => path.extname(file) === '.json')
      .map((file) => ({
        url: `${BASE_URL}/projects/${path.parse(file).name}`,
        lastModified: new Date(),
        priority: 0.6,
      }));
  } catch {
    // If directory doesn't exist, skip project pages
  }

  return [...staticPages, ...projectPages];
}
