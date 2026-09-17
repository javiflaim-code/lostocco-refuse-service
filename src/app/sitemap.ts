import type { MetadataRoute } from 'next';
import { nav, siteUrl } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: siteUrl, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    ...nav.map((item) => ({
      url: `${siteUrl}${item.href}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: item.href === '/contact' || item.href === '/dumpsters' ? 0.9 : 0.8,
    })),
  ];
}
