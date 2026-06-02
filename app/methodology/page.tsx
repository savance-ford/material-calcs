import { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: `Methodology | ${siteConfig.siteName}`,
  description: 'How DIY Material Calculator estimates concrete, mulch, gravel, soil, paver base, and other common project materials.',
  alternates: {
    canonical: `${siteConfig.siteUrl}/methodology`,
  },
};

const sections = [
  {
    title: 'How Our Calculators Work',
    body: 'Each calculator starts with the shape or project type, converts your measurements into a volume or count, then applies common DIY assumptions such as waste factor, bag yield, density, or settling where that material requires it.',
  },
  {
    title: 'Volume Formulas',
    body: 'Most material estimates use simple geometry: length times width times depth for rectangular areas, pi times radius squared times height for round forms, and project-specific piece counts for blocks, caps, posts, or bags.',
  },
  {
    title: 'Cubic Feet To Cubic Yards',
    body: 'Bulk materials are often sold by the cubic yard. The calculators convert cubic feet to cubic yards by dividing by 27, because one cubic yard contains 27 cubic feet.',
  },
  {
    title: 'Bag Yield Assumptions',
    body: 'Bagged concrete and soil products vary by manufacturer. Where bag estimates are shown, the calculator uses typical published-style yield assumptions and reminds you to confirm the yield printed on the bag you plan to buy.',
  },
  {
    title: 'Density Assumptions',
    body: 'Materials such as gravel, crushed stone, sand, and paver base can be sold by ton. Density changes with rock type, gradation, moisture, and supplier, so tonnage estimates are practical planning numbers rather than exact weights.',
  },
  {
    title: 'Waste Factor Assumptions',
    body: 'Waste factor helps account for cuts, spills, uneven ground, compaction, settling, imperfect forms, and small measuring errors. Many DIY projects use 5% to 15% depending on the material and how forgiving the job is.',
  },
  {
    title: 'Why Results Are Estimates',
    body: 'A calculator can only estimate from the measurements entered. Real projects change because soil is uneven, materials compact, bags vary, forms shift, and local conditions matter. Always compare the result with supplier guidance before purchasing.',
  },
  {
    title: 'When To Call A Professional',
    body: 'Call a qualified professional for structural concrete, load-bearing work, retaining walls, drainage problems, projects requiring permits, heavy vehicle loads, frost-depth footings, or any job where failure could damage property or injure someone.',
  },
  {
    title: 'How Calculators Are Reviewed',
    body: 'Calculator pages are reviewed for plain-language instructions, formula clarity, unit conversions, assumptions, and warnings. When formulas or assumptions are changed, related tests should continue to confirm the expected outputs.',
  },
];

export default function MethodologyPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-10">
        <p className="text-sm font-bold uppercase tracking-widest text-emerald-700 mb-3">Methodology</p>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-stone-950 tracking-tight mb-4">
          How DIY Material Calculator Builds Estimates
        </h1>
        <p className="text-lg sm:text-xl leading-relaxed text-stone-700">
          Our goal is to make material planning clear enough for a homeowner at the store, while still showing the formulas and assumptions behind each estimate.
        </p>
      </header>

      <div className="space-y-5">
        {sections.map((section) => (
          <section key={section.title} className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-stone-950 mb-3">{section.title}</h2>
            <p className="leading-relaxed text-stone-700">{section.body}</p>
          </section>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-emerald-100 bg-emerald-50 p-6">
        <h2 className="text-xl font-bold text-stone-950 mb-2">Use the calculators as planning tools</h2>
        <p className="leading-relaxed text-stone-700 mb-4">
          They are meant to help you estimate what to buy, not replace building code, engineering review, manufacturer instructions, or supplier recommendations.
        </p>
        <Link href="/calculators" className="font-bold text-emerald-800 hover:text-emerald-900">
          Browse material calculators
        </Link>
      </div>
    </div>
  );
}
