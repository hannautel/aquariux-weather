import axios, { type AxiosResponse } from 'axios';
import { APP_ID } from '@configs/api';
import type { ILocation } from '@typed/location';

async function getCitiesByKeyword(keyword: string) {
  const queryParams = new URLSearchParams({
    q: keyword,
    appid: APP_ID,
    limit: '10',
  });
  return axios
    .get(`/geo/1.0/direct?${queryParams.toString()}`)
    .then((response: AxiosResponse<ILocation[]>) => response.data);
}

export { getCitiesByKeyword };
