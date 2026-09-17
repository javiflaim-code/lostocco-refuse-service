import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ButtonLink } from '@/components/ui';
import { nav, site } from '@/lib/site';
import { poses } from '@/lib/poses';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'That page moved. Here are the links you are probably looking for.',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="on-forest band bg-forest" aria-labelledby="notfound-heading">
      <div className="wrap grid items-center gap-10 py-16 sm:py-20 md:grid-cols-[1fr_auto] md:gap-12">
        <div className="flex flex-col items-start gap-6">
          <p className="display inline-flex rounded-full border-[2.5px] border-amber px-4 py-1.5 text-[0.875rem] text-amber">
            404
          </p>
          <h1 id="notfound-heading" className="display display--hero text-section text-paper">
            That page moved
          </h1>
          <p className="max-w-[48ch] text-lede text-mint">
            It happens. Nothing was hauled away — the link is just out of date. Here is where
            everything lives now.
          </p>

          <nav aria-label="Main pages">
            <ul className="flex flex-wrap gap-3">
              <li>
                <Link
                  href="/"
                  className="display inline-flex min-h-[44px] items-center rounded-full border-[2.5px] border-mint/40 px-5 text-[0.875rem] text-mint hover:border-amber hover:text-amber"
                >
                  Home
                </Link>
              </li>
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="display inline-flex min-h-[44px] items-center rounded-full border-[2.5px] border-mint/40 px-5 text-[0.875rem] text-mint hover:border-amber hover:text-amber"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-wrap gap-4 pt-2">
            <ButtonLink href="/contact" variant="amber">
              Start Service
            </ButtonLink>
            <ButtonLink href={site.phoneHref} variant="paper">
              {site.phone}
            </ButtonLink>
          </div>
        </div>

        <Image
          src={poses.threePoses.src}
          alt={poses.threePoses.alt}
          width={poses.threePoses.width}
          height={poses.threePoses.height}
          priority
          sizes="(max-width: 1024px) 88vw, 440px"
          className="h-auto w-full max-w-[440px] justify-self-center"
        />
      </div>
    </section>
  );
}
