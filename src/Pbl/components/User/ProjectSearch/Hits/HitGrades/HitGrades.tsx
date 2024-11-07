import { useMemo } from 'react';

import { sortGrades } from '@pbl/components/User/ProjectSearch/helpers';
import { TGrade } from '@pbl/graphql/user/queries/dashboardCourses';
import { GradesListElement } from '@pbl/components/User/Dashboard/Courses/Card/GradesListElement';

import { groupGradesByRange } from '@shared/utils/groupGradesByRange';

import styles from './HitGrades.module.sass';

type Props = {
  grades: TGrade[];
};

export const HitGrades = ({ grades }: Props) => {
  const sortedGrades = sortGrades(grades);
  const groupedGradesByRange = useMemo(() => groupGradesByRange(sortedGrades), [grades]);

  const renderGrades = () =>
    groupedGradesByRange.map((range) => <GradesListElement key={range.start} range={range} />);

  return (
    <ul className={styles.gradesSummary} data-testid='grades-summary'>
      {renderGrades()}
    </ul>
  );
};
