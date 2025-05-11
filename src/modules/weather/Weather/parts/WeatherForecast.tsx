import dayjs from 'dayjs';
import isTodayPlugin from 'dayjs/plugin/isToday';
import { getWeatherIcon } from '@utils/weather.util';
import { useSelectedLocationContext } from '@contexts/SelectedLocationContext';
import useWeatherForecast from '@modules/Weather/hooks/useWeatherForecast';
import WeatherForecastLoading from '@modules/Weather/components/WeatherForecastLoading';

dayjs.extend(isTodayPlugin);

function WeatherForecast() {
  const { coord } = useSelectedLocationContext();
  const { isLoadingWeather, forecastGroups } = useWeatherForecast(
    coord.lat,
    coord.lon,
  );

  if (isLoadingWeather) {
    return <WeatherForecastLoading />;
  }

  if (forecastGroups.length === 0) {
    return (
      <div>
        <h4 className="text-lg font-semibold text-left mb-4">
          5-day Forecast (3 hours)
        </h4>
        <div className="shadow-lg rounded-2xl border border-gray-200 px-4 py-8 text-center">
          <span className="text-base font-semibold text-indigo-600">404</span>
          <h3 className="mt-4 text-2xl font-semibold tracking-tight text-balance text-gray-900">
            Sorry, We can not load the forecast
          </h3>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h4 className="text-lg font-semibold text-left mb-4">
        5-day Forecast (3 hours)
      </h4>
      <div className="shadow-lg rounded-2xl border border-gray-200 p-4 space-y-3.5">
        {forecastGroups.map((forecastGroup, index) => {
          const currentDate = dayjs.unix(forecastGroup.date);
          const isToday = index === 0 && currentDate.isToday();
          return (
            <div key={forecastGroup.date}>
              <h3 className="text-gray-500 text-left mb-3">
                {isToday ? 'Today' : currentDate.format('DD MMMM')}
              </h3>
              <div className="space-y-2 text-left">
                {forecastGroup.forecast.map((forecast) => {
                  return (
                    <div
                      className="block sm:flex items-center justify-between py-1 bg-white rounded-lg"
                      key={forecast.time}>
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-medium w-12">
                          {forecast.time}
                        </div>
                        <img
                          alt="light rain"
                          className="w-10 h-10"
                          src={getWeatherIcon(forecast.icon)}
                        />
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500">
                            {forecast.max}°C
                          </span>
                          <span className="text-sm text-gray-300">/</span>
                          <span className="text-sm text-gray-500">
                            {forecast.min}°C
                          </span>
                        </div>
                      </div>
                      <div className="text-sm font-semibold">
                        {forecast.state}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WeatherForecast;
