import { Route, Routes } from 'react-router';
import Weather from './modules/Weather';
import WeatherSeach from './modules/WeatherSearch';
import { MapPin } from 'lucide-react';

function App() {
  return (
    <div className="w-full h-full">
      <MapPin fontSize="20px" />
      <Routes>
        <Route index element={<Weather />} />
        <Route path="search" element={<WeatherSeach />} />
      </Routes>
    </div>
  );
}

export default App;
