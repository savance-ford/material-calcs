import { Metadata } from 'next';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: `About Us | ${siteConfig.siteName}`,
  description: 'Learn more about DIY Material Calculator and our mission to help homeowners, DIYers, and small crews plan material purchases.',
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto py-12">
      <h1 className="text-4xl font-extrabold text-stone-900 mb-6">About Us</h1>
      <div className="prose prose-stone max-w-none text-stone-700 leading-relaxed text-lg">
        <p>
          Welcome to <strong>{siteConfig.siteName}</strong>. We are a small team of passionate DIYers, builders, and software engineers dedicated to making material planning more accessible.
        </p>
        <p>
          Our mission is simple: provide free, easy-to-use material estimation tools for homeowners, weekend DIYers, contractors, landscapers, and small crews. Whether you are building a retaining wall, laying a patio, or figuring out how much mulch you need for garden beds, we want to help you build a practical material list before you buy.
        </p>
        <p>
          We know what it&apos;s like to be standing in the aisle of a hardware store or checking measurements on a jobsite and needing a quick volume calculation on a phone. That&apos;s why we designed our calculators to be mobile-first, fast, and free of confusing jargon.
        </p>
      </div>
    </div>
  );
}
