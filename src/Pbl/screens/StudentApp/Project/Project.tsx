import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { ApolloError, useQuery } from '@apollo/client';
import { PresentationTypes } from '@graphql/shared/shared/types';

import Project from '@pbl/components/Student/Project/Project';
import projectQuery from '@pbl/graphql/student/queries/project';
import teamProjectQuery from '@pbl/graphql/student/queries/teamProject';
import { ProjectNotFound } from '@pbl/screens/StudentApp/Project/ProjectNotFound';

import { useNavigation } from '@shared/components/Sidebar/useNavigation';
import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';
import { MainContent } from '@shared/components/MainContent/MainContent';
import { handleError } from '@shared/utils/handleError';
import { cx } from '@shared/utils/cx';

const UserAppProject = () => {
  const { projectId, teamId } = useParams<{ projectId: string; teamId: string }>();
  const { setBackNavButton } = useNavigation();
  const properQuery = useMemo(() => (teamId ? teamProjectQuery : projectQuery), [teamId]);
  const { productId } = useParams<{ productId?: string }>();
  const { toggleIsHidden } = useNavigation();

  const queryVariables = useMemo(
    () =>
      teamId
        ? { id: projectId, teamId, track: true, trackPresentation: true }
        : { id: projectId, track: true, trackPresentation: true },
    [teamId]
  );

  const { data, error, loading } = useQuery(properQuery, { variables: queryVariables });

  useEffect(() => {
    if (productId !== undefined) {
      toggleIsHidden(true);
    } else {
      setBackNavButton(true);
    }

    return () => setBackNavButton(false);
  }, []);

  if (loading)
    return (
      <div className='h-[theme(layout.containerHeight)] flex justify-center'>
        <SharedLoadingSpinner size='small' />
      </div>
    );

  if (!loading && (error || !data?.project)) {
    if (error instanceof ApolloError && error.message !== 'Task not found') {
      handleError(error);
    }

    return <ProjectNotFound />;
  }

  const isBigPresentation = data?.project.presentation?.type === PresentationTypes.FULL_SCREEN;

  const contentClassNames = cx({
    'h-[theme(layout.containerHeight)] pt-0 xxxl:!pt-xs': isBigPresentation,
  });

  return (
    <MainContent className={contentClassNames}>
      <Project project={data.project} />
    </MainContent>
  );
};

export default UserAppProject;
