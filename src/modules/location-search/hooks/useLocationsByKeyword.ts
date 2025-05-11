import { useCallback, useEffect, useState } from 'react';
import type { ILocation } from '@typed/location';
import { getCitiesByKeyword } from '@apis/location.api';
import { useDisclosure } from '@hooks/useDicslosure';

function useLocationsByKeyword(keyword: string) {
  const [locations, setLocations] = useState<ILocation[]>([]);
  const {
    isOpen: isLoadingLocations,
    onOpen: startLoadingLocations,
    onClose: finishLoadingLocations,
  } = useDisclosure(!!keyword);

  const handleGetLocationsByKeyword = useCallback(async () => {
    if (!keyword) {
      setLocations([]);
      finishLoadingLocations();
      return;
    }
    try {
      startLoadingLocations();
      const listLocations = await getCitiesByKeyword(keyword);
      setLocations(listLocations);
    } catch (error) {
      console.error('Error fetching Locations:', error);
    }
    finishLoadingLocations();
  }, [finishLoadingLocations, keyword, startLoadingLocations]);

  useEffect(() => {
    handleGetLocationsByKeyword();
  }, [handleGetLocationsByKeyword]);

  return {
    isLoadingLocations,
    locations,
  };
}

export default useLocationsByKeyword;
