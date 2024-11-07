import { ASSESSMENT_STATUSES, ASSESSMENT_TYPES } from '@dc/resources/constants';

export const noAnswersMock = {
  data: {
    assessmentProgress: {
      reviewSurveyAnswers: [],
      attempt: {
        assessmentType: ASSESSMENT_TYPES.HIGH_SCHOOL,
        id: '1',
        status: ASSESSMENT_STATUSES.IN_PROGRESS,
        updatedAt: '2021-09-29T09:00:00Z',
        __typename: 'AssessmentAttempt',
      },
      enrolledInCourse: false,
      interestsAnswers: [],
      studyPreferencesAnswers: [],
      workValuesAnswers: [],
      status: {
        studyPreferences: ASSESSMENT_STATUSES.NOT_STARTED,
        interests: ASSESSMENT_STATUSES.NOT_STARTED,
        workValues: ASSESSMENT_STATUSES.NOT_STARTED,
        reviewSurvey: ASSESSMENT_STATUSES.NOT_STARTED,
        __typename: 'AssessmentStatus',
      },
    },
  },
};

export const studyPreferencesAnswersMock = {
  data: {
    assessmentProgress: {
      reviewSurveyAnswers: [],
      attempt: {
        assessmentType: ASSESSMENT_TYPES.HIGH_SCHOOL,
        id: '1',
        status: ASSESSMENT_STATUSES.IN_PROGRESS,
        updatedAt: '2021-09-29T09:00:00Z',
        __typename: 'AssessmentAttempt',
      },
      enrolledInCourse: false,
      interestsAnswers: [],
      studyPreferencesAnswers: [
        {
          option: {
            id: '4',
            __typename: 'StudyPreferencesOption',
          },
          position: 1,
          __typename: 'StudyPreferencesAnswer',
        },
        {
          option: {
            id: '4',
            __typename: 'StudyPreferencesOption',
          },
          position: 1,
          __typename: 'StudyPreferencesAnswer',
        },
        {
          option: {
            id: '4',
            __typename: 'StudyPreferencesOption',
          },
          position: 1,
          __typename: 'StudyPreferencesAnswer',
        },
        {
          option: {
            id: '4',
            __typename: 'StudyPreferencesOption',
          },
          position: 1,
          __typename: 'StudyPreferencesAnswer',
        },
      ],
      workValuesAnswers: [],
      status: {
        studyPreferences: ASSESSMENT_STATUSES.NOT_STARTED,
        interests: ASSESSMENT_STATUSES.NOT_STARTED,
        workValues: ASSESSMENT_STATUSES.NOT_STARTED,
        reviewSurvey: ASSESSMENT_STATUSES.NOT_STARTED,
        __typename: 'AssessmentStatus',
      },
    },
  },
};

export const interestsAnswersMock = {
  data: {
    assessmentProgress: {
      reviewSurveyAnswers: [],
      attempt: {
        assessmentType: ASSESSMENT_TYPES.HIGH_SCHOOL,
        id: '1',
        status: ASSESSMENT_STATUSES.IN_PROGRESS,
        updatedAt: '2021-09-29T09:00:00Z',
        __typename: 'AssessmentAttempt',
      },
      enrolledInCourse: false,
      interestsAnswers: [
        {
          checked: false,
          option: {
            id: '1',
            group: {
              id: '1',
              __typename: 'InterestsGroup',
            },
            __typename: 'InterestsOption',
          },
          __typename: 'InterestsAnswer',
        },
        {
          checked: false,
          option: {
            id: '1',
            group: {
              id: '1',
              __typename: 'InterestsGroup',
            },
            __typename: 'InterestsOption',
          },
          __typename: 'InterestsAnswer',
        },
        {
          checked: false,
          option: {
            id: '2',
            group: {
              id: '2',
              __typename: 'InterestsGroup',
            },
            __typename: 'InterestsOption',
          },
          __typename: 'InterestsAnswer',
        },
        {
          checked: false,
          option: {
            id: '2',
            group: {
              id: '2',
              __typename: 'InterestsGroup',
            },
            __typename: 'InterestsOption',
          },
          __typename: 'InterestsAnswer',
        },
        {
          checked: false,
          option: {
            id: '3',
            group: {
              id: '3',
              __typename: 'InterestsGroup',
            },
            __typename: 'InterestsOption',
          },
          __typename: 'InterestsAnswer',
        },
      ],
      studyPreferencesAnswers: [],
      workValuesAnswers: [],
      status: {
        studyPreferences: ASSESSMENT_STATUSES.COMPLETED,
        interests: ASSESSMENT_STATUSES.NOT_STARTED,
        workValues: ASSESSMENT_STATUSES.NOT_STARTED,
        reviewSurvey: ASSESSMENT_STATUSES.NOT_STARTED,
        __typename: 'AssessmentStatus',
      },
    },
  },
};

export const workValuesAnswersMock = {
  data: {
    assessmentProgress: {
      reviewSurveyAnswers: [],
      attempt: {
        assessmentType: ASSESSMENT_TYPES.HIGH_SCHOOL,
        id: '1',
        status: ASSESSMENT_STATUSES.IN_PROGRESS,
        updatedAt: '2021-09-29T09:00:00Z',
        __typename: 'AssessmentAttempt',
      },
      enrolledInCourse: false,
      interestsAnswers: [],
      studyPreferencesAnswers: [],
      workValuesAnswers: [
        {
          option: {
            id: '1',
            __typename: 'WorkValuesOption',
          },
          tokens: 0,
          __typename: 'WorkValuesAnswer',
        },
        {
          option: {
            id: '2',
            __typename: 'WorkValuesOption',
          },
          tokens: 0,
          __typename: 'WorkValuesAnswer',
        },
        {
          option: {
            id: '3',
            __typename: 'WorkValuesOption',
          },
          tokens: 0,
          __typename: 'WorkValuesAnswer',
        },
        {
          option: {
            id: '4',
            __typename: 'WorkValuesOption',
          },
          tokens: 0,
          __typename: 'WorkValuesAnswer',
        },
        {
          option: {
            id: '5',
            __typename: 'WorkValuesOption',
          },
          tokens: 0,
          __typename: 'WorkValuesAnswer',
        },
        {
          option: {
            id: '6',
            __typename: 'WorkValuesOption',
          },
          tokens: 0,
          __typename: 'WorkValuesAnswer',
        },
        {
          option: {
            id: '7',
            __typename: 'WorkValuesOption',
          },
          tokens: 0,
          __typename: 'WorkValuesAnswer',
        },
        {
          option: {
            id: '8',
            __typename: 'WorkValuesOption',
          },
          tokens: 0,
          __typename: 'WorkValuesAnswer',
        },
        {
          option: {
            id: '9',
            __typename: 'WorkValuesOption',
          },
          tokens: 0,
          __typename: 'WorkValuesAnswer',
        },
        {
          option: {
            id: '10',
            __typename: 'WorkValuesOption',
          },
          tokens: 0,
          __typename: 'WorkValuesAnswer',
        },
      ],
      status: {
        studyPreferences: ASSESSMENT_STATUSES.COMPLETED,
        interests: ASSESSMENT_STATUSES.COMPLETED,
        workValues: ASSESSMENT_STATUSES.NOT_STARTED,
        reviewSurvey: ASSESSMENT_STATUSES.NOT_STARTED,
        __typename: 'AssessmentStatus',
      },
    },
  },
};
