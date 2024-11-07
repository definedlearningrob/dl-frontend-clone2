import { useTranslation } from 'react-i18next';

import { OPPORTUNITY_APPLICATION_STATUS } from '@dc/resources/enums';
import { applicationStatusesKeyMap } from '@dc/components/Opportunities/OpportunityCard/helpers';
import { newMappedApplicationStatus } from '@dc/components/User/Opportunities/helpers';
import { useUpdateOpportunityApplication } from '@dc/graphql/user/hooks/useUpdateOpportunityApplication';

import SharedModal from '@shared/components/Modal/Modal';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { ReactComponent as InfoIcon } from '@shared/svg/info_outlined.svg';

type Props = {
  applicationId: string;
  applicationStatus: OPPORTUNITY_APPLICATION_STATUS;
  handleClose: () => void;
  studentName: string;
};

export const UpdateStatusModal = ({
  applicationId,
  applicationStatus,
  handleClose,
  studentName,
}: Props) => {
  const { t } = useTranslation();
  const { updateApplicationStatus } = useUpdateOpportunityApplication();
  const newApplicationStatus = newMappedApplicationStatus[applicationStatus];

  if (!newApplicationStatus) return null;

  const newStatus = t(
    `opportunities.status.${applicationStatusesKeyMap[newApplicationStatus]}`
  ).toLowerCase();

  const handleStatusUpdate = () => {
    const message = (
      <>
        <div>{t('opportunityManageApplications.toastMessage.statusChangedHeading')}</div>
        <p className='text-xs text-font-primary font-regular m-0'>
          {t('opportunityManageApplications.toastMessage.statusChangedInfo', {
            studentName,
            newStatus,
          })}
        </p>
      </>
    );

    updateApplicationStatus(applicationId, newApplicationStatus, message);
    handleClose();
  };

  return (
    <SharedModal isOpen={true} onDismiss={handleClose}>
      <SharedModal.Header>
        <IconContainer
          Icon={InfoIcon}
          className='bg-info-100 text-info-500 p-xs rounded-full mr-sm'
          size='md'
        />
        <SharedModal.Heading className='!mr-auto'>
          {t('opportunityManageApplications.toastMessage.statusChangeModalHeading', {
            newStatus,
          })}
        </SharedModal.Heading>
      </SharedModal.Header>
      <SharedModal.Body className='!mt-0'>
        <p className='pl-md ml-md'>
          {t('opportunityManageApplications.toastMessage.statusChangeModalBody', {
            studentName,
            newStatus,
          })}
        </p>
      </SharedModal.Body>
      <SharedModal.Footer>
        <SharedModal.Button variant='primary-outlined' onClick={handleClose}>
          {t('common.actions.cancel')}
        </SharedModal.Button>
        <SharedModal.Button variant='primary' onClick={handleStatusUpdate}>
          {t('common.actions.confirm')}
        </SharedModal.Button>
      </SharedModal.Footer>
    </SharedModal>
  );
};
