import { useCallback } from 'react';
import { getSearchHistory } from '@utils/location-history.util';
import type { ILocation } from '@typed/location';
import { useSelectedLocationContext } from '@contexts/SelectedLocationContext';
import { setLocalstorageItem } from '@utils/localstorage.util';
import LOCALSTORAGE_KEYS from '@constants/localstorage';
import { useNavigate } from 'react-router';

function useLocationHandler() {
  const navigate = useNavigate();
  const { onChangeCoord } = useSelectedLocationContext();
  const handleSelectLocation = useCallback(
    (location: ILocation) => {
      const searchHistories = getSearchHistory();
      const rowIndex = searchHistories.findIndex(
        (h) => h.lat === location.lat && h.lon === location.lon,
      );
      const newHistories = [...searchHistories];
      if (rowIndex === -1) {
        newHistories.unshift(location);
      } else {
        const searchHistory = searchHistories[rowIndex];
        newHistories.splice(rowIndex, 1);
        newHistories.unshift(searchHistory);
      }
      onChangeCoord(location);
      setLocalstorageItem(
        LOCALSTORAGE_KEYS.WEARTHER_HISTORY,
        JSON.stringify(newHistories),
      );
      navigate('/');
    },
    [onChangeCoord, navigate],
  );

  const handleRemoveLocation = useCallback((location: ILocation) => {
    const searchHistories = getSearchHistory();
    const rowIndex = searchHistories.findIndex(
      (h) => h.lat === location.lat && h.lon === location.lon,
    );
    if (rowIndex === -1) return;
    const newHistories = [...searchHistories];
    newHistories.splice(rowIndex, 1);
    setLocalstorageItem(
      LOCALSTORAGE_KEYS.WEARTHER_HISTORY,
      JSON.stringify(newHistories),
    );
  }, []);

  return {
    onSelectLocation: handleSelectLocation,
    onRemoveLocation: handleRemoveLocation,
  };
}

export default useLocationHandler;
