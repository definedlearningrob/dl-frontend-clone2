import { useTranslation } from 'react-i18next';
import { ChangeEvent, useMemo, useState } from 'react';
import { isEmpty } from 'lodash-es';

import { usePlansWithAlignmentStatement } from '@dc/graphql/user/hooks/usePlansWithAlignmentStatement';

import { ReactComponent as SearchIcon } from '@shared/svg/search.svg';
import { useAlignToPlan } from '@shared/components/RubricsEditor/AlignToPlanModal/AlignToPlanProvider';
import { TextInput } from '@shared/components/TextInput/TextInput';
import debounce from '@shared/utils/debounce';
import { AlignToFormMiddleStepDetails } from '@shared/components/RubricsEditor/AlignToPlanModal/AlignToFormMiddleStepDetails';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';

const DEBOUNCE_TIME = 700;

export const AlignToFormMiddleStep = () => {
  const { t } = useTranslation();
  const [expandedPlanId, toggleExpandedPlanId] = useState<string | null>(null);
  const { setKeyword, currentFilters, headingId } = useAlignToPlan();
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });
  const { data } = usePlansWithAlignmentStatement({
    rubricHeadingId: headingId,
  });

  const handleChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const debouncedHandleChangeSearch = useMemo(
    () => debounce(handleChangeSearch, DEBOUNCE_TIME),
    []
  );

  const filteredPlans =
    data?.plans.nodes.filter((plan) =>
      plan.name.toLowerCase().includes(currentFilters.nameCont?.toLowerCase() as string)
    ) || [];

  const numberOfPlans = isEmpty(currentFilters.nameCont)
    ? data?.plans.nodesCount
    : filteredPlans.length;

  const toggleExpandSinglePlan = (planId: string) => {
    toggleExpandedPlanId(expandedPlanId === planId ? null : planId);
  };

  return (
    <div className='flex flex-col h-[60vh]'>
      <div className='flex items-center justify-between mb-sm'>
        <h5 className='text-neutral-600 block text-base mb-0'>
          <strong className='text-neutral-800'>
            {t('components.rubric.alignPlans.planTitle')}
          </strong>{' '}
          ({numberOfPlans})
        </h5>
        <div className='flex gap-sm justify-end items-center'>
          <TextInput
            Icon={SearchIcon}
            className='flex'
            minLength={3}
            placeholder={t('common.placeholders.search')}
            size={isFullHD ? 'md' : 'sm'}
            onChange={debouncedHandleChangeSearch}
          />
        </div>
      </div>
      <div className='flex-1 min-h-0 scrollbar'>
        <ul className='flex flex-col gap-xs'>
          {filteredPlans.map((plan) => (
            <AlignToFormMiddleStepDetails
              key={plan.id}
              isExpandedPlan={expandedPlanId === plan.id}
              plan={plan}
              toggleExpandSinglePlan={() => toggleExpandSinglePlan(plan.id)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};
