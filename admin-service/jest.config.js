module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/unit-testing'],
  testMatch: [
    '**/unit-testing/**/__tests__/**/*.+(ts|tsx|js)',
    '**/unit-testing/**/*.(test|spec).+(ts|tsx|js)',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  collectCoverageFrom: [
    'src/**/*.(ts|js)',
    '!src/**/*.spec.ts',
    '!src/**/*.d.ts',
    '!src/main.ts',
  ],
  coverageDirectory: 'unit-testing/coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  moduleNameMapping: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/unit-testing/config/test-setup.ts'],
  testTimeout: 10000,
  moduleDirectories: ['node_modules', '<rootDir>'],
};
