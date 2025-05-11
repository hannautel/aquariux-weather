import { renderHook } from '@testing-library/react';
import useConst from '../useConst';

describe('useConst', () => {
  describe('when default value is a primitive value', () => {
    it('should return constant primitive value', () => {
      const { result } = renderHook(() => useConst(10));
      expect(result.current).toBe(10);
    });
  });

  describe('when default value is an object', () => {
    it('should return the default object', () => {
      const obj = { a: 1 };
      const { result } = renderHook(() => useConst(obj));
      expect(result.current).toBe(obj);
    });
  });

  describe('when init function is provided', () => {
    it('should call init function only once', () => {
      const initFn = jest.fn(() => ({ a: Math.random() }));
      const { result, rerender } = renderHook(() => useConst(initFn));

      const firstValue = result.current;
      rerender();

      expect(result.current).toBe(firstValue);
      expect(initFn).toHaveBeenCalledTimes(1);
    });

    it('should handle lazy init correctly', () => {
      const { result } = renderHook(() =>
        useConst(() => {
          return 'computed';
        }),
      );

      expect(result.current).toBe('computed');
    });
  });
});
