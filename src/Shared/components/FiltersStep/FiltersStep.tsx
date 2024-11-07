import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { ReactComponent as CheckmarkIcon } from '@shared/svg/checkmark.svg';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { cx } from '@shared/utils/cx';

type Props = {
  step: number;
  activeStep: number;
  separatorLineHeight?: number;
  isCompleted: boolean;
};

export const FiltersStep = ({ step, activeStep, separatorLineHeight = 0, isCompleted }: Props) => {
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });

  const isActive = step === activeStep;

  const stepClasses = cx(
    'p-xs rounded-sm font-medium text-sm xxxl:text-base bg-neutral-200 text-font-secondary xxxl:p-x',
    {
      'bg-secondary-500 text-white': isActive,
      'bg-success-500 text-white': isCompleted,
    }
  );

  const lineClasses = cx('w-xxxs bg-neutral-300 rounded-sm flex-1 m-auto my-xs', {
    'bg-secondary-500': isActive,
    'bg-success-500': isCompleted,
  });

  return (
    <>
      <div className={stepClasses}>
        {isCompleted && (
          <IconContainer Icon={CheckmarkIcon} paddingSize='none' size={isFullHD ? 'md' : 'base'} />
        )}
        {!isCompleted && (
          <div className='flex items-center justify-center w-base h-base leading-sm xxxl:w-md xxxl:h-md'>
            {step}
          </div>
        )}
      </div>
      {!!separatorLineHeight && (
        <div className={lineClasses} style={{ height: `${separatorLineHeight}px` }} />
      )}
    </>
  );
};
