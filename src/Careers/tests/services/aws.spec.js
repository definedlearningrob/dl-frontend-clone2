/* eslint-disable no-undef */
import { waitFor } from '@testing-library/react';

import { fileUpload } from '@dc/services/aws';

const xhrMock = {
  onreadystatechange: null,
  open: jest.fn(),
  send: jest.fn(),
  upload: {},
};

describe('services | aws', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.XMLHttpRequest = jest.fn(() => xhrMock);
  });

  describe('fileUpload', () => {
    it('calls passed mutation with proper params', () => {
      const mutation = jest.fn(() =>
        Promise.resolve({ data: { generatePresignedUploadUrl: { url: 'http://localhost:3000' } } })
      );
      const file = new Blob();
      file.name = 'some.jpg';

      fileUpload(file, mutation, 'LESSON', 'IMAGE');

      expect(mutation).toHaveBeenCalledTimes(1);
      expect(mutation).toHaveBeenCalledWith({
        variables: {
          input: {
            resourceClass: 'LESSON',
            assetType: 'IMAGE',
            filename: 'some.jpg',
          },
        },
      });
    });

    it('calls xhr methods with proper params', async () => {
      const mutation = jest.fn(() =>
        Promise.resolve({ data: { generatePresignedUploadUrl: { url: 'http://localhost:3000' } } })
      );
      const file = new Blob();
      file.name = 'some.jpg';

      fileUpload(file, mutation);

      await waitFor(() => {
        expect(xhrMock.open).toHaveBeenCalledTimes(1);
        expect(xhrMock.send).toHaveBeenCalledTimes(1);
        expect(xhrMock.open).toHaveBeenCalledWith('PUT', 'http://localhost:3000');
        expect(xhrMock.send).toHaveBeenCalledWith(file);
      });
    });
  });
});
