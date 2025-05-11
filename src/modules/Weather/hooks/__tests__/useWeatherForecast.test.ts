jest.mock('@apis/weather.api');
jest.mock('@hooks/useDicslosure');
jest.spyOn(console, 'log').mockImplementation(() => jest.fn());

import { renderHook, act } from '@testing-library/react';
import useWeatherForecast from '../useWeatherForecast'; // adjust this path
import { get5DaysForecastOfLocation } from '@apis/weather.api';
import { useDisclosure } from '@hooks/useDicslosure';

const mockGetForecast = get5DaysForecastOfLocation as jest.Mock;
const mockUseDisclosure = useDisclosure as jest.Mock;

describe('useWeatherForecast', () => {
  const startLoading = jest.fn();
  const finishLoading = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseDisclosure.mockReturnValue({
      isOpen: false,
      onOpen: startLoading,
      onClose: finishLoading,
    });
  });

  describe('when init the hook', () => {
    it('should fetch and group forecasts by date', async () => {
      mockGetForecast.mockResolvedValue([
        {
          dt: 1715451600,
          main: { temp_min: 20, temp_max: 30, temp: 25 },
          weather: [{ description: 'clear sky', icon: '01d' }],
        },
        {
          dt: 1715458800,
          main: { temp_min: 21, temp_max: 31, temp: 26 },
          weather: [{ description: 'few clouds', icon: '02d' }],
        },
      ]);

      const { result } = renderHook(() => useWeatherForecast(10, 20));

      await act(async () => {});

      expect(startLoading).toHaveBeenCalled();
      expect(mockGetForecast).toHaveBeenCalledWith(10, 20);
      expect(result.current.forecastGroups).toHaveLength(1); // 1 group by date
      expect(result.current.forecastGroups[0].forecast).toHaveLength(2);
      expect(finishLoading).toHaveBeenCalled();
    });
  });

  describe('when api is returning error', () => {
    it('should set empty forecast', async () => {
      mockGetForecast.mockRejectedValue(new Error('API failed'));

      const { result } = renderHook(() => useWeatherForecast(30, 40));

      await act(async () => {});

      expect(mockGetForecast).toHaveBeenCalledWith(30, 40);
      expect(result.current.forecastGroups).toEqual([]);
      expect(finishLoading).toHaveBeenCalled();
    });
  });
});
