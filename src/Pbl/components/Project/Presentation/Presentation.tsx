import cx from 'classnames';
import { RevealJS } from '@gregcello/revealjs-react';
import { useEffect, useMemo, useRef } from 'react';
import { PresentationTypes } from '@graphql/dc/shared/types';
import { useToggle } from 'react-use';

import PresentationPreviewSlides, {
  RevealRef,
} from '@dc/components/Admin/Tasks/PresentationBuilder/PresentationPreview/PresentationPreviewSlides';
import { ReactComponent as FullScreenIcon } from '@dc/assets/icons/full-screen-icon.svg';
import { toggleFullScreen } from '@dc/utils/toggleFullScreen';
import TableOfContent from '@dc/components/Admin/Tasks/PresentationBuilder/PresentationPreview/TableOfContent/TableOfContent';

import { PresentationBottomPanel } from '@pbl/components/Project/Presentation/PresentationBottomPanel';
import { type TProject } from '@pbl/graphql/user/queries/project';
import useCustomizeProject from '@pbl/hooks/useCustomizeProject';
import UserProjectPresentationEditInfo from '@pbl/components/User/Project/Presentation/EditInfo/EditInfo';
import { PresentationSidePanel } from '@pbl/components/Project/Presentation/PresentationSidePanel';
import { ResourcesModal } from '@pbl/components/Project/Presentation/ResourcesModal';

import { usePresentationState } from '@shared/hooks/usePresentationState';
import DeprecatedIconButton from '@shared/components/DeprecatedIconButton/DeprecatedIconButton';
import { useRole } from '@shared/hooks/useRole';

import '@shared/components/Presentations/Themes/Themes.sass';
import '@shared/components/Presentations/Presentation.sass';
import 'reveal.js/dist/reveal.css';
import 'reveal.js/plugin/highlight/monokai.css';
import 'reveal.js/dist/theme/black.css';

import styles from './Presentation.module.sass';

type Props = {
  presentation: TProject['presentation'];
  projectId?: string;
  taskId?: string;
  taskName?: string;
  teamName?: string;
};

const ProjectPresentation = ({ presentation, projectId, taskId, taskName, teamName }: Props) => {
  const { presentationState, presentationDispatch } = usePresentationState();
  const { editMode, isOwner } = useCustomizeProject();
  const { isStudent, isPublic } = useRole();

  const [isResourcesModalOpen, toggleIsResourcesModalOpen] = useToggle(false);

  const customPresentationRef = useRef<HTMLDivElement>(null);
  const presentationPreviewSlidesRef = useRef<RevealRef | null>(null);

  const shouldRenderEditOverlay = Boolean(isOwner && editMode);

  const isBigPresentation = presentation?.type === PresentationTypes.FULL_SCREEN;

  const presentationClassNames = cx(
    styles.presentationPreview,
    !isOwner && styles.widePresentation,
    presentationState.fullscreenMode && styles.fullscreen,
    {
      '!h-[500px]': !isBigPresentation,
      ['!h-[80vh]']: isBigPresentation && isOwner,
      ['!h-full']: isBigPresentation && isStudent,
      ['mb-base']: !isBigPresentation || !isStudent,
      ['min-h-[calc(100vh-112px)] !mb-0 !h-[calc(100vh-112px)] flex flex-col']:
        isBigPresentation && isPublic,
    }
  );

  const toggleFullscreenMode = () => {
    if (customPresentationRef.current) {
      toggleFullScreen(customPresentationRef.current);
    }
  };

  const renderEditMode = () => (
    <>
      <div className={styles.backgroundDimmer} />
      <UserProjectPresentationEditInfo editable={true} />
    </>
  );

  const themeClasses = cx('theme', `theme__${presentation.typography}`, {
    ['flex flex-col grow']: isBigPresentation,
    ['!h-full']: !isBigPresentation,
  });

  const handleNextSlide = () => {
    const revealInstance = presentationPreviewSlidesRef.current?.reveal;

    revealInstance?.next();
  };

  const handlePreviousSlide = () => {
    const revealInstance = presentationPreviewSlidesRef.current?.reveal;

    revealInstance?.prev();
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    event.stopPropagation();

    if (event.key === 'ArrowRight') {
      handleNextSlide();
    }

    if (event.key === 'ArrowLeft') {
      handlePreviousSlide();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [presentationPreviewSlidesRef]);

  const renderRevealWithSlides = useMemo(
    () => (
      <div
        className={themeClasses}
        id='presentation-custom-container'
        style={{ position: 'relative', display: 'flex' }}>
        <div className={cx('w-full', { ['flex flex-col grow h-full']: isBigPresentation })}>
          <div
            className={cx('flex', {
              'h-[calc(100%-72px)]': isBigPresentation,
              'h-full': !isBigPresentation,
            })}>
            {isBigPresentation && (
              <PresentationSidePanel
                ref={presentationPreviewSlidesRef}
                presentation={presentation}
                taskName={taskName}
                teamName={teamName}
              />
            )}
            <RevealJS
              autoPlayMedia={false}
              controls={!isBigPresentation}
              embedded={true}
              keyboard={false}
              margin={isBigPresentation && !isOwner ? 0 : 0.04}
              overview={false}
              progress={false}
              showNotes={true}
              slideNumber={false}>
              {!isBigPresentation && (
                <TableOfContent presentation={presentation} presentationState={presentationState} />
              )}
              <PresentationPreviewSlides
                ref={presentationPreviewSlidesRef}
                presentation={presentation}
                projectId={projectId}
                userPreview={true}
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
          {isBigPresentation && (
            <PresentationBottomPanel
              handleNextSlide={handleNextSlide}
              handlePreviousSlide={handlePreviousSlide}
              openModal={toggleIsResourcesModalOpen}
              toggleFullscreenMode={toggleFullscreenMode}
            />
          )}
        </div>
      </div>
    ),
    [presentation]
  );

  useEffect(() => {
    const root = document.getElementsByTagName('html')[0];

    document.body.classList.remove('reveal-viewport');
    root.removeAttribute('class');
  });

  useEffect(() => {
    const onFullscreenChange = () => {
      presentationDispatch({
        type: 'SET_PRESENTATION_FULLSCREEN_MODE',
        payload: !presentationState.fullscreenMode,
      });
    };

    document.addEventListener('fullscreenchange', onFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', onFullscreenChange);
    };
  }, [presentationState.fullscreenMode, presentationDispatch]);

  return (
    <div
      ref={customPresentationRef}
      className={presentationClassNames}
      data-testid='defined-custom-presentation'>
      {renderRevealWithSlides}
      {shouldRenderEditOverlay && renderEditMode()}
      <ResourcesModal
        isOpen={isResourcesModalOpen}
        projectId={projectId}
        taskId={taskId}
        onDismiss={toggleIsResourcesModalOpen}
      />
    </div>
  );
};

export default ProjectPresentation;
