import { Marker } from 'react-map-gl/mapbox';
import { categories } from '../../data/categories';
import type { Poi } from '../../data/types';

interface PoiMarkerProps {
  poi: Poi;
  onClick: (poi: Poi) => void;
}

export function PoiMarker({ poi, onClick }: PoiMarkerProps) {
  const category = categories.find((c) => c.id === poi.category);

  return (
    <Marker
      longitude={poi.coordinates[0]}
      latitude={poi.coordinates[1]}
      anchor="bottom"
      onClick={(e) => {
        e.originalEvent.stopPropagation();
        onClick(poi);
      }}
    >
      <button
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-white shadow-lg transition-transform hover:scale-110"
        style={{ backgroundColor: category?.color }}
        type="button"
        aria-label={poi.i18nKey}
      >
        <span className="text-lg">{category?.icon}</span>
      </button>
    </Marker>
  );
}
