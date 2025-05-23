import axios, { type AxiosResponse } from 'axios';
import { getAppId } from '@configs/api';
import type { IWeather } from '@typed/weather';
import type { IWeatherForecastResponse } from '@typed/weather-forecast';

const API_VERSION = '/data/2.5';

async function getWeatherOfLocation(
  lat: number,
  lon: number,
): Promise<IWeather> {
  const queryParams = new URLSearchParams({
    lat: lat.toString(),
    lon: lon.toString(),
    appid: getAppId(),
    units: 'metric',
  });
  return axios
    .get(`${API_VERSION}/weather?${queryParams.toString()}`)
    .then((response: AxiosResponse<IWeather>) => response.data);
}

async function get5DaysForecastOfLocation(lat: number, lon: number) {
  const queryParams = new URLSearchParams({
    lat: lat.toString(),
    lon: lon.toString(),
    appid: getAppId(),
    units: 'metric',
  });
  return axios
    .get(`${API_VERSION}/forecast?${queryParams.toString()}`)
    .then(
      (response: AxiosResponse<{ list: IWeatherForecastResponse[] }>) =>
        response.data.list,
    );
}

export { getWeatherOfLocation, get5DaysForecastOfLocation };
