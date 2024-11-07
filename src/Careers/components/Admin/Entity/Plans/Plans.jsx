import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash-es';

import AssignPlanModal from '@dc/components/Admin/Entity/Plans/AssignModal/AssignModal';
import planQuery from '@dc/graphql/user/queries/plan';
import PreviewPlanModal from '@dc/components/Admin/Entity/Plans/Modal/Modal';
import UnassignPlanModal from '@dc/components/Admin/Entity/Plans/UnassignModal/UnassignModal';
import { ReactComponent as ClearIcon } from '@dc/svg/clear.svg';
import { TabCard } from '@dc/components/Admin/Entity/TabCard';

import { ReactComponent as CertificateIcon } from '@shared/assets/icons/certificate.svg';
import SharedButton from '@shared/components/Button/Button';
import SharedDataLoader from '@shared/components/DataLoader/DataLoader';
import DeprecatedIconButton from '@shared/components/DeprecatedIconButton/DeprecatedIconButton';

AdminEntityPlans.propTypes = {
  entity: PropTypes.shape({
    name: PropTypes.string,
    plans: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
      })
    ),
    uuid: PropTypes.string,
  }),
};

function AdminEntityPlans({ entity }) {
  const { t } = useTranslation();
  const [assignModalVisible, setAssignModalVisible] = useState(false);
  const [unassignModalVisible, setUnassignModalVisible] = useState(false);
  const [planForPreview, setPlanForPreview] = useState(false);
  const [planToUnassign, setPlanToUnassign] = useState();

  const toggleAssignModal = () => setAssignModalVisible(!assignModalVisible);

  const planClickHandler = (plan) => () => setPlanForPreview(plan);

  const closePreviewModal = () => setPlanForPreview(null);

  const toggleUnassignModal = (plan) => {
    const planToSet = planToUnassign ? null : plan;
    setPlanToUnassign(planToSet);
    setUnassignModalVisible(!unassignModalVisible);
  };

  const toggleUnassignHandler = (plan) => (event) => {
    event.stopPropagation();
    toggleUnassignModal(plan);
  };

  const emptyPlansInfo = (
    <li className='flex justify-between items-center'>{t('common.messages.noPlans')}</li>
  );

  return (
    <TabCard
      description={t('admin.entities.tabs.plansDescription')}
      icon={CertificateIcon}
      title={t('admin.entities.tabs.plans')}>
      <div>
        <ul className='text-primary-500 pb-base'>
          {isEmpty(entity.plans)
            ? emptyPlansInfo
            : entity.plans.map((plan) => (
                <li
                  key={plan.id}
                  className='flex justify-between items-center p-xs hover:bg-neutral-200 hover:cursor-pointer hover:rounded-xs'
                  data-testid='plan-list-item'
                  onClick={planClickHandler(plan)}>
                  {plan.name}
                  <DeprecatedIconButton
                    data-testid='plan-unassign-button'
                    icon={<ClearIcon />}
                    size='xs'
                    square={true}
                    onClick={toggleUnassignHandler(plan)}
                  />
                </li>
              ))}
        </ul>
        <SharedButton
          className='ml-auto'
          data-testid='assign-plan-button'
          variant='primary'
          onClick={toggleAssignModal}>
          {t('common.actions.assign')}
        </SharedButton>
        {assignModalVisible && <AssignPlanModal entity={entity} toggleModal={toggleAssignModal} />}
        {unassignModalVisible && (
          <UnassignPlanModal
            entity={entity}
            plan={planToUnassign}
            toggleModal={toggleUnassignModal}
          />
        )}
        {planForPreview && (
          <SharedDataLoader options={{ variables: { id: planForPreview.id } }} query={planQuery}>
            {({ plan }) => <PreviewPlanModal plan={plan} onClose={closePreviewModal} />}
          </SharedDataLoader>
        )}
      </div>
    </TabCard>
  );
}

export default AdminEntityPlans;
