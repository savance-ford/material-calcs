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
          The calculators on <strong>{siteConfig.siteName}</strong> are designed to provide estimated quantities of materials for common home improvement, landscaping, hardscaping, and small jobsite projects. They are written to be simple enough for homeowners and weekend DIYers, but they can also help contractors, landscapers, and small crews make quick material estimates before buying materials, quoting a job, or checking measurements in the field.
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
          <li>Supplier measurement, density, and bag yield differences</li>
          <li>Local building codes and requirements</li>
        </ul>

        <h2>Recommendation</h2>
        <p>
          Verify all measurements independently and confirm required quantities with your material supplier, contractor, project plans, product labels, or local requirements before purchasing or quoting work. A 5% to 15% buffer is often used for waste and cuts, but the right amount depends on the project.
        </p>
      </div>
    </div>
  );
}
