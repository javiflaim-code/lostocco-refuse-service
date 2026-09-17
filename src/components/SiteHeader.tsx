'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { nav, site } from '@/lib/site';

function PhoneIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const drawerRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // The drawer stores the route it was opened on, so a route change closes it
  // on its own — no effect syncing state to the router.
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const open = openedOn === pathname;

  const setOpen = useCallback((next: boolean) => setOpenedOn(next ? pathname : null), [pathname]);

  // Lock scroll while the drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!open) return;

      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }

      if (event.key !== 'Tab' || !drawerRef.current) return;

      const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    },
    [open, setOpen],
  );

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);

  // Move focus into the drawer when it opens.
  useEffect(() => {
    if (open) {
      drawerRef.current?.querySelector<HTMLElement>('a[href], button')?.focus();
    }
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50">
      {/* Amber utility bar */}
      <div className="on-amber border-b-[3px] border-ink bg-amber">
        <div className="wrap flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-1.5">
          <a
            href={site.phoneHref}
            className="display inline-flex min-h-[44px] items-center gap-2 text-[0.875rem] text-ink"
          >
            <PhoneIcon />
            {site.phone}
          </a>
          <p className="hidden text-[0.875rem] font-semibold text-ink xs:block">
            Mon–Fri 8–5 · {site.credential}
          </p>
        </div>
      </div>

      {/* Forest nav */}
      <div className="on-forest border-b-[3.5px] border-ink bg-forest">
        <div className="wrap flex items-center justify-between gap-4 py-3">
          <Link
            href="/"
            className="display flex min-h-[44px] shrink-0 flex-col justify-center leading-none text-paper"
            aria-label={`${site.shortName} — home`}
          >
            <span className="text-[1.375rem] normal-case tracking-[0.05em] xs:text-[1.625rem]">
              LoStocco
            </span>
            <span className="text-[0.875rem] text-amber">Refuse Service</span>
          </Link>

          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                    className={`display flex min-h-[44px] items-center rounded-full px-3.5 text-[0.875rem] transition-colors ${
                      isActive(item.href)
                        ? 'bg-amber text-ink'
                        : 'text-mint hover:bg-paper/10 hover:text-paper'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="display hidden min-h-[44px] items-center rounded-full border-[3px] border-ink bg-amber px-5 text-[0.875rem] text-ink shadow-hard-sm transition-shadow hover:shadow-none xs:inline-flex"
            >
              Start Service
            </Link>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-controls="mobile-drawer"
              className="flex h-11 w-11 items-center justify-center rounded-full border-[3px] border-ink bg-paper text-ink md:hidden"
            >
              <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.75"
                strokeLinecap="round"
                aria-hidden="true"
              >
                {open ? (
                  <>
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </>
                ) : (
                  <>
                    <path d="M4 7h16" />
                    <path d="M4 12h16" />
                    <path d="M4 17h16" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {open ? (
        <div className="absolute left-0 right-0 top-full z-40 h-screen md:hidden">
          <button
            type="button"
            aria-label="Close menu"
            tabIndex={-1}
            onClick={() => setOpen(false)}
            className="absolute inset-0 h-full w-full cursor-default bg-ink/45"
          />
          <div
            ref={drawerRef}
            id="mobile-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="relative max-h-full overflow-y-auto border-b-[3.5px] border-ink bg-page px-5 pb-8 pt-5"
          >
            <ul className="flex flex-col gap-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                    className={`display flex min-h-[52px] items-center rounded-[14px] border-[3px] border-ink px-4 text-base ${
                      isActive(item.href) ? 'bg-amber text-ink' : 'bg-paper text-forest'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex flex-col gap-3">
              <Link
                href="/contact"
                className="display flex min-h-[52px] items-center justify-center rounded-full border-[3px] border-ink bg-forest px-5 text-base text-paper shadow-hard-ink"
              >
                Start Service
              </Link>
              <a
                href={site.phoneHref}
                className="display flex min-h-[52px] items-center justify-center gap-2 rounded-full border-[3px] border-ink bg-paper px-5 text-base text-ink"
              >
                <PhoneIcon />
                {site.phone}
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
