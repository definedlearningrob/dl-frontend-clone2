import { pick } from 'lodash-es';
import { useTranslation } from 'react-i18next';

import { usePlanReportFilters } from '@shared/components/PlanReport/usePlanReportFilters';
import SkeletonRectangle from '@shared/components/Skeleton/Rectangle/Rectangle';
import { FiltersSummarizer } from '@shared/components/FiltersSummarizer/FiltersSummarizer';

type Props = {
  studentsTotal: number;
};

export const PlanReportFiltersSummary = ({ studentsTotal }: Props) => {
  const { appliedFilters } = usePlanReportFilters();
  const { t } = useTranslation();

  const template = t('planReport.planReportSummaryTemplate');

  const filtersToDisplay = {
    ...pick(appliedFilters, ['entities', 'gradeLevels', 'users', 'schoolYear', 'schoolClasses']),
    studentsTotal,
  };

  const planLabel = appliedFilters.plan?.label ?? <SkeletonRectangle height='tiny' size='sm' />;

  type FiltersToPass = keyof typeof filtersToDisplay;

  // TODO: missing tooltip Icons
  const summaryConfig: Record<FiltersToPass, { popoverHeader?: string; isHighlighted: boolean }> = {
    entities: { isHighlighted: true, popoverHeader: t('components.filtersSummarizer.entities') },
    gradeLevels: {
      isHighlighted: true,
      popoverHeader: t('components.filtersSummarizer.gradeLevels'),
    },
    users: { isHighlighted: true, popoverHeader: t('components.filtersSummarizer.users') },
    schoolYear: { isHighlighted: false },
    studentsTotal: { isHighlighted: false },
    schoolClasses: {
      isHighlighted: true,
      popoverHeader: t('components.filtersSummarizer.schoolClasses'),
    },
  };

  return (
    <>
      <h5 className='mb-xs xxxl:mb-sm text-sm xxxl:text-base'>{planLabel}</h5>
      <div className='mb-base xxxl:mb-md text-xs xxxl:text-sm'>
        <FiltersSummarizer
          filters={filtersToDisplay}
          summaryConfig={summaryConfig}
          template={template}
        />
      </div>
      <hr className='text-neutral-200' />
    </>
  );
};
