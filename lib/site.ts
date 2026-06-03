export const siteConfig = {
  siteName: 'DIY Material Calculator',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.diymaterialcalculator.com',
  description: 'Simple material calculators for homeowners, DIYers, contractors, landscapers, and small crews who need quick estimates before buying, quoting, or starting a project.',
  defaultOgImage: '/og-image.jpg',
  contactEmail: 'hello@diymaterialcalculator.com',
};

export type SiteConfig = typeof siteConfig;
