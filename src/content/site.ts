export const SITE = {
  name: 'Pierce O’Brien Piano',
  owner: 'Pierce O’Brien',
  domain: 'https://www.pierceobrienpiano.com',
  locale: 'en-US',
  launchReady: import.meta.env.PUBLIC_LAUNCH_READY === 'true',
  coreMessage: 'A refined ear for unmatched beauty.',
  defaultDescription:
    'Performance-level piano tuning, repair, and refinement for Salt Lake City from Pierce O’Brien Piano.',
  booking: {
    href: 'https://gazelleapp.io/scheduling/96knDrjXX3V40FVCG3cmzBgq',
    internalPath: '/book-contact/',
    gazelleUrl: 'https://gazelleapp.io/scheduling/96knDrjXX3V40FVCG3cmzBgq',
    textUrl: null,
    quoteDestination: null,
  },
  contact: {
    phone: null,
    email: null,
    hours: null,
    publicAddress: null,
  },
  serviceArea: {
    publicSummary: 'Based in Sandy / Cottonwood Heights and serving Salt Lake City.',
    travelPolicy:
      'Travel is included within 20 miles of Pierce’s service base. Beyond that, travel is billed at $0.65 per mile round trip.',
  },
  serviceScope: {
    instruments: 'Acoustic upright, grand, player, historic, and antique pianos',
  },
  appointmentPolicies: {
    payments: 'Cash, check, bank transfer, and digital wallet',
    sameDayCancellation: '$100',
    sameDayReschedule: '$50',
  },
  credentials: {
    publicRPTWording: 'RPT',
    publicPTGWording: 'Member of the Piano Technicians Guild (PTG)',
    apprenticeshipWording:
      'Apprentice with Don Tuttle, a former Baldwin factory technician with 70 years of experience.',
  },
  proof: {
    approvedReviews: [],
    approvedReviewCount: null,
    approvedClients: [],
    approvedPianosServiced: 1000,
  },
  pricing: {
    tuning: '$225',
    pitchRaise: '$75–$150 additional',
    repairs: '$120 per hour, billed in 15-minute increments',
    lightCleaning: '$75',
    deepCleaning: '$200',
    discounts: null,
  },
} as const;

export const pendingFacts = [
  {
    group: 'Contact and booking',
    items: [
      'Public phone number and text-message workflow',
      'Public business email and quote-request destination',
      'Public hours and response expectations',
    ],
  },
  {
    group: 'Location and travel',
    items: [
      'Google Business Profile service-area configuration',
      'Confirmation that the residential service origin remains private',
    ],
  },
  {
    group: 'Credentials and proof',
    items: ['Permissioned reviews, named clients, and testimonial excerpts'],
  },
  {
    group: 'Commercial terms',
    items: [
      'Voicing price and estimated appointment length',
      'Last-minute or emergency availability conditions',
      'Discount eligibility, dates, exclusions, and stacking rules',
    ],
  },
] as const;

export const NAVIGATION = [
  { label: 'Tuning', href: '/piano-tuning/' },
  { label: 'About Pierce', href: '/about-pierce/' },
  { label: 'Services', href: '/services/' },
  { label: 'FAQ', href: '/pricing-faq/#faq' },
  { label: 'Resources', href: '/piano-care-resources/' },
] as const;

export type ContentSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  pending?: string;
};

export type Service = {
  slug: string;
  title: string;
  railTitle: string;
  metaTitle: string;
  metaDescription: string;
  summary: string;
  introduction: string;
  image: 'tuning' | 'tuningDetail' | 'regulation' | 'voicing' | 'cleaning' | 'hero';
  imageAlt: string;
  sections: ContentSection[];
  related: string[];
};

