import { Route, Routes } from 'react-router';
import Weather from './modules/Weather';
import WeatherSeach from './modules/WeatherSearch';

function App() {
  return (
    <div className="w-full h-full">
      <Routes>
        <Route index element={<Weather />} />
        <Route path="search" element={<WeatherSeach />} />
      </Routes>
    </div>
  );
}

export default App;
