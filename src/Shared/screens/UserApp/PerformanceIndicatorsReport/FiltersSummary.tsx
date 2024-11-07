import { pick } from 'lodash-es';
import { useTranslation } from 'react-i18next';

import { FiltersSummarizer } from '@shared/components/FiltersSummarizer/FiltersSummarizer';
import { useTagsReportFilters } from '@shared/components/TagsReport/useTagsReportFilters';

type Props = {
  studentsTotal: number;
};

export const FiltersSummary = ({ studentsTotal }: Props) => {
  const { appliedFilters } = useTagsReportFilters();
  const { t } = useTranslation();

  const filtersToDisplay = {
    ...pick(appliedFilters, ['entities', 'gradeLevels', 'users', 'schoolYear', 'schoolClasses']),
    performanceIndicators: appliedFilters.tags,
    studentsTotal,
  };

  const template = t('tagsReport.summaryTemplate');
  type FiltersToPass = keyof typeof filtersToDisplay;

  const summaryConfig: Record<FiltersToPass, { popoverHeader?: string; isHighlighted: boolean }> = {
    entities: { isHighlighted: true, popoverHeader: t('components.filtersSummarizer.entities') },
    gradeLevels: {
      isHighlighted: true,
      popoverHeader: t('components.filtersSummarizer.gradeLevels'),
    },
    users: { isHighlighted: true, popoverHeader: t('components.filtersSummarizer.users') },
    schoolYear: { isHighlighted: false },
    studentsTotal: { isHighlighted: false },
    performanceIndicators: {
      isHighlighted: true,
      popoverHeader: t('components.filtersSummarizer.performanceIndicators'),
    },
    schoolClasses: {
      isHighlighted: true,
      popoverHeader: t('components.filtersSummarizer.schoolClasses'),
    },
  };

  return (
    <div className='text-xs xxxl:text-sm leading-lg'>
      <h5 className='mb-xs xxxl:mb-sm text-sm xxxl:text-base'>{t('reports.overall')}</h5>
      <FiltersSummarizer
        filters={filtersToDisplay}
        summaryConfig={summaryConfig}
        template={template}
      />
    </div>
  );
};
