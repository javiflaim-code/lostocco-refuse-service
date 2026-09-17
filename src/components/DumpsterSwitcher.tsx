'use client';

import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { ButtonLink, Placeholder } from '@/components/ui';
import { BEAVER_NAME, dumpsters, site, unacceptableItemsUrl, type DumpsterSize } from '@/lib/site';
import { poses } from '@/lib/poses';

const sizes = dumpsters.map((d) => d.size);

function isSize(value: string | null): value is DumpsterSize {
  return value !== null && (sizes as readonly string[]).includes(value);
}

/**
 * The 10 / 20 / 30 yard picker. Selection lives in the `size` query parameter
 * so a specific size can be linked to directly.
 */
export function DumpsterSwitcher({ showScale = true }: { showScale?: boolean }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const raw = searchParams.get('size');
  const active: DumpsterSize = isSize(raw) ? raw : '20';
  const current = dumpsters.find((d) => d.size === active) ?? dumpsters[1];

  const select = useCallback(
    (size: DumpsterSize) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('size', size);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  // Relative silhouette widths so the sizes read as sizes, not as three equal boxes.
  const scale: Record<DumpsterSize, string> = { '10': '52%', '20': '74%', '30': '96%' };

  return (
    <div className="flex flex-col gap-8">
      <div role="group" aria-label="Choose a dumpster size" className="flex flex-wrap gap-3">
        {dumpsters.map((option) => {
          const selected = option.size === active;
          return (
            <button
              key={option.size}
              type="button"
              aria-pressed={selected}
              onClick={() => select(option.size)}
              className={`display min-h-[52px] rounded-full border-[3px] border-ink px-6 text-[0.9375rem] transition-shadow xs:text-base ${
                selected
                  ? 'bg-amber text-ink shadow-hard-ink'
                  : 'bg-paper text-forest hover:shadow-hard-ink'
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      <div className="grid gap-8 md:grid-cols-[1.05fr_1fr] md:items-start md:gap-10">
        <div className="card card-lift flex flex-col gap-5 p-6 xs:p-8">
          <div>
            <h3 className="display text-subsection text-forest">{current.label} Roll-Off</h3>
            <p className="mt-2 text-lede text-ink/85">{current.best}</p>
          </div>

          <div>
            <h4 className="display text-[0.875rem] text-forest">What usually fits</h4>
            <ul className="mt-3 flex flex-col gap-2">
              {current.fits.map((item) => (
                <li key={item} className="flex gap-3 text-[0.9375rem]">
                  <span aria-hidden="true" className="display shrink-0 text-forest">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <dl className="grid gap-3 border-t-[3px] border-ink/15 pt-5 xs:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <dt className="display text-[0.875rem] text-forest">Dimensions</dt>
              <dd>
                <Placeholder label={`${current.label} dimensions — L × W × H`} />
              </dd>
            </div>
            <div className="flex flex-col gap-1.5">
              <dt className="display text-[0.875rem] text-forest">Equals about</dt>
              <dd>
                <Placeholder label={`${current.label} — pickup-truck loads`} />
              </dd>
            </div>
          </dl>

          <div className="flex flex-wrap gap-3 pt-1">
            <ButtonLink href="/contact?service=dumpster" variant="forest">
              Request this size
            </ButtonLink>
            <ButtonLink href={site.phoneHref} variant="outline">
              {site.phone}
            </ButtonLink>
          </div>
        </div>

        {showScale ? (
          <div className="flex flex-col gap-4">
            <div className="card flex flex-col justify-end bg-mint p-6 xs:p-8">
              <p className="display mb-4 text-[0.875rem] text-forest">
                {BEAVER_NAME} at scale — {current.label}
              </p>
              <div className="flex items-end gap-4">
                <Image
                  src={poses.standing.src}
                  alt={poses.standing.alt}
                  width={poses.standing.width}
                  height={poses.standing.height}
                  sizes="(max-width: 768px) 25vw, 120px"
                  className="h-auto w-[84px] shrink-0 xs:w-[110px]"
                />
                <div className="flex-1">
                  <div
                    className="flex items-center justify-center rounded-[10px] border-[3px] border-ink bg-forest text-paper transition-all duration-200"
                    style={{
                      width: scale[active],
                      height: active === '10' ? 66 : active === '20' ? 92 : 118,
                    }}
                  >
                    <span className="display text-[0.875rem] text-amber">{current.label}</span>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-[0.875rem] text-ink/75">
                Relative sizes, drawn to compare. Exact dimensions are coming from the yard.
              </p>
            </div>

            <div className="card border-warning bg-paper p-5">
              <p className="display text-[0.875rem] text-warning">Never in a roll-off</p>
              <p className="mt-2 text-[0.9375rem]">
                Paint, chemicals, tires, electronics and appliances with refrigerant. If you are
                unsure, call before you load it.{' '}
                <a
                  href={unacceptableItemsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-forest underline underline-offset-4"
                >
                  See the full list (PDF)
                </a>
                .
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
