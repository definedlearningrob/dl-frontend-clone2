import { isEmpty } from 'lodash-es';
import { useParams } from 'react-router-dom';

import EmptyTeams from '@pbl/components/User/Teams/EmptyTeams/EmptyTeams';
import TeamsModule from '@pbl/components/User/Teams/TeamsModule/TeamsModule';
import { useSchoolClass } from '@pbl/graphql/user/hooks/useSchoolClass';

import ProjectCard from '@shared/components/Card/Card';
import DataSuspense from '@shared/components/DataSuspense/DataSuspense';

import styles from './Teams.module.sass';

const UserTeams = () => {
  const { classId } = useParams<{ classId: string }>();
  const { data, loading, error } = useSchoolClass({ uuid: classId });

  return (
    <DataSuspense error={error} loading={loading}>
      <ProjectCard className={styles.container}>
        <ProjectCard.Body className={styles.body}>
          {isEmpty(data?.schoolClass.teams) ? (
            <EmptyTeams />
          ) : (
            <TeamsModule teams={data!.schoolClass.teams} />
          )}
        </ProjectCard.Body>
      </ProjectCard>
    </DataSuspense>
  );
};

export default UserTeams;
