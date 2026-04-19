import { useMemo } from 'react';
import { pois } from '../data/pois';
import { SECONDARY_PIN_MIN_ZOOM } from '../lib/constants';
import type { Poi, PoiCategory } from '../data/types';

export function useVisiblePois(
  activeCategories: ReadonlySet<PoiCategory>,
  zoom: number,
): readonly Poi[] {
  return useMemo(
    () =>
      pois.filter((poi) => {
        if (!activeCategories.has(poi.category)) return false;
        if (poi.priority === 'secondary' && zoom < SECONDARY_PIN_MIN_ZOOM) return false;
        return true;
      }),
    [activeCategories, zoom],
  );
}
