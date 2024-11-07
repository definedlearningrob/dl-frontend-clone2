import { useTranslation } from 'react-i18next';

import { cx } from '@shared/utils/cx';
import { Tooltip } from '@shared/components/Tooltip';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { ReactComponent as ReportIcon } from '@shared/svg/report.svg';
import { ReactComponent as CheckIcon } from '@shared/svg/checkmark.svg';
import { ReactComponent as ClearIcon } from '@shared/svg/close.svg';

type Props = {
  onClick: () => void;
  isCompleted: boolean;
  isError?: boolean;
};

export const MinimizedProgress = ({ onClick, isCompleted, isError }: Props) => {
  const { t } = useTranslation();

  const circleSliceCommonClassnames =
    'absolute w-[23px] h-[23px] animate-highlight border-2 border-neutral-300';

  const statusIconClassName = cx('text-white rounded-full absolute top-x right-xs', {
    'bg-success-500': isCompleted,
    'bg-danger-500': isError,
  });

  const isLoading = !isCompleted && !isError;

  return (
    <div
      className='bg-white shadow-400 cursor-pointer rounded-full fixed bottom-base xxxl:bottom-md right-base xxxl:right-md z-highest'
      onClick={onClick}>
      <Tooltip message={t('common.actions.maximize')}>
        <div className='w-[56px] h-[56px] flex items-center justify-center relative'>
          {isLoading && (
            <>
              <div
                className={cx(
                  circleSliceCommonClassnames,
                  'top-xxs left-xxs rounded-l-full rounded-t-full !rounded-r-none !rounded-b-none border-b-0 border-r-0'
                )}
              />
              <div
                className={cx(
                  circleSliceCommonClassnames,
                  'top-xxs right-xxs rounded-r-full rounded-t-full !rounded-l-none animation-delay-[450ms] !rounded-b-none border-b-0 border-l-0'
                )}
              />
              <div
                className={cx(
                  circleSliceCommonClassnames,
                  'bottom-xxs right-xxs rounded-r-full rounded-b-full !rounded-l-none animation-delay-[900ms] !rounded-t-none border-t-0 border-l-0'
                )}
              />
              <div
                className={cx(
                  circleSliceCommonClassnames,
                  'bottom-xxs left-xxs rounded-l-full rounded-b-full animation-delay-[1250ms] !rounded-r-none rounded-t-none border-t-0 border-r-0'
                )}
              />
            </>
          )}
          {!isLoading && (
            <IconContainer
              Icon={isCompleted ? CheckIcon : ClearIcon}
              className={statusIconClassName}
              paddingSize='none'
              size='sm'
            />
          )}
          <IconContainer Icon={ReportIcon} className='text-neutral-300' />
        </div>
      </Tooltip>
    </div>
  );
};
