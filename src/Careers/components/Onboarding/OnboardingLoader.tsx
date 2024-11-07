import { useTranslation } from 'react-i18next';

import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';

export const OnboardingLoader = () => {
  const { t } = useTranslation();

  return (
    <div className='assessment -second-background'>
      <div className='h-[100vh] flex items-center justify-center'>
        <div className='text-center'>
          <SharedLoadingSpinner className='processing-assessment__spinner' />
          <p className='text-primary-500 text-base font-medium mx-auto block mb-xxs'>
            {t('student.onboarding.loading.pleaseWait')}
          </p>
          <p className='text-primary-500 text-base font-medium mx-auto inline'>
            {t('student.onboarding.loading.loadingAssessment')}
          </p>
        </div>
      </div>
    </div>
  );
};
