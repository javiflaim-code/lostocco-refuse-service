'use client';

import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { ButtonLink, Placeholder } from '@/components/ui';
import { BEAVER_NAME, dumpsters, site, type DumpsterSize } from '@/lib/site';
import { poses } from '@/lib/poses';

const sizes = dumpsters.map((d) => d.size);

function isSize(value: string | null): value is DumpsterSize {
  return value !== null && (sizes as readonly string[]).includes(value);
}

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
              className={`display min-h-[56px] rounded-full border-[3px] border-ink px-7 text-[1.0625rem] tracking-[0.05em] transition-shadow ${
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
            <div className="card flex flex-col bg-mint p-6 xs:p-8">
              <p className="display mb-5 text-[0.875rem] text-forest">All three, to scale</p>
              <Image
                src={poses.dumpsterSizes.src}
                alt={poses.dumpsterSizes.alt}
                width={poses.dumpsterSizes.width}
                height={poses.dumpsterSizes.height}
                sizes="(max-width: 1024px) 92vw, 520px"
                className="h-auto w-full"
              />
              <p className="mt-5 text-[0.9375rem] text-ink/75">
                A 30 yard is about as tall as {BEAVER_NAME} and roughly twice the length of a 10
                yard. Exact dimensions are coming from the yard.
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
