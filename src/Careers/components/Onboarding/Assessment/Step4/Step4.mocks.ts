import { SURVEY_QUESTIONS_QUERY } from '@dc/graphql/student/queries/surveyQuestions';
import CREATE_CAREER_REVIEW_SURVEY_ANSWERS from '@dc/graphql/student/mutations/createCareerReviewSurveyAnswers';
import assessmentAttemptStatusQuery from '@dc/graphql/student/queries/assessmentAttemptStatus';
import finishAssessmentMutation from '@dc/graphql/student/mutations/finishAssessment';

export const createAnswer1Spy = jest.fn();
export const createAnswer2Spy = jest.fn();
export const createAnswer3Spy = jest.fn();
export const createAnswer4Spy = jest.fn();
export const createAnswer5Spy = jest.fn();
export const finishAssessmentSpy = jest.fn();

const createAnswerResponse = {
  data: {
    createCareerReviewSurveyAnswers: {
      status: 'ok',
    },
  },
};

const assessmentProgress = {
  request: {
    query: assessmentAttemptStatusQuery,
  },
  result: () => ({
    data: {
      assessmentProgress: {
        attempt: null,
      },
    },
  }),
};

const finishAssessment = {
  request: {
    query: finishAssessmentMutation,
    variables: { attemptId: '138189' },
  },
  result: () => {
    finishAssessmentSpy();

    return {
      data: {
        createAssessmentResult: {
          status: 'test status',
        },
      },
    };
  },
};

