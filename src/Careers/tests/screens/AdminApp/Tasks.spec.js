import { act } from 'react-dom/test-utils';
import { MockedProvider } from '@apollo/client/testing';
import { fireEvent, waitFor, screen } from '@testing-library/react';

import archiveTaskMutation from '@dc/graphql/user/mutations/archiveTask';
import Tasks from '@dc/screens/AdminApp/Tasks/Tasks';
import tasksQuery from '@dc/graphql/user/queries/tasks';
import { PAGING } from '@dc/resources/constants';
import { ARCHIVABLE_STATUSES } from '@dc/resources/constants';
import { renderWithRouterAndReduxProvider } from '@dc/utils/test';

let archiveTaskCalled = false;
let refetchTasksCalled = false;
const taskPresentation =
  'https://definedlearning.slides.com/dlearn/creating-a-musical-superstar/embed?token=u_nlPm3a';

const mocks = [
  {
    request: {
      query: tasksQuery,
      variables: {
        filter: {},
        scope: ARCHIVABLE_STATUSES.ACTIVE.value,
        page: PAGING.PAGE_DEFAULT,
        perPage: PAGING.PER_PAGE_DEFAULT.value,
        withCopies: false,
      },
    },
    result: {
      data: {
        tasks: {
          pagesCount: 1,
          nodesCount: 3,
          nodes: [
            {
              archivedAt: null,
              id: '1',
              imageUrl: 'https://image.com',
              name: 'First task',
              introduction: 'First task introduction',
              presentation: taskPresentation,
              status: 'done',
              step: 1,
              owner: {
                name: 'John Doe',
                uuid: '123',
              },
              thumbnailUrl: 'some-thumbnail-url',
              files: [],
              __typename: 'Task',
            },
            {
              archivedAt: null,
              id: '2',
              imageUrl: 'https://image.com',
              name: 'Second task',
              introduction: 'Second task introduction',
              presentation: taskPresentation,
              status: 'done',
              step: 2,
              owner: {
                name: 'Jane Doe',
                uuid: '456',
              },
              thumbnailUrl: 'some-thumbnail-url',
              files: [],
              __typename: 'Task',
            },
            {
              archivedAt: null,
              id: '3',
              imageUrl: 'https://image.com',
              name: 'Third task',
              introduction: 'Third task introduction',
              presentation: taskPresentation,
              status: 'done',
              step: 3,
              owner: {
                name: 'Jane Doe',
                uuid: '456',
              },
              thumbnailUrl: 'some-thumbnail-url',
              files: [],
              __typename: 'Task',
            },
          ],
        },
      },
    },
  },
  {
    request: {
      query: tasksQuery,
      variables: {
        filter: {},
        scope: ARCHIVABLE_STATUSES.ACTIVE.value,
        page: PAGING.PAGE_DEFAULT,
        perPage: PAGING.PER_PAGE_DEFAULT.value,
        withCopies: false,
      },
    },
    result: () => {
      refetchTasksCalled = true;

      return {
        data: {
          tasks: {
            pagesCount: 0,
            nodesCount: 0,
            nodes: [],
          },
        },
      };
    },
  },
  {
    request: {
      query: archiveTaskMutation,
      variables: {
        input: {
          id: '1',
        },
      },
    },
    result: () => {
      archiveTaskCalled = true;

      return {
        data: {
          archiveTask: {
            task: {
              id: '1',
              archivedAt: null,
            },
          },
        },
      };
    },
  },
];

const renderAdminAppTasks = () => {
  const utils = renderWithRouterAndReduxProvider(
    <MockedProvider mocks={mocks}>
      <Tasks />
    </MockedProvider>
  );

  return { ...utils };
};

