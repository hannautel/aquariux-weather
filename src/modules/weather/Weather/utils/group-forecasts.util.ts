import type {
  IWeatherForecastByDate,
  IWeatherForecastResponse,
} from '@typed/weather-forecast';
import dayjs from 'dayjs';

export function groupForecastsByDay(
  forecastList: IWeatherForecastResponse[],
): IWeatherForecastByDate[] {
  const forecastMapByDate = forecastList.reduce<
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
        forecast: [...hashMap[time].forecast, forecastEntry],
      },
    };
  }, {});

  return Object.values(forecastMapByDate);
}
