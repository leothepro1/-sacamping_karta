import { PoiMarker } from './PoiMarker';
import type { Poi } from '../../data/types';

interface PoiMarkersProps {
  pois: readonly Poi[];
  onMarkerClick: (poi: Poi) => void;
}

export function PoiMarkers({ pois, onMarkerClick }: PoiMarkersProps) {
  return (
    <>
      {pois.map((poi) => (
        <PoiMarker key={poi.id} poi={poi} onClick={onMarkerClick} />
      ))}
    </>
  );
}