describe('AdminAppTasks', () => {
  it('renders spinner before response is resolved', async () => {
    const { getByTestId } = renderAdminAppTasks();

    expect(getByTestId(/loading-spinner/)).toBeInTheDocument();

    await act(() => Promise.resolve());
  });

  it('renders tasks list correctly', async () => {
    const { getAllByTestId } = renderAdminAppTasks();

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    await waitFor(() => {
      expect(getAllByTestId(/tasks-list-item$/i).length).toEqual(3);

      const taskNames = getAllByTestId(/tasks-list-item-name/);

      expect(taskNames[0].textContent).toEqual('First task');
      expect(taskNames[1].textContent).toEqual('Second task');
      expect(taskNames[2].textContent).toEqual('Third task');
    });
  });

  it('opens archive modal on archive click', async () => {
    const { getByTestId, getAllByTestId } = renderAdminAppTasks();

    await waitFor(() => {
      const firstTaskArchiveButton = getAllByTestId(/task-archive-button/)[0];

      fireEvent.click(firstTaskArchiveButton);
    });

    await act(() => Promise.resolve({}));

    expect(screen.getByRole('dialog', { name: 'Modal' })).toBeInTheDocument();
    expect(getByTestId(/modal-header/)).toHaveTextContent('Archiving task');
  });

  it('closes archive modal on archive modal cancel click', async () => {
    const { getByTestId, getAllByTestId } = renderAdminAppTasks();

    await waitFor(() => {
      const firstTaskArchiveButton = getAllByTestId(/task-archive-button/)[0];

      fireEvent.click(firstTaskArchiveButton);
    });

    await waitFor(() => {
      fireEvent.click(getByTestId(/archive-modal-cancel/));
    });

    expect(screen.queryByRole('dialog', { name: 'Modal' })).not.toBeInTheDocument();
  });

  it('calls archive task on archive modal accept and refetch data for current scope', async () => {
    const { getByTestId, getAllByTestId } = renderAdminAppTasks();

    await waitFor(() => {
      const firstTaskArchiveButton = getAllByTestId(/task-archive-button/)[0];

      fireEvent.click(firstTaskArchiveButton);
    });

    await act(() => Promise.resolve({}));

    expect(archiveTaskCalled).toBe(false);
    expect(refetchTasksCalled).toBe(false);

    await waitFor(() => {
      fireEvent.click(getByTestId(/archive-modal-accept/));
    });

    await waitFor(() => {
      expect(archiveTaskCalled).toBe(true);
      expect(refetchTasksCalled).toBe(true);

      expect(screen.queryByRole('dialog', { name: 'Modal' })).not.toBeInTheDocument();
    });
  });

  it('opens details modal on Show click', async () => {
    const { getByTestId, getAllByTestId } = renderAdminAppTasks();

    await act(() => Promise.resolve({}));

    await waitFor(() => {
      const firstTaskShowButton = getAllByTestId(/task-show-button/)[0];

      fireEvent.click(firstTaskShowButton);
    });

    await act(() => Promise.resolve({}));

    expect(screen.getByRole('dialog', { name: 'Modal' })).toBeInTheDocument();
    expect(getByTestId(/modal-header/)).toHaveTextContent('Task details');
  });

  it('closes details modal on details modal close click', async () => {
    const { getByTestId, getAllByTestId, getByText } = renderAdminAppTasks();

    await act(() => Promise.resolve({}));

    await waitFor(() => {
      const firstTaskShowButton = getAllByTestId(/task-show-button/)[0];

      fireEvent.click(firstTaskShowButton);
    });

    await act(() => Promise.resolve({}));

    expect(screen.getByRole('dialog', { name: 'Modal' })).toBeInTheDocument();
    expect(getByTestId(/modal-header/)).toHaveTextContent('Task details');

    await waitFor(() => {
      fireEvent.click(getByText(/Close/));
    });

    expect(screen.queryByRole('dialog', { name: 'Modal' })).not.toBeInTheDocument();
  });

  it('closes details modal on details modal x icon click', async () => {
    const { getByTestId, getAllByTestId } = renderAdminAppTasks();

    await act(() => Promise.resolve({}));

    await waitFor(() => {
      const firstTaskShowButton = getAllByTestId(/task-show-button/)[0];

      fireEvent.click(firstTaskShowButton);
    });

    await act(() => Promise.resolve({}));

    expect(screen.getByRole('dialog', { name: 'Modal' })).toBeInTheDocument();
    expect(getByTestId(/modal-header/)).toHaveTextContent('Task details');

    await waitFor(() => {
      fireEvent.click(getByTestId(/modal-close-button/));
    });

    expect(screen.queryByRole('dialog', { name: 'Modal' })).not.toBeInTheDocument();
  });
});
