import { useTranslation } from 'react-i18next';

import SharedModal from '@shared/components/Modal/Modal';

type Props = {
  onClose: () => void;
  archiveSystemTag: () => void;
  hasRubricHeadings: boolean;
};

export const TagArchiveModal = ({ onClose, archiveSystemTag, hasRubricHeadings }: Props) => {
  const { t } = useTranslation();

  return (
    <SharedModal onDismiss={onClose}>
      <SharedModal.Header>
        <SharedModal.Heading>
          {t('admin.performanceIndicators.archivePerformanceIndicator')}
        </SharedModal.Heading>
      </SharedModal.Header>
      <SharedModal.Body>
        {hasRubricHeadings && (
          <p className='font-medium'>
            {t('admin.performanceIndicators.archivePerformanceIndicatorHeading')}
          </p>
        )}
        <p>{t('admin.performanceIndicators.archivePerformanceIndicatorInfo')}</p>
      </SharedModal.Body>
      <SharedModal.Footer>
        <SharedModal.Button variant='primary-outlined' onClick={onClose}>
          {t('common.actions.cancel')}
        </SharedModal.Button>
        <SharedModal.Button variant='danger' onClick={archiveSystemTag}>
          {t('common.actions.archive')}
        </SharedModal.Button>
      </SharedModal.Footer>
    </SharedModal>
  );
};
