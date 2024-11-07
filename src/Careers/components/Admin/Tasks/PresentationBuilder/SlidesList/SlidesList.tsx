import cx from 'classnames';
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
} from 'react-beautiful-dnd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import NewSlideModal from '@dc/components/Admin/Tasks/PresentationBuilder/SlidesList/Modal/NewSlideModal/NewSlideModal';
import NewSubSlideModal from '@dc/components/Admin/Tasks/PresentationBuilder/SlidesList/Modal/NewSubSlideModal/NewSubSlideModal';
import SlideListELement from '@dc/components/Admin/Tasks/PresentationBuilder/SlidesList/SlidesListElement/SlidesListElement';
import SubSlidesList from '@dc/components/Admin/Tasks/PresentationBuilder/SlidesList/SubSlidesList';
import usePresentationBuilder from '@dc/hooks/usePresentationBuilder';
import type { TTaskPresentationSlide } from '@dc/graphql/user/queries/taskPresentation';

import SharedButton from '@shared/components/Button/Button';
import SharedTabs from '@shared/components/DeprecatedTabs/DeprecatedTabs';

function AdminTasksPresentationBuilderSlidesList() {
  const { t } = useTranslation();
  const [isAddNewSlideModalOpen, setAddNewSlideModalOpen] = useState(false);
  const { taskId } = useParams<{ taskId: string }>();

  //PBL
  const { projectId } = useParams<{ projectId: string }>();

  const {
    currentSlide,
    handleOnSlideDragEnd,
    newSubSlideModalState,
    currentPresentation,
    toggleNewSubSlideModal,
    isSystemAdminUser,
  } = usePresentationBuilder();

  const slidesListClasses = (isDraggingOver: boolean) =>
    cx('slides-list', { '-is-dragging': isDraggingOver });

  const isAdmin = isSystemAdminUser;

  const isPresentationScope = !!(projectId || taskId);

  const slideClasses = (slideId: string, isDragging: boolean) =>
    cx('slides-list_element', {
      '-selected-slide':
        currentSlide &&
        parseInt(currentSlide.id) === parseInt(slideId) &&
        !currentSlide?.subSlideSelected,
      '-is-dragging': isDragging,
    });

  const toggleCloseAddNewSlideModal = () => setAddNewSlideModalOpen(!isAddNewSlideModalOpen);
  /* This is because dnd blocks propagation of click events -
  therefore input from settings section is kept focused
  and settings are not save */
  const blurSlideNameInput = () => {
    const inputElement = document.getElementById('Slide name');
    inputElement?.blur();
  };

  const modalTabs =
    isPresentationScope && isAdmin
      ? [
          { id: 'templates', label: t('admin.tasks.presentation.slideTemplates') },
          { id: 'library', label: t('admin.tasks.presentation.slideLibrary') },
        ]
      : [{ id: 'templates', label: t('admin.tasks.presentation.slideTemplates') }];

  return (
    <div
      className='preview bg-white flex flex-col min-h-full w-full pt-sm border-r border-neutral-300'
      data-testid='slides-list'>
      <h5 className='px-base xxxl:px-md'>{t('presentation.slides')}</h5>
      <div className='flex-grow min-h-0 scrollbar'>
        <DragDropContext onDragEnd={handleOnSlideDragEnd}>
          <Droppable droppableId='slides-list' type='SLIDES_LIST'>
            {(provided: DroppableProvided, { isDraggingOver }: DroppableStateSnapshot) => (
              <ul
                className={slidesListClasses(isDraggingOver)}
                {...provided.droppableProps}
                ref={provided.innerRef}>
                {currentPresentation.slides &&
                  currentPresentation.slides
                    .slice()
                    .sort(
                      (slideA: TTaskPresentationSlide, slideB: TTaskPresentationSlide) =>
                        slideA.step - slideB.step
                    )
                    .map((slide: TTaskPresentationSlide, slideIndex: number) => (
                      <Draggable
                        key={slide.id}
                        draggableId={slide.id}
                        index={slideIndex}
                        isDragDisabled={!isPresentationScope}>
                        {(provided: DraggableProvided, { isDragging }: DraggableStateSnapshot) => (
                          <li
                            className={slideClasses(slide.id, isDragging)}
                            data-testid='slides-list-item'
                            onClick={blurSlideNameInput}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}>
                            <SlideListELement
                              isDragging={isDragging}
                              slide={slide}
                              slideIndex={slideIndex}
                              subSlideIndex={-1}
                              toggleNewSubSlideModal={toggleNewSubSlideModal}
                            />
                            <SubSlidesList slide={slide} slideIndex={slideIndex} />
                          </li>
                        )}
                      </Draggable>
                    ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <div className='p-base xxxl:p-md'>
        <SharedButton
          className='w-full'
          data-testid='archive-modal-accept'
          size='sm'
          type='button'
          variant='primary'
          onClick={toggleCloseAddNewSlideModal}>
          {t('admin.tasks.presentation.addSlide')}
        </SharedButton>
      </div>
      {isAddNewSlideModalOpen && (
        <SharedTabs tabs={modalTabs}>
          <NewSlideModal closeModal={toggleCloseAddNewSlideModal} />
        </SharedTabs>
      )}
      {newSubSlideModalState.isOpen && (
        <SharedTabs tabs={modalTabs}>
          <NewSubSlideModal closeModal={toggleNewSubSlideModal} />
        </SharedTabs>
      )}
    </div>
  );
}

export default AdminTasksPresentationBuilderSlidesList;
