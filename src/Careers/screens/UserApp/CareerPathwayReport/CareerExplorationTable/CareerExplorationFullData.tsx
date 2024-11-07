import { Trans, useTranslation } from 'react-i18next';
import { useMemo, useRef } from 'react';
import { useUpdateEffect } from 'react-use';
import { PathwayVisitResult } from '@graphql/dc/shared/types';
import { omit } from 'lodash-es';
import {
  GenerateCareerExplorationReportDocument,
  CareerExplorationReportDocument,
} from '@graphql/dc/users/hooks';

import { useCareerExplorationResults } from '@dc/screens/UserApp/CareerPathwayReport/CareerExplorationTable/useCareerExplorationResults';
import { CareerExplorationTableFilters } from '@dc/screens/UserApp/CareerPathwayReport/CareerExplorationTable/CareerExplorationTableFilters';
import { useCareerExplorationReportFilters } from '@dc/components/CareerPathwayReport/useCareerExplorationReportFilters';
import { PathwaysCell } from '@dc/screens/UserApp/CareerPathwayReport/CareerExplorationTable/PathwaysCell';
import { ClustersCell } from '@dc/screens/UserApp/CareerPathwayReport/CareerExplorationTable/ClustersCell';

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

export const CareerExplorationFullData = () => {
  const { t } = useTranslation();
  const tableApiRef = useRef<NewTableRef | null>(null);
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });
  const { variables } = useCareerExplorationReportFilters();
  const { data, refetch } = useCareerExplorationResults();
  const { setFileToDownload, fileToDownload } = useFileDownload();
  const { generateReport, loading: isReportGenerating } = useReportGenerator();

  useUpdateEffect(() => {
    if (fileToDownload?.mutation) {
      generateReport();
    }
  }, [fileToDownload?.mutation]);

  const columns: TableColumns<PathwayVisitResult> = useMemo(
    () => [
      {
        accessorKey: 'visitorSisId',
        header: t('careerExplorationReport.fullDataTable.id'),
        size: 60,
        meta: { ellipsis: true },
      },
      {
        accessorKey: 'visitorName',
        header: t('careerExplorationReport.fullDataTable.name'),
        cell: (params) => <span className='break-words'>{params.getValue()}</span>,
        size: 80,
      },
      {
        accessorKey: 'visitorEmail',
        meta: { ellipsis: true },
        size: 60,
        header: t('careerExplorationReport.fullDataTable.email'),
      },
      {
        size: 60,
        accessorKey: 'visitorType',
        header: t('careerExplorationReport.fullDataTable.visitorType'),
      },
      {
        accessorKey: 'resourceName',
        header: t('careerExplorationReport.fullDataTable.resourceName'),
        size: 120,
      },
      {
        accessorKey: 'resourceType',
        header: t('careerExplorationReport.fullDataTable.resourceType'),
        size: 80,
      },
      {
        accessorKey: 'clusterNames',
        header: t('careerExplorationReport.fullDataTable.clusters'),
        cell: ClustersCell,
      },
      {
        accessorKey: 'pathwayNames',
        header: t('careerExplorationReport.fullDataTable.pathways'),
        size: 80,
        cell: PathwaysCell,
      },
      {
        accessorKey: 'isEnrolled',
        header: t('careerExplorationReport.fullDataTable.enrolled'),
        cell: (params) => {
          if (params.getValue()) {
            return <IconContainer Icon={DoneIcon} />;
          }

          return null;
        },
        size: 60,
      },
      {
        accessorKey: 'visitsCount',
        header: t('careerExplorationReport.fullDataTable.visitsCount'),
        size: 60,
      },
    ],
    []
  );

  const results = data?.reports?.pathwayReport?.visitResults;

  const handleTableStateChange = ({ pagination }: OnTableStateChangeParams) => {
    refetch({
      page: pagination.pageIndex + 1,
      perPage: pagination.pageSize,
    });
  };

  const handleDownloadCSV = () => {
    setFileToDownload({
      mutation: GenerateCareerExplorationReportDocument,
      query: CareerExplorationReportDocument,
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
              i18nKey='careerExplorationReport.fullDataTable.fullData'
              values={{ count: results?.nodesCount || 0 }}
            />
          </h5>
          <p className='text-neutral-700 text-xs xxxl:text-sm mb-0'>
            {t('careerExplorationReport.fullDataTable.fullDataDescription')}
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
        <CareerExplorationTableFilters />
        <div className='border border-neutral-300 rounded-b-sm h-[512px] xxxl:h-[576px] overflow-auto'>
          <NewTable
            apiRef={tableApiRef}
            columns={columns}
            data={results?.nodes || []}
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
