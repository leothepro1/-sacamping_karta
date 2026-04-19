import type { LngLatBoundsLike } from 'mapbox-gl';

export const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

export const MAP_BOUNDS: LngLatBoundsLike = [
  [12.235, 57.07],
  [12.285, 57.095],
];

export const SECONDARY_PIN_MIN_ZOOM = 15.8;

export const INITIAL_VIEW_STATE = {
  longitude: 12.26,
  latitude: 57.082,
  zoom: 14.5,
  pitch: 63,
  bearing: 45,
} as const;
