import { useTranslation } from 'react-i18next';
import { useField, useFormikContext } from 'formik';

import SharedModal from '@shared/components/Modal/Modal';
import SharedCheckbox from '@shared/components/Checkbox/Checkbox';
import Button from '@shared/components/Button/Button';

type Props = {
  onClose: () => void;
  entityName: string;
};

export const SaveTagModal = ({ onClose, entityName }: Props) => {
  const { t } = useTranslation();
  const [applyToHierarchy, _, applyToHierarchyFieldHelpers] = useField('applyToHierarchy');
  const { handleSubmit } = useFormikContext();

  return (
    <SharedModal data-testid='settings-modal' isOpen={true} onDismiss={onClose}>
      <SharedModal.Header>
        <SharedModal.Heading>
          {t('admin.performanceIndicators.savePerformanceIndicator')}
        </SharedModal.Heading>
      </SharedModal.Header>
      <SharedModal.Body>
        <p className='text-neutral-700 block text-base mb-sm'>
          {t('admin.performanceIndicators.changePerformanceIndicatorInfo', { entityName })}
        </p>
        <div className='flex flex-col gap-sm'>
          <SharedCheckbox
            checked={applyToHierarchy.value}
            label={t('admin.entities.customizeMessage.modalCheckboxLabel')}
            onChange={(event) => applyToHierarchyFieldHelpers.setValue(event.target.checked)}
          />
        </div>
      </SharedModal.Body>
      <SharedModal.Footer>
        <Button
          data-testid='save-settings-button'
          form='tagsId'
          variant='primary'
          onClick={() => handleSubmit()}>
          {t('common.actions.save')}
        </Button>
      </SharedModal.Footer>
    </SharedModal>
  );
};
