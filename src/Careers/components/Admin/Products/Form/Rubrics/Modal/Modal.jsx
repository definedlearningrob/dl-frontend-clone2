import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { RUBRIC_QUERY } from '@dc/graphql/user/queries/rubric';

import SharedDataLoader from '@shared/components/DataLoader/DataLoader';
import SharedModal from '@shared/components/Modal/Modal';
import { cleanInjection } from '@shared/utils/cleanInjection';

AdminProductsRubricsModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  rubricId: PropTypes.string,
};

function AdminProductsRubricsModal({ isOpen, onClose, rubricId }) {
  const { t } = useTranslation();

  return (
    <SharedModal isOpen={isOpen} onDismiss={onClose}>
      <SharedModal.Header>
        <SharedModal.Heading>
          <span>{t('admin.rubrics.detailsHeading')}</span>
        </SharedModal.Heading>
      </SharedModal.Header>
      <SharedDataLoader options={{ variables: { id: rubricId } }} query={RUBRIC_QUERY}>
        {({ rubric }) => (
          <SharedModal.Body>
            <h3 className='admin-preview-modal-heading'>{t('common.fields.common.name')}</h3>
            <p>{rubric.name}</p>
            <h3 className='admin-preview-modal-heading'>{t('common.fields.common.description')}</h3>
            {/* eslint-disable-next-line react/no-danger */}
            <span dangerouslySetInnerHTML={cleanInjection(rubric.description)} />
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

export default AdminProductsRubricsModal;
