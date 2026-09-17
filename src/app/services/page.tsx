import Image from 'next/image';
import type { Metadata } from 'next';
import { ButtonLink, Placeholder, PhotoFrame, Section, SectionHead } from '@/components/ui';
import { PageHero } from '@/components/PageHero';
import { Marquee } from '@/components/Marquee';
import { site, towns } from '@/lib/site';
import { poses, type PoseKey } from '@/lib/poses';

export const metadata: Metadata = {
  title: 'Services — Trash, Recycling, Commercial & Dumpsters',
  description:
    'Weekly residential trash, bi-weekly recycling, commercial service and 10, 20 and 30 yard dumpster rentals in Danbury, Brookfield, Bethel, New Fairfield and Newtown, CT.',
  alternates: { canonical: '/services' },
};

type Block = {
  slug: string;
  title: string;
  lede: string;
  pose: PoseKey;
  points: string[];
  note?: string;
  placeholder?: string;
  cta: { label: string; href: string };
  photo: string;
};

const blocks: Block[] = [
  {
    slug: 'residential-trash',
    title: 'Residential Trash',
    lede: 'One cart, one pickup day, every week. The same truck and the same crew on your street.',
    pose: 'rearLoader',
    points: [
      'Weekly curbside collection at your house',
      'Carts out at the curb the night before',
      'At least two feet between the trash and recycling carts',
      'Holiday weeks shift — the schedule is posted ahead of time',
    ],
    note: 'Winter routes may run earlier or differently. When in doubt, put it out.',
    placeholder: 'trash cart size in gallons',
    cta: { label: 'Start trash service', href: '/contact?service=start-trash' },
    photo: 'crew at the curb',
  },
  {
    slug: 'recycling',
    title: 'Recycling',
    lede: 'Single-stream recycling every other week. Cardboard, paper, metal, glass and plastic containers go in loose.',
    pose: 'recycling',
    points: [
      'Bi-weekly pickup on the published calendar',
      'No bags — everything goes in loose',
      'Flatten cardboard, empty and rinse containers',
      'Newtown runs its own calendar, separate from the other four towns',
    ],
    note: 'A contaminated load can get the whole truck rejected. When a material is questionable, leave it out.',
    placeholder: 'recycling cart size in gallons',
    cta: { label: 'Get the recycling calendar', href: '/resources' },
    photo: 'recycling cart at the curb',
  },
  {
    slug: 'commercial',
    title: 'Commercial Trash & Recycling',
    lede: 'Offices, restaurants, retail, contractors and multi-family buildings. We size the service to the volume.',
    pose: 'rollOff',
    points: [
      'Scheduled pickup, set to how fast you actually fill up',
      'Containers sized to the space you have',
      'Trash and recycling on one account',
      'We adjust the frequency when your volume changes',
    ],
    cta: { label: 'Ask about commercial service', href: '/contact?service=commercial' },
    photo: 'commercial container behind a building',
  },
  {
    slug: 'dumpster-rentals',
    title: 'Dumpster Rentals',
    lede: 'Ten, twenty and thirty yard roll-off containers, delivered where you need them and pulled when you are done.',
    pose: 'measuring',
    points: [
      'Cleanouts, remodels, roofing and construction debris',
      'We protect the driveway on delivery',
      'Call when it is full and we will come pull it',
      'No paint, chemicals, tires, electronics or appliances with refrigerant',
    ],
    cta: { label: 'Compare the three sizes', href: '/dumpsters' },
    photo: 'roll-off container on a driveway',
  },
  {
    slug: 'bulk-pickups',
    title: 'Bulk & Special Pickups',
    lede: 'Furniture, appliances and the other things that will never fit in a cart.',
    pose: 'quote',
    points: [],
    placeholder: 'confirm whether bulk and special pickups are offered, and how they are priced',
    cta: { label: 'Call and ask', href: site.phoneHref },
    photo: 'bulk item at the curb',
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="What we haul"
        lede="Residential and commercial trash, recycling, and roll-off containers across five Connecticut towns. Call us and a person picks up."
        pose="standing"
      >
        <div className="flex flex-wrap gap-4">
          <ButtonLink href="/contact" variant="amber">
            Start Service
          </ButtonLink>
          <ButtonLink href={site.phoneHref} variant="paper">
            {site.phone}
          </ButtonLink>
        </div>
      </PageHero>

      <Marquee
        items={[
          'Residential trash',
          'Recycling',
          'Commercial service',
          'Roll-off dumpsters',
          'Bulk pickups',
        ]}
      />

      {/* Jump links */}
      <div className="band bg-page py-6">
        <nav aria-label="Jump to a service" className="wrap flex flex-wrap gap-3">
          {blocks.map((block) => (
            <a
              key={block.slug}
              href={`#${block.slug}`}
              className="display inline-flex min-h-[44px] items-center rounded-full border-[2.5px] border-ink bg-paper px-5 text-[0.875rem] text-forest hover:bg-mint"
            >
              {block.title}
            </a>
          ))}
        </nav>
      </div>

      {blocks.map((block, index) => (
        <Section
          key={block.slug}
          id={block.slug}
          tone={index % 2 === 0 ? 'page' : 'mint'}
          labelledBy={`${block.slug}-heading`}
        >
          <div
            className={`grid gap-8 md:grid-cols-2 md:items-center md:gap-12 ${
              index % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''
            }`}
          >
            <div className="flex flex-col gap-5">
              <SectionHead
                eyebrow={`0${index + 1}`}
                title={block.title}
                lede={block.lede}
                id={`${block.slug}-heading`}
              />

              {block.points.length > 0 ? (
                <ul className="flex flex-col gap-2.5">
                  {block.points.map((point) => (
                    <li key={point} className="flex gap-3 text-[0.9375rem]">
                      <span aria-hidden="true" className="display shrink-0 text-forest">
                        ✓
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              ) : null}

              {block.placeholder ? <Placeholder label={block.placeholder} /> : null}

              {block.note ? (
                <p className="rounded-[14px] border-[3px] border-ink bg-paper px-4 py-3 text-[0.9375rem]">
                  {block.note}
                </p>
              ) : null}

              <div>
                <ButtonLink href={block.cta.href} variant="forest">
                  {block.cta.label}
                </ButtonLink>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <Image
                src={poses[block.pose].src}
                alt={poses[block.pose].alt}
                width={poses[block.pose].width}
                height={poses[block.pose].height}
                sizes="(max-width: 1024px) 80vw, 460px"
                className="h-auto w-full max-w-[420px] justify-self-center"
              />
              <PhotoFrame label={block.photo} />
            </div>
          </div>
        </Section>
      ))}

      {/* Where */}
      <Section tone="forest" labelledBy="services-towns">
        <SectionHead
          eyebrow="Coverage"
          title="Every service, all five towns"
          lede={`${towns.map((t) => t.name).join(' · ')}, plus nearby areas.`}
          tone="paper"
          id="services-towns"
        />
        <div className="mt-8 flex flex-wrap gap-4">
          <ButtonLink href="/service-area" variant="amber">
            See the service area
          </ButtonLink>
          <ButtonLink href="/contact" variant="paper">
            Start Service
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
