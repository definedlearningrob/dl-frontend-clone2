import { ChangeEvent, ReactNode, useState } from 'react';
import { isEmpty } from 'lodash-es';
import { useToggle } from 'react-use';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { match } from 'ts-pattern';

import { ApplicationStatusSelector } from '@dc/components/PostSecondary/Applications/ApplicationStatusSelector/ApplicationStatusSelector';
import SharedTable from '@dc/shared/Table/Table';
import { APPLICATIONS_TYPE, INSTITUTION_APPLICATION_STATUS } from '@dc/resources/enums';
import { ApplicationDetailsModal, EmptyApplications } from '@dc/components/PostSecondary';
import { RecommendersModal } from '@dc/components/Student/ApplicationsManagement/RecommendersModal';
import { useInstitutionApplications } from '@dc/graphql/student/hooks/useInstitutionApplications';
import { TableDateCell } from '@dc/shared/TableDateCell/TableDateCell';
import { InstitutionApplication } from '@dc/graphql/student/queries/institutionApplications';
import {
  checkIfCanBeMovedToCommonApp,
  checkIfHasEnoughTeachers,
} from '@dc/components/PostSecondary/helpers';
import { InstitutionApplicationActionsCell } from '@dc/components/PostSecondary/InstitutionApplicationActionsCell/InstitutionApplicationActionsCell';
import useUserInfo from '@dc/hooks/useUserInfo';
import { TStudentInfo } from '@dc/graphql/student/queries/userInfo';

import LoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';
import TableBodyLoader from '@shared/components/TableBodyLoader/TableBodyLoader';
import { Badge } from '@shared/components/Badge/Badge';
import { ReactComponent as CommonAppIcon } from '@shared/svg/common_app.svg';
import { Tooltip } from '@shared/components/Tooltip';
import { formatDateTime } from '@shared/utils/date';
import { Kicker } from '@shared/components/Kicker';

import styles from './Applications.module.sass';

type Props = {
  actions?: ReactNode;
  showRefreshApplicationListButton?: boolean;
};

