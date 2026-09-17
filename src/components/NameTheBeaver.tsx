'use client';

import Image from 'next/image';
import { useSyncExternalStore } from 'react';
import { BEAVER_NAME, beaverNameOptions } from '@/lib/site';
import { poses } from '@/lib/poses';

const STORAGE_KEY = 'lostocco-beaver-vote';

/**
 * The vote lives in localStorage — an external store, read through
 * useSyncExternalStore so the server render and the client stay honest.
 * Private browsing or blocked storage simply means the pick is not remembered.
 */
const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  window.addEventListener('storage', onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener('storage', onChange);
  };
}

function getSnapshot(): string | null {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function getServerSnapshot(): string | null {
  return null;
}

function write(name: string | null) {
  try {
    if (name === null) window.localStorage.removeItem(STORAGE_KEY);
    else window.localStorage.setItem(STORAGE_KEY, name);
  } catch {
    /* no-op */
  }
  listeners.forEach((listener) => listener());
}

export function NameTheBeaver() {
  const vote = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const cast = (name: string) => write(name);
  const clear = () => write(null);

  return (
    <div className="grid gap-8 md:grid-cols-[auto_1fr] md:items-center md:gap-12">
      <Image
        src={poses.portrait.src}
        alt={poses.portrait.alt}
        width={poses.portrait.width}
        height={poses.portrait.height}
        sizes="(max-width: 768px) 45vw, 260px"
        className="h-auto w-[180px] justify-self-center motion-safe:animate-bob xs:w-[220px] md:w-[260px]"
      />

      <div className="flex flex-col gap-5">
        <div>
          <p className="display text-[0.875rem] text-amber">Help us out</p>
          <h2 id="name-the-beaver" className="display mt-2 text-section text-paper">
            Our beaver needs a name
          </h2>
          <p className="mt-3 max-w-[54ch] text-lede text-mint">
            We call him {BEAVER_NAME} for now, but nothing is settled. Pick the one that sounds
            right and we will count it up.
          </p>
        </div>

        {vote ? (
          <div
            role="status"
            className="card flex flex-col items-start gap-3 bg-paper p-5 xs:flex-row xs:items-center xs:justify-between"
          >
            <p className="text-[0.9375rem]">
              Thanks — you voted for <strong className="display text-forest">{vote}</strong>. We
              will let everyone know what wins.
            </p>
            <button
              type="button"
              onClick={clear}
              className="display min-h-[44px] shrink-0 rounded-full border-[2.5px] border-ink px-5 text-[0.875rem] text-forest hover:bg-mint"
            >
              Change my vote
            </button>
          </div>
        ) : (
          <fieldset className="flex flex-col gap-3">
            <legend className="display mb-1 text-[0.875rem] text-mint">Cast your vote</legend>
            <div className="flex flex-wrap gap-3">
              {beaverNameOptions.map((name) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => cast(name)}
                  className="display min-h-[48px] rounded-full border-[3px] border-ink bg-paper px-6 text-[0.9375rem] text-forest shadow-hard-ink transition-shadow hover:shadow-none"
                >
                  {name}
                </button>
              ))}
            </div>
          </fieldset>
        )}

        <p className="text-[0.875rem] text-mint/75">
          Votes are stored in your browser only. Nothing is sent anywhere.
        </p>
      </div>
    </div>
  );
}
