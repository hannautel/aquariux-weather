jest.mock('react-router', () => ({
  useSearchParams: jest.fn(),
}));

jest.mock('@modules/location-search/hooks/useLocationsByKeyword', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock(
  '../LocationSearchResultList',
  () =>
    ({ locations }: { locations: ILocation[] }) => (
      <div data-testid="result-list">{locations.length} results</div>
    ),
);

import { render, screen } from '@testing-library/react';
import LocationSearchResult from '../LocationSearchResult';
import { useSearchParams } from 'react-router';
import useLocationsByKeyword from '@modules/location-search/hooks/useLocationsByKeyword';
import { ILocation } from '@typed/location';

const mockUseSearchParams = useSearchParams as jest.Mock;
const mockUseLocationsByKeyword = useLocationsByKeyword as jest.Mock;

describe('<LocationSearchResult />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when there is no keyword in search params', () => {
    it('should return null', () => {
      const mockParams = new URLSearchParams('');
      mockUseSearchParams.mockReturnValue([mockParams]);
      mockUseLocationsByKeyword.mockReturnValue({
        isLoadingLocations: false,
        locations: [],
      });

      const { container } = render(<LocationSearchResult />);
      expect(container.firstChild).toBeNull();
    });
  });

  describe('when isLoadingLocations is true', () => {
    it('should show loading template', () => {
      const mockParams = new URLSearchParams('keyword=Hanoi');
      mockUseSearchParams.mockReturnValue([mockParams]);
      mockUseLocationsByKeyword.mockReturnValue({
        isLoadingLocations: true,
        locations: [],
      });

      render(<LocationSearchResult />);
      expect(screen.getByText(/Search Results/i)).toBeInTheDocument();
      expect(document.querySelectorAll('.animate-pulse').length).toBe(2);
    });
  });

  describe('when locations are empty', () => {
    it('should show error message', () => {
      const mockParams = new URLSearchParams('keyword=Nowhere');
      mockUseSearchParams.mockReturnValue([mockParams]);
      mockUseLocationsByKeyword.mockReturnValue({
        isLoadingLocations: false,
        locations: [],
      });

      render(<LocationSearchResult />);
      expect(screen.getByText(/Invalid country or city/i)).toBeInTheDocument();
    });
  });

  describe('when locations has items', () => {
    it('should render the list correctly', () => {
      const mockParams = new URLSearchParams('keyword=Tokyo');
      mockUseSearchParams.mockReturnValue([mockParams]);
      mockUseLocationsByKeyword.mockReturnValue({
        isLoadingLocations: false,
        locations: [
          { name: 'Tokyo', lat: 35.68, lon: 139.69, country: 'JP', state: '' },
          { name: 'Kyoto', lat: 35.01, lon: 135.76, country: 'JP', state: '' },
        ],
      });

      render(<LocationSearchResult />);
      expect(screen.getByTestId('result-list')).toHaveTextContent('2 results');
    });
  });
});
