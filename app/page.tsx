import { calculators } from '@/lib/calculator-configs';
import { guides } from '@/lib/guide-configs';
import { siteConfig } from '@/lib/site';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: siteConfig.siteName,
  description: 'Simple material calculators for homeowners, DIYers, contractors, landscapers, and small crews planning concrete, mulch, gravel, soil, and paver base projects.',
  alternates: {
    canonical: siteConfig.siteUrl,
  },
};

const homepageFaqs = [
  {
    question: 'Are these calculators for homeowners or contractors?',
    answer: 'These calculators are written to be simple enough for homeowners and weekend DIYers, but they can also help contractors, landscapers, and small crews make quick material estimates before buying materials, quoting a job, or checking a measurement in the field.',
  },
  {
    question: 'Why do the calculators include a waste factor?',
    answer: 'Real projects are rarely perfect. Uneven ground, cuts, spills, compaction, and measuring mistakes can all increase the amount of material you need.',
  },
  {
    question: 'Can I use these estimates as final engineering advice?',
    answer: 'No. These calculators are planning tools. For load-bearing work, structural concrete, retaining walls, permits, drainage problems, or code questions, talk with a qualified professional.',
  },
];

export default function Home() {
  const categories = Array.from(new Set(calculators.map(c => c.category)));
  const popularSlugs = [
    'concrete-slab-calculator',
    'concrete-bag-calculator',
    'mulch-calculator',
    'gravel-calculator',
    'paver-base-calculator',
    'raised-bed-soil-calculator',
  ];
  const popularCalculators = popularSlugs
    .map((slug) => calculators.find((calculator) => calculator.slug === slug))
    .filter((calculator): calculator is NonNullable<typeof calculator> => Boolean(calculator));
  const popularGuideSlugs = [
    'how-much-concrete-do-i-need',
    'how-much-concrete-for-10x10-slab',
    'how-much-mulch-do-i-need',
    'how-much-gravel-do-i-need',
    'how-much-soil-for-raised-bed',
    'how-much-paver-base-do-i-need',
  ];
  const popularGuides = popularGuideSlugs
    .map((slug) => guides.find((guide) => guide.slug === slug))
    .filter((guide): guide is NonNullable<typeof guide> => Boolean(guide));

  const features = [
    {
      title: 'Instant estimates',
      text: 'Enter measurements and see material quantities update before you buy, quote, or start work.',
    },
    {
      title: 'Copyable material lists',
      text: 'Copy or print a practical list for the store, supplier call, quote notes, or jobsite check.',
    },
    {
      title: 'Transparent formulas',
      text: 'Each calculator explains the formula, conversions, assumptions, and waste factors used.',
    },
    {
      title: 'Built for DIY projects and jobsite checks',
      text: 'Useful for patios, garden beds, fence posts, walkways, quick estimates, and field measurements.',
    },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: homepageFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="max-w-6xl mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="mb-14 rounded-3xl border border-stone-200 bg-[#fffaf0] px-5 py-10 sm:px-8 sm:py-14">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-widest text-emerald-700 mb-3">DIY material calculators</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-stone-950 mb-5 tracking-tight">
            Know how much material to buy before you start your project.
          </h1>
          <p className="text-stone-700 text-lg sm:text-xl leading-relaxed">
            DIY Material Calculator helps homeowners, weekend DIYers, contractors, landscapers, and small crews estimate concrete, mulch, gravel, soil, paver base, and other materials before buying, quoting, or starting a job.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="/calculators"
              className="inline-flex justify-center rounded-xl bg-emerald-700 px-6 py-3.5 text-base font-bold text-white shadow-sm hover:bg-emerald-800 transition-colors"
            >
              Browse calculators
            </Link>
            <Link
              href="/methodology"
              className="inline-flex justify-center rounded-xl border border-stone-300 bg-white px-6 py-3.5 text-base font-bold text-stone-800 hover:border-emerald-600 hover:text-emerald-800 transition-colors"
            >
              See how estimates work
            </Link>
          </div>
        </div>
      </header>

      <section className="mb-16" aria-labelledby="features-heading">
        <h2 id="features-heading" className="sr-only">Why use DIY Material Calculator</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature) => (
            <div key={feature.title} className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-bold text-stone-950 mb-2">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-stone-600">{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16" aria-labelledby="popular-heading">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-emerald-700 mb-2">Start here</p>
            <h2 id="popular-heading" className="text-3xl font-extrabold text-stone-950">Popular calculators</h2>
          </div>
          <Link href="/calculators" className="text-sm font-bold text-emerald-700 hover:text-emerald-800">
            View all calculators
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {popularCalculators.map((calculator) => (
            <Link
              key={calculator.id}
              href={`/calculators/${calculator.slug}`}
              className="group flex h-full flex-col rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">{calculator.category}</p>
              <h3 className="text-xl font-bold text-stone-950 group-hover:text-emerald-700 transition-colors mb-2">
                {calculator.title}
              </h3>
              <p className="text-sm leading-relaxed text-stone-600">{calculator.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-16 rounded-3xl border border-stone-200 bg-white p-6 sm:p-8" aria-labelledby="how-it-works-heading">
        <p className="text-sm font-bold uppercase tracking-widest text-emerald-700 mb-2">How it works</p>
        <h2 id="how-it-works-heading" className="text-3xl font-extrabold text-stone-950 mb-8">
          From measurements to material list
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            ['1', 'Measure', 'Measure the project area, thickness, depth, or number of pieces needed.'],
            ['2', 'Enter dimensions', 'Add your numbers and adjust waste factor, bag size, or material density when available.'],
            ['3', 'Copy or print', 'Use the material list while shopping, ordering delivery, or comparing options.'],
          ].map(([step, title, text]) => (
            <div key={step} className="rounded-2xl bg-stone-50 p-5">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-700 text-sm font-extrabold text-white">{step}</div>
              <h3 className="text-lg font-bold text-stone-950 mb-2">{title}</h3>
              <p className="text-sm leading-relaxed text-stone-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16" aria-labelledby="popular-guides-heading">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-emerald-700 mb-2">Planning help</p>
            <h2 id="popular-guides-heading" className="text-3xl font-extrabold text-stone-950">Popular DIY Guides</h2>
          </div>
          <Link href="/guides" className="text-sm font-bold text-emerald-700 hover:text-emerald-800">
            View all guides
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {popularGuides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="group flex h-full flex-col rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">{guide.category}</p>
              <h3 className="text-xl font-bold text-stone-950 group-hover:text-emerald-700 transition-colors mb-2">
                {guide.title}
              </h3>
              <p className="text-sm leading-relaxed text-stone-600">{guide.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <div className="space-y-16 mt-8">
        {categories.map(category => (
          <section key={category}>
            <h2 className="text-2xl font-bold text-stone-900 mb-6 flex items-center gap-2 border-b border-stone-200 pb-3">
              {category} Tools
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {calculators.filter(c => c.category === category).map(calc => (
                <Link 
                  key={calc.id} 
                  href={`/calculators/${calc.slug}`}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200 hover:shadow-md hover:border-emerald-300 transition-all flex flex-col h-full group block"
                >
                  <h3 className="text-xl font-bold text-stone-900 group-hover:text-emerald-700 transition-colors mb-2">
                    {calc.title}
                  </h3>
                  <p className="text-stone-600 text-sm line-clamp-3 leading-relaxed">
                    {calc.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="mt-16 rounded-3xl border border-stone-200 bg-[#fffaf0] p-6 sm:p-8" aria-labelledby="home-faq-heading">
        <h2 id="home-faq-heading" className="text-3xl font-extrabold text-stone-950 mb-8">DIY material calculator FAQ</h2>
        <div className="space-y-6">
          {homepageFaqs.map((faq) => (
            <div key={faq.question} className="border-b border-stone-200 pb-6 last:border-0 last:pb-0">
              <h3 className="text-lg font-bold text-stone-950 mb-2">{faq.question}</h3>
              <p className="text-stone-700 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
