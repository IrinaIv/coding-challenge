module.exports = {
  coverageReporters: ['json', 'text', 'html'],
  collectCoverageFrom: [
    'src/**/*.ts'
  ],
  moduleFileExtensions: ['ts', 'js', 'json'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  testMatch: [
    '/**/*.test.(ts|js)'
  ],
  testEnvironment: 'node',
  preset: 'ts-jest',
  testTimeout: 20000,
  silent: true,
}
