import Image from 'next/image';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ButtonLink, Section, SectionHead } from '@/components/ui';
import { PageHero } from '@/components/PageHero';
import { DumpsterSwitcher } from '@/components/DumpsterSwitcher';
import { site } from '@/lib/site';
import { poses } from '@/lib/poses';

export const metadata: Metadata = {
  title: 'Dumpster Rentals — 10, 20 & 30 Yard Roll-Offs',
  description:
    'Compare 10, 20 and 30 yard roll-off dumpsters for cleanouts, remodels and construction in greater Danbury, CT. Driveway protection and local delivery.',
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
        poseWidth="w-full max-w-[560px]"
      >
        <div className="flex flex-wrap gap-4">
          <ButtonLink href="/contact?service=dumpster" variant="amber">
            Request a container
          </ButtonLink>
          <ButtonLink href={site.phoneHref} variant="paper">
            {site.phone}
          </ButtonLink>
        </div>
      </PageHero>

      {/* The centerpiece */}
      <Section tone="page" labelledBy="compare-sizes" id="sizes">
        <SectionHead
          eyebrow="Side by side"
          title="Compare the three sizes"
          lede="Most jobs land on the twenty. If you are between two sizes, take the bigger one — a second haul costs more than the extra room."
          id="compare-sizes"
        />
        <div className="mt-10">
          <Suspense fallback={<div className="min-h-[480px]" />}>
            <DumpsterSwitcher />
          </Suspense>
        </div>
      </Section>

      {/* What goes in — the roll-off truck, not the curbside restriction art */}
      <Section tone="mint" labelledBy="what-fits">
        <div className="grid gap-8 md:grid-cols-2 md:items-center md:gap-12">
          <div className="flex flex-col gap-5">
            <SectionHead
              eyebrow="Load it up"
              title="Nearly everything goes in a roll-off"
              lede="Cleanouts, remodels, roofing, framing debris, furniture, flooring — a container takes it. A short list of materials belongs at a drop-off instead, and we will tell you which on the call."
              id="what-fits"
            />
            <div className="flex flex-wrap gap-4">
              <ButtonLink href="/resources#what-a-container-takes" variant="forest">
                See what goes elsewhere
              </ButtonLink>
              <ButtonLink href={site.phoneHref} variant="outline">
                Ask us — {site.phone}
              </ButtonLink>
            </div>
          </div>
          <Image
            src={poses.rollOffAction.src}
            alt={poses.rollOffAction.alt}
            width={poses.rollOffAction.width}
            height={poses.rollOffAction.height}
            sizes="(max-width: 1024px) 94vw, 640px"
            className="h-auto w-full"
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
              lede="A loaded roll-off is heavy, and asphalt in August is soft. Boards go down under the rollers before the container ever touches the surface."
              id="driveway"
            />
            <ul className="flex flex-col gap-2.5">
              {[
                'Plywood under the rollers on asphalt and pavers',
                'Tell us where you want it and we will walk it with you',
                'Clear about 60 feet of straight approach if you can',
                'Keep the load level with the top rail so we can tarp it',
              ].map((point) => (
                <li key={point} className="flex gap-3 text-[0.9375rem]">
                  <span aria-hidden="true" className="display shrink-0 text-forest">
                    ✓
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <Image
            src={poses.drivewayProtection.src}
            alt={poses.drivewayProtection.alt}
            width={poses.drivewayProtection.width}
            height={poses.drivewayProtection.height}
            sizes="(max-width: 1024px) 88vw, 540px"
            className="h-auto w-full max-w-[540px] justify-self-center"
          />
        </div>
      </Section>

      {/* Hand off to the one form on the site rather than repeating it here */}
      <Section tone="mint" labelledBy="request-heading" id="request">
        <div className="grid gap-8 md:grid-cols-2 md:items-center md:gap-12">
          <div className="flex flex-col gap-6">
            <SectionHead
              eyebrow="Request a container"
              title="Tell us the job"
              lede="Send the address and what you are clearing out, and someone from the office calls back with a price and a delivery day."
              id="request-heading"
            />
            <div className="flex flex-wrap gap-4">
              <ButtonLink href="/contact?service=dumpster" variant="forest">
                Request a container
              </ButtonLink>
              <ButtonLink href={site.phoneHref} variant="outline">
                {site.phone}
              </ButtonLink>
            </div>
            <p className="text-[0.9375rem] text-ink/75">{site.hours.weekdays}</p>
          </div>
          <Image
            src={poses.quote.src}
            alt={poses.quote.alt}
            width={poses.quote.width}
            height={poses.quote.height}
            sizes="(max-width: 1024px) 60vw, 360px"
            className="h-auto w-full max-w-[360px] justify-self-center"
          />
        </div>
      </Section>
    </>
  );
}
