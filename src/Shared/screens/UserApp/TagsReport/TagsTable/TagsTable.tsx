import { ChangeEvent, useMemo, useRef, useState } from 'react';
import { useUpdateEffect } from 'react-use';
import { useTranslation } from 'react-i18next';
import { MultiValue } from 'react-select';
import { useQuery } from '@apollo/client';

import { useReportGenerator } from '@shared/hooks/useReportGenerator';
import { ReactComponent as DownloadIcon } from '@shared/svg/download_to.svg';
import {
  NewTable,
  TableColumns,
  DEFAULT_PAGE_SIZE,
  OnTableStateChangeParams,
  NewTableRef,
} from '@shared/components/NewTable/NewTable';
import { formatDateTime } from '@shared/utils/date';
import { TagsTableLegend } from '@shared/screens/UserApp/TagsReport/TagsTable/TagsTableLegend';
import { TagsSource } from '@shared/screens/UserApp/TagsReport/TagsTable/TagsSource';
import { TTagResult, TTagsFullData } from '@shared/graphql/user/query/tagsFullData';
import { useTagsFullData } from '@shared/graphql/user/hooks/useTagsFullData';
import { useTagsReportFilters } from '@shared/components/TagsReport/useTagsReportFilters';
import debounce from '@shared/utils/debounce';
import { Option } from '@shared/components/MultilineSelect/MultilineSelect';
import { SORT_ORDER, TAG_REPORT_RESULT_SORT } from '@shared/resources/enums';
import { Tooltip } from '@shared/components/Tooltip';
import { TagsCell } from '@shared/screens/UserApp/TagsReport/TagsTable/TagsCell';
import { TagsTableFilters } from '@shared/screens/UserApp/TagsReport/TagsTable/TagsTableFilters';
import { TAG_OPTIONS } from '@shared/graphql/user/query/tagOptions';
import { ALL_OPTION } from '@shared/components/MultiSelect';
import Button from '@shared/components/Button/Button';
import { useFileDownload } from '@shared/hooks/useFileDownload';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { GOAL_PERFORMANCE_INDICATORS_REPORT } from '@shared/graphql/user/query/goalsPerformanceIndicatorsReport';
import { GENERATE_GOALS_PERFORMANCE_INDICATORS_REPORT } from '@shared/graphql/user/mutations/generateGoalsPerformanceIndicatorsReport';

const DEBOUNCE_TIME = 700;
const DEFAULT_SORTING_STATE = [{ id: 'studentFullName', desc: true }];

const sortingColumnsMap = {
  studentSisId: TAG_REPORT_RESULT_SORT.STUDENT_SIS_ID,
  studentFullName: TAG_REPORT_RESULT_SORT.STUDENT_NAME,
  rubricName: TAG_REPORT_RESULT_SORT.RUBRIC_NAME,
  gradedAt: TAG_REPORT_RESULT_SORT.GRADED_AT,
} as const;

type Props = {
  onDataLoad: (studentsTotal: number) => void;
};

