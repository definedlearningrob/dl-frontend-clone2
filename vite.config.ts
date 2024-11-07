/* eslint-disable no-undef */
import dns from 'dns';
import path from 'path';

import { defineConfig, loadEnv } from 'vite';
import reactPlugin from '@vitejs/plugin-react';
import svgrPlugin from 'vite-plugin-svgr';
// import tsconfigPaths from 'vite-tsconfig-paths';

// this allows to use localhost instead of 127.0.0.1
//@ts-ignore

const noncePlugin = (placeholderName = 'nonce'): PluginOption => ({
  name: 'add-nonce-script-attr',
  enforce: 'post',
  transformIndexHtml(html: string) {
    return html
      .replace(new RegExp('<script', 'g'), `<script nonce="${placeholderName}"`)
      .replace(new RegExp('<link', 'g'), `<link nonce="${placeholderName}"`);
  },
});

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  if (env.CI !== 'true') {
    dns.setDefaultResultOrder('verbatim');
  }

  return {
    css: {
      modules: {
        generateScopedName: '[name]_[local]__[hash:base64:5]',
      },
    },
    define: {
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    },
    resolve: {
      alias: {
        '@dc/images': path.resolve(__dirname, './src/Careers/assets/images'),
        '@dc/layout': path.resolve(__dirname, './src/Careers/components/layout'),
        '@dc/shared': path.resolve(__dirname, './src/Careers/components/shared'),
        '@dc/styles': path.resolve(__dirname, './src/Careers/stylesheets'),
        '@dc/svg': path.resolve(__dirname, './src/Careers/assets/icons'),
        '@dc': path.resolve(__dirname, './src/Careers'),
        '@pbl/images': path.resolve(__dirname, './src/Pbl/assets/images'),
        '@pbl/layout': path.resolve(__dirname, './src/Pbl/components/layout'),
        '@pbl/shared': path.resolve(__dirname, './src/Pbl/components/shared'),
        '@pbl/styles': path.resolve(__dirname, './src/Pbl/stylesheets'),
        '@pbl/svg': path.resolve(__dirname, './src/Pbl/assets/icons'),
        '@pbl': path.resolve(__dirname, './src/Pbl'),
        '@shared/svg': path.resolve(__dirname, './src/Shared/assets/icons'),
        '@shared': path.resolve(__dirname, './src/Shared'),
        '@graphql': path.resolve(__dirname, './src/__generated__'),
      },
    },
    plugins: [reactPlugin(), svgrPlugin(), noncePlugin()],
  };
});
