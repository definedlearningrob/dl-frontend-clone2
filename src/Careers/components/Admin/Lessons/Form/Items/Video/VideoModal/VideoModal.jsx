import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import SharedModal from '@shared/components/Modal/Modal';
import { cleanInjection } from '@shared/utils/cleanInjection';

AdminLessonsFormItemsVideoVideoModal.propTypes = {
  data: PropTypes.shape({
    description: PropTypes.string,
    displayName: PropTypes.string,
    name: PropTypes.string,
    url: PropTypes.string,
  }),
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

function AdminLessonsFormItemsVideoVideoModal({
  data: { displayName, name, url, description },
  isOpen,
  onClose,
}) {
  const { t } = useTranslation();

  return (
    <div data-testid='video-modal'>
      <SharedModal isOpen={isOpen} onDismiss={onClose}>
        <SharedModal.Header>
          <SharedModal.Heading>{t('admin.lessons.items.video.label')}</SharedModal.Heading>
        </SharedModal.Header>
        <SharedModal.Body>
          <h3 className='admin-preview-modal-heading'>{t('common.fields.common.name')}</h3>
          <p data-testid='video-modal-name'>{name}</p>
          <h3 className='admin-preview-modal-heading'>{t('common.fields.common.displayName')}</h3>
          <p data-testid='video-modal-display-name'>{displayName}</p>
          <video controls={true} height='300px'>
            <source data-testid='lesson-item-video-preview' src={url} />
          </video>
          <p
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={cleanInjection(description)}
            data-testid='video-modal-description'
          />
        </SharedModal.Body>
        <SharedModal.Footer>
          <SharedModal.Button
            className='form-lesson-item-details-modal__close-button'
            type='button'
            variant='primary'
            onClick={onClose}>
            {t('common.actions.close')}
          </SharedModal.Button>
        </SharedModal.Footer>
      </SharedModal>
    </div>
  );
}

export default AdminLessonsFormItemsVideoVideoModal;
