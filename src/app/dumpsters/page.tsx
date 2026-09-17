import Image from 'next/image';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ButtonLink, Placeholder, PhotoFrame, Section, SectionHead } from '@/components/ui';
import { PageHero } from '@/components/PageHero';
import { Breadcrumb } from '@/components/Breadcrumb';
import { DumpsterSwitcher } from '@/components/DumpsterSwitcher';
import { ContactForm } from '@/components/ContactForm';
import { site } from '@/lib/site';
import { poses } from '@/lib/poses';

export const metadata: Metadata = {
  title: 'Dumpster Rentals — 10, 20 & 30 Yard Roll-Offs',
  description:
    'Compare 10, 20 and 30 yard roll-off dumpsters for cleanouts, remodels and construction in greater Danbury, CT. Driveway protection, straightforward pricing, local delivery.',
  alternates: { canonical: '/dumpsters' },
};

export default function DumpstersPage() {
  return (
    <>
      <PageHero
        eyebrow="Dumpster rentals"
        title="Pick a size, we bring it"
        lede="Ten, twenty or thirty yards. We deliver it where you want it, protect the driveway, and pull it when you are done."
        pose="measuring"
      >
        <div className="flex flex-wrap gap-4">
          <ButtonLink href="#request" variant="amber">
            Request a container
          </ButtonLink>
          <ButtonLink href={site.phoneHref} variant="paper">
            {site.phone}
          </ButtonLink>
        </div>
      </PageHero>

      <Breadcrumb label="Dumpsters" />

      {/* The centerpiece */}
      <Section tone="page" labelledBy="compare-sizes" id="sizes">
        <SectionHead
          eyebrow="Side by side"
          title="Compare the three sizes"
          lede="Most jobs land on the twenty. If you are between two sizes, take the bigger one — a second haul costs more than the extra capacity."
          id="compare-sizes"
        />
        <div className="mt-10">
          <Suspense fallback={<div className="min-h-[480px]" />}>
            <DumpsterSwitcher />
          </Suspense>
        </div>
      </Section>

      {/* One quiet pointer; the full list lives on the services page */}
      <Section tone="mint" labelledBy="what-fits">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center md:gap-12">
          <div className="flex flex-col gap-5">
            <SectionHead
              eyebrow="Load it up"
              title="Almost everything goes in"
              lede="Cleanouts, remodels, roofing, framing debris, furniture, flooring — a roll-off takes it. A short list of materials belongs at a drop-off instead, and we will tell you which on the call."
              id="what-fits"
            />
            <div className="flex flex-wrap gap-4">
              <ButtonLink href="/services#restrictions" variant="forest">
                See what goes elsewhere
              </ButtonLink>
              <ButtonLink href={site.phoneHref} variant="outline">
                Ask us — {site.phone}
              </ButtonLink>
            </div>
          </div>
          <Image
            src={poses.keepOut.src}
            alt={poses.keepOut.alt}
            width={poses.keepOut.width}
            height={poses.keepOut.height}
            sizes="(max-width: 1024px) 70vw, 320px"
            className="h-auto w-full max-w-[320px] justify-self-center"
          />
        </div>
      </Section>

      {/* Driveway protection */}
      <Section tone="page" labelledBy="driveway">
        <div className="grid gap-8 md:grid-cols-2 md:items-center md:gap-12">
          <div className="flex flex-col gap-5">
            <SectionHead
              eyebrow="On delivery"
              title="We protect your driveway"
              lede="A loaded roll-off is heavy, and asphalt in August is soft. We put boards down under the rails before the container comes off the truck."
              id="driveway"
            />
            <ul className="flex flex-col gap-2.5">
              <li className="flex gap-3 text-[0.9375rem]">
                <span aria-hidden="true" className="display shrink-0 text-forest">
                  ✓
                </span>
                Boards under the container on asphalt and pavers
              </li>
              <li className="flex gap-3 text-[0.9375rem]">
                <span aria-hidden="true" className="display shrink-0 text-forest">
                  ✓
                </span>
                Tell us where you want it and we will walk it with you
              </li>
              <li className="flex gap-3 text-[0.9375rem]">
                <span aria-hidden="true" className="display shrink-0 text-forest">
                  ✓
                </span>
                Clear about 60 feet of straight approach if you can
              </li>
              <li className="flex gap-3 text-[0.9375rem]">
                <span aria-hidden="true" className="display shrink-0 text-forest">
                  ✓
                </span>
                Keep the load level with the top rail so we can tarp it
              </li>
            </ul>
            <div className="flex flex-col gap-3">
              <p className="display text-[0.875rem] text-forest">Rental period &amp; pricing</p>
              <Placeholder label="rental period, daily rate and tonnage allowance" />
            </div>
          </div>
          <div className="grid gap-5">
            <PhotoFrame label="roll-off delivery, boards down" />
            <PhotoFrame label="container on a driveway" />
          </div>
        </div>
      </Section>

      {/* Request form */}
      <Section tone="mint" labelledBy="request-heading" id="request">
        <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-start md:gap-12">
          <div className="flex flex-col gap-6">
            <SectionHead
              eyebrow="Request a container"
              title="Tell us the job"
              lede="Send this over and someone from the office calls back with a price and a delivery day. Business hours only — we do not have an online checkout."
              id="request-heading"
            />
            <Image
              src={poses.quote.src}
              alt={poses.quote.alt}
              width={poses.quote.width}
              height={poses.quote.height}
              sizes="(max-width: 1024px) 50vw, 240px"
              className="h-auto w-[180px] xs:w-[230px]"
            />
            <div className="card flex flex-col gap-2 bg-paper p-5">
              <p className="display text-[0.875rem] text-forest">Rather call?</p>
              <a href={site.phoneHref} className="display text-subsection text-forest">
                {site.phone}
              </a>
              <p className="text-[0.875rem] text-ink/75">{site.hours.weekdays}</p>
            </div>
          </div>
          <Suspense fallback={<div className="min-h-[600px]" />}>
            <ContactForm />
          </Suspense>
        </div>
      </Section>
    </>
  );
}
