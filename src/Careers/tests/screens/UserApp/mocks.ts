import { MockedResponse } from '@apollo/client/testing';
import { StudentCourseActivityQuery } from '@graphql/dc/users/operations';

import {
  STUDENT_COURSE_ACTIVITY,
  TStudentCourseActivityVariables,
} from '@dc/graphql/user/queries/studentCourseActivity';
import {
  CAREER_COURSE_SETTINGS_TYPES,
  COURSE_TYPES,
  GRADE_STATUSES,
} from '@dc/resources/constants';
import studentCurrentCoursesPreviewQuery from '@dc/graphql/user/queries/studentCurrentCoursesPreview';

export const differentGradesActivityMock: MockedResponse<
  StudentCourseActivityQuery,
  TStudentCourseActivityVariables
> = {
  request: {
    query: STUDENT_COURSE_ACTIVITY,
    variables: { courseId: '1', uuid: '1' },
  },
  result: {
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
                  displayName: 'first assignment',
                  submission: null,
                  // @ts-ignore
                  __typename: 'assignment',
                  rubrics: [],
                },
              ],
              checkInQuestions: [
                {
                  answer: null,
                  id: '1',
                  question: 'some question',
                  step: 1,
                  __typename: 'checkInQuestion',
                },
                {
                  answer: {
                    id: '1',
                    grade: null,
                    updatedAt: '2020-01-01',
                    answer: 'This is my first time answer',
                  },
                  id: '2',
                  name: 'first checkin',
                  displayName: 'first checkin',
                  question: 'some question',
                  step: 3,
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
                  question: 'some question',
                  step: 2,
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
                  rubrics: [],
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
                      status: GRADE_STATUSES.ACCEPTED,
                      updatedAt: '2020-01-02',
                    },
                    updatedAt: '2020-01-03',
                    answer: 'This is my accepted but updated answer',
                  },
                  id: '7',
                  name: 'accepted but updated',
                  displayName: 'accepted but updated',
                  question: 'some question',
                  step: 3,
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
                  id: '8',
                  name: 'rejected but updated',
                  displayName: 'rejected but updated',
                  question: 'some question',
                  step: 1,
                  __typename: 'checkInQuestion',
                },
              ],
              checkInGroups: [
                {
                  __typename: 'CheckInGroup',
                  id: '1',
                  step: 2,
                  questions: [
                    {
                      answer: null,
                      id: '9',
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
                      id: '10',
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
                      id: '11',
                      name: 'accepted answer',
                      displayName: 'accepted answer',
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
      },
    },
  },
};

export const previewQueryMock = {
  request: {
    query: studentCurrentCoursesPreviewQuery,
    // This variables are taken from useParams
    variables: { uuid: '1', studentUuid: '1' },
  },
  result: () => ({
    data: {
      student: {
        hasPlans: true,
        archivedAt: '',
        assessmentCompleted: true,
        assessmentResult: {
          id: '1',
        },
        plans: null,
        currentCourses: [
          {
            id: '1',
            name: 'Criminals Fighting',
            progress: {
              total: 3,
              submitted: 1,
            },
            type: COURSE_TYPES.HIGH_SCHOOL,
            gradingNeeded: true,
          },
          {
            id: '2',
            name: 'Fast clothes changing',
            progress: {
              total: 3,
              submitted: 1,
            },
            type: COURSE_TYPES.MIDDLE_SCHOOL,
            gradingNeeded: false,
          },
        ],
        firstName: 'Bruce',
        lastName: 'Wayne',
        schoolClasses: [
          {
            uuid: '1',
            name: '1A',
          },
        ],
        settings: {
          onboardingEnabled: {
            value: true,
            origin: '',
          },
          assessmentType: {
            value: CAREER_COURSE_SETTINGS_TYPES.MIDDLE_SCHOOL,
            origin: '',
          },
          assessmentEnabled: {
            value: true,
            origin: '',
          },
          selfEvaluationEnabled: {
            value: true,
            origin: '',
          },
        },
        uuid: '1',
        __typename: 'Student',
      },
    },
  }),
};

export const activtiyQueryMock = {
  request: {
    query: STUDENT_COURSE_ACTIVITY,
    // This variables are taken from useParams
    variables: { uuid: '1', courseId: '1' },
  },
  result: () => ({
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
              assignments: [],
              checkInQuestions: [
                {
                  answer: null,
                  question: 'some question',
                  __typename: 'checkInQuestion',
                },
              ],
              checkInGroups: [],
            },
          ],
        },
        __typename: 'Student',
      },
    },
  }),
};

export const studentAssessmentSettingsMocks = (
  assessmentTypeValue = CAREER_COURSE_SETTINGS_TYPES.MIDDLE_SCHOOL,
  onboardingEnabledValue = true,
  assessmentResult = null,
  assessmentEnabledValue = true,
  selfEvaluationEnabledValue = true
) => [
  {
    request: {
      query: studentCurrentCoursesPreviewQuery,
      // This variables are taken from useParams
      variables: { uuid: '1', studentUuid: '1' },
    },
    result: () => ({
      data: {
        student: {
          archivedAt: '',
          uuid: '1',
          assessmentCompleted: true,
          assessmentResult: assessmentResult,
          hasPlans: true,
          settings: {
            assessmentType: { value: assessmentTypeValue, origin: '' },
            onboardingEnabled: { value: onboardingEnabledValue, origin: '' },
            assessmentEnabled: { value: assessmentEnabledValue, origin: '' },
            selfEvaluationEnabled: { value: selfEvaluationEnabledValue, origin: '' },
          },
          __typename: 'Student',
          firstName: 'Bruce',
          lastName: 'Wayne',
          schoolClasses: [
            {
              uuid: '1',
              name: '1A',
            },
          ],
          plans: [{ id: '1', name: 'some plan' }],
          currentCourses: [],
        },
      },
    }),
  },
];
