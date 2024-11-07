import { Trans, useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash-es';
import { useMemo } from 'react';

import Card from '@shared/components/Card/Card';
import { ReactComponent as NotStartedIcon } from '@shared/assets/icons/not_started_icon.svg';
import { ReactComponent as StartedIcon } from '@shared/assets/icons/started.svg';
import { ReactComponent as CompletedIcon } from '@shared/assets/icons/checkmark_circle_outlined.svg';
import { ReactComponent as GraphIcon } from '@shared/svg/graph.svg';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { StartedPopover } from '@shared/screens/UserApp/PlanReport/StartedPopover';
import { ReportSummaryCards } from '@shared/components/ReportSummaryCards/ReportSummaryCards';
import { PlanReportFiltersSummary } from '@shared/screens/UserApp/PlanReport/PlanReportFiltersSummary';
import { TPlanReportData } from '@shared/graphql/user/query/planReport';

type Props = {
  isLoading: boolean;
  planReportData: TPlanReportData | undefined;
};

export const Summary = ({ planReportData, isLoading }: Props) => {
  const { t } = useTranslation();

  const summary = planReportData?.reports.planReport.summary;

  const studentsInProgress = summary?.studentsInProgress ?? 0;
  const studentsTotal = summary?.studentsTotal ?? 0;
  const studentsCompleted = summary?.studentsCompleted ?? 0;
  const averageCompletion = (summary?.averageCompletion ?? 0) * 100;

  const notStartedCount = !isEmpty(planReportData)
    ? studentsTotal - studentsInProgress - studentsCompleted
    : 0;

  const roundedAverageCompletion = +averageCompletion.toFixed(averageCompletion < 10 ? 2 : 0);

  const getLabel = (value: number) => t('planReport.numberOfStudents', { count: value });

  const cards = useMemo(
    () => [
      {
        title: t('planReport.statuses.notStarted'),
        Icon: NotStartedIcon,
        iconClassname: 'text-neutral-700',
        description: t('planReport.statuses.notStartedDescription'),
        barColorClassname: 'fill-neutral-600',
        count: notStartedCount || 0,
        renderTextValue: getLabel,
      },
      {
        title: t('planReport.statuses.started'),
        Icon: StartedIcon,
        iconClassname: 'text-info-600',
        description: t('planReport.statuses.startedDescription'),
        barColorClassname: 'fill-info-600',
        count: studentsInProgress,
        renderTextValue: getLabel,
        renderTitleInfoPopover: StartedPopover,
      },
      {
        title: t('planReport.statuses.completed'),
        Icon: CompletedIcon,
        iconClassname: 'text-success-500',
        description: t('planReport.statuses.completedDescription'),
        barColorClassname: 'fill-success-500',
        count: studentsCompleted,
        renderTextValue: getLabel,
      },
    ],
    [notStartedCount, studentsCompleted, studentsTotal, studentsInProgress]
  );

  return (
    <Card>
      <div className='mb-base xxxl:mb-md'>
        <PlanReportFiltersSummary studentsTotal={studentsTotal} />
      </div>
      <div className='mb-xs xxxl:mb-sm'>
        <h5 className='inline me-xs text-sm xxxl:text-base'>
          <Trans
            components={{
              neutralText: <span className='text-neutral-600' />,
            }}
            i18nKey='planReport.summary'
            values={{ count: summary?.studentsTotal ?? 0 }}
          />
        </h5>
      </div>
      <div className='mb-sm xxxl:mb-base font-medium text-xs xxxl:text-sm leading-lg flex items-center'>
        <Trans
          components={{
            chartIcon: (
              <IconContainer
                Icon={GraphIcon}
                className='text-primary-500 border border-neutral-300 rounded-xs ms-xs me-xxs xxxl:mx-xs'
                paddingSize='xxs'
                size='sm'
              />
            ),
            percentValue: <span className='font-bold text-font-primary me-xs' />,
            orangeText: <span className='text-secondary-500 mx-xxs' />,
          }}
          i18nKey='planReport.summaryInfo'
          values={{
            value: roundedAverageCompletion,
          }}
        />
      </div>
      <ReportSummaryCards cards={cards} isLoading={isLoading} total={studentsTotal} />
    </Card>
  );
};
