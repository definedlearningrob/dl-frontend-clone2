import { ChangeEvent, useEffect, useState } from 'react';
import { isEmpty } from 'lodash-es';
import { useField } from 'formik';

import { type TSchoolClass } from '@pbl/graphql/user/queries/schoolClasses';

import SharedCheckbox from '@shared/components/Checkbox/Checkbox';
import DeprecatedIconButton from '@shared/components/DeprecatedIconButton/DeprecatedIconButton';
import { ReactComponent as ChevronDownIcon } from '@shared/svg/chevron_down.svg';
import { useFilterContext } from '@shared/hooks/useFilterContext';

import styles from '../ProjectAssignBody.module.sass';
import { hasIncludedStudent, hasIncludedTeam } from '../helpers';

import { TeamItem } from './TeamItem';

type Props = {
  schoolClass: TSchoolClass;
};

export const ProjectAssignSchoolTeamItem = ({ schoolClass }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [teamIdsField, _, fieldHelpers] = useField('teamIds');
  //@ts-ignore
  const { filter } = useFilterContext();

  const teams = schoolClass.teams;
  const students = schoolClass.students.nodes;
  const teamIds = teams.map((team) => team.uuid);
  const formikTeamIds = teamIdsField.value || [];

  const hasSomeTeamsEnrolled = formikTeamIds.some((teamId: string) => teamIds.includes(teamId));

  const hasAllTeamsEnrolled =
    !isEmpty(teams) && teamIds.every((teamId: string) => formikTeamIds.includes(teamId));

  const indeterminate = !hasAllTeamsEnrolled && hasSomeTeamsEnrolled;

  useEffect(() => {
    if (!isOpen && filter.nameCont) {
      const searchedName = filter.nameCont.toLowerCase();

      if (hasIncludedStudent(students, searchedName) || hasIncludedTeam(teams, searchedName)) {
        setIsOpen(true);
      }
    }
  }, [filter.nameCont]);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.checked;

    if (newValue && !indeterminate) {
      const uniqueNewTeamIds = [...new Set([...formikTeamIds, ...teamIds])];

      fieldHelpers.setValue(uniqueNewTeamIds);
    } else {
      fieldHelpers.setValue(formikTeamIds.filter((teamId: string) => !teamIds.includes(teamId)));
    }
  };

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
          checked={hasAllTeamsEnrolled}
          className={styles.checkbox}
          id={schoolClass.uuid}
          indeterminate={indeterminate}
          onChange={onChange}
        />
        <label htmlFor={schoolClass.uuid}>{schoolClass.name}</label>
      </div>
      {isOpen && !isEmpty(schoolClass.teams) && (
        <ul className={styles.unorderedList}>
          {schoolClass.teams.map((team) => (
            <TeamItem key={team.uuid} team={team} />
          ))}
        </ul>
      )}
    </li>
  );
};
