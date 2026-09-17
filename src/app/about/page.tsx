import Image from 'next/image';
import type { Metadata } from 'next';
import {
  ButtonLink,
  Numeral,
  Placeholder,
  PhotoFrame,
  Section,
  SectionHead,
} from '@/components/ui';
import { PageHero } from '@/components/PageHero';
import { Breadcrumb } from '@/components/Breadcrumb';
import { site, towns } from '@/lib/site';
import { poses } from '@/lib/poses';

export const metadata: Metadata = {
  title: 'About — Four Decades of a Danbury Family Business',
  description:
    'Joseph LoStocco III ran LoStocco Refuse Service for almost forty years. His children, Joseph IV and Maria, run it today from the same yard on Beaver Brook Road in Danbury.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Four decades, one family"
        lede="LoStocco Refuse Service has been hauling in greater Danbury for about forty years. Same family, same yard, same way of doing business."
        pose="badge"
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

      <Breadcrumb label="About" />

      {/* Joseph III */}
      <Section tone="bone" labelledBy="joe-three">
        <div className="grid gap-8 md:grid-cols-[1fr_0.8fr] md:items-start md:gap-12">
          <div className="flex flex-col gap-6">
            <SectionHead eyebrow="Our founder" title="Joseph LoStocco III" id="joe-three" />
            <div className="prose-plain text-ink/85">
              <p>
                Joe ran this company for almost forty years. He knew the streets, he knew the
                customers, and he treated them as friends first — which is why so many of them are
                still on the route.
              </p>
              <p>
                He loved trucks, old and new, and he taught himself to weld. If something broke in
                the yard, he fixed it himself rather than wait on someone else.
              </p>
              <p>
                Joe passed away in September 2021. What he built did not change hands outside the
                family, and it did not change character.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <PhotoFrame label="Joseph LoStocco III" ratio="aspect-[4/5]" />
            <Placeholder label="years Joe ran the company, and the year he founded it" as="p" />
          </div>
        </div>
      </Section>

      {/* Joseph IV and Maria */}
      <Section tone="page" labelledBy="next-gen">
        <div className="grid gap-8 md:grid-cols-[auto_1fr] md:items-center md:gap-12">
          <Image
            src={poses.nextGeneration.src}
            alt={poses.nextGeneration.alt}
            width={poses.nextGeneration.width}
            height={poses.nextGeneration.height}
            sizes="(max-width: 1024px) 60vw, 300px"
            className="h-auto w-[210px] justify-self-center xs:w-[280px]"
          />
          <div className="flex flex-col gap-6">
            <SectionHead eyebrow="Running it today" title="Joseph IV and Maria" id="next-gen" />
            <div className="prose-plain text-ink/85">
              <p>
                Joe’s children run the company now. They grew up around the trucks and the yard, and
                they kept the promise their father made to every customer: prompt, dependable
                service at a fair price.
              </p>
              <p>
                When you call the office, you are talking to the family or to someone who has worked
                alongside them for years. There is no call center and no ticket number.
              </p>
            </div>
            <div className="grid gap-5 xs:grid-cols-2">
              <PhotoFrame label="Joseph IV" ratio="aspect-square" />
              <PhotoFrame label="Maria" ratio="aspect-square" />
            </div>
          </div>
        </div>
      </Section>

      {/* Family / mascot */}
      <Section tone="mint" labelledBy="family">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center md:gap-12">
          <div className="flex flex-col gap-5">
            <SectionHead
              eyebrow="Family business"
              title="A family company, literally"
              lede="Our beaver has a family too — which is about right for a company where the last name is on the truck. Four decades in, most of our customers came from a neighbor telling them to call us."
              id="family"
            />
            <dl className="grid gap-5 xs:grid-cols-3">
              <div className="card flex flex-col gap-2 bg-paper p-5">
                <dt className="display text-[0.875rem] text-forest">Years</dt>
                <dd>
                  <Numeral>40+</Numeral>
                </dd>
              </div>
              <div className="card flex flex-col gap-2 bg-paper p-5">
                <dt className="display text-[0.875rem] text-forest">Towns</dt>
                <dd>
                  <Numeral>{towns.length}</Numeral>
                </dd>
              </div>
              <div className="card flex flex-col gap-3 bg-paper p-5">
                <dt className="display text-[0.875rem] text-forest">Households</dt>
                <dd>
                  <Placeholder label="number of households served" />
                </dd>
              </div>
            </dl>
          </div>
          <Image
            src={poses.family.src}
            alt={poses.family.alt}
            width={poses.family.width}
            height={poses.family.height}
            sizes="(max-width: 1024px) 70vw, 360px"
            className="h-auto w-full max-w-[340px] justify-self-center"
          />
        </div>
      </Section>

      {/* Fleet */}
      <Section tone="forest" labelledBy="fleet">
        <SectionHead
          eyebrow="The fleet"
          title="Maintained in our own yard"
          lede="Rear loaders on the residential routes, roll-off trucks for the containers, all serviced at Beaver Brook Road. It is the reason a breakdown rarely costs you a pickup."
          tone="paper"
          id="fleet"
        />
        <div className="mt-10 grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div className="card bg-paper p-6">
            <Image
              src={poses.rearLoader.src}
              alt={poses.rearLoader.alt}
              width={poses.rearLoader.width}
              height={poses.rearLoader.height}
              sizes="(max-width: 768px) 88vw, 560px"
              className="h-auto w-full"
            />
          </div>
          <div className="flex flex-col gap-5">
            <div className="card flex flex-col gap-3 bg-paper p-6">
              <p className="display text-[0.875rem] text-forest">Trucks in the fleet</p>
              <Placeholder label="number of trucks in the fleet" />
            </div>
            <PhotoFrame label="the yard on Beaver Brook Road" />
          </div>
        </div>
      </Section>

      {/* Credentials — the one place the HRRA licence is mentioned */}
      <Section tone="page" labelledBy="credentials">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="card flex flex-col gap-4 p-6 xs:p-8">
            <h2 id="credentials" className="display text-subsection text-forest">
              Licensed and local
            </h2>
            <p className="text-lede text-ink/85">
              We are an {site.credential} — the Housatonic Resources Recovery Authority is the
              regional waste authority for this part of Connecticut, and its calendar is the one our
              recycling runs on.
            </p>
            <Placeholder label="confirm the current HRRA licence is up to date — the copy on file expired in 2024" />
            <address className="mt-auto flex flex-col gap-1 text-[0.9375rem] not-italic">
              <span className="font-semibold">{site.legalName}</span>
              <span>{site.address.full}</span>
              <a href={site.phoneHref} className="display text-forest">
                {site.phone}
              </a>
            </address>
          </div>

          <div className="card flex flex-col gap-4 bg-mint p-6 xs:p-8">
            <h2 className="display text-subsection text-forest">Still the same family</h2>
            <p className="text-lede text-ink/85">
              No holding company bought this business and no call centre answers the phone. The
              people who pick up your trash are the people whose name is on the truck.
            </p>
            <div className="mt-auto">
              <ButtonLink href="/contact" variant="forest">
                Start service
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
