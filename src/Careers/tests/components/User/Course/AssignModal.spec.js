import { MockedProvider } from '@apollo/client/testing';
import { fireEvent, waitFor, screen } from '@testing-library/react';

import AssignModal from '@dc/components/User/Course/AssignModal/AssignModal';
import assignSchoolClassToCourseMutation from '@dc/graphql/user/mutations/assignSchoolClassToCourse';
import schoolClassesQuery from '@dc/graphql/user/queries/schoolClasses';
import unassignSchoolClassFromCourseMutation from '@dc/graphql/user/mutations/unassignSchoolClassFromCourse';
import { ACTION_TYPE } from '@dc/components/User/Course/Header/Header';
import { renderWithRouter } from '@dc/utils/test';

const closeModal = jest.fn();
const assignMutationSpy = jest.fn();
const unassignMutationSpy = jest.fn();

const mocks = [
  {
    request: {
      query: schoolClassesQuery,
      variables: {
        perPage: 1000,
        filter: { nameCont: '' },
      },
    },
    result: {
      data: {
        schoolClasses: {
          nodes: [
            {
              name: 'Class 1',
              uuid: '1',
              entity: {
                uuid: '1',
                name: 'Harvard University',
                __typename: 'Entity',
              },
              __typename: 'SchoolClass',
            },
            {
              name: 'Class 2',
              uuid: '2',
              entity: {
                uuid: '2',
                name: 'Stanford University',
                __typename: 'Entity',
              },
              __typename: 'SchoolClass',
            },
            {
              name: 'Class 3',
              uuid: '3',
              entity: {
                uuid: '3',
                name: 'Yale University',
                __typename: 'Entity',
              },
              __typename: 'SchoolClass',
            },
          ],
          nodesCount: 3,
          pagesCount: 1,
          __typename: 'SchoolClassPage',
        },
      },
    },
  },
  {
    request: {
      query: assignSchoolClassToCourseMutation,
      variables: {
        input: {
          schoolClassUuid: '1',
        },
      },
    },
    result() {
      assignMutationSpy();

      return {
        data: {
          assignSchoolClassToCourse: {
            status: 'ok',
            __typename: 'AssignSchoolClassToCourseMutationPayload',
          },
        },
      };
    },
  },
  {
    request: {
      query: unassignSchoolClassFromCourseMutation,
      variables: {
        input: {
          schoolClassUuid: '1',
        },
      },
    },
    result() {
      unassignMutationSpy();

      return {
        data: {
          unassignSchoolClassFromCourse: {
            status: 'ok',
            __typename: 'UnassignSchoolClassFromCourseMutationPayload',
          },
        },
      };
    },
  },
];

const renderAssignModal = (actionType = ACTION_TYPE.ASSIGN) => {
  const utils = renderWithRouter(
    <MockedProvider mocks={mocks}>
      <AssignModal actionType={actionType} closeModal={closeModal} />
    </MockedProvider>
  );

  return { ...utils };
};

describe('UserCourseAssignModal', () => {
  it('triggers closeModal function on "X" button click', () => {
    renderAssignModal();

    fireEvent.click(screen.getByTestId(/modal-close-button/i));

    expect(closeModal).toHaveBeenCalledTimes(1);
  });

  it('renders confirm action button in disabled state when no school class has been choosen', async () => {
    const { getByTestId } = renderAssignModal();

    expect(getByTestId('assign-modal-button')).toBeDisabled();
  });

  it('renders list of school classes options to select with name and entity name', async () => {
    const { getAllByTestId } = renderAssignModal();

    await waitFor(() => {
      fireEvent.keyDown(document.querySelector('.dc-async-select__control'), { keyCode: 40 });
    });

    await waitFor(() => {
      const options = getAllByTestId(/option/);

      expect(options).toHaveLength(3);
      expect(options[0]).toHaveTextContent(/Class 1/i);
      expect(options[0]).toHaveTextContent(/Harvard University/i);

      expect(options[1]).toHaveTextContent(/Class 2/i);
      expect(options[1]).toHaveTextContent(/Stanford University/i);

      expect(options[2]).toHaveTextContent(/Class 3/i);
      expect(options[2]).toHaveTextContent(/Yale University/i);
    });
  });

  it('selects school class to assign/unassign from course correctly', async () => {
    const { getByTestId, getAllByTestId } = renderAssignModal();

    await waitFor(() => {
      fireEvent.keyDown(document.querySelector('.dc-async-select__control'), { keyCode: 40 });
    });

    await waitFor(() => {
      fireEvent.click(getAllByTestId(/option/)[1]);
    });

    await waitFor(() => {
      const selectedShoolClass = getByTestId(/selected-value/);

      expect(selectedShoolClass).toHaveTextContent(/Class 2/i);
    });
  });

  describe('when performs assign school class action', () => {
    it('renders action button with "Assign" text', () => {
      const { getByTestId } = renderAssignModal();

      expect(getByTestId('assign-modal-button')).toHaveTextContent(/assign/i);
    });

    it('assigns school class to the course correctly', async () => {
      const { getByTestId, getAllByTestId } = renderAssignModal();

      await waitFor(() => {
        fireEvent.keyDown(document.querySelector('.dc-async-select__control'), { keyCode: 40 });
      });

      await waitFor(() => {
        fireEvent.click(getAllByTestId(/option/)[0]);
      });

      await waitFor(() => {
        fireEvent.click(getByTestId('assign-modal-button'));
      });

      await waitFor(() => {
        expect(assignMutationSpy).toHaveBeenCalled();
      });
    });
  });

  describe('when performs unassign school class action', () => {
    it('renders actions button with "Unassign" text', () => {
      const { getByTestId } = renderAssignModal(ACTION_TYPE.UNASSIGN);

      expect(getByTestId('assign-modal-button')).toHaveTextContent(/unassign/i);
    });

    it('unassigns school class from the course correctly', async () => {
      const { getByTestId, getAllByTestId } = renderAssignModal(ACTION_TYPE.UNASSIGN);

      await waitFor(() => {
        fireEvent.keyDown(document.querySelector('.dc-async-select__control'), { keyCode: 40 });
      });

      await waitFor(() => {
        fireEvent.click(getAllByTestId(/option/)[0]);
      });

      await waitFor(() => {
        fireEvent.click(getByTestId('assign-modal-button'));
      });

      await waitFor(() => {
        expect(unassignMutationSpy).toHaveBeenCalled();
      });
    });
  });
});
