import type { Metadata } from 'next';
import { Anton, Public_Sans } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { LocalBusinessJsonLd } from '@/components/LocalBusinessJsonLd';
import { site, siteUrl } from '@/lib/site';
import './globals.css';

const display = Anton({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
  display: 'swap',
});

const body = Public_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'LoStocco Refuse Service — Trash, Recycling & Dumpsters in Danbury, CT',
    template: '%s | LoStocco Refuse Service',
  },
  description:
    'Family-owned trash pickup, recycling and 10, 20 and 30 yard dumpster rentals in Danbury, Brookfield, Bethel, New Fairfield and Newtown, Connecticut. HRRA licensed hauler.',
  openGraph: {
    type: 'website',
    siteName: site.shortName,
    locale: 'en_US',
    url: siteUrl,
    title: 'LoStocco Refuse Service — Trash, Recycling & Dumpsters in Danbury, CT',
    description:
      'Family-owned trash pickup, recycling and dumpster rentals across greater Danbury, Connecticut.',
    images: [
      { url: '/poses/beaver-waving-with-cart.png', width: 467, height: 700, alt: site.shortName },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@LostoccoRefuse',
  },
  alternates: { canonical: '/' },
  icons: { icon: '/favicon.svg' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <a
          href="#main"
          className="display sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:inline-flex focus:min-h-[48px] focus:items-center focus:rounded-full focus:border-[3px] focus:border-ink focus:bg-amber focus:px-6 focus:text-ink"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <LocalBusinessJsonLd />
        <Analytics />
      </body>
    </html>
  );
}
