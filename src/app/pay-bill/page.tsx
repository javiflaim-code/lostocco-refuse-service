import Image from 'next/image';
import type { Metadata } from 'next';
import { ButtonLink, Numeral, PhotoFrame, Section, SectionHead } from '@/components/ui';
import { PageHero } from '@/components/PageHero';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BEAVER_NAME, site } from '@/lib/site';
import { poses } from '@/lib/poses';

export const metadata: Metadata = {
  title: 'Pay Your Bill',
  description:
    'Pay your LoStocco Refuse Service bill online, or call the office at 203-743-9940 during business hours to pay over the phone.',
  alternates: { canonical: '/pay-bill' },
};

const steps = [
  'Open the payment page — it runs on our billing provider, in a new tab.',
  'Enter your account number from the top of your invoice.',
  'Pay, and keep the confirmation the provider emails you.',
];

export default function PayBillPage() {
  return (
    <>
      <PageHero
        eyebrow="Billing"
        title="Pay your bill"
        lede="Payments are handled on our billing provider’s secure page. Or call the office and we will take it over the phone — some people prefer that, and that is fine."
        pose="portrait"
      >
        <div className="flex flex-wrap gap-4">
          <ButtonLink href={site.payBillUrl} variant="amber">
            Pay online
          </ButtonLink>
          <ButtonLink href={site.phoneHref} variant="paper">
            Call {site.phone}
          </ButtonLink>
        </div>
      </PageHero>

      <Breadcrumb label="Pay Bill" />

      <Section tone="page" labelledBy="how-it-works">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-start md:gap-12">
          <div className="flex flex-col gap-8">
            <SectionHead
              eyebrow="Online"
              title="Three steps"
              lede="The payment page is not part of this website — it is our billing provider’s own portal, which is why it looks different."
              id="how-it-works"
            />
            <ol className="grid gap-5 xs:grid-cols-3">
              {steps.map((step, index) => (
                <li key={step} className="card flex flex-col gap-3 bg-mint p-5">
                  <Numeral decorative className="self-start">
                    {index + 1}
                  </Numeral>
                  <p className="text-[0.9375rem]">{step}</p>
                </li>
              ))}
            </ol>
            <div>
              <ButtonLink href={site.payBillUrl} variant="forest">
                Go to the payment page
              </ButtonLink>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4">
            <Image
              src={poses.standing.src}
              alt={poses.standing.alt}
              width={poses.standing.width}
              height={poses.standing.height}
              sizes="(max-width: 1024px) 45vw, 210px"
              className="h-auto w-[160px] xs:w-[200px]"
            />
            <PhotoFrame
              label={`new ${BEAVER_NAME} artwork for Pay Bill`}
              ratio="aspect-[4/5]"
              className="w-[180px]"
            />
          </div>
        </div>
      </Section>

      <Section tone="mint" labelledBy="by-phone">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="card flex flex-col gap-4 p-6 xs:p-8">
            <h2 id="by-phone" className="display text-subsection text-forest">
              Rather pay by phone?
            </h2>
            <p className="text-lede text-ink/85">
              Call the office and we will handle it while you are on the line. Have your invoice
              nearby if you can.
            </p>
            <a href={site.phoneHref} className="display mt-auto text-section text-forest">
              {site.phone}
            </a>
            <p className="text-[0.9375rem] text-ink/75">
              {site.hours.weekdays}
              <br />
              {site.hours.weekend}
            </p>
          </div>

          <div className="card flex flex-col gap-4 bg-paper p-6 xs:p-8">
            <h2 className="display text-subsection text-forest">A question about a charge?</h2>
            <p className="text-lede text-ink/85">
              Billing questions go to the same office as everything else. Send the details and we
              will look at the account and call you back.
            </p>
            <div className="mt-auto flex flex-wrap gap-3">
              <ButtonLink href="/contact?service=billing" variant="forest">
                Ask about a bill
              </ButtonLink>
              <ButtonLink href={site.emailHref} variant="outline">
                Email us
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
