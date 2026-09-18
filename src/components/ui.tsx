import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';

type ButtonVariant = 'forest' | 'amber' | 'outline' | 'paper';

const buttonVariants: Record<ButtonVariant, string> = {
  forest: 'bg-forest text-paper shadow-hard-ink hover:shadow-hard-amber',
  amber: 'bg-amber text-ink shadow-hard-ink hover:shadow-hard',
  outline: 'bg-transparent text-ink hover:bg-mint',
  paper: 'bg-paper text-ink shadow-hard-ink hover:shadow-hard-amber',
};

const buttonBase =
  'display inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border-[3px] border-ink px-7 py-3 text-[0.95rem] xs:text-base transition-shadow duration-150';

export function ButtonLink({
  href,
  variant = 'forest',
  children,
  className = '',
  ...rest
}: {
  href: string;
  variant?: ButtonVariant;
  children: ReactNode;
  className?: string;
} & Omit<ComponentProps<typeof Link>, 'href' | 'className'>) {
  const external = href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:');

  if (external) {
    return (
      <a
        href={href}
        className={`${buttonBase} ${buttonVariants[variant]} ${className}`}
        {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={`${buttonBase} ${buttonVariants[variant]} ${className}`} {...rest}>
      {children}
    </Link>
  );
}

export function SectionHead({
  eyebrow,
  title,
  lede,
  tone = 'ink',
  align = 'left',
  id,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  tone?: 'ink' | 'paper';
  align?: 'left' | 'center';
  id?: string;
}) {
  const alignment = align === 'center' ? 'text-center mx-auto items-center' : 'items-start';
  return (
    <div className={`flex max-w-[60ch] flex-col gap-4 ${alignment}`}>
      {eyebrow ? (
        // A bubble rather than a quiet line — the section labels were reading as
        // throwaway text, so they now match the pills used elsewhere.
        <p
          className={`display inline-flex rounded-full border-[2.5px] px-4 py-1.5 text-[1rem] ${
            tone === 'paper' ? 'border-amber text-amber' : 'border-ink bg-amber text-ink'
          }`}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={id}
        className={`display text-section ${tone === 'paper' ? 'text-paper' : 'text-forest'}`}
      >
        {title}
      </h2>
      {lede ? (
        <p className={`text-lede ${tone === 'paper' ? 'text-mint' : 'text-ink/85'}`}>{lede}</p>
      ) : null}
    </div>
  );
}

/**
 * Renders a visibly marked gap the client still has to fill.
 * Deliberately styled so it cannot be mistaken for finished copy.
 */
export function Placeholder({
  label,
  className = '',
  as: Tag = 'span',
}: {
  label: string;
  className?: string;
  as?: 'span' | 'div' | 'p';
}) {
  return (
    <Tag
      className={`inline-block rounded-[10px] border-[2px] border-dashed border-ink/35 bg-ink/[0.04] px-3 py-1.5 font-body text-[0.875rem] font-semibold uppercase leading-snug tracking-wide text-ink/75 ${className}`}
    >
      [Placeholder — {label}]
    </Tag>
  );
}

/**
 * A styled empty frame standing in for a real photo. Never a stretched stock image.
 */
export function PhotoFrame({
  label,
  ratio = 'aspect-[4/3]',
  className = '',
}: {
  label: string;
  ratio?: string;
  className?: string;
}) {
  return (
    <div
      className={`frame flex ${ratio} w-full items-center justify-center bg-bone p-6 ${className}`}
      role="img"
      aria-label={`Photo placeholder: ${label}`}
    >
      <div className="flex flex-col items-center gap-3 text-center">
        <svg
          width="34"
          height="34"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#14211A"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="opacity-40"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="m21 15-5-5L5 21" />
        </svg>
        <span className="font-body text-[0.875rem] font-semibold uppercase tracking-wide text-ink/75">
          [Photo — {label}]
        </span>
      </div>
    </div>
  );
}

/**
 * Display numerals. Amber only reaches ~2:1 as text on our light surfaces, so
 * the numeral sits on an amber chip in ink type instead — same accent, legible.
 */
export function Numeral({
  children,
  size = 'md',
  decorative = false,
  className = '',
}: {
  children: ReactNode;
  size?: 'md' | 'lg';
  decorative?: boolean;
  className?: string;
}) {
  const sizes = {
    md: 'text-[1.75rem] px-3.5 py-1',
    lg: 'text-[2.25rem] px-4 py-1.5',
  };
  return (
    <span
      aria-hidden={decorative || undefined}
      className={`display inline-flex items-center justify-center rounded-[12px] border-[3px] border-ink bg-amber leading-none text-ink ${sizes[size]} ${className}`}
    >
      {children}
    </span>
  );
}

export function Section({
  children,
  className = '',
  id,
  labelledBy,
  tone,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  labelledBy?: string;
  tone?: 'forest' | 'mint' | 'bone' | 'paper' | 'page';
}) {
  const tones: Record<string, string> = {
    forest: 'bg-forest on-forest',
    mint: 'bg-mint',
    bone: 'bg-bone',
    paper: 'bg-paper',
    page: 'bg-page',
  };
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`band py-14 xs:py-16 sm:py-20 md:py-24 ${tone ? tones[tone] : ''} ${className}`}
    >
      <div className="wrap">{children}</div>
    </section>
  );
}
