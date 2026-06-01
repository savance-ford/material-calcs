import { Metadata } from 'next';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: `Terms of Use | ${siteConfig.siteName}`,
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto py-12">
      <h1 className="text-4xl font-extrabold text-stone-900 mb-6">Terms of Use</h1>
      <div className="prose prose-stone max-w-none text-stone-700">
        <p>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
        
        <h2>1. Acceptance of Terms</h2>
        <p>By accessing and using {siteConfig.siteName} ({siteConfig.siteUrl}), you agree to be bound by these Terms of Use.</p>
        
        <h2>2. Use of Calculators</h2>
        <p>The calculators and estimation tools provided on this site are for informational and educational purposes only. They are designed to provide rough estimates based on standard mathematical formulas.</p>
        
        <h2>3. No Professional Advice</h2>
        <p>We are not licensed engineers, architects, or contractors. The information provided does not constitute professional advice. You should always consult with a qualified professional before beginning any construction or hardscaping project.</p>
        
        <h2>4. Limitation of Liability</h2>
        <p>We shall not be held liable for any material shortages, overages, structural failures, damages, or financial losses resulting from the use of our calculators. You use these tools entirely at your own risk.</p>
        
        <h2>5. Modifications</h2>
        <p>We reserve the right to modify these terms or the functionality of calculators at any time without prior notice.</p>
      </div>
    </div>
  );
}
