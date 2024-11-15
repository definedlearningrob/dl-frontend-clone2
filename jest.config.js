const modified = {
  setupFiles: [require.resolve('react-app-polyfill/jsdom')],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testTimeout: 10000,
  snapshotFormat: {
    escapeString: true,
    printBasicPrototype: false,
  },
  globals: {
    __APP_VERSION__: 'test',
  },
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}'],
  reporters: [
    'default',
    ['jest-slow-test-reporter', { numTests: 3, warnOnSlowerThan: 1000, color: true }],
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/src/__generated__/*',
    '<rootDir>/src/typings',
    '/setupTests.js',
    '/vite-env.d.ts',
    '/*/index.ts',
    '/*/types.ts',
    'Careers/resources/*',
    'Careers/tests/mocks/*',
    'Careers/locales/*/*',
    'Careers/graphql/shared/queries/*',
    'Careers/graphql/user/queries/*',
    'Careers/graphql/student/queries/*',
    'Careers/graphql/shared/mutations/*',
    'Careers/graphql/user/mutations/*',
    'Careers/graphql/student/mutations/*',
    'Careers/graphql/fragments/*',
    'Pbl/graphql/shared/queries/*',
    'Pbl/graphql/user/queries/*',
    'Pbl/graphql/user/fragments/*',
    'Pbl/graphql/public/queries/*',
    'Pbl/graphql/student/queries/*',
    'Pbl/graphql/shared/mutations/*',
    'Pbl/graphql/user/mutations/*',
    'Pbl/graphql/student/mutations/*',
    'Pbl/graphql/student/fragments/*',
    'Pbl/graphql/shared/fragments/*',
    'Pbl/graphql/fragments/*',
    'Shared/graphql/user/query/*',
    'Shared/graphql/student/query/*',
    'Shared/graphql/shared/mutations/*',
    'Shared/graphql/shared/query/*',
    'Shared/graphql/user/mutations/*',
    'Shared/graphql/student/mutations/*',
    'Shared/graphql/user/fragments/*',
    'Shared/graphql/fragments/*',
    'Pbl/locales/*/*',
    'Shared/locales/*/*',
  ],
  collectCoverageFrom: ['<rootDir>/src/**/*.{js,ts,tsx,jsx}'],
  transform: {
    '\\.(jpg|jpeg|png|mp4|webm)': '<rootDir>/jest/transformers/fileTransformer.js',
    '\\.[jt]sx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss|ttf|woff|woff2)$': 'identity-obj-proxy',
    '\\.svg$': '<rootDir>/jest/__mocks__/svg.js',
    '\\.lottie': '<rootDir>/jest/__mocks__/svg.js',
    '@dc/images/(.*)$': '<rootDir>/src/Careers/assets/images/$1',
    '@dc/layout/(.*)$': '<rootDir>/src/Careers/components/layout/$1',
    '@dc/shared/(.*)$': '<rootDir>/src/Careers/components/shared/$1',
    '@dc/styles/(.*)$': '<rootDir>/src/Careers/styles/$1',
    '@dc/svg/(.*)$': '<rootDir>/src/Careers/assets/icons/$1',
    '@dc/(.*)$': '<rootDir>/src/Careers/$1',
    '@pbl/images/(.*)$': '<rootDir>/src/Pbl/assets/images/$1',
    '@pbl/layout/(.*)$': '<rootDir>/src/Pbl/components/layout/$1',
    '@pbl/shared/(.*)$': '<rootDir>/src/Pbl/components/shared/$1',
    '@pbl/styles/(.*)$': '<rootDir>/src/Pbl/styles/$1',
    '@pbl/svg/(.*)$': '<rootDir>/src/Pbl/assets/icons/$1',
    '@pbl/(.*)$': '<rootDir>/src/Pbl/$1',
    '@shared/svg/(.*)$': '<rootDir>/src/Shared/assets/icons/$1',
    '@shared/(.*)$': '<rootDir>/src/Shared/$1',
    '@graphql/(.*)$': '<rootDir>/src/__generated__/$1',
    'lodash-es': 'lodash',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(@reach|react-toastify|reveal.js|react-datepicker|react-phone-input-2|@dotlottie|nanoid)/)',
  ],
};

module.exports = modified;
