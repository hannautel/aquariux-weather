import { Link } from 'react-router';
import { MapPin, SearchIcon } from 'lucide-react';
import { useSelectedLocationContext } from '@contexts/SelectedLocationContext';

function Header() {
  const { coord } = useSelectedLocationContext();

  return (
    <header className="fixed top-0 left-0 w-full shadow bg-white">
      <div className="max-w-2xl xs:w-full sm:w-md mx-auto p-4 flex items-center justify-between gap-2">
        <Link to="/">
          <div className="flex items-center gap-2 m-0">
            <MapPin fontSize="20px" />
            <h5 className="text-lg font-medium text-gray-900">
              {coord.name}, {coord.country}
            </h5>
          </div>
        </Link>
        <Link to="/search">
          <SearchIcon fontSize="20px" />
        </Link>
      </div>
    </header>
  );
}

export default Header;
