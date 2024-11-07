import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { shapePlanGroup } from '@dc/resources/typeDefs';

import SharedModal from '@shared/components/Modal/Modal';
import { cleanInjection } from '@shared/utils/cleanInjection';

AdminPlansFormGroupsModal.propTypes = {
  group: shapePlanGroup,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

function AdminPlansFormGroupsModal({ isOpen, group, onClose }) {
  const { t } = useTranslation();

  return (
    <div>
      <SharedModal isOpen={isOpen} onDismiss={onClose}>
        <SharedModal.Header>
          <SharedModal.Heading>{t('admin.plans.groups.moreInfoTitle')}</SharedModal.Heading>
        </SharedModal.Header>
        <SharedModal.Body>
          <>
            <h3 className='admin-preview-modal-heading'>{t('common.fields.common.name')}</h3>
            <p>{group.name}</p>
            <h3 className='admin-preview-modal-heading'>{t('common.fields.common.displayName')}</h3>
            <p>{group.displayName}</p>
            <h3 className='admin-preview-modal-heading'>{t('common.fields.common.description')}</h3>
            {/* eslint-disable-next-line react/no-danger */}
            <p dangerouslySetInnerHTML={cleanInjection(group.description)} />
            <h3 className='admin-preview-modal-heading'>
              {t('admin.planGroups.statements.sectionLabel')}
            </h3>
            {group.statements.map(({ id, name }) => (
              <p key={id}>{name}</p>
            ))}
          </>
        </SharedModal.Body>
        <SharedModal.Footer>
          <SharedModal.Button variant='primary' onClick={onClose}>
            {t('common.actions.close')}
          </SharedModal.Button>
        </SharedModal.Footer>
      </SharedModal>
    </div>
  );
}

export default AdminPlansFormGroupsModal;
