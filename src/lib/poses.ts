/**
 * The beaver art. Each pose is used deliberately — never the same pose twice
 * on one page. Alt text describes what is actually in the drawing.
 */
export const poses = {
  hero: {
    src: '/poses/beaver-waving-with-cart.png',
    width: 467,
    height: 700,
    alt: 'The LoStocco beaver mascot in a white LRS work shirt, waving and wheeling a green LoStocco trash cart.',
  },
  standing: {
    src: '/poses/beaver-standing.png',
    width: 467,
    height: 700,
    alt: 'The LoStocco beaver mascot standing beside a green LoStocco trash cart.',
  },
  measuring: {
    src: '/poses/beaver-measuring-dumpster.png',
    width: 560,
    height: 700,
    alt: 'The LoStocco beaver in a tool belt, running a tape measure along the top of a green roll-off dumpster.',
  },
  keepOut: {
    src: '/poses/beaver-not-in-the-cart.png',
    width: 700,
    height: 525,
    alt: 'The LoStocco beaver in a hi-vis vest beside a trash cart, holding up a hand in front of a pile of tires, paint, a propane tank, a car battery, lumber and a broken chair under a red no symbol.',
  },
  recycling: {
    src: '/poses/beaver-sorting-recycling.png',
    width: 560,
    height: 700,
    alt: 'The LoStocco beaver emptying a plastic bottle before dropping it into a green recycling cart filled with flattened cardboard, cans and bottles.',
  },
  map: {
    src: '/poses/beaver-pointing-at-map.png',
    width: 560,
    height: 700,
    alt: 'The LoStocco beaver pointing to a map on an easel with pins in Danbury, Bethel, Brookfield and New Fairfield.',
  },
  quote: {
    src: '/poses/beaver-taking-a-call.png',
    width: 560,
    height: 700,
    alt: 'The LoStocco beaver wearing a phone headset, writing on a clipboard.',
  },
  family: {
    src: '/poses/beaver-family.png',
    width: 665,
    height: 700,
    alt: 'A family of five beaver mascots in LoStocco shirts and ball caps, gathered together with a small recycling bin.',
  },
  badge: {
    src: '/poses/beaver-forty-years-badge.png',
    width: 560,
    height: 700,
    alt: 'The LoStocco beaver holding up a navy and white seal that reads Over 40 Years.',
  },
  nextGeneration: {
    src: '/poses/beaver-next-generation.png',
    width: 560,
    height: 700,
    alt: 'The adult LoStocco beaver with two young beavers in green shirts, one holding a small LoStocco recycling bin.',
  },
  rollOff: {
    src: '/poses/beaver-driving-roll-off-truck.png',
    width: 700,
    height: 525,
    alt: 'The LoStocco beaver waving from the cab of a red roll-off truck carrying a green LoStocco container.',
  },
  rearLoader: {
    src: '/poses/beaver-driving-rear-loader.png',
    width: 700,
    height: 467,
    alt: 'The LoStocco beaver waving from the cab of a green LoStocco rear-loader packer truck, with a trash cart at the curb beside it.',
  },
  calendar: {
    src: '/poses/beaver-holding-calendar.png',
    width: 583,
    height: 700,
    alt: 'The LoStocco beaver in a winter coat and Santa hat, holding a calendar with the 25th circled in red.',
  },
  threePoses: {
    src: '/poses/beaver-three-poses.png',
    width: 700,
    height: 310,
    alt: 'Three views of the LoStocco beaver: peeking out of a trash cart, walking and pointing back over his shoulder, and waving mid-stride.',
  },
  signoff: {
    src: '/poses/beaver-tipping-cap.png',
    width: 467,
    height: 700,
    alt: 'The LoStocco beaver tipping his ball cap beside a green LoStocco trash cart.',
  },
  portrait: {
    src: '/poses/beaver-portrait.png',
    width: 700,
    height: 700,
    alt: 'Head-and-shoulders portrait of the LoStocco beaver mascot in his red and black ball cap.',
  },
} as const;

export type PoseKey = keyof typeof poses;
