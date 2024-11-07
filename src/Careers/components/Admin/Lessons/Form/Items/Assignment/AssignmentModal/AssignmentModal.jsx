import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import SharedModal from '@shared/components/Modal/Modal';
import { cleanInjection } from '@shared/utils/cleanInjection';

AdminLessonsFormItemsAssignmentAssignmentModal.propTypes = {
  data: PropTypes.shape({
    assetName: PropTypes.string,
    description: PropTypes.string,
    displayName: PropTypes.string,
  }),
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

function AdminLessonsFormItemsAssignmentAssignmentModal({
  data: { assetName, description, displayName },
  isOpen,
  onClose,
}) {
  const { t } = useTranslation();

  return (
    <div data-testid='assignment-modal'>
      <SharedModal isOpen={isOpen} onDismiss={onClose}>
        <SharedModal.Header>
          <SharedModal.Heading>{t('admin.lessons.items.assignment.label')}</SharedModal.Heading>
        </SharedModal.Header>
        <SharedModal.Body>
          <h3 className='admin-preview-modal-heading'>{t('common.fields.common.name')}</h3>
          <p data-testid='assignment-modal-name'>{assetName}</p>
          <h3 className='admin-preview-modal-heading'>{t('common.fields.common.displayName')}</h3>
          <p data-testid='assignment-modal-display-name'>{displayName}</p>
          <h3 className='admin-preview-modal-heading'>{t('common.fields.common.description')}</h3>
          <p
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={cleanInjection(description)}
            data-testid='assignment-modal-description'
          />
        </SharedModal.Body>
        <SharedModal.Footer>
          <SharedModal.Button
            className='form-lesson-item-details-modal__close-button'
            variant='primary'
            onClick={onClose}>
            {t('common.actions.close')}
          </SharedModal.Button>
        </SharedModal.Footer>
      </SharedModal>
    </div>
  );
}

export default AdminLessonsFormItemsAssignmentAssignmentModal;
