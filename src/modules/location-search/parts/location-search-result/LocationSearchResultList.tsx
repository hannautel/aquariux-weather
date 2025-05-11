import { memo } from 'react';
import type { ILocation } from '@typed/location';
import useLocationHandler from '@modules/location-search/hooks/useLocationHandler';
import LocationInfo from '@modules/location-search/components/LocationInfo';

interface Props {
  locations: ILocation[];
}

function LocationSearchResultList({ locations }: Props) {
  const { onSelectLocation } = useLocationHandler();

  function handleSelectToSearch(location: ILocation) {
    onSelectLocation(location);
  }

  return (
    <div className="mt-5">
      <h2 className="text-base font-medium text-left mb-2">Search Results</h2>
      <div className="py-2 bg-white rounded-lg shadow-sm border border-gray-200">
        {locations.map((location) => (
          <button
            className="w-full px-3 py-1 text-left rounded-none hover:bg-gray-200"
            key={`${location.lat}-${location.lon}`}
            onClick={() => handleSelectToSearch(location)}>
            <LocationInfo location={location} />
          </button>
        ))}
      </div>
    </div>
  );
}

export default memo(LocationSearchResultList);
