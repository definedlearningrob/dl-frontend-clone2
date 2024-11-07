import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useLazyQuery, useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import assessmentAttemptStatusQuery from '@dc/graphql/student/queries/assessmentAttemptStatus';
import { ASSESSMENT_STATUSES, APTITUDE_VARIABLES } from '@dc/resources/constants';
import useUserInfo from '@dc/hooks/useUserInfo';

import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';
import { callToast } from '@shared/components/Toaster/Toaster';

function OnboardingProcessingAssessment() {
  const history = useHistory();
  const { t } = useTranslation();
  const isIframeEmbedded = window.top !== window;
  const {
    userInfo: { hasCompletedAssessment },
  } = useUserInfo();
  const [fetchProcessedOnboarding, { data: onboardingData }] = useLazyQuery(
    assessmentAttemptStatusQuery,
    {
      fetchPolicy: 'network-only',
    }
  );
  const {
    data: statusData,
    startPolling,
    stopPolling,
  } = useQuery(assessmentAttemptStatusQuery, { fetchPolicy: 'no-cache' });

  useEffect(() => {
    // eslint-disable-next-line no-undef
    startPolling(import.meta.env.VITE_ASSESSMENT_PROCESSING_REFETCH_TIMEOUT);

    return () => stopPolling();
  }, []);

  useEffect(() => {
    const finished = statusData?.assessmentProgress.attempt.status === ASSESSMENT_STATUSES.FINISHED;

    if (finished) {
      fetchProcessedOnboarding();
    }

    if (onboardingData && hasCompletedAssessment) {
      callToast('success', t('student.onboarding.assessment.processedSuccessfully'));

      if (
        localStorage.getItem(APTITUDE_VARIABLES.LOCAL_STORAGE_ASSESSMENT_KEY) !== null &&
        isIframeEmbedded
      ) {
        localStorage.removeItem(APTITUDE_VARIABLES.LOCAL_STORAGE_ASSESSMENT_KEY);
        window.parent.postMessage(
          JSON.stringify({ function: 'backToProgram', params: [{ newResults: true }] }),
          '*'
        );
      } else {
        history.push('/onboarding/choose-pathway');
      }
    }
  }, [statusData, onboardingData, hasCompletedAssessment]);

  return (
    <div className='assessment -second-background'>
      <div className='processing-assessment'>
        <div>
          <SharedLoadingSpinner className='processing-assessment__spinner' />
          <span className='processing-assessment__text'>
            {t('student.onboarding.assessment.processingText.wait')}
          </span>
          <span className='processing-assessment__text'>
            {t('student.onboarding.assessment.processingText.evaluating')}
          </span>
        </div>
      </div>
    </div>
  );
}

export default OnboardingProcessingAssessment;
