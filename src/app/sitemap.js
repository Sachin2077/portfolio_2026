import { projects } from '@/content/projects';
import { site } from '@/content/site';

export default function sitemap() {
  return [
    { url: site.url, changeFrequency: 'monthly', priority: 1 },
    ...projects.map(({ slug }) => ({
      url: `${site.url}/projects/${slug}`,
      changeFrequency: 'yearly',
      priority: 0.8,
    })),
  ];
}
