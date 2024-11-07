import studentInfoQuery from '@dc/graphql/student/queries/userInfo';
import { GRADE_STATUSES } from '@dc/resources/constants';
import { EducationalSettingTypes, SYNC_STATUS } from '@dc/resources/enums';

export const studentInfoMock = {
  request: {
    query: studentInfoQuery,
    variables: {
      username: undefined,
    },
  },
  result: {
    data: {
      userInfo: {
        state: 'ALASKA',
        commonAppData: {
          hasAccountConnected: false,
          connectionUrl: '',
          currentCounselor: null,
          hasFerpaSigned: false,
          canSelectCounselor: false,
          canChangeCounselor: false,
          hasCounselorInvited: false,
          syncStatus: {
            lastSyncedAt: '2021-08-05T15:00:00.000Z',
            status: SYNC_STATUS.COMPLETED,
          },
        },
        hasOpportunitiesEnabled: true,
        hasPlans: true,
        postSecondaryApplicationsEnabled: true,
        currentSchoolYear: 2023,
        hasAccessToPbl: false,
        hasCompletedOnboarding: true,
        hasCompletedAssessment: true,
        unreadAnnouncementsCount: 0,
        unreadNotificationsCount: 0,
        logoUrl: 'https://logo.svg',
        iconUrl: 'https://icon.svg',
        welcomeMessage: 'Welcome',
        settings: {
          assessmentEnabled: true,
          assessmentType: EducationalSettingTypes.HIGH_SCHOOL,
          onboardingEnabled: true,
          selfEvaluationEnabled: true,
        },
        email: 'bruce@wayne.com',
        hasUnreadConversation: false,
        isImpersonated: false,
        firstName: 'Bruce',
        lastName: 'Wayne',
        status: 'status',
        username: 'brucewayne',
        uuid: 'someuuid',
      } as const,
    },
  },
};

export const lessonMock = {
  assignments: [
    {
      description: 'desc',
      displayName: 'dname',
      id: '1',
      step: 1,
      rubrics: [],
      submission: {
        id: '1',
        updatedAt: '2020-01-01T00:00:00.000Z',
        files: [
          {
            filename: 'file',
            googleWeblink: '',
            id: '1',
            source: 'google',
            url: '',
            __typename: 'AssignmentSubmissionFile',
          },
        ],
        status: 'DRAFT',
        grade: {
          status: GRADE_STATUSES.NOT_ACCEPTED,
          updatedAt: '2020-01-01T00:00:00.000Z',
          lastGradedBy: {
            firstName: 'Burt',
            lastName: 'McKenzie',
            uuid: '1uuid',
            fullName: 'Burt McKenzie',
          },
        },
        rubricGrade: null,
        __typename: 'AssignmentSubmission',
      },
      __typename: 'Assignment',
    },
  ],
  attachments: [
    {
      description: 'desc',
      displayName: 'dname',
      files: [],
      id: '1',
      step: 2,
      __typename: 'Attachment',
    },
  ],
  careerReviewSurvey: {
    performed: false,
    version: 1,
    questions: [],
  },
  checkInQuestions: [
    {
      answer: {
        answer: 'Random answer',
        checkInQuestionId: '1',
        id: '1',
        lessonId: '1',
        studentId: '1',
        updatedAt: '2020-01-01T00:00:00.000Z',
        grade: {
          status: GRADE_STATUSES.NOT_ACCEPTED,
          lastGradedBy: {
            firstName: 'Burt',
            lastName: 'McKenzie',
            uuid: '1uuid',
          },
          updatedAt: '2020-01-01T00:00:00.000Z',
        },
        __typename: 'CheckInQuestionAnswer',
      },
      id: '1',
      question: 'How are you?',
      step: 1,
      type: 'question',
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
            answer: 'Random answer',
            checkInQuestionId: '2',
            id: '1',
            lessonId: '1',
            studentId: '1',
            updatedAt: '2020-01-01T00:00:00.000Z',
            grade: {
              status: GRADE_STATUSES.NOT_ACCEPTED,
              lastGradedBy: {
                firstName: 'Burt',
                lastName: 'McKenzie',
                uuid: '1uuid',
              },
              updatedAt: '2020-01-01T00:00:00.000Z',
            },
            __typename: 'CheckInQuestionAnswer',
          },
          id: '2',
          question: 'How are you?',
          step: 1,
          type: 'question',
          __typename: 'CheckInQuestion',
        },
      ],
      step: 2,
      __typename: 'CheckInGroup',
    },
  ],
  description: {
    introduction: 'introduction',
    goal: 'goal',
    role: 'role',
    audience: 'audience',
    situation: 'situation',
  },
  hasPresentation: true,
  id: '1',
  imageUrl: 'someurl',
  name: 'First lesson',
  externalPresentations: [
    {
      source: 'http://definedlearning.com',
      displayName: 'dname',
      id: '1',
      __typename: 'ExternalPresentation',
      isExpandable: false,
    },
  ],
  researchLinks: [
    {
      author: 'author',
      description: 'desc',
      displayName: 'dname',
      id: '1',
      resourceLink: 'resource link',
      sourceName: 'source name',
      step: 3,
      __typename: 'ResearchLink',
    },
  ],
  texts: [{ content: 'desc', displayName: 'dname', id: '1', step: 4, __typename: 'Text' }],
  type: 'pathway',
  videos: [
    {
      description: 'desc',
      displayName: 'dname',
      filename: 'fname',
      url: 'url',
      id: '1',
      step: 5,
      __typename: 'Video',
    },
  ],
  vocabularies: [{ term: 'Term', definition: 'def', id: '1', step: 6, __typename: 'Vocabulary' }],
};

