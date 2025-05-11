import { render, renderHook, screen } from '@testing-library/react';
import SelectedLocationProvider, {
  useSelectedLocationContext,
} from '../SelectedLocationContext';
import { DEFAULT_COORDINATE } from '@constants/coordinate';
import * as locationUtils from '@utils/location-history.util';
import userEvent from '@testing-library/user-event';

jest.mock('@hooks/useConst', () => ({
  __esModule: true,
  default: (factory: () => void) => factory(),
}));

jest.mock('@utils/location-history.util', () => ({
  getSearchHistory: jest.fn(),
}));

const TestComponent = () => {
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
  describe('when context provider wrapper is missing', () => {
    it('should use default value and not throw erorr', () => {
      const { result } = renderHook(() => useSelectedLocationContext());

      expect(result.current).toHaveProperty('onChangeCoord');
      expect(typeof result.current.onChangeCoord).toBe('function');
      expect(() =>
        result.current.onChangeCoord({
          lat: 0,
          lon: 0,
          name: 'Singapore',
          state: '',
          country: 'SG',
        }),
      ).not.toThrow();
    });
  });

  describe('when no search history exists', () => {
    it('should use DEFAULT_COORDINATE', () => {
      (locationUtils.getSearchHistory as jest.Mock).mockReturnValue([]);

      render(
        <SelectedLocationProvider>
          <TestComponent />
        </SelectedLocationProvider>,
      );

      const coord = screen.getByTestId('coord').textContent;
      expect(coord).toBe(JSON.stringify(DEFAULT_COORDINATE));
    });
  });

  describe('when search history exists', () => {
    it('should use first item of histories', () => {
      const mockCoord = {
        lat: 1,
        lon: 2,
        name: 'Singapore',
        state: '',
        country: 'SG',
      };
      (locationUtils.getSearchHistory as jest.Mock).mockReturnValue([
        mockCoord,
      ]);

      render(
        <SelectedLocationProvider>
          <TestComponent />
        </SelectedLocationProvider>,
      );

      const coord = screen.getByTestId('coord').textContent;
      expect(coord).toBe(JSON.stringify(mockCoord));
    });
  });

  describe('when onChangeCoord is called', () => {
    it('should update coord correctly', async () => {
      (locationUtils.getSearchHistory as jest.Mock).mockReturnValue([]);

      render(
        <SelectedLocationProvider>
          <TestComponent />
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
});
