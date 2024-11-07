import { useState, type MouseEvent } from 'react';

import AdminTasksPresentationBuilderSlidesListDropdown from '@dc/components/Admin/Tasks/PresentationBuilder/SlidesList/Dropdown/Dropdown';
import AdminTasksPresentationBuilderSlidesListELementSlide from '@dc/components/Admin/Tasks/PresentationBuilder/SlidesList/SlidesListElement/Slide/SlidesListElementSlide';
import usePresentationBuilder from '@dc/hooks/usePresentationBuilder';
import { setSlideIndex } from '@dc/utils/setSlideIndex';
import type { TTaskPresentationSlide } from '@dc/graphql/user/queries/taskPresentation';

import SharedIcon from '@shared/components/Icon/Icon';
import { ReactComponent as GrabIcon } from '@shared/assets/icons/grab_icon.svg';
import { usePresentationState } from '@shared/hooks/usePresentationState';

import styles from './SlidesListElement.module.sass';
import DeleteModal from './DeleteModal/DeleteModal';

type Props = {
  isDragging: boolean;
  parentSlideId?: string;
  isParentShared?: boolean;
  slide: TTaskPresentationSlide;
  slideIndex: number;
  subSlideIndex: number;
  toggleNewSubSlideModal?: (slideId: string, value: boolean) => void;
};

function AdminTasksPresentationBuilderSlidesListELement({
  isDragging,
  isParentShared,
  parentSlideId,
  slide,
  slideIndex,
  subSlideIndex,
  toggleNewSubSlideModal,
}: Props) {
  const [mouseOver, setMouseOver] = useState(false);
  const [slideToDelete, setSlideToDelete] = useState<TTaskPresentationSlide | null>(null);
  const {
    handleArchiveSlide,
    currentSlide,
    handleRemoveSlide,
    handleAddToLibrary,
    handleUpdateSlide,
    setCurrentSlide,
    setSelectedSlideContent,
    currentPresentation,
    isSystemAdminUser,
  } = usePresentationBuilder();
  const inPresentationScope = currentPresentation.id;

  const { presentationState } = usePresentationState();
  const { presentationHasPendingChanges } = presentationState;

  const closeDeleteModal = () => setSlideToDelete(null);

  const archiveSlide = () => {
    if (slideToDelete) {
      handleArchiveSlide(slideToDelete.id);
      closeDeleteModal();
    }
  };

  const handleSlideSelect = (slide: TTaskPresentationSlide) => {
    const currentSlide = {
      ...slide,
      parentSlideId: subSlideIndex === -1 ? undefined : parentSlideId,
      subSlideSelected: subSlideIndex === -1 ? false : true,
    };
    if (presentationHasPendingChanges) {
      handleUpdateSlide();
    }
    setCurrentSlide(currentSlide);
    setSelectedSlideContent(null);
  };

  const handleMouseOver = (event: MouseEvent) => {
    event.preventDefault();

    if (event.type === 'mouseover') setMouseOver(true);

    if (event.type === 'mouseleave') setMouseOver(false);
  };

  return (
    <div
      className={
        subSlideIndex === -1
          ? 'slides-list_element_actions-wrapper'
          : 'sub-slides-list_element_actions-wrapper'
      }>
      {inPresentationScope && (
        <span
          className='slides-list_element_actions-wrapper_slide-index'
          onMouseLeave={handleMouseOver}
          onMouseOver={handleMouseOver}>
          {mouseOver || isDragging ? (
            <SharedIcon className='grab-slide_icon' icon={<GrabIcon />} size='xs' />
          ) : (
            setSlideIndex(subSlideIndex, slideIndex)
          )}
        </span>
      )}
      <div
        className='flex-grow'
        data-testid='slides-list-item-interactive'
        onClick={() => handleSlideSelect(slide)}>
        <AdminTasksPresentationBuilderSlidesListELementSlide
          navElement={true}
          presentation={currentPresentation}
          slide={slide}
          style={{
            backgroundColor:
              currentSlide?.id === slide.id ? currentSlide.backgroundColor : slide.backgroundColor,
            backgroundImage: slide.backgroundImage,
          }}
        />
        <p className={styles.name}>
          {currentSlide?.id === slide.id ? currentSlide.name : slide.name}
        </p>
      </div>
      {(!isParentShared || isSystemAdminUser) && (
        <AdminTasksPresentationBuilderSlidesListDropdown
          handleAddToLibrary={handleAddToLibrary}
          handleRemoveSlide={handleRemoveSlide}
          isParentShared={isParentShared}
          isSubslide={!!parentSlideId}
          setSlideToDelete={setSlideToDelete}
          slide={slide}
          toggleNewSubSlideModal={toggleNewSubSlideModal}
        />
      )}
      {slideToDelete && <DeleteModal onDelete={archiveSlide} onDismiss={closeDeleteModal} />}
    </div>
  );
}

export default AdminTasksPresentationBuilderSlidesListELement;
