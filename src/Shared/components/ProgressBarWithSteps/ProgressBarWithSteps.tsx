import cx from 'classnames';

import styles from './ProgressBarWithSteps.module.sass';

type Props = {
  totalSteps: number;
  currentStep: number;
  minSteps?: number;
  className?: string;
};

export const ProgressBarWithSteps = ({
  currentStep,
  minSteps = 0,
  totalSteps,
  className,
}: Props) => {
  const stepsWrapperClassName = cx(styles.stepsWrapper, className);

  const steps = Array.from({ length: totalSteps }, (element, index) => {
    const stepClassName = cx(styles.step, {
      [styles.required]: minSteps > index,
      [styles.completed]: currentStep > index,
    });

    return (
      <div key={`step-${index}`} className={stepClassName} data-testid={`progress-step-${index}`} />
    );
  });

  return (
    <div
      aria-valuemax={totalSteps}
      aria-valuemin={minSteps}
      aria-valuenow={currentStep}
      className={stepsWrapperClassName}
      role='progressbar'>
      {steps}
    </div>
  );
};
