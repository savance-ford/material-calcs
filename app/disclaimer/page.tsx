import { Metadata } from 'next';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: `Disclaimer | ${siteConfig.siteName}`,
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-3xl mx-auto py-12">
      <h1 className="text-4xl font-extrabold text-stone-900 mb-6">Disclaimer</h1>
      <div className="bg-stone-50 p-8 rounded-2xl border border-stone-200 text-stone-700 prose prose-stone max-w-none">
        <h2>Estimations Only</h2>
        <p>
          The calculators on <strong>{siteConfig.siteName}</strong> are designed to provide estimated quantities of materials needed for common DIY projects. These estimates are generated based on mathematical formulas, typical industry standards, and specified user inputs.
        </p>
        <p>
          <strong>These results are NOT professional engineering plans or guarantees.</strong>
        </p>

        <h2>Sources of Variability</h2>
        <p>
          Actual material requirements often vary from calculated estimates due to numerous factors, including but not limited to:
        </p>
        <ul>
          <li>Uneven subgrades or terrain variations</li>
          <li>Material compaction rates (e.g., gravel, sand, soil)</li>
          <li>Spillage and waste during installation</li>
          <li>Cutting requirements, breakage, or defective materials</li>
          <li>Variations in product dimensions from different manufacturers</li>
          <li>Local building codes and requirements</li>
        </ul>

        <h2>Recommendation</h2>
        <p>
          We strongly advise users to verify all measurements independently and confirm required quantities with their material supplier or a licensed contractor before purchasing. It is generally recommended to order an additional 5% to 15% of materials to account for waste and cuts.
        </p>
      </div>
    </div>
  );
}
