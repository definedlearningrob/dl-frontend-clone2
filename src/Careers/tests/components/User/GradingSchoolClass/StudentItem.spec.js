import { MockedProvider } from '@apollo/client/testing';
import { fireEvent, waitFor, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import StudentItem from '@dc/components/User/GradingSchoolClass/StudentItem/StudentItem';
import { STUDENT_COURSE_ACTIVITY } from '@dc/graphql/user/queries/studentCourseActivity';
import { CourseActivityProvider } from '@dc/hooks/useCourseActivity';
import { CAREER_COURSE_SETTINGS_TYPES } from '@dc/resources/constants';
import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { UserInfoProvider } from '@dc/hooks/useUserInfo';
import { studentInfoMock } from '@dc/tests/mocks/studentMocks';

const mocks = [
  {
    request: {
      query: STUDENT_COURSE_ACTIVITY,
      variables: {
        courseId: '1',
        uuid: '1',
      },
    },
    result: {
      data: {
        student: {
          uuid: '1',
          course: {
            id: '1',
            lessons: [
              {
                id: '2',
                step: 1,
                name: 'Lesson 1',
                assignments: [
                  {
                    id: '1',
                    step: 1,
                    displayName: 'Assignment 1',
                    submission: {
                      id: '1',
                      files: [],
                      grade: null,
                      __typename: 'AssignmentSubmission',
                    },
                    __typename: 'Assignment',
                  },
                ],
                checkInQuestions: [
                  {
                    answer: {
                      id: '1',
                      grade: null,
                      __typename: 'CheckInQuestionAnswer',
                    },
                    id: '1',
                    step: 1,
                    __typename: 'CheckInQuestion',
                  },
                  {
                    answer: null,
                    id: '2',
                    step: 2,
                    __typename: 'CheckInQuestion',
                  },
                ],
                checkInGroups: [
                  {
                    id: '1',
                    displayName: 'Check-in Group 1',
                    questions: [
                      {
                        answer: {
                          id: '1',
                          grade: null,
                          __typename: 'CheckInQuestionAnswer',
                        },
                        id: '1',
                        step: 1,
                        __typename: 'CheckInQuestion',
                      },
                      {
                        answer: null,
                        id: '2',
                        step: 2,
                        __typename: 'CheckInQuestion',
                      },
                    ],
                    step: 3,
                    __typename: 'CheckInGroup',
                  },
                ],
                __typename: 'Lesson',
              },
              {
                id: '3',
                step: 2,
                name: 'Lesson 2',
                assignments: [
                  {
                    id: '2',
                    step: 1,
                    displayName: 'Assignment 2',
                    submission: null,
                    __typename: 'Assignment',
                  },
                ],
                checkInQuestions: [
                  {
                    answer: {
                      id: '1',
                      grade: null,
                      __typename: 'CheckInQuestionAnswer',
                    },
                    step: 1,
                    question: 'Where would you like to live?',
                    __typename: 'CheckInQuestion',
                  },
                  {
                    answer: null,
                    step: 2,
                    question: 'Test',
                    __typename: 'CheckInQuestion',
                  },
                ],
                checkInGroups: [
                  {
                    id: '1',
                    displayName: 'Check-in Group 1',
                    questions: [
                      {
                        answer: {
                          id: '1',
                          grade: null,
                          __typename: 'CheckInQuestionAnswer',
                        },
                        id: '1',
                        step: 1,
                        __typename: 'CheckInQuestion',
                      },
                      {
                        answer: null,
                        id: '2',
                        step: 2,
                        __typename: 'CheckInQuestion',
                      },
                    ],
                    step: 3,
                    __typename: 'CheckInGroup',
                  },
                ],
                __typename: 'Lesson',
              },
            ],
            __typename: 'Course',
          },
          __typename: 'Student',
        },
      },
    },
  },
];

const student = {
  firstName: 'Tom',
  gradingByCourseNeeded: true,
  lastName: 'Hanks',
  settings: {
    assessmentType: {
      value: CAREER_COURSE_SETTINGS_TYPES.MIDDLE_SCHOOL,
    },
  },
  uuid: '1',
};

const renderStudentItem = () => {
  const utils = renderWithRouterAndReduxProvider(
    <MockedProvider mocks={mocks}>
      <UserInfoProvider value={{ ...studentInfoMock.result.data }}>
        <CourseActivityProvider courseId='1' schoolClassUuid='1' studentUuid='1'>
          <StudentItem student={student} />
        </CourseActivityProvider>
      </UserInfoProvider>
    </MockedProvider>
  );

  return { ...utils };
};

describe('UserGradingSchoolClassStudentItem', () => {
  it("renders student list item with 'grading needed' indicator if student has items to review", async () => {
    const { getByTestId } = renderStudentItem();

    await waitFor(() => {
      const listItem = getByTestId(/grading-student-item-header/);
      const avatar = getByTestId(/avatar-image/);
      const reviewIndicator = getByTestId(/review-indicator/);

      expect(listItem).toHaveTextContent(/tom hanks/i);
      expect(avatar).toHaveTextContent(/th/i);
      expect(avatar).toHaveTextContent(/th/i);
      expect(reviewIndicator).toBeInTheDocument();
    });
  });

  it('renders list of course activities on list item click', async () => {
    const { getAllByTestId } = renderStudentItem();

    await waitFor(() => {
      fireEvent.click(getAllByTestId(/grading-student-item-header/)[0]);
    });

    await waitFor(() => {
      const courseActivityItems = getAllByTestId(/activity-lesson-item/);

      expect(courseActivityItems).toHaveLength(10);

      expect(courseActivityItems[0]).toHaveTextContent(/Lesson 1: Assignment 1/);

      expect(courseActivityItems[1]).toHaveTextContent(/Lesson 1: Check In/);

      expect(courseActivityItems[2]).toHaveTextContent(/Lesson 1: Check In/);

      expect(courseActivityItems[3]).toHaveTextContent(/Lesson 1: Check In/);

      expect(courseActivityItems[4]).toHaveTextContent(/Lesson 1: Check In/);

      expect(courseActivityItems[5]).toHaveTextContent(/Lesson 2: Assignment 2/);

      expect(courseActivityItems[6]).toHaveTextContent(/Lesson 2: Check In/);

      expect(courseActivityItems[7]).toHaveTextContent(/Lesson 2: Check In/);
    });
  });

  // eslint-disable-next-line max-len
  it('on "Review All" button opens grading modal with the first item from student\'s course activity list and reveals list of course activities', async () => {
    const { getByTestId, getAllByTestId } = renderStudentItem();

    await waitFor(() => {
      const reviewAllButton = getByTestId(/review-all-btn/);
      fireEvent.click(reviewAllButton);
    });

    await waitFor(() => {
      const gradingModal = screen.getByRole('dialog', { name: 'Modal' });
      const lessonItems = getAllByTestId(/activity-lesson-item/);

      expect(gradingModal).toBeInTheDocument();
      expect(gradingModal).toHaveTextContent(/Lesson 1: Assignment/);
      expect(lessonItems).toHaveLength(10);
    });
  });

  it('opens grading modal by choose "Review" option from activity list item dropdown menu', async () => {
    renderStudentItem();

    const studentElement = await screen.findByText(/Tom Hanks/);

    userEvent.click(studentElement);

    const assigmentItem = await screen.findByLabelText('Lesson 1: Assignment 1');

    userEvent.hover(assigmentItem);

    const dropdownTrigger = await within(assigmentItem).findByRole('button', {
      name: 'Open context menu',
    });

    //workaround to open dropdown, userEvent.click does not work
    await userEvent.type(dropdownTrigger, '{enter}');

    const reviewButton = await screen.findByRole('menuitem', { name: 'Review' });

    userEvent.click(reviewButton);

    const gradingModal = await screen.findByRole('dialog', { name: 'Modal' });

    expect(gradingModal).toBeInTheDocument();
    expect(gradingModal).toHaveTextContent(/Lesson 1: Assignment/);
  });
});
