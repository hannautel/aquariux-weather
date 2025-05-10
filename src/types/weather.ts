interface IWeatherCoordinate {
  lon: number;
  lat: number;
}

interface IWeatherDetail {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface IWeatherWind {
  speed: number;
  deg: number;
}

interface IWeatherCloud {
  all: number;
}

interface IWeatherMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
}

interface IWeatherSys {
  country: string;
  sunrise: number;
  sunset: number;
}

export interface IWeather {
  coord: IWeatherCoordinate;
  weather: IWeatherDetail[];
  base: string;
  main: IWeatherMain;
  visibility: number;
  wind: IWeatherWind;
  clouds: IWeatherCloud;
  dt: number;
  sys: IWeatherSys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}
