import Image from 'next/image';
import type { ReactNode } from 'react';
import { poses, type PoseKey } from '@/lib/poses';

/**
 * Shared page header: forest band, one h1, and the page's artwork.
 * `pose` takes one key, or two for a paired composition — the trucks on the
 * services page sit side by side, angled toward each other.
 */
export function PageHero({
  eyebrow,
  title,
  lede,
  pose,
  poseWidth = 'w-[260px] xs:w-[320px] md:w-[400px]',
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lede: string;
  pose: PoseKey | [PoseKey, PoseKey];
  poseWidth?: string;
  children?: ReactNode;
}) {
  const pair = Array.isArray(pose);

  return (
    <section className="on-forest band bg-forest" aria-labelledby="page-heading">
      <div
        className={`wrap grid items-center gap-8 py-10 sm:py-12 md:py-14 ${
          pair ? 'md:grid-cols-[0.95fr_1.05fr]' : 'md:grid-cols-[1fr_1fr]'
        }`}
      >
        <div className="flex flex-col items-start gap-5">
          <p className="display inline-flex rounded-full border-[2.5px] border-amber px-4 py-1.5 text-[0.9375rem] text-amber">
            {eyebrow}
          </p>
          <h1 id="page-heading" className="display display--hero text-section text-paper">
            {title}
          </h1>
          <p className="max-w-[54ch] text-lede text-mint">{lede}</p>
          {children}
        </div>

        <div className="justify-self-center md:justify-self-end">
          {pair ? (
            <div className="flex w-full max-w-[560px] items-end">
              <Image
                src={poses[pose[0]].src}
                alt={poses[pose[0]].alt}
                width={poses[pose[0]].width}
                height={poses[pose[0]].height}
                priority
                sizes="(max-width: 1024px) 45vw, 300px"
                className="h-auto w-[58%] -rotate-3"
              />
              <Image
                src={poses[pose[1]].src}
                alt={poses[pose[1]].alt}
                width={poses[pose[1]].width}
                height={poses[pose[1]].height}
                priority
                sizes="(max-width: 1024px) 45vw, 300px"
                className="-ml-[10%] h-auto w-[58%] rotate-3"
              />
            </div>
          ) : (
            <Image
              src={poses[pose].src}
              alt={poses[pose].alt}
              width={poses[pose].width}
              height={poses[pose].height}
              priority
              sizes="(max-width: 768px) 65vw, (max-width: 1024px) 45vw, 400px"
              className={`h-auto ${poseWidth}`}
            />
          )}
        </div>
      </div>
    </section>
  );
}
