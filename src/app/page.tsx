import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { ButtonLink, Numeral, PhotoFrame, Section, SectionHead } from '@/components/ui';
import { Marquee } from '@/components/Marquee';
import { CartSizes } from '@/components/CartSizes';
import { DumpsterSwitcher } from '@/components/DumpsterSwitcher';
import { ServiceAreaMapSection } from '@/components/ServiceAreaMapSection';
import { BEAVER_NAME, services, site, towns } from '@/lib/site';
import { poses } from '@/lib/poses';

export const metadata = {
  title: 'LoStocco Refuse Service — Trash, Recycling & Dumpsters in Danbury, CT',
  description:
    'Weekly trash, bi-weekly recycling and 10, 20 and 30 yard dumpster rentals across Danbury, Brookfield, Bethel, New Fairfield and Newtown. Family owned for forty years.',
  alternates: { canonical: '/' },
};

const steps = [
  {
    title: 'Tell us where',
    body: 'Give us the address and what you need — a cart at the house, a container at a jobsite, or service for a business.',
  },
  {
    title: 'We quote it',
    body: 'A real person calls back with a price and the pickup day. You will know exactly what it costs before we start.',
  },
  {
    title: 'We show up',
    body: 'Carts get dropped off or the container gets delivered, and you are on the route from that week on.',
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero — truck on the left, headline in the middle, Rocco on the right.
          On narrow screens the headline leads and the two pieces of art share
          the row beneath it. */}
      <section className="on-forest band bg-forest" aria-labelledby="hero-heading">
        <div className="wrap grid grid-cols-2 items-center gap-6 py-10 sm:py-12 md:grid-cols-[0.95fr_1.3fr_0.75fr] md:gap-8 md:py-14">
          <div className="order-1 col-span-2 flex flex-col items-start gap-5 md:order-2 md:col-span-1 md:items-center md:text-center">
            <p className="display inline-flex rounded-full border-[2.5px] border-amber px-4 py-1.5 text-[0.9375rem] text-amber">
              Family owned · Danbury, CT
            </p>
            <h1 id="hero-heading" className="display display--hero text-hero text-paper">
              On time.
              <br />
              Every week.
            </h1>
            <p className="max-w-[44ch] text-lede text-mint">
              Weekly curbside trash, bi-weekly recycling and roll-off dumpsters across five
              Connecticut towns. Same family, same trucks, four decades running.
            </p>
            <div className="flex flex-wrap gap-4 md:justify-center">
              <ButtonLink href="/contact" variant="amber">
                Start Service
              </ButtonLink>
              <ButtonLink href="/dumpsters" variant="paper">
                Rent a Dumpster
              </ButtonLink>
            </div>
            <p className="text-[1rem] text-mint/85">
              Or call{' '}
              <a href={site.phoneHref} className="display text-amber">
                {site.phone}
              </a>{' '}
              — {site.hours.weekdays}
            </p>
          </div>

          <div className="order-2 flex items-end justify-center md:order-1 md:justify-start">
            <Image
              src={poses.rearLoader.src}
              alt={poses.rearLoader.alt}
              width={poses.rearLoader.width}
              height={poses.rearLoader.height}
              priority
              sizes="(max-width: 768px) 46vw, 400px"
              className="h-auto w-full max-w-[400px]"
            />
          </div>

          <div className="order-3 flex items-end justify-center md:justify-end">
            <Image
              src={poses.hero.src}
              alt={poses.hero.alt}
              width={poses.hero.width}
              height={poses.hero.height}
              priority
              sizes="(max-width: 768px) 40vw, 260px"
              className="h-auto w-full max-w-[180px] motion-safe:animate-bob xs:max-w-[220px] md:max-w-[260px]"
            />
          </div>
        </div>
      </section>

      <Marquee />

      {/* What we do */}
      <Section tone="page" labelledBy="what-we-do">
        <SectionHead
          eyebrow="What we do"
          title="Five services, done right"
          lede="Residential, commercial, and everything in a roll-off container. If you are not sure which one you need, call and we will tell you."
          id="what-we-do"
        />
        <ul className="mt-10 grid gap-5 xs:grid-cols-2 md:grid-cols-3">
          {services.map((service) => (
            <li key={service.slug} className="card card-lift flex flex-col">
              <Link href={`/services#${service.slug}`} className="flex h-full flex-col gap-3 p-6">
                <h3 className="display text-cardhead text-forest">{service.title}</h3>
                <p className="text-[0.9375rem] text-ink/80">{service.summary}</p>
                <span className="display mt-auto inline-flex w-fit items-center gap-2 rounded-full border-[2.5px] border-ink bg-amber px-4 py-1.5 text-[0.875rem] text-ink">
                  Details <span aria-hidden="true">→</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* Residential curbside — the main service, so it leads */}
      <Section tone="mint" labelledBy="residential" id="residential">
        <SectionHead
          eyebrow="Weekly curbside"
          title="Pick your cart size"
          lede="Trash every week, recycling every other week, on the same day. Three cart sizes so you get the one that actually fits your household."
          id="residential"
        />
        <div className="mt-10">
          <CartSizes />
        </div>
      </Section>

      {/* Dumpster rentals */}
      <Section tone="page" labelledBy="pick-a-size" id="sizes">
        <SectionHead
          eyebrow="Dumpster rentals"
          title="Pick a container size"
          lede="Ten, twenty or thirty yards, delivered where you want it. Most jobs land on the twenty."
          id="pick-a-size"
        />
        <div className="mt-10">
          <Suspense fallback={<div className="min-h-[420px]" />}>
            <DumpsterSwitcher />
          </Suspense>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <Image
            src={poses.rollOff.src}
            alt={poses.rollOff.alt}
            width={poses.rollOff.width}
            height={poses.rollOff.height}
            sizes="(max-width: 1024px) 90vw, 520px"
            className="h-auto w-full max-w-[520px]"
          />
          <p className="max-w-[34ch] text-[0.9375rem] text-ink/75">
            The red roll-off truck drops the container where you want it and pulls it when you are
            done.
          </p>
        </div>
      </Section>

      {/* Service area */}
      <Section tone="mint" labelledBy="service-area">
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

      {/* Credibility: forty years, family run, and what customers say */}
      <Section tone="page" labelledBy="credibility">
        <div className="grid gap-8 md:grid-cols-[auto_1fr] md:items-center md:gap-12">
          <Image
            src={poses.badge.src}
            alt={poses.badge.alt}
            width={poses.badge.width}
            height={poses.badge.height}
            sizes="(max-width: 1024px) 45vw, 240px"
            className="h-auto w-[180px] justify-self-center xs:w-[230px]"
          />
          <div className="flex flex-col gap-6">
            <SectionHead
              eyebrow="Forty years in"
              title="A family name on every truck"
              lede="Joseph LoStocco III started this company and ran it for almost forty years. His children run it today, from the same yard on Beaver Brook Road."
              id="credibility"
            />
            <dl className="grid gap-4 xs:grid-cols-3">
              <div className="card flex flex-col gap-3 bg-mint p-5">
                <dt className="display text-[0.875rem] text-forest">Years in business</dt>
                <dd>
                  <Numeral>40+</Numeral>
                </dd>
              </div>
              <div className="card flex flex-col gap-3 bg-mint p-5">
                <dt className="display text-[0.875rem] text-forest">Trucks in the fleet</dt>
                <dd>
                  <Numeral>10</Numeral>
                </dd>
              </div>
              <div className="card flex flex-col gap-3 bg-mint p-5">
                <dt className="display text-[0.875rem] text-forest">Households served</dt>
                <dd>
                  <Numeral>100s</Numeral>
                </dd>
              </div>
            </dl>
            <div>
              <ButtonLink href="/about" variant="forest">
                Read the full story
              </ButtonLink>
            </div>
          </div>
        </div>

        <div className="mt-14">
          <h3 className="display text-subsection text-forest">What people say</h3>
          <ul className="mt-6 grid gap-5 md:grid-cols-3">
            {[1, 2, 3].map((slot) => (
              <li key={slot} className="card flex flex-col gap-4 bg-paper p-6">
                <span className="display text-[0.875rem] text-forest" aria-hidden="true">
                  ★★★★★
                </span>
                <PhotoFrame
                  label={`Google review ${slot} — quote, name and town`}
                  ratio="aspect-[5/3]"
                />
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Three steps */}
      <Section tone="mint" labelledBy="three-steps">
        <SectionHead eyebrow="Getting started" title="Three steps to start" id="three-steps" />
        <div className="mt-10 grid gap-8 md:grid-cols-[1fr_auto] md:items-center md:gap-12">
          <ol className="grid gap-5 xs:grid-cols-3">
            {steps.map((step, index) => (
              <li key={step.title} className="card flex flex-col gap-3 bg-paper p-6">
                <Numeral decorative className="self-start">
                  {index + 1}
                </Numeral>
                <h3 className="display text-cardhead text-forest">{step.title}</h3>
                <p className="text-[0.9375rem] text-ink/80">{step.body}</p>
              </li>
            ))}
          </ol>
          <Image
            src={poses.portrait.src}
            alt={poses.portrait.alt}
            width={poses.portrait.width}
            height={poses.portrait.height}
            sizes="(max-width: 1024px) 40vw, 190px"
            className="h-auto w-[140px] justify-self-center xs:w-[180px]"
          />
        </div>
        <div className="mt-8 flex flex-wrap gap-4">
          <ButtonLink href="/contact">Start Service</ButtonLink>
          <ButtonLink href={site.phoneHref} variant="outline">
            Call {site.phone}
          </ButtonLink>
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
