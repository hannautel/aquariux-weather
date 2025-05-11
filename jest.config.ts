import { pathsToModuleNameMapper } from 'ts-jest';

module.exports = {
  collectCoverage: false,
  // collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts', '!**/vendor/**'],
  // coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  transform: {
    '.(ts|tsx)': 'ts-jest',
  },

  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/coverage',
    'package.json',
    'package-lock.json',
    'reportWebVitals.ts',
    'setupTests.ts',
    'index.tsx',
  ],
  preset: 'ts-jest/presets/default-esm',
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.app.json', // or 'tsconfig.test.json'
      useESM: true,
    },
  },
  moduleNameMapper: pathsToModuleNameMapper(
    {
      '@modules/*': ['./src/modules/*'],
      '@hooks/*': ['./src/hooks/*'],
      '@core/*': ['./src/core/*'],
      '@typed/*': ['./src/types/*'],
      '@configs/*': ['./src/configs/*'],
      '@utils/*': ['./src/utils/*'],
      '@apis/*': ['./src/api/*'],
      '@constants/*': ['./src/constants/*'],
      '@contexts/*': ['./src/contexts/*'],
    },
    {
      prefix: '<rootDir>/',
    },
  ),
};
