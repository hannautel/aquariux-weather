import { useCallback, useEffect, useState } from 'react';
import { useDisclosure } from '@hooks/useDicslosure';
import type { IWeather } from '@typed/weather';
import { getWeatherOfLocation } from '@apis/weather.api';

function useCurrentWeather(lat: number, lon: number) {
  const [weather, setWeather] = useState<IWeather | null>(null);

  const {
    isOpen: isLoadingWeather,
    onOpen: startLoadingWeather,
    onClose: finishLoadingWeather,
  } = useDisclosure(true);

  const handleLoadingWeather = useCallback(async () => {
    try {
      startLoadingWeather();
      const currentWeather = await getWeatherOfLocation(lat, lon);
      setWeather(currentWeather);
    } catch (error: unknown) {
      // trace if needed
      console.log({ error }); // sample trace
      setWeather(null);
    }
    finishLoadingWeather();
  }, [finishLoadingWeather, lat, lon, startLoadingWeather]);

  useEffect(() => {
    handleLoadingWeather();
  }, [handleLoadingWeather]);

  return {
    isLoadingWeather,
    weather,
  };
}

export default useCurrentWeather;
