/**
 * Every verified fact about the business lives here.
 * Nothing about LoStocco should be typed into a component directly.
 */

/**
 * The mascot is Rocco. Change it here and it changes everywhere.
 */
export const BEAVER_NAME = 'Rocco';

export const site = {
  legalName: 'LoStocco Refuse Service, LLC',
  shortName: 'LoStocco Refuse Service',
  tagline: 'Family-owned hauling in Danbury since the 1980s.',
  phone: '203-743-9940',
  phoneHref: 'tel:+12037439940',
  email: 'lostoccocustomerservice@gmail.com',
  emailHref: 'mailto:lostoccocustomerservice@gmail.com',
  address: {
    street: '79 Beaver Brook Road',
    city: 'Danbury',
    state: 'CT',
    zip: '06810',
    full: '79 Beaver Brook Road, Danbury, CT 06810',
  },
  hours: {
    weekdays: 'Monday – Friday, 8:00 a.m. – 5:00 p.m.',
    weekend: 'Saturday & Sunday, closed',
  },
  credential: 'HRRA licensed hauler',
  payBillUrl: 'https://www.lostoccoct.com/pay-bill-online',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=79+Beaver+Brook+Road+Danbury+CT+06810',
  mapsEmbedUrl:
    'https://www.google.com/maps?q=79+Beaver+Brook+Road,+Danbury,+CT+06810&output=embed',
  social: {
    facebook: 'https://www.facebook.com/people/LoStocco-Refuse-Service/100064027661184/',
    instagram: 'https://www.instagram.com/lostoccorefuseservices',
    x: 'https://x.com/LostoccoRefuse',
  },
} as const;

export const towns = [
  {
    slug: 'danbury',
    name: 'Danbury',
    blurb:
      'Home base. Our yard is on Beaver Brook Road, so Danbury routes run first and we can usually answer a question about your street the same day.',
    trash: 'Weekly curbside',
    recycling: 'Bi-weekly, on the standard HRRA calendar',
    note: null,
  },
  {
    slug: 'brookfield',
    name: 'Brookfield',
    blurb:
      'Weekly trash and bi-weekly recycling throughout town, plus roll-off delivery for driveway and jobsite work.',
    trash: 'Weekly curbside',
    recycling: 'Bi-weekly, on the standard HRRA calendar',
    note: null,
  },
  {
    slug: 'bethel',
    name: 'Bethel',
    blurb:
      'Residential and commercial pickup across Bethel. Same carts, same two-foot spacing rule, same crew you already know.',
    trash: 'Weekly curbside',
    recycling: 'Bi-weekly, on the standard HRRA calendar',
    note: null,
  },
  {
    slug: 'new-fairfield',
    name: 'New Fairfield',
    blurb:
      'Weekly trash and bi-weekly recycling, including the lake roads. Winter weather moves these routes more than most, so put it out the night before.',
    trash: 'Weekly curbside',
    recycling: 'Bi-weekly, on the standard HRRA calendar',
    note: null,
  },
  {
    slug: 'newtown',
    name: 'Newtown',
    blurb:
      'Full residential and commercial service in Newtown, with roll-offs available for cleanouts and renovations.',
    trash: 'Weekly curbside',
    recycling: 'Bi-weekly, on Newtown’s own calendar',
    note: 'Newtown runs its own recycling calendar — it does not match the other four towns. Download the Newtown calendar before you set your carts out.',
  },
] as const;

export type Town = (typeof towns)[number];

export const cartSizes = [
  {
    gallons: '45',
    label: '45 Gallon',
    best: 'The smallest cart. Fine for a couple or a household that fills one bag a week.',
  },
  {
    gallons: '65',
    label: '65 Gallon',
    best: 'The middle size, and the one most families land on.',
  },
  {
    gallons: '95',
    label: '95 Gallon',
    best: 'The largest cart. Bigger households, or anyone who would rather not think about it.',
  },
] as const;

export const dumpsters = [
  {
    size: '10',
    label: '10 Yard',
    best: 'Small cleanouts, a bathroom remodel, a garage you finally got to.',
    fits: [
      'One room of furniture and boxes',
      'A single-bath demolition',
      'Deck boards from a small deck',
      'Yard debris and brush',
    ],
    dimensions: null,
    truckLoads: null,
  },
  {
    size: '20',
    label: '20 Yard',
    best: 'The size most people want. Whole-floor cleanouts, roofing, a kitchen.',
    fits: [
      'A full basement or attic cleanout',
      'Kitchen cabinets, counters and flooring',
      'Roof tear-off',
      'A mid-size renovation',
    ],
    dimensions: null,
    truckLoads: null,
  },
  {
    size: '30',
    label: '30 Yard',
    best: 'Whole-house cleanouts, big renovations, commercial and construction work.',
    fits: [
      'An entire house cleanout',
      'Large additions and framing debris',
      'Commercial fit-outs',
      'Multi-room demolition',
    ],
    dimensions: null,
    truckLoads: null,
  },
] as const;

export type DumpsterSize = (typeof dumpsters)[number]['size'];

