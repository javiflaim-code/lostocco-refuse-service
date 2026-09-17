const defaultItems = [
  'Weekly curbside trash',
  'Bi-weekly recycling',
  '10 · 20 · 30 yard roll-offs',
  'HRRA licensed hauler',
  'Danbury · Brookfield · Bethel · New Fairfield · Newtown',
  'Family owned since the 1980s',
];

/**
 * Amber strip under the hero. Scrolls horizontally; the CSS reduced-motion
 * block in globals.css stops it for anyone who asks for less movement.
 */
export function Marquee({ items = defaultItems }: { items?: string[] }) {
  const doubled = [...items, ...items];

  return (
    <div className="on-amber overflow-hidden border-b-[3.5px] border-ink bg-amber py-3">
      <div
        className="flex w-max animate-marquee gap-10 whitespace-nowrap motion-reduce:animate-none"
        aria-hidden="true"
      >
        {doubled.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="display marquee flex items-center gap-10 text-[0.875rem] text-ink xs:text-base"
          >
            {item}
            <span aria-hidden="true" className="text-forest">
              ★
            </span>
          </span>
        ))}
      </div>
      <p className="sr-only">{items.join('. ')}.</p>
    </div>
  );
}
