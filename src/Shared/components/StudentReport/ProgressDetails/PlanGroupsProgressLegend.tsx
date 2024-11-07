import { useTranslation } from 'react-i18next';

import { ReactComponent as CertificateIcon } from '@shared/svg/certificate.svg';
import { PlanStatusLegend } from '@shared/components/PlanStatusLegend/PlanStatusLegend';

export const PlanGroupsProgressLegend = () => {
  const { t } = useTranslation();

  const additionalItems = [
    {
      variant: 'neutral' as const,
      label: t('studentGoalReport.statements'),
      Icon: CertificateIcon,
    },
  ];

  return (
    <div className='bg-neutral-200 p-xs xxxl:p-sm leading-lg rounded-sm mb-base xxxl:mb-md'>
      <PlanStatusLegend additionalItems={additionalItems} />
    </div>
  );
};
