import { useTranslation } from 'react-i18next';
import { useMutation, useQuery } from '@apollo/client';

import assessmentAttemptStatusQuery from '@dc/graphql/student/queries/assessmentAttemptStatus';
import createAssessmentAttemptMutation from '@dc/graphql/student/mutations/createAssessmentAttempt';
import onboardingMainImage from '@dc/images/onboarding-illustration.svg';
import onboardingSecondaryImage from '@dc/images/student-painting.png';
import studentInfoQuery from '@dc/graphql/student/queries/userInfo';

import Button from '@shared/components/Button/Button';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';

export const OnboardingFirstLogin = () => {
  const { data: userInfoCache } = useQuery(studentInfoQuery);
  const { t } = useTranslation();
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });

  const [createAssessmentAttempt] = useMutation(createAssessmentAttemptMutation, {
    variables: { input: {} },
    refetchQueries: [{ query: assessmentAttemptStatusQuery }],
  });

  const handleGetStarted = () => {
    createAssessmentAttempt();
  };

  return (
    <div className='z-higher absolute inset-base text-font-primary' data-testid='first-login'>
      <div className='bg-secondary-200 p-base flex rounded-xs gap-lg items-center mb-xl'>
        <div className='basis-1/2 shrink-0 flex justify-center'>
          <img
            alt={t('onboarding.firstLogin.header', { name: userInfoCache?.userInfo.firstName })}
            className='h-[233px] xxxl:h-[360px]'
            src={onboardingMainImage}
          />
        </div>
        <div className='grow'>
          <h1 className='text-sm xxxl:text-lg mb-sm'>
            {t('onboarding.firstLogin.header', { name: userInfoCache?.userInfo.firstName })}
          </h1>
          <p className='text-xs xxxl:text-sm'>{t('onboarding.firstLogin.text1')}</p>
          <p className='text-xs xxxl:text-sm mb-base'>{t('onboarding.firstLogin.text2')}</p>
          <Button
            data-testid='create-first-attempt'
            size={isFullHD ? 'md' : 'sm'}
            variant='primary'
            onClick={handleGetStarted}>
            {t('onboarding.firstLogin.buttonText')}
          </Button>
        </div>
      </div>

      <div className='bg-white p-base px-lg mb-xl w-[480px] xxxl:w-[720px] mx-auto flex gap-sm xxxl:gap-lg shadow-400 rounded-xs items-center'>
        <h2 className='text-base xxxl:text-lg mb-0'>{t('onboarding.firstLogin.unlockText')}</h2>
        <img
          alt={t('onboarding.firstLogin.unlockText')}
          className='h-[160px] xxxl:h-[220px]'
          src={onboardingSecondaryImage}
        />
      </div>
    </div>
  );
};
