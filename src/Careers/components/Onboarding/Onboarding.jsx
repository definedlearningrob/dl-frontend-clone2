import { Redirect, Route, Switch } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { isEmpty } from 'lodash-es';
import { useEffect } from 'react';

import { Assessment } from '@dc/components/Onboarding/Assessment/Assessment';
import { ASSESSMENT_STEPS_QUERY } from '@dc/graphql/student/queries/assessmentSteps';
import createAssessmentAttemptMutation from '@dc/graphql/student/mutations/createAssessmentAttempt';
import { MiddleSchoolAssessment } from '@dc/components/Onboarding/MiddleSchoolAssessment/MiddleSchoolAssessment';
import ProcessingAssessment from '@dc/components/Onboarding/ProcessingAssessment/ProcessingAssessment';
import { ASSESSMENT_TYPES, ASSESSMENT_STATUSES, APTITUDE_VARIABLES } from '@dc/resources/constants';
import { AssessmentProvider } from '@dc/hooks/useAssessment';
import { getOnboardingRoute } from '@dc/components/Onboarding/helpers';
import { OnboardingLoader } from '@dc/components/Onboarding/OnboardingLoader';

import useQueryParams from '@shared/hooks/useQueryParams';

export const Onboarding = () => {
  const { data, loading } = useQuery(ASSESSMENT_STEPS_QUERY);
  const {
    params: { aptitudeAssessment, retakeAssessment },
  } = useQueryParams();
  const [createAssessmentAttempt] = useMutation(createAssessmentAttemptMutation, {
    variables: { input: {} },
    refetchQueries: [ASSESSMENT_STEPS_QUERY],
    awaitRefetchQueries: true,
  });

  const noProgress = isEmpty(data?.assessmentProgress);

  const retakingAssessment =
    retakeAssessment && data?.assessmentProgress?.attempt?.status === ASSESSMENT_STATUSES.FINISHED;

  useEffect(() => {
    if (retakingAssessment || (!loading && noProgress)) {
      createAssessmentAttempt();
    }
  }, [data]);

  if (loading || retakingAssessment || noProgress) return <OnboardingLoader />;

  if (!data) return <Redirect to='/' />;

  const { assessmentProgress } = data;

  if (aptitudeAssessment) {
    localStorage.setItem(APTITUDE_VARIABLES.LOCAL_STORAGE_ASSESSMENT_KEY, true);
  }

  const assessmentVersion = (assessmentProgress) => {
    const assessmentType = assessmentProgress?.attempt?.assessmentType;

    return assessmentType && assessmentType === ASSESSMENT_TYPES.MIDDLE_SCHOOL
      ? MiddleSchoolAssessment
      : Assessment;
  };

  return (
    <>
      <Redirect to={getOnboardingRoute(assessmentProgress || {})} />

      <AssessmentProvider
        assessment={assessmentProgress}
        initialCurrentRoute={getOnboardingRoute(assessmentProgress)}>
        <div className='onboarding'>
          <Switch>
            <Route
              component={assessmentVersion(assessmentProgress)}
              path='/onboarding/assessment/step/:stepNumber/question/:questionNumber'
            />
            <Route component={ProcessingAssessment} path='/onboarding/processing-assessment' />
          </Switch>
        </div>
      </AssessmentProvider>
    </>
  );
};
