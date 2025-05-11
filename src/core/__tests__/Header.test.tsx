import { screen } from '@testing-library/react';
import Header from '../Header';
import { useSelectedLocationContext } from '@contexts/SelectedLocationContext';
import {
  renderWithRouter,
  rerenderWithRouter,
} from '@root/__tests__/utils/renderWithRouter.helper';
import { ILocation } from '@typed/location';

jest.mock('@contexts/SelectedLocationContext', () => ({
  useSelectedLocationContext: jest.fn(),
}));

const mockedUseSelectedLocationContext =
  useSelectedLocationContext as jest.Mock;

describe('<Header />', () => {
  beforeEach(() => {
    const location: ILocation = {
      lat: 10,
      lon: 20,
      name: 'Test City',
      state: 'Test State',
      country: 'Test Country',
    };
    mockedUseSelectedLocationContext.mockReturnValue({
      coord: location,
    });
  });

  describe('when init', () => {
    it('should render location name and country', () => {
      renderWithRouter(<Header />);
      expect(screen.getByText(/Test City, Test Country/i)).toBeInTheDocument();
    });

    it('should render home and search links', () => {
      renderWithRouter(<Header />);
      const links = screen.getAllByRole('link');
      expect(links).toHaveLength(2);
      expect(links[0]).toHaveAttribute('href', '/');
      expect(links[1]).toHaveAttribute('href', '/search');
    });
  });

  describe('when coord change', () => {
    mockedUseSelectedLocationContext.mockImplementation(() => ({
      coord: {
        lat: 10,
        lon: 20,
        name: 'Singapore',
        state: '',
        country: 'SG',
      },
    }));

    const { rerender } = renderWithRouter(<Header />);
    expect(screen.getByText(/Singapore, SG/i)).toBeInTheDocument();

    mockedUseSelectedLocationContext.mockImplementation(() => ({
      coord: {
        lat: 99,
        lon: 88,
        name: 'Ho Chi Minh',
        state: '',
        country: 'VN',
      },
    }));

    rerenderWithRouter(<Header />, rerender);

    expect(screen.getByText(/Ho Chi Minh, VN/i)).toBeInTheDocument();
  });
});
