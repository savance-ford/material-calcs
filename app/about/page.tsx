import { Metadata } from 'next';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: `About Us | ${siteConfig.siteName}`,
  description: 'Learn more about CalcPro DIY and our mission to help DIYers.',
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto py-12">
      <h1 className="text-4xl font-extrabold text-stone-900 mb-6">About Us</h1>
      <div className="prose prose-stone max-w-none text-stone-700 leading-relaxed text-lg">
        <p>
          Welcome to <strong>{siteConfig.siteName}</strong>. We are a small team of passionate DIYers, builders, and software engineers dedicated to making home improvement projects more accessible.
        </p>
        <p>
          Our mission is simple: provide the most accurate, free, and easy-to-use material estimation tools on the internet. Whether you are building a retaining wall, laying a patio, or just trying to figure out how much mulch you need for your garden beds, we want to help you order the right amount of material the first time.
        </p>
        <p>
          We know what it&apos;s like to be standing in the aisle of a hardware store trying to do complex volume calculations on a phone. That&apos;s why we designed our calculators to be mobile-first, blazingly fast, and completely free of confusing jargon.
        </p>
      </div>
    </div>
  );
}
