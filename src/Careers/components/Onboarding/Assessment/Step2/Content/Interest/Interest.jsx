import cx from 'classnames';
import PropTypes from 'prop-types';

import useAssessmentStep2 from '@dc/hooks/useAssessmentStep2';
import { ReactComponent as CheckedIcon } from '@dc/svg/accept.svg';
import { ReactComponent as UnCheckedIcon } from '@dc/svg/square_outlined.svg';

import SharedIcon from '@shared/components/Icon/Icon';

OnboardingAssessmentStep2ContentInterest.propTypes = {
  interest: PropTypes.shape({
    activity: PropTypes.string,
    id: PropTypes.string,
  }),
};

function OnboardingAssessmentStep2ContentInterest({ interest }) {
  const { checkedAnswersIds, toggleAnswerCheck } = useAssessmentStep2();

  const isChecked = checkedAnswersIds.includes(interest.id);

  const classes = cx('assessment__step2__list-item', {
    '-checked': isChecked,
  });

  const toggleChecked = () => toggleAnswerCheck(interest.id);
  const icon = isChecked ? <CheckedIcon /> : <UnCheckedIcon />;

  return (
    <li className={classes} onClick={toggleChecked}>
      <SharedIcon icon={icon} size='sm' />
      <span className='assessment__step2__list-item-text'>{interest.activity}</span>
    </li>
  );
}

export default OnboardingAssessmentStep2ContentInterest;
