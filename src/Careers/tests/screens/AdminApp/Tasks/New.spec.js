import { fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import AdminTasksNew from '@dc/screens/AdminApp/Task/New/New';
import createTaskMutation from '@dc/graphql/user/mutations/createTask';
import { renderWithRouter } from '@dc/utils/test';

let createTaskCalled = false;

const mocks = [
  {
    request: {
      query: createTaskMutation,
      variables: {
        input: {},
      },
    },
    result: () => {
      createTaskCalled = true;

      return { data: {} };
    },
  },
];

const renderTasksNew = () => {
  const utils = renderWithRouter(
    <MockedProvider mocks={mocks}>
      <AdminTasksNew />
    </MockedProvider>
  );

  return { ...utils };
};

describe('AdminTasksNew', () => {
  beforeEach(() => {
    createTaskCalled = false;
  });

  it('renders with empty data', async () => {
    const { getByTestId } = renderTasksNew();

    await waitFor(() => {
      expect(getByTestId('task-form')).toBeInTheDocument();
      expect(getByTestId(/task-name-input/).value).toEqual('');
    });
  });

  it('does not call createTask mutation when form is not fully filled', async () => {
    const { getByTestId } = renderTasksNew();

    await waitFor(async () => {
      fireEvent.click(getByTestId(/task-form-submit/));
    });

    await waitFor(() => {
      expect(createTaskCalled).toBe(false);
    });
  });

  it('render all fields to create new Task', async () => {
    const { getByTestId } = renderTasksNew();

    await waitFor(() => {
      expect(getByTestId('task-name-input')).toBeInTheDocument();
      expect(getByTestId(/task-name-input/).value).toEqual('');
      expect(getByTestId('task-presentation-url-input')).toBeInTheDocument();
      expect(getByTestId(/task-presentation-url-input/).value).toEqual('');
      expect(getByTestId('task-teaching-resources-input')).toBeInTheDocument();
      expect(getByTestId('task-introduction-input')).toBeInTheDocument();
      expect(getByTestId('task-student-resources-input')).toBeInTheDocument();
      expect(getByTestId('task-student-standard-input')).toBeInTheDocument();
      expect(getByTestId('task-files-input')).toBeInTheDocument();
    });
  });
});
