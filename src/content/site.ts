export const SITE = {
  name: 'Pierce O’Brien Piano',
  owner: 'Pierce O’Brien',
  domain: 'https://www.pierceobrienpiano.com',
  locale: 'en-US',
  launchReady: import.meta.env.PUBLIC_LAUNCH_READY === 'true',
  coreMessage: 'A refined ear for unmatched beauty.',
  defaultDescription:
    'Performance-level piano tuning, repair, and refinement from Pierce O’Brien Piano.',
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
    publicSummary: null,
    travelPolicy: null,
  },
  credentials: {
    publicRPTWording: 'RPT',
    publicPTGWording: null,
    apprenticeshipWording: null,
  },
  proof: {
    approvedReviews: [],
    approvedReviewCount: null,
    approvedClients: [],
    approvedPianosServiced: null,
  },
  pricing: {
    tuning: null,
    pitchRaise: null,
    repairs: null,
    lightCleaning: null,
    deepCleaning: null,
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
      'Exact public service territory and approved geographic wording',
      'Google Business Profile service-area configuration',
      'Travel-charge wording and calculation',
      'Confirmation that the residential service origin remains private',
    ],
  },
  {
    group: 'Credentials and proof',
    items: [
      'Exact public PTG credential wording beyond the approved RPT designation',
      'Permission and wording for the Don Tuttle apprenticeship attribution',
      'Approved experience and piano-service counts',
      'Permissioned reviews, named clients, and testimonial excerpts',
    ],
  },
  {
    group: 'Commercial terms',
    items: [
      'Final active prices and appointment durations',
      'Repair scope, parts, diagnostics, and workmanship policy',
      'Urgent or same-day conditions and any additional fee',
      'Discount eligibility, dates, exclusions, and stacking rules',
      'Payment methods and final cleaning-package scope',
    ],
  },
] as const;

export const NAVIGATION = [
  { label: 'Tuning', href: '/piano-tuning/' },
  { label: 'About Pierce', href: '/about-pierce/' },
  { label: 'Other Services', href: '/#services' },
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
  image: 'tuning' | 'regulation' | 'voicing' | 'cleaning' | 'hero';
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
    image: 'tuning',
    imageAlt: 'Pierce O’Brien tuning a grand piano in a room lined with books',
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
          'Pierce recommends a regular schedule of two or three tunings each year. A piano that is cared for on a regular schedule is more likely to stay closer to pitch than one left untuned for long periods.',
          'Playing time, humidity, and temperature changes can all affect pitch. Even a piano that is not being played can gradually move away from tune as its strings and structure respond to changing conditions.',
        ],
        pending:
          'The final public price, appointment scope, and expected duration are still awaiting owner approval.',
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
        pending:
          'The final public price range and expected appointment length require owner approval.',
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
        heading: 'Booking details',
        pending:
          'Final timing guidance, availability, and service territory are awaiting confirmation.',
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
        pending:
          'Approved repair examples, hourly terms, parts and diagnostic policies, and final workmanship language are still required.',
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
          'The lighter service is intended for the exterior and interior areas that can be reached without extensively taking the instrument apart. It can complement a regular care visit when scheduled appropriately.',
        ],
      },
      {
        heading: 'Deep cleaning',
        paragraphs: [
          'A deeper clean may involve removing keys and carefully accessing more of the piano’s interior, hardware, and soundboard area. The exact process must respect the instrument in front of the technician.',
        ],
      },
      {
        heading: 'Packages, cadence, and pricing',
        paragraphs: [
          'For a deeper interior clean, the action may be removed so dust and debris can be carefully vacuumed from inside the piano. Compressed air may be used in a minimally invasive way to help clear remaining debris.',
          'Exterior cleaning and dusting are part of piano care as well. Depending on the instrument and the agreed scope, this may be followed by polishing or a hand rub.',
        ],
        pending:
          'Final package names, cadence guidance, prices, and bundle terms are awaiting confirmation.',
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
    title: 'Tuning',
    summary: 'Tuning, pitch raises, and post-move care shaped by the whole instrument.',
    href: '/piano-tuning/',
  },
  {
    title: 'Regulation',
    summary: 'Careful work on touch, action response, and mechanical consistency.',
    href: '/regulation/',
  },
  {
    title: 'Voicing',
    summary: 'Tonal refinement shaped around the piano and the person playing it.',
    href: '/voicing/',
  },
  {
    title: 'Cleaning',
    summary: 'Light and deep cleaning options matched to the instrument’s condition.',
    href: '/piano-cleaning/',
  },
  {
    title: 'Repairs',
    summary: 'Assessment-led help for mechanical concerns, with scope confirmed first.',
    href: '/piano-repairs/',
  },
  {
    title: 'Pre-purchase consulting',
    summary: 'A technician’s perspective before committing to a used piano.',
    href: '/pre-purchase-inspection/',
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
] as const;
