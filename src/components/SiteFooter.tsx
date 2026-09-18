import Image from 'next/image';
import Link from 'next/link';
import { BEAVER_NAME, nav, site, towns } from '@/lib/site';
import { poses } from '@/lib/poses';

const socials = [
  { label: 'Facebook', href: site.social.facebook },
  { label: 'Instagram', href: site.social.instagram },
  { label: 'X', href: site.social.x },
];

export function SiteFooter() {
  return (
    <footer className="on-forest bg-ink text-mint">
      <div className="wrap grid gap-8 py-10 sm:grid-cols-2 md:grid-cols-[1.2fr_1fr_1fr_1.1fr] md:gap-8 md:py-12">
        <div className="flex flex-col gap-3">
          <div className="display flex flex-col gap-1 leading-none text-paper">
            <span className="text-[1.5rem] normal-case tracking-[0.05em]">LoStocco</span>
            <span className="text-[0.875rem] text-amber">Refuse Service</span>
          </div>
          <p className="max-w-[34ch] text-[0.9375rem] text-mint/85">
            Family-owned trash, recycling and dumpster rental out of Danbury, Connecticut. Four
            decades on these roads.
          </p>
          <p className="display text-[0.875rem] text-amber">{site.credential}</p>
        </div>

        <nav aria-label="Footer" className="flex flex-col gap-3">
          <h2 className="display text-[0.875rem] text-paper">Pages</h2>
          <ul className="flex flex-col gap-0.5">
            <li>
              <Link
                href="/"
                className="inline-flex min-h-[36px] items-center text-[0.9375rem] text-mint/85 hover:text-amber"
              >
                Home
              </Link>
            </li>
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-[36px] items-center text-[0.9375rem] text-mint/85 hover:text-amber"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-3">
          <h2 className="display text-[0.875rem] text-paper">Towns</h2>
          <ul className="flex flex-col gap-0.5">
            {towns.map((town) => (
              <li key={town.slug}>
                <Link
                  href={`/service-area?town=${town.slug}`}
                  className="inline-flex min-h-[36px] items-center text-[0.9375rem] text-mint/85 hover:text-amber"
                >
                  {town.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="display text-[0.875rem] text-paper">Get in touch</h2>
          <address className="flex flex-col gap-2 text-[0.9375rem] not-italic text-mint/85">
            <a
              href={site.phoneHref}
              className="display inline-flex min-h-[44px] items-center text-base text-amber"
            >
              {site.phone}
            </a>
            <a
              href={site.emailHref}
              className="inline-flex min-h-[44px] items-center break-words hover:text-amber"
            >
              {site.email}
            </a>
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center py-1 hover:text-amber"
            >
              {site.address.street}
              <br />
              {site.address.city}, {site.address.state} {site.address.zip}
            </a>
          </address>
          <div className="text-[0.9375rem] text-mint/85">
            <p>{site.hours.weekdays}</p>
            <p>{site.hours.weekend}</p>
          </div>
          <ul className="flex flex-wrap gap-2">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="display inline-flex min-h-[44px] items-center rounded-full border-[2.5px] border-mint/40 px-4 text-[0.875rem] text-mint hover:border-amber hover:text-amber"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t-[3px] border-mint/20">
        <div className="wrap flex flex-col items-center gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-end gap-4">
            <Image
              src={poses.signoff.src}
              alt={poses.signoff.alt}
              width={poses.signoff.width}
              height={poses.signoff.height}
              sizes="80px"
              className="h-auto w-[64px] shrink-0 xs:w-[80px]"
            />
            <p className="max-w-[30ch] pb-2 text-[0.9375rem] text-mint/85">
              <span className="display text-amber">{BEAVER_NAME}</span> says: carts out the night
              before, two feet apart. See you next week.
            </p>
          </div>
          <div className="flex flex-col gap-2 text-center text-[0.875rem] text-mint/70 sm:text-right">
            <p>
              © {new Date().getFullYear()} {site.legalName}. All rights reserved.
            </p>
            <p>{site.address.full}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
