import Image from 'next/image';
import { ButtonLink } from '@/components/ui';
import { cartSizes, site } from '@/lib/site';
import { poses } from '@/lib/poses';

/**
 * Curbside pickup leads — the truck emptying a cart at the curb — and the three
 * cart sizes follow it, because the sizes only make sense once you know what
 * the service is.
 */
export function CartSizes() {
  return (
    <div className="flex flex-col gap-12">
      <div className="grid gap-6 md:grid-cols-[1.15fr_1fr] md:items-center md:gap-10">
        <Image
          src={poses.rearLoaderAction.src}
          alt={poses.rearLoaderAction.alt}
          width={poses.rearLoaderAction.width}
          height={poses.rearLoaderAction.height}
          sizes="(max-width: 1024px) 94vw, 640px"
          className="h-auto w-full"
        />
        <div className="flex flex-col gap-5">
          <p className="text-lede">
            The green rear loader runs your street every week. Put the cart at the curb the night
            before, leave two feet between the trash and recycling carts, and we take it from there.
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
      </div>

      <div id="cart-sizes" className="flex flex-col gap-6">
        <div>
          <h3 className="display text-subsection text-forest">And three cart sizes</h3>
          <p className="mt-3 max-w-[60ch] text-lede text-ink/85">
            Tell us roughly how much your household puts out and we will bring the one that fits.
          </p>
        </div>

        <Image
          src={poses.cartSizes.src}
          alt={poses.cartSizes.alt}
          width={poses.cartSizes.width}
          height={poses.cartSizes.height}
          sizes="(max-width: 1024px) 94vw, 880px"
          className="mx-auto h-auto w-full max-w-[880px]"
        />

        <ul className="grid gap-4 xs:grid-cols-3">
          {cartSizes.map((cart) => (
            <li key={cart.gallons} className="card card-lift flex flex-col gap-2 p-5">
              <h4 className="display text-cardhead text-forest">{cart.label}</h4>
              <p className="text-[0.9375rem] text-ink/80">{cart.best}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
