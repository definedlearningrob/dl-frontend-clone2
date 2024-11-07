import { Trans, useTranslation } from 'react-i18next';
import { useMemo, useRef } from 'react';
import { useUpdateEffect } from 'react-use';
import { OpportunityApplicationResult } from '@graphql/dc/shared/types';
import { isNumber, omit } from 'lodash-es';
import {
  GenerateOpportunityReportDocument,
  OpportunityReportCsvDocument,
} from '@graphql/dc/users/hooks';
import dayjs from 'dayjs';
import { CellContext } from '@tanstack/react-table';

import { useOpportunityResults } from '@dc/screens/UserApp/OpportunityReport/OpportunityTable/useOpportunityResults';
import { useOpportunityReportFilters } from '@dc/components/OpportunityReport/useOpportunityReportFilters';
import { ClustersCell } from '@dc/screens/UserApp/OpportunityReport/OpportunityTable/ClustersCell';
import { PathwaysCell } from '@dc/screens/UserApp/OpportunityReport/OpportunityTable/PathwaysCell';
import { OpportunityTableFilters } from '@dc/screens/UserApp/OpportunityReport/OpportunityTable/OpportunityTableFilters';

import { ReactComponent as DoneIcon } from '@shared/svg/done.svg';
import { ReactComponent as DownloadIcon } from '@shared/svg/download_to.svg';
import {
  NewTable,
  OnTableStateChangeParams,
  TableColumns,
  NewTableRef,
} from '@shared/components/NewTable/NewTable';
import Button from '@shared/components/Button/Button';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { useFileDownload } from '@shared/hooks/useFileDownload';
import { useReportGenerator } from '@shared/hooks/useReportGenerator';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';

export type OpportunityTableData = Omit<
  OpportunityApplicationResult,
  | 'applicationStatus'
  | 'opportunityType'
  | 'applicationDeadline'
  | 'checkInsSubmitted'
  | 'checkInsToSubmit'
  | 'assignmentsSubmitted'
  | 'assignmentsToSubmit'
> & {
  applicationStatus: string;
  opportunityType: string;
  applicationDeadline: string;
  checkInsCount: string;
  assignmentsCount: string;
};