export const step4Mocks = [
  assessmentProgress,
  assessmentProgress,
  assessmentProgress,
  assessmentProgress,
  assessmentProgress,
  finishAssessment,
  {
    request: {
      query: CREATE_CAREER_REVIEW_SURVEY_ANSWERS,
      variables: {
        input: {
          contextId: '138189',
          contextType: 'ASSESSMENT',
          answers: [{ questionId: '7', answer: ['I have no idea'] }],
        },
      },
    },
    result: () => {
      createAnswer1Spy();

      return createAnswerResponse;
    },
  },
  {
    request: {
      query: CREATE_CAREER_REVIEW_SURVEY_ANSWERS,
      variables: {
        input: {
          contextId: '138189',
          contextType: 'ASSESSMENT',
          answers: [
            {
              questionId: '8',
              answer: [
                'Subjects I like or dislike in school',
                'My interests (things that I enjoy)',
                'Test answer',
              ],
            },
          ],
        },
      },
    },
    result: () => {
      createAnswer2Spy();

      return createAnswerResponse;
    },
  },
  {
    request: {
      query: CREATE_CAREER_REVIEW_SURVEY_ANSWERS,
      variables: {
        input: {
          contextId: '138189',
          contextType: 'ASSESSMENT',
          answers: [{ questionId: '9', answer: ['I have no idea what career I want to pursue'] }],
        },
      },
    },
    result: () => {
      createAnswer3Spy();

      return createAnswerResponse;
    },
  },
  {
    request: {
      query: CREATE_CAREER_REVIEW_SURVEY_ANSWERS,
      variables: {
        input: {
          contextId: '138189',
          contextType: 'ASSESSMENT',
          answers: [
            {
              questionId: '10',
              answer: ['They have helped me to decide courses I should consider taking in school'],
            },
          ],
        },
      },
    },
    result: () => {
      createAnswer4Spy();

      return createAnswerResponse;
    },
  },
  {
    request: {
      query: CREATE_CAREER_REVIEW_SURVEY_ANSWERS,
      variables: {
        input: {
          contextId: '138189',
          contextType: 'ASSESSMENT',
          answers: [
            { questionId: '11', answer: ["I'm interested in 3 or more options. (Early Planning)"] },
          ],
        },
      },
    },
    result: () => {
      createAnswer5Spy();

      return createAnswerResponse;
    },
  },
  {
    request: {
      query: SURVEY_QUESTIONS_QUERY,
      variables: {},
    },
    result: {
      data: {
        surveyQuestions: [
          {
            id: '7',
            question: 'Do you know what career you want to pursue?',
            type: 'single_choice',
            options: [
              {
                step: 1,
                option: 'I have no idea',
                __typename: 'CareerReviewSurveyQuestionOption',
              },
              {
                step: 2,
                option: "I've thought about it, but I'm not sure",
                __typename: 'CareerReviewSurveyQuestionOption',
              },
              {
                step: 3,
                option: 'I have a general idea',
                __typename: 'CareerReviewSurveyQuestionOption',
              },
              {
                step: 4,
                option: 'I know the career I want to pursue',
                __typename: 'CareerReviewSurveyQuestionOption',
              },
            ],
            __typename: 'CareerReviewSurveyQuestion',
          },
          {
            id: '8',
            question:
              'Which of the following personal preferences or traits matter to you when you think about choosing a career?',
            type: 'multiple_choice',
            options: [
              {
                step: 1,
                option: "I haven't thought about choosing a career",
                __typename: 'CareerReviewSurveyQuestionOption',
              },
              {
                step: 2,
                option: 'Subjects I like or dislike in school',
                __typename: 'CareerReviewSurveyQuestionOption',
              },
              {
                step: 3,
                option: 'My interests (things that I enjoy)',
                __typename: 'CareerReviewSurveyQuestionOption',
              },
              {
                step: 4,
                option: 'My values (things that are important to me)',
                __typename: 'CareerReviewSurveyQuestionOption',
              },
              {
                step: 5,
                option: 'My abilities (things I do well)',
                __typename: 'CareerReviewSurveyQuestionOption',
              },
              {
                step: 6,
                option: 'Other',
                __typename: 'CareerReviewSurveyQuestionOption',
              },
            ],
            __typename: 'CareerReviewSurveyQuestion',
          },
          {
            id: '9',
            question: 'What do you know about the career(s) you are considering?',
            type: 'multiple_choice',
            options: [
              {
                step: 1,
                option: 'I have no idea what career I want to pursue',
                __typename: 'CareerReviewSurveyQuestionOption',
              },
              {
                step: 2,
                option: 'I know what a person does in the career(s)',
                __typename: 'CareerReviewSurveyQuestionOption',
              },
              {
                step: 3,
                option: 'I know what courses I need to take in high school',
                __typename: 'CareerReviewSurveyQuestionOption',
              },
              {
                step: 4,
                option: 'I know what I need to study in college or trade school',
                __typename: 'CareerReviewSurveyQuestionOption',
              },
              {
                step: 5,
                option: 'I know how much money I could make',
                __typename: 'CareerReviewSurveyQuestionOption',
              },
              {
                step: 6,
                option: 'I know how easy or hard it is to get a job in the field',
                __typename: 'CareerReviewSurveyQuestionOption',
              },
              {
                step: 7,
                option: 'I know what I need to do to enter this career',
                __typename: 'CareerReviewSurveyQuestionOption',
              },
              {
                step: 8,
                option: 'Other',
                __typename: 'CareerReviewSurveyQuestionOption',
              },
            ],
            __typename: 'CareerReviewSurveyQuestion',
          },
          {
            id: '10',
            question: 'Which of the following have career-related projects helped you to do?',
            type: 'multiple_choice',
            options: [
              {
                step: 1,
                option: "I've never done a project related to a career",
                __typename: 'CareerReviewSurveyQuestionOption',
              },
              {
                step: 2,
                option: 'They have helped me learn about different career options',
                __typename: 'CareerReviewSurveyQuestionOption',
              },
              {
                step: 3,
                option: 'They have helped me learn about what people in specific careers do',
                __typename: 'CareerReviewSurveyQuestionOption',
              },
              {
                step: 4,
                option: 'They have helped me learn about which careers I like and dislike',
                __typename: 'CareerReviewSurveyQuestionOption',
              },
              {
                step: 5,
                option: 'They have helped me to decide courses I should consider taking in school',
                __typename: 'CareerReviewSurveyQuestionOption',
              },
              {
                step: 6,
                option: 'Other',
                __typename: 'CareerReviewSurveyQuestionOption',
              },
            ],
            __typename: 'CareerReviewSurveyQuestion',
          },
          {
            id: '11',
            question: 'How far along are you in your planning for after high school?',
            type: 'single_choice',
            options: [
              {
                step: 1,
                option: "I haven't started thinking about my plan yet. (No Plan)",
                __typename: 'CareerReviewSurveyQuestionOption',
              },
              {
                step: 2,
                option: "I'm interested in 3 or more options. (Early Planning)",
                __typename: 'CareerReviewSurveyQuestionOption',
              },
              {
                step: 3,
                option: "I'm choosing between 2 options. (Narrowed Planning)",
                __typename: 'CareerReviewSurveyQuestionOption',
              },
              {
                step: 4,
                option: 'I have a solid plan for after high school. (Focused Planning)',
                __typename: 'CareerReviewSurveyQuestionOption',
              },
              {
                step: 5,
                option:
                  "I have a plan and I'm already taking steps to make it happen. (Advanced Planning)",
                __typename: 'CareerReviewSurveyQuestionOption',
              },
            ],
            __typename: 'CareerReviewSurveyQuestion',
          },
        ],
      },
    },
  },
];

export const assessmentProgressMock = {
  __typename: 'AssessmentProgress',
  attempt: {
    __typename: 'AssessmentAttempt',
    updatedAt: '2021-09-29T09:00:00Z',
    assessmentType: 'HIGH_SCHOOL',
    id: '138189',
    status: 'IN_PROGRESS',
  },
  interestsAnswers: [],
  status: {
    __typename: 'AssessmentStatus',
    interests: 'COMPLETED',
    studyPreferences: 'COMPLETED',
    workValues: 'COMPLETED',
    reviewSurvey: 'NOT_STARTED',
  },
  studyPreferencesAnswers: [],
  workValuesAnswers: [],
  reviewSurveyAnswers: [],
};
