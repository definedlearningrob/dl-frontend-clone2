import { useTranslation, Trans } from 'react-i18next';
import cx from 'classnames';

import { TOpportunityApplication } from '@dc/resources/types';
import { OPPORTUNITY_APPLICATION_STATUS } from '@dc/resources/enums';
import { ReactComponent as ThumbsUpIcon } from '@dc/assets/icons/thumbs-up.svg';
import { ReactComponent as ThumbsDownIcon } from '@dc/assets/icons/thumbs-down.svg';
import { AcceptedStatuses } from '@dc/graphql/user/hooks/useUpdateOpportunityApplication';

import { ReactComponent as ClearIcon } from '@shared/assets/icons/clear.svg';
import Dropdown from '@shared/components/Dropdown/Dropdown';
import Icon from '@shared/components/Icon/Icon';

type Props = {
  application: TOpportunityApplication;
  onStatusChange: (status: AcceptedStatuses) => void;
  onResetApplication: () => void;
};

export const ApplicationRatingInfo = ({
  application,
  onStatusChange,
  onResetApplication,
}: Props) => {
  const applicationStatus = application.status;
  const { t } = useTranslation();
  const isApplicationAccepted = applicationStatus === OPPORTUNITY_APPLICATION_STATUS.ACCEPTED;
  const isApplicationRejected = applicationStatus === OPPORTUNITY_APPLICATION_STATUS.REJECTED;

  const statusIconClassName = cx('p-xs rounded-full', {
    'bg-success-100 text-success-500': isApplicationAccepted,
    'bg-danger-100 text-danger-500': isApplicationRejected,
  });
  const handleDropdownOption = () =>
    onStatusChange(
      isApplicationAccepted
        ? OPPORTUNITY_APPLICATION_STATUS.REJECTED
        : OPPORTUNITY_APPLICATION_STATUS.ACCEPTED
    );

  return (
    <>
      <Icon
        className={statusIconClassName}
        icon={isApplicationAccepted ? <ThumbsUpIcon /> : <ThumbsDownIcon />}
      />
      <div>
        <h5 className='text-primary-500 font-medium leading-lg text-xxs xxxl:text-sm mb-0'>
          {isApplicationAccepted
            ? t('opportunityManageApplications.details.acceptedInfo')
            : t('opportunityManageApplications.details.rejectedInfo')}
        </h5>
        <span className='text-neutral-700 text-xxs leading-lg mb-0 xxxl:text-xs'>
          <Trans
            i18nKey={
              isApplicationAccepted
                ? 'opportunityManageApplications.details.statusAccepted'
                : 'opportunityManageApplications.details.statusRejected'
            }
            values={{
              studentName: application.student.fullName,
              teacherName: application.lastChangedBy?.name,
            }}
          />
        </span>
      </div>
      <div className='ms-auto hover:rounded-xs hover:border hover:border-primary-500 focus:outline-1 focus:outline-primary-500 focus:outline-offset-1'>
        <Dropdown position='top'>
          <Dropdown.Dropdown>
            <Dropdown.Trigger />
            <Dropdown.Options>
              <Dropdown.Option onClick={handleDropdownOption}>
                <Icon
                  className='text-neutral-800'
                  icon={isApplicationAccepted ? <ThumbsDownIcon /> : <ThumbsUpIcon />}
                  size='xs'
                />
                <span className='text-neutral-800'>
                  {isApplicationAccepted
                    ? t('opportunityManageApplications.details.actionReject')
                    : t('opportunityManageApplications.details.actionAccept')}
                </span>
              </Dropdown.Option>
              <Dropdown.Option onClick={onResetApplication}>
                <Icon className='text-danger-600' icon={<ClearIcon />} size='xs' />
                <span className='text-danger-600'>
                  {t('opportunityManageApplications.details.actionCancel')}
                </span>
              </Dropdown.Option>
            </Dropdown.Options>
          </Dropdown.Dropdown>
        </Dropdown>
      </div>
    </>
  );
};
