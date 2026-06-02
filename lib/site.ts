export const siteConfig = {
  siteName: 'DIY Material Calculator',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://diymaterialcalculator.com',
  description: 'Free, accurate estimation tools for your next DIY concrete or landscaping project.',
  defaultOgImage: '/og-image.jpg',
  contactEmail: 'hello@diymaterialcalculator.com',
};

export type SiteConfig = typeof siteConfig;