export const SERVICES: Service[] = [
  {
    slug: 'piano-tuning',
    title: 'Piano Tuning',
    railTitle: 'Piano tuning',
    metaTitle: 'Piano Tuning | Pierce O’Brien Piano',
    metaDescription:
      'Learn how piano tuning addresses pitch, what an assessment considers, and when a piano may need related care.',
    summary: 'Pitch-focused service with careful listening and a whole-instrument assessment.',
    introduction:
      'Pierce tunes by ear, assessing the piano’s pitch, condition, touch, and tonal character before tuning. Pitch raises and post-move care begin with the same whole-instrument perspective.',
    image: 'tuningDetail',
    imageAlt: 'Pierce O’Brien tuning a grand piano with its lid open',
    sections: [
      {
        heading: 'What tuning addresses',
        paragraphs: [
          'Tuning focuses on pitch. It brings strings and unisons into a musical relationship so the instrument can sound more settled and coherent across the keyboard.',
          'The appointment also creates a natural opportunity to notice touch, tone, or mechanical concerns that may call for a different service.',
        ],
      },
      {
        heading: 'When tuning is not the whole answer',
        paragraphs: [
          'A significantly flat piano may need a pitch raise before a fine tuning. Mechanical or response concerns may point to repair or regulation, while tonal concerns may call for voicing.',
        ],
      },
      {
        heading: 'Price, scope, and care interval',
        paragraphs: [
          `A fine tuning is ${SITE.pricing.tuning} and typically takes about two hours. It includes an assessment, fine tuning, light dusting, and an exterior wipe-down.`,
          'Pierce recommends two to four tunings each year. A piano that is cared for on a regular schedule is more likely to stay closer to pitch than one left untuned for long periods.',
          'Playing time, humidity, and temperature changes can all affect pitch. Even a piano that is not being played can gradually move away from tune as its strings and structure respond to changing conditions.',
        ],
      },
    ],
    related: ['pitch-raise', 'regulation', 'voicing', 'tuning-after-moving'],
  },
  {
    slug: 'pitch-raise',
    title: 'Pitch Raise',
    railTitle: 'Pitch raise',
    metaTitle: 'Pitch Raise for Pianos | Pierce O’Brien Piano',
    metaDescription:
      'Understand what a piano pitch raise is, why an in-person assessment matters, and how it relates to fine tuning.',
    summary:
      'Preliminary pitch correction for a piano that is significantly below its intended level.',
    introduction:
      'A pitch raise is a preliminary correction for a piano that is significantly flat. The need for one cannot be diagnosed reliably from a web page; Pierce determines it after assessing the instrument.',
    image: 'hero',
    imageAlt: 'Pierce O’Brien working at the strings of a grand piano',
    sections: [
      {
        heading: 'Why a pitch raise can come first',
        paragraphs: [
          'When a piano is substantially below pitch, bringing every string closer to the intended level changes tension across the instrument. A preliminary correction gives the following fine tuning a more workable foundation.',
        ],
      },
      {
        heading: 'Assessment before assumption',
        paragraphs: [
          'The piano’s starting pitch, condition, history, and the owner’s goals all matter. The service decision should follow an in-person assessment rather than a remote promise.',
        ],
      },
      {
        heading: 'Price and appointment length',
        paragraphs: [
          `A pitch raise is ${SITE.pricing.pitchRaise} to the standard tuning price, depending on the piano’s starting pitch and condition. A pitch-raise appointment typically takes about three hours.`,
        ],
      },
    ],
    related: ['piano-tuning', 'tuning-after-moving'],
  },
  {
    slug: 'tuning-after-moving',
    title: 'Tuning After Moving',
    railTitle: 'Tuning after moving',
    metaTitle: 'Piano Tuning After Moving | Pierce O’Brien Piano',
    metaDescription:
      'Plan a piano assessment after a move and understand why a new environment can affect pitch and stability.',
    summary: 'Post-move assessment and tuning shaped by the piano’s condition and new environment.',
    introduction:
      'A move changes a piano’s environment and may reveal pitch, stability, or mechanical concerns. Pierce offers post-move tuning and evaluates whether the piano needs a standard tuning or a broader first step.',
    image: 'hero',
    imageAlt: 'Pierce O’Brien working at the strings of a grand piano',
    sections: [
      {
        heading: 'The new environment matters',
        paragraphs: [
          'Temperature and humidity affect wooden parts, felt, and string tension. The condition before the move and the new room both shape what the piano may need next.',
        ],
      },
      {
        heading: 'No universal waiting-period promise',
        paragraphs: [
          'The right timing depends on the move, the piano, and the new environment. Share when it was moved and what you notice so the appointment can begin with useful context.',
        ],
      },
      {
        heading: 'Coverage and travel',
        paragraphs: [
          'Pierce is based in Sandy / Cottonwood Heights and serves Salt Lake City. Travel is included within 20 miles of the service base; beyond that, travel is billed at $0.65 per mile round trip.',
        ],
      },
    ],
    related: ['piano-tuning', 'pitch-raise', 'service-area-travel'],
  },
  {
    slug: 'piano-repairs',
    title: 'Piano Repairs',
    railTitle: 'Piano repairs',
    metaTitle: 'Piano Repair Assessment | Pierce O’Brien Piano',
    metaDescription:
      'Request a piano repair assessment and learn which service details will be confirmed before work begins.',
    summary:
      'Assessment-led help for mechanical concerns, with scope confirmed before work begins.',
    introduction:
      'Pierce offers piano repair services, beginning with an assessment of the instrument and the concern you have noticed. Repair scope should be confirmed before any public promise about parts, cost, or outcome.',
    image: 'regulation',
    imageAlt: 'The exposed action and hammers of an upright piano',
    sections: [
      {
        heading: 'Start with what you notice',
        paragraphs: [
          'Useful intake details include the piano type, the sound or behavior that concerns you, when it began, whether the piano was recently moved, and clear photos when they help show the issue.',
        ],
      },
      {
        heading: 'Assessment keeps the scope honest',
        paragraphs: [
          'Pianos contain interconnected mechanical systems. An in-person look helps separate a focused repair from an issue that belongs to regulation, tuning, or another kind of care.',
        ],
      },
      {
        heading: 'Rates and workmanship policy',
        paragraphs: [
          `Repair work is ${SITE.pricing.repairs}. Repairs are guaranteed: if a repaired item fails, Pierce will return in most cases to address it at no additional charge.`,
          'Tunings are different: every piano gradually moves out of tune over time, even after careful tuning. The next tuning interval depends on the piano, playing, and environment.',
        ],
      },
    ],
    related: ['regulation', 'piano-tuning', 'pre-purchase-inspection'],
  },
  {
    slug: 'regulation',
    title: 'Piano Regulation',
    railTitle: 'Regulation',
    metaTitle: 'Piano Regulation | Pierce O’Brien Piano',
    metaDescription:
      'Learn how piano regulation addresses touch and action response when tuning alone does not solve the playing experience.',
    summary: 'Thoughtful work on touch and action response beyond pitch alone.',
    introduction:
      'Regulation addresses the mechanical relationships inside the piano action. It is the service to consider when the piano’s touch and response need more attention than tuning can provide.',
    image: 'regulation',
    imageAlt: 'The exposed action and hammers of an upright piano during service',
    sections: [
      {
        heading: 'Regulation: touch and response',
        paragraphs: [
          'Regulation focuses on the mechanical relationships inside the piano action. Its goal is more consistent response and control, with the exact scope determined by the instrument’s condition.',
          'All pianos are candidates for regulation. The assessment identifies whether regulation is the appropriate next step for the action in front of Pierce.',
        ],
      },
      {
        heading: 'A scope shaped by the instrument',
        paragraphs: [
          'A touch-up may take a few hours. More extensive work may involve taking the action to Pierce’s workshop and returning it in a day or two, rather than spending full days in the home.',
        ],
      },
      {
        heading: 'Pricing within the service',
        paragraphs: [
          'Regulation is quoted by the hour after assessment. A touch-up regulation can be $200, and a full regulation can be up to $1,000.',
        ],
      },
    ],
    related: ['piano-tuning', 'voicing', 'piano-repairs'],
  },
  {
    slug: 'voicing',
    title: 'Piano Voicing',
    railTitle: 'Voicing',
    metaTitle: 'Piano Voicing | Pierce O’Brien Piano',
    metaDescription:
      'Learn how piano voicing shapes tonal character through careful work on the hammers and a conversation about the player’s goals.',
    summary: 'Careful work on tonal character, shaped around the player and instrument.',
    introduction:
      'Voicing shapes how the hammers interact with the strings and therefore how the piano’s tone is perceived. It follows a conversation about the instrument and the player’s goals.',
    image: 'voicing',
    imageAlt: 'Close view of piano hammers and action parts during tonal service',
    sections: [
      {
        heading: 'What voicing changes',
        paragraphs: [
          'Voicing attends to tonal character rather than pitch alone. It can help a piano speak with more evenness, color, and clarity when the condition of the hammers and the player’s preferences point in that direction.',
          'All pianos are candidates for voicing. If the hammers are already in good shape, voicing can proceed from the desired tonal direction.',
        ],
      },
      {
        heading: 'A tonal decision made together',
        paragraphs: [
          'Voicing typically begins with reshaping the hammers. Pierce begins with one note, brings it toward the desired feel and sound, then models that result across the remaining hammers with the client involved in the tonal decisions.',
        ],
      },
      {
        heading: 'Follow-up care',
        paragraphs: [
          'Major voicing adjustments include a complimentary follow-up appointment after two to three weeks of playing to even out the voicing.',
        ],
      },
    ],
    related: ['piano-tuning', 'regulation', 'piano-repairs'],
  },
  {
    slug: 'piano-cleaning',
    title: 'Piano Cleaning',
    railTitle: 'Piano cleaning',
    metaTitle: 'Piano Cleaning Service | Pierce O’Brien Piano',
    metaDescription:
      'Compare the planned light and deep piano-cleaning scopes and learn why final service details depend on the instrument.',
    summary: 'Light and deep cleaning options, with final scope matched to the instrument.',
    introduction:
      'Pierce offers piano cleaning in two levels: a lighter visit focused on accessible surfaces and a deeper service involving more extensive access and detailing. Final scope depends on the piano’s construction and condition.',
    image: 'cleaning',
    imageAlt: 'A polished Kawai grand piano with its lid open',
    sections: [
      {
        heading: 'Light cleaning',
        paragraphs: [
          `Light cleaning is ${SITE.pricing.lightCleaning}. It focuses on the exterior and the interior areas that can be reached without extensively taking the instrument apart, and is recommended once each year.`,
        ],
      },
      {
        heading: 'Deep cleaning',
        paragraphs: [
          `Deep cleaning is ${SITE.pricing.deepCleaning}. It includes a more extensive interior clean: removing keys, vacuuming accessible interior dust, cleaning under the keys, polishing key pins and hardware, dusting the soundboard, and restorative detailing where appropriate.`,
        ],
      },
      {
        heading: 'Packages, cadence, and pricing',
        paragraphs: [
          'Deep cleaning is recommended every three to five years. When it is combined with a fine tuning, plan on at least four hours for the appointment.',
        ],
      },
    ],
    related: ['piano-tuning', 'piano-repairs'],
  },
  {
    slug: 'pre-purchase-inspection',
    title: 'Pre-Purchase Inspection & Consulting',
    railTitle: 'Pre-purchase guidance',
    metaTitle: 'Pre-Purchase Piano Inspection | Pierce O’Brien Piano',
    metaDescription:
      'Get a technician’s perspective before buying a used piano, with inspection scope and limits confirmed in advance.',
    summary: 'A technician’s perspective before you commit to a used piano.',
    introduction:
      'Pierce offers pre-purchase inspections and purchase consulting for people considering a used piano. The purpose is to add a technician’s perspective before a buying decision, not to promise a particular outcome or future value.',
    image: 'regulation',
    imageAlt: 'Close view of an upright piano action ready for inspection',
    sections: [
      {
        heading: 'Why an inspection can help',
        paragraphs: [
          'Appearance alone does not reveal pitch condition, action response, tonal concerns, or every mechanical issue. A technician can help you ask better questions about the instrument in front of you.',
        ],
      },
      {
        heading: 'Know the limits',
        paragraphs: [
          'An inspection is a professional observation at a moment in time. The final service description should clearly state what is examined, what is documented, and what is outside the scope.',
        ],
      },
      {
        heading: 'Deliverable and price',
        paragraphs: [
          'A pre-purchase inspection considers a comprehensive set of factors, including whether the tuning pins will hold and the condition of the action and strings. The assessment remains exploratory rather than limited to a finite checklist.',
          'When Pierce attends the buyer’s play-test, the assessment is normally delivered verbally. When he visits a piano alone, he provides a written summary of the assessment.',
          'Pre-purchase inspections use the same service area and travel-fee structure as regular appointments. An inspection takes up to one hour and costs $100 plus travel.',
        ],
      },
    ],
    related: ['piano-repairs', 'piano-tuning'],
  },
];

