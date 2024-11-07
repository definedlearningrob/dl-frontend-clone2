import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import isEmpty from 'lodash-es/isEmpty';

import { ApplicationRecommenderList, EmptyApplications } from '@dc/components/PostSecondary';
import { useInstitutionApplication } from '@dc/graphql/student/hooks/useInstitutionApplication';
import { InstitutionApplication } from '@dc/graphql/student/queries/institutionApplication';

import { ReactComponent as DeadlineIcon } from '@shared/svg/deadline.svg';
import { ReactComponent as CalendarIcon } from '@shared/svg/calendar.svg';
import { ReactComponent as Common } from '@shared/assets/icons/common_app.svg';
import { ReactComponent as ArrowIcon } from '@shared/assets/icons/chevron_right.svg';
import ItemWrapper from '@shared/components/ItemWrapper/ItemWrapper';
import SharedModal from '@shared/components/Modal/Modal';
import SharedIcon from '@shared/components/Icon/Icon';
import { Badge } from '@shared/components/Badge/Badge';
import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';
import { Tooltip } from '@shared/components/Tooltip';
import { formatDateTime } from '@shared/utils/date';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';

import styles from './ApplicationDetailsModal.module.sass';

type Props = {
  onCloseModal: () => void;
  isOpen: boolean;
  selectedApplication: InstitutionApplication;
};

export const ApplicationDetailsModal = ({ selectedApplication, isOpen, onCloseModal }: Props) => {
  const { t } = useTranslation();
  const { data, loading } = useInstitutionApplication(selectedApplication.id);

  const itemsCount = data?.institutionApplication.recommenders.reduce((acc, recommender) => {
    const filteredStatuses =
      recommender.formStatuses?.filter((form) =>
        ['NOT_STARTED', 'IN_PROGRESS', 'COMPLETED'].includes(form.status)
      ) || [];

    return acc + filteredStatuses.length;
  }, 0) as number;

  const applicationDate = data?.institutionApplication.appliedAt;
  const deadline = data?.institutionApplication.deadline;

  return (
    <SharedModal className={styles.applicationModal} isOpen={isOpen} onDismiss={onCloseModal}>
      <SharedModal.Header className={styles.modalHeader}>
        <div>
          <div className={styles.heading}>
            <ItemWrapper.Kicker>
              {t('student.postSecondary.applicationsSection.modal.heading')}
            </ItemWrapper.Kicker>
          </div>
          <SharedModal.Heading>
            <Link
              key='content'
              className='flex items-center text-primary-500 leading-sm weight-bold cursor-pointer gap-xxxs hover:gap-xs transition-all duration-250'
              to={`/post-secondary/institutions/${selectedApplication.institution.id}`}>
              {selectedApplication.name}
              <ArrowIcon />
            </Link>
          </SharedModal.Heading>
          <div className='flex items-center gap-sm pt-x'>
            {applicationDate && (
              <>
                <Tooltip
                  message={t('student.postSecondary.applicationsSection.applicationDate', {
                    date: formatDateTime(applicationDate, { withTime: true }),
                  })}>
                  <div className='flex items-center'>
                    <IconContainer
                      Icon={CalendarIcon}
                      className='me-xxs'
                      paddingSize='none'
                      size='sm'
                    />
                    <div className='text-xs'>{formatDateTime(applicationDate)}</div>
                  </div>
                </Tooltip>
                <div className={styles.actionDot} />
              </>
            )}
            {deadline && (
              <>
                <Tooltip
                  message={t('student.postSecondary.applicationsSection.deadline', {
                    date: formatDateTime(deadline, { withTime: true }),
                  })}>
                  <div className='flex items-center'>
                    <IconContainer
                      Icon={DeadlineIcon}
                      className='me-xxs !text-neutral-800'
                      paddingSize='none'
                      size='sm'
                    />
                    <span className='text-xs'>{formatDateTime(deadline)}</span>
                  </div>
                </Tooltip>
                <div className={styles.actionDot} />
              </>
            )}
            <Tooltip
              className={styles.iconTooltip}
              message={t('student.postSecondary.applicationsSection.tooltipCommonApp')}>
              <SharedIcon icon={<Common />} />
            </Tooltip>
            <div className={styles.actionDot} />
            {itemsCount && (
              <Badge type='secondary'>
                {t('student.postSecondary.applicationsSection.modal.actionItems', { itemsCount })}
              </Badge>
            )}
          </div>
        </div>
      </SharedModal.Header>
      <SharedModal.Body className={styles.modalBody}>
        {loading && <SharedLoadingSpinner color='primary' size='medium' />}
        {isEmpty(data) && !loading && (
          <EmptyApplications
            text={t('student.postSecondary.applicationsSection.emptyText')}
            title={t('student.postSecondary.applicationsSection.emptyTitle')}
          />
        )}
        {data && <ApplicationRecommenderList selectedApplication={selectedApplication} />}
      </SharedModal.Body>
      <SharedModal.Footer className={styles.modalFooter}>
        <SharedModal.Button variant='primary' onClick={onCloseModal}>
          {t('common.actions.close')}
        </SharedModal.Button>
      </SharedModal.Footer>
    </SharedModal>
  );
};
