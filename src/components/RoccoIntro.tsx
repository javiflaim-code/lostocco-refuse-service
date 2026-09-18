import Image from 'next/image';
import { ButtonLink } from '@/components/ui';
import { BEAVER_NAME, site } from '@/lib/site';
import { poses } from '@/lib/poses';

/**
 * Rocco appears all over the site, so he introduces himself once, near the top,
 * and everything after that can just call him by name.
 */
export function RoccoIntro() {
  return (
    <section className="on-forest band bg-forest" aria-labelledby="rocco-intro">
      <div className="wrap grid items-center gap-8 py-10 sm:py-12 md:grid-cols-[auto_1fr] md:gap-12">
        <Image
          src={poses.hero.src}
          alt={poses.hero.alt}
          width={poses.hero.width}
          height={poses.hero.height}
          sizes="(max-width: 768px) 55vw, 300px"
          className="h-auto w-[200px] justify-self-center motion-safe:animate-bob xs:w-[250px] md:w-[300px]"
        />
        <div className="flex flex-col items-start gap-5">
          <h2 id="rocco-intro" className="display text-section text-paper">
            Hi, I’m {BEAVER_NAME}
          </h2>
          <p className="max-w-[54ch] text-lede text-mint">
            I ride along with the LoStocco crew. Whatever you need — a cart at the house, a
            container in the driveway, or just an answer about your pickup day — I’ll point you to
            the right place.
          </p>
          <div className="flex flex-wrap gap-4">
            <ButtonLink href="/services" variant="amber">
              See what we haul
            </ButtonLink>
            <ButtonLink href={site.phoneHref} variant="paper">
              {site.phone}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
