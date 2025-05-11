import LocationSearchResultList from './LocationSearchResultList';
import { useSearchParams } from 'react-router';
import useCitiesByKeyword from '@modules/location-search/hooks/useLocationsByKeyword';

function LocationSearchResult() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || '';

  const { isLoadingLocations, locations } = useCitiesByKeyword(keyword);

  if (!keyword) return null;

  if (isLoadingLocations) {
    return (
      <div className="mt-5">
        <h2 className="text-base font-medium text-left mb-2">Search Results</h2>
        <div className="py-2 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="w-full px-3 py-1 animate-pulse h-[52px]">
            <div className="bg-gray-200 h-full rounded-lg" />
          </div>
          <div className="w-full px-3 py-1 h-[52px] animate-pulse">
            <div className="bg-gray-200 h-full rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  if (locations.length === 0) {
    return (
      <div className="text-red-500 text-sm text-left mt-2">
        Invalid country or city
      </div>
    );
  }

  return <LocationSearchResultList locations={locations} />;
}

export default LocationSearchResult;
