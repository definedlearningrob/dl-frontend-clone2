import { useTranslation } from 'react-i18next';

import SharedModal from '@shared/components/Modal/Modal';
import SharedButton from '@shared/components/Button/Button';
import { callToast } from '@shared/components/Toaster/Toaster';
import { useRubricEditor } from '@shared/components/RubricsEditor/RubricsEditorProvider';
import { RubricEdit } from '@shared/components/RubricsEditor/utils/types';

type Props = {
  onClose: () => void;
  toDelete: {
    id: string;
    type: 'row' | 'column';
  };
};

export const DeleteRubricItemModal = ({ onClose, toDelete }: Props) => {
  const { t } = useTranslation();

  const isColumnDeleting = toDelete.type === 'column';

  const {
    editing: {
      criteriaLabel: { handleDelete: deleteColumn },
      heading: { handleDelete: deleteRow },
    },
  } = useRubricEditor<RubricEdit>();

  const handleDelete = async () => {
    const deleteFunction = isColumnDeleting ? deleteColumn : deleteRow;

    await deleteFunction(toDelete.id);

    const toast = isColumnDeleting
      ? t('components.rubric.columnDeletedSuccessfully')
      : t('components.rubric.rowDeletedSuccessfully');

    callToast('success', toast);
    onClose();
  };

  const heading = isColumnDeleting
    ? t('components.rubric.deleteColumn')
    : t('components.rubric.deleteRow');

  const body = isColumnDeleting
    ? t('components.rubric.deleteRubricColumnConfirmation')
    : t('components.rubric.deleteRubricRowConfirmation');

  return (
    <SharedModal ariaLabel={heading} isOpen={true} onDismiss={onClose}>
      <SharedModal.Header>
        <SharedModal.Heading className='text-neutral-800 text-bold leading-sm'>
          {heading}
        </SharedModal.Heading>
      </SharedModal.Header>
      <SharedModal.Body className='text-regular'>{body}</SharedModal.Body>
      <SharedModal.Footer>
        <SharedButton className='min-w-[120px]' variant='primary-outlined' onClick={onClose}>
          {t('common.actions.cancel')}
        </SharedButton>
        <SharedButton className='min-w-[120px]' variant='danger' onClick={handleDelete}>
          {t('common.actions.delete')}
        </SharedButton>
      </SharedModal.Footer>
    </SharedModal>
  );
};
