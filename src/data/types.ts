export type PoiCategory = 'accommodation' | 'food-drink' | 'activities' | 'shops';

export type PoiPriority = 'primary' | 'secondary';

export type Locale = 'sv' | 'en' | 'de';

export interface PoiCta {
  url: string;
  i18nKey: string;
}

export interface Poi {
  id: string;
  category: PoiCategory;
  priority: PoiPriority;
  coordinates: [lng: number, lat: number];
  i18nKey: string;
  images: string[];
  cta: {
    primary: PoiCta;
    secondary?: PoiCta | undefined;
  };
}

export interface CategoryMeta {
  id: PoiCategory;
  i18nKey: string;
  color: string;
  icon: string;
}
