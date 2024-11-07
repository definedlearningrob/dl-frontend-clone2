/* eslint-disable max-len */
import { MockedProvider } from '@apollo/client/testing';
import { waitFor } from '@testing-library/react';

import { Onboarding } from '@dc/components/Onboarding/Onboarding';
import { ASSESSMENT_STEPS_QUERY } from '@dc/graphql/student/queries/assessmentSteps';
import {
  interestsAnswersMock,
  noAnswersMock,
  studyPreferencesAnswersMock,
  workValuesAnswersMock,
} from '@dc/tests/mocks/studentAssessmentMocks';
import { renderWithRouterAndReduxProvider } from '@dc/utils/test';
import { UserInfoProvider } from '@dc/hooks/useUserInfo';
import { studentInfoMock } from '@dc/tests/mocks/studentMocks';

let assessmentStepsQueryCalled = false;

window.HTMLMediaElement.prototype.load = () => {};

const getMocks = (response) => [
  {
    request: {
      query: ASSESSMENT_STEPS_QUERY,
    },
    result: () => {
      assessmentStepsQueryCalled = true;

      return response;
    },
  },
];

const renderOnboarding = (data) => {
  const utils = renderWithRouterAndReduxProvider(
    <MockedProvider mocks={[...getMocks(data), studentInfoMock]}>
      <UserInfoProvider
        value={{
          userInfo: {
            isImpersonated: false,
            settings: { onboardingEnabled: true },
          },
        }}>
        <Onboarding />
      </UserInfoProvider>
    </MockedProvider>,
    { initialState: { session: { user: { type: 'student' } } } }
  );

  return { ...utils };
};

describe('Onboarding', () => {
  beforeEach(() => {
    assessmentStepsQueryCalled = false;
  });

  it('calls assessment query', async () => {
    renderOnboarding(noAnswersMock);

    await waitFor(() => {
      expect(assessmentStepsQueryCalled).toBe(true);
    });
  });

  it('redirects to assessment beginning when no answers', async () => {
    const { history } = renderOnboarding(noAnswersMock);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/onboarding/assessment/step/1/question/1');
    });
  });

  it('redirects to proper step 1 part based on answers', async () => {
    const { history } = renderOnboarding(studyPreferencesAnswersMock);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/onboarding/assessment/step/1/question/3');
    });
  });

  it('redirects to proper question of step 2 based on answers', async () => {
    const { history } = renderOnboarding(interestsAnswersMock);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/onboarding/assessment/step/2/question/4');
    });
  });

  it('redirects to proper question of step 3 based on answers', async () => {
    const { history } = renderOnboarding(workValuesAnswersMock);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/onboarding/assessment/step/3/question/6');
    });
  });
});
