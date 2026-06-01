import { calculators } from '@/lib/calculator-configs';
import Link from 'next/link';

export default function Home() {
  const categories = Array.from(new Set(calculators.map(c => c.category)));

  return (
    <div className="max-w-5xl mx-auto">
      <header className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-stone-900 mb-4 tracking-tight">
          DIY Material Calculators
        </h1>
        <p className="text-stone-600 max-w-2xl text-lg sm:text-xl">
          Free, accurate estimation tools for your next concrete, landscaping, or hardscaping project.
        </p>
      </header>

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
    </div>
  );
}
