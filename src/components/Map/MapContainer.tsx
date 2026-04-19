import { useCallback, type ReactNode } from 'react';
import Map, { type ViewStateChangeEvent } from 'react-map-gl/mapbox';
import { MAPBOX_TOKEN, MAP_BOUNDS, INITIAL_VIEW_STATE } from '../../lib/constants';

interface MapContainerProps {
  children: ReactNode;
  onZoomChange: (zoom: number) => void;
}

export function MapContainer({ children, onZoomChange }: MapContainerProps) {
  const handleMove = useCallback(
    (evt: ViewStateChangeEvent) => {
      onZoomChange(evt.viewState.zoom);
    },
    [onZoomChange],
  );

  return (
    <Map
      initialViewState={INITIAL_VIEW_STATE}
      maxBounds={MAP_BOUNDS}
      minZoom={13}
      maxZoom={18}
      mapStyle="mapbox://styles/mapbox/streets-v12"
      mapboxAccessToken={MAPBOX_TOKEN}
      onMove={handleMove}
      style={{ width: '100%', height: '100%' }}
    >
      {children}
    </Map>
  );
}
