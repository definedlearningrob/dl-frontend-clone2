import cx from 'classnames';

import { ReactComponent as NotStartedIcon } from '@shared/svg/not_started.svg';
import { ReactComponent as InProgressIcon } from '@shared/svg/in_progress.svg';
import { ReactComponent as CompletedIcon } from '@shared/svg/checkmark_circle_outlined.svg';
import { ReactComponent as NotMetIcon } from '@shared/svg/clear_circle_outlined.svg';
import { ReactComponent as StudentIcon } from '@shared/svg/student.svg';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';

export type Status = 'notStarted' | 'inProgress' | 'completed' | 'notMet';

type Props = {
  status: Status;
  studentsCount: number;
  total: number;
};

const statusIconMap = {
  notStarted: {
    Icon: NotStartedIcon,
    className: 'text-neutral-500',
  },
  inProgress: {
    Icon: InProgressIcon,
    className: 'text-secondary-500',
  },
  completed: {
    Icon: CompletedIcon,
    className: 'text-success-500',
  },
  notMet: {
    Icon: NotMetIcon,
    className: 'text-danger-500',
  },
} as const;

export const PlanGroupLegendItem = ({ status, studentsCount, total }: Props) => {
  const { Icon, className } = statusIconMap[status];

  const percentage = total ? Math.round((studentsCount / total) * 100) : 0;

  return (
    <div className='flex items-center gap-xxs text-xxs xxxl:text-xs'>
      <IconContainer
        Icon={Icon}
        className={cx('rounded-xs border border-neutral-300', className)}
        paddingSize='xxs'
        size='sm'
      />
      <span className='font-medium'>{percentage}%</span>
      <span className='flex items-center text-font-secondary leading-sm'>
        (<IconContainer Icon={StudentIcon} className='mr-xxxs' paddingSize='none' size='x' />
        {studentsCount})
      </span>
    </div>
  );
};
