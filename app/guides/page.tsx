import { Metadata } from 'next';
import Link from 'next/link';
import { guides } from '@/lib/guide-configs';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: `DIY Guides | ${siteConfig.siteName}`,
  description: 'Practical DIY material guides for concrete, mulch, gravel, soil, and paver base projects.',
  alternates: {
    canonical: `${siteConfig.siteUrl}/guides`,
  },
};

export default function GuidesPage() {
  const categories = Array.from(new Set(guides.map((guide) => guide.category)));

  return (
    <div className="max-w-5xl mx-auto">
      <header className="mb-12">
        <p className="text-sm font-bold uppercase tracking-widest text-emerald-700 mb-3">DIY material guides</p>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-stone-900 mb-4 tracking-tight">
          Practical Guides Before You Buy Materials
        </h1>
        <p className="text-stone-600 max-w-2xl text-lg sm:text-xl">
          Short, useful answers for homeowners, DIYers, contractors, landscapers, and small crews planning concrete, mulch, gravel, soil, and paver base quantities.
        </p>
      </header>

      <div className="space-y-16">
        {categories.map((category) => (
          <section key={category} aria-labelledby={`${category.toLowerCase()}-guides-heading`}>
            <h2 id={`${category.toLowerCase()}-guides-heading`} className="text-2xl font-bold text-stone-900 mb-6 border-b border-stone-200 pb-3">
              {category} Guides
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {guides.filter((guide) => guide.category === category).map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/guides/${guide.slug}`}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200 hover:shadow-md hover:border-emerald-300 transition-all flex flex-col h-full group"
                >
                  <h3 className="text-xl font-bold text-stone-900 group-hover:text-emerald-700 transition-colors mb-2">
                    {guide.title}
                  </h3>
                  <p className="text-stone-600 text-sm leading-relaxed">{guide.description}</p>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
