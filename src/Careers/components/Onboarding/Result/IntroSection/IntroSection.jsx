import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import graduationCertificate from '@dc/images/illustration.png';

import SharedButton from '@shared/components/Button/Button';

function OnboardingResultIntroSection() {
  const { t } = useTranslation();
  const history = useHistory();

  const goToRecommendedPathways = () => {
    document.querySelector('#pathway-section').scrollIntoView({ behavior: 'smooth' });
  };

  const goToResultsComponents = () => history.push('/choose-pathway/components/preferences');

  return (
    <section className='assessment-result-intro' data-testid='assessment-result-intro'>
      <div className='assessment-result-intro__text-wrapper'>
        <h2 className='assessment-result-intro__title'>
          {t('student.onboarding.assessment.result.title')}
        </h2>
        <p className='assessment-result-intro__description'>
          {t('student.onboarding.assessment.result.intro.description')}
        </p>
        <div className='assessment-result-intro__actions'>
          <SharedButton
            className='assessment-result-intro__button'
            variant='primary'
            onClick={goToResultsComponents}>
            {t('student.onboarding.assessment.result.showResults')}
          </SharedButton>
          <SharedButton
            className='whitespace-nowrap'
            variant='primary-outlined'
            onClick={goToRecommendedPathways}>
            {t('student.onboarding.assessment.result.recommendedPathways')}
          </SharedButton>
        </div>
      </div>
      <div className='assessment-result-intro__illustration-wrapper'>
        <img
          alt={t('student.onboarding.assessment.result.intro.imageAltText')}
          className='assessment-result-intro__img'
          src={graduationCertificate}
        />
      </div>
    </section>
  );
}

export default OnboardingResultIntroSection;