export const courseTableOfContent = (isSurveyPerformed = false) => ({
  data: {
    course: {
      id: '978',
      lessons: lessonsDataMock(isSurveyPerformed),
      progress: progressDataMock,
      __typename: 'Course',
    },
  },
});

export const progressDataMock = {
  submitted: 5,
  total: 11,
  __typename: 'CourseProgress',
};

export const lessonsDataMock = (isSurveyPerformed: boolean) => [
  {
    assignments: [
      {
        displayName: 'Assignment test 1',
        id: '11',
        step: 5,
        submission: null,
        __typename: 'Assignment',
      },
    ],
    attachments: [
      {
        displayName: 'Attachment test 1',
        id: '10',
        step: 7,
        __typename: 'Attachment',
      },
    ],
    careerReviewSurvey: null,
    checkInQuestions: [
      {
        answer: null,
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
        displayName: 'Group#1',
        questions: [
          {
            answer: null,
            id: '1',
            step: 2,
            __typename: 'CheckInQuestion',
          },
          {
            answer: null,
            id: '2',
            step: 1,
            __typename: 'CheckInQuestion',
          },
        ],
        step: 3,
        __typename: 'CheckInGroup',
      },
      {
        id: '2',
        displayName: 'Group#2',
        questions: [
          {
            answer: null,
            id: '3',
            step: 1,
            __typename: 'CheckInQuestion',
          },
          {
            answer: null,
            id: '4',
            step: 2,
            __typename: 'CheckInQuestion',
          },
        ],
        step: 4,
        __typename: 'CheckInGroup',
      },
    ],
    id: '7',
    name: 'Lesson Career cluster test 1',
    externalPresentations: [
      { source: 'source', displayName: 'dname', id: '10', __typename: 'Presentation' },
    ],
    researchLinks: [
      {
        id: '3',
        step: 3,
        __typename: 'ResearchLink',
      },
      {
        id: '4',
        step: 4,
        __typename: 'ResearchLink',
      },
    ],
    step: 1,
    texts: [
      {
        displayName: 'Text test 1',
        id: '16',
        step: 6,
        __typename: 'Text',
      },
    ],
    type: 'career_cluster',
    videos: [
      {
        displayName: 'Video test 1',
        id: '2',
        step: 8,
        __typename: 'Video',
      },
    ],
    vocabularies: [
      {
        id: '2',
        step: 1,
        __typename: 'Vocabulary',
      },
      {
        id: '3',
        step: 2,
        __typename: 'Vocabulary',
      },
    ],
    __typename: 'Lesson',
  },
  {
    assignments: [
      {
        displayName: 'Assignment test 2',
        id: '12',
        step: 5,
        submission: {
          id: '4',
          updatedAt: '2021-05-25T12:00:00.000Z',
          status: 'SUBMITTED',
          grade: {
            status: 'ACCEPTED',
            updatedAt: '2021-05-25T12:00:00.000Z',
            lastGradedBy: {
              firstName: 'Burt',
              lastName: 'McKenzie',
            },
          },
          __typename: 'AssignmentSubmission',
        },
        __typename: 'Assignment',
      },
    ],
    attachments: [
      {
        displayName: 'Attachment test 2',
        id: '11',
        step: 7,
        __typename: 'Attachment',
      },
    ],
    careerReviewSurvey: null,
    checkInQuestions: [
      {
        answer: null,
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
        displayName: 'Group#1',
        questions: [
          {
            answer: null,
            id: '1',
            step: 2,
            __typename: 'CheckInQuestion',
          },
          {
            answer: null,
            id: '2',
            step: 1,
            __typename: 'CheckInQuestion',
          },
        ],
        step: 3,
        __typename: 'CheckInGroup',
      },
    ],
    id: '8',
    name: 'Lesson Project test 2',
    externalPresentations: [
      { source: 'source', displayName: 'dname', id: '11', __typename: 'Presentation' },
    ],
    researchLinks: [
      {
        id: '5',
        step: 3,
        __typename: 'ResearchLink',
      },
      {
        id: '6',
        step: 4,
        __typename: 'ResearchLink',
      },
    ],
    step: 2,
    texts: [
      {
        displayName: 'Text test 2',
        id: '17',
        step: 6,
        __typename: 'Text',
      },
    ],
    type: 'project',
    videos: [
      {
        displayName: 'Video test 2',
        id: '3',
        step: 8,
        __typename: 'Video',
      },
    ],
    vocabularies: [
      {
        id: '4',
        step: 1,
        __typename: 'Vocabulary',
      },
      {
        id: '6',
        step: 2,
        __typename: 'Vocabulary',
      },
    ],
    __typename: 'Lesson',
  },
  {
    assignments: [
      {
        displayName: 'Assignment test 3',
        id: '13',
        step: 5,
        submission: {
          id: '5',
          updatedAt: '2021-05-25T12:00:00.000Z',
          status: 'SUBMITTED',
          grade: {
            status: GRADE_STATUSES.NOT_ACCEPTED,
            updatedAt: '2021-05-25T12:00:00.000Z',
            lastGradedBy: {
              firstName: 'Burt',
              lastName: 'McKenzie',
            },
          },
          __typename: 'AssignmentSubmission',
        },
        __typename: 'Assignment',
      },
    ],
    attachments: [
      {
        displayName: 'Attachment test 3',
        id: '12',
        step: 7,
        __typename: 'Attachment',
      },
    ],
    careerReviewSurvey: null,
    checkInQuestions: [],
    checkInGroups: [],
    id: '9',
    name: 'Lesson Dig deeper into career test 3',
    externalPresentations: [
      { source: 'source', displayName: 'dname', id: '12', __typename: 'Presentation' },
    ],
    researchLinks: [
      {
        id: '8',
        step: 3,
        __typename: 'ResearchLink',
      },
      {
        id: '7',
        step: 4,
        __typename: 'ResearchLink',
      },
    ],
    step: 3,
    texts: [
      {
        displayName: 'Text test 3',
        id: '18',
        step: 6,
        __typename: 'Text',
      },
    ],
    type: 'dig_deeper_into_career',
    videos: [
      {
        displayName: 'Video test 3',
        id: '4',
        step: 8,
        __typename: 'Video',
      },
    ],
    vocabularies: [
      {
        id: '7',
        step: 1,
        __typename: 'Vocabulary',
      },
      {
        id: '5',
        step: 2,
        __typename: 'Vocabulary',
      },
    ],
    __typename: 'Lesson',
  },
  {
    assignments: [
      {
        displayName: 'Assignment test 4',
        id: '14',
        step: 1,
        submission: {
          id: '6',
          updatedAt: '2021-05-25T12:00:00.000Z',
          status: 'SUBMITTED',
          grade: {
            status: 'ACCEPTED',
            updatedAt: '2021-05-25T12:00:00.000Z',
            lastGradedBy: {
              firstName: 'Burt',
              lastName: 'McKenzie',
            },
          },
          __typename: 'AssignmentSubmission',
        },
        __typename: 'Assignment',
      },
    ],
    attachments: [],
    careerReviewSurvey: null,
    checkInQuestions: [
      {
        answer: {
          answer: 'Hello world!',
          id: '5',
          __typename: 'CheckInQuestionAnswer',
        },
        id: '3',
        step: 2,
        __typename: 'CheckInQuestion',
      },
      {
        answer: {
          answer: 'Test...',
          id: '6',
          __typename: 'CheckInQuestionAnswer',
        },
        id: '4',
        step: 1,
        __typename: 'CheckInQuestion',
      },
    ],
    checkInGroups: [
      {
        id: '1',
        displayName: 'Group#1',
        questions: [
          {
            answer: null,
            id: '1',
            step: 2,
            __typename: 'CheckInQuestion',
          },
          {
            answer: null,
            id: '2',
            step: 1,
            __typename: 'CheckInQuestion',
          },
        ],
        step: 3,
        __typename: 'CheckInGroup',
      },
    ],
    id: '10',
    name: 'Lesson Pathway test 4',
    externalPresentations: [
      { source: 'source', displayName: 'dname', id: '13', __typename: 'Presentation' },
    ],
    researchLinks: [],
    step: 4,
    texts: [],
    type: 'pathway',
    videos: [],
    vocabularies: [],
    __typename: 'Lesson',
  },
  {
    assignments: [],
    attachments: [],
    careerReviewSurvey: {
      performed: isSurveyPerformed,
      __typename: 'CareerReviewSurvey',
    },
    checkInQuestions: [],
    checkInGroups: [],
    id: '1',
    name: 'Career Review Survey',
    externalPresentations: [
      { source: 'source', displayName: 'dname', id: '14', __typename: 'Presentation' },
    ],
    researchLinks: [],
    step: 5,
    texts: [],
    type: 'career_review_survey',
    videos: [],
    vocabularies: [],
    __typename: 'Lesson',
  },
];
