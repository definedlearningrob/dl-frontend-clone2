import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useFormikContext } from 'formik';

import SharedModal from '@shared/components/Modal/Modal';
import Checkbox from '@shared/components/Checkbox/Checkbox';

export const AssignCatalogModal = ({ entity, toggleModal }) => {
  const node = useRef();
  const { t } = useTranslation();
  const { values, setFieldValue, submitForm } = useFormikContext();

  const toggleCheck = ({ target: { checked } }) => {
    setFieldValue('applyToHierarchy', checked);
  };

  useEffect(() => {
    setFieldValue('applyToHierarchy', false);
  }, []);
  const submitCatalogForm = () => {
    submitForm();
    toggleModal();
  };

  return (
    <SharedModal isOpen={true} onDismiss={toggleModal}>
      <SharedModal.Header>
        <SharedModal.Heading>{t('user.entity.catalogs.assign')}</SharedModal.Heading>
      </SharedModal.Header>
      <SharedModal.Body>
        <div ref={node} className='assign-plan-modal' data-testid='assign-catalog-modal'>
          <div className='messages-left-panel__modal__context__announcements'>
            <div className='messages-left-panel__modal__context-titles__announcements'>
              <label htmlFor='entity-name'>{t('user.entity.catalogs.assignToLabel')}</label>
              <span id='entity-name'>{entity.name}</span>
            </div>
            <Checkbox
              checked={values.applyToHierarchy}
              data-testid='assign-catalog-checkbox'
              label={t('user.entity.catalogs.assignToChildren')}
              name='assignToHierarchy'
              onChange={toggleCheck}
            />
          </div>
        </div>
      </SharedModal.Body>
      <SharedModal.Footer>
        <SharedModal.Button
          data-testid='assign-modal-button'
          type='submit'
          variant='primary'
          onClick={submitCatalogForm}>
          {t('common.actions.assign')}
        </SharedModal.Button>
      </SharedModal.Footer>
    </SharedModal>
  );
};

AssignCatalogModal.propTypes = {
  entity: PropTypes.shape({
    catalogs: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
      })
    ),
    name: PropTypes.string,
    uuid: PropTypes.string,
  }),
  showModal: PropTypes.bool,
  toggleModal: PropTypes.func,
};
