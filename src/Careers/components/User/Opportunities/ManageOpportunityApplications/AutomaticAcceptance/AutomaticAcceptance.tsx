import { useTranslation } from 'react-i18next';

import { ReactComponent as AutomaticAcceptanceImage } from '@dc/images/automatic-acceptance.svg';
import { useUpdateOpportunityApplication } from '@dc/graphql/user/hooks/useUpdateOpportunityApplication';
import { OPPORTUNITY_APPLICATION_STATUS } from '@dc/resources/enums';
import { TOpportunityApplication } from '@dc/resources/types';
import { ReactComponent as ThumbsUpIcon } from '@dc/assets/icons/thumbs-up.svg';
import { ReactComponent as ThumbsDownIcon } from '@dc/assets/icons/thumbs-down.svg';

import SharedAvatar from '@shared/components/Avatar/Avatar';
import EmptyState from '@shared/components/EmptyState/EmptyState';
import SharedButton from '@shared/components/Button/Button';
import useQueryParams from '@shared/hooks/useQueryParams';
import { Badge } from '@shared/components/Badge/Badge';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';

type Props = {
  application: TOpportunityApplication;
};

export const AutomaticAcceptance = ({ application }: Props) => {
  const { params } = useQueryParams<{ applicationId: string }>();
  const { updateApplicationStatus } = useUpdateOpportunityApplication();
  const { t } = useTranslation();

  const isApplicationAccepted = application.status === OPPORTUNITY_APPLICATION_STATUS.ACCEPTED;

  const handleChangeStatus = () => {
    updateApplicationStatus(
      params.applicationId,
      isApplicationAccepted
        ? OPPORTUNITY_APPLICATION_STATUS.REJECTED
        : OPPORTUNITY_APPLICATION_STATUS.ACCEPTED
    );
  };

  return (
    <div className='flex justify-center items-center h-full'>
      <EmptyState
        heading={t('opportunityManageApplications.details.automaticAcceptanceHeading')}
        icon={<AutomaticAcceptanceImage />}>
        <div className='w-[380px]'>
          <p className='text-center text-xs leading-lg'>
            {t('opportunityManageApplications.details.automaticAcceptanceInfo')}
          </p>
          <div className='border-neutral-300 border rounded-sm p-sm flex items-center mb-sm'>
            <SharedAvatar className='me-xs' label={application.student.fullName} size='32' />
            <span className='font-medium text-xs me-auto'>{application.student.fullName}</span>
            <Badge type={isApplicationAccepted ? 'primary' : 'danger'}>
              {isApplicationAccepted
                ? t('opportunityManageApplications.list.applicationStatus.accepted')
                : t('opportunityManageApplications.list.applicationStatus.rejected')}
            </Badge>
          </div>
          <div className='flex justify-center'>
            <SharedButton variant='link' onClick={handleChangeStatus}>
              <IconContainer
                Icon={isApplicationAccepted ? ThumbsDownIcon : ThumbsUpIcon}
                className='me-xs'
                paddingSize='none'
                size='sm'
              />
              {isApplicationAccepted
                ? t('opportunityManageApplications.details.automaticAcceptanceActionReject')
                : t('opportunityManageApplications.details.automaticAcceptanceActionAccept')}
            </SharedButton>
          </div>
        </div>
      </EmptyState>
    </div>
  );
};
