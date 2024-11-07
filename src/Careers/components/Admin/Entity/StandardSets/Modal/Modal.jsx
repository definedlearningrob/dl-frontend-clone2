import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { shapeStandardSet } from '@dc/resources/typeDefs';

import SharedModal from '@shared/components/Modal/Modal';

AdminEntityStandardSetsModal.propTypes = {
  onClose: PropTypes.func,
  standardSet: shapeStandardSet,
};

function AdminEntityStandardSetsModal({ standardSet, onClose }) {
  const { t } = useTranslation();

  return (
    <SharedModal isOpen={true} onDismiss={onClose}>
      <SharedModal.Header>
        <SharedModal.Heading>{t('admin.standardSets.detailsHeading')}</SharedModal.Heading>
      </SharedModal.Header>
      <SharedModal.Body>
        <article>
          <h4 className='admin-preview-modal-heading'>{t('common.fields.common.name')}</h4>
          <p data-testid='standard-set-details-name'>{standardSet.name}</p>
        </article>
        <article>
          <h4 className='admin-preview-modal-heading'>{t('common.fields.common.displayName')}</h4>
          <p data-testid='standard-set-details-displayname'>{standardSet.displayName || '---'}</p>
        </article>
        <article>
          <h4 className='admin-preview-modal-heading'>{t('admin.standardSets.setId')}</h4>
          <p data-testid='standard-set-details-setid'>{standardSet.setId}</p>
        </article>
      </SharedModal.Body>
      <SharedModal.Footer>
        <SharedModal.Button variant='primary' onClick={onClose}>
          {t('common.actions.close')}
        </SharedModal.Button>
      </SharedModal.Footer>
    </SharedModal>
  );
}

export default AdminEntityStandardSetsModal;
