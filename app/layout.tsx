import type {Metadata} from 'next';
import './globals.css';
import Link from 'next/link';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: siteConfig.siteName,
  description: siteConfig.description,
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className="bg-stone-50 text-stone-900 font-sans flex flex-col min-h-screen" suppressHydrationWarning>
        <div className="flex flex-col min-h-screen w-full">
          {/* Top Navigation */}
          <nav className="h-16 bg-white border-b border-stone-200 flex items-center justify-between px-4 sm:px-8 shrink-0 sticky top-0 z-10 w-full shadow-sm">
            <div className="flex items-center gap-2">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="w-9 h-9 bg-emerald-700 rounded-lg flex items-center justify-center text-white font-bold shadow-md shadow-emerald-200 group-hover:bg-emerald-600 transition-colors">C</div>
                <span className="text-xl font-bold tracking-tight text-stone-800">CalcPro <span className="text-emerald-700 italic">DIY</span></span>
              </Link>
            </div>
            <div className="hidden md:flex gap-8 text-sm font-semibold text-stone-500">
              <Link href="/calculators" className="text-stone-900 border-b-2 border-emerald-700 pb-1">Calculators</Link>
              <Link href="/about" className="hover:text-emerald-700 transition-colors">About Us</Link>
              <Link href="/contact" className="hover:text-emerald-700 transition-colors">Contact</Link>
            </div>
            
            {/* Mobile Nav Toggle / Placeholder */}
            <div className="md:hidden">
              <Link href="/about" className="text-sm font-semibold text-stone-600 hover:text-emerald-700">About</Link>
            </div>
          </nav>

          <div className="flex flex-1 w-full flex-col">
            {/* Main Content Area */}
            <main className="flex-1 w-full p-4 sm:p-8 lg:p-12 mb-auto">
              <div className="max-w-7xl mx-auto w-full">
                {children}
              </div>
            </main>

            {/* Simple Footer */}
            <footer className="bg-stone-100 border-t border-stone-200 py-12 px-4 sm:px-8 mt-12 w-full">
              <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 bg-emerald-700 rounded flex items-center justify-center text-white text-xs font-bold">C</div>
                    <span className="font-bold tracking-tight text-stone-800">CalcPro DIY</span>
                  </div>
                  <p className="text-sm text-stone-500 max-w-xs text-center md:text-left">
                    {siteConfig.description}
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-6 text-sm text-stone-500 font-medium">
                  <Link href="/about" className="hover:text-emerald-700">About Us</Link>
                  <Link href="/contact" className="hover:text-emerald-700">Contact</Link>
                  <Link href="/privacy" className="hover:text-emerald-700">Privacy Policy</Link>
                  <Link href="/terms" className="hover:text-emerald-700">Terms of Use</Link>
                  <Link href="/disclaimer" className="hover:text-emerald-700">Disclaimer</Link>
                </div>
              </div>
              <div className="max-w-5xl mx-auto mt-8 pt-8 border-t border-stone-200 text-center text-xs text-stone-400">
                &copy; {new Date().getFullYear()} {siteConfig.siteName}. All calculations are estimates.
              </div>
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}
