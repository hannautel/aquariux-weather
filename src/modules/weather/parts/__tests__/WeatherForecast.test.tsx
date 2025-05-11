jest.mock('@contexts/SelectedLocationContext');
jest.mock('@modules/weather/hooks/useWeatherForecast');
jest.mock('@utils/weather.util', () => ({
  getWeatherIcon: jest.fn(() => 'mocked-icon-url'),
}));

import { render, screen } from '@testing-library/react';
import WeatherForecast from '../WeatherForecast';
import { useSelectedLocationContext } from '@contexts/SelectedLocationContext';
import useWeatherForecast from '@modules/weather/hooks/useWeatherForecast';
import dayjs from 'dayjs';

const mockUseSelectedLocationContext = useSelectedLocationContext as jest.Mock;
const mockUseWeatherForecast = useWeatherForecast as jest.Mock;

describe('<WeatherForecast />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseSelectedLocationContext.mockReturnValue({
      coord: {
        lat: 10,
        lon: 20,
        name: 'Test City',
        state: '',
        country: 'VN',
      },
    });
  });

  describe('when isLoadingWeather is true', () => {
    it('should render loading state', () => {
      mockUseWeatherForecast.mockReturnValue({
        isLoadingWeather: true,
        forecastGroups: [],
      });

      render(<WeatherForecast />);
      expect(
        screen.getByText(/5-day Forecast \(3 hours\)/i),
      ).toBeInTheDocument();
      expect(document.querySelector('.animate-pulse')).toBeInTheDocument();
    });
  });

  describe('when the forecast is empty list', () => {
    it('should render message correctly', () => {
      mockUseWeatherForecast.mockReturnValue({
        isLoadingWeather: false,
        forecastGroups: [],
      });

      render(<WeatherForecast />);
      expect(screen.getByText(/404/)).toBeInTheDocument();
      expect(
        screen.getByText(/Sorry, We can not load the forecast/i),
      ).toBeInTheDocument();
    });
  });

  describe('when forecast has items', () => {
    it('should render forecast items grouped by date', () => {
      const now = Math.floor(Date.now() / 1000);

      mockUseWeatherForecast.mockReturnValue({
        isLoadingWeather: false,
        forecastGroups: [
          {
            date: now,
            forecast: [
              {
                time: '09:00',
                min: 22,
                max: 30,
                temp: 26,
                icon: '01d',
                state: 'clear sky',
              },
              {
                time: '12:00',
                min: 24,
                max: 32,
                temp: 28,
                icon: '02d',
                state: 'sunny',
              },
            ],
          },
        ],
      });

      render(<WeatherForecast />);

      expect(screen.getByText(/5-day Forecast/i)).toBeInTheDocument();

      expect(screen.getByText('09:00')).toBeInTheDocument();
      expect(screen.getByText('12:00')).toBeInTheDocument();
      expect(screen.getByText('22°C')).toBeInTheDocument();
      expect(screen.getByText('30°C')).toBeInTheDocument();
      expect(screen.getByText('24°C')).toBeInTheDocument();
      expect(screen.getByText('32°C')).toBeInTheDocument();
      expect(screen.getByText(/clear sky/i)).toBeInTheDocument();
      expect(screen.getByText(/sunny/i)).toBeInTheDocument();

      const images = screen.getAllByRole('img');
      images.forEach((img) =>
        expect(img).toHaveAttribute('src', 'mocked-icon-url'),
      );
    });

    describe('when has forecast data for today', () => {
      it('should render Today section', () => {
        mockUseWeatherForecast.mockReturnValue({
          isLoadingWeather: false,
          forecastGroups: [
            {
              date: dayjs().startOf('day').unix(),
              forecast: [
                {
                  time: '09:00',
                  min: 22,
                  max: 30,
                  temp: 26,
                  icon: '01d',
                  state: 'clear sky',
                },
                {
                  time: '12:00',
                  min: 24,
                  max: 32,
                  temp: 28,
                  icon: '02d',
                  state: 'sunny',
                },
              ],
            },
          ],
        });
        render(<WeatherForecast />);
        expect(screen.getByText(/Today/i)).toBeInTheDocument();
      });
    });

    describe('when has forecast no data for today', () => {
      it('should not render Today section', () => {
        mockUseWeatherForecast.mockReturnValue({
          isLoadingWeather: false,
          forecastGroups: [
            {
              date: dayjs().add(1, 'day').startOf('day').unix(),
              forecast: [
                {
                  time: '09:00',
                  min: 22,
                  max: 30,
                  temp: 26,
                  icon: '01d',
                  state: 'clear sky',
                },
                {
                  time: '12:00',
                  min: 24,
                  max: 32,
                  temp: 28,
                  icon: '02d',
                  state: 'sunny',
                },
              ],
            },
          ],
        });
        render(<WeatherForecast />);
        expect(screen.queryByText(/Today/i)).not.toBeInTheDocument();
      });
    });
  });
});
