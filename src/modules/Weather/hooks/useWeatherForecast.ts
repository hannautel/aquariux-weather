import { useCallback, useEffect, useState } from 'react';
import type { IWeatherForecastByDate } from '@typed/weather-forecast';
import { useDisclosure } from '@hooks/useDicslosure';
import { get5DaysForecastOfCity } from '@apis/weather.api';
import dayjs from 'dayjs';

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
      const listForecast = await get5DaysForecastOfCity(lat, lon);
      const forecastMapByDate = listForecast.reduce<
        Record<number, IWeatherForecastByDate>
      >((hashMap, forecast) => {
        const time = dayjs.unix(forecast.dt).startOf('day').unix();
        const forecastEntry = {
          min: forecast.main.temp_min,
          max: forecast.main.temp_max,
          temp: forecast.main.temp,
          state: forecast.weather[0].description,
          time: dayjs.unix(forecast.dt).format('HH:mm'),
          icon: forecast.weather[0].icon,
        };
        if (!hashMap[time]) {
          return {
            ...hashMap,
            [time]: { date: time, forecast: [forecastEntry] },
          };
        }
        return {
          ...hashMap,
          [time]: {
            ...hashMap[time],
            forecast: [...(hashMap[time].forecast || []), forecastEntry],
          },
        };
      }, {});
      setForecastGroups(Object.values(forecastMapByDate));
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
