const defaultItems = [
  'Weekly curbside trash',
  'Bi-weekly recycling',
  '10 · 20 · 30 yard roll-offs',
  'Same-day answers from a real person',
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
    <div className="on-amber overflow-hidden border-b-[3.5px] border-ink bg-amber py-4">
      <div
        className="flex w-max animate-marquee gap-12 whitespace-nowrap motion-reduce:animate-none"
        aria-hidden="true"
      >
        {doubled.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="display marquee flex items-center gap-12 text-[1.0625rem] text-ink xs:text-[1.25rem]"
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
