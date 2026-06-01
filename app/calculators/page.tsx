import { Metadata } from 'next';
import Link from 'next/link';
import { calculators } from '@/lib/calculator-configs';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: `Calculators | ${siteConfig.siteName}`,
  description: 'Browse free DIY material calculators for concrete, landscaping, and hardscaping projects.',
  alternates: {
    canonical: `${siteConfig.siteUrl}/calculators`,
  },
};

export default function CalculatorsPage() {
  const categories = Array.from(new Set(calculators.map((calculator) => calculator.category)));

  return (
    <div className="max-w-5xl mx-auto">
      <header className="mb-12">
        <p className="text-sm font-bold uppercase tracking-widest text-emerald-700 mb-3">DIY calculators</p>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-stone-900 mb-4 tracking-tight">
          Material Calculators
        </h1>
        <p className="text-stone-600 max-w-2xl text-lg sm:text-xl">
          Estimate concrete, mulch, gravel, soil, paver base, and retaining wall materials before you buy.
        </p>
      </header>

      <div className="space-y-16">
        {categories.map((category) => (
          <section key={category} aria-labelledby={`${category.toLowerCase().replace(/\s+/g, '-')}-heading`}>
            <h2 id={`${category.toLowerCase().replace(/\s+/g, '-')}-heading`} className="text-2xl font-bold text-stone-900 mb-6 border-b border-stone-200 pb-3">
              {category} Calculators
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {calculators.filter((calculator) => calculator.category === category).map((calculator) => (
                <Link
                  key={calculator.id}
                  href={`/calculators/${calculator.slug}`}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200 hover:shadow-md hover:border-emerald-300 transition-all flex flex-col h-full group"
                >
                  <h3 className="text-xl font-bold text-stone-900 group-hover:text-emerald-700 transition-colors mb-2">
                    {calculator.title}
                  </h3>
                  <p className="text-stone-600 text-sm line-clamp-3 leading-relaxed">
                    {calculator.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
