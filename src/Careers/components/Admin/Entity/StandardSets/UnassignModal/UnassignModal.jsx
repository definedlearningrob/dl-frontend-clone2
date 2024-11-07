import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@apollo/client';

import unassignStandardSetFromEntityMutation from '@dc/graphql/user/mutations/unassignStandardSetFromEntity';

import SharedCheckbox from '@shared/components/Checkbox/Checkbox';
import SharedModal from '@shared/components/Modal/Modal';
import { callToast } from '@shared/components/Toaster/Toaster';

AdminEntityStandardSetsUnassignModal.propTypes = {
  entity: PropTypes.shape({
    name: PropTypes.string,
    uuid: PropTypes.string,
  }),
  standardSet: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }),
  toggleModal: PropTypes.func,
};

function AdminEntityStandardSetsUnassignModal({ entity, toggleModal, standardSet }) {
  const { t } = useTranslation();
  const [unassignFromHierarchy, setUnassignFromHierarchy] = useState(false);
  const [mutateUnassignStandardSet, { loading }] = useMutation(
    unassignStandardSetFromEntityMutation
  );

  const sendDisabled = useMemo(() => !standardSet, [standardSet]);

  const updatedStandardsFields = {
    standardSets(existing = [], { readField }) {
      const withoutUnassigned = existing.filter(
        (existingStandardSet) => readField('id', existingStandardSet) !== standardSet.id
      );

      return withoutUnassigned;
    },
  };

  const unassignStandardSet = async () => {
    const entityCacheId = {
      uuid: entity.uuid,
      __typename: 'Entity',
    };
    const entityDataCacheId = {
      uuid: entity.uuid,
      __typename: 'EntityData',
    };

    await mutateUnassignStandardSet({
      variables: {
        input: {
          standardSetId: standardSet.id,
          entityUuid: entity.uuid,
          unassignFromHierarchy,
        },
      },
      update(cache) {
        cache.modify({
          id: cache.identify(entityCacheId),
          fields: updatedStandardsFields,
        });
        cache.modify({
          id: cache.identify(entityDataCacheId),
          fields: updatedStandardsFields,
        });
      },
    });

    callToast('success', t('user.entity.standardSets.unassignedSuccessfully'));
    toggleModal();
  };

  const toggleCheck = ({ target: { checked } }) => {
    setUnassignFromHierarchy(checked);
  };

  return (
    <SharedModal isOpen={true} onDismiss={toggleModal}>
      <SharedModal.Header>
        <SharedModal.Heading>{t('user.entity.standardSets.unassign')}</SharedModal.Heading>
      </SharedModal.Header>
      <SharedModal.Body>
        <div
          className='messages-left-panel__modal assign-plan-modal'
          data-testid='unassign-standard-set-modal'>
          <div className='messages-left-panel__modal__context__announcements'>
            <span className='assign-plan-modal__unassign-info'>
              {t('user.entity.standardSets.unassignInfo', {
                entityName: entity?.name,
                standardSetName: standardSet?.name,
              })}
            </span>
            <SharedCheckbox
              checked={unassignFromHierarchy}
              className='assign-plan-modal__checkbox'
              data-testid='unassign-standard-set-checkbox'
              label={t('user.entity.standardSets.unassignFromChildren')}
              onChange={toggleCheck}
            />
          </div>
        </div>
      </SharedModal.Body>
      <SharedModal.Footer>
        <SharedModal.Button
          data-testid='unassign-modal-button'
          disabled={sendDisabled}
          isLoading={loading}
          variant='primary'
          onClick={unassignStandardSet}>
          {t('common.actions.unassign')}
        </SharedModal.Button>
      </SharedModal.Footer>
    </SharedModal>
  );
}

export default AdminEntityStandardSetsUnassignModal;
