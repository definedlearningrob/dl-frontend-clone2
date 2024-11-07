import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash-es';
import { useToggle } from 'react-use';

import Button from '@shared/components/Button/Button';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';

import { ActivityItem } from './ActivityItem';
import { ActivityHistoryModal } from './ActivityHistoryModal';

import type { ActivityItem as ActivityItemType } from '../types';

type Props = {
  activityHistory: ActivityItemType[];
};

export const ActivityHistory = ({ activityHistory }: Props) => {
  const { t } = useTranslation();
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });
  const [isModalOpen, toggleModalOpen] = useToggle(false);

  if (isEmpty(activityHistory)) {
    return null;
  }

  const [latestActivityItem] = activityHistory;
  const hasMoreItems = activityHistory.length > 1;

  return (
    <div className='mt-sm cursor-default'>
      <h6 className='text-xs xxxl:text-sm mb-xs xxxl:mb-x text-font-secondary'>
        {t('components.planGroup.latestActivity')}
      </h6>
      <div className='flex gap-sm items-start p-xs pl-lg xxxl:p-sm xxxl:pl-lg'>
        <ActivityItem activityItem={latestActivityItem} isLastItem={true} />
        {hasMoreItems && (
          <Button
            size={isFullHD ? 'md' : 'sm'}
            variant='primary-outlined'
            onClick={toggleModalOpen}>
            {t('components.planGroup.seeAll')}
          </Button>
        )}
      </div>
      <ActivityHistoryModal
        activityItems={activityHistory}
        isOpen={isModalOpen}
        onClose={toggleModalOpen}
      />
    </div>
  );
};
