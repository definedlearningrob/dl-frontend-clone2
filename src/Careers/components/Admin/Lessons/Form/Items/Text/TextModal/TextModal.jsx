import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import SharedModal from '@shared/components/Modal/Modal';
import { cleanInjection } from '@shared/utils/cleanInjection';

AdminLessonsFormItemsTextTextModal.propTypes = {
  data: PropTypes.shape({
    content: PropTypes.string,
    displayName: PropTypes.string,
    name: PropTypes.string,
  }),
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

function AdminLessonsFormItemsTextTextModal({
  data: { content, displayName, name },
  isOpen,
  onClose,
}) {
  const { t } = useTranslation();

  return (
    <div data-testid='text-modal'>
      <SharedModal isOpen={isOpen} onDismiss={onClose}>
        <SharedModal.Header>
          <SharedModal.Heading>{t('admin.lessons.items.text.label')}</SharedModal.Heading>
        </SharedModal.Header>
        <SharedModal.Body>
          <h3 className='admin-preview-modal-heading'>{t('common.fields.common.name')}</h3>
          <p data-testid='text-modal-name'>{name}</p>
          <h3 className='admin-preview-modal-heading'>{t('common.fields.common.displayName')}</h3>
          <p data-testid='text-modal-display-name'>{displayName}</p>
          <h3 className='admin-preview-modal-heading'>{t('admin.lessons.items.text.content')}</h3>
          <p
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={cleanInjection(content)}
            data-testid='text-modal-content'
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

export default AdminLessonsFormItemsTextTextModal;
