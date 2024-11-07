import { useTranslation } from 'react-i18next';
import { ReactNode } from 'react';

import SharedModal from '@shared/components/Modal/Modal';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  children: ReactNode;
  isLoading?: boolean;
  actionLabel?: 'confirm' | 'archive';
};

export const ConfirmationModal = ({
  isOpen,
  onClose,
  title,
  onConfirm,
  children,
  isLoading,
  actionLabel = 'confirm',
}: Props) => {
  const { t } = useTranslation();

  return (
    <SharedModal ariaLabel={title || 'Modal'} isOpen={isOpen} onDismiss={onClose}>
      <SharedModal.Header>
        <SharedModal.Heading>
          {title || t('common.actions.archiveConfirmation')}
        </SharedModal.Heading>
      </SharedModal.Header>
      <SharedModal.Body>{children}</SharedModal.Body>
      <SharedModal.Footer>
        <SharedModal.Button type='button' variant='primary-outlined' onClick={onClose}>
          {t('common.actions.cancel')}
        </SharedModal.Button>
        <SharedModal.Button
          isLoading={isLoading}
          type='button'
          variant='danger'
          onClick={onConfirm}>
          {t(`common.actions.${actionLabel}`)}
        </SharedModal.Button>
      </SharedModal.Footer>
    </SharedModal>
  );
};
