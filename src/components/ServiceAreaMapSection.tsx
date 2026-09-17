'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { ServiceAreaMap } from '@/components/ServiceAreaMap';

/**
 * Keeps the selected town in the `town` query parameter so a town panel can be
 * linked to from the footer or shared directly.
 */
export function ServiceAreaMapSection() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onTownChange = useCallback(
    (slug: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('town', slug);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  return (
    <ServiceAreaMap
      activeTown={searchParams.get('town') ?? undefined}
      onTownChange={onTownChange}
    />
  );
}
