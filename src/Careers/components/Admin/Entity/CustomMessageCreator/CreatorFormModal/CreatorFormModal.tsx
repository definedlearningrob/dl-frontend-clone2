import React from 'react';
import { useTranslation } from 'react-i18next';
import { useField, useFormikContext } from 'formik';

import { TEntity } from '@dc/graphql/user/queries/entity';

import SharedModal from '@shared/components/Modal/Modal';
import SharedCheckbox from '@shared/components/Checkbox/Checkbox';

import styles from '../BrandingFormForm.module.sass';
type Props = {
  entityDetails: TEntity;
  onCloseModal: () => void;
};

export const CreatorFormModal = ({ entityDetails, onCloseModal }: Props) => {
  const { name } = entityDetails;
  const formik = useFormikContext();

  const [applyToHierarchy, _, applyToHierarchyFieldHelpers] = useField('applyToHierarchy');

  const { t } = useTranslation();

  const handleSubmit = async () => {
    await formik.submitForm();

    applyToHierarchyFieldHelpers.setValue(false);
  };

  return (
    <SharedModal className='!pb-base xxxl:!pb-md' isOpen={true} onDismiss={onCloseModal}>
      <SharedModal.Header className='!px-base !pt-base xxxl:!px-md xxxl:!pt-md'>
        <div>
          <div className='flex flex-col items-stretch'>
            <h4 className='text-base leading-md font-bold'>
              {t('admin.entities.customizeMessage.modalTitle', { entityName: name })}
            </h4>
          </div>
        </div>
      </SharedModal.Header>
      <SharedModal.Body className='!px-base xxxl:!px-md'>
        <div className='pb-base'>
          <h5 className='text-base leading-base font-bold text-neutral-800'>
            {t('admin.entities.customizeMessage.modalBrand')}
          </h5>
          <SharedCheckbox
            checked={applyToHierarchy.value}
            label={t('admin.entities.customizeMessage.modalCheckboxLabel')}
            onChange={(event) => applyToHierarchyFieldHelpers.setValue(event.target.checked)}
          />
        </div>
      </SharedModal.Body>
      <SharedModal.Footer className='!px-base xxxl:!px-md'>
        <SharedModal.Button
          className={styles.button}
          size='md'
          variant='primary-outlined'
          onClick={onCloseModal}>
          {t('common.actions.cancel')}
        </SharedModal.Button>
        <SharedModal.Button
          className={styles.button}
          size='md'
          type='submit'
          variant='primary'
          onClick={handleSubmit}>
          {t('common.actions.save')}
        </SharedModal.Button>
      </SharedModal.Footer>
    </SharedModal>
  );
};
