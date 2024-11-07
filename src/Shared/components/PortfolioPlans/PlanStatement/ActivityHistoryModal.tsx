import { useTranslation } from 'react-i18next';

import SharedModal from '@shared/components/Modal/Modal';

import { ActivityItem as ActivityItemType } from '../types';

import { ActivityItem } from './ActivityItem';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  activityItems: ActivityItemType[];
};

export const ActivityHistoryModal = ({ isOpen, onClose, activityItems }: Props) => {
  const { t } = useTranslation();

  if (!isOpen) {
    return null;
  }

  const activityItemsCount = activityItems.length;

  return (
    <SharedModal isOpen={isOpen} onDismiss={onClose}>
      <SharedModal.Header>
        <SharedModal.Heading className='!text-base'>
          {t('components.planGroup.activityThread')}
          <span className='text-neutral-600'> ({activityItemsCount})</span>
        </SharedModal.Heading>
      </SharedModal.Header>
      <SharedModal.Body className='scrollbar'>
        {activityItems.map((activityItem, index) => (
          <ActivityItem
            activityItem={activityItem}
            className='py-xs px-sm'
            isLastItem={index === activityItemsCount - 1}
          />
        ))}
      </SharedModal.Body>
      <SharedModal.Footer>
        <SharedModal.Button variant='primary' onClick={onClose}>
          {t('common.actions.close')}
        </SharedModal.Button>
      </SharedModal.Footer>
    </SharedModal>
  );
};
