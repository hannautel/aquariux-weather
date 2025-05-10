import { useEffect, useState } from 'react';

function WeatherForecast() {
  const isBlocking = true;
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3_000);
  }, []);

  if (isLoading) {
    return (
      <div>
        <h4 className="text-lg font-semibold text-left mb-4">
          5-day Forecast (3 hours)
        </h4>
        <div className="shadow-lg rounded-2xl border border-gray-200 p-4 space-y-3.5">
          <div className="animate-pulse">
            <div className="w-20 h-6 bg-gray-200 mb-3" />
            <div className="space-y-2 text-left">
              <div className="xs:block sm:flex items-center justify-between py-1 bg-white rounded-lg ">
                <div className="flex items-center gap-2">
                  <div className="w-12 h-5 bg-gray-200" />
                  <div className="w-10 h-10 rounded-full bg-gray-200" />
                  <div className="w-22 h-5 bg-gray-200" />
                </div>
                <div className="w-16 h-5 bg-gray-200" />
              </div>
              <div className="xs:block sm:flex items-center justify-between py-1 bg-white rounded-lg ">
                <div className="flex items-center gap-2">
                  <div className="w-12 h-5 bg-gray-200" />
                  <div className="w-10 h-10 rounded-full bg-gray-200" />
                  <div className="w-22 h-5 bg-gray-200" />
                </div>
                <div className="w-16 h-5 bg-gray-200" />
              </div>
              <div className="xs:block sm:flex items-center justify-between py-1 bg-white rounded-lg ">
                <div className="flex items-center gap-2">
                  <div className="w-12 h-5 bg-gray-200" />
                  <div className="w-10 h-10 rounded-full bg-gray-200" />
                  <div className="w-22 h-5 bg-gray-200" />
                </div>
                <div className="w-16 h-5 bg-gray-200" />
              </div>
              <div className="xs:block sm:flex items-center justify-between py-1 bg-white rounded-lg ">
                <div className="flex items-center gap-2">
                  <div className="w-12 h-5 bg-gray-200" />
                  <div className="w-10 h-10 rounded-full bg-gray-200" />
                  <div className="w-22 h-5 bg-gray-200" />
                </div>
                <div className="w-16 h-5 bg-gray-200" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isBlocking) {
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
        <div>
          <h3 className="text-gray-500 text-left mb-3">Today</h3>
          <div className="space-y-2 text-left">
            <div className="xs:block sm:flex items-center justify-between py-1 bg-white rounded-lg ">
              <div className="flex items-center gap-2">
                <div className="text-sm font-medium w-12">13:00</div>
                <img
                  alt="light rain"
                  className="w-10 h-10"
                  src="https://openweathermap.org/img/wn/10d.png"
                />
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">29°C</span>
                  <span className="text-sm text-gray-300">/</span>
                  <span className="text-sm text-gray-500">30°C</span>
                </div>
              </div>
              <div className="text-sm capitalize font-semibold">light rain</div>
            </div>
            <div className="xs:block sm:flex items-center justify-between py-1 bg-white rounded-lg ">
              <div className="flex items-center gap-2">
                <div className="text-sm font-medium w-12">16:00</div>
                <img
                  alt="light rain"
                  className="w-10 h-10"
                  src="https://openweathermap.org/img/wn/10d.png"
                />
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">30°C</span>
                  <span className="text-sm text-gray-300">/</span>
                  <span className="text-sm text-gray-500">31°C</span>
                </div>
              </div>
              <div className="text-sm capitalize font-semibold">light rain</div>
            </div>
            <div className="xs:block sm:flex items-center justify-between py-1 bg-white rounded-lg ">
              <div className="flex items-center gap-2">
                <div className="text-sm font-medium w-12">19:00</div>
                <img
                  alt="moderate rain"
                  className="w-10 h-10"
                  src="https://openweathermap.org/img/wn/10n.png"
                />
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">27°C</span>
                  <span className="text-sm text-gray-300">/</span>
                  <span className="text-sm text-gray-500">27°C</span>
                </div>
              </div>
              <div className="text-sm capitalize font-semibold">
                moderate rain
              </div>
            </div>
            <div className="xs:block sm:flex items-center justify-between py-1 bg-white rounded-lg ">
              <div className="flex items-center gap-2">
                <div className="text-sm font-medium w-12">22:00</div>
                <img
                  alt="moderate rain"
                  className="w-10 h-10"
                  src="https://openweathermap.org/img/wn/10n.png"
                />
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">24°C</span>
                  <span className="text-sm text-gray-300">/</span>
                  <span className="text-sm text-gray-500">24°C</span>
                </div>
              </div>
              <div className="text-sm capitalize font-semibold">
                moderate rain
              </div>
            </div>
          </div>
        </div>
        {/* <div>
          <h3 className="text-gray-500 text-left mb-3">Today</h3>
          <div className="space-y-2 text-left">
            <div className="xs:block sm:flex items-center justify-between py-1 bg-white rounded-lg ">
              <div className="flex items-center gap-2">
                <div className="text-sm font-medium w-12">13:00</div>
                <img
                  alt="light rain"
                  className="w-10 h-10"
                  src="https://openweathermap.org/img/wn/10d.png"
                />
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">29°C</span>
                  <span className="text-sm text-gray-300">/</span>
                  <span className="text-sm text-gray-500">30°C</span>
                </div>
              </div>
              <div className="text-sm capitalize font-semibold">light rain</div>
            </div>
            <div className="xs:block sm:flex items-center justify-between py-1 bg-white rounded-lg ">
              <div className="flex items-center gap-2">
                <div className="text-sm font-medium w-12">16:00</div>
                <img
                  alt="light rain"
                  className="w-10 h-10"
                  src="https://openweathermap.org/img/wn/10d.png"
                />
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">30°C</span>
                  <span className="text-sm text-gray-300">/</span>
                  <span className="text-sm text-gray-500">31°C</span>
                </div>
              </div>
              <div className="text-sm capitalize font-semibold">light rain</div>
            </div>
            <div className="xs:block sm:flex items-center justify-between py-1 bg-white rounded-lg ">
              <div className="flex items-center gap-2">
                <div className="text-sm font-medium w-12">19:00</div>
                <img
                  alt="moderate rain"
                  className="w-10 h-10"
                  src="https://openweathermap.org/img/wn/10n.png"
                />
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">27°C</span>
                  <span className="text-sm text-gray-300">/</span>
                  <span className="text-sm text-gray-500">27°C</span>
                </div>
              </div>
              <div className="text-sm capitalize font-semibold">
                moderate rain
              </div>
            </div>
            <div className="xs:block sm:flex items-center justify-between py-1 bg-white rounded-lg ">
              <div className="flex items-center gap-2">
                <div className="text-sm font-medium w-12">22:00</div>
                <img
                  alt="moderate rain"
                  className="w-10 h-10"
                  src="https://openweathermap.org/img/wn/10n.png"
                />
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">24°C</span>
                  <span className="text-sm text-gray-300">/</span>
                  <span className="text-sm text-gray-500">24°C</span>
                </div>
              </div>
              <div className="text-sm capitalize font-semibold">
                moderate rain
              </div>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-gray-500 text-left mb-3">Today</h3>
          <div className="space-y-2 text-left">
            <div className="xs:block sm:flex items-center justify-between py-1 bg-white rounded-lg ">
              <div className="flex items-center gap-2">
                <div className="text-sm font-medium w-12">13:00</div>
                <img
                  alt="light rain"
                  className="w-10 h-10"
                  src="https://openweathermap.org/img/wn/10d.png"
                />
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">29°C</span>
                  <span className="text-sm text-gray-300">/</span>
                  <span className="text-sm text-gray-500">30°C</span>
                </div>
              </div>
              <div className="text-sm capitalize font-semibold">light rain</div>
            </div>
            <div className="xs:block sm:flex items-center justify-between py-1 bg-white rounded-lg ">
              <div className="flex items-center gap-2">
                <div className="text-sm font-medium w-12">16:00</div>
                <img
                  alt="light rain"
                  className="w-10 h-10"
                  src="https://openweathermap.org/img/wn/10d.png"
                />
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">30°C</span>
                  <span className="text-sm text-gray-300">/</span>
                  <span className="text-sm text-gray-500">31°C</span>
                </div>
              </div>
              <div className="text-sm capitalize font-semibold">light rain</div>
            </div>
            <div className="xs:block sm:flex items-center justify-between py-1 bg-white rounded-lg ">
              <div className="flex items-center gap-2">
                <div className="text-sm font-medium w-12">19:00</div>
                <img
                  alt="moderate rain"
                  className="w-10 h-10"
                  src="https://openweathermap.org/img/wn/10n.png"
                />
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">27°C</span>
                  <span className="text-sm text-gray-300">/</span>
                  <span className="text-sm text-gray-500">27°C</span>
                </div>
              </div>
              <div className="text-sm capitalize font-semibold">
                moderate rain
              </div>
            </div>
            <div className="xs:block sm:flex items-center justify-between py-1 bg-white rounded-lg ">
              <div className="flex items-center gap-2">
                <div className="text-sm font-medium w-12">22:00</div>
                <img
                  alt="moderate rain"
                  className="w-10 h-10"
                  src="https://openweathermap.org/img/wn/10n.png"
                />
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">24°C</span>
                  <span className="text-sm text-gray-300">/</span>
                  <span className="text-sm text-gray-500">24°C</span>
                </div>
              </div>
              <div className="text-sm capitalize font-semibold">
                moderate rain
              </div>
            </div>
          </div>
        </div> */}
        {/* <div>
          <h3 className="text-gray-500 text-left mb-3">Today</h3>
          <div className="space-y-2 text-left">
            <div className="xs:block sm:flex items-center justify-between py-1 bg-white rounded-lg ">
              <div className="flex items-center gap-2">
                <div className="text-sm font-medium w-12">13:00</div>
                <img
                  alt="light rain"
                  className="w-10 h-10"
                  src="https://openweathermap.org/img/wn/10d.png"
                />
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">29°C</span>
                  <span className="text-sm text-gray-300">/</span>
                  <span className="text-sm text-gray-500">30°C</span>
                </div>
              </div>
              <div className="text-sm capitalize font-semibold">light rain</div>
            </div>
            <div className="xs:block sm:flex items-center justify-between py-1 bg-white rounded-lg ">
              <div className="flex items-center gap-2">
                <div className="text-sm font-medium w-12">16:00</div>
                <img
                  alt="light rain"
                  className="w-10 h-10"
                  src="https://openweathermap.org/img/wn/10d.png"
                />
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">30°C</span>
                  <span className="text-sm text-gray-300">/</span>
                  <span className="text-sm text-gray-500">31°C</span>
                </div>
              </div>
              <div className="text-sm capitalize font-semibold">light rain</div>
            </div>
            <div className="xs:block sm:flex items-center justify-between py-1 bg-white rounded-lg ">
              <div className="flex items-center gap-2">
                <div className="text-sm font-medium w-12">19:00</div>
                <img
                  alt="moderate rain"
                  className="w-10 h-10"
                  src="https://openweathermap.org/img/wn/10n.png"
                />
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">27°C</span>
                  <span className="text-sm text-gray-300">/</span>
                  <span className="text-sm text-gray-500">27°C</span>
                </div>
              </div>
              <div className="text-sm capitalize font-semibold">
                moderate rain
              </div>
            </div>
            <div className="xs:block sm:flex items-center justify-between py-1 bg-white rounded-lg ">
              <div className="flex items-center gap-2">
                <div className="text-sm font-medium w-12">22:00</div>
                <img
                  alt="moderate rain"
                  className="w-10 h-10"
                  src="https://openweathermap.org/img/wn/10n.png"
                />
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">24°C</span>
                  <span className="text-sm text-gray-300">/</span>
                  <span className="text-sm text-gray-500">24°C</span>
                </div>
              </div>
              <div className="text-sm capitalize font-semibold">
                moderate rain
              </div>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-gray-500 text-left mb-3">Today</h3>
          <div className="space-y-2 text-left">
            <div className="xs:block sm:flex items-center justify-between py-1 bg-white rounded-lg ">
              <div className="flex items-center gap-2">
                <div className="text-sm font-medium w-12">13:00</div>
                <img
                  alt="light rain"
                  className="w-10 h-10"
                  src="https://openweathermap.org/img/wn/10d.png"
                />
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">29°C</span>
                  <span className="text-sm text-gray-300">/</span>
                  <span className="text-sm text-gray-500">30°C</span>
                </div>
              </div>
              <div className="text-sm capitalize font-semibold">light rain</div>
            </div>
            <div className="xs:block sm:flex items-center justify-between py-1 bg-white rounded-lg ">
              <div className="flex items-center gap-2">
                <div className="text-sm font-medium w-12">16:00</div>
                <img
                  alt="light rain"
                  className="w-10 h-10"
                  src="https://openweathermap.org/img/wn/10d.png"
                />
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">30°C</span>
                  <span className="text-sm text-gray-300">/</span>
                  <span className="text-sm text-gray-500">31°C</span>
                </div>
              </div>
              <div className="text-sm capitalize font-semibold">light rain</div>
            </div>
            <div className="xs:block sm:flex items-center justify-between py-1 bg-white rounded-lg ">
              <div className="flex items-center gap-2">
                <div className="text-sm font-medium w-12">19:00</div>
                <img
                  alt="moderate rain"
                  className="w-10 h-10"
                  src="https://openweathermap.org/img/wn/10n.png"
                />
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">27°C</span>
                  <span className="text-sm text-gray-300">/</span>
                  <span className="text-sm text-gray-500">27°C</span>
                </div>
              </div>
              <div className="text-sm capitalize font-semibold">
                moderate rain
              </div>
            </div>
            <div className="xs:block sm:flex items-center justify-between py-1 bg-white rounded-lg ">
              <div className="flex items-center gap-2">
                <div className="text-sm font-medium w-12">22:00</div>
                <img
                  alt="moderate rain"
                  className="w-10 h-10"
                  src="https://openweathermap.org/img/wn/10n.png"
                />
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">24°C</span>
                  <span className="text-sm text-gray-300">/</span>
                  <span className="text-sm text-gray-500">24°C</span>
                </div>
              </div>
              <div className="text-sm capitalize font-semibold">
                moderate rain
              </div>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-gray-500 text-left mb-3">Today</h3>
          <div className="space-y-2 text-left">
            <div className="xs:block sm:flex items-center justify-between py-1 bg-white rounded-lg ">
              <div className="flex items-center gap-2">
                <div className="text-sm font-medium w-12">13:00</div>
                <img
                  alt="light rain"
                  className="w-10 h-10"
                  src="https://openweathermap.org/img/wn/10d.png"
                />
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">29°C</span>
                  <span className="text-sm text-gray-300">/</span>
                  <span className="text-sm text-gray-500">30°C</span>
                </div>
              </div>
              <div className="text-sm capitalize font-semibold">light rain</div>
            </div>
            <div className="xs:block sm:flex items-center justify-between py-1 bg-white rounded-lg ">
              <div className="flex items-center gap-2">
                <div className="text-sm font-medium w-12">16:00</div>
                <img
                  alt="light rain"
                  className="w-10 h-10"
                  src="https://openweathermap.org/img/wn/10d.png"
                />
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">30°C</span>
                  <span className="text-sm text-gray-300">/</span>
                  <span className="text-sm text-gray-500">31°C</span>
                </div>
              </div>
              <div className="text-sm capitalize font-semibold">light rain</div>
            </div>
            <div className="xs:block sm:flex items-center justify-between py-1 bg-white rounded-lg ">
              <div className="flex items-center gap-2">
                <div className="text-sm font-medium w-12">19:00</div>
                <img
                  alt="moderate rain"
                  className="w-10 h-10"
                  src="https://openweathermap.org/img/wn/10n.png"
                />
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">27°C</span>
                  <span className="text-sm text-gray-300">/</span>
                  <span className="text-sm text-gray-500">27°C</span>
                </div>
              </div>
              <div className="text-sm capitalize font-semibold">
                moderate rain
              </div>
            </div>
            <div className="xs:block sm:flex items-center justify-between py-1 bg-white rounded-lg ">
              <div className="flex items-center gap-2">
                <div className="text-sm font-medium w-12">22:00</div>
                <img
                  alt="moderate rain"
                  className="w-10 h-10"
                  src="https://openweathermap.org/img/wn/10n.png"
                />
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">24°C</span>
                  <span className="text-sm text-gray-300">/</span>
                  <span className="text-sm text-gray-500">24°C</span>
                </div>
              </div>
              <div className="text-sm capitalize font-semibold">
                moderate rain
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default WeatherForecast;
