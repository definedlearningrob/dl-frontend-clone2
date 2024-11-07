import { useRef } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useFormikContext } from 'formik';

import SharedModal from '@shared/components/Modal/Modal';
import Checkbox from '@shared/components/Checkbox/Checkbox';

export const AssignPlanModal = ({ entity, toggleModal }) => {
  const node = useRef();
  const { t } = useTranslation();
  const { values, setFieldValue, submitForm } = useFormikContext();

  const toggleApplyToHierarchy = ({ target: { checked } }) => {
    setFieldValue('applyToHierarchy', checked);
  };

  const submitPlanForm = () => {
    submitForm();
    toggleModal();
  };

  return (
    <SharedModal isOpen={true} onDismiss={toggleModal}>
      <SharedModal.Header>
        <SharedModal.Heading>{t('user.entity.plans.assign')}</SharedModal.Heading>
      </SharedModal.Header>
      <SharedModal.Body>
        <div ref={node} className='assign-plan-modal' data-testid='assign-plan-modal'>
          <div className='messages-left-panel__modal__context__announcements'>
            <div className='messages-left-panel__modal__context-titles__announcements'>
              <label htmlFor='entity-name'>{t('user.entity.plans.assignToLabel')}</label>
              <span id='entity-name'>{entity.name}</span>
            </div>
            <Checkbox
              checked={values.applyToHierarchy}
              data-testid='assign-plan-checkbox'
              label={t('user.entity.plans.assignToChildren')}
              name='assignToHierarchy'
              onChange={toggleApplyToHierarchy}
            />
          </div>
        </div>
      </SharedModal.Body>
      <SharedModal.Footer>
        <SharedModal.Button
          data-testid='assign-modal-button'
          type='submit'
          variant='primary'
          onClick={submitPlanForm}>
          {t('common.actions.assign')}
        </SharedModal.Button>
      </SharedModal.Footer>
    </SharedModal>
  );
};

AssignPlanModal.propTypes = {
  entity: PropTypes.shape({
    name: PropTypes.string,
    plans: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
      })
    ),
    uuid: PropTypes.string,
  }),
  showModal: PropTypes.bool,
  toggleModal: PropTypes.func,
};
