import { useTranslation } from 'react-i18next';

import { ReactComponent as LockedIcon } from '@shared/svg/padlock.svg';
import { PlanStatusLegend } from '@shared/components/PlanStatusLegend/PlanStatusLegend';

export const PlanLegend = () => {
  const { t } = useTranslation();

  const additionalItems = [
    {
      variant: 'neutral' as const,
      label: t('portfolioPlans.locked'),
      Icon: LockedIcon,
    },
  ];

  return (
    <div className='py-xs px-sm xxxl:py-sm xxxl:px-md bg-neutral-200 rounded-sm xxxl:max-w-[1200px] mb-base'>
      <PlanStatusLegend additionalItems={additionalItems} />
    </div>
  );
};
