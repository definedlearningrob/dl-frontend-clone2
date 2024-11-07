import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import AdminTasksPresentationBuilderPresentationPreview from '@dc/components/Admin/Tasks/PresentationBuilder/PresentationPreview/PresentationPreview';

import { useNavigation } from '@shared/components/Sidebar/useNavigation';
import { usePresentationState } from '@shared/hooks/usePresentationState';

const PresentationBuilderPresentationPreviewScreen = () => {
  const { presentationDispatch } = usePresentationState();
  const { toggleIsHidden, setBackNavButton } = useNavigation();
  const { t } = useTranslation();

  useEffect(() => {
    setBackNavButton(true, null, `${t('admin.tasks.presentation.backToPresentationBuilder')}`);
    toggleIsHidden(true);

    return () => {
      setBackNavButton(false, null, null);
      toggleIsHidden(false);
      presentationDispatch({ type: 'SET_PRESENTATION_PREVIEW_MODE', payload: false });
    };
  }, []);

  return <AdminTasksPresentationBuilderPresentationPreview />;
};

export default PresentationBuilderPresentationPreviewScreen;
