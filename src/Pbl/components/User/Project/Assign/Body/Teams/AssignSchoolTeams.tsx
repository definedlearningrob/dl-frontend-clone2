import { isEmpty } from 'lodash-es';
import { useTranslation } from 'react-i18next';

import { type TSchoolClass } from '@pbl/graphql/user/queries/schoolClasses';
import { getFilteredSchoolClasses } from '@pbl/components/User/Project/Assign/Body/helpers';
import { ReactComponent as EmptyTeams } from '@pbl/images/empty_teams.svg';

import { useFilterContext } from '@shared/hooks/useFilterContext';

import ProjectAssignEmpty from '../Empty/AssignEmpty';
import { ProjectAssignSchoolTeamItem } from '../TeamItem';

import styles from './AssignSchoolTeams.module.sass';

type Props = {
  schoolClasses: TSchoolClass[];
};

export const ProjectAssignSchoolTeams = ({ schoolClasses }: Props) => {
  //@ts-ignore
  const { filter } = useFilterContext();
  const filteredSchoolClasses = getFilteredSchoolClasses({ schoolClasses, filter });
  const { t } = useTranslation();

  if (isEmpty(schoolClasses)) {
    return (
      <div className={styles.emptyContainer}>
        <EmptyTeams />
        <h6 className={styles.emptyTitle}>{t('user.project.assignment.empty.teams')}</h6>
        <p className={styles.emptyDescription}>
          {t('user.project.assignment.empty.noTeamsInClass')}
        </p>
      </div>
    );
  }

  return (
    <>
      {!isEmpty(filteredSchoolClasses) ? (
        <ul>
          {filteredSchoolClasses.map((classx: TSchoolClass) => (
            <ProjectAssignSchoolTeamItem key={classx.uuid} schoolClass={classx} />
          ))}
        </ul>
      ) : (
        <ProjectAssignEmpty tab='Teams' />
      )}
    </>
  );
};
