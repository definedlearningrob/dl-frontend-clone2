import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { TOpportunityApplication } from '@dc/resources/types';
import { ConversationContextTypes } from '@dc/resources/enums';

import { ReactComponent as SendOutlinedIcon } from '@shared/svg/send_outlined.svg';
import { Tooltip } from '@shared/components/Tooltip';
import { formatDateTime, parseDate } from '@shared/utils/date';
import DeprecatedIconButton from '@shared/components/DeprecatedIconButton/DeprecatedIconButton';
import Link from '@shared/components/Link';
import { useMessaging } from '@shared/hooks/useMessaging';

import styles from './DetailsHeader.module.sass';

type Props = {
  selectedApplication: TOpportunityApplication;
  opportunityName: string;
};

export const DetailsHeader = ({ selectedApplication, opportunityName }: Props) => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const { messagingState, setMessagingState } = useMessaging();

  const applicationHeaderClassName =
    'flex justify-between items-center col-gap-md py-sm px-base border-b border-b-neutral-300 xxxl:py-base xxxl:px-md';

  const toggleMessagingModal = () => {
    setMessagingState({
      ...messagingState,
      show: !messagingState.show,
      receiver: {
        ...selectedApplication.student,
        name: selectedApplication.student.fullName,
      },
      actionContext: {
        id,
        type: ConversationContextTypes.OPPORTUNITY,
        title: opportunityName,
      },
    });
  };

  return (
    <div className={applicationHeaderClassName}>
      <div>
        <h4 className='text-sm mb-xxs xxxl:text-base'>
          {t('opportunityManageApplications.detailsHeader.heading')}
        </h4>
        <div className='flex items-center gap-xs'>
          <Link
            className={styles.link}
            linkClassName='inline-block'
            to={`/students/${selectedApplication.student.uuid}/portfolio`}
            variant='link'>
            {selectedApplication.student.fullName}
          </Link>
          <div className='h-xxs w-xxs bg-neutral-300 rounded-lg' />
          <span className='whitespace-nowrap text-xs'>
            <Tooltip
              className='inline'
              message={formatDateTime(selectedApplication.appliedAt, {
                withTime: true,
              })}>
              {parseDate(selectedApplication.appliedAt)}
            </Tooltip>
          </span>
        </div>
      </div>
      <DeprecatedIconButton
        aria-label={t('messaging.new.send')}
        className='p-xs'
        icon={<SendOutlinedIcon />}
        iconSize='sm'
        size='md'
        square={true}
        variant='primary'
        onClick={toggleMessagingModal}
      />
    </div>
  );
};
