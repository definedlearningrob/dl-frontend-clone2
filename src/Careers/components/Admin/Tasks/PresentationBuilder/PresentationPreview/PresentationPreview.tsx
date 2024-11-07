import cx from 'classnames';
import { RevealJS } from '@gregcello/revealjs-react';
import { useCallback, useEffect, useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { PresentationTypes } from '@graphql/dc/shared/types';
import { useToggle } from 'react-use';

import PresentationPreviewSlides, {
  RevealRef,
} from '@dc/components/Admin/Tasks/PresentationBuilder/PresentationPreview/PresentationPreviewSlides';
import TableOfContent from '@dc/components/Admin/Tasks/PresentationBuilder/PresentationPreview/TableOfContent/TableOfContent';
import SLIDES, { TSlidesData } from '@dc/graphql/user/queries/slides';
import TASK_PRESENTATION, {
  TTaskPresentationData,
  TTaskPresentationVariables,
} from '@dc/graphql/user/queries/taskPresentation';
import { toggleFullScreen } from '@dc/utils/toggleFullScreen';
import { ReactComponent as FullScreenIcon } from '@dc/assets/icons/full-screen-icon.svg';
import useUserInfo from '@dc/hooks/useUserInfo';

import { PresentationSidePanel } from '@pbl/components/Project/Presentation/PresentationSidePanel';
import { PresentationBottomPanel } from '@pbl/components/Project/Presentation/PresentationBottomPanel';
import { ResourcesModal } from '@pbl/components/Project/Presentation/ResourcesModal';

import DeprecatedIconButton from '@shared/components/DeprecatedIconButton/DeprecatedIconButton';
import { usePresentationState } from '@shared/hooks/usePresentationState';
import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';

import 'reveal.js/dist/reveal.css';
import 'reveal.js/plugin/highlight/monokai.css';
import 'reveal.js/dist/theme/black.css';
import styles from './PresentationPreview.module.sass';

const AdminTasksPresentationBuilderPresentationPreview = () => {
  const { presentationState, presentationDispatch } = usePresentationState();
  const { taskId, projectId } = useParams<{ taskId: string; projectId: string }>();
  const isOnSlides = !taskId && !projectId;
  const { startPolling, stopPolling } = useUserInfo();
  const presentationPreviewSlidesRef = useRef<RevealRef | null>(null);

  const [isResourcesModalOpen, toggleIsResourcesModalOpen] = useToggle(false);

  const presentationContainer = useRef<HTMLDivElement>(null);
  const libraryContainer = useRef<HTMLDivElement>(null);

  const { data, loading } = useQuery<TTaskPresentationData, TTaskPresentationVariables>(
    TASK_PRESENTATION,
    {
      variables: {
        id: taskId || projectId,
      },
      skip: isOnSlides,
      fetchPolicy: 'no-cache',
    }
  );

  const { data: slidesData, loading: slidesLoading } = useQuery<TSlidesData>(SLIDES, {
    skip: isOnSlides,
    fetchPolicy: 'no-cache',
  });

  const location = useLocation<{
    librarySlideId: string;
    taskId: string;
  }>();
  const isOnDC = location.pathname.includes('admin');

  // hide beacon if in presentation preview mode
  useEffect(() => {
    if (document.getElementById('beacon-script')) {
      // @ts-ignore
      window.Beacon('config', {
        display: {
          zIndex: '-1',
        },
      });
    }

    return () => {
      if (document.getElementById('beacon-script')) {
        // @ts-ignore
        window.Beacon('config', {
          display: {
            zIndex: '1049',
          },
        });
      }
    };
  }, []);

  useEffect(() => {
    presentationDispatch({
      type: 'SET_LIBRARY_SLIDE_ID',
      payload: location?.state?.librarySlideId,
    });
    presentationDispatch({
      type: 'SET_TASK_ID',
      payload: projectId || taskId,
    });

    if (isOnDC) stopPolling();

    return () => {
      if (isOnDC) startPolling();
    };
  }, []);

  const toggleFullscreenMode = () => {
    const properElement = presentationContainer.current || libraryContainer.current;
    if (properElement) {
      toggleFullScreen(properElement);

      presentationDispatch({
        type: 'SET_PRESENTATION_FULLSCREEN_MODE',
        payload: !presentationState.fullscreenMode,
      });
    }
  };

  const detectKeyCode = useCallback(
    (event) => {
      if (event.code === 'KeyF') {
        presentationDispatch({
          type: 'SET_PRESENTATION_FULLSCREEN_MODE',
          payload: true,
        });
      }

      if (
        !document.fullscreenElement &&
        // @ts-ignore
        !document.mozFullScreen &&
        // @ts-ignore
        !document.msFullscreenElement &&
        // @ts-ignore
        !document.webkitIsFullScreen &&
        event.code !== 'KeyF'
      ) {
        if (presentationState.fullscreenMode) {
          presentationDispatch({
            type: 'SET_PRESENTATION_FULLSCREEN_MODE',
            payload: false,
          });
        }
      }
    },
    [presentationState]
  );

  const handleNextSlide = () => {
    const revealInstance = presentationPreviewSlidesRef.current?.reveal;

    revealInstance?.next();
  };

  const handlePreviousSlide = () => {
    const revealInstance = presentationPreviewSlidesRef.current?.reveal;

    revealInstance?.prev();
  };

  useEffect(() => {
    document.addEventListener('fullscreenchange', detectKeyCode, false);
    document.addEventListener('keydown', detectKeyCode, false);
    document.addEventListener('mozfullscreenchange', detectKeyCode, false);
    document.addEventListener('MSFullscreenChange', detectKeyCode, false);
    document.addEventListener('webkitfullscreenchange', detectKeyCode, false);

    return () => {
      document.addEventListener('fullscreenchange', detectKeyCode, false);
      document.addEventListener('mozfullscreenchange', detectKeyCode, false);
      document.addEventListener('MSFullscreenChange', detectKeyCode, false);
      document.addEventListener('webkitfullscreenchange', detectKeyCode, false);
      document.removeEventListener('keydown', detectKeyCode, false);
    };
  }, []);

  if (loading || slidesLoading) return <SharedLoadingSpinner />;

  if ((!isOnSlides && !data) || (isOnSlides && !slidesData)) return null;

  const isBigPresentation = data!.task.presentation?.type === PresentationTypes.FULL_SCREEN;

  const presentationContainerClassname = cx(
    'theme',
    `theme__${data!.task.presentation.typography}`,
    {
      [styles.presentationPreview]: !isBigPresentation,
    }
  );

  const wrapperClassname = cx('w-full', {
    'h-[calc(100vh-120px)]': !presentationState.fullscreenMode,
    'h-[calc(100vh-72px)]': presentationState.fullscreenMode,
  });

  return !isOnSlides ? (
    <div
      ref={presentationContainer}
      className={presentationContainerClassname}
      id='presentation-custom-container'>
      <div className={wrapperClassname}>
        <div className='flex h-full'>
          {isBigPresentation && (
            <PresentationSidePanel
              ref={presentationPreviewSlidesRef}
              presentation={data!.task.presentation}
            />
          )}
          <RevealJS
            autoPlayMedia={false}
            controls={!isBigPresentation}
            margin={isBigPresentation ? 0 : 0.04}
            overview={false}
            progress={false}
            showNotes={true}
            slideNumber={false}>
            {!isBigPresentation && (
              <TableOfContent
                presentation={data!.task.presentation}
                presentationState={presentationState}
              />
            )}
            <PresentationPreviewSlides
              ref={presentationPreviewSlidesRef}
              presentation={data!.task.presentation}
            />
          </RevealJS>
          {!isBigPresentation && (
            <DeprecatedIconButton
              className={styles.toggleFullScreenButton}
              data-testid='toggle-full-screen-button'
              icon={<FullScreenIcon />}
              size='sm'
              onClick={toggleFullscreenMode}
            />
          )}
        </div>
      </div>
      {isBigPresentation && (
        <PresentationBottomPanel
          handleNextSlide={handleNextSlide}
          handlePreviousSlide={handlePreviousSlide}
          openModal={toggleIsResourcesModalOpen}
          toggleFullscreenMode={toggleFullscreenMode}
        />
      )}
      <ResourcesModal
        isOpen={isResourcesModalOpen}
        projectId={projectId}
        taskId={taskId}
        onDismiss={toggleIsResourcesModalOpen}
      />
    </div>
  ) : (
    <div ref={libraryContainer} className={styles.presentationPreview}>
      <RevealJS autoPlayMedia={false} overview={false} showNotes={true} slideNumber={false}>
        <PresentationPreviewSlides
          presentation={{
            slides: slidesData!.slides.nodes,
          }}
        />
      </RevealJS>
      <ResourcesModal
        isOpen={isResourcesModalOpen}
        projectId={projectId}
        taskId={taskId}
        onDismiss={toggleIsResourcesModalOpen}
      />
    </div>
  );
};

export default AdminTasksPresentationBuilderPresentationPreview;
