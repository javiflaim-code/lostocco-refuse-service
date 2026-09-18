import Image from 'next/image';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ButtonLink, Section, SectionHead } from '@/components/ui';
import { PageHero } from '@/components/PageHero';
import { ServiceAreaMapSection } from '@/components/ServiceAreaMapSection';
import { AddressChecker } from '@/components/AddressChecker';
import { Marquee } from '@/components/Marquee';
import { site, towns } from '@/lib/site';
import { poses } from '@/lib/poses';

export const metadata: Metadata = {
  title: 'Service Area — Danbury, Brookfield, Bethel, New Fairfield & Newtown',
  description:
    'LoStocco Refuse Service covers Danbury, Brookfield, Bethel, New Fairfield and Newtown, Connecticut, plus nearby areas. Check whether your address is on a route.',
  alternates: { canonical: '/service-area' },
};

export default function ServiceAreaPage() {
  return (
    <>
      <PageHero
        eyebrow="Service area"
        title="Five towns, one yard"
        lede="We run out of Beaver Brook Road in Danbury, which keeps our routes tight and our response times short. Pick your town below."
        pose="map"
      >
        <div className="flex flex-wrap gap-4">
          <ButtonLink href="#check" variant="amber">
            Check my address
          </ButtonLink>
          <ButtonLink href={site.phoneHref} variant="paper">
            {site.phone}
          </ButtonLink>
        </div>
      </PageHero>

      <Marquee items={towns.map((town) => `${town.name}, CT`)} />

      {/* Interactive map */}
      <Section tone="page" labelledBy="pick-a-town">
        <SectionHead
          eyebrow="Pick a town"
          title="How each town runs"
          lede="Trash is weekly everywhere. Recycling is bi-weekly everywhere — but Newtown is on its own calendar."
          id="pick-a-town"
        />
        <div className="mt-8 flex items-center gap-4">
          <Image
            src={poses.cuePoint.src}
            alt=""
            width={poses.cuePoint.width}
            height={poses.cuePoint.height}
            sizes="90px"
            aria-hidden="true"
            className="h-auto w-[72px] shrink-0 xs:w-[90px]"
          />
          <p className="display text-[1.0625rem] text-forest">
            Click your town to see how service runs there
          </p>
        </div>
        <div className="mt-6">
          <Suspense fallback={<div className="min-h-[480px]" />}>
            <ServiceAreaMapSection />
          </Suspense>
        </div>
      </Section>

      {/* Address checker */}
      <Section tone="mint" labelledBy="check-heading" id="check">
        <div className="grid gap-8 md:grid-cols-2 md:items-start md:gap-12">
          <div className="flex flex-col gap-5">
            <SectionHead
              eyebrow="Not sure?"
              title="Check your address"
              lede="Type in your street and town. If you are outside the five, we still might reach you — a lot of nearby streets are on our routes already."
              id="check-heading"
            />
            <Image
              src={poses.standing.src}
              alt={poses.standing.alt}
              width={poses.standing.width}
              height={poses.standing.height}
              sizes="(max-width: 1024px) 45vw, 200px"
              className="h-auto w-[150px] xs:w-[190px]"
            />
          </div>
          <AddressChecker />
        </div>
      </Section>
    </>
  );
}
