import { useCallback, useState } from 'react';
import type { Poi } from '../data/types';

export function useSelectedPoi() {
  const [selectedPoi, setSelectedPoi] = useState<Poi | null>(null);

  const selectPoi = useCallback((poi: Poi) => {
    setSelectedPoi(poi);
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedPoi(null);
  }, []);

  return { selectedPoi, selectPoi, clearSelection } as const;
}
