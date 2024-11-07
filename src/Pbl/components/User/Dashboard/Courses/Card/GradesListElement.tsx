import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './GradesListElement.module.sass';

type Props = {
  range: {
    start: string;
    end: string;
  };
};

export const GradesListElement = ({ range }: Props) => {
  const { t } = useTranslation();
  const getRangeString = (range: { start: string; end: string }) =>
    range.start === range.end ? range.start : `${range.start}-${range.end}`;
  const gradesRange = useMemo(() => getRangeString(range), []);

  return (
    <li className={styles.grade} data-testid='grade-list-element'>
      <p className={styles.gradeText} data-testid='grade-text'>
        {t('user.dashboard.gradesRange', { gradesRange })}
      </p>
    </li>
  );
};
