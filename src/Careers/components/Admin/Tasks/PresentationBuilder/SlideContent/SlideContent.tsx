import { RevealJS, Slide } from '@gregcello/revealjs-react';
import Reveal from 'reveal.js';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';

import SharedTextEditor from '@dc/shared/TextEditor/TextEditor';
import usePresentationBuilder from '@dc/hooks/usePresentationBuilder';
import { TTaskPresentationSlide } from '@dc/graphql/user/queries/taskPresentation';

import DeprecatedIconButton from '@shared/components/DeprecatedIconButton/DeprecatedIconButton';
import DeprecatedTooltip from '@shared/components/DeprecatedTooltip/DeprecatedTooltip';
import { ReactComponent as AddIcon } from '@shared/svg/add.svg';
import { ReactComponent as ArrowDown } from '@shared/svg/chevron_down.svg';
import { ReactComponent as ArrowUp } from '@shared/svg/chevron_up.svg';
import { usePresentationState } from '@shared/hooks/usePresentationState';

type RevealType = typeof Reveal;

import Template from '../Template/Template';
function AdminTasksPresentationBuilderSlideContent() {
  const ref = useRef<HTMLDivElement>(null);
  const ref2 = useRef<RevealType | null>(null);
  const { presentationState } = usePresentationState();
  const { presentationHasPendingChanges } = presentationState;
  const { t } = useTranslation();
  const {
    currentSlide,
    currentPresentation,
    handleSettingsMenuChange,
    setSelectedSlideContent,
    handleUpdateSlide,
    setShowSlideNotes,
    showSlideNotes,
    toggleNewSubSlideModal,
    isSystemAdminUser,
  } = usePresentationBuilder();

  const [notes, setNotes] = useState('');
  const slideIdForNewSubSlide =
    currentSlide && currentSlide?.parentSlideId ? currentSlide.parentSlideId : currentSlide?.id;
  const showActionForSharedSlides =
    isSystemAdminUser && currentSlide?.isShared && !currentSlide.subSlideSelected;
  const showActionForSlides = !currentSlide?.subSlideSelected && !currentSlide?.isShared;

  const handleClickOutsideSlide = (event: MouseEvent) => {
    const slideContainer = document.getElementById('read');

    if (
      (ref.current && ref.current.contains(event.target as Node)) ||
      event.target === slideContainer
    ) {
      setSelectedSlideContent(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mouseup', handleClickOutsideSlide, true);

    return () => {
      document.removeEventListener('mouseup', handleClickOutsideSlide, true);
    };
  }, []);

  useEffect(() => {
    if (currentSlide) {
      setNotes(currentSlide.notes);
    }
  }, [currentSlide?.id]);

  const handleSelectSlideContent = (
    contentElement: { type: string; id: string } | null,
    slide: TTaskPresentationSlide
  ) => {
    const displayExistingSlideMode = slide.id;

    if (displayExistingSlideMode) {
      if (presentationHasPendingChanges) {
        handleUpdateSlide();
      }

      setSelectedSlideContent(contentElement);
      handleSettingsMenuChange(0);
    }
  };

  const handleNotesSave = () => {
    if (currentSlide?.notes !== notes) {
      handleUpdateSlide(null, { notes });
    }
  };

  // ensures that on each rerender it resyncs the ui (for now it's usable on 8x slowdown CPU)
  // in case of performance issues - move to useEffect with currentSlide dependency
  ref2.current?.sync();

  return (
    <div ref={ref} className='content' data-testid='slides-content'>
      <RevealJS
        autoPlayMedia={false}
        controls={false}
        keyboard={false}
        margin={0.2}
        mouseWheel={false}
        overview={false}
        progress={false}
        onDeckReady={(deck) => {
          ref2.current = deck;
        }}>
        <Slide
          backgroundColor={currentSlide?.backgroundColor}
          backgroundImage={currentSlide?.backgroundImage}>
          <Template
            handleSelectSlideContent={handleSelectSlideContent}
            presentation={currentPresentation}
            role='editor'
            slide={currentSlide!}
          />
        </Slide>
      </RevealJS>
      {(showActionForSharedSlides || showActionForSlides) && (
        <DeprecatedTooltip message={t('admin.tasks.presentation.createSubslide')} variant='dark'>
          <DeprecatedIconButton
            className='sub-slide-button'
            data-testid='presentation-builder-dropdown__open-dropdown'
            icon={<AddIcon />}
            size='sm'
            onClick={() => toggleNewSubSlideModal(slideIdForNewSubSlide!, true)}
          />
        </DeprecatedTooltip>
      )}
      <div className={showSlideNotes ? 'notes' : 'notes -close'}>
        {showSlideNotes && (
          <SharedTextEditor
            data-testid='presentation-builder-description-input'
            editorConfig={{
              value: notes,
              onChange: setNotes,
              onBlur: () => handleNotesSave(),
            }}
            label={t('admin.tasks.presentation.notes')}
            placeholder={t('admin.tasks.presentation.notesPlaceholder')}
          />
        )}
        <span className='notes-action' onClick={() => setShowSlideNotes(!showSlideNotes)}>
          {showSlideNotes ? <ArrowDown /> : <ArrowUp />} {t('admin.tasks.presentation.notes')}
        </span>
      </div>
    </div>
  );
}

export default AdminTasksPresentationBuilderSlideContent;
