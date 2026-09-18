import Image from 'next/image';
import type { ReactNode } from 'react';
import { poses, type PoseKey } from '@/lib/poses';

/**
 * The forest band at the top of every page: one h1 and the page's artwork.
 *
 * The content area carries a minimum height so the band is the same depth on
 * every route regardless of how much copy a page has — a hero that grew or
 * shrank per page made the site feel like several sites. It also keeps the
 * band short enough that the whole thing sits above the fold on a laptop.
 *
 * `pose` takes one key, or two for a paired composition — the trucks on the
 * services page sit side by side, angled toward each other.
 */
export function PageHero({
  eyebrow,
  title,
  lede,
  pose,
  poseWidth = 'w-[260px] xs:w-[320px] md:w-[400px]',
  artSide = 'right',
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lede: string;
  pose: PoseKey | [PoseKey, PoseKey];
  poseWidth?: string;
  artSide?: 'left' | 'right';
  children?: ReactNode;
}) {
  const pair = Array.isArray(pose);
  const artFirst = artSide === 'left';
  // A pose asked to fill its column needs the column to be wider, and needs a
  // wrapper that stretches — a shrink-to-fit cell leaves `w-full` nothing to
  // fill, which silently renders the art at a fraction of its intended size.
  const wideArt = poseWidth.startsWith('w-full');

  return (
    <section className="on-forest band bg-forest" aria-labelledby="page-heading">
      <div
        className={`wrap grid items-center gap-8 py-10 sm:py-12 md:min-h-[612px] md:py-14 ${
          pair
            ? 'md:grid-cols-[0.95fr_1.05fr]'
            : wideArt
              ? // A landscape banner earns the wider column; the copy beside it
                // still has room without the band getting any taller.
                artFirst
                ? 'md:grid-cols-[1.35fr_1fr]'
                : 'md:grid-cols-[1fr_1.35fr]'
              : 'md:grid-cols-[1fr_1fr]'
        }`}
      >
        <div className={`flex flex-col items-start gap-5 ${artFirst ? 'md:order-2' : ''}`}>
          <p className="display inline-flex rounded-full border-[2.5px] border-ink bg-amber px-4 py-1.5 text-[1rem] text-ink">
            {eyebrow}
          </p>
          <h1 id="page-heading" className="display display--hero text-section text-paper">
            {title}
          </h1>
          <p className="max-w-[54ch] text-lede text-mint">{lede}</p>
          {children}
        </div>

        <div
          className={[
            wideArt ? 'w-full' : '',
            'justify-self-center',
            artFirst ? 'md:order-1' : wideArt ? '' : 'md:justify-self-end',
          ]
            .filter(Boolean)
            .join(' ')}
        >
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
              sizes={
                wideArt
                  ? '(max-width: 768px) 92vw, (max-width: 1024px) 60vw, 680px'
                  : '(max-width: 768px) 65vw, (max-width: 1024px) 45vw, 400px'
              }
              className={`h-auto ${poseWidth} ${wideArt && !artFirst ? 'md:ml-auto' : ''}`}
            />
          )}
        </div>
      </div>
    </section>
  );
}
