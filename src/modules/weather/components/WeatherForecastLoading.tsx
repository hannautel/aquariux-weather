function WeatherForecastLoading() {
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

export default WeatherForecastLoading;
