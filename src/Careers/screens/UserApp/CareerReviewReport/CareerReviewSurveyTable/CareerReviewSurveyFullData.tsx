import { Trans, useTranslation } from 'react-i18next';
import {
  CareerReviewSurveyReportResult,
  CareerReviewSurveyReportResultSortColumns,
  SortOrders,
} from '@graphql/dc/users/types';
import { useMemo, useRef } from 'react';
import { useUpdateEffect } from 'react-use';
import { CareerReviewSurveyReportCsvDocument } from '@graphql/dc/users/hooks';

import generateCareerReviewSurveyReport from '@dc/graphql/user/mutations/generateCareerReviewSurveyReport';
import { SourceCell } from '@dc/screens/UserApp/CareerReviewReport/CareerReviewSurveyTable/SourceCell';
import { CareerReviewSurveyTableFilters } from '@dc/screens/UserApp/CareerReviewReport/CareerReviewSurveyTable/CareerReviewSurveyTableFilters';
import { useCareerReviewSurveyResults } from '@dc/screens/UserApp/CareerReviewReport/CareerReviewSurveyTable/useCareerReviewSurveyResults';
import { useCareerReviewSurveyReportFilters } from '@dc/components/CareerReviewSurveyReport/useCareerReviewSurveyReportFilters';
import { CareerReviewSurveySubRow } from '@dc/screens/UserApp/CareerReviewReport/CareerReviewSurveyTable/CareerReviewSurveySubRow';

import { DateCell } from '@pbl/components/User/MyProjects/List/DateCell';

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

const sortingColumnsMap = {
  studentSisId: CareerReviewSurveyReportResultSortColumns.STUDENT_SIS_ID,
  studentFullName: CareerReviewSurveyReportResultSortColumns.STUDENT_NAME,
  takenAt: CareerReviewSurveyReportResultSortColumns.TAKEN_AT,
  source: CareerReviewSurveyReportResultSortColumns.CONTEXT_TYPE,
} as const;

const DEFAULT_SORTING_STATE = [{ id: 'studentSisId', desc: true }];

export const CareerReviewSurveyFullData = () => {
  const { t } = useTranslation();
  const tableApiRef = useRef<NewTableRef | null>(null);
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });
  const { variables } = useCareerReviewSurveyReportFilters();
  const { data, refetch } = useCareerReviewSurveyResults();
  const { setFileToDownload, fileToDownload } = useFileDownload();
  const { generateReport, loading: isReportGenerating } = useReportGenerator();

  useUpdateEffect(() => {
    if (fileToDownload?.mutation) {
      generateReport();
    }
  }, [fileToDownload?.mutation]);

  const columns: TableColumns<CareerReviewSurveyReportResult> = useMemo(
    () => [
      {
        accessorKey: 'studentSisId',
        header: t('careerReviewSurveyReport.surveyReport.surveyTableHeader.id'),
        size: 40,
        enableSorting: true,
        meta: { ellipsis: true },
      },
      {
        accessorKey: 'studentName',
        header: t('careerReviewSurveyReport.surveyReport.surveyTableHeader.student'),
        size: 80,
      },
      {
        accessorKey: 'source',
        header: t('careerReviewSurveyReport.surveyReport.surveyTableHeader.context'),
        cell: (params) => <SourceCell careerSource={params.row.original} />,
        enableSorting: true,
        size: 300,
      },
      {
        accessorKey: 'takeNumber',
        size: 60,
        header: t('careerReviewSurveyReport.surveyReport.surveyTableHeader.takeNumber'),
        enableSorting: false,
      },
      {
        accessorKey: 'takenAt',
        size: 70,
        header: t('careerReviewSurveyReport.surveyReport.surveyTableHeader.dateTaken'),
        cell: (params) => <DateCell date={params.row.original.takenAt} />,
        enableSorting: true,
      },
    ],
    []
  );

  const results = data?.reports?.careerReviewSurveyReport?.results;

  const normalizedResults =
    results?.nodes.map((result) => ({
      ...result,
      subRows: [{ questionAndAnswers: result.answers }],
    })) || [];

  const getSortingValue = ({ id, desc }: { id: string; desc: boolean }) => {
    const column = sortingColumnsMap[id as keyof typeof sortingColumnsMap];
    const order = desc ? SortOrders.DESC : SortOrders.ASC;

    return { column, order };
  };

  const handleTableStateChange = ({ pagination, sorting }: OnTableStateChangeParams) => {
    refetch({
      sort: sorting ? getSortingValue(sorting[0]) : undefined,
      page: pagination.pageIndex + 1,
      perPage: pagination.pageSize,
    });
  };

  const handleDownloadCSV = () => {
    setFileToDownload({
      mutation: generateCareerReviewSurveyReport,
      query: CareerReviewSurveyReportCsvDocument,
      variables: { ...variables.filter },
    });
  };

  return (
    <div className='p-base xxxl:p-md bg-white text-neutral-800 rounded-sm'>
      <div className='mb-sm xxxl:mb-base flex justify-between items-end'>
        <div className='flex flex-col gap-xs'>
          <h5 className='inline me-xs text-sm xxxl:text-base mb-0'>
            <Trans
              components={{
                neutralText: <span className='text-neutral-600' />,
              }}
              i18nKey='careerReviewSurveyReport.fullData'
              values={{ count: results?.nodesCount || 0 }}
            />
          </h5>
          <p className='text-neutral-700 text-xs xxxl:text-sm mb-0'>
            {t('careerReviewSurveyReport.surveyReport.surveyTableDescription')}
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
        <CareerReviewSurveyTableFilters />
        <div className='border border-neutral-300 rounded-b-sm h-[512px] xxxl:h-[576px] overflow-auto'>
          <NewTable
            SubRowRenderer={CareerReviewSurveySubRow}
            apiRef={tableApiRef}
            columns={columns}
            // @ts-ignore
            data={normalizedResults}
            defaultSortingState={DEFAULT_SORTING_STATE}
            enableRowSelection={false}
            enableSorting={true}
            enableSortingRemoval={false}
            nodesCount={results?.nodesCount}
            pagesCount={results?.pagesCount}
            onTableStateChange={handleTableStateChange}
          />
        </div>
      </div>
    </div>
  );
};
