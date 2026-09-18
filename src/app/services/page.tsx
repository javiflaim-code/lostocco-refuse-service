import Image from 'next/image';
import type { Metadata } from 'next';
import { ButtonLink, Placeholder, Section, SectionHead } from '@/components/ui';
import { PageHero } from '@/components/PageHero';
import { Marquee } from '@/components/Marquee';
import { site, towns } from '@/lib/site';
import { poses, type PoseKey } from '@/lib/poses';

export const metadata: Metadata = {
  title: 'Services — Trash, Recycling & Dumpster Rentals',
  description:
    'Weekly residential trash, bi-weekly recycling, 10, 20 and 30 yard dumpster rentals and bulk pickups in Danbury, Brookfield, Bethel, New Fairfield and Newtown, CT.',
  alternates: { canonical: '/services' },
};

type Block = {
  slug: string;
  title: string;
  lede: string;
  pose: PoseKey;
  points: string[];
  placeholder?: string;
  cta: { label: string; href: string };
  secondary?: { label: string; href: string };
};

const blocks: Block[] = [
  {
    slug: 'residential-trash',
    title: 'Residential Trash',
    lede: 'One cart, one pickup day, every week. The same truck and the same crew on your street.',
    pose: 'rearLoaderAction',
    points: [
      'Weekly curbside collection at your house',
      'Carts out at the curb the night before',
      'At least two feet between the trash and recycling carts',
      'Holiday weeks shift — the schedule is posted ahead of time',
    ],
    cta: { label: 'Start trash service', href: '/contact?service=start-trash' },
    secondary: { label: 'See the three cart sizes', href: '/#cart-sizes' },
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
    cta: { label: 'Get the recycling calendar', href: '/resources' },
    secondary: { label: 'See the three cart sizes', href: '/#cart-sizes' },
  },
  {
    slug: 'dumpster-rentals',
    title: 'Dumpster Rentals',
    lede: 'Ten, twenty and thirty yard roll-off containers, delivered where you need them and pulled when you are done.',
    pose: 'rollOffAction',
    points: [
      'Cleanouts, remodels, roofing and construction debris',
      'We put boards down to protect the driveway',
      'Call when it is full and we will come pull it',
      'Delivered to homes, job sites and commercial buildings',
    ],
    cta: { label: 'Compare the three sizes', href: '/dumpsters' },
  },
  {
    slug: 'bulk-pickups',
    title: 'Bulk & Special Pickups',
    lede: 'Furniture, appliances and the other things that will never fit in a cart.',
    pose: 'quote',
    points: [],
    placeholder: 'confirm whether bulk and special pickups are offered, and how they are priced',
    cta: { label: 'Call and ask', href: site.phoneHref },
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Everything we haul"
        lede="Residential trash, recycling and roll-off containers across five Connecticut towns. Call us and a person picks up."
        pose={['rearLoader', 'rollOff']}
      >
        <div className="flex flex-wrap gap-4">
          <ButtonLink href="/contact" variant="amber">
            Get a Quote
          </ButtonLink>
          <ButtonLink href={site.phoneHref} variant="paper">
            {site.phone}
          </ButtonLink>
        </div>
      </PageHero>

      <Marquee items={['Residential trash', 'Recycling', 'Roll-off dumpsters', 'Bulk pickups']} />

      {/* The jump links get their own section and say what they are for */}
      <Section tone="page" labelledBy="pick-a-service">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:gap-8">
          <Image
            src={poses.cuePoint.src}
            alt=""
            width={poses.cuePoint.width}
            height={poses.cuePoint.height}
            sizes="110px"
            aria-hidden="true"
            className="h-auto w-[84px] shrink-0 xs:w-[110px]"
          />
          <div className="flex flex-col gap-4">
            <h2 id="pick-a-service" className="display text-subsection text-forest">
              Here are the four things we do
            </h2>
            <p className="text-lede text-ink/85">Click the one you came for.</p>
            <nav aria-label="Jump to a service" className="flex flex-wrap gap-3">
              {blocks.map((block) => (
                <a
                  key={block.slug}
                  href={`#${block.slug}`}
                  className="display inline-flex min-h-[48px] items-center rounded-full border-[3px] border-ink bg-paper px-5 text-[0.9375rem] text-forest transition-colors hover:bg-forest hover:text-paper"
                >
                  {block.title}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </Section>

      {blocks.map((block, index) => (
        <Section
          key={block.slug}
          id={block.slug}
          tone={index % 2 === 0 ? 'mint' : 'page'}
          labelledBy={`${block.slug}-heading`}
        >
          <div
            className={`grid gap-8 md:grid-cols-2 md:items-center md:gap-12 ${
              index % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''
            }`}
          >
            <div className="flex flex-col gap-5">
              <SectionHead title={block.title} lede={block.lede} id={`${block.slug}-heading`} />

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

              <div className="flex flex-wrap gap-3">
                <ButtonLink href={block.cta.href} variant="forest">
                  {block.cta.label}
                </ButtonLink>
                {block.secondary ? (
                  <ButtonLink href={block.secondary.href} variant="outline">
                    {block.secondary.label}
                  </ButtonLink>
                ) : null}
              </div>
            </div>

            <Image
              src={poses[block.pose].src}
              alt={poses[block.pose].alt}
              width={poses[block.pose].width}
              height={poses[block.pose].height}
              sizes="(max-width: 1024px) 94vw, 640px"
              className="h-auto w-full"
            />
          </div>
        </Section>
      ))}

      {/* Where */}
      <Section tone="forest" labelledBy="services-towns">
        <SectionHead
          eyebrow="Coverage"
          title="All five towns"
          lede={`${towns.map((t) => t.name).join(' · ')}, plus nearby areas. Pick your town to see how service runs there.`}
          tone="paper"
          id="services-towns"
        />
        <div className="mt-8 flex flex-wrap gap-4">
          <ButtonLink href="/#service-area" variant="amber">
            Pick your town
          </ButtonLink>
          <ButtonLink href="/contact" variant="paper">
            Get a Quote
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
