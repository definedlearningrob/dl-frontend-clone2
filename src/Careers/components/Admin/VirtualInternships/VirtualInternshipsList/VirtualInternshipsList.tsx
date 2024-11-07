import { NetworkStatus } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { useMemo, useState, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';

import { useVirtualInternshipsQuery } from '@dc/graphql/user/hooks/useVirtualInternshipsQuery';
import SharedTable from '@dc/shared/Table/Table';

import { Tooltip } from '@shared/components/Tooltip';

import { TPathway, TVirtualInternship } from '../types';

import { VirtualInternshipActions } from './VirtualInternshipActions';
import styles from './VirtualInternshipsList.module.sass';

export const VirtualInternshipsList = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const [page, setPage] = useState(1);

  const { fetchMore, data: virtualInternshipData, networkStatus } = useVirtualInternshipsQuery();

  const parsePathwayNames = (pathways: TPathway[]) =>
    pathways.map((pathway: TPathway) => pathway.name).join(', ');

  const handleRowEdit = (event: MouseEvent<HTMLButtonElement>, id: string) => {
    event.stopPropagation();
    history.push(`/admin/virtual-internships/${id}/edit`);
  };

  const columnsConfig = useMemo(
    () => [
      {
        title: t('user.opportunities.opportunityName'),
        render: (virtualInternship: TVirtualInternship) => (
          <div className={styles.name}>{virtualInternship.opportunity.name}</div>
        ),
      },
      {
        title: t('admin.virtualInternship.pathways'),
        render: (virtualInternship: TVirtualInternship) => (
          <div className={styles.pathwaysWrapper}>
            <Tooltip message={parsePathwayNames(virtualInternship.opportunity.pathways)}>
              {parsePathwayNames(virtualInternship.opportunity.pathways)}
            </Tooltip>
          </div>
        ),
      },
      {
        title: t('admin.virtualInternship.requiredExperiences'),
        render: (virtualInternship: TVirtualInternship) => virtualInternship.requiredExperiences,
      },
      {
        title: t('admin.virtualInternship.status'),
        render: (virtualInternship: TVirtualInternship) => virtualInternship.status,
      },
      {
        title: t('sharedCommon.actions'),
        render: (virtualInternship: TVirtualInternship) => (
          <VirtualInternshipActions
            handleRowEdit={handleRowEdit}
            virtualInternship={virtualInternship}
          />
        ),
      },
    ],
    []
  );

  if (!virtualInternshipData) {
    return null;
  }

  const {
    virtualInternships: { nodes, nodesCount, pagesCount },
  } = virtualInternshipData;

  const hasNoData = nodesCount === 0 && networkStatus === NetworkStatus.ready;
  const hasNextPage = page < pagesCount;

  const handleFetchMore = () => {
    const nextPage = page + 1;

    fetchMore({ variables: { page: nextPage, infiniteScroll: true } });
    setPage(nextPage);
  };

  return (
    <>
      <SharedTable
        tableClassname={styles.table}
        tableWrapperClassname={cx({ [styles.emptyTableWrapper]: hasNoData })}>
        <SharedTable.Head
          cols={columnsConfig}
          columnClassname={styles.tableHeadCell}
          headClassname={styles.tableHead}
        />
        <SharedTable.Body
          bodyClassname={styles.tableBody}
          cols={columnsConfig}
          columnClassname={styles.tableBodyCell}
          data={nodes}
          fetchMore={handleFetchMore}
          hasNextPage={hasNextPage}
          rowClassname={styles.tableRow}
        />
      </SharedTable>
      {hasNoData && (
        <div className={styles.emptyTableMessage}>{t('admin.virtualInternship.empty')}</div>
      )}
    </>
  );
};
