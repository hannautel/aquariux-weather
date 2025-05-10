import { Route, Routes } from 'react-router';
import Header from './core/Header';
import Weather from './modules/Weather';
import WeatherSeach from './modules/WeatherSearch';

function App() {
  return (
    <div className="w-full h-full">
      <Header />
      <main className="pt-[60px]">
        <div className="max-w-2xl xs:w-full sm:w-md mx-auto p-4 space-y-4">
          <Routes>
            <Route index element={<Weather />} />
            <Route path="search" element={<WeatherSeach />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
