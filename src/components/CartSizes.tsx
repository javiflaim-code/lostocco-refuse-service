import Image from 'next/image';
import { ButtonLink, Placeholder } from '@/components/ui';
import { cartSizes, site } from '@/lib/site';
import { poses } from '@/lib/poses';

/**
 * The three curbside cart sizes. The artwork carries the comparison — all three
 * drawn to scale — so the text alongside only has to say who each one suits.
 */
export function CartSizes() {
  return (
    <div className="flex flex-col gap-10">
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
            <h3 className="display text-cardhead text-forest">{cart.label}</h3>
            <p className="text-[0.9375rem] text-ink/80">{cart.best}</p>
          </li>
        ))}
      </ul>

      <div className="grid gap-8 md:grid-cols-[1fr_1fr] md:items-center md:gap-12">
        <div className="flex flex-col gap-5">
          <p className="max-w-[58ch] text-[0.9375rem]">
            Tell us roughly how much your household puts out and we will bring the one that fits.{' '}
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
          <Image
            src={poses.rearLoaderAction.src}
            alt={poses.rearLoaderAction.alt}
            width={poses.rearLoaderAction.width}
            height={poses.rearLoaderAction.height}
            sizes="(max-width: 1024px) 92vw, 560px"
            className="h-auto w-full"
          />
          <p className="text-[0.9375rem] text-ink/75">
            The green rear loader empties these every week, and the recycling cart every other week.
          </p>
        </div>
      </div>
    </div>
  );
}
