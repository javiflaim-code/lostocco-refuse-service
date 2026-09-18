import Image from 'next/image';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ButtonLink, Section, SectionHead } from '@/components/ui';
import { PageHero } from '@/components/PageHero';
import { ContactForm } from '@/components/ContactForm';
import { site, towns } from '@/lib/site';
import { poses } from '@/lib/poses';

export const metadata: Metadata = {
  title: 'Contact & Start Service',
  description:
    'Start trash service, rent a dumpster or ask a billing question. Call 203-743-9940, email us, or send the form — LoStocco Refuse Service, 79 Beaver Brook Road, Danbury, CT.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let’s get you started"
        lede="Tell us what you need and where, and someone from the office calls you back with a price and a pickup day. No online checkout, no bots."
        pose="quote"
        poseWidth="w-full max-w-[390px]"
      >
        <div className="flex flex-wrap gap-4">
          <ButtonLink href={site.phoneHref} variant="amber">
            Call {site.phone}
          </ButtonLink>
          <ButtonLink href={site.emailHref} variant="paper">
            Email us
          </ButtonLink>
        </div>
      </PageHero>

      {/* Form + details */}
      <Section tone="page" labelledBy="form-heading">
        <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-stretch md:gap-12">
          <div>
            <SectionHead
              eyebrow="Send a request"
              title="Start service"
              lede="Everything marked here is what the office needs to give you a real answer on the first call back."
              id="form-heading"
            />
            <div className="mt-8">
              <Suspense fallback={<div className="min-h-[640px]" />}>
                <ContactForm />
              </Suspense>
            </div>
          </div>

          <div className="flex flex-col gap-5 md:justify-end">
            <Image
              src={poses.portrait.src}
              alt={poses.portrait.alt}
              width={poses.portrait.width}
              height={poses.portrait.height}
              sizes="(max-width: 1024px) 34vw, 150px"
              className="h-auto w-[110px] self-center xs:w-[140px]"
            />
            <div className="card flex flex-col gap-4 bg-mint p-6 xs:p-8">
              <h2 className="display text-subsection text-forest">Office</h2>
              <address className="flex flex-col gap-3 not-italic">
                <a
                  href={site.phoneHref}
                  className="display inline-flex min-h-[44px] items-center text-[1.75rem] leading-none text-forest"
                >
                  {site.phone}
                </a>
                <a
                  href={site.emailHref}
                  className="inline-flex min-h-[44px] items-center break-words text-[0.9375rem] font-semibold text-forest underline underline-offset-4"
                >
                  {site.email}
                </a>
                <a
                  href={site.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center py-1 text-[0.9375rem] hover:text-forest"
                >
                  {site.address.street}
                  <br />
                  {site.address.city}, {site.address.state} {site.address.zip}
                </a>
              </address>
              <div className="border-t-[3px] border-ink/15 pt-4 text-[0.9375rem]">
                <p className="display text-[0.875rem] text-forest">Hours</p>
                <p className="mt-1">{site.hours.weekdays}</p>
                <p>{site.hours.weekend}</p>
              </div>
            </div>

            <div className="card flex flex-col gap-3 p-6">
              <h2 className="display text-cardhead text-forest">Towns we serve</h2>
              <p className="text-[0.9375rem] text-ink/80">
                {towns.map((town) => town.name).join(' · ')}, plus nearby areas.
              </p>
              <ButtonLink href="/service-area" variant="outline" className="mt-2 self-start">
                Check your address
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>

      {/* Map */}
      <Section tone="mint" labelledBy="find-us">
        <SectionHead
          eyebrow="Find us"
          title="79 Beaver Brook Road"
          lede="The yard is in Danbury. Stop in during business hours if you would rather talk in person."
          id="find-us"
        />
        <div className="frame mt-10 bg-paper">
          <iframe
            src={site.mapsEmbedUrl}
            title={`Map showing ${site.legalName} at ${site.address.full}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block h-[320px] w-full border-0 sm:h-[420px]"
          />
        </div>
        <div className="mt-6">
          <ButtonLink href={site.mapsUrl} variant="forest">
            Open in Google Maps
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
