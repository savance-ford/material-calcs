# CalcPro DIY

CalcPro DIY is a Next.js + TypeScript utility site for DIY material calculators. The MVP includes concrete, landscaping, and hardscaping calculators with local TypeScript config files, reusable calculator UI, static calculator routes, SEO metadata, sitemap, robots.txt, and unit-tested formula helpers.

## Tech stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Vitest
- Local calculator configs
- Vercel-ready static routes

## Getting started

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

## Useful scripts

```bash
npm run lint
npx vitest run
npm run build
```

## Environment variables

Create `.env.local` when you are ready to deploy or test canonical URLs locally:

```bash
NEXT_PUBLIC_SITE_URL=https://www.calcprodiy.com
```

Replace the URL with your real production domain before submitting the sitemap to Google Search Console.

## Calculator structure

- Calculator page route: `app/calculators/[slug]/page.tsx`
- Calculator registry/configs: `lib/calculator-configs.ts`
- Formula helpers and tests: `lib/formulas/`
- Interactive calculator UI: `components/calculator-engine.tsx`

To add a calculator, add its formula helper/test, add a config entry to `lib/calculator-configs.ts`, and include related calculator links where appropriate.

## Launch checklist

Before launch:

1. Set `NEXT_PUBLIC_SITE_URL` to the final domain in Vercel.
2. Run `npm run lint`.
3. Run `npx vitest run`.
4. Run `npm run build`.
5. Confirm `/sitemap.xml` and `/robots.txt` use the final domain.
6. Submit the sitemap in Google Search Console.

All calculator results are estimates and should not be treated as engineering, code, or professional construction advice.
