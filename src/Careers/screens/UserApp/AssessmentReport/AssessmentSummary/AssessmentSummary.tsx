import { useTranslation } from 'react-i18next';
import { pick, times } from 'lodash-es';
import { AnimatePresence } from 'framer-motion';

import { useAssessmentReportFilters } from '@dc/components/AssessmentReport/useAssessmentReportFilters';

import SharedCard from '@shared/components/Card/Card';
import { FiltersSummarizer } from '@shared/components/FiltersSummarizer/FiltersSummarizer';
import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';

import { AssessmentSummaryItem } from './AssessmentSummaryItem';

type Props = {
  isLoading: boolean;
  summary?: {
    assessmentCompleted: number;
    assessmentTaken: number;
  };
  studentsTotal?: number;
};

export const AssessmentSummary = ({ isLoading, summary, studentsTotal = 0 }: Props) => {
  const { t } = useTranslation();
  const { appliedFilters } = useAssessmentReportFilters();

  const filtersToDisplay = {
    ...pick(appliedFilters, ['entities', 'gradeLevels', 'users', 'schoolYear', 'schoolClasses']),
    studentsTotal,
  };

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
    schoolClasses: {
      isHighlighted: true,
      popoverHeader: t('components.filtersSummarizer.schoolClasses'),
    },
  };

  const isLoaded = !isLoading && !!summary;

  return (
    <SharedCard>
      <h5 className='mb-xs xxxl:mb-sm text-sm xxxl:text-base'>{t('reports.overall')}</h5>
      <div className='mb-sm xxxl:mb-base text-xs xxxl:text-sm leading-lg'>
        <FiltersSummarizer
          filters={filtersToDisplay}
          summaryConfig={summaryConfig}
          template={t('assessmentReport.summaryTemplate')}
        />
      </div>
      <AnimatePresence>
        <div className='flex gap-sm xxxl:gap-base p-sm xxxl:p-base rounded-sm bg-neutral-200'>
          {isLoaded && (
            <>
              <AssessmentSummaryItem status='started' value={summary.assessmentTaken} />
              <AssessmentSummaryItem status='completed' value={summary.assessmentCompleted} />
            </>
          )}
          {isLoading &&
            times(2, (index) => (
              <div
                key={index}
                className='flex items-center justify-center flex-1 !h-[110px] xxxl:!h-[148px]'>
                <SharedLoadingSpinner size='small' />
              </div>
            ))}
        </div>
      </AnimatePresence>
    </SharedCard>
  );
};
