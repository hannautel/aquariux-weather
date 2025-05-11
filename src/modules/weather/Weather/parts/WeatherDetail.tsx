import dayjs from 'dayjs';
import { ArrowUp } from 'lucide-react';
import { getWeatherIcon, getWeatherVisibility } from '@utils/weather.util';
import { useSelectedLocationContext } from '@contexts/SelectedLocationContext';
import WeatherLoading from '@modules/Weather/components/WeatherLoading';
import useCurrentWeather from '@modules/Weather/hooks/useCurrentWeather';

function WeatherDetail() {
  const { coord } = useSelectedLocationContext();
  const { isLoadingWeather, weather } = useCurrentWeather(coord.lat, coord.lon);

  if (isLoadingWeather) {
    return <WeatherLoading />;
  }

  if (!weather) {
    return (
      <div>
        <div className="shadow-lg rounded-2xl border border-gray-200 px-4 py-8 text-center">
          <span className="text-base font-semibold text-indigo-600">404</span>
          <h3
            className="mt-4 text-2xl font-semibold tracking-tight text-balance text-gray-900"
            aria-label="weather error-empty">
            Sorry, We can not load the forecast
          </h3>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg border border-gray-200">
      <div className="text-base text-left text-gray-900">
        {dayjs().format('MMMM DD, YYYY')}
      </div>
      <div className="flex items-center justify-between mt-4">
        <div className="w-1/2 flex justify-center">
          <img
            alt="overcast clouds"
            loading="lazy"
            className="w-32 h-32"
            src={getWeatherIcon(weather.weather[0].icon, '2x')}
          />
        </div>
        <div className="w-1/2 inline-block text-center">
          <div className="text-5xl font-semibold">
            {Math.floor(weather.main.temp)}°C
          </div>
          <div className="text-gray-500 capitalize text-sm">
            {weather.weather[0].description}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-4 text-center">
        <div>
          <div className="text-sm text-gray-500">Humidity</div>
          <div className="mt-1 text-base font-semibold sm:text-lg">
            {weather.main.humidity}%
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Winds</div>
          <div className="mt-1 text-base flex items-center justify-center gap-1 font-semibold sm:text-lg">
            <span className="inline-block transform">
              <ArrowUp
                size="22px"
                style={{ transform: `rotate(${weather.wind.deg}deg)` }}
              />
            </span>
            {weather.wind.speed || 0} m/s
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Visibility</div>
          <div className="mt-1 text-base font-semibold sm:text-lg">
            {getWeatherVisibility(weather.visibility)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherDetail;
