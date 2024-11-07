import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Chart from '@dc/components/Onboarding/Result/Components/Chart/Chart';

OnboardingResultComponentsInterests.propTypes = {
  interestsResult: PropTypes.arrayOf(
    PropTypes.shape({
      interest: PropTypes.string,
      score: PropTypes.number,
    })
  ),
};

function OnboardingResultComponentsInterests({ interestsResult }) {
  const { t } = useTranslation();

  const chartData = interestsResult.map(({ interest, score }) => ({
    name: t(`student.onboarding.components.interests.chart.items.${interest.toLowerCase()}`),
    value: score,
  }));

  const rublicItems = interestsResult.map(({ interest }) => (
    <p key={interest} className='onboarding-components-interests__rubric-item'>
      <span className='onboarding-components-interests__rubric-item-title'>
        {t(`student.onboarding.components.interests.rubric.${interest.toLowerCase()}.title`)}
      </span>
      {t(`student.onboarding.components.interests.rubric.${interest.toLowerCase()}.description`)}
    </p>
  ));

  return (
    <div className='onboarding-components-interests'>
      <h2 className='onboarding-components-interests__title'>
        {t('student.onboarding.components.interests.heading')}
      </h2>
      <p className='onboarding-components-interests__description'>
        {t('student.onboarding.components.interests.headerTextFirst')}
      </p>
      <p className='onboarding-components-interests__description'>
        {t('student.onboarding.components.interests.headerTextSecond')}
      </p>
      <Chart
        axisName={t('student.onboarding.components.interests.chart.axisName')}
        data={chartData}
        title={t('student.onboarding.components.interests.chart.heading')}
        type='interests'
      />
      <div className='onboarding-components-interests__rubric'>
        <h4>{t('student.onboarding.components.interests.rubric.heading')}</h4>
        {rublicItems}
      </div>
    </div>
  );
}

export default OnboardingResultComponentsInterests;
