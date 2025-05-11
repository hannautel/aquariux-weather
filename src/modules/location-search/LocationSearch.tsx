import LocationSearchResult from './parts/location-search-result/LocationSearchResult';
import LocationSearchHistory from './parts/location-seach-history/LocationSearchHistory';
import LocationSearchBox from './parts/location-search-box/LocationSearchBox';

function LocationSearch() {
  return (
    <>
      <LocationSearchBox />
      <LocationSearchResult />
      <div className="mt-6">
        <LocationSearchHistory />
      </div>
    </>
  );
}

export default LocationSearch;
