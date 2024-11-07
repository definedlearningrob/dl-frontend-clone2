import userEvent from '@testing-library/user-event';
import { MockedProvider } from '@apollo/client/testing';
import { waitFor } from '@testing-library/react';
import { screen } from '@testing-library/dom';

import AdminAppMaintenance from '@dc/screens/AdminApp/Maintenance/Maintenance';
import clearCacheQuery from '@dc/graphql/user/mutations/clearCache';
import { renderWithI18N } from '@dc/utils/test';

const renderMaintenane = (mocks = []) =>
  renderWithI18N(
    <MockedProvider mocks={mocks}>
      <AdminAppMaintenance />
    </MockedProvider>
  );

describe('AdminAppMaintenance', () => {
  it('calls clear cache mutation properly', async () => {
    const clearCacheSpy = jest.fn();
    const clearCacheMock = {
      request: {
        query: clearCacheQuery,
        variables: { input: {} },
      },
      result() {
        clearCacheSpy();

        return {
          data: {
            clearCache: {
              status: 'success',
            },
          },
        };
      },
    };

    renderMaintenane([clearCacheMock]);

    const clearCacheButton = screen.getByRole('button', { name: 'Clear cache' });
    userEvent.click(clearCacheButton);

    await waitFor(() => expect(clearCacheSpy).toHaveBeenCalledTimes(1));
  });
});
