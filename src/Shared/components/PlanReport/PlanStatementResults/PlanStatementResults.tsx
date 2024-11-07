import { useQuery } from '@apollo/client';
import { Trans, useTranslation } from 'react-i18next';
import { useUpdateEffect } from 'react-use';

import { useReportGenerator } from '@shared/hooks/useReportGenerator';
import { ReactComponent as DownloadIcon } from '@shared/svg/download_to.svg';
import {
  PLAN_STATEMENT_RESULTS,
  TPlanStatementResultsData,
  TPlanStatementResultsVariables,
} from '@shared/graphql/user/query/planStatementResults';
import { DEFAULT_PAGE_SIZE } from '@shared/components/NewTable/NewTable';
import { PLAN_GROUP_STATEMENT_RESULT_SORT, SORT_ORDER } from '@shared/resources/enums';
import { FilterProvider } from '@shared/components/FilterProvider/FilterProvider';
import SkeletonRectangle from '@shared/components/Skeleton/Rectangle/Rectangle';
import Button from '@shared/components/Button/Button';
import { GENERATE_GOAL_PLAN_REPORT } from '@shared/graphql/user/mutations/generateGoalPlanReport';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { GOAL_PLANS_REPORT } from '@shared/graphql/user/query/goalPlansReport';
import { useFileDownload } from '@shared/hooks/useFileDownload';

import { usePlanReportFilters } from '../usePlanReportFilters';
import { statementResultsMock } from '../mocks';

import { PlanStatementResultsFilters } from './PlanStatementResultsFilters';
import { PlanStatementResultsTable } from './PlanStatementResultsTable';
import { StatementQuestion } from './types';

type Props = {
  statementId?: string;
  question?: StatementQuestion | null;
  showMockedData?: boolean;
  studentsCount: number;
};

export const PlanStatementResults = ({
  statementId,
  question,
  showMockedData,
  studentsCount,
}: Props) => {
  const { t } = useTranslation();

  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });
  const { variables } = usePlanReportFilters();
  const { setFileToDownload, fileToDownload } = useFileDownload();
  const { generateReport, loading: isReportGenerating } = useReportGenerator();

  useUpdateEffect(() => {
    if (fileToDownload?.mutation) {
      generateReport();
    }
  }, [fileToDownload?.mutation]);

  const { data, loading, refetch } = useQuery<
    TPlanStatementResultsData,
    TPlanStatementResultsVariables
  >(PLAN_STATEMENT_RESULTS, {
    variables: {
      filter: variables.filter,
      statementId: statementId ?? '',
      sort: { column: PLAN_GROUP_STATEMENT_RESULT_SORT.LAST_UPDATED_AT, order: SORT_ORDER.DESC },
      page: 1,
      perPage: DEFAULT_PAGE_SIZE,
    },
    skip: showMockedData || !statementId,
    fetchPolicy: 'no-cache',
  });

  if (loading) {
    return (
      <section>
        <h5 className='text-sm xxxl:text-base mb-sm xxxl:mb-base'>{t('planReport.fullData')}</h5>
        <SkeletonRectangle
          className='!h-[562px] xxxl:!h-[642px]'
          color='standard'
          radius='sm'
          size='full-width'
        />
      </section>
    );
  }

  if (!data && !showMockedData) {
    return null;
  }

  const statementResults = showMockedData
    ? statementResultsMock
    : data!.reports.planReport.statementResults;

  const handleDownloadCSV = async () => {
    setFileToDownload({
      mutation: GENERATE_GOAL_PLAN_REPORT,
      query: GOAL_PLANS_REPORT,
      variables: {
        statementId: statementId!,
        ...variables.filter,
      },
    });
  };

  return (
    <FilterProvider initialFilters={{ fullNameOrSisIdCont: '', resultEq: null }}>
      <section>
        <div className='flex justify-between items-end mb-sm xxxl:mb-base'>
          <h5 className='text-sm xxxl:text-base mb-0'>
            <Trans
              components={{ neutralText: <span className='text-neutral-600' /> }}
              i18nKey='planReport.fullData'
              values={{ count: studentsCount }}
            />
          </h5>
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
        <PlanStatementResultsFilters />
        <PlanStatementResultsTable
          question={question}
          refetch={refetch}
          statementResults={statementResults}
        />
      </section>
    </FilterProvider>
  );
};
