import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import {
  ButtonLink,
  Numeral,
  Placeholder,
  PhotoFrame,
  Section,
  SectionHead,
} from '@/components/ui';
import { Marquee } from '@/components/Marquee';
import { DumpsterSwitcher } from '@/components/DumpsterSwitcher';
import { ServiceAreaMapSection } from '@/components/ServiceAreaMapSection';
import { NameTheBeaver } from '@/components/NameTheBeaver';
import { CurbsideReminders, KeepItOutBlock, ResourceCards } from '@/components/content';
import { BEAVER_NAME, services, site, towns } from '@/lib/site';
import { poses } from '@/lib/poses';

export const metadata = {
  title: 'LoStocco Refuse Service — Trash, Recycling & Dumpsters in Danbury, CT',
  description:
    'Weekly trash, bi-weekly recycling and 10, 20 and 30 yard dumpster rentals across Danbury, Brookfield, Bethel, New Fairfield and Newtown. Family owned, HRRA licensed.',
  alternates: { canonical: '/' },
};

const steps = [
  {
    title: 'Tell us where',
    body: 'Give us the address and what you need — a cart at the house, a container at a jobsite, or service for a business.',
  },
  {
    title: 'We quote it',
    body: 'A real person calls back with a price and the pickup day. No online checkout, no runaround.',
  },
  {
    title: 'We show up',
    body: 'Carts get dropped off or the container gets delivered, and you are on the route from that week on.',
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="on-forest band bg-forest" aria-labelledby="hero-heading">
        <div className="wrap grid items-center gap-10 py-12 sm:py-16 md:grid-cols-[1.1fr_0.9fr] md:gap-8 md:py-20">
          <div className="flex flex-col items-start gap-6">
            <p className="display inline-flex rounded-full border-[2.5px] border-amber px-4 py-1.5 text-[0.875rem] text-amber">
              Family owned · Danbury, CT
            </p>
            <h1 id="hero-heading" className="display display--hero text-hero text-paper">
              Trash out.
              <br />
              Worry gone.
            </h1>
            <p className="max-w-[46ch] text-lede text-mint">
              Weekly curbside trash, bi-weekly recycling and roll-off dumpsters across five
              Connecticut towns. Same family, same trucks, four decades running.
            </p>
            <div className="flex flex-wrap gap-4">
              <ButtonLink href="/contact" variant="amber">
                Start Service
              </ButtonLink>
              <ButtonLink href="/dumpsters" variant="paper">
                Rent a Dumpster
              </ButtonLink>
            </div>
            <p className="text-[0.9375rem] text-mint/85">
              Or call{' '}
              <a href={site.phoneHref} className="display text-amber">
                {site.phone}
              </a>{' '}
              — {site.hours.weekdays}
            </p>
          </div>

          <div className="justify-self-center md:justify-self-end">
            <Image
              src={poses.hero.src}
              alt={poses.hero.alt}
              width={poses.hero.width}
              height={poses.hero.height}
              priority
              sizes="(max-width: 768px) 70vw, (max-width: 1024px) 45vw, 420px"
              className="h-auto w-[240px] motion-safe:animate-bob xs:w-[300px] md:w-[400px]"
            />
          </div>
        </div>
      </section>

      <Marquee />

      {/* What we do */}
      <Section tone="page" labelledBy="what-we-do">
        <SectionHead
          eyebrow="What we do"
          title="Five services, no surprises"
          lede="Residential, commercial, and everything in a roll-off container. If you are not sure which one you need, call and we will tell you."
          id="what-we-do"
        />
        <ul className="mt-10 grid gap-5 xs:grid-cols-2 md:grid-cols-3">
          {services.map((service) => (
            <li key={service.slug} className="card card-lift flex flex-col">
              <Link href={`/services#${service.slug}`} className="flex h-full flex-col gap-3 p-6">
                <h3 className="display text-cardhead text-forest">{service.title}</h3>
                <p className="text-[0.9375rem] text-ink/80">{service.summary}</p>
                {service.body === null ? (
                  <Placeholder label="confirm whether bulk pickups are offered" className="mt-1" />
                ) : null}
                <span className="display mt-auto pt-4 text-[0.875rem] text-forest">Details →</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* Pick a size */}
      <Section tone="mint" labelledBy="pick-a-size" id="sizes">
        <SectionHead
          eyebrow="Dumpster rentals"
          title="Pick a size"
          lede="Ten, twenty or thirty yards. Most jobs land on the twenty."
          id="pick-a-size"
        />
        <div className="mt-10">
          <Suspense fallback={<div className="min-h-[420px]" />}>
            <DumpsterSwitcher />
          </Suspense>
        </div>
      </Section>

      {/* Stats */}
      <Section tone="page" labelledBy="by-the-numbers">
        <SectionHead
          eyebrow="By the numbers"
          title="Forty years on these roads"
          id="by-the-numbers"
        />
        <dl className="mt-10 grid gap-5 xs:grid-cols-2 md:grid-cols-4">
          <div className="card flex flex-col gap-2 bg-mint p-6">
            <dt className="display text-[0.875rem] text-forest">Years in business</dt>
            <dd>
              <Numeral size="lg">40+</Numeral>
            </dd>
          </div>
          <div className="card flex flex-col gap-2 bg-mint p-6">
            <dt className="display text-[0.875rem] text-forest">Towns served</dt>
            <dd>
              <Numeral size="lg">{towns.length}</Numeral>
            </dd>
          </div>
          <div className="card flex flex-col gap-3 bg-mint p-6">
            <dt className="display text-[0.875rem] text-forest">Trucks in the fleet</dt>
            <dd>
              <Placeholder label="number of trucks" />
            </dd>
          </div>
          <div className="card flex flex-col gap-3 bg-mint p-6">
            <dt className="display text-[0.875rem] text-forest">Households served</dt>
            <dd>
              <Placeholder label="number of households" />
            </dd>
          </div>
        </dl>

        <div className="mt-8 grid gap-6 md:grid-cols-[auto_1fr] md:items-center">
          <Image
            src={poses.recycling.src}
            alt={poses.recycling.alt}
            width={poses.recycling.width}
            height={poses.recycling.height}
            sizes="(max-width: 768px) 45vw, 220px"
            className="h-auto w-[170px] justify-self-center xs:w-[200px]"
          />
          <div className="card flex flex-col gap-4 bg-paper p-6 xs:p-8">
            <h3 className="display text-subsection text-forest">Cart sizes</h3>
            <div className="grid gap-4 xs:grid-cols-2">
              <div className="flex flex-col gap-2">
                <p className="display text-[0.875rem] text-forest">Trash cart</p>
                <Placeholder label="trash cart size in gallons" />
              </div>
              <div className="flex flex-col gap-2">
                <p className="display text-[0.875rem] text-forest">Recycling cart</p>
                <Placeholder label="recycling cart size in gallons" />
              </div>
            </div>
            <p className="text-[0.9375rem] text-ink/80">
              Recycling goes in loose — no bags. Cardboard flattened, containers empty.
            </p>
          </div>
        </div>
      </Section>

      {/* Our trucks */}
      <Section tone="forest" labelledBy="our-trucks">
        <SectionHead
          eyebrow="The fleet"
          title="Our trucks"
          lede="Rear loaders for the routes, roll-off trucks for the containers. Maintained in our own yard on Beaver Brook Road."
          tone="paper"
          id="our-trucks"
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="card flex flex-col gap-4 bg-paper p-6">
            <div className="flex aspect-[3/2] items-center justify-center">
              <Image
                src={poses.rearLoader.src}
                alt={poses.rearLoader.alt}
                width={poses.rearLoader.width}
                height={poses.rearLoader.height}
                sizes="(max-width: 768px) 88vw, 520px"
                className="h-full w-full object-contain"
              />
            </div>
            <h3 className="display text-cardhead text-forest">Rear loaders</h3>
            <p className="text-[0.9375rem] text-ink/80">
              These run the weekly residential routes and the bi-weekly recycling.
            </p>
          </div>
          <div className="card flex flex-col gap-4 bg-paper p-6">
            <div className="flex aspect-[3/2] items-center justify-center">
              <Image
                src={poses.rollOff.src}
                alt={poses.rollOff.alt}
                width={poses.rollOff.width}
                height={poses.rollOff.height}
                sizes="(max-width: 768px) 88vw, 520px"
                className="h-full w-full object-contain"
              />
            </div>
            <h3 className="display text-cardhead text-forest">Roll-off trucks</h3>
            <p className="text-[0.9375rem] text-ink/80">
              These drop and pull the 10, 20 and 30 yard containers.
            </p>
          </div>
        </div>
        <div className="mt-6 grid gap-6 xs:grid-cols-2 md:grid-cols-3">
          <PhotoFrame label="packer truck on route" />
          <PhotoFrame label="roll-off delivery" />
          <PhotoFrame label="the yard on Beaver Brook Road" />
        </div>
      </Section>

      {/* Service area */}
      <Section tone="page" labelledBy="service-area">
        <SectionHead
          eyebrow="Where we go"
          title="We’re in five towns"
          lede={`${towns.map((t) => t.name).join(' · ')} — plus nearby areas. Pick a town to see how it runs.`}
          id="service-area"
        />
        <div className="mt-10 grid gap-8 md:grid-cols-[auto_1fr] md:items-start md:gap-10">
          <Image
            src={poses.map.src}
            alt={poses.map.alt}
            width={poses.map.width}
            height={poses.map.height}
            sizes="(max-width: 1024px) 50vw, 240px"
            className="h-auto w-[180px] justify-self-center xs:w-[230px]"
          />
          <Suspense fallback={<div className="min-h-[420px]" />}>
            <ServiceAreaMapSection />
          </Suspense>
        </div>
      </Section>

      {/* Keep it out */}
      <Section tone="mint" labelledBy="keep-it-out">
        <SectionHead
          eyebrow="Before you roll it out"
          title="Keep it out of the cart"
          lede="Six things that cannot go in your trash cart. They will be left behind, and they can hurt a crew."
          id="keep-it-out"
        />
        <div className="mt-10">
          <KeepItOutBlock />
        </div>

        <div className="mt-12">
          <h3 className="display text-subsection text-forest">Curbside reminders</h3>
          <div className="mt-6">
            <CurbsideReminders tone="light" />
          </div>
        </div>
      </Section>

      {/* Three steps */}
      <Section tone="page" labelledBy="three-steps">
        <SectionHead eyebrow="Getting started" title="Three steps to start" id="three-steps" />
        <div className="mt-10 grid gap-8 md:grid-cols-[1fr_auto] md:items-center md:gap-12">
          <ol className="grid gap-5 xs:grid-cols-3">
            {steps.map((step, index) => (
              <li key={step.title} className="card flex flex-col gap-3 bg-mint p-6">
                <Numeral decorative className="self-start">
                  {index + 1}
                </Numeral>
                <h3 className="display text-cardhead text-forest">{step.title}</h3>
                <p className="text-[0.9375rem] text-ink/80">{step.body}</p>
              </li>
            ))}
          </ol>
          <Image
            src={poses.quote.src}
            alt={poses.quote.alt}
            width={poses.quote.width}
            height={poses.quote.height}
            sizes="(max-width: 1024px) 50vw, 260px"
            className="h-auto w-[190px] justify-self-center xs:w-[240px]"
          />
        </div>
        <div className="mt-8 flex flex-wrap gap-4">
          <ButtonLink href="/contact">Start Service</ButtonLink>
          <ButtonLink href={site.phoneHref} variant="outline">
            Call {site.phone}
          </ButtonLink>
        </div>
      </Section>

      {/* Name the beaver */}
      <Section tone="forest" labelledBy="name-the-beaver">
        <NameTheBeaver />
      </Section>

      {/* Reviews */}
      <Section tone="page" labelledBy="reviews">
        <SectionHead
          eyebrow="From our customers"
          title="What people say"
          lede="Three real Google reviews will sit here once the client picks them."
          id="reviews"
        />
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {[1, 2, 3].map((slot) => (
            <li key={slot} className="card flex flex-col gap-4 bg-paper p-6">
              <span className="display text-[0.875rem] text-forest" aria-hidden="true">
                ★★★★★
              </span>
              <Placeholder label={`Google review ${slot} — quote`} as="p" />
              <Placeholder label={`Google review ${slot} — name and town`} as="p" />
            </li>
          ))}
        </ul>
      </Section>

      {/* Downloads */}
      <Section tone="mint" labelledBy="downloads">
        <SectionHead
          eyebrow="Downloads"
          title="Schedules and calendars"
          lede="Holiday schedule, recycling weeks and the rules — all in one place."
          id="downloads"
        />
        <div className="mt-10">
          <ResourceCards />
        </div>
        <div className="mt-8">
          <ButtonLink href="/resources" variant="forest">
            All resources
          </ButtonLink>
        </div>
      </Section>

      {/* Legacy */}
      <Section tone="bone" labelledBy="legacy">
        <div className="grid gap-10 md:grid-cols-[auto_1fr] md:items-center md:gap-12">
          <Image
            src={poses.badge.src}
            alt={poses.badge.alt}
            width={poses.badge.width}
            height={poses.badge.height}
            sizes="(max-width: 1024px) 50vw, 260px"
            className="h-auto w-[190px] justify-self-center xs:w-[250px]"
          />
          <div className="flex flex-col gap-5">
            <SectionHead eyebrow="Our family" title="Started by Joseph LoStocco III" id="legacy" />
            <div className="prose-plain text-ink/85">
              <p>
                Joe ran this company for almost forty years. He treated customers as friends first
                and the business second, loved trucks old and new, and taught himself to weld —
                which is how LoStocco Metalworks got started in the first place.
              </p>
              <p>
                He passed away in September 2021. His children, Joseph IV and Maria, run the company
                now, on the same promise: show up when we say, do the work right, charge a fair
                price.
              </p>
            </div>
            <div>
              <ButtonLink href="/about" variant="forest">
                Read the full story
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>

      {/* Closing CTA */}
      <section className="on-forest band bg-forest" aria-labelledby="closing-cta">
        <div className="wrap flex flex-col items-start gap-6 py-14 sm:py-16 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 id="closing-cta" className="display text-section text-paper">
              Ready when you are
            </h2>
            <p className="mt-3 max-w-[48ch] text-lede text-mint">
              {BEAVER_NAME} is standing by. So is the office, {site.hours.weekdays}
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <ButtonLink href="/contact" variant="amber">
              Start Service
            </ButtonLink>
            <ButtonLink href={site.phoneHref} variant="paper">
              {site.phone}
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
