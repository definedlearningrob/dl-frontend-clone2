import { Formik } from 'formik';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUpdateEntityPlansMutation } from '@graphql/dc/users/hooks';

import { TPlan, TEntityData } from '@dc/graphql/user/queries/entity';
import { TabCard } from '@dc/components/Admin/Entity/TabCard';
import { PlanWrapper } from '@dc/components/Admin/Entity/Plans/PlanWrapper';
import { AssignPlanModal } from '@dc/components/Admin/Entity/Plans/AssignModal/AssignModal';

import { ReactComponent as BookIcon } from '@shared/assets/icons/book_opened.svg';
import { callToast } from '@shared/components/Toaster/Toaster';
import { handleError } from '@shared/utils/handleError';
import SharedButton from '@shared/components/Button/Button';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';

type Props = {
  entity: TEntityData['entity'];
};

export type FormValues = {
  plans: TPlan[];
  applyToHierarchy: boolean;
};

export const PlansForm = ({ entity }: Props) => {
  const { t } = useTranslation();
  const [assignModalVisible, setAssignModalVisible] = useState(false);
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });
  const toggleAssignModal = () => setAssignModalVisible(!assignModalVisible);
  const [updateEntityPlans] = useUpdateEntityPlansMutation();

  const initialValues = {
    plans: entity.plans || [],
    applyToHierarchy: false,
  };

  const handleSubmit = async (values: FormValues) => {
    try {
      const plans = values.plans?.map((plan) => ({ planId: plan.id, step: plan.step }));

      await updateEntityPlans({
        variables: {
          input: {
            plans,
            uuid: entity.uuid,
            applyToHierarchy: values.applyToHierarchy,
          },
        },
      });
      callToast('success', t('user.entity.plans.assignedSuccessfully', { count: plans.length }));
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ dirty }) => (
        <TabCard
          actions={
            <SharedButton
              className='ml-auto'
              data-testid='assign-plan-button'
              disabled={!dirty}
              size={isFullHD ? 'md' : 'sm'}
              variant='primary'
              onClick={toggleAssignModal}>
              {t('common.actions.save')}
            </SharedButton>
          }
          description={t('admin.entities.tabs.plansDescription')}
          icon={BookIcon}
          title={t('admin.entities.tabs.plans')}>
          <PlanWrapper />
          {assignModalVisible && (
            <AssignPlanModal entity={entity} toggleModal={toggleAssignModal} />
          )}
        </TabCard>
      )}
    </Formik>
  );
};
