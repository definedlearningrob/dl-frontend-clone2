import cx from 'classnames';
import PropTypes from 'prop-types';

import useAssessmentStep1 from '@dc/hooks/useAssessmentStep1';

import DeprecatedTooltip from '@shared/components/DeprecatedTooltip/DeprecatedTooltip';
import { ReactComponent as ArrowLeft } from '@shared/svg/chevron_left.svg';
import { ReactComponent as ArrowRight } from '@shared/svg/chevron_right.svg';
import { IconButton } from '@shared/components/IconButton/IconButton';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';

OnboardingAssessmentStep1StudyPreference.propTypes = {
  studyPreference: PropTypes.shape({
    area: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.string,
  }),
};

function OnboardingAssessmentStep1StudyPreference({ studyPreference }) {
  const { leastDesired, mostDesired, setMostDesired, setLeastDesired } = useAssessmentStep1();

  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });

  const getPosition = () => {
    if (mostDesired?.id === studyPreference.id) {
      return 'left';
    } else if (leastDesired?.id === studyPreference.id) {
      return 'right';
    }

    return 'center';
  };

  // Trick to reset tooltip when position of preference changes
  const resetTooltip = () => {
    const scroll = new Event('scroll');
    document.dispatchEvent(scroll);
  };

  const clearMostDesired = () => {
    resetTooltip();
    setMostDesired(null);
  };

  const clearLeastDesired = () => {
    resetTooltip();
    setLeastDesired(null);
  };

  const assignMostDesired = () => {
    resetTooltip();
    setMostDesired(studyPreference);
  };

  const assignLeastDesired = () => {
    resetTooltip();
    setLeastDesired(studyPreference);
  };

  const position = getPosition();

  const tooltipClasses = cx(
    {
      [`-${position}`]: position,
    },
    'assessment__step1__tooltip'
  );

  const contentClasses = cx('assessment__step1__list-item-content', {
    '-disabled': leastDesired && mostDesired,
  });

  const iconButtonClassName = '!bg-neutral-200 hover:!bg-neutral-300';

  const renderPositiondItem = () => {
    if (position === 'left') {
      return (
        <DeprecatedTooltip className={tooltipClasses} message={studyPreference.description}>
          <li className='assessment__step1__list-item'>
            <div className='assessment__step1__list-item-content'>
              <div className='assessment__step1__list-item-icon-placeholder' />
              <span className={`assessment__step1__preference-name -${position}`}>
                {studyPreference.area}
              </span>
              <IconButton
                Icon={ArrowRight}
                className={iconButtonClassName}
                size={isFullHD ? 'lg' : 'md'}
                onClick={clearMostDesired}
              />
            </div>
          </li>
        </DeprecatedTooltip>
      );
    }
    if (position === 'center') {
      return (
        <DeprecatedTooltip className={tooltipClasses} message={studyPreference.description}>
          <li className='assessment__step1__list-item'>
            <div className={contentClasses}>
              {mostDesired ? (
                <div className='assessment__step1__list-item-icon-placeholder' />
              ) : (
                <IconButton
                  Icon={ArrowLeft}
                  className={iconButtonClassName}
                  data-testid='icon-button-left'
                  size={isFullHD ? 'lg' : 'md'}
                  onClick={assignMostDesired}
                />
              )}
              <span className={`assessment__step1__preference-name -${position}`}>
                {studyPreference.area}
              </span>
              {leastDesired ? (
                <div className='assessment__step1__list-item-icon-placeholder' />
              ) : (
                <IconButton
                  Icon={ArrowRight}
                  className={iconButtonClassName}
                  data-testid='icon-button-right'
                  size={isFullHD ? 'lg' : 'md'}
                  onClick={assignLeastDesired}
                />
              )}
            </div>
          </li>
        </DeprecatedTooltip>
      );
    }
    if (position === 'right') {
      return (
        <DeprecatedTooltip className={tooltipClasses} message={studyPreference.description}>
          <li className='assessment__step1__list-item'>
            <div className='assessment__step1__list-item-content'>
              <IconButton
                Icon={ArrowLeft}
                className={iconButtonClassName}
                size={isFullHD ? 'lg' : 'md'}
                onClick={clearLeastDesired}
              />
              <span className={`assessment__step1__preference-name -${position}`}>
                {studyPreference.area}
              </span>
              <div className='assessment__step1__list-item-icon-placeholder' />
            </div>
          </li>
        </DeprecatedTooltip>
      );
    }
  };

  return renderPositiondItem();
}

export default OnboardingAssessmentStep1StudyPreference;
