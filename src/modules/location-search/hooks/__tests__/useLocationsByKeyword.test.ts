jest.mock('@apis/location.api');
jest.mock('@hooks/useDicslosure');
jest.spyOn(console, 'error').mockImplementation(() => jest.fn());

import { renderHook, act } from '@testing-library/react';
import { getCitiesByKeyword } from '@apis/location.api';
import { useDisclosure } from '@hooks/useDicslosure';
import useLocationsByKeyword from '../useLocationsByKeyword';

const mockGetCitiesByKeyword = getCitiesByKeyword as jest.Mock;
const mockUseDisclosure = useDisclosure as jest.Mock;

describe('useLocationsByKeyword', () => {
  const startLoadingLocations = jest.fn();
  const finishLoadingLocations = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseDisclosure.mockReturnValue({
      isOpen: false,
      onOpen: startLoadingLocations,
      onClose: finishLoadingLocations,
    });
  });

  const mockLocationList = [
    {
      name: 'Hanoi',
      lat: 21.0285,
      lon: 105.8542,
      state: 'Hanoi',
      country: 'VN',
    },
    {
      name: 'Ho Chi Minh City',
      lat: 10.762622,
      lon: 106.660172,
      state: 'Ho Chi Minh',
      country: 'VN',
    },
  ];

  describe('when keyword is not empty', () => {
    it('should cann api with keyword and set the locations correctly', async () => {
      mockGetCitiesByKeyword.mockResolvedValue(mockLocationList);

      const { result } = renderHook(() => useLocationsByKeyword('Vietnam'));

      await act(async () => {});

      expect(startLoadingLocations).toHaveBeenCalled();
      expect(mockGetCitiesByKeyword).toHaveBeenCalledWith('Vietnam');
      expect(result.current.locations).toEqual(mockLocationList);
      expect(finishLoadingLocations).toHaveBeenCalled();
    });
  });

  describe('when keyword is empty', () => {
    it('should clear the locations', async () => {
      const { result } = renderHook(() => useLocationsByKeyword(''));

      await act(async () => {});

      expect(mockGetCitiesByKeyword).not.toHaveBeenCalled();
      expect(result.current.locations).toEqual([]);
      expect(finishLoadingLocations).toHaveBeenCalled();
    });
  });

  describe('when having any api error', () => {
    it('should clear the locations', async () => {
      mockGetCitiesByKeyword.mockRejectedValue(new Error('API failure'));

      const { result } = renderHook(() => useLocationsByKeyword('test'));

      await act(async () => {}); // let effect run

      expect(mockGetCitiesByKeyword).toHaveBeenCalledWith('test');
      expect(result.current.locations).toEqual([]);
      expect(finishLoadingLocations).toHaveBeenCalled();
    });
  });
});
