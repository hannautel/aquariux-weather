import { Route, Routes } from 'react-router';
import Header from '@core/Header';
import { initAxios } from '@configs/axios';
import { lazy, Suspense } from 'react';
import SelectedLocationProvider from './contexts/SelectedLocationContext';

const Weather = lazy(() => import('@modules/weather/Weather'));
const WeatherSeach = lazy(
  () => import('@modules/location-search/LocationSearch'),
);

initAxios();

function App() {
  return (
    <SelectedLocationProvider>
      <div className="w-full h-full">
        <Header />
        <main className="pt-[60px]">
          <div className="max-w-2xl xs:w-full sm:w-md mx-auto p-4">
            <Suspense fallback={<div className="text-center">Loading...</div>}>
              <Routes>
                <Route index element={<Weather />} />
                <Route path="search" element={<WeatherSeach />} />
              </Routes>
            </Suspense>
          </div>
        </main>
      </div>
    </SelectedLocationProvider>
  );
}

export default App;
