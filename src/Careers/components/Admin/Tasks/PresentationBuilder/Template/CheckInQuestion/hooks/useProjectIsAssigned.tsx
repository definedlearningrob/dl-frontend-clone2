import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { isEmpty } from 'lodash-es';

import teamProjectQuery from '@pbl/graphql/student/queries/teamProject';
import projectQuery from '@pbl/graphql/student/queries/project';

import { useRole } from '@shared/hooks/useRole';

export const useProjectIsAssigned = () => {
  const { isStudent } = useRole();
  const { projectId, teamId } = useParams<{ projectId: string; teamId: string }>();

  const properQuery = useMemo(() => (teamId ? teamProjectQuery : projectQuery), [teamId]);

  const queryVariables = useMemo(
    () =>
      teamId
        ? { id: projectId, teamId, track: true, trackPresentation: true }
        : { id: projectId, track: true, trackPresentation: true },
    [teamId]
  );

  const { data, error, loading } = useQuery(properQuery, {
    variables: queryVariables,
    skip: !isStudent,
  });

  if (!isStudent || loading || error) {
    return false;
  }

  return !isEmpty(data?.project?.assignedAt);
};
