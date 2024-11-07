import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import SharedModal from '@shared/components/Modal/Modal';
import { cleanInjection } from '@shared/utils/cleanInjection';

AdminLessonsFormItemsVocabularyVocabularyModal.propTypes = {
  data: PropTypes.shape({
    definition: PropTypes.string,
    term: PropTypes.string,
  }),
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

function AdminLessonsFormItemsVocabularyVocabularyModal({
  data: { definition, term },
  isOpen,
  onClose,
}) {
  const { t } = useTranslation();

  return (
    <div data-testid='vocabulary-modal'>
      <SharedModal isOpen={isOpen} onDismiss={onClose}>
        <SharedModal.Header>
          <SharedModal.Heading>{t('admin.lessons.items.vocabulary.label')}</SharedModal.Heading>
        </SharedModal.Header>
        <SharedModal.Body>
          <h3 className='admin-preview-modal-heading'>
            {t('admin.lessons.items.vocabulary.term')}
          </h3>
          <p data-testid='vocabulary-modal-term'>{term}</p>
          <h3 className='admin-preview-modal-heading'>
            {t('admin.lessons.items.vocabulary.definition')}
          </h3>
          <p
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={cleanInjection(definition)}
            data-testid='vocabulary-modal-definition'
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

export default AdminLessonsFormItemsVocabularyVocabularyModal;
