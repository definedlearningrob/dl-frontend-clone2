import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';

import { ReactComponent as ThumbsUpIcon } from '@dc/assets/icons/thumbs-up.svg';
import { ReactComponent as ThumbsDownIcon } from '@dc/assets/icons/thumbs-down.svg';
import {
  AcceptedStatuses,
  useUpdateOpportunityApplication,
} from '@dc/graphql/user/hooks/useUpdateOpportunityApplication';
import { OPPORTUNITY_APPLICATION_STATUS } from '@dc/resources/enums';
import { TOpportunityApplications } from '@dc/graphql/user/queries/opportunityApplications';
import { ApplicationRatingInfo } from '@dc/components/User/Opportunities/ManageOpportunityApplications/ApplicationRatingInfo/ApplicationRatingInfo';
import { TOpportunityApplication } from '@dc/resources/types';

import useQueryParams from '@shared/hooks/useQueryParams';
import SharedButton from '@shared/components/Button/Button';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';

import styles from './ApplicationDetails.module.sass';

type Props = {
  opportunity: TOpportunityApplications;
  application: TOpportunityApplication;
};

export const ApplicationDetails = ({ opportunity, application }: Props) => {
  const { params } = useQueryParams<{ applicationId: string }>();
  const { updateApplicationStatus } = useUpdateOpportunityApplication();
  const isDesktop = useBreakpointUp({ breakpoint: 'xxxl' });
  const { t } = useTranslation();

  const questions = opportunity.questions;

  if (!application) return null;

  const applicationDetails = questions.map(({ question, id }) => {
    const answer = application.answers.find(
      ({ opportunityQuestionId }) => opportunityQuestionId === id
    );

    return { question, answer: answer?.answer || '' };
  });

  const handleStatusChange = (status: AcceptedStatuses) => {
    updateApplicationStatus(params.applicationId, status);
  };

  const handleResetApplication = useCallback(() => {
    handleStatusChange(OPPORTUNITY_APPLICATION_STATUS.PENDING);
  }, [handleStatusChange]);

  const buttonSize = isDesktop ? 'lg' : 'md';

  const hasBeenRated = [
    OPPORTUNITY_APPLICATION_STATUS.ACCEPTED,
    OPPORTUNITY_APPLICATION_STATUS.REJECTED,
  ].includes(application.status);

  return (
    <div className='flex flex-col h-full'>
      <div className={styles.details}>
        {applicationDetails.map(({ question, answer }) => (
          <div key={`question-${answer}`}>
            <h5 className='text-neutral-800 text-xs font-bold mb-xs leading-base xxxl:text-sm'>
              {question}
            </h5>
            <p className='text-neutral-700 text-xxs leading-lg mb-base xxxl:text-sm'>{answer}</p>
          </div>
        ))}
      </div>
      <div className='basis-0 pe-base xxxl:pe-md'>
        {!hasBeenRated && (
          <div className='flex gap-xs xxxl:gap-sm'>
            <SharedButton
              Icon={ThumbsUpIcon}
              className={styles.actionButton}
              size={buttonSize}
              variant='primary'
              onClick={() => handleStatusChange(OPPORTUNITY_APPLICATION_STATUS.ACCEPTED)}>
              {t('opportunityManageApplications.details.accept')}
            </SharedButton>
            <SharedButton
              Icon={ThumbsDownIcon}
              className={styles.actionButton}
              size={buttonSize}
              variant='danger'
              onClick={() => handleStatusChange(OPPORTUNITY_APPLICATION_STATUS.REJECTED)}>
              {t('opportunityManageApplications.details.reject')}
            </SharedButton>
          </div>
        )}
        {hasBeenRated && (
          <div className={styles.rateInfoWrapper}>
            <ApplicationRatingInfo
              application={application}
              onResetApplication={handleResetApplication}
              onStatusChange={handleStatusChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};
