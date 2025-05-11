import { useState } from 'react';
import { SearchIcon, TrashIcon } from 'lucide-react';
import useConst from '@hooks/useConst';
import useLocationHandler from '@modules/location-search/hooks/useLocationHandler';
import { getSearchHistory } from '@utils/location-history.util';
import type { ILocation } from '@typed/location';
import LocationInfo from '@modules/location-search/components/LocationInfo';

function LocationSearchHistory() {
  const { onSelectLocation } = useLocationHandler();
  const inititalHistories = useConst<ILocation[]>(getSearchHistory);
  const [searchHistories, setSearchHistories] =
    useState<ILocation[]>(inititalHistories);

  function handleSearch(location: ILocation) {
    onSelectLocation(location);
  }

  function handleDeleteSearchHistory(rowIndex: number) {
    setSearchHistories((listSearchHistories) => {
      listSearchHistories.splice(rowIndex, 1);
      return [...listSearchHistories];
    });
  }

  if (searchHistories.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No search history available.
      </div>
    );
  }

  return (
    <>
      <h2 className="text-base font-medium text-left mb-2">Search History</h2>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 py-2.5">
        {searchHistories.map((searchHistory, rowIndex) => (
          <div
            className="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-gray-200"
            key={`${searchHistory.lat}-${searchHistory.lon}`}
            onClick={() => handleSearch(searchHistory)}>
            <div>
              <LocationInfo location={searchHistory} />
            </div>
            <div className="flex items-center gap-1">
              <button className="p-1 text-gray-700 hover:text-blue-600 transition-colors">
                <SearchIcon size="20" />
              </button>
              <button
                className="p-1 text-gray-700 hover:text-red-500 transition-colors"
                onClick={(event) => {
                  event.stopPropagation();
                  handleDeleteSearchHistory(rowIndex);
                }}>
                <TrashIcon size="20" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default LocationSearchHistory;
