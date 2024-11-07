import cx from 'classnames';
import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { ReactComponent as Selected } from '@shared/svg/done.svg';
import { ReactComponent as ArrowIcon } from '@shared/svg/arrow_forward.svg';
import Icon from '@shared/components/Icon/Icon';

const pathwayShape = PropTypes.shape({
  cluster: PropTypes.shape({
    name: PropTypes.string,
  }),
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string,
      id: PropTypes.string,
      imageUrl: PropTypes.string,
      name: PropTypes.string,
    })
  ),
  description: PropTypes.string,
  id: PropTypes.string,
  imageUrl: PropTypes.string,
  name: PropTypes.string,
});

OnboardingResultPathwayCard.propTypes = {
  pathway: pathwayShape,
  selectedPathway: pathwayShape,
  setSelectedPathway: PropTypes.func,
};

function OnboardingResultPathwayCard({ pathway, selectedPathway, setSelectedPathway }) {
  const selectPathway = () => setSelectedPathway(pathway);
  const { t } = useTranslation();
  const isSelected = pathway.id === selectedPathway?.id;
  const imageContainer = useRef(null);

  const classes = cx('pathway-card', {
    '-selected': isSelected,
  });

  useEffect(() => {
    imageContainer.current.style.backgroundImage = `url(${pathway.imageUrl})`;
  });

  return (
    <div className={classes} data-testid='pathway-card' onClick={selectPathway}>
      <div className='pathway-card__selected-label'>
        <Selected />
      </div>
      <div ref={imageContainer} className='pathway-card__photo-container' />
      <div className='pathway-card__content'>
        <h2 className='pathway-card__title'>{pathway.name}</h2>
        <span className='pathway-card__cluster-info'>
          {t('student.onboarding.pathway.clusterInfo', {
            cluster: pathway.cluster.name,
          })}
        </span>
        <div className='pathway-card__select-button'>
          {t('student.onboarding.pathway.select')}
          <Icon className='course-card__icon -button' icon={<ArrowIcon />} size='sm' />
        </div>
      </div>
    </div>
  );
}

export default OnboardingResultPathwayCard;
