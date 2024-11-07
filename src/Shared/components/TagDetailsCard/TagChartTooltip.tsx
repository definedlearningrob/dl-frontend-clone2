import { round } from 'lodash-es';
import { useTranslation } from 'react-i18next';

type Props = {
  averageScore: number;
  numberOfStudents: number;
};

export const TagChartTooltip = ({ averageScore, numberOfStudents }: Props) => {
  const { t } = useTranslation();

  return (
    <div className='!tracking-normal'>
      <div>{t('tagsReport.averageScore', { score: round(averageScore, 2) })}</div>
      <div>{t('tagsReport.numberOfStudents', { count: numberOfStudents })}</div>
    </div>
  );
};
