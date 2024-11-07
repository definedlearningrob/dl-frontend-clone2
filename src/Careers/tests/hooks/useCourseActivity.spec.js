import { MockedProvider } from '@apollo/client/testing';
import { fireEvent, waitFor } from '@testing-library/react';
import { useEffect } from 'react';

import { STUDENT_COURSE_ACTIVITY } from '@dc/graphql/user/queries/studentCourseActivity';
import useCourseActivity from '@dc/hooks/useCourseActivity';
import { CourseActivityProvider } from '@dc/hooks/useCourseActivity';
import { GRADE_STATUSES } from '@dc/resources/constants';
import { renderWithRouter } from '@dc/utils/test';

const courseActivityQuerySpy = jest.fn();

const mocks = [
  {
    request: {
      query: STUDENT_COURSE_ACTIVITY,
      variables: { uuid: '1', courseId: '1' },
      fetchPolicy: 'no-cache',
    },
    result: () => {
      courseActivityQuerySpy();

      return {
        data: {
          student: {
            uuid: '1',
            course: {
              id: '1',
              lessons: [
                {
                  id: '1',
                  step: 1,
                  name: 'first lesson',
                  assignments: [
                    {
                      id: '1',
                      step: 1,
                      description: 'fd',
                      name: 'first assignment',
                      displayName: 'first assignment',
                      submission: null,
                      __typename: 'assignment',
                    },
                  ],
                  checkInQuestions: [
                    {
                      answer: null,
                      question: 'some question',
                      id: '2',
                      step: 2,
                      __typename: 'checkInQuestion',
                    },
                    {
                      answer: {
                        id: '1',
                        grade: null,
                        updatedAt: '2020-01-01',
                        answer: 'This is my first time answer',
                      },
                      question: 'some question',
                      id: '1',
                      step: 1,
                      __typename: 'checkInQuestion',
                    },
                    {
                      answer: {
                        id: '1',
                        grade: {
                          id: '1',
                          lastGradedBy: {
                            uuid: '1',
                            firstName: 'Peter',
                            lastName: 'Parker',
                          },
                          status: 'ACCEPTED',
                          updatedAt: '2020-01-02',
                        },
                        updatedAt: '2020-01-01',
                        answer: 'This is my accepted answer',
                      },
                      id: '3',
                      step: 3,
                      question: 'some question',
                      __typename: 'checkInQuestion',
                    },
                  ],
                  checkInGroups: [
                    {
                      __typename: 'CheckInGroup',
                      id: '1',
                      displayName: 'firstgroup',
                      step: 2,
                      questions: [
                        {
                          answer: null,
                          id: '4',
                          question: 'some question',
                          step: 3,
                          __typename: 'checkInQuestion',
                        },
                        {
                          answer: {
                            id: '1',
                            grade: null,
                            updatedAt: '2020-01-01',
                            answer: 'This is my first time answer',
                          },
                          id: '5',
                          question: 'some question',
                          step: 1,
                          __typename: 'checkInQuestion',
                        },
                        {
                          answer: {
                            id: '1',
                            grade: {
                              id: '1',
                              lastGradedBy: {
                                uuid: '1',
                                firstName: 'Peter',
                                lastName: 'Parker',
                              },
                              status: 'ACCEPTED',
                              updatedAt: '2020-01-02',
                            },
                            updatedAt: '2020-01-01',
                            answer: 'This is my accepted answer',
                          },
                          id: '6',
                          question: 'some question',
                          step: 2,
                          __typename: 'checkInQuestion',
                        },
                      ],
                    },
                  ],
                },
                {
                  id: '2',
                  step: 2,
                  name: 'second lesson',
                  assignments: [
                    {
                      id: '3',
                      step: 1,
                      description: 'fd',
                      name: 'third assignment',
                      displayName: 'third assignment',
                      __typename: 'assignment',
                      submission: {
                        id: '1',
                        files: [
                          { id: '1', url: 'url', filename: 'first - file' },
                          { id: '2', url: 'url', filename: 'second - file' },
                        ],
                        grade: {
                          id: '2',
                          lastGradedBy: {
                            uuid: '1',
                            firstName: 'Peter',
                            lastName: 'Parker',
                          },
                          status: GRADE_STATUSES.NOT_ACCEPTED,
                          updatedAt: '2020-01-02',
                        },
                        updatedAt: '2020-01-01',
                      },
                    },
                    {
                      id: '4',
                      step: 2,
                      description: 'fd',
                      name: 'fourth assignment',
                      displayName: 'fourth assignment',
                      __typename: 'assignment',
                      submission: {
                        id: '2',
                        files: [
                          { id: '1', url: 'url', filename: 'first - file' },
                          { id: '2', url: 'url', filename: 'second - file' },
                        ],
                        grade: null,
                        updatedAt: '2020-01-01',
                      },
                    },
                  ],
                  checkInQuestions: [
                    {
                      answer: {
                        id: '2',
                        grade: {
                          id: '3',
                          lastGradedBy: {
                            uuid: '1',
                            firstName: 'Peter',
                            lastName: 'Parker',
                          },
                          status: 'ACCEPTED',
                          updatedAt: '2020-01-02',
                        },
                        updatedAt: '2020-01-03',
                        answer: 'This is my accepted but updated answer',
                      },
                      id: '1',
                      step: 1,
                      question: 'some question',
                      __typename: 'checkInQuestion',
                    },
                    {
                      answer: {
                        id: '3',
                        grade: {
                          id: '3',
                          lastGradedBy: {
                            uuid: '1',
                            firstName: 'Peter',
                            lastName: 'Parker',
                          },
                          status: GRADE_STATUSES.NOT_ACCEPTED,
                          updatedAt: '2020-01-02',
                        },
                        updatedAt: '2020-01-03',
                        answer: 'This is my rejected but updated answer',
                      },
                      id: '2',
                      step: 2,
                      question: 'some question',
                      __typename: 'checkInQuestion',
                    },
                  ],
                  checkInGroups: [
                    {
                      __typename: 'CheckInGroup',
                      id: '1',
                      displayName: 'firstgroup',
                      step: 2,
                      questions: [
                        {
                          answer: null,
                          id: '4',
                          question: 'some question',
                          step: 3,
                          __typename: 'checkInQuestion',
                        },
                        {
                          answer: {
                            id: '1',
                            grade: null,
                            updatedAt: '2020-01-01',
                            answer: 'This is my first time answer',
                          },
                          id: '5',
                          question: 'some question',
                          step: 1,
                          __typename: 'checkInQuestion',
                        },
                        {
                          answer: {
                            id: '1',
                            grade: {
                              id: '1',
                              lastGradedBy: {
                                uuid: '1',
                                firstName: 'Peter',
                                lastName: 'Parker',
                              },
                              status: 'ACCEPTED',
                              updatedAt: '2020-01-02',
                            },
                            updatedAt: '2020-01-01',
                            answer: 'This is my accepted answer',
                          },
                          id: '6',
                          question: 'some question',
                          step: 2,
                          __typename: 'checkInQuestion',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            __typename: 'Student',
          },
        },
      };
    },
  },
];

const renderWithUseCourseActivity = (TesterComponent) => {
  const utils = renderWithRouter(
    <MockedProvider mocks={mocks}>
      <CourseActivityProvider courseId='1' schoolClassUuid='1' studentUuid='1'>
        <TesterComponent />
      </CourseActivityProvider>
    </MockedProvider>
  );

  return { ...utils };
};

describe('useCourseActivity', () => {
  it('returns student course activities in correct order', async () => {
    function TesterComponent() {
      const { itemsToGrade } = useCourseActivity({ withQuery: true });

      return (
        <>
          {itemsToGrade.map((item, index) => (
            <li key={index} data-testid={`course-activity-item course-activity-item-${index + 1}`}>
              {item.lesson.name} {item.displayName || `check-in-${index + 1}`}
            </li>
          ))}
        </>
      );
    }

    const { getAllByTestId, getByTestId } = renderWithUseCourseActivity(TesterComponent);

    await waitFor(() => {
      expect(courseActivityQuerySpy).toHaveBeenCalledTimes(1);
      expect(getAllByTestId(/course-activity-item/)).toHaveLength(14);
      expect(getByTestId(/course-activity-item-1$/)).toHaveTextContent(
        /first lesson first assignment/i
      );
      expect(getByTestId(/course-activity-item-2/)).toHaveTextContent(/first lesson check-in-2/i);
      expect(getByTestId(/course-activity-item-3/)).toHaveTextContent(/first lesson check-in-3/i);
      expect(getByTestId(/course-activity-item-4/)).toHaveTextContent(/first lesson check-in-4/i);

      expect(getByTestId(/course-activity-item-5/)).toHaveTextContent(/first lesson check-in-5/i);
      expect(getByTestId(/course-activity-item-6/)).toHaveTextContent(/first lesson check-in-6/i);
      expect(getByTestId(/course-activity-item-7/)).toHaveTextContent(/first lesson check-in-7/i);

      expect(getByTestId(/course-activity-item-8/)).toHaveTextContent(
        /second lesson third assignment/i
      );
      expect(getByTestId(/course-activity-item-9/)).toHaveTextContent(
        /second lesson fourth assignment/i
      );
      expect(getByTestId(/course-activity-item-10/)).toHaveTextContent(
        /second lesson check-in-10/i
      );
      expect(getByTestId(/course-activity-item-11$/)).toHaveTextContent(
        /second lesson check-in-11/i
      );
      expect(getByTestId(/course-activity-item-12$/)).toHaveTextContent(
        /second lesson check-in-12/i
      );
      expect(getByTestId(/course-activity-item-13$/)).toHaveTextContent(
        /second lesson check-in-13/i
      );
      expect(getByTestId(/course-activity-item-14$/)).toHaveTextContent(
        /second lesson check-in-14/i
      );
    });
  });

  it('provides initially no current course activity item and sets new active item correctly', async () => {
    function TesterComponent() {
      const { itemToGrade, setItemToGradeByIndex } = useCourseActivity({ withQuery: true });

      return (
        <>
          <div data-testid='course-activity-item'>
            {itemToGrade && (
              <>
                {itemToGrade?.lesson?.name} {itemToGrade?.displayName}
              </>
            )}
          </div>
          <button data-testid='set-button' onClick={() => setItemToGradeByIndex(0)}>
            Set first item
          </button>
        </>
      );
    }

    const { getByTestId } = renderWithUseCourseActivity(TesterComponent);

    await waitFor(() => {
      expect(getByTestId(/course-activity-item/)).toBeEmptyDOMElement();
    });

    await waitFor(() => {
      fireEvent.click(getByTestId(/set-button/));
    });

    await waitFor(() => {
      expect(getByTestId(/course-activity-item/)).toHaveTextContent(
        /first lesson first assignment/i
      );
    });
  });

  it('provides handlers to switch to previous and next course activity item correcty', async () => {
    function TesterComponent() {
      // eslint-disable-next-line max-len
      const {
        itemToGrade,
        setItemToGradeByIndex,
        selectNextItemToGrade,
        selectPreviousItemToGrade,
      } = useCourseActivity({ withQuery: true });

      useEffect(() => {
        setItemToGradeByIndex(0);
      }, []);

      return (
        <>
          <div data-testid='course-activity-item'>
            {itemToGrade?.lesson?.name} {itemToGrade?.displayName || 'check-in'}
          </div>
          <button data-testid='previous-button' onClick={() => selectPreviousItemToGrade()}>
            set previous item
          </button>
          <button data-testid='next-button' onClick={() => selectNextItemToGrade()}>
            set next item
          </button>
        </>
      );
    }

    const { getByTestId } = renderWithUseCourseActivity(TesterComponent);

    await waitFor(() => {
      expect(getByTestId(/course-activity-item/)).toHaveTextContent(
        /first lesson first assignment/i
      );
    });

    await waitFor(() => {
      fireEvent.click(getByTestId(/next-button/));
    });

    await waitFor(() => {
      expect(getByTestId(/course-activity-item/)).toHaveTextContent(/first lesson check-in/i);
    });

    await waitFor(() => {
      fireEvent.click(getByTestId(/previous-button/));
    });

    await waitFor(() => {
      fireEvent.click(getByTestId(/previous-button/));
    });

    await waitFor(() => {
      expect(getByTestId(/course-activity-item/)).toHaveTextContent(/second lesson check-in/i);
    });
  });
});
