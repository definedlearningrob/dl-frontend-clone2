import cx from 'classnames';

import '@dc/components/Onboarding/Assessment/ContentWrapper/ProgressBar/ProgressBar.sass';

type Props = {
  className?: string;
  progress: number;
};

export const ProgressBar = ({ className, progress }: Props) => {
  const classes = cx('assessment-progress-bar', className);
  const getProgressPercentage = () => progress.toFixed() + '%';

  return (
    <div className={classes}>
      <div className='assessment-progress-bar__range'>
        <div
          className='assessment-progress-bar__indicator'
          data-testid='progress-indicator'
          style={{ width: getProgressPercentage() }}
        />
      </div>
    </div>
  );
};
