jest.mock('@utils/location-history.util', () => ({
  getSearchHistory: jest.fn(),
}));

jest.mock('@modules/location-search/hooks/useLocationHandler', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock(
  '@modules/location-search/components/LocationInfo',
  () =>
    ({ location }: { location: ILocation }) => (
      <div data-testid="location-info">{location.name}</div>
    ),
);

import { render, screen, fireEvent } from '@testing-library/react';
import LocationSearchHistory from '../LocationSearchHistory';
import { getSearchHistory } from '@utils/location-history.util';
import useLocationHandler from '@modules/location-search/hooks/useLocationHandler';
import { ILocation } from '@typed/location';

const mockGetSearchHistory = getSearchHistory as jest.Mock;
const mockUseLocationHandler = useLocationHandler as jest.Mock;

describe('<LocationSearchHistory />', () => {
  const mockSelect = jest.fn();
  const mockRemove = jest.fn();

  const sampleLocations = [
    { name: 'Hanoi', lat: 21.0285, lon: 105.8542, state: '', country: 'VN' },
    { name: 'Da Nang', lat: 16.0471, lon: 108.206, state: '', country: 'VN' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseLocationHandler.mockReturnValue({
      onSelectLocation: mockSelect,
      onRemoveLocation: mockRemove,
    });
  });

  describe('when history list is empty', () => {
    it('should show empty message', () => {
      mockGetSearchHistory.mockReturnValue([]);

      render(<LocationSearchHistory />);
      expect(
        screen.getByText(/no search history available/i),
      ).toBeInTheDocument();
    });
  });

  describe('when history has items', () => {
    it('should render history correctly', () => {
      mockGetSearchHistory.mockReturnValue(sampleLocations);

      render(<LocationSearchHistory />);

      const items = screen.getAllByTestId('location-info');
      expect(items).toHaveLength(2);
    });

    describe('when clicking to choose the location', () => {
      it('should call action correctly', () => {
        mockGetSearchHistory.mockReturnValue(sampleLocations);

        render(<LocationSearchHistory />);

        const items = screen.getAllByTestId('location-info');
        fireEvent.click(items[0].closest('div')!);

        expect(mockSelect).toHaveBeenCalledWith(sampleLocations[0]);
      });
    });

    describe('when clicking to remove the history', () => {
      it('should call action correctly', () => {
        mockGetSearchHistory.mockReturnValue(sampleLocations);
        const firstSampleLocation = sampleLocations[0];

        render(<LocationSearchHistory />);

        const trashButtons = screen.getAllByRole('button', { name: '' });
        fireEvent.click(trashButtons[1]);

        expect(mockRemove).toHaveBeenCalledWith(firstSampleLocation);
      });
    });
  });
});
