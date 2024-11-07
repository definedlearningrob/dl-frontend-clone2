import { pick, isUndefined } from 'lodash-es';
import { useTranslation } from 'react-i18next';

import { useCareerExplorationReportFilters } from '@dc/components/CareerPathwayReport/useCareerExplorationReportFilters';

import { FiltersSummarizer } from '@shared/components/FiltersSummarizer/FiltersSummarizer';

type Props = {
  isLoading: boolean;
  studentsTotal?: number;
  summary?: {
    engagementsCount: number;
    clustersCount: number;
    pathwaysCount: number;
    usersCount: number;
    studentsCount: number;
  };
};

export const CareerExplorationSummary = ({ studentsTotal = 0, summary }: Props) => {
  const { t } = useTranslation();

  const { appliedFilters } = useCareerExplorationReportFilters();

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

  const statsToRender = [
    {
      title: t('careerExplorationReport.totalEngagements'),
      value: summary?.engagementsCount,
    },
    {
      title: t('careerExplorationReport.careerClusters'),
      value: summary?.clustersCount,
    },
    {
      title: t('careerExplorationReport.pathways'),
      value: summary?.pathwaysCount,
    },
    {
      title: t('careerExplorationReport.educators'),
      value: summary?.usersCount,
    },
    {
      title: t('careerExplorationReport.students'),
      value: summary?.studentsCount,
    },
  ];

  return (
    <div>
      <h5 className='mb-xs xxxl:mb-sm text-sm xxxl:text-base'>{t('reports.summary')}</h5>
      <div className='mb-sm xxxl:mb-base text-xs xxxl:text-sm leading-lg'>
        <FiltersSummarizer
          filters={filtersToDisplay}
          summaryConfig={summaryConfig}
          template={t('careerExplorationReport.summaryTemplate')}
        />
      </div>
      <h5 className='mb-xs xxxl:mb-sm text-sm xxxl:text-base'>
        {t('careerExplorationReport.statistics')}
      </h5>
      <p className='mb-xs xxxl:mb-sm text-xs xxxl:text-sm leading-lg flex items-center'>
        {t('careerExplorationReport.statisticsDescription')}
      </p>
      <div className='flex w-full justify-evenly rounded-sm border border-neutral-300 [&_div]:border-r [&_div]:border-neutral-300 [&_div:last-child]:border-none overflow-hidden'>
        {statsToRender.map((stat) => (
          <div key={stat.title} className='flex-1'>
            <h6 className='p-sm text-xxs xxxl:text-xs font-bold bg-neutral-200 mb-0 whitespace-nowrap border-b border-b-neutral-300'>
              {stat.title}
            </h6>
            <div className='bg-white px-sm py-xs text-xs xxxl:text-sm text-center font-medium'>
              {isUndefined(stat.value) ? '--' : stat.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};