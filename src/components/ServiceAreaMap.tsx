'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { ButtonLink } from '@/components/ui';
import { site, towns, type Town } from '@/lib/site';

/**
 * Rough geographic placement of the five towns, projected from their real
 * latitude and longitude onto a 560 × 420 canvas. A diagram, not a survey map.
 */
const placement: Record<string, { x: number; y: number; w: number; h: number }> = {
  'new-fairfield': { x: 90, y: 113, w: 138, h: 92 },
  brookfield: { x: 284, y: 96, w: 128, h: 86 },
  danbury: { x: 172, y: 265, w: 160, h: 104 },
  bethel: { x: 252, y: 313, w: 118, h: 80 },
  newtown: { x: 472, y: 223, w: 146, h: 104 },
};

export function ServiceAreaMap({
  activeTown,
  onTownChange,
}: {
  activeTown?: string;
  onTownChange: (slug: string) => void;
}) {
  // The selected town is owned by the URL (see ServiceAreaMapSection), so this
  // component derives it rather than keeping a second copy in state.
  const active: Town = towns.find((t) => t.slug === activeTown) ?? towns[0];
  const panelRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  const select = (town: Town) => onTownChange(town.slug);

  // Move focus to the detail panel on selection, but not on first paint.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    panelRef.current?.focus();
  }, [active.slug]);

  return (
    <div className="grid gap-8 md:grid-cols-[1.15fr_1fr] md:items-start md:gap-10">
      <div className="card overflow-hidden bg-mint p-4 xs:p-6">
        <svg
          viewBox="6 38 554 330"
          role="group"
          aria-label="Map of the five Connecticut towns LoStocco Refuse Service covers"
          className="h-auto w-full"
        >
          <title>Towns served by LoStocco Refuse Service</title>

          {/* Stylized road lines behind the towns */}
          <g stroke="#1B4D2E" strokeOpacity="0.2" strokeWidth="3" fill="none" aria-hidden="true">
            <path d="M6 190 L560 155" />
            <path d="M190 38 L285 368" />
            <path d="M6 330 L560 300" />
          </g>

          {towns.map((town) => {
            const box = placement[town.slug];
            const selected = town.slug === active.slug;
            return (
              <g
                key={town.slug}
                role="button"
                tabIndex={0}
                aria-pressed={selected}
                aria-label={`${town.name}, Connecticut`}
                onClick={() => select(town)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    select(town);
                  }
                }}
                className="cursor-pointer outline-offset-4 focus-visible:outline-[3px] focus-visible:outline-ink"
              >
                <rect
                  x={box.x - box.w / 2}
                  y={box.y - box.h / 2}
                  width={box.w}
                  height={box.h}
                  rx="16"
                  fill={selected ? '#F2A50C' : '#FFFFFF'}
                  stroke="#14211A"
                  strokeWidth="3.5"
                />
                <text
                  x={box.x}
                  y={box.y + 6}
                  textAnchor="middle"
                  fill="#14211A"
                  style={{
                    fontFamily: 'var(--font-display), Impact, sans-serif',
                    fontSize: town.name.length > 9 ? 17 : 20,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                  }}
                >
                  {town.name}
                </text>
                {town.note ? (
                  <circle
                    cx={box.x + box.w / 2 - 14}
                    cy={box.y - box.h / 2 + 14}
                    r="8"
                    fill="#C0392B"
                    stroke="#14211A"
                    strokeWidth="2.5"
                  />
                ) : null}
              </g>
            );
          })}

          {/* Our yard, tucked inside the Danbury tile so it does not sit on the label */}
          <g aria-hidden="true">
            <circle cx="108" cy="300" r="7" fill="#1B4D2E" stroke="#14211A" strokeWidth="2.5" />
          </g>
        </svg>

        <p className="mt-4 text-[0.875rem] text-ink/75">
          Pick a town for details. The dark dot is our yard on Beaver Brook Road. A red mark means
          that town runs its own recycling calendar.
        </p>
      </div>

      <div
        ref={panelRef}
        tabIndex={-1}
        aria-live="polite"
        className="card card-lift flex flex-col gap-5 p-6 outline-none xs:p-8"
      >
        <div>
          <p className="display text-[0.875rem] text-forest">Now showing</p>
          <h3 className="display mt-1 text-subsection text-forest">{active.name}, CT</h3>
        </div>

        <p className="text-lede">{active.blurb}</p>

        <dl className="grid gap-4 border-y-[3px] border-ink/15 py-5 xs:grid-cols-2">
          <div>
            <dt className="display text-[0.875rem] text-forest">Trash</dt>
            <dd className="mt-1 text-[0.9375rem]">{active.trash}</dd>
          </div>
          <div>
            <dt className="display text-[0.875rem] text-forest">Recycling</dt>
            <dd className="mt-1 text-[0.9375rem]">{active.recycling}</dd>
          </div>
        </dl>

        {active.note ? (
          <p className="rounded-[14px] border-[3px] border-warning bg-paper px-4 py-3 text-[0.9375rem]">
            <span className="display text-[0.875rem] text-warning">Heads up · </span>
            {active.note}
          </p>
        ) : null}

        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/contact" variant="forest">
            Start service here
          </ButtonLink>
          <ButtonLink href={site.phoneHref} variant="outline">
            {site.phone}
          </ButtonLink>
        </div>

        <p className="text-[0.875rem] text-ink/75">
          Just outside these five towns?{' '}
          <Link href="/contact" className="font-semibold text-forest underline underline-offset-4">
            Ask us
          </Link>{' '}
          — we cover nearby areas too.
        </p>
      </div>
    </div>
  );
}
