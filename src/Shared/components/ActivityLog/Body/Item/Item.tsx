import cx from 'classnames';
import { FC, SVGProps } from 'react';
import { useTranslation } from 'react-i18next';

import { ACTIVITY_TYPE } from '@shared/resources/enums';
import { ReactComponent as CheckInIcon } from '@shared/svg/test-list-search.svg';
import { ReactComponent as CheckmarkItemIcon } from '@shared/svg/item-checkmark.svg';
import { ReactComponent as TaskGraduateIcon } from '@shared/svg/list-task-graduate-hat.svg';
import { ReactComponent as SendIcon } from '@shared/svg/send_outlined.svg';
import { formatDateTime, parseDate } from '@shared/utils/date/date';
import { Tooltip } from '@shared/components/Tooltip';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';

type TActivityConfig = {
  [key in ACTIVITY_TYPE]: {
    className: string;
    extendedActivity?: boolean;
    Icon: FC<SVGProps<SVGSVGElement>>;
  };
};

const activityConfig: TActivityConfig = {
  COURSE_ENROLLMENT: {
    className: 'bg-primary-200 text-primary-500',
    extendedActivity: true,
    Icon: TaskGraduateIcon,
  },
  COURSE_ASSIGNMENT: {
    className: 'bg-primary-200 text-primary-500',
    extendedActivity: true,
    Icon: TaskGraduateIcon,
  },
  ASSIGNMENT_SUBMISSION: {
    className: 'bg-secondary-200 text-secondary-500',
    Icon: CheckmarkItemIcon,
  },
  CHECK_IN_QUESTION_ANSWER: {
    className: 'bg-warning-100 text-warning-500',
    Icon: CheckInIcon,
  },
  CHECK_IN_QUESTION_ANSWER_SUBMITTED: {
    className: 'bg-warning-100 text-warning-500',
    Icon: CheckInIcon,
  },
  PRODUCT_SUBMISSION: {
    className: 'bg-primary-200 text-primary-500',
    Icon: CheckmarkItemIcon,
  },
  PRODUCT_SUBMISSION_SUBMITTED: {
    className: 'bg-primary-200 text-primary-500',
    Icon: CheckmarkItemIcon,
  },
  STUDENT_ADDED: {
    className: 'bg-primary-200 text-primary-500',
    Icon: TaskGraduateIcon,
  },
  STUDENT_REMOVED: {
    className: 'bg-warning-100 text-warning-500',
    Icon: CheckmarkItemIcon,
  },
  USER_ADDED: {
    className: 'bg-secondary-200 text-secondary-500',
    Icon: CheckInIcon,
  },
  USER_REMOVED: {
    className: 'bg-primary-200 text-primary-500',
    Icon: TaskGraduateIcon,
  },
  LAST_APPLICATION: {
    className: 'bg-primary-200 text-primary-500',
    Icon: SendIcon,
  },
};

export type TActivityItem = {
  cursor: string;
  node: {
    context: {
      id: string;
      name: string;
      action?: () => void;
    } | null;
    updatedAt: string;
    type: ACTIVITY_TYPE;
    target: {
      name: string;
      id?: string;
      teamName?: string;
      action?: () => void;
    };
    subject: {
      name: string;
      id?: string;
      action?: () => void;
    };
  };
};

type TActivityListItemProps = TActivityItem['node'];

const ActivityListItem = ({
  context,
  updatedAt,
  subject,
  target,
  type,
}: TActivityListItemProps) => {
  const { t } = useTranslation();
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });

  const properConfig = activityConfig[type];

  if (!properConfig) {
    return null;
  }

  const activityText = t(`user.dashboard.activityLog.${type}`) || '';
  const iconWrapperClasses = cx('rounded-sm', properConfig.className);
  const Icon = properConfig.Icon;
  const isTargetActionable = target.id && target.action;
  const targetActionProps = {
    ...(isTargetActionable && { onClick: target.action, role: 'link' }),
  };
  const targetClasses = cx({
    'cursor-pointer text-primary-500': isTargetActionable,
  });

  const isSubjectActionable = subject.id && subject.action;
  const subjectActionProps = {
    ...(isSubjectActionable && { onClick: subject.action, role: 'button' }),
  };
  const subjectClasses = cx('text-primary-500 leading-lg hover:text-font-primary', {
    'cursor-pointer': isSubjectActionable,
  });

  return (
    <li
      className='flex items-center text-xxs xxxl:text-xs gap-xs xxxl:gap-sm group'
      data-testid='activity-log-item'>
      <IconContainer
        Icon={Icon}
        className={iconWrapperClasses}
        paddingSize='xs'
        size={isFullHD ? 'base' : 'sm'}
      />
      <div className='flex content-between basis-full py-x xxxl:py-sm border-b-neutral-300 border-b group-last:border-0'>
        <div className='mr-xs'>
          <span className={targetClasses} {...targetActionProps}>
            {target.name}{' '}
          </span>
          <span className='text-font-secondary'>{activityText}</span>
          <span className={subjectClasses} {...subjectActionProps}>
            {subject.name}
          </span>
          {'teamName' in target && (
            <>
              <span>{t('user.dashboard.activityLog.teamContext')}</span>
              <span>{target.teamName}</span>
            </>
          )}
          {properConfig.extendedActivity && (
            <span className='text-font-secondary'>
              {t(`user.dashboard.activityLog.extendedActivity.${type}`)}
            </span>
          )}
          {context && (
            <>
              <span className='mx-xxs'>{t('user.dashboard.activityLog.by')}</span>
              <span>{context.name}</span>
            </>
          )}
        </div>
        <div className='text-font-secondary text-xxs xxxl:text-xs text-right whitespace-nowrap ml-auto'>
          <Tooltip message={formatDateTime(updatedAt, { withTime: true })} side='bottom'>
            {parseDate(updatedAt)}
          </Tooltip>
        </div>
      </div>
    </li>
  );
};

export default ActivityListItem;
