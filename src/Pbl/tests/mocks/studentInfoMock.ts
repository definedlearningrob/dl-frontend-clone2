import DLStudentInfoQuery from '@pbl/graphql/student/queries/userInfo';

export const DLStudentInfoMock = {
  request: {
    query: DLStudentInfoQuery,
    variables: {
      username: undefined,
    },
  },
  result: {
    data: {
      userInfo: {
        state: 'ALASKA',
        currentSchoolYear: 2023,
        hasAccessToDc: false,
        logoUrl: 'https://logo.svg',
        iconUrl: 'https://icon.svg',
        welcomeMessage: 'Welcome',
        settings: {
          assessmentEnabled: true,
          onboardingEnabled: true,
          selfEvaluationEnabled: true,
        },
        email: 'bruce@wayne.com',
        hasUnreadConversation: false,
        hasPlans: true,
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
