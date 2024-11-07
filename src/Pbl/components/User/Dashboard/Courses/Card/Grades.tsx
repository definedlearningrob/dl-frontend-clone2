import { TGrade } from '@pbl/graphql/user/queries/dashboardCourses';
import { GradesListElement } from '@pbl/components/User/Dashboard/Courses/Card/GradesListElement';

import { groupGradesByRange } from '@shared/utils/groupGradesByRange';

import styles from './Grades.module.sass';

type Props = {
  grades: TGrade[];
};

export const Grades = ({ grades }: Props) => {
  const groupedGradesByRange = groupGradesByRange(grades);
  const firstGrade = groupedGradesByRange[0].start;
  const lastGrade = groupedGradesByRange[groupedGradesByRange.length - 1].end;
  const groupedGrades =
    groupedGradesByRange.length === 1
      ? groupedGradesByRange
      : [{ start: firstGrade, end: lastGrade }];

  const renderGrades = () =>
    groupedGrades.map((range) => <GradesListElement key={range.start} range={range} />);

  return (
    <ul className={styles.gradesWrapper} data-testid='grades-summary'>
      {renderGrades()}
    </ul>
  );
};
