import Image from 'next/image';
import type { Metadata } from 'next';
import { ButtonLink, Section, SectionHead } from '@/components/ui';
import { PageHero } from '@/components/PageHero';
import { CurbsideReminders, KeepItOutGrid, ResourceCards } from '@/components/content';
import {
  keepOut,
  referenceResources,
  scheduleResources,
  site,
  unacceptableItemsUrl,
} from '@/lib/site';
import { poses } from '@/lib/poses';

export const metadata: Metadata = {
  title: 'Resources — Schedules, Calendars & What Goes Where',
  description:
    'Holiday schedule, 2026 recycling calendars including Newtown, the HRRA brochure, hazardous waste drop-off days, curbside reminders and the full unacceptable-items list.',
  alternates: { canonical: '/resources' },
};

/** The same restrictions as the PDF, readable here in plain HTML. */
/** Materials that belong at a drop-off rather than in a roll-off container. */
const handledElsewhere = [
  'Paint — wet or dried, cans included',
  'Chemicals, solvents and pool supplies',
  'Tires, on or off the rim',
  'Electronics — TVs, monitors, computers',
  'Appliances containing refrigerant',
  'Propane tanks and car batteries',
];

const unacceptableDetail = [
  {
    group: 'Construction & demolition',
    items: [
      'Lumber and boards',
      'Drywall and plaster',
      'Concrete, brick and stone',
      'Roofing shingles',
    ],
  },
  {
    group: 'Household hazardous waste',
    items: [
      'Paint, stain and thinner',
      'Motor oil and antifreeze',
      'Pesticides and pool chemicals',
      'Propane tanks',
    ],
  },
  {
    group: 'Electronics & metals',
    items: [
      'TVs, monitors and computers',
      'Car and marine batteries',
      'Scrap metal and pipe',
      'Appliances with refrigerant',
    ],
  },
  {
    group: 'Bulk & other',
    items: [
      'Broken furniture and mattresses',
      'Tires, on or off the rim',
      'Yard waste and brush',
      'Medical sharps',
    ],
  },
];

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Schedules and what goes where"
        lede="Every calendar, schedule and rule sheet in one place — plus the important parts written out here so you do not have to open a PDF to get an answer."
        pose="frontLoader"
        poseWidth="w-full max-w-[560px]"
      >
        <div className="flex flex-wrap gap-4">
          <ButtonLink href="#downloads" variant="amber">
            Downloads
          </ButtonLink>
          <ButtonLink href="#what-goes-where" variant="paper">
            What goes where
          </ButtonLink>
        </div>
      </PageHero>

      {/* Downloads */}
      <Section tone="page" labelledBy="downloads-heading" id="downloads">
        <SectionHead
          eyebrow="Calendars"
          title="Download a schedule"
          lede="The dated ones. These open in a new tab — and if you are in Newtown, use the Newtown calendar, not the general one."
          id="downloads-heading"
        />
        <div className="mt-10">
          <ResourceCards items={scheduleResources} columns={3} />
        </div>
      </Section>

      {/* Curbside reminders */}
      <Section tone="mint" labelledBy="reminders">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center md:gap-12">
          <div className="flex flex-col gap-6">
            <SectionHead
              eyebrow="Every week"
              title="Curbside reminders"
              lede="Three things that make the difference between a clean pickup and a cart left at the curb."
              id="reminders"
            />
            <CurbsideReminders tone="light" />
          </div>
          <Image
            src={poses.standing.src}
            alt={poses.standing.alt}
            width={poses.standing.width}
            height={poses.standing.height}
            sizes="(max-width: 1024px) 45vw, 220px"
            className="h-auto w-[160px] justify-self-center xs:w-[200px]"
          />
        </div>
      </Section>

      {/* What goes where */}
      <Section tone="page" labelledBy="what-goes-where-heading" id="what-goes-where">
        <SectionHead
          eyebrow="What goes where"
          title="Recycling, in plain terms"
          lede="Single stream, every other week, everything loose. Bags are the number-one reason a load gets flagged."
          id="what-goes-where-heading"
        />
        <div className="mt-10 grid gap-8 md:grid-cols-[auto_1fr] md:items-start md:gap-12">
          <Image
            src={poses.recycling.src}
            alt={poses.recycling.alt}
            width={poses.recycling.width}
            height={poses.recycling.height}
            sizes="(max-width: 1024px) 45vw, 240px"
            className="h-auto w-[180px] justify-self-center xs:w-[230px]"
          />
          <div className="grid gap-5 xs:grid-cols-2">
            <div className="card flex flex-col gap-4 p-6">
              <h3 className="display text-cardhead text-forest">Yes, in the recycling cart</h3>
              <ul className="flex flex-col gap-2 text-[0.9375rem]">
                {[
                  'Cardboard, flattened',
                  'Paper, mail and magazines',
                  'Metal food and drink cans',
                  'Glass bottles and jars',
                  'Plastic bottles, jugs and tubs',
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden="true" className="display shrink-0 text-forest">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card flex flex-col gap-4 border-warning p-6">
              <h3 className="display text-cardhead text-warning">No, never in recycling</h3>
              <ul className="flex flex-col gap-2 text-[0.9375rem]">
                {[
                  'Plastic bags and film',
                  'Food waste and greasy boxes',
                  'Styrofoam and cups',
                  'Clothing, hoses and cords',
                  'Anything in a tied bag',
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden="true" className="display shrink-0 text-warning">
                      ✕
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* Unacceptable items, in HTML */}
      <Section tone="bone" labelledBy="unacceptable">
        <SectionHead
          eyebrow="Residential carts"
          title="What can’t go in your cart"
          lede="These apply to the curbside trash and recycling carts at your house. The six headline restrictions first, then the full list grouped by type — the same content as the PDF, written out so you can read it here."
          id="unacceptable"
        />

        <div className="mt-10">
          <KeepItOutGrid />
        </div>

        <div className="mt-10 grid gap-5 xs:grid-cols-2 md:grid-cols-4">
          {unacceptableDetail.map((group) => (
            <div key={group.group} className="card flex flex-col gap-3 bg-paper p-6">
              <h3 className="display text-[0.875rem] text-forest">{group.group}</h3>
              <ul className="flex flex-col gap-2 text-[0.9375rem]">
                {group.items.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span aria-hidden="true" className="display shrink-0 text-warning">
                      ✕
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-4 xs:flex-row xs:flex-wrap">
          <ButtonLink href={unacceptableItemsUrl} variant="forest">
            Official list (PDF)
          </ButtonLink>
          <ButtonLink href="https://hrra.org/household-hazardous-waste/" variant="outline">
            Hazardous waste drop-off days
          </ButtonLink>
        </div>

        <p className="mt-8 max-w-[62ch] text-[0.9375rem] text-ink/80">
          Have something on this list that needs to go? Call{' '}
          <a
            href={site.phoneHref}
            className="font-semibold text-forest underline underline-offset-4"
          >
            {site.phone}
          </a>{' '}
          — a roll-off container handles most of it, and the HRRA drop-off days handle the rest. The
          shortest version: {keepOut.map((entry) => entry.item.toLowerCase()).join(', ')} stay out
          of the cart.
        </p>
      </Section>

      {/* What a container takes — moved here off the dumpsters and services pages */}
      <Section tone="page" labelledBy="what-a-container-takes" id="what-a-container-takes">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-start md:gap-12">
          <div className="flex flex-col gap-6">
            <SectionHead
              eyebrow="Roll-off containers"
              title="What a container takes"
              lede="A roll-off handles nearly everything from a cleanout or a remodel. This short list belongs at a drop-off instead, and the town has a place for each of them."
              id="what-a-container-takes"
            />
            <ul className="grid gap-3 xs:grid-cols-2">
              {handledElsewhere.map((item) => (
                <li key={item} className="card flex items-start gap-3 p-4">
                  <span
                    aria-hidden="true"
                    className="display mt-0.5 inline-flex shrink-0 items-center justify-center rounded-full border-[3px] border-ink bg-warning px-3 py-1 text-[0.875rem] text-paper"
                  >
                    Nope!
                  </span>
                  <span className="text-[0.9375rem]">{item}</span>
                </li>
              ))}
            </ul>
            <p className="rounded-[14px] border-[3px] border-ink bg-paper px-4 py-3 text-[0.9375rem]">
              A contaminated load can get a whole truck rejected. When a material is questionable,
              leave it out and ask us.
            </p>
          </div>
          <Image
            src={poses.keepOut.src}
            alt={poses.keepOut.alt}
            width={poses.keepOut.width}
            height={poses.keepOut.height}
            sizes="(max-width: 1024px) 75vw, 340px"
            className="h-auto w-full max-w-[340px] justify-self-center"
          />
        </div>
      </Section>

      {/* The reference sheets, as opposed to the dated calendars up top */}
      <Section tone="mint" labelledBy="reference-heading">
        <SectionHead
          eyebrow="Good to know"
          title="Rules, letters and drop-off days"
          lede="The documents that are not calendars — worth a read once, rather than a check every week."
          id="reference-heading"
        />
        <div className="mt-10">
          <ResourceCards items={referenceResources} />
        </div>
      </Section>
    </>
  );
}
