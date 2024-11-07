/* eslint-disable no-undef, camelcase */
import { waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';

import { renderWithRouter } from '@pbl/utils/test';

import GuestSharedMiddleware from '@shared/components/SharedMiddleware/GuestSharedMiddleware';
import { useDetectApplicationType } from '@shared/hooks/useDetectApplicationType';

const route = '/shared?code=somecode';
const history = createMemoryHistory({ initialEntries: [route] });

const renderSharedMiddleware = (appType = 'learning') =>
  renderWithRouter(
    <div app-type={appType} className='app'>
      <GuestSharedMiddleware />
    </div>,
    { route, history, routePath: '/shared' }
  );

jest.mock('@shared/hooks/useDetectApplicationType', () => ({
  useDetectApplicationType: jest.fn(),
}));

const useDetectApplicationTypeMock = useDetectApplicationType as jest.Mock;

describe('GuestAppSharedMiddleware', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    history.replace = jest.fn();
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            shared_resource: {
              allowLogin: true,
              code: 'somecode',
              resource_type: 'Task',
              resource_id: '99',
              resource: {
                share_id: 'some-uuid-here',
              },
              target_role: 'student',
            },
          }),
      } as Response)
    );
    useDetectApplicationTypeMock.mockReturnValue({
      isCareersApp: false,
      isPblApp: true,
      appType: 'learning',
    });
  });

  it('calls fetch with proper params', async () => {
    renderSharedMiddleware();

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(
        `${import.meta.env.VITE_DL_API_HOST}/api/learning/v1/shared_resource?code=somecode`,
        {
          headers: {
            'Service-Name': 'learning',
          },
        }
      );
    });
  });

  it('redirects to the project based on fetch response', async () => {
    renderSharedMiddleware();

    await waitFor(() => {
      expect(history.replace).toHaveBeenCalledTimes(1);
      expect(history.replace).toHaveBeenCalledWith(
        '/shared/student/projects/some-uuid-here?code=somecode'
      );
    });
  });

  it('redirects to the course based on fetch response', async () => {
    global.fetch = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            shared_resource: {
              allowLogin: true,
              code: 'somecode',
              resource_type: 'Course',
              resource_id: '99',
              resource: {
                share_id: 'some-uuid-here',
              },
              target_role: 'student',
            },
          }),
      })
    );
    renderSharedMiddleware('careers');

    await waitFor(() => {
      expect(history.replace).toHaveBeenCalledTimes(1);
      expect(history.replace).toHaveBeenCalledWith(
        '/shared/student/courses/some-uuid-here?code=somecode'
      );
    });
  });
});
