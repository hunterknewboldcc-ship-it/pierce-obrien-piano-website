import cleaning from '../assets/photos/polished-kawai-grand.webp';
import serviceVideoPoster from '../assets/photos/pierce-at-grand-poster.webp';
import ownerLandscape from '../assets/photos/pierce-owner-portrait-landscape.webp';
import portrait from '../assets/photos/pierce-owner-portrait-vertical.webp';
import rptEvent from '../assets/photos/pierce-owner-rpt-event.webp';
import tuningFestival from '../assets/photos/pierce-owner-tuning-festival.webp';
import tuning from '../assets/photos/pierce-owner-tuning-library.webp';
import workingMonochrome from '../assets/photos/pierce-owner-tuning-monochrome.webp';
import hero from '../assets/photos/pierce-tuning-grand-hero.webp';
import regulation from '../assets/photos/upright-action-regulation.webp';
import voicing from '../assets/photos/piano-action-voicing.webp';
import venueVideoPoster from '../assets/photos/piano-venue-clip-poster.webp';

export const MEDIA = {
  cleaning,
  hero,
  ownerLandscape,
  portrait,
  regulation,
  rptEvent,
  serviceVideoPoster,
  tuning,
  tuningFestival,
  venueVideoPoster,
  voicing,
  workingMonochrome,
} as const;

export const VIDEOS = {
  service: '/media/pierce-at-grand.mp4',
  venue: '/media/piano-venue-clip.mp4',
} as const;
