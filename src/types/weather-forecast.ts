import type { IWeatherDetail, IWeatherMain, IWeatherWind } from './weather';

export interface IWeatherForecastResponse {
  dt: number;
  main: IWeatherMain;
  weather: IWeatherDetail[];
  clouds: {
    all: number;
  };
  wind: IWeatherWind;
  visibility: number;
  pop: number;
  rain: Record<string, number> | null;
  sys: {
    pod: string;
  };
  dt_txt: string;
}

export interface IWeatherForecast {
  min: number;
  max: number;
  temp: number;
  state: string;
  time: string;
  icon: string;
}

export interface IWeatherForecastByDate {
  date: number;
  forecast: IWeatherForecast[];
}
