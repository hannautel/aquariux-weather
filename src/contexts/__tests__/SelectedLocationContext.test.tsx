import { render, screen } from '@testing-library/react';
import SelectedLocationProvider, {
  useSelectedLocationContext,
} from '../SelectedLocationContext';
import { DEFAULT_COORDINATE } from '@constants/coordinate';
import * as locationUtils from '@utils/location-history.util';
import userEvent from '@testing-library/user-event';

// Mock useConst (if it affects memoization)
jest.mock('@hooks/useConst', () => ({
  __esModule: true,
  default: (factory: () => void) => factory(),
}));

// Mock getSearchHistory
jest.mock('@utils/location-history.util', () => ({
  getSearchHistory: jest.fn(),
}));

const DummyComponent = () => {
  const { coord, onChangeCoord } = useSelectedLocationContext();

  return (
    <div>
      <div data-testid="coord">{JSON.stringify(coord)}</div>
      <button
        onClick={() =>
          onChangeCoord({
            lat: 10,
            lon: 20,
            name: 'New City',
            state: 'State',
            country: 'Country',
          })
        }>
        Change Coord
      </button>
    </div>
  );
};

describe('SelectedLocationProvider', () => {
  it('should use DEFAULT_COORDINATE when no search history exists', () => {
    (locationUtils.getSearchHistory as jest.Mock).mockReturnValue([]);

    render(
      <SelectedLocationProvider>
        <DummyComponent />
      </SelectedLocationProvider>,
    );

    const coord = screen.getByTestId('coord').textContent;
    expect(coord).toBe(JSON.stringify(DEFAULT_COORDINATE));
  });

  it('should use first item in search history if available', () => {
    const mockCoord = {
      lat: 1,
      lon: 2,
      name: 'Mock City',
      state: 'MC',
      country: 'Mockland',
    };

    (locationUtils.getSearchHistory as jest.Mock).mockReturnValue([mockCoord]);

    render(
      <SelectedLocationProvider>
        <DummyComponent />
      </SelectedLocationProvider>,
    );

    const coord = screen.getByTestId('coord').textContent;
    expect(coord).toBe(JSON.stringify(mockCoord));
  });

  it('should update coord when onChangeCoord is called', async () => {
    (locationUtils.getSearchHistory as jest.Mock).mockReturnValue([]);

    render(
      <SelectedLocationProvider>
        <DummyComponent />
      </SelectedLocationProvider>,
    );

    const button = screen.getByRole('button', { name: /change coord/i });
    await userEvent.click(button);

    const updated = {
      lat: 10,
      lon: 20,
      name: 'New City',
      state: 'State',
      country: 'Country',
    };
    expect(screen.getByTestId('coord').textContent).toBe(
      JSON.stringify(updated),
    );
  });
});
