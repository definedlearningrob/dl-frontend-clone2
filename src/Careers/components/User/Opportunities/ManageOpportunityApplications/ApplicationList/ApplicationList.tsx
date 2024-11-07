import { useTranslation } from 'react-i18next';
import cx from 'classnames';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

import SharedTable from '@dc/shared/Table/Table';
import { TOpportunityApplication } from '@dc/resources/types';
import { useOpportunityApplicationQuery } from '@dc/graphql/user/hooks/useOpportunityApplicationQuery';

import Avatar from '@shared/components/Avatar/Avatar';
import { formatDateTime, parseDate } from '@shared/utils/date';
import { Badge } from '@shared/components/Badge/Badge';
import useQueryParams from '@shared/hooks/useQueryParams';
import { Tooltip } from '@shared/components/Tooltip';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';

import styles from './ApplicationList.module.sass';

type RowData = {
  opportunityId: string;
  id: string;
  student: {
    fullName: string;
    uuid: string;
  };
  appliedAt: string;
  status: string;
};

type Props = {
  studentNameFilter: string;
};

export const ApplicationList = ({ studentNameFilter }: Props) => {
  const { t } = useTranslation();
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });
  const { id } = useParams<{ id: string }>();
  const [currentPage, setCurrentPage] = useState(1);

  const { data, fetchMore } = useOpportunityApplicationQuery({
    id,
    filter: { studentFullNameCont: studentNameFilter },
  });

  const applicationsWithFallback = data?.opportunity.filteredApplications.nodes || [];

  const { params, updateQueryParams } = useQueryParams<{ applicationId: string }>();

  const headers = [
    { title: t('opportunityManageApplications.list.studentName') },
    { title: t('opportunityManageApplications.list.status') },
    { title: t('opportunityManageApplications.list.applicationDate') },
  ];

  const getSelectedRowIndex = () => {
    const applicationIndex = applicationsWithFallback.findIndex(
      (application: TOpportunityApplication) => application.id === params.applicationId
    );

    return applicationIndex === -1 ? 0 : applicationIndex;
  };

  const tableConstants = [
    {
      render: (rowData: TOpportunityApplication) => {
        const studentNameClassName = cx(styles.studentNameWrapper, {
          'text-white': rowData.id === params.applicationId,
        });

        return (
          <div className={studentNameClassName}>
            <Avatar
              className={styles.image}
              label={rowData.student.fullName}
              size={isFullHD ? '40' : '32'}
            />
            <div className='text-xs xxxl:text-sm font-medium'>{rowData.student.fullName}</div>
          </div>
        );
      },
    },
    {
      render: (rowData: RowData) => {
        let badgeType: 'primary' | 'secondary' | 'danger' = 'secondary';
        let badgeLabel: string = '';

        switch (rowData.status) {
          case 'PENDING':
            badgeType = 'secondary';
            badgeLabel = t('opportunityManageApplications.list.applicationStatus.pending');
            break;
          case 'ACCEPTED':
            badgeType = 'primary';
            badgeLabel = t('opportunityManageApplications.list.applicationStatus.accepted');
            break;
          case 'REJECTED':
            badgeType = 'danger';
            badgeLabel = t('opportunityManageApplications.list.applicationStatus.rejected');
        }

        return <Badge type={badgeType}>{badgeLabel}</Badge>;
      },
    },
    {
      render: (rowData: RowData) => {
        const dateClassName = cx('text-xs xxxl:text-sm', {
          'text-white': rowData.id === params.applicationId,
        });

        return (
          <Tooltip message={formatDateTime(rowData.appliedAt, { withTime: true })}>
            <span className={dateClassName}>{parseDate(rowData.appliedAt)}</span>
          </Tooltip>
        );
      },
    },
  ];

  const pagesCount = data?.opportunity.filteredApplications.pagesCount || 0;
  const hasNextPage = currentPage < pagesCount;

  const handleFetchMore = () => {
    const nextPage = currentPage + 1;

    fetchMore({
      variables: { filter: { studentFullNameCont: studentNameFilter }, page: nextPage },
    });

    setCurrentPage(nextPage);
  };

  return (
    <SharedTable tableClassname={styles.table} tableWrapperClassname={styles.tableWrapper}>
      <SharedTable.Head cols={headers} columnClassname={styles.tableHead} />
      <SharedTable.Body
        cols={tableConstants}
        columnClassname='flex items-center bg-inherit'
        data={applicationsWithFallback}
        fetchMore={handleFetchMore}
        hasNextPage={hasNextPage}
        rowClassname='cursor-pointer hover:bg-primary-200'
        selectedRowClassname='bg-primary-500 hover:!bg-primary-500'
        selectedRowIndex={getSelectedRowIndex()}
        onRowClick={(_, application) => updateQueryParams({ applicationId: application.id })}
      />
    </SharedTable>
  );
};
