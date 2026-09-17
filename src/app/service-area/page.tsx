import Image from 'next/image';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ButtonLink, Section, SectionHead } from '@/components/ui';
import { PageHero } from '@/components/PageHero';
import { ServiceAreaMapSection } from '@/components/ServiceAreaMapSection';
import { AddressChecker } from '@/components/AddressChecker';
import { Marquee } from '@/components/Marquee';
import { resources, site, towns } from '@/lib/site';
import { poses } from '@/lib/poses';

export const metadata: Metadata = {
  title: 'Service Area — Danbury, Brookfield, Bethel, New Fairfield & Newtown',
  description:
    'LoStocco Refuse Service covers Danbury, Brookfield, Bethel, New Fairfield and Newtown, Connecticut, plus nearby areas. Check whether your address is on a route.',
  alternates: { canonical: '/service-area' },
};

const newtownCalendar = resources.find((r) => r.title.includes('Newtown'))!;

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
        <div className="mt-10">
          <Suspense fallback={<div className="min-h-[480px]" />}>
            <ServiceAreaMapSection />
          </Suspense>
        </div>
      </Section>

      {/* Town detail list — the same facts, readable without JavaScript */}
      <Section tone="mint" labelledBy="all-towns">
        <SectionHead eyebrow="Town by town" title="All five, in writing" id="all-towns" />
        <ul className="mt-10 grid gap-5 xs:grid-cols-2 md:grid-cols-3">
          {towns.map((town) => (
            <li key={town.slug} className="card card-lift flex flex-col gap-4 p-6">
              <h3 className="display text-cardhead text-forest">{town.name}, CT</h3>
              <p className="text-[0.9375rem] text-ink/80">{town.blurb}</p>
              <dl className="mt-auto flex flex-col gap-2 border-t-[3px] border-ink/15 pt-4 text-[0.875rem]">
                <div className="flex gap-2">
                  <dt className="display text-[0.875rem] text-forest">Trash</dt>
                  <dd>{town.trash}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="display text-[0.875rem] text-forest">Recycling</dt>
                  <dd>{town.recycling}</dd>
                </div>
              </dl>
              {town.note ? (
                <p className="rounded-[12px] border-[2.5px] border-warning bg-paper px-3 py-2 text-[0.875rem]">
                  {town.note}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      </Section>

      {/* Newtown flag */}
      <Section tone="page" labelledBy="newtown-calendar">
        <div className="grid gap-8 md:grid-cols-[auto_1fr] md:items-center md:gap-12">
          <Image
            src={poses.calendar.src}
            alt={poses.calendar.alt}
            width={poses.calendar.width}
            height={poses.calendar.height}
            sizes="(max-width: 1024px) 50vw, 240px"
            className="h-auto w-[180px] justify-self-center xs:w-[230px]"
          />
          <div className="flex flex-col gap-5">
            <SectionHead
              eyebrow="Newtown only"
              title="Newtown has its own recycling calendar"
              lede="Newtown’s recycling weeks do not line up with Danbury, Brookfield, Bethel or New Fairfield. Using the general calendar there will put your cart out on the wrong week."
              id="newtown-calendar"
            />
            <div className="flex flex-wrap gap-4">
              <ButtonLink href={newtownCalendar.href} variant="forest">
                Newtown calendar (PDF)
              </ButtonLink>
              <ButtonLink href="/resources" variant="outline">
                All calendars
              </ButtonLink>
            </div>
          </div>
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
