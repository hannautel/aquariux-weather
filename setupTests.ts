import '@testing-library/jest-dom';
import { TextEncoder } from 'util';

if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder;
}

jest.mock('@configs/api', () => ({
  getApiUrl: () => 'http://mock-api.local',
}));
