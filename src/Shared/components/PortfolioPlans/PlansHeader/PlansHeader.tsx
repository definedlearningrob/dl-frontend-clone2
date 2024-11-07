import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { isNil } from 'lodash-es';
import { SingleValue } from 'react-select';
import { useParams } from 'react-router-dom';

import { CircleStatusIndicator } from '@shared/components/CircleStatusIndicator/CircleStatusIndicator';
import useQueryParams from '@shared/hooks/useQueryParams';
import { Select, SelectOption } from '@shared/components/Select';
import Link from '@shared/components/Link';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';

import { usePortfolioPlans } from '../usePortfolioPlans';

import { PlansHeaderSkeleton } from './PlansHeaderSkeleton';

type Props = {
  currentUser: { firstName: string; lastName: string };
  progress: { completed: number; total: number } | undefined;
};

export const PlansHeader = ({ currentUser, progress }: Props) => {
  const { t } = useTranslation();
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });
  const {
    updateQueryParams,
    params: { planId },
  } = useQueryParams<{ planId?: string }>();
  const { id: studentUuid } = useParams<{ id: string }>();
  const [selectedPlanId, setSelectedPlanId] = useState(planId);
  const { planOptions, student, loading } = usePortfolioPlans();
  const linkSize = isFullHD ? 'md' : 'sm';

  useEffect(() => {
    if (planOptions && isNil(selectedPlanId)) {
      const [firstPlanOption] = planOptions;
      updateQueryParams({ planId: firstPlanOption.value });
      setSelectedPlanId(firstPlanOption.value);
    }
  }, [planOptions, selectedPlanId]);

  const handleChangePlan = (newPlan: SingleValue<SelectOption>) => {
    const newPlanId = newPlan?.value.toString();
    setSelectedPlanId(newPlanId);
    updateQueryParams({ planId: newPlanId });
  };

  if (loading || !planOptions) {
    return <PlansHeaderSkeleton />;
  }

  const studentInfo = student ?? currentUser;
  const params = studentUuid ? `${selectedPlanId}/${studentUuid}` : selectedPlanId;

  const linkToProgressReport = `/reports/student-progress/${params}`;

  return (
    <div
      className='flex gap-sm justify-between bg-white rounded-sm py-sm px-base xxxl:py-base xxxl:px-md'
      data-testid='plans-header'>
      <div className='flex gap-sm'>
        <CircleStatusIndicator
          isLoading={!progress}
          total={progress?.total}
          value={progress?.completed}
        />
        <div>
          <h4 className='text-base xxxl:text-lg mb-xxs'>{t('portfolioPlans.goalsPlans')}</h4>
          <div className='flex items-center gap-xxs xxxl:gap-xs text-xxs xxxl:text-xs leading-lg'>
            <span className='text-primary-500 font-medium'>{`${studentInfo.firstName} ${studentInfo.lastName}`}</span>
            <div className='w-xxs h-xxs rounded-full bg-neutral-300' />
            <span>
              {planOptions.length === 1
                ? planOptions[0].label
                : t('portfolioPlans.studentPlansCount', { count: planOptions.length })}
            </span>
          </div>
        </div>
      </div>
      <div className='flex items-center gap-xs xxxl:gap-sm'>
        {planOptions.length > 1 && (
          <Select
            className='w-[240px] xxxl:w-[320px]'
            isLoading={loading}
            options={planOptions}
            size={linkSize}
            value={planOptions.find((plan) => selectedPlanId === plan.value)}
            onChange={handleChangePlan}
          />
        )}
        <Link size={linkSize} to={linkToProgressReport} variant='primary'>
          {t('portfolioPlans.goalsProgressReport')}
        </Link>
      </div>
    </div>
  );
};
