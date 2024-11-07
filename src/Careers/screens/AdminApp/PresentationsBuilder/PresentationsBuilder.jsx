import { useLocation, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useQuery } from '@apollo/client';

import AdminTasksPresentationBuilderPresentation from '@dc/components/Admin/Tasks/PresentationBuilder/PresentationBuilder';
import SharedMainContent from '@dc/shared/MainContent/MainContent';
import SLIDES from '@dc/graphql/user/queries/slides';
import TASK_PRESENTATION from '@dc/graphql/user/queries/taskPresentation';
import { PresentationBuilderProvider } from '@dc/hooks/usePresentationBuilder';
import useUserInfo from '@dc/hooks/useUserInfo';
import { Roles } from '@dc/resources/enums';

import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';

function AdminAppPresentationBuilder() {
  const { taskId } = useParams();
  const location = useLocation();

  const { userInfo, stopPolling, startPolling, isSystemAdminUser } = useUserInfo();
  const { data, loading } = useQuery(TASK_PRESENTATION, {
    variables: {
      id: taskId,
    },
    skip: !taskId,
  });

  const { data: slidesData, loading: slidesLoading } = useQuery(SLIDES, { skip: !!taskId });

  const renderPresentationBuilder = (task) => (
    <PresentationBuilderProvider
      initialSlideId={location.state?.initialSlideId}
      isSystemAdminUser={isSystemAdminUser}
      presentation={task.presentation}
      taskId={taskId}
      onMount={stopPolling}
      onUnmount={startPolling}>
      <AdminTasksPresentationBuilderPresentation />
    </PresentationBuilderProvider>
  );

  useEffect(() => {
    const isOnLibrary = location?.state?.librarySlideId;

    const backUrl = isOnLibrary
      ? `/admin/tasks/${location?.state?.taskId}/presentation-builder`
      : '/admin/tasks';

    if (isOnLibrary && ![Roles.SYSTEM_ADMIN, Roles.SALES_ADMIN].includes(userInfo?.role)) {
      history.push(backUrl);
    }
  }, []);

  if (loading || slidesLoading) return <SharedLoadingSpinner />;

  if ((taskId && !data) || (!taskId && !slidesData)) return null;

  return (
    <SharedMainContent className='presentation-main-wrapper'>
      {taskId
        ? renderPresentationBuilder(data.task)
        : renderPresentationBuilder({
            presentation: {
              slides: slidesData.slides.nodes,
            },
          })}
    </SharedMainContent>
  );
}

export default AdminAppPresentationBuilder;