export const SERVICE_BY_SLUG = new Map(SERVICES.map((service) => [service.slug, service]));

export const SERVICE_CATEGORIES = [
  {
    anchor: 'tuning',
    title: 'Tuning',
    summary: 'Tuning, pitch raises, and post-move care shaped by the whole instrument.',
    description:
      'Keeps the piano at proper pitch and helps it perform consistently as seasonal humidity and regular playing affect the instrument.',
    price: '$225 fine tuning · pitch raise $75–$150 additional',
    resource: {
      href: '/piano-care-resources/',
      label: 'Read about tuning intervals and climate',
    },
    href: '/services/#tuning',
  },
  {
    anchor: 'regulation',
    title: 'Regulation',
    summary: 'Careful work on touch, action response, and mechanical consistency.',
    description:
      'Careful adjustment of the action so touch, repetition, response, and mechanical consistency feel even across the keyboard.',
    price: '$200 touch-up · up to $1,000 for full regulation',
    resource: {
      href: '/piano-care-resources/',
      label: 'Understand tuning, regulation, and voicing',
    },
    href: '/services/#regulation',
  },
  {
    anchor: 'voicing',
    title: 'Voicing',
    summary: 'Tonal refinement shaped around the piano and the person playing it.',
    description:
      'Tonal refinement that shapes brightness, warmth, and balance around the piano, the room, and the player’s preferences.',
    price: 'Quoted after assessment',
    resource: {
      href: '/piano-care-resources/',
      label: 'Understand tuning, regulation, and voicing',
    },
    href: '/services/#voicing',
  },
  {
    anchor: 'cleaning',
    title: 'Cleaning',
    summary: 'Light and deep cleaning options matched to the instrument’s condition.',
    description:
      'Light or deeper cleaning options matched to the piano’s condition, including accessible interior and exterior areas.',
    price: '$75 light cleaning · $200 deep cleaning',
    resource: {
      href: '/piano-care-resources/',
      label: 'Compare light and deep cleaning',
    },
    href: '/services/#cleaning',
  },
  {
    anchor: 'repairs',
    title: 'Repairs',
    summary: 'Assessment-led help for mechanical concerns, with scope confirmed first.',
    description:
      'Assessment-led repair work for mechanical issues, worn components, and performance concerns, with recommendations prioritized by need.',
    price: '$120 per hour, billed in 15-minute increments',
    resource: null,
    href: '/services/#repairs',
  },
  {
    anchor: 'pre-purchase-consulting',
    title: 'Pre-purchase consulting',
    summary: 'A technician’s perspective before committing to a used piano.',
    description:
      'An independent technician’s perspective before committing to a used piano, including condition, anticipated work, and potential concerns.',
    price: '$100 plus travel · up to one hour',
    resource: {
      href: '/piano-care-resources/',
      label: 'Read what to know before buying used',
    },
    href: '/services/#pre-purchase-consulting',
  },
] as const;

export const REQUIRED_ROUTES = [
  '/',
  ...SERVICES.map((service) => `/${service.slug}/`),
  '/about-pierce/',
  '/service-area-travel/',
  '/pricing-faq/',
  '/book-contact/',
  '/piano-care-resources/',
  '/piano-care-approach/',
  '/services/',
] as const;
