jest.spyOn(console, 'log').mockImplementation(() => jest.fn());
jest.mock('@apis/weather.api', () => ({
  getWeatherOfLocation: jest.fn().mockResolvedValue({
    temp: 27,
    humidity: 70,
    condition: 'Mocked',
  }),
}));
jest.mock('@hooks/useDicslosure');

import { renderHook, act } from '@testing-library/react';
import { getWeatherOfLocation } from '@apis/weather.api';
import { useDisclosure } from '@hooks/useDicslosure';
import useCurrentWeather from '../useCurrentWeather';

const mockedGetWeather = getWeatherOfLocation as jest.Mock;
const mockedUseDisclosure = useDisclosure as jest.Mock;

describe('useCurrentWeather', () => {
  const mockStart = jest.fn();
  const mockFinish = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockedUseDisclosure.mockReturnValue({
      isOpen: false,
      onOpen: mockStart,
      onClose: mockFinish,
    });
  });

  describe('when init the hook', () => {
    it('should fetch and set weather data', async () => {
      const mockWeather = { temp: 30, condition: 'Sunny' };
      mockedGetWeather.mockResolvedValue(mockWeather);

      const { result } = renderHook(() => useCurrentWeather(10, 20));

      await act(async () => {}); // wait for useEffect run

      expect(mockStart).toHaveBeenCalled();
      expect(mockedGetWeather).toHaveBeenCalledWith(10, 20);
      expect(result.current.weather).toEqual(mockWeather);
      expect(result.current.isLoadingWeather).toBe(false);
      expect(mockFinish).toHaveBeenCalled();
    });

    describe('when having error', () => {
      it('should set weather too null', async () => {
        mockedGetWeather.mockRejectedValue(new Error('Network error'));
        const { result } = renderHook(() => useCurrentWeather(5, 15));

        await act(async () => {});

        expect(mockStart).toHaveBeenCalled();
        expect(mockedGetWeather).toHaveBeenCalledWith(5, 15);
        expect(result.current.weather).toBeNull();
        expect(mockFinish).toHaveBeenCalled();
      });
    });
  });
});
