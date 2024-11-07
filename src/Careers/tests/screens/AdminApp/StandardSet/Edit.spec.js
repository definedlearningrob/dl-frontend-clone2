import userEvent from '@testing-library/user-event';
import { fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import StandardSetEdit from '@dc/screens/AdminApp/StandardSet/Edit/Edit';
import standardSetQuery from '@dc/graphql/user/queries/standardSet';
import updateStandardSetMutation from '@dc/graphql/user/mutations/updateStandardSet';
import { renderWithRouterAndReduxProvider } from '@dc/utils/test';

const defaultMocks = [
  {
    request: {
      query: standardSetQuery,
      variables: { id: undefined },
    },
    result() {
      return {
        data: {
          standardSet: {
            archivedAt: null,
            displayName: 'Random name',
            id: '1',
            name: 'Alberta Standards',
            setId: 'AB',
            __typename: 'StandardSet',
          },
        },
      };
    },
  },
];

const renderAdminAppStandardSetEdit = (mocks = []) => {
  const utils = renderWithRouterAndReduxProvider(
    <MockedProvider mocks={[...defaultMocks, ...mocks]}>
      <StandardSetEdit />
    </MockedProvider>
  );

  return { ...utils };
};

describe('AdminAppStandardSetEdit', () => {
  it('renders with returned standard set data', async () => {
    const { getByTestId } = renderAdminAppStandardSetEdit();

    await waitFor(() => {
      expect(getByTestId('standard-set-form')).toBeInTheDocument();
      expect(getByTestId(/standard-set-form-displayname-input/)).toHaveValue('Random name');
    });
  });

  it('updates input state when typing', async () => {
    const { getByTestId } = renderAdminAppStandardSetEdit();
    const newText = 'Testing New Name';

    await waitFor(() => {
      expect(getByTestId('standard-set-form')).toBeInTheDocument();
      expect(getByTestId(/standard-set-form-displayname-input/)).toHaveValue('Random name');
    });

    const input = getByTestId(/standard-set-form-displayname-input/);
    userEvent.clear(input);

    await waitFor(() => {
      expect(input).toHaveValue('');
    });

    userEvent.paste(input, newText);

    await waitFor(() => {
      expect(input).toHaveValue(newText);
    });
  });

  it('dispatches proper query on form save button click', async () => {
    const newDisplayName = 'Testing New Name';
    const updateStandardSetMock = {
      request: {
        query: updateStandardSetMutation,
        variables: {
          input: {
            id: '1',
            displayName: newDisplayName,
          },
        },
      },
      result: () => ({
        data: {
          updateStandardSet: {
            standardSet: {
              id: '1',
              displayName: newDisplayName,
              __typename: 'StandardSet',
            },
          },
        },
      }),
    };
    const updateStandardSetMutationSpy = jest.spyOn(updateStandardSetMock, 'result');

    const { getByTestId } = renderAdminAppStandardSetEdit([updateStandardSetMock]);

    await waitFor(() => {
      fireEvent.change(getByTestId(/standard-set-form-displayname-input/), {
        target: { value: newDisplayName },
      });
    });

    await waitFor(() => {
      fireEvent.click(getByTestId(/standard-set-form-save-button/));
    });

    await waitFor(() => {
      expect(updateStandardSetMutationSpy).toBeCalledTimes(1);
    });
  });
});
