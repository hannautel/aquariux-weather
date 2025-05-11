function WeatherLoading() {
  return (
    <div
      className="p-4 bg-white rounded-lg shadow-lg border animate-pulse border-gray-200"
      aria-label="weather loading"
      role="presentation">
      <div className="w-30 h-6 bg-gray-200" />
      <div className="flex items-center justify-between mt-4">
        <div className="w-1/2 flex justify-center">
          <div className="size-32 rounded-full bg-gray-200" />
        </div>
        <div className="w-1/2 inline-block text-center">
          <div className="w-20 h-12 bg-gray-200" />
          <div className="w-20 h-5 bg-gray-200" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-4 text-center">
        <div>
          <div className="w-20 h-5 bg-gray-200" />
          <div className="mt-1 w-20 h-7 bg-gray-200" />
        </div>
        <div>
          <div className="w-20 h-5 bg-gray-200" />
          <div className="mt-1 w-20 h-7 bg-gray-200" />
        </div>
        <div>
          <div className="w-20 h-5 bg-gray-200" />
          <div className="mt-1 w-20 h-7 bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

export default WeatherLoading;
