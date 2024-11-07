import { useTranslation } from 'react-i18next';

import SharedModal from '@shared/components/Modal/Modal';
import SharedButton from '@shared/components/Button/Button';

type Props = {
  onDelete: () => void;
  onDismiss: () => void;
};

function AdminTasksPresentationBuilderSlidesListELementDeleteModal({ onDismiss, onDelete }: Props) {
  const { t } = useTranslation();

  return (
    <SharedModal isOpen={true} onDismiss={onDismiss}>
      <SharedModal.Header>
        <SharedModal.Heading>{t('admin.tasks.presentation.deleteHeader')}</SharedModal.Heading>
      </SharedModal.Header>
      <SharedModal.Body>{t('admin.tasks.presentation.deleteText')}</SharedModal.Body>
      <SharedModal.Footer>
        <SharedButton size='md' variant='primary-outlined' onClick={onDismiss}>
          {t('common.actions.cancel')}
        </SharedButton>
        <SharedButton size='md' variant='danger' onClick={onDelete}>
          {t('common.actions.delete')}
        </SharedButton>
      </SharedModal.Footer>
    </SharedModal>
  );
}

export default AdminTasksPresentationBuilderSlidesListELementDeleteModal;
