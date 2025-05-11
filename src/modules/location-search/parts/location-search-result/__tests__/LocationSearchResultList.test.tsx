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
import LocationSearchResultList from '../LocationSearchResultList';
import useLocationHandler from '@modules/location-search/hooks/useLocationHandler';
import { ILocation } from '@typed/location';

const mockUseLocationHandler = useLocationHandler as jest.Mock;

describe('<LocationSearchResultList />', () => {
  const mockOnSelectLocation = jest.fn();

  const mockLocations = [
    {
      name: 'Hanoi',
      lat: 21.0285,
      lon: 105.8542,
      state: '',
      country: 'VN',
    },
    {
      name: 'Tokyo',
      lat: 35.6762,
      lon: 139.6503,
      state: '',
      country: 'JP',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseLocationHandler.mockReturnValue({
      onSelectLocation: mockOnSelectLocation,
    });
  });

  it('should render locations correctly', () => {
    render(<LocationSearchResultList locations={mockLocations} />);

    const items = screen.getAllByTestId('location-info');
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent('Hanoi');
    expect(items[1]).toHaveTextContent('Tokyo');
  });

  describe('when click on location item', () => {
    it('should call onSelectLocation correctly', () => {
      render(<LocationSearchResultList locations={mockLocations} />);

      const buttons = screen.getAllByRole('button');
      fireEvent.click(buttons[1]);

      expect(mockOnSelectLocation).toHaveBeenCalledWith(mockLocations[1]);
    });
  });
});
