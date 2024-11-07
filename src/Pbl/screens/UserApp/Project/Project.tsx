import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Project from '@pbl/components/User/Project/Project';
import SharedMainContent from '@pbl/shared/MainContent/MainContent';
import { CustomizeProjectProvider } from '@pbl/hooks/useCustomizeProject';
import useProjectQuery from '@pbl/graphql/user/hooks/useProjectQuery';
import useProjectInLessonQuery from '@pbl/graphql/user/hooks/useProjectInLessonQuery';
import MY_PROJECTS, {
  TMyProjectsData,
  TMyProjectsVariables,
} from '@pbl/graphql/user/queries/myProjects';
import { ArchivableStatusTypes } from '@pbl/resources/enums';

import EmptyState from '@shared/components/EmptyState/EmptyState';
import Link from '@shared/components/Link';
import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';
import useQueryParams from '@shared/hooks/useQueryParams';
import { useLti } from '@shared/components/LtiProvider/LtiProvider';
import { useNavigation } from '@shared/components/Sidebar/useNavigation';
import useClearCacheOnUnmount from '@shared/hooks/useClearCacheOnUnmount';
import { useInfiniteQuery } from '@shared/hooks/useInfiniteQuery';

function UserAppProject() {
  const { setBackNavButton } = useNavigation();
  const { toggleIsHidden } = useNavigation();
  const { t } = useTranslation();
  const { isLti, isLtiSearch } = useLti();

  const { lessonId, projectId, productId } =
    useParams<{ lessonId: string; projectId: string; productId?: string }>();

  const {
    params: { code },
  } = useQueryParams<{ code: string }>();

  const isPartOfTheLesson = lessonId !== undefined;

  const {
    data: projectData,
    loading: projectLoading,
    error: projectError,
  } = useProjectQuery(projectId, code, isPartOfTheLesson);
  const {
    data: projectInLessonData,
    loading: projectInLessonLoading,
    error: projectInLessonError,
  } = useProjectInLessonQuery(lessonId, projectId, !isPartOfTheLesson);
  const loading = projectLoading || projectInLessonLoading;
  const error = projectError || projectInLessonError;

  const { data: archivedTasks } = useInfiniteQuery<TMyProjectsData, TMyProjectsVariables>(
    MY_PROJECTS,
    {
      variables: { scope: ArchivableStatusTypes.ARCHIVED, page: 1, perPage: 10000 },
    }
  );
  useClearCacheOnUnmount('myTasks');

  useEffect(() => {
    if ((isLti && productId !== undefined) || isLtiSearch) {
      toggleIsHidden(true);
    }
    if (isLtiSearch) {
      setBackNavButton(true, null, 'Close', () => window.close());
    } else if (isLti && productId !== undefined) {
      setBackNavButton(false);
    } else {
      setBackNavButton(true);
    }

    return () => setBackNavButton(false);
  }, []);

  const project = isPartOfTheLesson ? projectInLessonData?.lesson.project : projectData?.project;
  const lessonTitle = isPartOfTheLesson ? projectInLessonData?.lesson.displayName : undefined;

  if (loading) {
    return (
      <SharedMainContent>
        <SharedLoadingSpinner size='small' />
      </SharedMainContent>
    );
  }

  const hasArchivedTask = archivedTasks?.myProjects?.nodes.find(
    (project) => project.id === projectId && project.isArchived
  );

  if (hasArchivedTask) {
    return (
      <SharedMainContent>
        <EmptyState heading={t('user.project.projectHasBeenArchived')}>
          <Link to='/my-projects' variant='primary'>
            {t('common.actions.back')}
          </Link>
        </EmptyState>
      </SharedMainContent>
    );
  } else if (error || !project) {
    return (
      <SharedMainContent>
        <EmptyState heading={t('user.project.notFound')}>
          <Link to='/my-projects' variant='primary'>
            {t('common.actions.back')}
          </Link>
        </EmptyState>
      </SharedMainContent>
    );
  }

  return (
    <SharedMainContent>
      <CustomizeProjectProvider
        id={projectId}
        isAssigned={project?.assignedStudentsCount > 0}
        ownerId={project.owner && project.owner.uuid}>
        <Project lessonTitle={lessonTitle} project={project} />
      </CustomizeProjectProvider>
    </SharedMainContent>
  );
}

export default UserAppProject;
