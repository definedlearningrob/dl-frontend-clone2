import { isNull } from 'lodash-es';

import styles from './ScoreRange.module.sass';

type Props = {
  label: string;
  minScore: number;
  maxScore: number;
  minValue: number | null;
  maxValue: number | null;
};

export const ScoreRange = ({ label, minScore, maxScore, minValue, maxValue }: Props) => {
  const calculatePercentage = (value: number) => ((value - minScore) * 100) / (maxScore - minScore);

  if (isNull(minValue) || isNull(maxValue)) {
    return null;
  }

  const minValuePercentage = calculatePercentage(minValue);
  const maxValuePercentage = calculatePercentage(maxValue);

  return (
    <div>
      <p className={styles.label}>{label}</p>
      <div className={styles.backgroundTrack}>
        <div
          className={styles.primaryTrack}
          style={{
            marginLeft: `${minValuePercentage}%`,
            marginRight: `calc(100% - ${maxValuePercentage}%)`,
          }}
        />
        <div className={styles.marker} style={{ left: `${minValuePercentage}%` }} />
        <div className={styles.marker} style={{ left: `${maxValuePercentage}%` }} />
      </div>
      <div className={styles.valueLabelsWrapper}>
        <span className={styles.valueLabel} style={{ left: `${minValuePercentage}%` }}>
          {minValue}
        </span>
        <span className={styles.valueLabel} style={{ left: `${maxValuePercentage}%` }}>
          {maxValue}
        </span>
      </div>
    </div>
  );
};
