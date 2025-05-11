jest.mock('@contexts/SelectedLocationContext');
jest.mock('@modules/weather/hooks/useCurrentWeather');
jest.mock('@utils/weather.util', () => ({
  getWeatherIcon: jest.fn(() => 'mocked-icon-url'),
  getWeatherVisibility: jest.fn(() => '10 km'),
}));

import { render, screen } from '@testing-library/react';
import WeatherDetail from '../WeatherDetail';
import { useSelectedLocationContext } from '@contexts/SelectedLocationContext';
import useCurrentWeather from '@modules/Weather/hooks/useCurrentWeather';
import { IWeather } from '@typed/weather';

const mockUseSelectedLocationContext = useSelectedLocationContext as jest.Mock;
const mockUseCurrentWeather = useCurrentWeather as jest.Mock;

describe('<WeatherDetail />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseSelectedLocationContext.mockReturnValue({
      coord: {
        lat: 10,
        lon: 20,
        name: 'Test City',
        state: '',
        country: 'TC',
      },
    });
    mockUseCurrentWeather.mockReturnValue({
      isLoadingWeather: false,
      weather: null,
    });
  });

  describe('when loading weather data', () => {
    it('should show loading component', () => {
      mockUseCurrentWeather.mockReturnValue({
        isLoadingWeather: true,
        weather: null,
      });
      render(<WeatherDetail />);
      expect(
        screen.getByRole('presentation', { name: /weather loading/i }),
      ).toBeInTheDocument();
    });
  });

  describe('when weather is null', () => {
    it('should show not found template', () => {
      mockUseCurrentWeather.mockReturnValue({
        isLoadingWeather: false,
        weather: null,
      });

      render(<WeatherDetail />);
      expect(screen.getByText(/404/)).toBeInTheDocument();
      expect(
        screen.getByText(/Sorry, We can not load the forecast/i),
      ).toBeInTheDocument();
    });
  });

  describe('when weather is valid', () => {
    it('should render weather data correctly', () => {
      const validWeather: IWeather = {
        main: {
          temp: 28.5,
          humidity: 65,
          feels_like: 0,
          temp_min: 0,
          temp_max: 0,
          pressure: 0,
          sea_level: 0,
          grnd_level: 0,
        },
        wind: { deg: 90, speed: 3.5 },
        visibility: 10000,
        weather: [
          {
            icon: '01d',
            description: 'clear sky',
            id: 0,
            main: '',
          },
        ],
        coord: { lat: 0, lon: 0 },
        base: '',
        clouds: { all: 0 },
        dt: 0,
        sys: {
          country: 'SG',
          sunrise: 1,
          sunset: 2,
        },
        timezone: 0,
        id: 0,
        name: '',
        cod: 0,
      };
      mockUseCurrentWeather.mockReturnValue({
        isLoadingWeather: false,
        weather: validWeather,
      });

      render(<WeatherDetail />);

      expect(screen.getByText(/28°C/)).toBeInTheDocument();
      expect(screen.getByText(/clear sky/i)).toBeInTheDocument();
      expect(screen.getByText(/65%/)).toBeInTheDocument();
      expect(screen.getByText(/3.5 m\/s/)).toBeInTheDocument();
      expect(screen.getByText(/10 km/)).toBeInTheDocument();
      expect(screen.getByRole('img')).toHaveAttribute('src', 'mocked-icon-url');
    });

    describe('when speed value is not exist', () => {
      it('should show correct value', () => {
        const validWeather: IWeather = {
          main: {
            temp: 28.5,
            humidity: 65,
            feels_like: 0,
            temp_min: 0,
            temp_max: 0,
            pressure: 0,
            sea_level: 0,
            grnd_level: 0,
          },
          wind: { deg: 90, speed: 3.5 },
          visibility: 10000,
          weather: [
            {
              icon: '01d',
              description: 'clear sky',
              id: 0,
              main: '',
            },
          ],
          coord: { lat: 0, lon: 0 },
          base: '',
          clouds: { all: 0 },
          dt: 0,
          sys: {
            country: 'SG',
            sunrise: 1,
            sunset: 2,
          },
          timezone: 0,
          id: 0,
          name: '',
          cod: 0,
        };
        mockUseCurrentWeather.mockReturnValue({
          isLoadingWeather: false,
          weather: {
            ...validWeather,
            wind: {
              ...validWeather.wind,
              speed: undefined,
            },
          },
        });
        render(<WeatherDetail />);
        expect(screen.getByText(/0 m\/s/)).toBeInTheDocument();
      });
    });
  });
});