export const services = [
  {
    slug: 'residential-trash',
    title: 'Residential Trash',
    summary: 'Weekly curbside pickup at your house, on the same day every week.',
    body: 'One cart, one day a week, picked up by a crew that knows the street. If your day ever changes for a holiday we post the schedule ahead of time and you can download it here.',
    pose: 'rearLoader',
  },
  {
    slug: 'recycling',
    title: 'Recycling',
    summary: 'Bi-weekly single-stream recycling. Newtown runs its own calendar.',
    body: 'Cardboard, paper, metal cans, glass bottles and plastic containers go in loose — no bags. Recycling runs every other week. If you live in Newtown, use the Newtown calendar, not the general one.',
    pose: 'recycling',
  },
  {
    slug: 'commercial',
    title: 'Commercial Trash & Recycling',
    summary: 'Scheduled service for offices, restaurants, shops and multi-family buildings.',
    body: 'We size the container and the pickup frequency to what you actually throw away, and we adjust it when your volume changes. Call and we will come look at the space.',
    pose: 'rollOff',
  },
  {
    slug: 'dumpster-rentals',
    title: 'Dumpster Rentals',
    summary: '10, 20 and 30 yard roll-off containers, delivered and picked up.',
    body: 'Cleanouts, remodels, roofing and construction. We deliver the container where you want it, protect the driveway, and take it away when you are done.',
    pose: 'measuring',
  },
  {
    slug: 'bulk-pickups',
    title: 'Bulk & Special Pickups',
    summary: 'For the things that do not fit in a cart.',
    body: null,
    pose: 'quote',
  },
] as const;

/** Reminders, worded as the client wrote them. */
export const curbsideReminders = [
  'All trash should be out at the curb the night before.',
  'Please leave at least two feet of space between the trash and recycling carts.',
  'Winter routes may run earlier or differently. When in doubt, put it out!',
] as const;

export const keepOut = [
  { item: 'Wood', why: 'Lumber, boards and pallets' },
  { item: 'Broken furniture', why: 'Couches, chairs, mattresses' },
  { item: 'Paint', why: 'Wet or dried, cans included' },
  { item: 'Chemicals', why: 'Solvents, cleaners, pool chemicals' },
  { item: 'Electronics', why: 'TVs, monitors, computers' },
  { item: 'Tires', why: 'Any size, on or off the rim' },
] as const;

export const resources = [
  {
    title: '2026 Holiday Schedule',
    description: 'Which holidays move your pickup day, and to when.',
    href: 'https://irp.cdn-website.com/aeebe00b/files/uploaded/2026+Holiday+schedule+%282%29.pdf',
  },
  {
    title: '2026 Recycling Calendar',
    description: 'The bi-weekly recycling weeks for Danbury, Brookfield, Bethel and New Fairfield.',
    href: 'https://irp.cdn-website.com/aeebe00b/files/uploaded/2026+Recycle+calendar.pdf',
  },
  {
    title: '2026 Newtown Recycling Calendar',
    description: 'Newtown only. Its weeks do not match the other four towns.',
    href: 'https://irp.cdn-website.com/aeebe00b/files/uploaded/2026+Newtown+Recycle+calendar.pdf',
  },
  {
    title: 'HRRA Recycling Brochure (English & Spanish)',
    description: 'What belongs in the recycling cart, from the regional authority.',
    href: 'https://irp.cdn-website.com/aeebe00b/files/uploaded/lostocco%20flyer.pdf',
  },
  {
    title: 'Recycling Contamination Letter',
    description: 'Why a contaminated load gets rejected, and how to avoid it.',
    href: 'https://irp.cdn-website.com/aeebe00b/files/uploaded/Recycle%20Contamination%20Letter.pdf',
  },
  {
    title: 'Yearly Reminders to Customers',
    description: 'The reminders we send out every year, in one page.',
    href: 'https://irp.cdn-website.com/aeebe00b/files/uploaded/YEARLY%20REMINDERS%20TO%20CUSTOMERS%202023.pdf',
  },
  {
    title: 'Unacceptable Pick Up Items List',
    description: 'The full list of what we cannot take at the curb.',
    href: 'https://irp.cdn-website.com/aeebe00b/files/uploaded/Unacceptable%20Pick%20Up%20Items%20List.pdf',
  },
  {
    title: 'HRRA Hazardous Waste Drop-off Days',
    description: 'Where to bring paint, chemicals and other household hazardous waste.',
    href: 'https://hrra.org/household-hazardous-waste/',
  },
] as const;

export const unacceptableItemsUrl =
  'https://irp.cdn-website.com/aeebe00b/files/uploaded/Unacceptable%20Pick%20Up%20Items%20List.pdf';

export const nav = [
  { href: '/services', label: 'Services' },
  { href: '/dumpsters', label: 'Dumpsters' },
  { href: '/service-area', label: 'Service Area' },
  { href: '/resources', label: 'Resources' },
  { href: '/about', label: 'About' },
  { href: '/pay-bill', label: 'Pay Bill' },
  { href: '/contact', label: 'Contact' },
] as const;

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://lostocco-refuse-service.vercel.app';
