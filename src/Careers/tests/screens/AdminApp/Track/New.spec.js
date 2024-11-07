import { waitFor, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import userEvent from '@testing-library/user-event';

import AdminTracksNew from '@dc/screens/AdminApp/Track/New';
import createTrackMutation from '@dc/graphql/user/mutations/createTrack';
import { renderWithRouter } from '@dc/utils/test';
import generatePresignedUrlMutation from '@dc/graphql/student/mutations/generatePresignedUploadUrl';
import { ASSET_TYPE, RESOURCE_CLASS } from '@dc/resources/constants';

import { NavigationContextProvider } from '@shared/components/Sidebar/useNavigation';

let createTrackSpy = jest.fn();
let generatePresignedUrlMutationSpy = jest.fn();

const mocks = [
  {
    request: {
      query: createTrackMutation,
      variables: {
        input: { filename: 'hello.png', resourceClass: 'TRACK', assetType: 'IMAGE' },
      },
    },
    result: () => {
      createTrackSpy();

      return { data: {} };
    },
  },
  {
    request: {
      query: generatePresignedUrlMutation,
      variables: {
        input: {
          filename: 'hello.png',
          assetType: ASSET_TYPE.IMAGE,
          resourceClass: RESOURCE_CLASS.TRACK,
        },
      },
    },
    result: () => {
      generatePresignedUrlMutationSpy();

      return {
        data: {
          generatePresignedUploadUrl: {
            url: 'someurl',
            uuid: 'some-uuid',
          },
        },
      };
    },
  },
];

const renderTracksNew = () => {
  const utils = renderWithRouter(
    <NavigationContextProvider>
      <MockedProvider mocks={mocks}>
        <AdminTracksNew />
      </MockedProvider>
    </NavigationContextProvider>,
    {}
  );

  return { ...utils };
};

describe('AdminTracksNew', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders with empty data', () => {
    renderTracksNew();

    expect(screen.getByRole('textbox', { name: 'Name' }).value).toEqual('');
    expect(screen.getByText('New track')).toBeInTheDocument();
  });

  it('renders with title and image upload', async () => {
    let xhrMock = {
      open: jest.fn(),
      setRequestHeader: jest.fn(),
      upload: {
        onprogress: jest.fn(),
      },
      onreadystatechange: jest.fn(),
      send: jest.fn(),
      readyState: 4,
      responseText: JSON.stringify({
        response: {
          body: {},
        },
      }),
      status: 200,
    };

    window.XMLHttpRequest = jest.fn(() => xhrMock);
    renderTracksNew();

    const fileToUpload = new File(['hello'], 'hello.png', { type: 'image/png' });
    const mainInformation = screen.getByText('Main information');

    await waitFor(() => {
      userEvent.upload(screen.getByTestId('drop-zone-input'), fileToUpload);
    });
    expect(mainInformation).toBeInTheDocument();

    await waitFor(() => {
      expect(createTrackSpy).not.toHaveBeenCalled();
    });
  });
});
