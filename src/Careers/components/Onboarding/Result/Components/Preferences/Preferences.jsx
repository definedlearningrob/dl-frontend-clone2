import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

OnboardingResultComponentsPreferences.propTypes = {
  studyPreferencesResult: PropTypes.arrayOf(
    PropTypes.shape({
      area: PropTypes.string,
      description: PropTypes.string,
      position: PropTypes.number,
    })
  ),
};

function OnboardingResultComponentsPreferences({ studyPreferencesResult }) {
  const { t } = useTranslation();

  const tableItems = studyPreferencesResult
    .slice()
    .sort((a, b) => a.position - b.position)
    .map(({ area, description, position }) => (
      <div key={area} className='onboarding-components-study-preferences__table-row'>
        <div className='onboarding-components-study-preferences__rank-cell'>
          <h4 className='onboarding-components-study-preferences__table-heading'>{position}</h4>
        </div>
        <div className='onboarding-components-study-preferences__area-cell'>
          <p key={area} className='onboarding-components-study-preferences__area-item'>
            <span className='onboarding-components-study-preferences__area-item-title'>
              {t(
                `student.onboarding.components.studyPreferences.table.${area
                  .toLowerCase()
                  .replace(/\s/g, '')}.title`
              )}
            </span>
            {description}
          </p>
        </div>
      </div>
    ));

  return (
    <div className='onboarding-components-study-preferences'>
      <h2 className='onboarding-components-study-preferences__title'>
        {t('student.onboarding.components.studyPreferences.heading')}
      </h2>
      <p className='onboarding-components-study-preferences__description'>
        {t('student.onboarding.components.studyPreferences.headerTextFirst')}
      </p>
      <p className='onboarding-components-study-preferences__description'>
        {t('student.onboarding.components.studyPreferences.headerTextSecond')}
      </p>
      <div className='onboarding-components-study-preferences__table'>
        <div className='onboarding-components-study-preferences__table-row -table-header'>
          <div className='onboarding-components-study-preferences__rank-cell'>
            <h4 className='onboarding-components-study-preferences__table-heading'>
              {t('student.onboarding.components.studyPreferences.table.rankHeading')}
            </h4>
          </div>
          <div className='onboarding-components-study-preferences__area-cell'>
            <h4 className='onboarding-components-study-preferences__table-heading'>
              {t('student.onboarding.components.studyPreferences.table.areasOfStudyHeading')}
            </h4>
          </div>
        </div>
        {tableItems}
      </div>
    </div>
  );
}

export default OnboardingResultComponentsPreferences;
