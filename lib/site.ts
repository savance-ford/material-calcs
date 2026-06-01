export const siteConfig = {
  siteName: 'CalcPro DIY',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.calcprodiy.com',
  description: 'Free, accurate estimation tools for your next DIY concrete or landscaping project.',
  defaultOgImage: '/og-image.jpg',
  contactEmail: 'hello@calcprodiy.com',
};

export type SiteConfig = typeof siteConfig;
