import { render, screen } from '@testing-library/react';
import LocationInfo from '../LocationInfo';

describe('<LocationInfo />', () => {
  it('should render correctly', () => {
    const location = {
      name: 'Hanoi',
      state: 'Hanoi Capital',
      country: 'Vietnam',
      lat: 21.0285,
      lon: 105.8542,
    };

    render(<LocationInfo location={location} />);

    expect(screen.getByText('Hanoi')).toBeInTheDocument();
    expect(screen.getByText('Hanoi Capital, Vietnam')).toBeInTheDocument();
  });

  describe('when state is missing', () => {
    it('should render correctly', () => {
      const location = {
        name: 'Tokyo',
        state: '',
        country: 'Japan',
        lat: 35.6762,
        lon: 139.6503,
      };

      render(<LocationInfo location={location} />);

      expect(screen.getByText('Tokyo')).toBeInTheDocument();
      expect(screen.getByText('Japan')).toBeInTheDocument();
    });
  });
});
