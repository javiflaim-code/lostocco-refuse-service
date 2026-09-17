import Image from 'next/image';
import { Numeral } from '@/components/ui';
import {
  BEAVER_NAME,
  curbsideReminders,
  keepOut,
  resources,
  unacceptableItemsUrl,
} from '@/lib/site';
import { poses } from '@/lib/poses';

export function CurbsideReminders({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  return (
    <ol className="grid gap-4 xs:grid-cols-3">
      {curbsideReminders.map((reminder, index) => (
        <li
          key={reminder}
          className={`card flex flex-col gap-3 p-5 ${tone === 'dark' ? 'bg-mint' : 'bg-paper'}`}
        >
          <Numeral decorative className="self-start">
            {index + 1}
          </Numeral>
          <p className="text-[0.9375rem]">{reminder}</p>
        </li>
      ))}
    </ol>
  );
}

export function KeepItOutGrid() {
  return (
    <ul className="grid gap-4 xs:grid-cols-2 md:grid-cols-3">
      {keepOut.map((entry) => (
        <li key={entry.item} className="card card-lift flex items-start gap-4 p-5">
          <span
            aria-hidden="true"
            className="display mt-0.5 inline-flex shrink-0 items-center justify-center rounded-full border-[3px] border-ink bg-warning px-3 py-1 text-[0.875rem] text-paper"
          >
            Nope!
          </span>
          <div>
            <h3 className="display text-cardhead text-forest">{entry.item}</h3>
            <p className="mt-1 text-[0.9375rem] text-ink/80">{entry.why}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function KeepItOutBlock({ pose = true }: { pose?: boolean }) {
  return (
    <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center md:gap-12">
      <div className="flex flex-col gap-6">
        <KeepItOutGrid />
        <p className="max-w-[60ch] text-[0.9375rem]">
          {BEAVER_NAME} would rather flag it now than leave it at your curb.{' '}
          <a
            href={unacceptableItemsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-forest underline underline-offset-4"
          >
            Read the full unacceptable-items list (PDF)
          </a>
          .
        </p>
      </div>
      {pose ? (
        <Image
          src={poses.keepOut.src}
          alt={poses.keepOut.alt}
          width={poses.keepOut.width}
          height={poses.keepOut.height}
          sizes="(max-width: 1024px) 70vw, 340px"
          className="h-auto w-full max-w-[340px] justify-self-center"
        />
      ) : null}
    </div>
  );
}

export function ResourceCards() {
  return (
    <ul className="grid gap-5 xs:grid-cols-2 md:grid-cols-4">
      {resources.map((resource) => {
        const isPdf = resource.href.endsWith('.pdf');
        return (
          <li key={resource.title} className="card card-lift flex flex-col">
            <a
              href={resource.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-full flex-col gap-3 p-5"
            >
              <span className="display inline-flex w-fit rounded-full border-[2.5px] border-ink bg-mint px-3 py-1 text-[0.875rem] text-forest">
                {isPdf ? 'PDF' : 'Website'}
              </span>
              <h3 className="display text-cardhead text-forest">{resource.title}</h3>
              <p className="text-[0.9375rem] text-ink/80">{resource.description}</p>
              <span className="display mt-auto pt-3 text-[0.875rem] text-forest">
                Open {isPdf ? 'PDF' : 'link'} →
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
