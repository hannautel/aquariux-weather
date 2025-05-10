import { MapPin, SearchIcon } from 'lucide-react';

function Header() {
  return (
    <header className="fixed top-0 left-0 w-full shadow bg-white">
      <div className="max-w-2xl xs:w-full sm:w-md mx-auto p-4 space-y-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 m-0">
          <MapPin fontSize="20px" />
          <h5 className="text-lg font-medium text-gray-900">Singapore, SG</h5>
        </div>
        <button className="leading-0" role="button">
          <SearchIcon fontSize="20px" />
        </button>
      </div>
    </header>
  );
}

export default Header;
