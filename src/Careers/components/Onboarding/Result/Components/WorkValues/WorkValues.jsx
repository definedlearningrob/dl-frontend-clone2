import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Chart from '@dc/components/Onboarding/Result/Components/Chart/Chart';

OnboardingResultComponentsWorkValues.propTypes = {
  workValuesResult: PropTypes.arrayOf(
    PropTypes.shape({
      score: PropTypes.number,
      workValue: PropTypes.string,
    })
  ),
};

function OnboardingResultComponentsWorkValues({ workValuesResult }) {
  const { t } = useTranslation();

  const generateChartData = workValuesResult.map(({ workValue, score }) => ({
    name: workValue,
    value: score,
  }));

  const rublicItems = workValuesResult.map(({ workValue }) => (
    <p key={workValue} className='onboarding-components-work-values__rubric-item'>
      <span className='onboarding-components-work-values__rubric-item-title'>
        {t(
          `student.onboarding.components.workValues.rubric.${workValue
            .toLowerCase()
            .replace(/\s/g, '')}.title`
        )}
      </span>
      {t(
        `student.onboarding.components.workValues.rubric.${workValue
          .toLowerCase()
          .replace(/\s/g, '')}.description`
      )}
    </p>
  ));

  return (
    <div className='onboarding-components-work-values'>
      <h2 className='onboarding-components-work-values__title'>
        {t('student.onboarding.components.workValues.heading')}
      </h2>
      <p className='onboarding-components-work-values__description'>
        {t('student.onboarding.components.workValues.headerTextFirst')}
      </p>
      <p className='onboarding-components-work-values__description'>
        {t('student.onboarding.components.workValues.headerTextSecond')}
      </p>
      <Chart
        axisName={t('student.onboarding.components.workValues.chart.axisName')}
        data={generateChartData}
        title={t('student.onboarding.components.workValues.chart.heading')}
        type='workValues'
      />
      <div className='onboarding-components-work-values__rubric'>
        <h4>{t('student.onboarding.components.workValues.rubric.heading')}</h4>
        {rublicItems}
      </div>
      <p className='onboarding-components-work-values__description'>
        {t('student.onboarding.components.workValues.footerText')}
      </p>
    </div>
  );
}

export default OnboardingResultComponentsWorkValues;
