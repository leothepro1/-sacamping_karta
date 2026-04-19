import type { CategoryMeta } from './types';

export const categories: readonly CategoryMeta[] = [
  {
    id: 'accommodation',
    i18nKey: 'category.accommodation',
    color: '#1a5c3a',
    icon: '🏠',
  },
  {
    id: 'food-drink',
    i18nKey: 'category.food-drink',
    color: '#d4a843',
    icon: '🍽️',
  },
  {
    id: 'activities',
    i18nKey: 'category.activities',
    color: '#2563eb',
    icon: '🏄',
  },
  {
    id: 'shops',
    i18nKey: 'category.shops',
    color: '#9333ea',
    icon: '🛍️',
  },
] as const satisfies readonly CategoryMeta[];
