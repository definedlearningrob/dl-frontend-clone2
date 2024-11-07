import { Trans, useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { sum, values } from 'lodash-es';

import { ReportSummaryCards } from '@shared/components/ReportSummaryCards/ReportSummaryCards';
import { ReactComponent as NotStartedIcon } from '@shared/svg/not_started.svg';
import { ReactComponent as InProgressIcon } from '@shared/svg/in_progress.svg';
import { ReactComponent as CompletedIcon } from '@shared/svg/checkmark_circle_outlined.svg';
import { ReactComponent as NotMetIcon } from '@shared/svg/clear_circle_outlined.svg';
import { PLAN_STATEMENT_BREAKDOWN } from '@shared/graphql/user/query/planStatementBreakdown';
import { usePlanReportFilters } from '@shared/components/PlanReport/usePlanReportFilters';
import { omitTypename } from '@shared/utils/omitTypename';

import { statementBreakdownMock } from '../mocks';

type Props = {
  statementId?: string;
  showMockedData?: boolean;
};

export const PlanStatementReportDetails = ({ statementId, showMockedData }: Props) => {
  const { t } = useTranslation();
  const { variables } = usePlanReportFilters();
  const { data, loading } = useQuery(PLAN_STATEMENT_BREAKDOWN, {
    variables: { filter: variables.filter, statementId: statementId ?? '' },
    skip: showMockedData || !statementId,
    fetchPolicy: 'no-cache',
  });

  const statementBreakdown =
    !showMockedData && data
      ? omitTypename(data.reports.planReport.statementBreakdown)
      : statementBreakdownMock;

  const studentsCount = sum(values(statementBreakdown));

  const notStartedCount = statementBreakdown.notStarted ?? 0;
  const inProgressCount = statementBreakdown.inProgress ?? 0;
  const completedCount = statementBreakdown.completed ?? 0;
  const notMetCount = statementBreakdown.notMet ?? 0;

  const getStudentCountInfo = (value: number) => t('planReport.numberOfStudents', { count: value });

  const statusCards = useMemo(
    () => [
      {
        title: t('common.statuses.notStarted'),
        Icon: NotStartedIcon,
        iconClassname: 'text-neutral-700',
        description: t('planReport.statementDetails.notStartedDescription'),
        barColorClassname: 'fill-neutral-700',
        count: notStartedCount,
        renderTextValue: getStudentCountInfo,
      },
      {
        title: t('common.statuses.completed'),
        Icon: CompletedIcon,
        iconClassname: 'text-success-500',
        description: t('planReport.statementDetails.completedDescription'),
        barColorClassname: 'fill-success-500',
        count: completedCount,
        renderTextValue: getStudentCountInfo,
      },
      {
        title: t('common.statuses.inProgress'),
        Icon: InProgressIcon,
        iconClassname: 'text-secondary-500',
        description: t('planReport.statementDetails.inProgressDescription'),
        barColorClassname: 'fill-secondary-500',
        count: inProgressCount,
        renderTextValue: getStudentCountInfo,
      },
      {
        title: t('planReport.statuses.notMet'),
        Icon: NotMetIcon,
        iconClassname: 'text-danger-500',
        description: t('planReport.statementDetails.notMetDescription'),
        barColorClassname: 'fill-danger-500',
        count: notMetCount,
        renderTextValue: getStudentCountInfo,
      },
    ],
    [notStartedCount, inProgressCount, completedCount, notMetCount]
  );

  return (
    <section>
      <h5 className='text-sm xxxl:text-base mb-sm xxxl:mb-base'>
        <Trans
          components={{ neutralText: <span className='text-neutral-600' /> }}
          i18nKey='planReport.studentDistribution'
          values={{ count: data ? studentsCount : 0 }}
        />
      </h5>
      <ReportSummaryCards
        cards={statusCards}
        className='grid-cols-2'
        isLoading={loading}
        skeletonClassName='h-[431px] xxxl:h-[565px]'
        total={studentsCount}
      />
    </section>
  );
};