export const TagsTable = ({ onDataLoad }: Props) => {
  const { variables, appliedFilters } = useTagsReportFilters();
  const { t } = useTranslation();
  const { data: tagsData } = useQuery(TAG_OPTIONS, { variables: { page: 1, perPage: 1000 } });

  const { setFileToDownload, fileToDownload } = useFileDownload();
  const { generateReport, loading: isReportGenerating } = useReportGenerator();

  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });

  useUpdateEffect(() => {
    if (fileToDownload?.mutation) {
      generateReport();
    }
  }, [fileToDownload?.mutation]);

  const allTagIds = tagsData?.tags.nodes.map(({ id }) => id) || [];

  const isAllTagsSelected =
    appliedFilters.tags.length === 1 && appliedFilters.tags[0].value === ALL_OPTION.value;

  const tagIds = isAllTagsSelected ? allTagIds : appliedFilters.tags.map(({ value }) => value);

  const { data, refetch } = useTagsFullData({
    filter: {
      ...variables.filter,
      tagIds,
    },
    page: 1,
    perPage: DEFAULT_PAGE_SIZE,
    sort: { column: TAG_REPORT_RESULT_SORT.STUDENT_NAME, order: SORT_ORDER.DESC },
    onCompleted: (data: TTagsFullData) => {
      onDataLoad(data.reports.tagReport.studentsCount);
    },
  });

  const [tableFilters, setTableFilters] = useState<{
    fullNameOrSisIdCont: string;
    tagIdIn: string[];
  }>({ fullNameOrSisIdCont: '', tagIdIn: [] });
  const tableRef = useRef<NewTableRef | null>(null);

  const refetchFilters = {
    ...variables.filter,
    tagIds,
    resultsFilter: {
      ...tableFilters,
    },
  };

  const columns: TableColumns<TTagResult> = useMemo(
    () => [
      { accessorKey: 'studentSisId', header: t('reports.tagReport.tagTableHeader.id'), size: 50 },
      {
        accessorKey: 'studentFullName',
        header: t('reports.tagReport.tagTableHeader.student'),
        size: 80,
      },
      {
        accessorKey: 'source',
        header: t('reports.tagReport.tagTableHeader.source'),
        cell: (params) => <TagsSource tagSource={params.row.original} />,
        enableSorting: false,
      },
      {
        accessorKey: 'rubricName',
        header: t('reports.tagReport.tagTableHeader.rubric'),
      },
      {
        accessorKey: 'performanceIndicator',
        header: t('reports.tagReport.tagTableHeader.performanceIndicators'),
        cell: (params) => <TagsCell tags={params.row.original.tags} />,
        size: 120,
        enableSorting: false,
      },
      {
        accessorKey: 'score',
        header: t('reports.tagReport.tagTableHeader.score'),
        size: 50,
        cell: (params) => (
          <span>
            {params.row.original.scoreEarned}/{params.row.original.scoreMaximum}
          </span>
        ),
        enableSorting: false,
      },
      {
        accessorKey: 'gradedAt',
        header: t('reports.tagReport.tagTableHeader.dateScored'),
        cell: (tagResult) => (
          <Tooltip message={formatDateTime(tagResult.row.original.gradedAt, { withTime: true })}>
            {formatDateTime(tagResult.row.original.gradedAt)}
          </Tooltip>
        ),
        size: 80,
      },
    ],
    []
  );

  useUpdateEffect(() => {
    if (tableRef.current) {
      tableRef.current.setPageIndex(0);
    }
  }, [tableFilters]);

  const getSortingValue = ({ id, desc }: { id: string; desc: boolean }) => {
    const column = sortingColumnsMap[id as keyof typeof sortingColumnsMap];
    const order = desc ? SORT_ORDER.DESC : SORT_ORDER.ASC;

    return { column, order };
  };

  const handleTableStateChange = ({ pagination, sorting }: OnTableStateChangeParams) => {
    refetch({
      filter: refetchFilters,
      sort: sorting ? getSortingValue(sorting[0]) : undefined,
      page: pagination.pageIndex + 1,
      perPage: pagination.pageSize,
    });
  };

  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setTableFilters({
      ...tableFilters,
      fullNameOrSisIdCont: e.target.value,
    });
  };

  const debouncedHandleChangeSearch = debounce(handleChangeSearch, DEBOUNCE_TIME);

  const handleChangeTags = (newValues: MultiValue<Option>) => {
    setTableFilters({
      ...tableFilters,
      tagIdIn: newValues.map(({ value }) => value),
    });
  };

  if (!data) {
    return null;
  }

  const { tagReport } = data?.reports;
  const { tagsResults } = tagReport;

  const handleDownloadCSV = () => {
    setFileToDownload({
      mutation: GENERATE_GOALS_PERFORMANCE_INDICATORS_REPORT,
      query: GOAL_PERFORMANCE_INDICATORS_REPORT,
      variables: variables.filter,
    });
  };

  return (
    <div className='p-base xxxl:p-md bg-white text-neutral-800 rounded-sm '>
      <div className='mb-sm xxxl:mb-base flex justify-between items-end'>
        <div>
          <h5 className='text-sm xxxl:text-base mb-xs font-bold leading-base'>
            {t('reports.tagReport.fullData')}
          </h5>
          <p className='text-neutral-700 text-xs xxxl:text-sm mb-0'>
            {t('reports.tagReport.tagTableDescription')}
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
        <TagsTableFilters
          handleChangeSearch={debouncedHandleChangeSearch}
          handleChangeTags={handleChangeTags}
        />
        <NewTable
          apiRef={tableRef}
          columns={columns}
          data={tagsResults.nodes}
          defaultSortingState={DEFAULT_SORTING_STATE}
          enableRowSelection={false}
          enableSorting={true}
          enableSortingRemoval={false}
          nodesCount={tagsResults.nodesCount}
          pagesCount={tagsResults.pagesCount}
          onTableStateChange={handleTableStateChange}
        />
      </div>
      <TagsTableLegend />
    </div>
  );
};