export const OpportunityFullData = () => {
  const { t } = useTranslation();
  const tableApiRef = useRef<NewTableRef | null>(null);
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });
  const { variables } = useOpportunityReportFilters();
  const { data, refetch } = useOpportunityResults();
  const { setFileToDownload, fileToDownload } = useFileDownload();
  const { generateReport, loading: isReportGenerating } = useReportGenerator();

  const rawData = data?.reports?.opportunityReport?.results?.nodes || [];

  const parsedData = useMemo(
    () =>
      rawData.map((item) => ({
        ...item,
        applicationStatus: t(`opportunitiesReport.statuses.${item.applicationStatus}`),
        opportunityType: t(`opportunitiesReport.opportunityTypes.${item.opportunityType}`),
        applicationDeadline: item.applicationDeadline
          ? dayjs(item.applicationDeadline).format('MM/DD/YYYY')
          : t('opportunitiesReport.fullDataTable.notApplicable'),
        checkInsCount: isNumber(item.checkInsToSubmit)
          ? `${item.checkInsSubmitted}/${item.checkInsToSubmit}`
          : t('opportunitiesReport.fullDataTable.notApplicable'),
        assignmentsCount: isNumber(item.assignmentsToSubmit)
          ? `${item.assignmentsSubmitted}/${item.assignmentsToSubmit}`
          : t('opportunitiesReport.fullDataTable.notApplicable'),
      })),
    [rawData]
  );

  useUpdateEffect(() => {
    if (fileToDownload?.mutation) {
      generateReport();
    }
  }, [fileToDownload?.mutation]);

  const columns: TableColumns<OpportunityTableData> = useMemo(
    () => [
      {
        accessorKey: 'studentSisId',
        header: t('opportunitiesReport.fullDataTable.id'),
        size: 60,
        meta: { ellipsis: true },
      },
      {
        accessorKey: 'studentName',
        cell: (params) => <span className='break-words'>{params.getValue()}</span>,
        header: t('opportunitiesReport.fullDataTable.name'),
        size: 80,
      },
      {
        accessorKey: 'studentGradeLevel',
        header: t('opportunitiesReport.fullDataTable.gradeLevel'),
        size: isFullHD ? 52 : 50,
      },
      {
        accessorKey: 'opportunityName',
        header: t('opportunitiesReport.fullDataTable.opportunityName'),
        meta: { ellipsis: true },
      },
      {
        accessorKey: 'opportunityType',
        header: t('opportunitiesReport.fullDataTable.opportunityType'),
        size: isFullHD ? 90 : 85,
      },

      {
        accessorKey: 'clusterNames',
        cell: ClustersCell,
        header: t('opportunitiesReport.fullDataTable.clusters'),
        size: 80,
      },
      {
        accessorKey: 'pathwayNames',
        cell: PathwaysCell,
        header: t('opportunitiesReport.fullDataTable.pathways'),
        size: 80,
      },
      {
        accessorKey: 'isFavorite',
        cell: (params: CellContext<OpportunityTableData, unknown>) => {
          if (params.getValue()) {
            return <IconContainer Icon={DoneIcon} />;
          }

          return null;
        },
        header: t('opportunitiesReport.fullDataTable.isFavorite'),
        meta: {
          className: 'flex justify-center',
        },
        size: isFullHD ? 60 : 65,
      },
      {
        accessorKey: 'applicationStatus',
        header: t('opportunitiesReport.fullDataTable.applicationStatus'),
        meta: { ellipsis: true },
        size: isFullHD ? 90 : 80,
      },
      {
        accessorKey: 'applicationDeadline',
        header: t('opportunitiesReport.fullDataTable.applicationDeadline'),
        meta: { ellipsis: true },
        size: isFullHD ? 90 : 80,
      },
      {
        accessorKey: 'checkInsCount',
        header: t('opportunitiesReport.fullDataTable.checkinsSubmitted'),
        meta: { ellipsis: true },
        size: isFullHD ? 90 : 80,
      },
      {
        accessorKey: 'assignmentsCount',
        header: t('opportunitiesReport.fullDataTable.assignmentsSubmitted'),
        meta: { ellipsis: true },
        size: 90,
      },
    ],
    []
  );

  const results = data?.reports?.opportunityReport?.results;

  const handleTableStateChange = ({ pagination }: OnTableStateChangeParams) => {
    refetch({
      page: pagination.pageIndex + 1,
      perPage: pagination.pageSize,
    });
  };

  const handleDownloadCSV = () => {
    setFileToDownload({
      mutation: GenerateOpportunityReportDocument,
      query: OpportunityReportCsvDocument,
      variables: {
        ...omit(variables.filter, 'schoolYear'),
        schoolYear: variables.filter.schoolYear,
      },
    });
  };

  return (
    <>
      <div className='mb-sm xxxl:mb-base flex justify-between items-end'>
        <div className='flex flex-col gap-xs'>
          <h5 className='inline me-xs text-sm xxxl:text-base mb-0'>
            <Trans
              components={{
                neutralText: <span className='text-neutral-600' />,
              }}
              i18nKey='opportunitiesReport.fullDataTable.fullData'
              values={{ count: results?.nodesCount || 0 }}
            />
          </h5>
          <p className='text-neutral-700 text-xs xxxl:text-sm mb-0'>
            {t('opportunitiesReport.fullDataTable.fullDataDescription')}
          </p>
        </div>
        <Button
          Icon={DownloadIcon}
          disabled={!!fileToDownload?.id}
          isLoading={isReportGenerating}
          size={isFullHD ? 'md' : 'sm'}
          type='button'
          variant='primary-outlined'
          onClick={handleDownloadCSV}>
          {t('common.actions.downloadCSV')}
        </Button>
      </div>
      <div className='border border-neutral-300 rounded-sm mb-base'>
        <OpportunityTableFilters />
        <div className='border border-neutral-300 rounded-b-sm h-[512px] xxxl:h-[576px] overflow-auto'>
          <NewTable
            apiRef={tableApiRef}
            columns={columns}
            data={parsedData || []}
            enableRowSelection={false}
            nodesCount={results?.nodesCount}
            pagesCount={results?.pagesCount}
            onTableStateChange={handleTableStateChange}
          />
        </div>
      </div>
    </>
  );
};
