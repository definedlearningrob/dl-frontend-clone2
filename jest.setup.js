import React from 'react';
import '@testing-library/jest-dom';

Object.defineProperty(window, 'scrollTo', { value: () => {}, writable: true });

global.React = React;
global.ResizeObserver = class ResizeObserver {
  observe() {
    return null;
  }

  unobserve() {
    return null;
  }

  disconnect() {
    return null;
  }
};
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}

  disconnect() {
    return null;
  }

  observe() {
    return null;
  }

  takeRecords() {
    return null;
  }

  unobserve() {
    return null;
  }
};

const originalError = console.error;
beforeAll(() => {
  console.error = (message, ...args) => {
    if (
      typeof message === 'string' &&
      message.includes('An error occurred! For more details, see the full error text at')
    ) {
      throw new Error(`Console error treated as error: ${message}`);
    }
    originalError(message, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
