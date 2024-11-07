import PropTypes from 'prop-types';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

OnboardingResultComponetsChart.propTypes = {
  axisName: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      fill: PropTypes.string,
      name: PropTypes.string,
      value: PropTypes.number,
    })
  ),
  title: PropTypes.string,
  type: PropTypes.oneOf(['interests', 'workValues']),
};

function OnboardingResultComponetsChart({ axisName, data, title, type }) {
  const { t } = useTranslation();
  const range = type === 'interests' ? 10 : 30;
  const numberUnits = range + 1;

  const xAxisLabel = Array(numberUnits)
    .fill(null)
    .map((__, index) => {
      const getXAxis = () => (
        <span className='onboarding-chart__axis-unit-value text-xxs font-medium'>
          {t(
            index === 0
              ? 'student.onboarding.components.chartLabel.lowest'
              : 'student.onboarding.components.chartLabel.highest'
          )}
        </span>
      );
      const isFirstOrLastXAxisLabel = index === 0 || index === range;
      const xAxis = isFirstOrLastXAxisLabel ? getXAxis() : null;

      return (
        <div key={index.toString()} className='onboarding-chart__axis-unit'>
          {xAxis}
        </div>
      );
    });

  const chartBars = data.map(({ name, value }, index) => (
    <div
      key={name}
      className={`onboarding-chart__bar onboarding-chart__bar-color-${index + 1}`}
      style={{ width: `${(value / range) * 100}%` }}>
      <span className='onboarding-chart__bar-label'>{name}</span>
    </div>
  ));

  const legendItems = data.map(({ name }, index) => (
    <div key={name} className='onboarding-chart__legend-item'>
      <div
        className={`onboarding-chart__legend-item-icon onboarding-chart__bar-color-${index + 1}`}
      />
      <span className='onboarding-chart__legend-item-label'>{name}</span>
    </div>
  ));

  return (
    <div className='onboarding-chart'>
      <h3 className='onboarding-chart__title'>{title}</h3>
      <span className='onboarding-chart__axis-name'>{axisName}</span>
      <div className='onboarding-chart__chart-wrapper'>
        <div className='onboarding-chart__cartesian_grid'>{xAxisLabel}</div>
        <div className='onboarding-chart__chart-bars'>{chartBars}</div>
      </div>
      <div className='onboarding-chart__legend'>
        <h4 className='onboarding-chart__legend-title'>{t('common.chart.legend')}</h4>
        <div className='onboarding-chart__legend-items-container'>{legendItems}</div>
      </div>
    </div>
  );
}

export default memo(OnboardingResultComponetsChart);
