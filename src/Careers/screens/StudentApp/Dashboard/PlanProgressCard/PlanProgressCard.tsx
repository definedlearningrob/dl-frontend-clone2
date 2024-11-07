import { useTranslation } from 'react-i18next';
import { usePlanProgressQuery } from '@graphql/dc/students/hooks';
import { isEmpty } from 'lodash-es';
import { useRef } from 'react';

import Card from '@shared/components/Card/Card';
import { Kicker } from '@shared/components/Kicker';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import Link from '@shared/components/Link';
import SkeletonRectangle from '@shared/components/Skeleton/Rectangle/Rectangle';
import { useIsTruncated } from '@shared/hooks/useIsTruncated';
import { Tooltip } from '@shared/components/Tooltip';

import { PlanProgressChart } from './PlanProgressChart';

export const PlanProgressCard = () => {
  const { t } = useTranslation();
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });
  const planNameRef = useRef<HTMLHeadingElement>(null);
  const isPlanNameTruncated = useIsTruncated({ ref: planNameRef });

  const { data, loading } = usePlanProgressQuery();

  if (loading) {
    return <SkeletonRectangle className='!h-[224px] xxxl:!h-[292px]' radius='sm' />;
  }

  if (isEmpty(data?.plans)) {
    return null;
  }

  const [plan] = data!.plans;
  const {
    progress: { completed, total },
  } = plan!;

  return (
    <Card className='bg-gradient-primary-600 flex flex-col gap-base !text-white shadow-300 xl:justify-normal justify-evenly'>
      <div className='flex items-center justify-between gap-sm xxxl:gap-base'>
        <div>
          <Kicker className='!text-neutral-300 !mb-sm xxxl:!mb-base' size={isFullHD ? 'md' : 'sm'}>
            {t('student.dashboard.yourPlanProgress')}
          </Kicker>
          <Tooltip delayDuration={500} disabled={!isPlanNameTruncated} message={plan?.name}>
            <h5 ref={planNameRef} className='line-clamp-2 text-sm xxxl:text-base mb-xs xxxl:mb-sm'>
              {plan?.name}
            </h5>
          </Tooltip>
          <span className='text-neutral-300 leading-lg text-xxs xxxl:text-xs'>
            {t('student.dashboard.trackPlanProgress')}
          </span>
        </div>
        <div className='shrink-0'>
          <PlanProgressChart value={completed / (total || 1)} />
        </div>
      </div>
      <Link
        className='!text-white hover:!bg-white hover:!text-primary-500 w-full'
        size={isFullHD ? 'lg' : 'md'}
        to='/plans'
        variant='primary-outlined'>
        {t('student.dashboard.viewPlan')}
      </Link>
    </Card>
  );
};
