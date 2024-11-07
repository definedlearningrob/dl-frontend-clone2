import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import archivePlanGroupStatementMutation from '@dc/graphql/user/mutations/archivePlanGroupStatement';
import { shapePlanGroup } from '@dc/resources/typeDefs';

import SharedModal from '@shared/components/Modal/Modal';
import { callToast } from '@shared/components/Toaster/Toaster';

AdminPlanGroupsFormStatementsListArchiveModal.propTypes = {
  group: shapePlanGroup,
  onClose: PropTypes.func,
  statement: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }),
};

function AdminPlanGroupsFormStatementsListArchiveModal({ group, onClose, statement }) {
  const { t } = useTranslation();

  const [archiveStatement] = useMutation(archivePlanGroupStatementMutation, {
    variables: { input: { id: statement.id } },
    update(cache) {
      cache.modify({
        id: cache.identify(group),
        fields: {
          statements(existing = [], { readField }) {
            return existing.filter((st) => readField('id', st) !== statement.id);
          },
        },
      });
    },
  });

  const processArchive = async () => {
    await archiveStatement();
    onClose();
    callToast(
      'success',
      t('common.notifications.success.archived', {
        name: t('admin.planGroups.statements.label'),
      })
    );
  };

  return (
    <SharedModal isOpen={true} onDismiss={onClose}>
      <SharedModal.Header>
        <SharedModal.Heading>
          {t('common.actions.archiveEntity', { name: t('admin.planGroups.statements.label') })}
        </SharedModal.Heading>
      </SharedModal.Header>
      <SharedModal.Body>
        <div className='lesson-items__archive-modal-body'>
          <p>{t('common.actions.archiveConfirmation')}</p>
        </div>
      </SharedModal.Body>
      <SharedModal.Footer>
        <SharedModal.Button
          className='image-input__preview-button'
          data-testid='archive-modal-accept'
          type='button'
          variant='danger'
          onClick={processArchive}>
          {t('common.actions.archive')}
        </SharedModal.Button>
        <SharedModal.Button
          className='image-input__preview-button -reject'
          data-testid='archive-modal-cancel'
          type='button'
          onClick={onClose}>
          {t('common.actions.cancel')}
        </SharedModal.Button>
      </SharedModal.Footer>
    </SharedModal>
  );
}

export default AdminPlanGroupsFormStatementsListArchiveModal;
