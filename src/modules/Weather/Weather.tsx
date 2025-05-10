import WeatherDetail from './parts/WeatherDetail';
import WeatherForecast from './parts/WeatherForecast';

function Weather() {
  return (
    <>
      <WeatherDetail />
      <div className="mt-6">
        <WeatherForecast />
      </div>
    </>
  );
}

export default Weather;
