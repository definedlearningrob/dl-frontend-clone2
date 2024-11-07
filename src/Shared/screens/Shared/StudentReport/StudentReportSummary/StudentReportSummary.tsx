import React, { useMemo } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import Card from '@shared/components/Card/Card';
import { ReactComponent as NotStartedIcon } from '@shared/svg/not_started_icon.svg';
import { ReactComponent as StartedIcon } from '@shared/svg/started.svg';
import { ReactComponent as CompletedIcon } from '@shared/svg/checkmark_circle_outlined.svg';
import { ReportSummaryCards } from '@shared/components/ReportSummaryCards/ReportSummaryCards';
import { StartedPopover } from '@shared/screens/UserApp/PlanReport/StartedPopover';
import { TOverallData } from '@shared/graphql/student/query/studentReportProgressByStudent';

type Props = {
  overallData: TOverallData | undefined;
  isLoading: boolean;
};

export const StudentReportSummary = ({ overallData, isLoading }: Props) => {
  const { t } = useTranslation();

  const studentsStarted = overallData ? overallData.inProgress + overallData.notMet : 0;
  const studentsCompleted = overallData?.completed ?? 0;
  const notStartedCount = overallData?.notStarted ?? 0;
  const totalCount = studentsStarted + studentsCompleted + notStartedCount;

  const getLabel = (value: number) => t('studentGoalReport.numberOfStatements', { count: value });

  const cards = useMemo(
    () => [
      {
        title: t('common.statuses.notStarted'),
        Icon: NotStartedIcon,
        iconClassname: 'text-neutral-700',
        description: t('studentGoalReport.statuses.notStartedDescription'),
        barColorClassname: 'fill-neutral-700',
        count: notStartedCount,
        renderTextValue: getLabel,
      },
      {
        title: t('common.statuses.started'),
        Icon: StartedIcon,
        iconClassname: 'text-info-600',
        description: t('studentGoalReport.statuses.startedDescription'),
        barColorClassname: 'fill-info-600',
        count: studentsStarted,
        renderTextValue: getLabel,
        renderTitleInfoPopover: StartedPopover,
      },
      {
        title: t('common.statuses.completed'),
        Icon: CompletedIcon,
        iconClassname: 'text-success-500',
        description: t('studentGoalReport.statuses.completedDescription'),
        barColorClassname: 'fill-success-500',
        count: studentsCompleted,
        renderTextValue: getLabel,
      },
    ],
    [notStartedCount, studentsCompleted, studentsStarted]
  );

  return (
    <Card className='flex flex-col gap-sm xxxl:gap-base'>
      <div>
        <h5 className='mb-xs text-sm xxxl:text-base xxxl:mb-sm leading-base'>
          {t('reports.overall')}
        </h5>
        <p className='mb-0 text-xs xxxl:text-sm font-regular leading-lg'>
          <Trans
            components={{
              secondaryText: <span className='text-secondary-500' />,
            }}
            i18nKey='studentGoalReport.overAllTitle'
          />
        </p>
      </div>
      <ReportSummaryCards cards={cards} isLoading={isLoading} total={totalCount} />
    </Card>
  );
};
