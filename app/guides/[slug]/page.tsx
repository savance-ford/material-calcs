import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { calculators, getRelatedCalculators } from '@/lib/calculator-configs';
import { getGuideBySlug, getRelatedGuides, guides } from '@/lib/guide-configs';
import { siteConfig } from '@/lib/site';

interface Props {
  params: Promise<{ slug: string }>;
}

type JsonLd = Record<string, unknown>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    return { title: 'Guide Not Found' };
  }

  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
    alternates: {
      canonical: `${siteConfig.siteUrl}/guides/${guide.slug}`,
    },
  };
}

export async function generateStaticParams() {
  return guides.map((guide) => ({
    slug: guide.slug,
  }));
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  const calculator = calculators.find((calc) => calc.slug === guide.calculatorSlug);
  const relatedGuides = getRelatedGuides(guide.relatedGuideSlugs);
  const relatedCalculators = getRelatedCalculators(guide.relatedCalculatorSlugs);

  const jsonLd: JsonLd[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: guide.h1,
      description: guide.metaDescription,
      dateModified: guide.reviewedDate,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: guide.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="mb-8">
        <div className="flex items-center gap-2 text-xs text-stone-500 mb-2 uppercase tracking-widest font-semibold">
          <Link href="/guides" className="hover:text-emerald-700 transition-colors">Guides</Link>
          <span>/</span>
          <span className="text-emerald-700">{guide.category}</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-stone-950 tracking-tight mb-4">
          {guide.h1}
        </h1>
        <p className="text-lg sm:text-xl leading-relaxed text-stone-700">{guide.description}</p>
        <p className="mt-3 text-sm font-semibold text-stone-500">Last reviewed: {guide.reviewedDate}</p>
      </header>

      <section className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6 mb-8">
        <h2 className="text-lg font-bold text-stone-950 mb-2">Short Answer</h2>
        <p className="text-stone-700 leading-relaxed">{guide.shortAnswer}</p>
        {calculator && (
          <Link
            href={`/calculators/${calculator.slug}`}
            className="mt-4 inline-flex rounded-xl bg-emerald-700 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-800 transition-colors"
          >
            {guide.calculatorLinkText}
          </Link>
        )}
      </section>

      <div className="space-y-8">
        <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-stone-950 mb-4">Practical Explanation</h2>
          <div className="space-y-4">
            {guide.explanation.map((paragraph) => (
              <p key={paragraph} className="leading-relaxed text-stone-700">{paragraph}</p>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-stone-950 mb-3">Simple Formula</h2>
          <p className="leading-relaxed text-stone-700">{guide.formula}</p>
        </section>

        <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-stone-950 mb-3">{guide.example.title}</h2>
          <ol className="list-decimal pl-5 space-y-3 text-stone-700">
            {guide.example.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <p className="mt-5 rounded-xl bg-stone-100 p-4 font-bold text-stone-900">{guide.example.result}</p>
        </section>

        <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-stone-950 mb-4">Common Mistakes</h2>
          <ul className="list-disc pl-5 space-y-2 text-stone-700">
            {guide.mistakes.map((mistake) => (
              <li key={mistake}>{mistake}</li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-stone-950 mb-6">FAQ</h2>
          <div className="space-y-6">
            {guide.faqs.map((faq) => (
              <div key={faq.question} className="border-b border-stone-200 pb-6 last:border-0 last:pb-0">
                <h3 className="text-lg font-bold text-stone-950 mb-2">{faq.question}</h3>
                <p className="leading-relaxed text-stone-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-amber-100 bg-amber-50 p-6">
          <h2 className="text-xl font-bold text-stone-950 mb-2">Estimate Disclaimer</h2>
          <p className="leading-relaxed text-stone-700">
            These guides and calculators provide planning estimates. Bag yields, material density, compaction, waste, site conditions, supplier measurements, and local requirements can vary. Confirm quantities with your supplier, contractor, plans, or local code requirements when needed.
          </p>
        </section>

        <section className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6">
          <h2 className="text-xl font-bold text-stone-950 mb-2">Ready to Estimate Your Project?</h2>
          <p className="leading-relaxed text-stone-700 mb-4">
            Use the calculator to turn your measurements into an approximate material list before you buy, quote, or start work.
          </p>
          {calculator && (
            <Link href={`/calculators/${calculator.slug}`} className="font-bold text-emerald-800 hover:text-emerald-900">
              {guide.calculatorLinkText}
            </Link>
          )}
        </section>

        {(relatedGuides.length > 0 || relatedCalculators.length > 0) && (
          <section>
            <h2 className="text-2xl font-bold text-stone-950 mb-5">Related Guides and Calculators</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {relatedGuides.map((relatedGuide) => (
                <Link
                  key={relatedGuide.slug}
                  href={`/guides/${relatedGuide.slug}`}
                  className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm hover:border-emerald-300 hover:shadow-md transition-all"
                >
                  <p className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Guide</p>
                  <h3 className="font-bold text-stone-950">{relatedGuide.title}</h3>
                </Link>
              ))}
              {relatedCalculators.map((relatedCalculator) => (
                <Link
                  key={relatedCalculator.slug}
                  href={`/calculators/${relatedCalculator.slug}`}
                  className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm hover:border-emerald-300 hover:shadow-md transition-all"
                >
                  <p className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Calculator</p>
                  <h3 className="font-bold text-stone-950">{relatedCalculator.title}</h3>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
