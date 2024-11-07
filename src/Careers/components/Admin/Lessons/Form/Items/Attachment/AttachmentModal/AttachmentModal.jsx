import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import attachmentQuery from '@dc/graphql/user/queries/attachment';

import SharedDataLoader from '@shared/components/DataLoader/DataLoader';
import SharedModal from '@shared/components/Modal/Modal';
import { cleanInjection } from '@shared/utils/cleanInjection';

AdminLessonsFormItemsAttachmentAttachmentModal.propTypes = {
  attachmentId: PropTypes.string,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

function AdminLessonsFormItemsAttachmentAttachmentModal({ attachmentId, isOpen, onClose }) {
  const { t } = useTranslation();

  return (
    <div data-testid='attachment-modal'>
      <SharedModal isOpen={isOpen} onDismiss={onClose}>
        <SharedModal.Header>
          <SharedModal.Heading>{t('admin.lessons.items.attachment.label')}</SharedModal.Heading>
        </SharedModal.Header>
        <SharedModal.Body>
          <SharedDataLoader options={{ variables: { id: attachmentId } }} query={attachmentQuery}>
            {({ attachment }) => (
              <>
                <h3 className='admin-preview-modal-heading'>{t('common.fields.common.name')}</h3>
                <p className='px-sm' data-testid='attachment-modal-name'>
                  {attachment.name}
                </p>
                <h3 className='admin-preview-modal-heading'>
                  {t('common.fields.common.displayName')}
                </h3>
                <p className='px-sm' data-testid='attachment-modal-display-name'>
                  {attachment.displayName}
                </p>
                <h3 className='admin-preview-modal-heading'>
                  {t('common.fields.common.description')}
                </h3>
                <p
                  className='attachment-item__description px-sm'
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={cleanInjection(attachment.description)}
                  data-testid='attachment-modal-description'
                />
                <h3 className='admin-preview-modal-heading'>
                  {t('common.fields.attachment.files')}
                </h3>
                <ul data-testid='attachment-modal-files'>
                  {attachment.files.map((file) => (
                    <li key={file.id} className='px-sm' data-testid='attachment-file'>
                      <a href={file.url} rel='noopener noreferrer' target='_blank'>
                        {file.filename}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </SharedDataLoader>
        </SharedModal.Body>
        <SharedModal.Footer>
          <SharedModal.Button
            className='form-vocabulary-details-modal__close-button'
            variant='primary'
            onClick={onClose}>
            {t('common.actions.close')}
          </SharedModal.Button>
        </SharedModal.Footer>
      </SharedModal>
    </div>
  );
}

export default AdminLessonsFormItemsAttachmentAttachmentModal;
