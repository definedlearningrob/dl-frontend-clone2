import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@apollo/client';

import unassignPlanFromEntityMutation from '@dc/graphql/user/mutations/unassignPlanFromEntity';

import SharedCheckbox from '@shared/components/Checkbox/Checkbox';
import SharedModal from '@shared/components/Modal/Modal';
import { callToast } from '@shared/components/Toaster/Toaster';

AdminEntityPlansUnassignModal.propTypes = {
  entity: PropTypes.shape({
    name: PropTypes.string,
    uuid: PropTypes.string,
  }),
  plan: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }),
  showModal: PropTypes.bool,
  toggleModal: PropTypes.func,
};

function AdminEntityPlansUnassignModal({ entity, toggleModal, plan }) {
  const { t } = useTranslation();
  const [unassignFromHierarchy, setUnassignFromHierarchy] = useState(false);
  const [mutateUnassignPlan, { loading }] = useMutation(unassignPlanFromEntityMutation);

  const sendDisabled = useMemo(() => !plan, [plan]);

  const updatedPlansFields = {
    plans(existing = [], { readField }) {
      const withoutUnassigned = existing.filter((p) => readField('id', p) !== plan.id);

      return withoutUnassigned;
    },
  };

  const unassignPlan = async () => {
    const entityCacheId = {
      uuid: entity.uuid,
      __typename: 'Entity',
    };
    const entityDataCacheId = {
      uuid: entity.uuid,
      __typename: 'EntityData',
    };
    await mutateUnassignPlan({
      variables: {
        input: {
          planId: plan.id,
          entityUuid: entity.uuid,
          unassignFromHierarchy,
        },
      },
      update(cache) {
        cache.modify({
          id: cache.identify(entityCacheId),
          fields: updatedPlansFields,
        });
        cache.modify({
          id: cache.identify(entityDataCacheId),
          fields: updatedPlansFields,
        });
      },
    });

    callToast('success', t('user.entity.plans.unassignedSuccessfully'));
    toggleModal();
  };

  const toggleCheck = ({ target: { checked } }) => {
    setUnassignFromHierarchy(checked);
  };

  return (
    <SharedModal show={true} onDismiss={toggleModal}>
      <SharedModal.Header>
        <SharedModal.Heading>{t('user.entity.plans.unassign')}</SharedModal.Heading>
      </SharedModal.Header>
      <SharedModal.Body>
        <div className='messages-left-panel__modal__context__announcements'>
          <span className='assign-plan-modal__unassign-info'>
            {t('user.entity.plans.unassignInfo', {
              entityName: entity?.name,
              planName: plan?.name,
            })}
          </span>
          <SharedCheckbox
            checked={unassignFromHierarchy}
            className='assign-plan-modal__checkbox'
            data-testid='unassign-plan-checkbox'
            label={t('user.entity.plans.unassignFromChildren')}
            onChange={toggleCheck}
          />
        </div>
      </SharedModal.Body>
      <SharedModal.Footer>
        <SharedModal.Button
          data-testid='unassign-modal-button'
          disabled={sendDisabled}
          isLoading={loading}
          variant='primary'
          onClick={unassignPlan}>
          {t('common.actions.unassign')}
        </SharedModal.Button>
      </SharedModal.Footer>
    </SharedModal>
  );
}

export default AdminEntityPlansUnassignModal;
