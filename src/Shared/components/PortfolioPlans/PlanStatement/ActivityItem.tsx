import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash-es';

import SharedAvatar from '@shared/components/Avatar/Avatar';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { Tooltip } from '@shared/components/Tooltip';
import { formatDateTime, parseDate } from '@shared/utils/date';
import { usePlanStatusOptions } from '@shared/hooks/usePlanStatusOptions';
import { cx } from '@shared/utils/cx';
import { StatementStatusBadge } from '@shared/components/StatementStatusBadge';

import type { ActivityItem as ActivityItemType } from '../types';

type Props = {
  isLastItem: boolean;
  activityItem: ActivityItemType;
  className?: string;
};

export const ActivityItem = ({ activityItem, isLastItem, className }: Props) => {
  const { t } = useTranslation();
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });
  const { getOption } = usePlanStatusOptions();

  const { author, result, createdAt, body } = activityItem;

  return (
    <div className={cx('bg-white flex-1', className)}>
      <div className='flex gap-sm'>
        <div className='flex flex-col gap-xs pt-xxs'>
          <SharedAvatar
            className='rounded-full border border-solid border-neutral-300 w-fit'
            size={isFullHD ? '40' : '32'}
            user={author}
          />
          {!isLastItem && (
            <div className='w-xxxs bg-neutral-300 rounded-sm flex-1 m-auto min-h-[8px]' />
          )}
        </div>
        <div
          className={cx('self-center text-xs xxxl:text-sm py-xs', {
            'pt-xxs': isEmpty(body),
          })}>
          <div className='flex gap-xs items-center'>
            <span className='font-medium leading-lg text-primary-500'>{`${author.firstName} ${author.lastName}`}</span>
            {result && (
              <div className='flex items-center gap-xs'>
                {t('components.planGroup.changedTo')}
                <StatementStatusBadge {...getOption(result)!} />
              </div>
            )}
            <Tooltip
              className='text-font-secondary'
              message={formatDateTime(createdAt, { withTime: true })}>
              {parseDate(createdAt)}
            </Tooltip>
          </div>
          {body && <p className='mb-0 py-xs'>{body}</p>}
        </div>
      </div>
    </div>
  );
};
