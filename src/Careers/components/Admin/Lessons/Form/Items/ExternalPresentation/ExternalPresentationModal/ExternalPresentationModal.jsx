import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import SharedModal from '@shared/components/Modal/Modal';

AdminLessonsFormItemsPresentationModal.propTypes = {
  data: PropTypes.shape({
    displayName: PropTypes.string,
    name: PropTypes.string,
    source: PropTypes.string,
  }),
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

function AdminLessonsFormItemsPresentationModal({
  data: { source, displayName, name },
  isOpen,
  onClose,
}) {
  const { t } = useTranslation();

  return (
    <div data-testid='presentation-modal'>
      <SharedModal isOpen={isOpen} onDismiss={onClose}>
        <SharedModal.Header>
          <SharedModal.Heading>{t('admin.lessons.items.presentation.label')}</SharedModal.Heading>
        </SharedModal.Header>
        <SharedModal.Body>
          <h3 className='admin-preview-modal-heading'>{t('common.fields.common.name')}</h3>
          <p data-testid='presentation-modal-name'>{name}</p>
          <h3 className='admin-preview-modal-heading'>{t('common.fields.common.displayName')}</h3>
          <p data-testid='presentation-modal-display-name'>{displayName}</p>
          <h3 className='admin-preview-modal-heading'>
            {t('admin.lessons.items.presentation.source')}
          </h3>
          <a className='presentation-item__content' href={source} rel='noreferrer' target='_blank'>
            {source}
          </a>
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

export default AdminLessonsFormItemsPresentationModal;
