import { useEffect, useState } from 'react';

import { PlanGroup } from '@shared/components/PortfolioPlans/PlanGroup';
import SharedCard from '@shared/components/Card/Card';
import { PlansHeader } from '@shared/components/PortfolioPlans/PlansHeader/PlansHeader';
import useQueryParams from '@shared/hooks/useQueryParams';
import { useNavigation } from '@shared/components/Sidebar/useNavigation';
import { useRole } from '@shared/hooks/useRole';

import { StudentInfo, UserInfo } from './types';
import { usePortfolioPlan } from './usePortfolioPlan';
import { PlanLegend } from './PlanLegend';
import { PlanGroupsSkeleton } from './PlanGroupsSkeleton';
import { getCanEvaluate } from './helpers';
import { PlanDescription } from './PlanDescription';

type Props = {
  userInfo: UserInfo | StudentInfo;
};

export const PortfolioPlans = ({ userInfo }: Props) => {
  const { isStudent } = useRole();
  const { setBackNavButton } = useNavigation();
  useEffect(() => {
    setBackNavButton(true);

    return () => setBackNavButton(false);
  }, []);

  const {
    params: { planId, groupId },
  } = useQueryParams<{ planId?: string; groupId: string }>();
  const { plan } = usePortfolioPlan({
    planId,
    canEvaluate: isStudent || getCanEvaluate(userInfo),
  });
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  const filteredGroups = plan?.groups?.filter((group) => group.statements.length > 0);

  const toggleExpandedGroup = (groupId: string) => {
    if (expandedGroup === groupId) {
      setExpandedGroup(null);
    } else {
      setExpandedGroup(groupId);
    }
  };

  useEffect(() => {
    if (groupId) {
      setExpandedGroup(groupId);
    }
  }, [groupId]);

  return (
    <div className='flex flex-col gap-sm xxxl:gap-base'>
      <PlansHeader currentUser={userInfo} progress={plan?.progress} />
      <SharedCard>
        <PlanDescription description={plan?.description} />
        <PlanLegend />
        <ul className='flex flex-col gap-sm xxxl:gap-base'>
          {filteredGroups?.map((group) => (
            <PlanGroup
              key={group.id}
              isExpanded={expandedGroup === group.id}
              planGroup={group}
              toggleIsExpanded={() => toggleExpandedGroup(group.id)}
              userInfo={userInfo}
            />
          ))}
          {!plan && <PlanGroupsSkeleton />}
        </ul>
      </SharedCard>
    </div>
  );
};
