import { useEffect, useState } from 'react';
import { isEmpty } from 'lodash-es';
import { useField } from 'formik';
import { useTranslation } from 'react-i18next';

import { type TSchoolClass } from '@pbl/graphql/user/queries/schoolClasses';

import { useFilterContext } from '@shared/hooks/useFilterContext';
import { ReactComponent as ChevronDownIcon } from '@shared/svg/chevron_down.svg';
import DeprecatedIconButton from '@shared/components/DeprecatedIconButton/DeprecatedIconButton';
import SharedCheckbox from '@shared/components/Checkbox/Checkbox';

import ProjectAssignStudentsItem from '../StudentItem/AssignStudentItem';
import { TeamItem } from '../TeamItem';
import { hasIncludedStudent, hasIncludedTeam } from '../helpers';

import styles from './AssignedItems.module.sass';

type Props = {
  schoolClass: TSchoolClass;
};

export const AssignedItems = ({ schoolClass }: Props) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [studentIdsField] = useField('studentIds');
  const [teamIdsField] = useField('teamIds');
  //@ts-ignore
  const { filter } = useFilterContext();

  const students = schoolClass.students.nodes;
  const teams = schoolClass.teams;
  const studentIds = students.map((student) => student.uuid);
  const formikStudentIds = studentIdsField.value || [];
  const teamIds = teams.map((team) => team.uuid);
  const formikTeamIds = teamIdsField.value || [];

  const hasSomeStudentsEnrolled = formikStudentIds.some((studentId: string) =>
    studentIds.includes(studentId)
  );
  const hasAllStudentsEnrolled = studentIds.every((studentId: string) =>
    formikStudentIds.includes(studentId)
  );
  const hasSomeTeamsEnrolled = formikTeamIds.some((teamId: string) => teamIds.includes(teamId));
  const hasAllTeamsEnrolled = teamIds.every((teamId: string) => formikTeamIds.includes(teamId));

  const indeterminate =
    !hasAllStudentsEnrolled &&
    hasSomeStudentsEnrolled &&
    !hasAllTeamsEnrolled &&
    hasSomeTeamsEnrolled;

  useEffect(() => {
    if (!isOpen && filter.nameCont) {
      const searchedName = filter.nameCont.toLowerCase();

      if (hasIncludedStudent(students, searchedName) || hasIncludedTeam(teams, searchedName)) {
        setIsOpen(true);
      }
    }
  }, [filter.nameCont]);

  return (
    <li key={schoolClass.uuid}>
      <div className={styles.listItem}>
        <DeprecatedIconButton
          className={styles.checkbox}
          icon={<ChevronDownIcon />}
          size='sm'
          onClick={() => setIsOpen(!isOpen)}
        />
        <SharedCheckbox
          checked={hasAllStudentsEnrolled && hasAllTeamsEnrolled}
          className={styles.checkbox}
          id={schoolClass.uuid}
          indeterminate={indeterminate}
          readOnly={true}
        />
        <label htmlFor={schoolClass.uuid}>{schoolClass.name}</label>
      </div>
      {isOpen && (
        <ul className={styles.listWrapper}>
          {!isEmpty(schoolClass.students.nodes) && (
            <>
              <p className={styles.typeElement}>{t('user.project.assignment.students')}</p>
              {schoolClass.students.nodes.map((student) => (
                <ProjectAssignStudentsItem key={student.uuid} student={student} />
              ))}
            </>
          )}
          {!isEmpty(schoolClass.teams) && (
            <>
              <p className={styles.typeElement}>{t('user.project.assignment.teams')}</p>
              {schoolClass.teams.map((team) => (
                <TeamItem key={team.uuid} team={team} />
              ))}
            </>
          )}
        </ul>
      )}
    </li>
  );
};
