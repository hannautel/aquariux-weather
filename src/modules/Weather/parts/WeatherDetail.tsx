import { ArrowUp } from 'lucide-react';

function WeatherDetail() {
  return (
    <div className="p-4 bg-white rounded-lg shadow-lg border border-gray-200">
      <div className="text-base text-left text-gray-600">January 24, 2024</div>
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center w-full">
          <div className="w-1/2 flex justify-center">
            <img
              alt="overcast clouds"
              className="w-32 h-32"
              src="https://openweathermap.org/img/wn/04d@2x.png"
            />
          </div>
          <div className="w-1/2 inline-block text-center">
            <div className="text-5xl font-semibold">26°C</div>
            <div className="text-gray-500 capitalize text-sm">
              Broken clouds
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-4 text-center">
        <div>
          <div className="text-sm text-gray-500">Humidity</div>
          <div className="mt-1 text-lg font-semibold">96%</div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Winds</div>
          <div className="mt-1 text-lg flex items-center gap-1 font-semibold">
            <span className="inline-block transform">
              <ArrowUp size="22px" className="rotate-225" />
            </span>
            1.54 m/s
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Visibility</div>
          <div className="mt-1 text-base font-semibold">8 km</div>
        </div>
      </div>
    </div>
  );
}

export default WeatherDetail;
