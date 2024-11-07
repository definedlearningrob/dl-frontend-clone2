import cx from 'classnames';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Settings from '@dc/components/Admin/Tasks/PresentationBuilder/Settings/Settings';
import SharedFilterProvider from '@dc/shared/FilterProvider/FilterProvider';
import SlideContent from '@dc/components/Admin/Tasks/PresentationBuilder/SlideContent/SlideContent';
import SlidesList from '@dc/components/Admin/Tasks/PresentationBuilder/SlidesList/SlidesList';
import usePresentationBuilder from '@dc/hooks/usePresentationBuilder';
import { EmptySlidePlaceholder } from '@dc/components/Admin/Tasks/PresentationBuilder/EmptySlidePlaceholder';

import SharedButton from '@shared/components/Button/Button';
import SharedModal from '@shared/components/Modal/Modal';
import '@shared/components/Presentations/Themes/Themes.sass';
import '@shared/components/Presentations/Presentation.sass';
import { useNavigation } from '@shared/components/Sidebar/useNavigation';
import { usePresentationState } from '@shared/hooks/usePresentationState';
import { useDetectApplicationType } from '@shared/hooks/useDetectApplicationType';

function AdminTasksPresentationBuilder() {
  const { t } = useTranslation();
  const { presentationState, presentationDispatch } = usePresentationState();
  const { currentPresentation, currentSlide, taskId, isSystemAdminUser } = usePresentationBuilder();
  const { toggleIsHidden, setBackNavButton } = useNavigation();
  const location = useLocation();
  const { isCareersApp } = useDetectApplicationType();

  const showSharedEditionModal = currentSlide?.isShared && !presentationState.sharedSlideVisited;

  useEffect(() => {
    toggleIsHidden(true);
    presentationDispatch({
      type: 'SET_LIBRARY_SLIDE_ID',
      payload: location?.state?.librarySlideId,
    });
    presentationDispatch({
      type: 'SET_TASK_ID',
      payload: taskId || location?.state?.taskId,
    });

    return () => {
      toggleIsHidden(false);
      presentationDispatch({
        type: 'SET_LIBRARY_SLIDE_ID',
        payload: null,
      });
      presentationDispatch({
        type: 'SET_TASK_ID',
        payload: null,
      });
    };
  }, [location.state, presentationState.sharedSlideVisited]);

  useEffect(() => {
    const isOnLibrary = location?.state?.librarySlideId;

    const backUrl = isOnLibrary
      ? `/admin/tasks/${location?.state?.taskId}/presentation-builder`
      : '/admin/tasks';

    if (isCareersApp) {
      setBackNavButton(true, backUrl, currentPresentation.name);
    } else {
      setBackNavButton(true, null, t('admin.tasks.presentation.backToProject'));
    }

    return () => setBackNavButton(false, null, null);
  }, [currentPresentation.name]);

  useEffect(() => {
    const root = document.getElementsByTagName('html')[0];

    document.body.classList.add('reveal-viewport');
    root.setAttribute('class', 'reveal-full-page');

    return () => {
      document.body.classList.remove('reveal-viewport');
      root.removeAttribute('class', 'reveal-full-page');
    };
  }, []);

  const handleConfirmSharedEdition = () =>
    presentationDispatch({
      type: 'SET_SHARED_SLIDE_VISITED',
      payload: true,
    });

  const themeClasses = cx('theme', `theme__${currentPresentation.typography}`);

  const sharedModalTitle = isSystemAdminUser
    ? t('admin.tasks.presentation.sharedModalSysAdminTitle')
    : t('admin.tasks.presentation.sharedModalTitle');

  const sharedModalInfo = isSystemAdminUser
    ? t('admin.tasks.presentation.sharedEditInfoSysAdmin')
    : t('admin.tasks.presentation.sharedEditInfo');

  return (
    <SharedFilterProvider>
      {() => (
        <div className={themeClasses}>
          <SlidesList />
          {currentSlide ? <SlideContent /> : <EmptySlidePlaceholder />}
          <Settings />
          {showSharedEditionModal && (
            <SharedModal onDismiss={handleConfirmSharedEdition}>
              <SharedModal.Header>
                <SharedModal.Heading>{sharedModalTitle}</SharedModal.Heading>
              </SharedModal.Header>
              <SharedModal.Body>
                <span className='shared-slides-modal-body'>{sharedModalInfo}</span>
              </SharedModal.Body>
              <SharedModal.Footer align='center'>
                <SharedButton size='md' variant='primary' onClick={handleConfirmSharedEdition}>
                  {t('common.actions.confirm')}
                </SharedButton>
              </SharedModal.Footer>
            </SharedModal>
          )}
        </div>
      )}
    </SharedFilterProvider>
  );
}

export default AdminTasksPresentationBuilder;
