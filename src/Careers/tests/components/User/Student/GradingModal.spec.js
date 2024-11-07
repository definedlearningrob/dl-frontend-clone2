import { useEffect } from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { fireEvent } from '@testing-library/react';

import GradingModal from '@dc/components/User/Student/GradingModal/GradingModal';
import { STUDENT_COURSE_ACTIVITY } from '@dc/graphql/user/queries/studentCourseActivity';
import useCourseActivity from '@dc/hooks/useCourseActivity';
import { CourseActivityProvider } from '@dc/hooks/useCourseActivity';
import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { UserInfoProvider } from '@dc/hooks/useUserInfo';
import { studentInfoMock } from '@dc/tests/mocks/studentMocks';

const ModalSetterComponent = ({ children }) => {
  const { setItemToGradeByIndex, itemToGrade } = useCourseActivity({ withQuery: true });

  useEffect(() => {
    setItemToGradeByIndex(0);
  }, []);

  return itemToGrade ? children : null;
};

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
                    description: 'Random',
                    displayName: 'Assignment 1',
                    submission: {
                      id: '2',
                      files: [
                        {
                          id: '2',
                          url: 'http://www.random.pl',
                          filename: 'random.jpg',
                          __typename: 'AssignmentSubmissionFile',
                        },
                      ],
                      grade: {
                        id: '3',
                        lastGradedBy: {
                          uuid: '1',
                          firstName: 'Camie',
                          lastName: 'Hane',
                          __typename: 'User',
                        },
                        updatedAt: '2021-06-10T08:47:42Z',
                        status: 'ACCEPTED',
                        __typename: 'SubmissionGrade',
                      },
                      updatedAt: '2021-06-08T09:10:22Z',
                      __typename: 'AssignmentSubmission',
                    },
                    __typename: 'Assignment',
                  },
                ],
                checkInQuestions: [
                  {
                    answer: {
                      id: '2',
                      grade: {
                        id: '4',
                        lastGradedBy: {
                          uuid: '1',
                          firstName: 'Camie',
                          lastName: 'Hane',
                          __typename: 'User',
                        },
                        updatedAt: '2021-06-10T08:47:47Z',
                        status: 'ACCEPTED',
                        __typename: 'SubmissionGrade',
                      },
                      updatedAt: '2021-06-09T15:20:55Z',
                      answer: 'Random answer',
                      __typename: 'CheckInQuestionAnswer',
                    },
                    question: 'What do you like the most?',
                    __typename: 'CheckInQuestion',
                  },
                ],
                checkInGroups: [
                  {
                    id: '1',
                    displayName: 'Group 1',
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
                    step: 2,
                    __typename: 'CheckInGroup',
                  },
                ],
                __typename: 'Lesson',
              },
              {
                id: '3',
                step: 2,
                name: 'Lesson 2',
                assignments: [],
                checkInQuestions: [
                  {
                    answer: null,
                    question: 'What is your favorite color?',
                    __typename: 'CheckInQuestion',
                  },
                ],
                checkInGroups: [
                  {
                    id: '1',
                    displayName: 'Group 1',
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
                    ],
                    step: 2,
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

const renderGradingModal = () => {
  const utils = renderWithRouterAndReduxProvider(
    <MockedProvider mocks={mocks}>
      <UserInfoProvider value={{ userInfo: studentInfoMock.result.data.userInfo }}>
        <CourseActivityProvider courseId='1' schoolClassUuid='1' studentUuid='1'>
          <ModalSetterComponent>
            <GradingModal />
          </ModalSetterComponent>
        </CourseActivityProvider>
      </UserInfoProvider>
    </MockedProvider>
  );

  return { ...utils };
};

describe('UserStudentGradingModal', () => {
  describe('bottom navigation', () => {
    it('prevents go to previous course activity item when current item is first', async () => {
      const { findByTestId } = renderGradingModal();

      expect(await findByTestId(/previous-btn/)).toBeDisabled();
    });

    it('prevents go to next course activity item when current item is last', async () => {
      const { findByTestId } = renderGradingModal();

      for (let i = 0; i < 5; i++) {
        fireEvent.click(await findByTestId(/next-btn/));
      }

      expect(await findByTestId(/next-btn/)).toBeDisabled();
    });

    it('allows navigating through course activity items back and forward', async () => {
      const { getByTestId, findByTestId } = renderGradingModal();

      expect(await findByTestId(/modal-heading/)).toHaveTextContent(/Lesson 1: Assignment/);

      fireEvent.click(getByTestId(/next-btn/));

      expect(await findByTestId(/modal-heading/)).toHaveTextContent(/Lesson 1: Check In/);

      fireEvent.click(getByTestId(/next-btn/));

      expect(await findByTestId(/modal-heading/)).toHaveTextContent(/Lesson 1: Check In/);

      fireEvent.click(getByTestId(/next-btn/));

      expect(await findByTestId(/modal-heading/)).toHaveTextContent(/Lesson 1: Check In/);

      fireEvent.click(getByTestId(/next-btn/));

      expect(await findByTestId(/modal-heading/)).toHaveTextContent(/Lesson 2: Check In/);

      fireEvent.click(getByTestId(/previous-btn/));

      expect(await findByTestId(/modal-heading/)).toHaveTextContent(/Lesson 1: Check In/);

      fireEvent.click(getByTestId(/previous-btn/));

      expect(await findByTestId(/modal-heading/)).toHaveTextContent(/Lesson 1: Check In/);
    });
  });
});
