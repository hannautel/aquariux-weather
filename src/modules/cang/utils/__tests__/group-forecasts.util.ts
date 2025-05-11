import dayjs from 'dayjs';
import { IWeatherForecastResponse } from '@typed/weather-forecast';
import { groupForecastsByDay } from '@modules/cang/utils/group-forecasts.util';

describe('groupForecastsByDay', () => {
  const baseTime = dayjs('2024-05-10T10:00:00Z').unix();
  const nextDay = dayjs.unix(baseTime).add(1, 'day').unix();

  const createForecast = (
    dt: number,
    temp: number,
    description: string,
  ): IWeatherForecastResponse => ({
    dt,
    main: {
      temp,
      temp_min: temp - 2,
      temp_max: temp + 2,
      feels_like: 0,
      pressure: 0,
      humidity: 0,
      sea_level: 0,
      grnd_level: 0,
    },
    weather: [
      {
        description,
        icon: '01d',
        id: 0,
        main: '',
      },
    ],
    clouds: {
      all: 0,
    },
    wind: {
      speed: 1.35,
      deg: 35,
    },
    visibility: 0,
    pop: 0,
    rain: null,
    sys: {
      pod: '',
    },
    dt_txt: '',
  });

  it('should group by day', () => {
    const list = [
      createForecast(baseTime, 25, 'sunny'),
      createForecast(baseTime + 3600, 26, 'cloudy'),
      createForecast(nextDay, 22, 'rain'),
    ];

    const result = groupForecastsByDay(list);

    expect(result).toHaveLength(2); // two groups by date
    expect(result[0].forecast).toHaveLength(2);
    expect(result[1].forecast).toHaveLength(1);
  });

  it('should map correctly', () => {
    const list = [createForecast(baseTime, 30, 'clear')];
    const result = groupForecastsByDay(list);

    const entry = result[0].forecast[0];

    expect(entry).toEqual(
      expect.objectContaining({
        min: 28,
        max: 32,
        temp: 30,
        state: 'clear',
        time: expect.stringMatching(/^\d{2}:\d{2}$/),
        icon: '01d',
      }),
    );
  });

  describe('when input is empty', () => {
    it('should return empty list', () => {
      const result = groupForecastsByDay([]);
      expect(result).toEqual([]);
    });
  });
});
