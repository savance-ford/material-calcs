import { Metadata } from 'next';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: `Contact Us | ${siteConfig.siteName}`,
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto py-12">
      <h1 className="text-4xl font-extrabold text-stone-900 mb-6">Contact Us</h1>
      <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm text-stone-700 leading-relaxed text-lg">
        <p className="mb-4">
          Have a question, feedback, or a suggestion for a new calculator? We&apos;d love to hear from you.
        </p>
        <p className="font-semibold text-stone-900 mb-2">
          Email us at:
        </p>
        <a href={`mailto:${siteConfig.contactEmail}`} className="text-emerald-700 hover:text-emerald-800 font-bold underline px-4 py-2 bg-emerald-50 rounded-lg inline-block">
          {siteConfig.contactEmail}
        </a>
        <p className="mt-8 text-sm text-stone-500">
          Please note: We are a small team, so it might take 24-48 hours for us to respond. We cannot provide professional engineering or structural advice.
        </p>
      </div>
    </div>
  );
}
