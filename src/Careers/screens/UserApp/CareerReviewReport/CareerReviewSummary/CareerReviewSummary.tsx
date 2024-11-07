import { useTranslation } from 'react-i18next';
import { pick } from 'lodash-es';

import { useCareerReviewSurveyReportFilters } from '@dc/components/CareerReviewSurveyReport/useCareerReviewSurveyReportFilters';

import SharedCard from '@shared/components/Card/Card';
import { FiltersSummarizer } from '@shared/components/FiltersSummarizer/FiltersSummarizer';
import { formatDateTime } from '@shared/utils/date';

type Props = {
  studentsTotal?: number;
};

export const CareerReviewSummary = ({ studentsTotal = 0 }: Props) => {
  const { t } = useTranslation();
  const { appliedFilters } = useCareerReviewSurveyReportFilters();

  const filtersToDisplay = {
    ...pick(appliedFilters, ['entities', 'gradeLevels', 'users', 'startDate', 'endDate']),
    studentsTotal,
  };

  const normalizedFilters = {
    ...filtersToDisplay,
    startDate: {
      keepOriginalLabel: true,
      label: formatDateTime(filtersToDisplay.startDate!.toISOString()),
      value: filtersToDisplay.startDate,
    },
    endDate: {
      keepOriginalLabel: true,
      label: formatDateTime(filtersToDisplay.endDate!.toISOString()),
      value: filtersToDisplay.endDate,
    },
  };

  type FiltersToPass = keyof typeof filtersToDisplay;

  const summaryConfig: Record<FiltersToPass, { popoverHeader?: string; isHighlighted: boolean }> = {
    entities: { isHighlighted: true, popoverHeader: t('components.filtersSummarizer.entities') },
    gradeLevels: {
      isHighlighted: true,
      popoverHeader: t('components.filtersSummarizer.gradeLevels'),
    },
    users: { isHighlighted: true, popoverHeader: t('components.filtersSummarizer.users') },
    startDate: {
      isHighlighted: false,
    },
    endDate: { isHighlighted: false, popoverHeader: t('components.filtersSummarizer.endDate') },
    studentsTotal: { isHighlighted: false },
  };

  return (
    <SharedCard>
      <h5 className='mb-xs xxxl:mb-sm text-sm xxxl:text-base'>{t('reports.overall')}</h5>
      <div className='mb-sm xxxl:mb-base text-xs xxxl:text-sm leading-lg'>
        <FiltersSummarizer
          filters={normalizedFilters}
          summaryConfig={summaryConfig}
          template={t('careerReviewSurveyReport.summaryTemplate')}
        />
      </div>
    </SharedCard>
  );
};
