import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@apollo/client';

import assignStandardSetToEntityMutation from '@dc/graphql/user/mutations/assignStandardSetToEntity';
import StandardSetSelect from '@dc/components/Admin/Entity/StandardSets/AssignModal/StandardSetSelect/StandardSetSelect';

import SharedCheckbox from '@shared/components/Checkbox/Checkbox';
import SharedModal from '@shared/components/Modal/Modal';
import { callToast } from '@shared/components/Toaster/Toaster';

AdminEntityStandardSetsAssignModal.propTypes = {
  entity: PropTypes.shape({
    name: PropTypes.string,
    standardSets: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
      })
    ),
    uuid: PropTypes.string,
  }),
  toggleModal: PropTypes.func,
};

function AdminEntityStandardSetsAssignModal({ entity, toggleModal }) {
  const { t } = useTranslation();
  const [standardSet, setStandardSet] = useState(null);
  const [assignToHierarchy, setAssignToHierarchy] = useState(false);
  const [mutateAssignStandardSet, { loading }] = useMutation(assignStandardSetToEntityMutation);

  const sendDisabled = useMemo(() => !standardSet, [standardSet]);

  const updatedStandardsFields = {
    standardSets(existing = [], { readField }) {
      const recordExists = existing.find(
        (existingStandardSet) => readField('id', existingStandardSet) === standardSet.id
      );

      return recordExists ? existing : [...existing, standardSet];
    },
  };

  const assignStandardSet = async () => {
    const entityCacheId = {
      uuid: entity.uuid,
      __typename: 'Entity',
    };
    const entityDataCacheId = {
      uuid: entity.uuid,
      __typename: 'EntityData',
    };

    try {
      await mutateAssignStandardSet({
        variables: {
          input: {
            standardSetId: standardSet.value,
            entityUuid: entity.uuid,
            assignToHierarchy,
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

      toggleModal();
      callToast('success', t('user.entity.standardSets.assignedSuccessfully'));
    } catch (error) {
      throw error;
    }
  };

  const toggleCheck = ({ target: { checked } }) => {
    setAssignToHierarchy(checked);
  };

  return (
    <SharedModal isOpen={true} onDismiss={toggleModal}>
      <SharedModal.Header>
        <SharedModal.Heading>{t('user.entity.standardSets.assign')}</SharedModal.Heading>
      </SharedModal.Header>
      <SharedModal.Body>
        <div className='assign-plan-modal' data-testid='assign-standard-set-modal'>
          <div className='messages-left-panel__modal__context__announcements'>
            <div className='messages-left-panel__modal__context-titles__announcements'>
              <label htmlFor='entity-name'>{t('user.entity.standardSets.assignToLabel')}</label>
              <span id='entity-name'>{entity.name}</span>
            </div>
            <SharedCheckbox
              checked={assignToHierarchy}
              className='assign-plan-modal__checkbox'
              data-testid='assign-standard-set-checkbox'
              label={t('user.entity.standardSets.assignToChildren')}
              onChange={toggleCheck}
            />
            <StandardSetSelect
              assignedStandardSets={entity.standardSets}
              setStandardSet={setStandardSet}
              standardSet={standardSet}
            />
          </div>
        </div>
      </SharedModal.Body>
      <SharedModal.Footer>
        <SharedModal.Button
          className='announcement-modal messages-left-panel__modal__button'
          data-testid='assign-modal-button'
          disabled={sendDisabled}
          isLoading={loading}
          variant='primary'
          onClick={assignStandardSet}>
          {t('common.actions.assign')}
        </SharedModal.Button>
      </SharedModal.Footer>
    </SharedModal>
  );
}

export default AdminEntityStandardSetsAssignModal;
