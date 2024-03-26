module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?@react-native|react-native|react-native-.+|react-native-*|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|victory|react-native-svg|@sentry/.*)',
  ],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '\\.svg$': 'jest-transform-stub',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: [
    './jest.setup.ts',
    './node_modules/react-native-gesture-handler/jestSetup.js',
    './node_modules/@react-native-google-signin/google-signin/jest/build/setup.js',
  ],
  coverageThreshold: {
    global: {
      branches: 5,
      functions: 5,
      lines: 5,
      statements: 0,
    },
  },
  coveragePathIgnorePatterns: [
    'node_modules',
    '<rootDir>/__mocks__',
    '<rootDir>/__tests__',
    '<rootDir>/assets/',
    '<rootDir>/src/redux/',
    'index.ts',
  ],
  testMatch: ['**/?(*.)+(test).[jt]s?(x)'],
  testEnvironment: 'node',
  coverageReporters: ['text-summary', 'lcov', 'text'],
  cacheDirectory: '.jest-cache',
};
