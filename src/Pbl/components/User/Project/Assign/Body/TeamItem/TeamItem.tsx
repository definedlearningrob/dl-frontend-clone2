import { FormEvent, useEffect, useState } from 'react';
import { isEmpty } from 'lodash-es';
import { useField } from 'formik';

import { TTeam } from '@pbl/graphql/user/queries/schoolClasses';

import SharedCheckbox from '@shared/components/Checkbox/Checkbox';
import DeprecatedIconButton from '@shared/components/DeprecatedIconButton/DeprecatedIconButton';
import { ReactComponent as ChevronDownIcon } from '@shared/svg/chevron_down.svg';
import { useFilterContext } from '@shared/hooks/useFilterContext';

import { hasIncludedStudentsInTeam } from '../helpers';

import styles from './TeamItem.module.sass';

type Props = {
  team: TTeam;
};

export const TeamItem = ({ team }: Props) => {
  //@ts-ignore
  const { filter } = useFilterContext();
  const [isOpen, setIsOpen] = useState(false);
  const [teamIdsField, _, fieldHelpers] = useField('teamIds');

  const checked = (teamId: string) =>
    teamIdsField.value.some((formikTeam: string) => formikTeam === teamId);

  const onChange = (event: FormEvent<HTMLInputElement>, passedTeamId: string) => {
    // @ts-ignore
    const newValue = event.target.checked;

    if (newValue) {
      fieldHelpers.setValue([...teamIdsField.value, passedTeamId]);
    } else {
      fieldHelpers.setValue(teamIdsField.value.filter((teamId: string) => teamId !== passedTeamId));
    }
  };

  useEffect(() => {
    if (!isOpen && filter.nameCont) {
      const searchedName = filter.nameCont.toLowerCase();

      if (hasIncludedStudentsInTeam(team, searchedName)) {
        setIsOpen(true);
      }
    }
  }, [filter.nameCont]);

  return (
    <li key={team.uuid} className={styles.listItem}>
      <div className={styles.listContent}>
        <DeprecatedIconButton
          className={styles.checkbox}
          icon={<ChevronDownIcon />}
          size='sm'
          onClick={() => setIsOpen(!isOpen)}
        />
        <SharedCheckbox
          checked={checked(team.uuid)}
          className={styles.checkbox}
          id={team.uuid}
          onChange={(event) => onChange(event, team.uuid)}
        />
        <label htmlFor={team.uuid}>{team.name}</label>
      </div>
      {isOpen && (
        <div className={styles.students}>
          {!isEmpty(team.students.nodes) &&
            team.students.nodes.map((student) => (
              <span
                key={student.uuid}
                className={styles.studentItem}>{`${student.firstName} ${student.lastName}`}</span>
            ))}
        </div>
      )}
    </li>
  );
};
