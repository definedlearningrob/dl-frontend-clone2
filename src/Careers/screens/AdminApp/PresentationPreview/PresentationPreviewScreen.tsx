import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import AdminTasksPresentationBuilderPresentationPreview from '@dc/components/Admin/Tasks/PresentationBuilder/PresentationPreview/PresentationPreview';

import { useNavigation } from '@shared/components/Sidebar/useNavigation';
import { usePresentationState } from '@shared/hooks/usePresentationState';

const AdminTasksPresentationBuilderPresentationPreviewScreen = () => {
  const { presentationState } = usePresentationState();
  const { toggleIsHidden, setBackNavButton } = useNavigation();
  const { taskId } = useParams<{ taskId: string }>();
  const { t } = useTranslation();

  useEffect(() => {
    toggleIsHidden(true);

    return () => {
      toggleIsHidden(false);
    };
  }, []);

  useEffect(() => {
    const isInPresentationScope = !!taskId;

    const backButtonConfig = {
      library: {
        text: t('admin.tasks.presentation.backToSlidesLibrary'),
        url: {
          pathname: '/admin/slides/presentation-builder',
          state: {
            librarySlideId: presentationState.librarySlideId,
            taskId: presentationState.taskId,
          },
        },
      },
      builder: {
        text: t('admin.tasks.presentation.backToPresentationBuilder'),
        url: { pathname: `/admin/tasks/${taskId}/presentation-builder` },
      },
    };

    const config = isInPresentationScope ? backButtonConfig.builder : backButtonConfig.library;

    setBackNavButton(true, config.url.pathname, config.text);

    return () => {
      setBackNavButton(false, null, null);
    };
  }, []);

  return <AdminTasksPresentationBuilderPresentationPreview />;
};

export default AdminTasksPresentationBuilderPresentationPreviewScreen;
