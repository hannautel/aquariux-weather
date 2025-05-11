import { pathsToModuleNameMapper } from 'ts-jest';

module.exports = {
  collectCoverage: false,
  // collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts', '!**/vendor/**'],
  // coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  testMatch: ['**/?(*.)+(test).[jt]s?(x)'],
  transform: {
    '.(ts|tsx)': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.app.json',
        useESM: true,
      },
    ],
  },

  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/coverage',
    'package.json',
    'package-lock.json',
    'reportWebVitals.ts',
    'setupTests.ts',
    'index.tsx',
    '/src/__tests__/',
    'src/api/',
    'src/utils/localstorage.util.ts',
    'src/utils/location-history.util.ts',
  ],
  preset: 'ts-jest/presets/default-esm',
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
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
      '@root/*': ['./src/*'],
    },
    {
      prefix: '<rootDir>/',
    },
  ),
};
