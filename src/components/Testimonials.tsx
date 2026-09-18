import { testimonialIntro, testimonials } from '@/lib/site';

/**
 * Published customer comments, quoted as written and attributed to where they
 * were posted. No photographs — the reviews are the point.
 */
export function Testimonials({ heading = 'What people say' }: { heading?: string }) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="display text-subsection text-forest">{heading}</h3>
        <p className="mt-3 max-w-[64ch] text-lede text-ink/85">{testimonialIntro}</p>
      </div>

      <ul className="grid gap-5 xs:grid-cols-2 md:grid-cols-3">
        {testimonials.map((entry) => (
          <li key={entry.name} className="card card-lift flex flex-col gap-4 bg-paper p-6">
            <span className="display text-[0.875rem] text-forest" aria-hidden="true">
              ★★★★★
            </span>
            <blockquote className="text-[0.9375rem] text-ink/85">“{entry.quote}”</blockquote>
            <footer className="mt-auto border-t-[3px] border-ink/15 pt-4">
              <p className="display text-[0.875rem] text-forest">{entry.name}</p>
              <p className="text-[0.875rem] text-ink/70">{entry.source}</p>
            </footer>
          </li>
        ))}
      </ul>
    </div>
  );
}
