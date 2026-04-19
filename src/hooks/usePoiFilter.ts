import { useCallback, useState } from 'react';
import type { PoiCategory } from '../data/types';

const ALL_CATEGORIES: readonly PoiCategory[] = [
  'accommodation',
  'food-drink',
  'activities',
  'shops',
];

export function usePoiFilter() {
  const [activeCategories, setActiveCategories] = useState<ReadonlySet<PoiCategory>>(
    new Set(ALL_CATEGORIES),
  );

  const toggleCategory = useCallback((category: PoiCategory) => {
    setActiveCategories((prev) => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  }, []);

  const showAll = useCallback(() => {
    setActiveCategories(new Set(ALL_CATEGORIES));
  }, []);

  return { activeCategories, toggleCategory, showAll } as const;
}
