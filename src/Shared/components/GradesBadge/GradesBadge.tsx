import { isEmpty } from 'lodash-es';
import { useTranslation } from 'react-i18next';

import { groupGradesByRange } from '@shared/utils/groupGradesByRange';
import { NewTag } from '@shared/components/NewTag/NewTag';
import { Tooltip } from '@shared/components/Tooltip';
import { ToStringLiteral } from '@shared/utils/types';
import { TRACK_GRADES } from '@shared/resources/constants';

type Grade = ToStringLiteral<typeof TRACK_GRADES>;

type Props = {
  grades: string[];
  isTooltipDisabled?: boolean;
};

export const GradesBadge = ({ grades, isTooltipDisabled }: Props) => {
  const { t } = useTranslation();
  const groupedGrades = groupGradesByRange(grades as Grade[]);

  if (isEmpty(groupedGrades)) {
    return null;
  }

  const firstGrade = groupedGrades[0].start;
  const lastGrade = groupedGrades[groupedGrades.length - 1].end;

  const gradesLabel = firstGrade === lastGrade ? firstGrade : `${firstGrade} - ${lastGrade}`;

  return (
    <Tooltip
      className='min-w-0'
      delayDuration={500}
      disabled={isTooltipDisabled}
      message={t('catalogs.gradesRange', { gradesRange: gradesLabel })}>
      <NewTag>{t('catalogs.gradesRange', { gradesRange: gradesLabel })}</NewTag>
    </Tooltip>
  );
};
