import { useTranslation } from 'react-i18next';

import ComponentItem from '@dc/components/Onboarding/Result/ComponentResultSection/ComponentItem/ComponentItem';
import { ReactComponent as Interests } from '@dc/images/interests.svg';
import { ReactComponent as StudyPreferences } from '@dc/images/study-preferences.svg';
import { ReactComponent as WorkValues } from '@dc/images/work-values.svg';

function OnboardingResultComponentResultSection() {
  const { t } = useTranslation();

  return (
    <section
      className='assessment-component-result'
      data-testid='assessment-result-components-section'>
      <div className='assessment-component-result__content-wrapper'>
        <h2 className='assessment-component-result__title'>
          {t('student.onboarding.assessment.result.componentSection.title')}
        </h2>
        <p className='assessment-component-result__description'>
          {t('student.onboarding.assessment.result.componentSection.subtitles')}
        </p>
        <div className='assessment-component-result__components-wrapper'>
          <ComponentItem
            image={<StudyPreferences />}
            link='/choose-pathway/components/preferences'
            name={t('student.onboarding.assessment.result.componentSection.studyPreferences')}
          />
          <ComponentItem
            image={<Interests />}
            link='/choose-pathway/components/interests'
            name={t('student.onboarding.assessment.result.componentSection.interests')}
          />
          <ComponentItem
            image={<WorkValues />}
            link='/choose-pathway/components/workvalues'
            name={t('student.onboarding.assessment.result.componentSection.workValues')}
          />
        </div>
      </div>
    </section>
  );
}

export default OnboardingResultComponentResultSection;
