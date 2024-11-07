import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3001',
    specPattern: 'cypress/e2e/**/*.e2e.js',
    experimentalFetchPolyfill: true,
    experimentalRunAllSpecs: true,
    defaultCommandTimeout: 10000,
    supportFile: 'cypress/support/index.js',
    viewportWidth: 1366,
    viewportHeight: 768,
    video: false,
    env: {
      // eslint-disable-next-line camelcase
      api_host: 'http://localhost:4001',
    },
  },
});
