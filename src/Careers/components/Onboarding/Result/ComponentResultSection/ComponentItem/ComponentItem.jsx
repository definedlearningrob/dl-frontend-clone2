import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import SharedButton from '@shared/components/Button/Button';

OnboardingResultComponentResultComponentItem.propTypes = {
  image: PropTypes.node,
  link: PropTypes.string,
  name: PropTypes.string,
};

function OnboardingResultComponentResultComponentItem({ image, link, name }) {
  const { t } = useTranslation();

  return (
    <div className='assessment-result-component-item'>
      {image}
      <h3 className='assessment-result-component-item__name'>{name}</h3>
      <Link className='assessment-result-component-item__link-button-wrapper' to={link}>
        <SharedButton
          className='assessment-result-component-item__link-button'
          variant='primary-outlined'>
          {t('student.onboarding.assessment.result.showResults')}
        </SharedButton>
      </Link>
    </div>
  );
}

export default OnboardingResultComponentResultComponentItem;
