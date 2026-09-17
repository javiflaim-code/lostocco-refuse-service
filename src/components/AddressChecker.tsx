'use client';

import Link from 'next/link';
import { useState } from 'react';
import { site, towns } from '@/lib/site';

type Result = { kind: 'match'; town: string } | { kind: 'unknown' } | { kind: 'empty' } | null;

/**
 * Matches the typed address against the five town names we serve. Deliberately
 * simple — it is a fast answer, not a routing database, and anything it does
 * not recognize is sent to the office rather than turned away.
 */
export function AddressChecker() {
  const [value, setValue] = useState('');
  const [result, setResult] = useState<Result>(null);

  const check = () => {
    const query = value.trim().toLowerCase();
    if (!query) {
      setResult({ kind: 'empty' });
      return;
    }

    const found = towns.find((town) => {
      const name = town.name.toLowerCase();
      return query.includes(name) || query.includes(name.replace(/\s/g, ''));
    });

    setResult(found ? { kind: 'match', town: found.name } : { kind: 'unknown' });
  };

  return (
    <div className="card flex flex-col gap-5 bg-paper p-6 xs:p-8">
      <div className="flex flex-col gap-2">
        <label htmlFor="address-check" className="display text-[0.875rem] text-forest">
          Check an address
        </label>
        <p className="text-[0.875rem] text-ink/75">
          Type the street and town — for example, “12 Main St, Bethel”.
        </p>
      </div>

      <div className="flex flex-col gap-3 xs:flex-row">
        <input
          id="address-check"
          type="text"
          value={value}
          autoComplete="street-address"
          onChange={(event) => {
            setValue(event.target.value);
            setResult(null);
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              check();
            }
          }}
          placeholder="Street and town"
          className="min-h-[48px] w-full rounded-[14px] border-[3px] border-ink bg-page px-4 py-3 text-[0.9375rem] placeholder:text-ink/40"
        />
        <button
          type="button"
          onClick={check}
          className="display min-h-[48px] shrink-0 rounded-full border-[3px] border-ink bg-forest px-7 text-[0.875rem] text-paper shadow-hard-ink transition-shadow hover:shadow-hard-amber"
        >
          Check
        </button>
      </div>

      <div aria-live="polite" className="min-h-[24px]">
        {result?.kind === 'match' ? (
          <p className="rounded-[14px] border-[3px] border-forest bg-mint px-4 py-3 text-[0.9375rem]">
            <span className="display text-[0.875rem] text-forest">Yes — </span>
            we service {result.town}.{' '}
            <Link
              href="/contact"
              className="font-semibold text-forest underline underline-offset-4"
            >
              Start service
            </Link>{' '}
            or call{' '}
            <a
              href={site.phoneHref}
              className="font-semibold text-forest underline underline-offset-4"
            >
              {site.phone}
            </a>
            .
          </p>
        ) : null}

        {result?.kind === 'unknown' ? (
          <p className="rounded-[14px] border-[3px] border-amber bg-paper px-4 py-3 text-[0.9375rem]">
            <span className="display text-[0.875rem] text-forest">Give us a call — </span>
            that is outside the five towns listed here, but we do cover nearby areas. Call{' '}
            <a
              href={site.phoneHref}
              className="font-semibold text-forest underline underline-offset-4"
            >
              {site.phone}
            </a>{' '}
            and we will tell you straight.
          </p>
        ) : null}

        {result?.kind === 'empty' ? (
          <p className="text-[0.9375rem] font-semibold text-warning">
            Enter a street and town first.
          </p>
        ) : null}
      </div>
    </div>
  );
}
