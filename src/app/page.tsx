import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { ButtonLink, Numeral, Section, SectionHead } from '@/components/ui';
import { Marquee } from '@/components/Marquee';
import { PageHero } from '@/components/PageHero';
import { RoccoIntro } from '@/components/RoccoIntro';
import { CartSizes } from '@/components/CartSizes';
import { DumpsterSwitcher } from '@/components/DumpsterSwitcher';
import { ServiceAreaMapSection } from '@/components/ServiceAreaMapSection';
import { Testimonials } from '@/components/Testimonials';
import { BEAVER_NAME, services, site, towns } from '@/lib/site';
import { poses } from '@/lib/poses';

export const metadata = {
  title: 'LoStocco Refuse Service — Trash, Recycling & Dumpsters in Danbury, CT',
  description:
    'Weekly trash, bi-weekly recycling and 10, 20 and 30 yard dumpster rentals across Danbury, Brookfield, Bethel, New Fairfield and Newtown. Local, family owned, over 40 years.',
  alternates: { canonical: '/' },
};

const steps = [
  {
    title: 'Tell us where',
    body: 'Give us the address and what you need — a cart at the house or a container in the driveway.',
  },
  {
    title: 'We quote it',
    body: 'A real person calls back with a price and the pickup day. You will know the cost before we start.',
  },
  {
    title: 'We show up',
    body: 'Carts get dropped off or the container gets delivered, and you are on the route from that week on.',
  },
];

export default function HomePage() {
  return (
    <>
      <PageHero
        eyebrow="Local · Family owned · Over 40 years"
        title="Four decades on these roads."
        lede="Weekly curbside trash, bi-weekly recycling and roll-off containers across five Connecticut towns. Same family, same trucks, the whole time."
        pose="heroRearStep"
        poseWidth="w-full max-w-[720px]"
        artColumn="wide"
      >
        <div className="flex flex-wrap gap-4">
          <ButtonLink href="/contact" variant="amber">
            Get a Quote
          </ButtonLink>
          <ButtonLink href="/dumpsters" variant="paper">
            Rent a Dumpster
          </ButtonLink>
        </div>
      </PageHero>

      <Marquee />

      <RoccoIntro />

      {/* What we do */}
      <Section tone="page" labelledBy="what-we-do">
        <SectionHead
          eyebrow="What we do"
          title="Four services, done right"
          lede="Residential pickup and everything that goes in a roll-off container. If you are not sure which one you need, call and we will tell you."
          id="what-we-do"
        />
        <ul className="mt-10 grid gap-5 xs:grid-cols-2 md:grid-cols-4">
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

      {/* Weekly curbside — the service itself first, then the cart sizes */}
      <Section tone="mint" labelledBy="residential" id="residential">
        <SectionHead
          eyebrow="Weekly curbside"
          title="We pick up at the curb"
          lede="Trash every week and recycling every other week, on the same day, at your house. Carts out the night before and the crew does the rest."
          id="residential"
        />
        <div className="mt-10">
          <CartSizes />
        </div>
      </Section>

      {/* Dumpster rentals — the truck leads, then the picker */}
      <Section tone="page" labelledBy="pick-a-size" id="sizes">
        <SectionHead
          eyebrow="Dumpster rentals"
          title="Containers in the driveway"
          lede="Ten, twenty or thirty yards, delivered where you want it and pulled when you are done. Most jobs land on the twenty."
          id="pick-a-size"
        />
        <Image
          src={poses.rollOffAction.src}
          alt={poses.rollOffAction.alt}
          width={poses.rollOffAction.width}
          height={poses.rollOffAction.height}
          sizes="(max-width: 1024px) 94vw, 900px"
          className="mx-auto mt-8 h-auto w-full max-w-[900px]"
        />
        <div className="mt-10">
          <Suspense fallback={<div className="min-h-[420px]" />}>
            <DumpsterSwitcher />
          </Suspense>
        </div>
      </Section>

      {/* Service area */}
      <Section tone="mint" labelledBy="service-area">
        <SectionHead
          eyebrow="Where we go"
          title="We’re in five towns"
          lede={`${towns.map((t) => t.name).join(' · ')} — plus nearby areas.`}
          id="service-area"
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
          <Suspense fallback={<div className="min-h-[420px]" />}>
            <ServiceAreaMapSection />
          </Suspense>
        </div>
      </Section>

      {/* Credibility */}
      <Section tone="page" labelledBy="credibility">
        <div className="grid gap-8 md:grid-cols-[auto_1fr] md:items-center md:gap-12">
          <Image
            src={poses.badge.src}
            alt={poses.badge.alt}
            width={poses.badge.width}
            height={poses.badge.height}
            sizes="(max-width: 1024px) 45vw, 260px"
            className="h-auto w-[200px] justify-self-center xs:w-[260px]"
          />
          <div className="flex flex-col gap-6">
            <SectionHead
              eyebrow="Over 40 years in"
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
                  <Numeral>10+</Numeral>
                </dd>
              </div>
              <div className="card flex flex-col gap-3 bg-mint p-5">
                <dt className="display text-[0.875rem] text-forest">Towns served</dt>
                <dd>
                  <Numeral>{towns.length}</Numeral>
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
          <Testimonials />
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
          <ButtonLink href="/contact">Get a Quote</ButtonLink>
          <ButtonLink href={site.phoneHref} variant="outline">
            Call {site.phone}
          </ButtonLink>
        </div>
      </Section>

      {/* Closing CTA */}
      <section className="on-forest band bg-forest" aria-labelledby="closing-cta">
        <div className="wrap flex flex-col items-start gap-6 py-14 sm:py-16 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-5">
            <Image
              src={poses.cueWave.src}
              alt=""
              width={poses.cueWave.width}
              height={poses.cueWave.height}
              sizes="110px"
              aria-hidden="true"
              className="hidden h-auto w-[110px] shrink-0 xs:block"
            />
            <div>
              <h2 id="closing-cta" className="display text-section text-paper">
                Ready when you are
              </h2>
              <p className="mt-3 max-w-[48ch] text-lede text-mint">
                {BEAVER_NAME} is standing by. So is the office, {site.hours.weekdays}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <ButtonLink href="/contact" variant="amber">
              Get a Quote
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