export const Applications = ({ actions }: Props) => {
  const { t } = useTranslation();
  const [isApplicationDetailsModalOpen, toggleApplicationDetailsModalOpen] = useToggle(false);
  const [isRecommenderModalOpen, toggleIsRecommenderModalOpen] = useToggle(false);
  const { data, loading } = useInstitutionApplications();
  const [selectedApplication, setSelectedApplication] = useState<InstitutionApplication | null>();
  const history = useHistory();

  const {
    userInfo: {
      commonAppData: { hasAccountConnected },
    },
  } = useUserInfo<TStudentInfo>();

  const headers = [
    { title: t('student.postSecondary.applicationsSection.futureName') },
    { title: t('student.postSecondary.applicationsSection.dateApplied') },
    { title: t('student.postSecondary.applicationsSection.applicationMethod') },
    { title: t('student.postSecondary.applicationsSection.status') },
    { title: '' },
  ];

  if (loading) {
    return (
      <div className={styles.loaderContainer}>
        <LoadingSpinner color='primary' size='small' />
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const {
    institutionApplications: { nodes: institutionApplications },
  } = data;

  const handleRowClick = (item: InstitutionApplication, event: ChangeEvent<HTMLInputElement>) => {
    if (item.type === APPLICATIONS_TYPE.DIRECT) {
      return history.push(`/post-secondary/institutions/${item.institution.id}`);
    }

    setSelectedApplication(item);

    const chooseRecommenderAction =
      event.target.nodeName === 'BUTTON' || event.target?.parentNode?.nodeName === 'BUTTON';

    if (!chooseRecommenderAction) {
      toggleApplicationDetailsModalOpen();
    }
  };

  const handleOpenRecommenderModal = (application: InstitutionApplication) => {
    setSelectedApplication(application);
    toggleIsRecommenderModalOpen();
  };

  const tableConstants = [
    {
      render: (rowData: InstitutionApplication) => {
        const isCommonAppApplication = rowData.type === APPLICATIONS_TYPE.COMMON_APP;

        const needToChooseTeacher =
          hasAccountConnected && isCommonAppApplication && !checkIfHasEnoughTeachers(rowData);

        const needsAttention =
          needToChooseTeacher || checkIfCanBeMovedToCommonApp(rowData, hasAccountConnected);

        return (
          <div>
            {needsAttention && (
              <Kicker className={styles.pendingLabel} size='sm' variant='secondary'>
                {t('student.postSecondary.applicationsSection.needsAttention')}
              </Kicker>
            )}
            <span className={styles.name}>{rowData.name}</span>
          </div>
        );
      },
    },
    {
      render: (rowData: InstitutionApplication) => (
        <Tooltip
          disabled={!rowData.appliedAt}
          message={formatDateTime(rowData.appliedAt, { withTime: true })}>
          <TableDateCell date={rowData.appliedAt} />
        </Tooltip>
      ),
    },
    {
      render: (rowData: InstitutionApplication) => {
        const applicationMethod =
          rowData.type === APPLICATIONS_TYPE.DIRECT ? (
            t('student.postSecondary.applicationsSection.directApplication')
          ) : (
            <CommonAppIcon />
          );

        return <span className={styles.applicationMethod}>{applicationMethod}</span>;
      },
    },
    {
      render: (rowData: InstitutionApplication) => {
        const { badgeType, badgeLabel } = match(rowData.status)
          .with(INSTITUTION_APPLICATION_STATUS.IN_PROGRESS, () => ({
            badgeType: 'secondary' as const,
            badgeLabel: t('student.postSecondary.applicationsSection.inProgress'),
          }))
          .with(INSTITUTION_APPLICATION_STATUS.COMPLETED, () => ({
            badgeType: 'success' as const,
            badgeLabel: t('student.postSecondary.applicationsSection.readyToSend'),
          }))
          .with(
            INSTITUTION_APPLICATION_STATUS.DOWNLOADED,
            INSTITUTION_APPLICATION_STATUS.SUBMITTED,
            () => ({
              badgeType: 'success' as const,
              badgeLabel: t('student.postSecondary.applicationsSection.completed'),
            })
          )
          .otherwise(() => ({
            badgeType: 'neutral' as const,
            // This item below gets type 'any' for some reason that's why it has "as string"
            badgeLabel: t('student.postSecondary.applicationsSection.notStarted') as string,
          }));

        const isDirectApplication = rowData.type === APPLICATIONS_TYPE.DIRECT;
        const isCommonAppApplication = rowData.type === APPLICATIONS_TYPE.COMMON_APP;

        return (
          <div className={styles.statusColumn}>
            <>
              {isCommonAppApplication && (
                <div className={styles.badgeWrapper}>
                  <Badge type={badgeType}>{badgeLabel}</Badge>
                </div>
              )}
              {isDirectApplication && (
                <div onClick={(event) => event.stopPropagation()}>
                  <ApplicationStatusSelector
                    currentStatus={rowData.status}
                    institutionApplicationId={rowData.id}
                  />
                </div>
              )}
            </>
          </div>
        );
      },
    },
    {
      render: (rowData: InstitutionApplication) => (
        <InstitutionApplicationActionsCell
          rowData={rowData}
          onChooseTeacher={handleOpenRecommenderModal}
        />
      ),
    },
  ];

  const handleCloseApplicationDetailsModal = () => {
    setSelectedApplication(null);
    toggleApplicationDetailsModalOpen();
  };

  const handleCloseRecommendersModal = () => {
    setSelectedApplication(null);
    toggleIsRecommenderModalOpen();
  };

  const getIsRowDisabled = (index: number) => {
    if (institutionApplications[index].type === APPLICATIONS_TYPE.DIRECT) {
      return false;
    }

    const application = institutionApplications[index];

    return isEmpty(application.recommenders);
  };

  return (
    <div className='flex flex-col h-full'>
      <div className='flex justify-between mb-sm items-center px-base pt-base xxxl:px-md xxxl:pt-md'>
        <div className='flex flex-col gap-xs'>
          <h5 className={styles.heading}>
            {t('student.postSecondary.applicationsSection.heading')}
          </h5>
        </div>
        {actions}
      </div>
      {isEmpty(institutionApplications) && <EmptyApplications />}
      {!isEmpty(institutionApplications) && (
        <div className={styles.applications}>
          <SharedTable tableClassname='!h-full'>
            <SharedTable.Head cols={headers} columnClassname={styles.tableHead} />
            {loading && <TableBodyLoader />}
            {!loading && (
              <SharedTable.Body
                cols={tableConstants}
                columnClassname={styles.tableColumn}
                data={institutionApplications}
                isRowDisabled={getIsRowDisabled}
                rowClassname={styles.tableRow}
                onRowClick={(index, item, event) => handleRowClick(item, event)}
              />
            )}
          </SharedTable>
        </div>
      )}
      {!isEmpty(selectedApplication) && (
        <>
          <ApplicationDetailsModal
            isOpen={isApplicationDetailsModalOpen}
            selectedApplication={selectedApplication}
            onCloseModal={handleCloseApplicationDetailsModal}
          />
        </>
      )}
      {isRecommenderModalOpen && selectedApplication && (
        <RecommendersModal
          closeModal={handleCloseRecommendersModal}
          isOpen={isRecommenderModalOpen}
          selectedApplication={selectedApplication}
        />
      )}
    </div>
  );
};
