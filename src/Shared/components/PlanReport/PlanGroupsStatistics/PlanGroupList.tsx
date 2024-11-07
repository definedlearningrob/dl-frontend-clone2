import { times } from 'lodash-es';

import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { PlanGroupCardSkeleton } from '@shared/components/PlanReport/PlanGroupCard/PlanGroupCardSkeleton';
import { PlanGroupReport } from '@shared/graphql/user/query/planReport';
import { PlanGroupCard } from '@shared/components/PlanReport/PlanGroupCard/PlanGroupCard';

type Props = {
  groupReports: PlanGroupReport[] | undefined;
  isLoading: boolean;
  chartType: 'bar' | 'pie';
};

export const PlanGroupList = ({ groupReports, isLoading, chartType }: Props) => {
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });

  const planGroupSkeletonsCount = isFullHD ? 4 : 3;
  const listClasses = 'grid grid-cols-3 xxxl:grid-cols-4 gap-[1px]';

  if (isLoading || !groupReports) {
    return (
      <ul className={listClasses}>
        {times(planGroupSkeletonsCount, (index) => (
          <PlanGroupCardSkeleton key={index} chartType={chartType} />
        ))}
      </ul>
    );
  }

  return (
    <ul className={listClasses}>
      {groupReports.map((groupReport) => {
        const { group, __typename, ...data } = groupReport;

        return (
          <PlanGroupCard key={group.id} chartType={chartType} data={data} title={group.name} />
        );
      })}
    </ul>
  );
};
