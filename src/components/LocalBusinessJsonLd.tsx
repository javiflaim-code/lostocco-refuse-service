import { site, siteUrl, towns } from '@/lib/site';

export function LocalBusinessJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteUrl}/#business`,
    name: site.legalName,
    alternateName: site.shortName,
    url: siteUrl,
    telephone: site.phone,
    email: site.email,
    image: `${siteUrl}/poses/beaver-waving-with-cart.png`,
    description:
      'Family-owned trash pickup, recycling and 10, 20 and 30 yard dumpster rentals serving greater Danbury, Connecticut.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.zip,
      addressCountry: 'US',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '17:00',
      },
    ],
    areaServed: towns.map((town) => ({
      '@type': 'City',
      name: town.name,
      address: { '@type': 'PostalAddress', addressRegion: 'CT', addressCountry: 'US' },
    })),
    sameAs: [site.social.facebook, site.social.instagram, site.social.x],
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
