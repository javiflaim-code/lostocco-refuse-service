import { ButtonLink, PhotoFrame, Placeholder } from '@/components/ui';
import { BEAVER_NAME, cartSizes, site } from '@/lib/site';

/**
 * The three curbside cart sizes. Heights are drawn in proportion so the sizes
 * read as sizes rather than three equal boxes.
 */
const height: Record<string, number> = { '45': 96, '65': 124, '95': 156 };

export function CartSizes() {
  return (
    <div className="grid gap-8 md:grid-cols-[1fr_1fr] md:items-center md:gap-12">
      <div className="flex flex-col gap-6">
        <ul className="grid gap-4 xs:grid-cols-3">
          {cartSizes.map((cart) => (
            <li key={cart.gallons} className="card card-lift flex flex-col gap-4 p-5 text-center">
              <div className="flex items-end justify-center" style={{ height: height['95'] }}>
                <div
                  aria-hidden="true"
                  className="flex w-full max-w-[86px] items-start justify-center rounded-b-[6px] rounded-t-[10px] border-[3px] border-ink bg-forest pt-2"
                  style={{ height: height[cart.gallons] }}
                >
                  <span className="display text-[0.9375rem] text-amber">{cart.gallons}</span>
                </div>
              </div>
              <div>
                <h3 className="display text-cardhead text-forest">{cart.label}</h3>
                <p className="mt-2 text-[0.9375rem] text-ink/80">{cart.best}</p>
              </div>
            </li>
          ))}
        </ul>

        <p className="max-w-[62ch] text-[0.9375rem]">
          Three cart sizes are available. Tell us roughly how much your household puts out and we
          will bring the one that fits.{' '}
          <Placeholder label="confirm which sizes apply to trash vs recycling" className="ml-1" />
        </p>

        <div className="flex flex-wrap gap-4">
          <ButtonLink href="/contact?service=start-trash" variant="forest">
            Start weekly pickup
          </ButtonLink>
          <ButtonLink href={site.phoneHref} variant="outline">
            {site.phone}
          </ButtonLink>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <PhotoFrame
          label={`new artwork — ${BEAVER_NAME} beside the 45, 65 and 95 gallon carts`}
          ratio="aspect-[4/3]"
        />
        <p className="text-[0.9375rem] text-ink/75">
          The green rear loader empties these every week, and the recycling cart every other week.
        </p>
      </div>
    </div>
  );
}
