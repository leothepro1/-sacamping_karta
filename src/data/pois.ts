import type { Poi } from './types';

export const pois: readonly Poi[] = [
  {
    id: 'apelvikstrand',
    category: 'accommodation',
    priority: 'primary',
    coordinates: [12.2485, 57.0825],
    i18nKey: 'poi.apelvikstrand',
    images: ['apelvikstrand/overview', 'apelvikstrand/cabin', 'apelvikstrand/beach'],
    cta: {
      primary: { url: 'https://apelvikstrand.se/boka', i18nKey: 'cta.book' },
      secondary: { url: 'https://apelvikstrand.se', i18nKey: 'cta.read-more' },
    },
  },
  {
    id: 'kusthotellet',
    category: 'accommodation',
    priority: 'primary',
    coordinates: [12.252, 57.084],
    i18nKey: 'poi.kusthotellet',
    images: ['kusthotellet/facade', 'kusthotellet/room'],
    cta: {
      primary: { url: 'https://kusthotellet.se/boka', i18nKey: 'cta.book' },
      secondary: { url: 'https://kusthotellet.se', i18nKey: 'cta.read-more' },
    },
  },
  {
    id: 'surfers-paradise',
    category: 'food-drink',
    priority: 'primary',
    coordinates: [12.246, 57.0815],
    i18nKey: 'poi.surfers-paradise',
    images: ['surfers/exterior', 'surfers/food'],
    cta: {
      primary: { url: 'https://surfersparadise.se', i18nKey: 'cta.visit-website' },
      secondary: {
        url: 'https://www.google.com/maps/dir/?api=1&destination=57.0815,12.2460',
        i18nKey: 'cta.directions',
      },
    },
  },
  {
    id: 'majas',
    category: 'food-drink',
    priority: 'secondary',
    coordinates: [12.251, 57.083],
    i18nKey: 'poi.majas',
    images: ['majas/exterior'],
    cta: {
      primary: { url: 'https://majas.se', i18nKey: 'cta.visit-website' },
    },
  },
  {
    id: 'minigolf',
    category: 'activities',
    priority: 'primary',
    coordinates: [12.2475, 57.0835],
    i18nKey: 'poi.minigolf',
    images: ['minigolf/course'],
    cta: {
      primary: {
        url: 'https://www.google.com/maps/dir/?api=1&destination=57.0835,12.2475',
        i18nKey: 'cta.directions',
      },
    },
  },
  {
    id: 'apelviken-livs',
    category: 'shops',
    priority: 'secondary',
    coordinates: [12.25, 57.082],
    i18nKey: 'poi.apelviken-livs',
    images: ['livs/exterior'],
    cta: {
      primary: {
        url: 'https://www.google.com/maps/dir/?api=1&destination=57.0820,12.2500',
        i18nKey: 'cta.directions',
      },
    },
  },
] as const satisfies readonly Poi[];
