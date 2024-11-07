import { useTranslation } from 'react-i18next';

import { ReactComponent as StudentIcon } from '@shared/svg/student.svg';
import { PlanStatusLegend } from '@shared/components/PlanStatusLegend/PlanStatusLegend';

export const PlanGroupsLegend = () => {
  const { t } = useTranslation();

  const additionalItems = [
    { variant: 'neutral' as const, label: t('planReport.students'), Icon: StudentIcon },
  ];

  return (
    <div className='py-xs px-sm xxxl:py-sm xxxl:px-md bg-neutral-200 rounded-sm mb-base xxxl:mb-md'>
      <PlanStatusLegend additionalItems={additionalItems} />
    </div>
  );
};
