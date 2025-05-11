import { useCallback, useEffect, useState } from 'react';
import type { IWeatherForecastByDate } from '@typed/weather-forecast';
import { useDisclosure } from '@hooks/useDicslosure';
import { get5DaysForecastOfLocation } from '@apis/weather.api';
import { groupForecastsByDay } from '../utils/group-forecasts.util';

function useWeatherForecast(lat: number, lon: number) {
  const [forecastGroups, setForecastGroups] = useState<
    IWeatherForecastByDate[]
  >([]);

  const {
    isOpen: isLoadingWeather,
    onOpen: startLoadingWeather,
    onClose: finishLoadingWeather,
  } = useDisclosure(true);

  const handleLoadingForecast = useCallback(async () => {
    try {
      startLoadingWeather();
      const listForecast = await get5DaysForecastOfLocation(lat, lon);
      const forecastMapByDay = groupForecastsByDay(listForecast);
      setForecastGroups(forecastMapByDay);
    } catch (error: unknown) {
      // trace if needed
      console.log({ error }); // sample trace
    }
    finishLoadingWeather();
  }, [finishLoadingWeather, lat, lon, startLoadingWeather]);

  useEffect(() => {
    handleLoadingForecast();
  }, [handleLoadingForecast]);

  return {
    isLoadingWeather,
    forecastGroups,
  };
}

export default useWeatherForecast;
