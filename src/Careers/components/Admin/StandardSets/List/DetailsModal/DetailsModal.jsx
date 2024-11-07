import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { shapeStandardSet } from '@dc/resources/typeDefs';

import SharedModal from '@shared/components/Modal/Modal';

AdminStandardSetsListDetailsModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  standardSet: shapeStandardSet,
};

function AdminStandardSetsListDetailsModal({ isOpen, onClose, standardSet }) {
  const { t } = useTranslation();

  return (
    <SharedModal isOpen={isOpen} onDismiss={onClose}>
      <SharedModal.Header>
        <SharedModal.Heading>
          <span>{t('admin.standardSets.detailsHeading')}</span>
        </SharedModal.Heading>
      </SharedModal.Header>
      <SharedModal.Body>
        <h3 className='admin-preview-modal-heading'>{t('common.fields.common.name')}</h3>
        <p data-testid='standard-set-details-name'>{standardSet.name}</p>
        <h3 className='admin-preview-modal-heading'>{t('common.fields.common.displayName')}</h3>
        <p data-testid='standard-set-details-displayname'>{standardSet.displayName || '---'}</p>
        <h3 className='admin-preview-modal-heading'>{t('admin.standardSets.setId')}</h3>
        <p data-testid='standard-set-details-setid'>{standardSet.setId}</p>
      </SharedModal.Body>
      <SharedModal.Footer>
        <SharedModal.Button variant='primary' onClick={onClose}>
          {t('common.actions.close')}
        </SharedModal.Button>
      </SharedModal.Footer>
    </SharedModal>
  );
}

export default AdminStandardSetsListDetailsModal;
