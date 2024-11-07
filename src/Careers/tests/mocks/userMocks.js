import userInfoQuery from '@dc/graphql/user/queries/userInfo';
import { CAREER_COURSE_SETTINGS_TYPES } from '@dc/resources/constants';
import { SYNC_STATUS } from '@dc/resources/enums';

import { Roles, ReportType } from '@shared/resources/enums';

export const userInfoMock = {
  request: {
    query: userInfoQuery,
    variables: { username: undefined },
  },
  result: {
    data: {
      userInfo: {
        availableReportTypes: [],
        hasAccessToPbl: true,
        commonAppData: {
          hasRecommenderInvitation: false,
          hasTeacherInvitation: false,
          hasCounselorInvitation: false,
          hasOpportunitiesEnabled: false,
          hasCounselorProfileFormCompleted: false,
          hasTeacherProfileFormCompleted: false,
          syncStatus: {
            lastSyncedAt: '2022-03-11T15:00:00.000Z',
            status: SYNC_STATUS.COMPLETED,
          },
        },
        logoUrl: 'https://logo.svg',
        iconUrl: 'https://icon.svg',
        settings: {
          assessmentEnabled: true,
          classManagementEnabled: false,
          assessmentType: CAREER_COURSE_SETTINGS_TYPES.HIGH_SCHOOL,
          onboardingEnabled: true,
          postSecondaryApplicationsEnabled: true,
        },
        permissions: {
          wblAdmin: false,
          counselor: false,
          canImpersonate: false,
          canBrowseReports: false,
        },
        email: 'bruce@wayne.com',
        currentSchoolYear: 2020,
        hasUnreadConversation: false,
        hasOpportunitiesEnabled: true,
        firstName: 'Bruce',
        lastName: 'Wayne',
        isImpersonated: false,
        role: Roles.SYSTEM_ADMIN,
        status: 'status',
        username: 'brucewayne',
        uuid: 'someuuid',
        welcomeMessage: 'Welcome message',
        entities: {
          nodes: [
            {
              uuid: 'entityuuid',
              settings: {
                classManagementEnabled: false,
                postSecondaryApplicationsEnabled: false,
                schoolYearStartDate: { day: 7, month: 7 },
              },
              reportTypes: [ReportType.CAREER_PATHWAY],
            },
          ],
        },
      },
    },
  },
};

export const lessonMock = {
  archivedAt: '',
  assignments: [
    {
      assetName: 'Asset name',
      name: 'Asset name',
      description: 'desc',
      displayName: 'dname',
      id: '1',
      step: 1,
      rubrics: [
        {
          id: '1',
          name: 'rubric',
          description: 'desc',
          criteriaLabels: [],
          criterias: [],
          headings: [],
          hasAlignedStatements: false,
          __typename: 'Rubric',
        },
      ],
      __typename: 'Assignment',
    },
  ],
  attachments: [
    {
      name: 'Attachment name',
      description: 'desc',
      displayName: 'dname',
      files: [],
      id: '1',
      step: 2,
      __typename: 'Attachment',
    },
  ],
  badges: [],
  checkInGroups: [
    {
      displayName: 'displayname',
      id: '1',
      name: 'name',
      questions: [
        {
          id: '2',
          question: 'How are you?',
          step: 1,
          __typename: 'CheckInQuestion',
        },
      ],
      step: 2,
      __typename: 'CheckInGroup',
    },
    {
      displayName: 'displayname2',
      id: '1',
      name: 'name2',
      questions: [
        {
          id: '2',
          question: 'How are you?',
          step: 2,
          __typename: 'CheckInQuestion',
        },
      ],
      step: 3,
      __typename: 'CheckInGroup',
    },
  ],
  checkInQuestions: [
    {
      id: '1',
      question: 'How are you?',
      step: 1,
      __typename: 'CheckInQuestion',
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
      name: 'Pres Name',
      isExpandable: false,
      source: 'source',
      step: 7,
      displayName: 'dname',
      id: '1',
      __typename: 'ExternalPresentation',
    },
  ],
  researchLinks: [
    {
      author: 'author',
      name: 'Research Link Name',
      description: 'desc',
      displayName: 'dname',
      id: '1',
      resourceLink: 'resource link',
      sourceName: 'source name',
      step: 3,
      __typename: 'ResearchLink',
    },
  ],
  careerReviewSurvey: {
    questions: [
      {
        id: '1',
        answer: ['Answer'],
        question: 'Question',
        options: [
          {
            option: '1',
            step: 1,
          },
        ],
        type: 'question-type',
      },
    ],
  },
  texts: [
    {
      name: 'Text name',
      content: 'desc',
      displayName: 'dname',
      id: '1',
      step: 4,
      __typename: 'Text',
    },
  ],
  thumbnailUrl: 'some-thumbnail-url',
  type: 'pathway',
  videos: [
    {
      name: 'Video name',
      description: 'desc',
      displayName: 'dname',
      filename: 'fname',
      url: 'url',
      id: '1',
      step: 5,
      __typename: 'Video',
    },
  ],
  vocabularies: [
    { term: 'Term', name: 'Term', definition: 'def', id: '1', step: 6, __typename: 'Vocabulary' },
  ],
};
