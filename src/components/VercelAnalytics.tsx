'use client';

import { useEffect } from 'react';
import { Analytics, type BeforeSendEvent } from '@vercel/analytics/next';

/**
 * Vercel Web Analytics with an internal-traffic opt-out.
 * Visiting any page with ?bls=internal marks this browser as internal
 * (localStorage.bls_internal = "1"), and nothing is sent while the flag is set.
 * ?bls=reset clears it. If storage is unavailable, tracking works normally.
 */
const FLAG = 'bls_internal';

function blsParam(url: string): string | null {
  try {
    return new URL(url, window.location.href).searchParams.get('bls');
  } catch {
    return null;
  }
}

function syncInternalFlag(url: string) {
  const value = blsParam(url);
  try {
    if (value === 'internal') localStorage.setItem(FLAG, '1');
    else if (value === 'reset') localStorage.removeItem(FLAG);
  } catch {
    // Storage blocked: fall back to normal tracking.
  }
}

function isInternal(url: string) {
  if (blsParam(url) === 'internal') return true;
  try {
    return localStorage.getItem(FLAG) === '1';
  } catch {
    return false;
  }
}

function beforeSend(event: BeforeSendEvent) {
  syncInternalFlag(event.url);
  return isInternal(event.url) ? null : event;
}

export function VercelAnalytics() {
  useEffect(() => syncInternalFlag(window.location.href), []);
  return <Analytics beforeSend={beforeSend} />;
}
