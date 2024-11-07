import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import checkInGroupQuery from '@dc/graphql/user/queries/checkinGroup';

import SharedDataLoader from '@shared/components/DataLoader/DataLoader';
import SharedModal from '@shared/components/Modal/Modal';

AdminCheckInGroupDetailsModal.propTypes = {
  groupId: PropTypes.string,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

function AdminCheckInGroupDetailsModal({ groupId, isOpen, onClose }) {
  const { t } = useTranslation();

  return (
    <SharedModal isOpen={isOpen} onDismiss={onClose}>
      <SharedModal.Header>
        <SharedModal.Heading>
          <span>{t('admin.checkInGroups.detailsHeading')}</span>
        </SharedModal.Heading>
      </SharedModal.Header>
      <SharedDataLoader options={{ variables: { id: groupId } }} query={checkInGroupQuery}>
        {({ checkInGroup }) => (
          <SharedModal.Body>
            <h3 className='admin-preview-modal-heading'>{t('common.fields.common.name')}</h3>
            <p>{checkInGroup.name}</p>
            <h3 className='admin-preview-modal-heading'>{t('common.fields.common.displayName')}</h3>
            <p>{checkInGroup.displayName}</p>
            <h3 className='admin-preview-modal-heading'>
              {t('admin.checkInGroups.questionsList')}
            </h3>
            {checkInGroup.questions.map(({ question, id }) => (
              <p key={id}>{question}</p>
            ))}
          </SharedModal.Body>
        )}
      </SharedDataLoader>
      <SharedModal.Footer>
        <SharedModal.Button variant='primary' onClick={onClose}>
          {t('common.actions.close')}
        </SharedModal.Button>
      </SharedModal.Footer>
    </SharedModal>
  );
}

export default AdminCheckInGroupDetailsModal;
