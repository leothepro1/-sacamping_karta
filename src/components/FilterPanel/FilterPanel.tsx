import { useTranslation } from 'react-i18next';
import { FilterButton } from './FilterButton';
import { categories } from '../../data/categories';
import type { PoiCategory } from '../../data/types';

interface FilterPanelProps {
  activeCategories: ReadonlySet<PoiCategory>;
  onToggleCategory: (category: PoiCategory) => void;
}

export function FilterPanel({ activeCategories, onToggleCategory }: FilterPanelProps) {
  const { t } = useTranslation();

  return (
    <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2">
      <div className="flex gap-2 rounded-2xl bg-white/90 p-2 shadow-xl backdrop-blur-sm">
        {categories.map((cat) => (
          <FilterButton
            key={cat.id}
            label={t(cat.i18nKey)}
            icon={cat.icon}
            color={cat.color}
            isActive={activeCategories.has(cat.id)}
            onClick={() => {
              onToggleCategory(cat.id);
            }}
          />
        ))}
      </div>
    </div>
  );
}
