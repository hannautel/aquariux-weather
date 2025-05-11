import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router';

export function renderWithRouter(ui: React.ReactElement) {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
}

export function rerenderWithRouter(
  ui: React.ReactElement,
  rerender: (ui: React.ReactNode) => void,
) {
  return rerender(<BrowserRouter>{ui}</BrowserRouter>);
}
