import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import SharedModal from '@shared/components/Modal/Modal';

AdminLessonsFormItemsResearchLinkResearchLinkModal.propTypes = {
  data: PropTypes.shape({
    author: PropTypes.string,
    displayName: PropTypes.string,
    name: PropTypes.string,
    resourceLink: PropTypes.string,
    sourceName: PropTypes.string,
  }),
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

function AdminLessonsFormItemsResearchLinkResearchLinkModal({
  data: { author, displayName, name, resourceLink, sourceName },
  isOpen,
  onClose,
}) {
  const { t } = useTranslation();

  return (
    <div>
      <SharedModal isOpen={isOpen} onDismiss={onClose}>
        <SharedModal.Header>
          <SharedModal.Heading>{t('admin.lessons.items.researchLink.label')}</SharedModal.Heading>
        </SharedModal.Header>
        <SharedModal.Body>
          <h3 className='admin-preview-modal-heading'>
            {t('admin.lessons.items.researchLink.author')}
          </h3>
          <p>{author}</p>
          <h3 className='admin-preview-modal-heading'>{t('common.fields.common.name')}</h3>
          <p>{name}</p>
          <h3 className='admin-preview-modal-heading'>{t('common.fields.common.displayName')}</h3>
          <p>{displayName}</p>
          <h3 className='admin-preview-modal-heading'>
            {t('admin.lessons.items.researchLink.resourceLink')}
          </h3>
          <p>
            <a href={resourceLink} rel='noopener' target='blank'>
              {resourceLink}
            </a>
          </p>
          <h3 className='admin-preview-modal-heading'>
            {t('admin.lessons.items.researchLink.sourceName')}
          </h3>
          <p>{sourceName}</p>
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

export default AdminLessonsFormItemsResearchLinkResearchLinkModal;
