import Image from 'next/image';
import type { ReactNode } from 'react';
import { poses, type PoseKey } from '@/lib/poses';

/**
 * Shared page header: forest band, one h1, one beaver pose.
 */
export function PageHero({
  eyebrow,
  title,
  lede,
  pose,
  poseWidth = 'w-[200px] xs:w-[250px] md:w-[300px]',
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lede: string;
  pose: PoseKey;
  poseWidth?: string;
  children?: ReactNode;
}) {
  const art = poses[pose];

  return (
    <section className="on-forest band bg-forest" aria-labelledby="page-heading">
      <div className="wrap grid items-center gap-8 py-12 sm:py-14 md:grid-cols-[1.15fr_0.85fr] md:py-16">
        <div className="flex flex-col items-start gap-5">
          <p className="display inline-flex rounded-full border-[2.5px] border-amber px-4 py-1.5 text-[0.875rem] text-amber">
            {eyebrow}
          </p>
          <h1 id="page-heading" className="display display--hero text-section text-paper">
            {title}
          </h1>
          <p className="max-w-[54ch] text-lede text-mint">{lede}</p>
          {children}
        </div>
        <div className="justify-self-center md:justify-self-end">
          <Image
            src={art.src}
            alt={art.alt}
            width={art.width}
            height={art.height}
            priority
            sizes="(max-width: 768px) 60vw, (max-width: 1024px) 40vw, 320px"
            className={`h-auto ${poseWidth}`}
          />
        </div>
      </div>
    </section>
  );
}
