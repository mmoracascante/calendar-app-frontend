module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    setupFiles: ['./jest.setup.js'],
    transformIgnorePatterns: [],
    moduleNameMapper: {
        '\\.(css|scss)$': '<rootDir>/tests/mocks/styleMock.js',
    },
}