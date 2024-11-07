import cx from 'classnames';
import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
} from 'react-beautiful-dnd';

import SlideListELement from '@dc/components/Admin/Tasks/PresentationBuilder/SlidesList/SlidesListElement/SlidesListElement';
import usePresentationBuilder from '@dc/hooks/usePresentationBuilder';
import type { TTaskPresentationSlide } from '@dc/graphql/user/queries/taskPresentation';

type Props = {
  slide: TTaskPresentationSlide;
  slideIndex: number;
};

function AdminTasksPresentationBuilderSubSlidesList({ slide, slideIndex }: Props) {
  const { currentSlide, taskId, isSystemAdminUser } = usePresentationBuilder();
  const isInPresentationScope = !!taskId;
  const isParentShared = slide.isShared;
  const slidesListClasses = (isDraggingOver: boolean) =>
    cx('slides-list -subslides', {
      '-is-dragging': isDraggingOver,
      '-is-shared': isParentShared && !isSystemAdminUser,
    });
  const slideClasses = (slideId: string, isDragging: boolean) =>
    cx('slides-list_element', {
      '-selected-sub-slide':
        currentSlide &&
        parseInt(currentSlide.id) === parseInt(slideId) &&
        currentSlide.subSlideSelected,
      '-is-dragging': isDragging,
    });

  return (
    <Droppable droppableId={`slides-list${slide.id}`} type='SUB_SLIDES_LIST'>
      {(provided: DroppableProvided, { isDraggingOver }: DroppableStateSnapshot) => (
        <ul
          className={slidesListClasses(isDraggingOver)}
          {...provided.droppableProps}
          ref={provided.innerRef}>
          {slide.subslides &&
            slide.subslides
              .slice()
              .sort((slideA, slideB) => slideA.step - slideB.step)
              .map((subSlide, subSlideIndex) => (
                <Draggable
                  key={`${slideIndex}${subSlideIndex}`}
                  draggableId={`${slideIndex}${subSlideIndex}`}
                  index={subSlideIndex}
                  isDragDisabled={isParentShared && isInPresentationScope}>
                  {(provided: DraggableProvided, { isDragging }: DraggableStateSnapshot) => (
                    <li
                      key={subSlide.id}
                      className={slideClasses(subSlide.id, isDragging)}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}>
                      <SlideListELement
                        isDragging={isDragging}
                        isParentShared={isParentShared}
                        parentSlideId={slide.id}
                        slide={subSlide}
                        slideIndex={slideIndex}
                        subSlideIndex={subSlideIndex}
                      />
                    </li>
                  )}
                </Draggable>
              ))}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
}

export default AdminTasksPresentationBuilderSubSlidesList;
