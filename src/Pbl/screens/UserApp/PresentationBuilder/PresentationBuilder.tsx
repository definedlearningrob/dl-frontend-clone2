import { useLayoutEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';

import AdminTasksPresentationBuilderPresentation from '@dc/components/Admin/Tasks/PresentationBuilder/PresentationBuilder';
import SharedMainContent from '@dc/shared/MainContent/MainContent';
import TASK_PRESENTATION, {
  type TTaskPresentationData,
  type TTaskPresentationVariables,
} from '@dc/graphql/user/queries/taskPresentation';
import SLIDES, { type TSlidesData } from '@dc/graphql/user/queries/slides';
import { PresentationBuilderProvider } from '@dc/hooks/usePresentationBuilder';

import useUserInfo from '@pbl/hooks/useUserInfo';
import { TUserInfo } from '@pbl/graphql/user/queries/userInfo';

import { useNavigation } from '@shared/components/Sidebar/useNavigation';
import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';

function AdminAppPresentationBuilder() {
  const { toggleIsHidden, setBackNavButton } = useNavigation();
  const { userInfo } = useUserInfo<TUserInfo>();
  const { projectId } = useParams<{ projectId: string }>();
  const location = useLocation();
  const { t } = useTranslation();
  const { data, loading } = useQuery<TTaskPresentationData, TTaskPresentationVariables>(
    TASK_PRESENTATION,
    {
      variables: {
        id: projectId,
      },
      skip: !projectId,
    }
  );
  const { data: slidesData, loading: slidesLoading } = useQuery<TSlidesData>(SLIDES, {
    skip: !!projectId,
  });

  const renderPresentationBuilder = (task: any) => (
    <PresentationBuilderProvider
      //@ts-ignore
      initialSlideId={location.state?.initialSlideId}
      isSystemAdminUser={userInfo.isSystemAdmin}
      presentation={task.presentation}
      taskId={projectId}>
      <AdminTasksPresentationBuilderPresentation />
    </PresentationBuilderProvider>
  );

  useLayoutEffect(() => {
    const destination = projectId && `/projects/${projectId}`;
    setBackNavButton(
      true,
      null,
      destination ? `${t('admin.tasks.presentation.backToProject')}` : null
    );
    toggleIsHidden(true);

    return () => {
      toggleIsHidden(false);
      setBackNavButton(false);
    };
  }, []);

  if (loading || slidesLoading) return <SharedLoadingSpinner />;

  if ((projectId && !data) || (!projectId && !slidesData)) return null;

  return (
    <SharedMainContent className='presentation-main-wrapper'>
      {projectId
        ? renderPresentationBuilder(data!.task)
        : renderPresentationBuilder({
            presentation: {
              slides: slidesData!.slides.nodes,
            },
          })}
    </SharedMainContent>
  );
}

export default AdminAppPresentationBuilder;
