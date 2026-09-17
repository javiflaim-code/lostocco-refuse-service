import Link from 'next/link';

/**
 * Jumping from a homepage card into a deep anchor left people unsure where they
 * were or how to get back. Every interior page opens with this trail.
 */
export function Breadcrumb({ label }: { label: string }) {
  return (
    <div className="band bg-mint">
      <nav aria-label="Breadcrumb" className="wrap py-3">
        <ol className="flex flex-wrap items-center gap-2 text-[0.9375rem]">
          <li>
            <Link
              href="/"
              className="display inline-flex min-h-[44px] items-center gap-2 text-[0.9375rem] text-forest underline underline-offset-4 hover:text-ink"
            >
              <span aria-hidden="true">←</span> Home
            </Link>
          </li>
          <li aria-hidden="true" className="text-ink/70">
            /
          </li>
          <li>
            <span aria-current="page" className="display inline-flex items-center text-ink">
              {label}
            </span>
          </li>
        </ol>
      </nav>
    </div>
  );
}
