import { Metadata } from 'next';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: `Privacy Policy | ${siteConfig.siteName}`,
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto py-12">
      <h1 className="text-4xl font-extrabold text-stone-900 mb-6">Privacy Policy</h1>
      <div className="prose prose-stone max-w-none text-stone-700">
        <p>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
        
        <h2>1. Introduction</h2>
        <p>Welcome to {siteConfig.siteName}. We respect your privacy and are committed to protecting it. This Privacy Policy outlines how we handle data when you visit our website at {siteConfig.siteUrl}.</p>
        
        <h2>2. Data Collection</h2>
        <p>Our calculators process inputs directly in your browser. We do not store, save, or transmit your individual calculator inputs to our servers. Your data stays on your device.</p>
        
        <h2>3. Analytics and Cookies</h2>
        <p>We may use standard analytics tools (like Google Analytics) to understand aggregated traffic patterns, which helps us improve our calculators. These tools may use cookies. We do not track individual users across the internet.</p>
        
        <h2>4. Third-Party Links</h2>
        <p>Our website may link to third-party resources for reference. If you click on an external link, that third party may collect data about your visit according to its own privacy policy.</p>
        
        <h2>5. Contact</h2>
        <p>If you have any questions about this Privacy Policy, please contact us at {siteConfig.contactEmail}.</p>
      </div>
    </div>
  );
}
