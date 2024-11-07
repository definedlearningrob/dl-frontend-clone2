import lessonInCourseQuery from '@dc/graphql/student/queries/lessonInCourse';
import { CREATE_CAREER_REVIEW_SURVEY_ATTEMPT } from '@dc/graphql/student/mutations/createCareerReviewSurveyAttempt';
import createCareerReviewSurveyAnswersMutation from '@dc/graphql/student/mutations/createCareerReviewSurveyAnswers';
import currentCoursesQuery from '@dc/graphql/student/queries/currentCourses';
import { SURVEY_QUESTION_TYPE } from '@dc/components/Student/Lesson/Survey/types';

export const createAttemptSpy = jest.fn();
export const lessonInCourseSpy = jest.fn();

export let createCareerReviewSurveyAnswersSpy = jest.fn();
export let currentCoursesSpy = jest.fn();

export const mocks = [
  {
    request: {
      query: lessonInCourseQuery,
      variables: { courseId: '2', lessonId: '111', track: true },
    },
    result: () => {
      lessonInCourseSpy();

      return {
        data: {
          course: {
            careerName: 'Dental Laboratory Technicians',
            content: {
              checkIns: [],
              items: [],
            },
            hasInstitutionsInStudentState: true,
            id: '2',
            lesson: {
              assignments: [],
              attachments: [],
              careerReviewSurvey: {
                version: 1,
                performed: false,
                questions: [
                  {
                    answer: [],
                    id: '1',
                    options: [
                      {
                        option: 'Yes, definitely',
                        step: 1,
                      },
                      {
                        option: 'Definitely not',
                        step: 2,
                      },
                    ],
                    question: 'Can blind people see their dreams?',
                    type: 'single_choice' as SURVEY_QUESTION_TYPE,
                  },
                  {
                    answer: [],
                    id: '2',
                    options: [
                      {
                        option: 'Very Interested',
                        step: 1,
                      },
                      {
                        option: 'Not at all Interested',
                        step: 2,
                      },
                      {
                        option: 'Other',
                        step: 3,
                      },
                    ],
                    question: 'How interested are you in the Pathway this course is a part of?',
                    type: 'multiple_choice' as SURVEY_QUESTION_TYPE,
                  },
                ],
                __typename: 'CareerReviewSurvey',
              },
              checkInGroups: [],
              checkInQuestions: [],
              description: {
                introduction: null,
                goal: null,
                role: null,
                audience: null,
                situation: null,
                __typename: 'LessonDescription',
              },
              hasPresentation: false,
              id: '609',
              imageUrl: 'http://test.com/image.png',
              name: 'Career Review Survey',
              externalPresentations: [],
              researchLinks: [],
              texts: [],
              type: 'career_review_survey',
              videos: [],
              vocabularies: [],
              __typename: 'Lesson',
            },
            lessons: [
              {
                id: '782',
                step: 4,
                careerReviewSurvey: null,
              },
              {
                id: '609',
                step: 5,
                careerReviewSurvey: {
                  performed: false,
                  version: 1,
                  __typename: 'CareerReviewSurvey',
                },
              },
              {
                id: '275',
                step: 1,
                careerReviewSurvey: null,
              },
              {
                id: '331',
                step: 2,
                careerReviewSurvey: null,
              },
              {
                id: '668',
                step: 3,
                careerReviewSurvey: null,
              },
            ],
            name: 'Dental Laboratory Technician',
            progress: {
              submitted: 10,
              total: 10,
            },
            reviewSurvey: {
              questions: [
                {
                  id: '1',
                },
                {
                  id: '2',
                },
                {
                  id: '3',
                },
                {
                  id: '4',
                },
                {
                  id: '5',
                },
                {
                  id: '6',
                },
                {
                  id: '7',
                },
                {
                  id: '8',
                },
                {
                  id: '9',
                },
                {
                  id: '10',
                },
                {
                  id: '11',
                },
              ],
            },
          },
        },
      };
    },
  },
  {
    request: {
      query: CREATE_CAREER_REVIEW_SURVEY_ATTEMPT,
      variables: { input: { contextType: 'COURSE', contextId: '1' } },
    },
    result: () => {
      createAttemptSpy();

      return {
        data: {
          createCareerReviewSurveyAttempt: {
            careerReviewSurveyAttempt: {
              id: '2',
              status: 'IN_PROGRESS',
            },
          },
        },
      };
    },
  },
  {
    request: {
      query: createCareerReviewSurveyAnswersMutation,
      variables: {
        input: {
          contextId: '1',
          contextType: 'COURSE',
          answers: [
            { questionId: '1', answer: ['Yes, definitely'] },
            { questionId: '2', answer: ['Very Interested'] },
          ],
        },
      },
    },
    result: () => {
      createCareerReviewSurveyAnswersSpy();

      return {
        data: {
          createCareerReviewSurveyAnswers: {
            status: 'success',
          },
        },
      };
    },
  },
  {
    request: {
      query: currentCoursesQuery,
    },
    result: () => {
      currentCoursesSpy();

      return {
        data: {
          currentCourses: {
            id: '1',
            imageUrl: '',
            name: '',
            progress: {
              submitted: 2,
              total: 5,
            },
            status: 'success',
            pathway: {
              name: '',
            },
            thumbnailUrl: '',
            type: 'survey',
          },
        },
      };
    },
  },
];
