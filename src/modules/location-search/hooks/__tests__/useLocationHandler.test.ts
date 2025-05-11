jest.mock('@utils/location-history.util', () => ({
  getSearchHistory: jest.fn(),
}));

jest.mock('@utils/localstorage.util', () => ({
  setLocalstorageItem: jest.fn(),
}));

jest.mock('@contexts/SelectedLocationContext', () => ({
  useSelectedLocationContext: jest.fn(),
}));

jest.mock('react-router', () => ({
  useNavigate: jest.fn(),
}));

import { renderHook } from '@testing-library/react';
import { getSearchHistory } from '@utils/location-history.util';
import { setLocalstorageItem } from '@utils/localstorage.util';
import { useSelectedLocationContext } from '@contexts/SelectedLocationContext';
import { useNavigate } from 'react-router';
import LOCALSTORAGE_KEYS from '@constants/localstorage';
import useLocationHandler from '../useLocationHandler';
import { ILocation } from '@typed/location';

const mockGetSearchHistory = getSearchHistory as jest.Mock;
const mockSetLocalstorageItem = setLocalstorageItem as jest.Mock;
const mockUseSelectedLocationContext = useSelectedLocationContext as jest.Mock;
const mockUseNavigate = useNavigate as jest.Mock;

describe('useLocationHandler', () => {
  const mockOnChangeCoord = jest.fn();
  const mockNavigate = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseSelectedLocationContext.mockReturnValue({
      onChangeCoord: mockOnChangeCoord,
    });
    mockUseNavigate.mockReturnValue(mockNavigate);
  });

  const sampleLocation: ILocation = {
    name: 'Hanoi',
    lat: 21.0285,
    lon: 105.8542,
    state: 'HN',
    country: 'VN',
  };

  describe('when selecting a new location', () => {
    it('should add new location to search history and navigate', () => {
      mockGetSearchHistory.mockReturnValue([]);
      const { result } = renderHook(() => useLocationHandler());
      result.current.onSelectLocation(sampleLocation);

      expect(mockOnChangeCoord).toHaveBeenCalledWith(sampleLocation);
      expect(mockSetLocalstorageItem).toHaveBeenCalledWith(
        LOCALSTORAGE_KEYS.WEARTHER_HISTORY,
        JSON.stringify([sampleLocation]),
      );
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  describe('when selecting a location that existed in history', () => {
    it('should move existing location to the top', () => {
      const mockFirstLocation: ILocation = {
        name: 'Singapore',
        lat: 12.0285,
        lon: 103.8542,
        state: '',
        country: 'SG',
      };
      mockGetSearchHistory.mockReturnValue([mockFirstLocation, sampleLocation]);

      const { result } = renderHook(() => useLocationHandler());

      result.current.onSelectLocation(sampleLocation);

      expect(mockSetLocalstorageItem).toHaveBeenCalledWith(
        LOCALSTORAGE_KEYS.WEARTHER_HISTORY,
        JSON.stringify([sampleLocation, mockFirstLocation]),
      );
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  describe('when remove location from history', () => {
    describe('when location is found in list', () => {
      it('should save the locations without the removed one', () => {
        const secondLocation = {
          ...sampleLocation,
          name: 'Hue',
          lat: 16.4637,
          lon: 107.5909,
        };
        mockGetSearchHistory.mockReturnValue([sampleLocation, secondLocation]);
        const { result } = renderHook(() => useLocationHandler());
        result.current.onRemoveLocation(secondLocation);
        expect(mockSetLocalstorageItem).toHaveBeenCalledWith(
          LOCALSTORAGE_KEYS.WEARTHER_HISTORY,
          JSON.stringify([sampleLocation]),
        );
      });
    });

    describe('when location is not found in the list', () => {
      it('should save not change the list in storage', () => {
        mockGetSearchHistory.mockReturnValue([sampleLocation]);
        const { result } = renderHook(() => useLocationHandler());
        result.current.onRemoveLocation({
          ...sampleLocation,
          lat: 99,
          lon: 99,
        });
        expect(mockSetLocalstorageItem).not.toHaveBeenCalled();
      });
    });
  });
});
