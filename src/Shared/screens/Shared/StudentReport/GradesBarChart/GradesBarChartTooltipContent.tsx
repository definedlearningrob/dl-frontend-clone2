import { useTranslation } from 'react-i18next';

import { Badge } from '@shared/components/Badge/Badge';
import { SERVICE_NAME } from '@shared/resources/enums';

import { GradesBarChartItem } from './GradesBarChart';

export const GradesBarChartTooltipContent = ({
  origin,
  contextName,
  rubricName,
  scoreEarned,
}: GradesBarChartItem) => {
  const { t } = useTranslation();

  const labelClasses = 'font-medium';
  const isDefinedCareersGrade = origin === SERVICE_NAME.CAREERS;

  return (
    <div className='grid gap-x-xs gap-y-xxs grid-cols-[auto_1fr] leading-lg text-xxs'>
      <span className={labelClasses}>{t('studentGoalReport.source')}</span>
      <Badge className='w-fit' size='small' type={isDefinedCareersGrade ? 'danger' : 'primary'}>
        {t(isDefinedCareersGrade ? 'sharedCommon.dc' : 'sharedCommon.dl')}
      </Badge>
      <span className={labelClasses}>
        {t(isDefinedCareersGrade ? 'studentGoalReport.course' : 'studentGoalReport.project')}
      </span>
      {contextName}
      <span className={labelClasses}>{t('studentGoalReport.rubric')}</span>
      {rubricName}
      <span className={labelClasses}>{t('studentGoalReport.score')}</span>
      <Badge className='w-fit' size='small' type='primary'>
        {scoreEarned}
      </Badge>
    </div>
  );
};
