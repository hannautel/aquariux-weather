import { render, screen, fireEvent } from '@testing-library/react';
import LocationSearchBox from '../LocationSearchBox';
import { useSearchParams } from 'react-router';

jest.mock('react-router', () => ({
  useSearchParams: jest.fn(),
}));

const mockUseSearchParams = useSearchParams as jest.Mock;

describe('<LocationSearchBox />', () => {
  const setSearchParams = jest.fn();
  const mockParams = new URLSearchParams();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseSearchParams.mockReturnValue([mockParams, setSearchParams]);
  });

  describe('when keyword is not existed in search params', () => {
    it('should render input with empty string as default value', () => {
      mockParams.delete('keyword', '');

      render(<LocationSearchBox />);
      const input = screen.getByPlaceholderText(
        /enter city name/i,
      ) as HTMLInputElement;

      expect(input.value).toBe('');
    });
  });

  describe('when having keyword in search params', () => {
    it('should render input with keyword as default value', () => {
      mockParams.set('keyword', 'London');

      render(<LocationSearchBox />);
      const input = screen.getByPlaceholderText(
        /enter city name/i,
      ) as HTMLInputElement;

      expect(input.value).toBe('London');
    });
  });

  describe('when submit search form', () => {
    describe('when the length of input value is less than 3', () => {
      it('should show error messge', () => {
        render(<LocationSearchBox />);
        const input = screen.getByPlaceholderText(/enter city name/i);
        const button = screen.getByRole('button', { name: /search/i });

        fireEvent.change(input, { target: { value: 'NY' } });
        fireEvent.click(button);

        expect(screen.getByText(/at least 3 characters/i)).toBeInTheDocument();
        expect(setSearchParams).not.toHaveBeenCalled();
      });
    });
  });

  describe('when value of input is valid', () => {
    it('should update the search params', () => {
      render(<LocationSearchBox />);
      const input = screen.getByPlaceholderText(/enter city name/i);
      const button = screen.getByRole('button', { name: /search/i });

      fireEvent.change(input, { target: { value: 'Tokyo' } });
      fireEvent.click(button);

      expect(setSearchParams).toHaveBeenCalledWith(expect.any(URLSearchParams));
      const updatedKeyword = (
        setSearchParams.mock.calls[0][0] as URLSearchParams
      ).get('keyword');
      expect(updatedKeyword).toBe('Tokyo');
    });
  });
});
