import { MetadataRoute } from 'next';
import { calculators } from '@/lib/calculator-configs';
import { siteConfig } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/calculators',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
    '/disclaimer'
  ].map((route) => ({
    url: `${siteConfig.siteUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1.0 : 0.5,
  }));

  const calculatorRoutes = calculators.map((calc) => ({
    url: `${siteConfig.siteUrl}/calculators/${calc.slug}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...routes, ...calculatorRoutes];
}
