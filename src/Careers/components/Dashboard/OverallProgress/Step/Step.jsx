import cx from 'classnames';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { ReactComponent as DoneIcon } from '@shared/svg/done.svg';
import Icon from '@shared/components/Icon/Icon';

DashboardOverallProgressStep.propTypes = {
  name: PropTypes.string,
  number: PropTypes.number,
  status: PropTypes.oneOf(['active', 'incomplete', 'done']),
  title: PropTypes.string,
};

function DashboardOverallProgressStep({ name, number, status }) {
  const { t } = useTranslation();
  const stepId = `step-${number}`;

  const classes = cx('overall-progress__step', `-${status}`);

  const statusText = {
    active: t('dashboard.overallProgress.step.active'),
    incomplete: t('dashboard.overallProgress.step.incomplete'),
    done: t('dashboard.overallProgress.step.done'),
  }[status];

  return (
    <div className={classes} data-testid={stepId}>
      <div className='overall-progress__step-label'>
        {status === 'done' ? <Icon icon={<DoneIcon />} size='sm' /> : number}
      </div>
      <div className='overall-progress__step-text'>
        <h4 className='overall-progress__step-title'>{name}</h4>
        <p className='overall-progress__step-status'>{statusText}</p>
      </div>
    </div>
  );
}

export default DashboardOverallProgressStep;
