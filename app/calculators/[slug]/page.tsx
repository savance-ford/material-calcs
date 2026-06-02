import { getCalculatorBySlug, calculators, getRelatedCalculators } from '@/lib/calculator-configs';
import CalculatorEngine from '@/components/calculator-engine';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { siteConfig } from '@/lib/site';

interface Props {
  params: Promise<{ slug: string }>;
}

type JsonLd = Record<string, unknown>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const config = getCalculatorBySlug(slug);
  
  if (!config) {
    return { title: 'Calculator Not Found' };
  }

  return {
    title: config.metaTitle,
    description: config.metaDescription,
    keywords: [config.primaryKeyword, ...config.secondaryKeywords],
    alternates: {
      canonical: `${siteConfig.siteUrl}/calculators/${config.slug}`
    }
  };
}

export async function generateStaticParams() {
  return calculators.map((calc) => ({
    slug: calc.slug,
  }));
}

export default async function CalculatorPage({ params }: Props) {
  const { slug } = await params;
  const config = getCalculatorBySlug(slug);

  if (!config) {
    notFound();
  }

  const relatedCalcs = config.relatedCalculators ? getRelatedCalculators(config.relatedCalculators) : [];

  const jsonLd: JsonLd[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Calculators',
          item: `${siteConfig.siteUrl}/calculators`
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: config.category
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: config.title,
          item: `${siteConfig.siteUrl}/calculators/${config.slug}`
        }
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: config.title,
      description: config.description,
      applicationCategory: 'UtilityApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requires JavaScript'
    }
  ];

  if (config.faqs && config.faqs.length > 0) {
    jsonLd.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: config.faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    });
  }

  return (
    <div className="max-w-5xl mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-stone-500 mb-1 uppercase tracking-widest font-semibold">
            <Link href="/calculators" className="hover:text-emerald-700 transition-colors">Calculators</Link>
            <span>/</span>
            <span className="text-emerald-700">{config.category}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-stone-900">{config.title}</h1>
          <p className="text-stone-600 mt-2 text-lg">{config.description}</p>
          <p className="mt-3 text-sm font-semibold text-stone-500">
            Last reviewed: {config.reviewedDate || 'June 2026'}
          </p>
        </div>
      </div>

      <CalculatorEngine slug={slug} />
      
      <div className="mt-16 space-y-12 pb-16">
        {config.howToUse && (
          <section className="bg-white/80 p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm">
            <h2 className="text-2xl font-bold text-stone-900 mb-4">How to Use This Calculator</h2>
            <div className="prose prose-stone prose-sm sm:prose-base max-w-none prose-headings:text-stone-800 prose-a:text-emerald-700 prose-a:font-semibold">
              <ReactMarkdown>{config.howToUse}</ReactMarkdown>
            </div>
          </section>
        )}

        {config.formulaExplanation && (
          <section className="bg-white/80 p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm">
            <h2 className="text-2xl font-bold text-stone-900 mb-6">Formula and Assumptions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-stone-900 mb-2">Formula used</h3>
                <p className="text-stone-700 leading-relaxed">
                  {config.formulaExplanation}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-stone-900 mb-2">Unit conversions</h3>
                <p className="text-stone-700 leading-relaxed">
                  Inches are converted to feet before volume is calculated. Cubic feet are converted to cubic yards by dividing by 27. Bag counts are rounded up because stores do not sell partial bags.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-stone-900 mb-2">Waste factor explanation</h3>
                <p className="text-stone-700 leading-relaxed">
                  Waste factor helps account for uneven surfaces, cuts, spills, compaction, settling, and measurement differences. The right buffer depends on your project and material.
                </p>
              </div>
            </div>
          </section>
        )}

        {(config.assumptions || config.warnings) && (
          <section className="bg-white/80 p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm">
            <h2 className="text-2xl font-bold text-stone-900 mb-6">Material Assumptions and Disclaimer</h2>
            <div className="space-y-8">
              {config.assumptions && config.assumptions.length > 0 && (
                <div>
                  <h3 className="text-stone-800 font-bold mb-3">Bag yield or density assumptions</h3>
                  <ul className="list-disc pl-5 space-y-2 text-stone-700">
                    {config.assumptions.map((a, idx) => <li key={idx}>{a}</li>)}
                  </ul>
                </div>
              )}
              <div>
                <h3 className="text-stone-800 font-bold mb-3">Estimate disclaimer</h3>
                <p className="text-stone-700 leading-relaxed">
                  These results are planning estimates based on the measurements and assumptions shown here. Confirm quantities with your supplier, product label, local code requirements, or a qualified professional before purchasing.
                </p>
              </div>
              {config.warnings && config.warnings.length > 0 && (
                <div>
                  <h3 className="text-amber-700 font-bold mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                    When to be careful
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 text-stone-700">
                    {config.warnings.map((w, idx) => <li key={idx}>{w}</li>)}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}

        {config.additionalSections && config.additionalSections.length > 0 && (
          <div className="space-y-8">
            {config.additionalSections.map((section) => (
              <section key={section.title} className="bg-white/80 p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm">
                <h2 className="text-2xl font-bold text-stone-900 mb-4">{section.title}</h2>
                <div className="prose prose-stone prose-sm sm:prose-base max-w-none prose-headings:text-stone-800 prose-a:text-emerald-700 prose-a:font-semibold">
                  <ReactMarkdown>{section.markdown}</ReactMarkdown>
                </div>
              </section>
            ))}
          </div>
        )}

        {config.exampleCalculation && (
          <section className="bg-white/80 p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm">
            <h2 className="text-2xl font-bold text-stone-900 mb-4">Example Calculation</h2>
            <div className="text-stone-700 leading-relaxed">
              <p className="font-semibold text-stone-900 mb-4">{config.exampleCalculation.inputSummary}</p>
              <ol className="list-decimal pl-5 space-y-3 mb-6">
                {config.exampleCalculation.steps.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ol>
              <p className="font-bold text-stone-900 bg-stone-100 p-4 rounded-xl inline-block">{config.exampleCalculation.resultSummary}</p>
            </div>
          </section>
        )}

        {config.faqs && config.faqs.length > 0 && (
          <section className="bg-white/80 p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm">
            <h2 className="text-2xl font-bold text-stone-900 mb-8">Frequently Asked Questions</h2>
            <div className="space-y-8">
              {config.faqs.map((faq, i) => (
                <div key={i} className="border-b border-stone-200 pb-8 last:border-0 last:pb-0">
                  <h3 className="font-bold text-stone-900 text-lg mb-3">{faq.question}</h3>
                  <p className="text-stone-700 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {relatedCalcs.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-stone-900 mb-6">Related Calculators</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedCalcs.map(calc => (
                <Link 
                  key={calc.id} 
                  href={`/calculators/${calc.slug}`}
                  className="bg-white rounded-xl p-6 shadow-sm border border-stone-200 hover:shadow-md hover:border-emerald-300 transition-all group"
                >
                  <h3 className="text-lg font-bold text-stone-900 group-hover:text-emerald-700 transition-colors mb-2">
                    {calc.title}
                  </h3>
                  <p className="text-stone-600 text-sm line-clamp-2">
                    {calc.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
