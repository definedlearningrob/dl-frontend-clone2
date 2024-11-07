import React from 'react';
import { useTranslation } from 'react-i18next';

import SharedModal from '@shared/components/Modal/Modal';

type Props = {
  isOpen: boolean;
  onClose: React.MouseEventHandler<HTMLButtonElement>;
  internshipName: string;
  onAction: () => void;
};

export const VirtualInternshipUnenrollModal = ({
  onClose,
  onAction,
  isOpen,
  internshipName,
}: Props) => {
  const { t } = useTranslation();

  return (
    <SharedModal isOpen={isOpen} onDismiss={onClose}>
      <SharedModal.Header>
        <SharedModal.Heading>{t('virtualInternship.unenrollModal.heading')}</SharedModal.Heading>
      </SharedModal.Header>
      <SharedModal.Body>
        <p>{t('virtualInternship.unenrollModal.description', { internshipName })}</p>
      </SharedModal.Body>
      <SharedModal.Footer>
        <SharedModal.Button size='md' variant='primary-outlined' onClick={onClose}>
          {t('virtualInternship.unenrollModal.cancel')}
        </SharedModal.Button>
        <SharedModal.Button size='md' variant='primary' onClick={onAction}>
          {t('virtualInternship.unenrollModal.unenroll')}
        </SharedModal.Button>
      </SharedModal.Footer>
    </SharedModal>
  );
};
