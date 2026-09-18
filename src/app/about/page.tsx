import Image from 'next/image';
import type { Metadata } from 'next';
import { ButtonLink, Numeral, Section, SectionHead } from '@/components/ui';
import { PageHero } from '@/components/PageHero';
import { site, towns } from '@/lib/site';
import { poses } from '@/lib/poses';

export const metadata: Metadata = {
  title: 'About — A Local Family Business, Over 40 Years',
  description:
    'Joseph LoStocco III founded LoStocco Refuse Service and ran it for almost forty years. His children, Joseph IV and Maria, run it today from the same yard on Beaver Brook Road in Danbury.',
  alternates: { canonical: '/about' },
};

const fleet = [
  {
    pose: 'rearLoaderAction' as const,
    title: 'Rear loader',
    body: 'Runs the weekly residential routes and the bi-weekly recycling.',
  },
  {
    pose: 'rollOffAction' as const,
    title: 'Roll-off truck',
    body: 'Drops and pulls the 10, 20 and 30 yard containers.',
  },
  {
    pose: 'frontLoader' as const,
    title: 'Front loader',
    body: 'Lifts the larger containers at buildings and job sites.',
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Local. Family. Over 40 years."
        lede="LoStocco Refuse Service has been hauling in greater Danbury for over 40 years. Same family, same yard, same way of doing business."
        pose="badge"
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

      {/* Family business first */}
      <Section tone="mint" labelledBy="family">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center md:gap-12">
          <div className="flex flex-col gap-5">
            <SectionHead
              eyebrow="Family business"
              title="A family company, literally"
              lede="The last name is on the truck. Over four decades in, most of our customers came from a neighbor telling them to call us."
              id="family"
            />
            <dl className="grid gap-5 xs:grid-cols-3">
              <div className="card flex flex-col gap-3 bg-paper p-5">
                <dt className="display text-[0.875rem] text-forest">Years in business</dt>
                <dd>
                  <Numeral>40+</Numeral>
                </dd>
              </div>
              <div className="card flex flex-col gap-3 bg-paper p-5">
                <dt className="display text-[0.875rem] text-forest">Trucks in the fleet</dt>
                <dd>
                  <Numeral>10+</Numeral>
                </dd>
              </div>
              <div className="card flex flex-col gap-3 bg-paper p-5">
                <dt className="display text-[0.875rem] text-forest">Towns served</dt>
                <dd>
                  <Numeral>{towns.length}</Numeral>
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

      {/* Then the tribute to the founder */}
      <Section tone="bone" labelledBy="joe-three">
        <div className="grid gap-8 md:grid-cols-[auto_1fr] md:items-start md:gap-12">
          <Image
            src={poses.josephPhoto.src}
            alt={poses.josephPhoto.alt}
            width={poses.josephPhoto.width}
            height={poses.josephPhoto.height}
            sizes="(max-width: 1024px) 60vw, 320px"
            className="frame h-auto w-full max-w-[320px] justify-self-center"
          />
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
        </div>
      </Section>

      {/* Then who runs it now */}
      <Section tone="page" labelledBy="next-gen">
        <div className="grid gap-8 md:grid-cols-[auto_1fr] md:items-center md:gap-12">
          <Image
            src={poses.nextGeneration.src}
            alt={poses.nextGeneration.alt}
            width={poses.nextGeneration.width}
            height={poses.nextGeneration.height}
            sizes="(max-width: 1024px) 60vw, 320px"
            className="h-auto w-[230px] justify-self-center xs:w-[300px]"
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
          </div>
        </div>
      </Section>

      {/* Fleet — three trucks, same size, big */}
      <Section tone="forest" labelledBy="fleet">
        <SectionHead
          eyebrow="The fleet"
          title="Maintained in our own yard"
          lede="Everything is serviced at Beaver Brook Road. It is the reason a breakdown rarely costs you a pickup."
          tone="paper"
          id="fleet"
        />
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {fleet.map((truck) => (
            <li key={truck.title} className="card flex flex-col gap-4 bg-paper p-6">
              <Image
                src={poses[truck.pose].src}
                alt={poses[truck.pose].alt}
                width={poses[truck.pose].width}
                height={poses[truck.pose].height}
                sizes="(max-width: 1024px) 88vw, 400px"
                className="h-auto w-full"
              />
              <h3 className="display text-cardhead text-forest">{truck.title}</h3>
              <p className="text-[0.9375rem] text-ink/80">{truck.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Credentials */}
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
              No holding company bought this business and no call center answers the phone. The
              people who pick up your trash are the people whose name is on the truck.
            </p>
            <div className="mt-auto">
              <ButtonLink href="/contact" variant="forest">
                Get a Quote
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
