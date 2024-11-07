import { screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { Route } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import DUPLICATE_PROJECT from '@pbl/graphql/user/mutations/duplicateProject';
import MyProjects from '@pbl/graphql/user/queries/myProjects';
import Modal from '@pbl/components/User/Project/Customize/Modal/Modal';
import { renderWithRouterAndReduxProvider } from '@pbl/utils/test';

const duplicateProjectSpy = jest.fn();
const fetchMyProjectsSpy = jest.fn();

const mocks = [
  {
    request: {
      query: DUPLICATE_PROJECT,
      variables: {
        input: {
          id: '1',
          name: 'Project name Copy 03/22/2023',
          displayName: 'Project name Copy 03/22/2023',
        },
      },
    },
    result: () => {
      duplicateProjectSpy();

      return {
        data: {
          duplicateTask: {
            project: {
              id: '1',
            },
          },
        },
      };
    },
  },
  {
    request: {
      query: MyProjects,
    },
    result: () => {
      fetchMyProjectsSpy();

      return {
        data: {
          myProjects: [],
        },
      };
    },
  },
];

describe('Customize Project Modal', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2023, 2, 22, 6, 24, 23));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should render correctly', async () => {
    renderWithRouterAndReduxProvider(
      <MockedProvider mocks={mocks}>
        <Route path='/projects/:projectId'>
          <Modal displayName='Project name' isOpen={true} onDismiss={jest.fn()} />
        </Route>
      </MockedProvider>,
      { route: '/projects/1' }
    );

    expect(screen.getByText('Create a duplicate of Project name')).toBeInTheDocument();
    expect(await screen.findByRole('dialog')).toMatchSnapshot();

    userEvent.click(screen.getByRole('button', { name: 'Begin customization' }));

    await waitFor(() => {
      expect(duplicateProjectSpy).toHaveBeenCalledTimes(1);
    });
    await waitFor(() => {
      expect(fetchMyProjectsSpy).toHaveBeenCalledTimes(1);
    });
  });
});
