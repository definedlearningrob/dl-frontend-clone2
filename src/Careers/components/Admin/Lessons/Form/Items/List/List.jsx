import classnames from 'classnames';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useField } from 'formik';
import { useTranslation } from 'react-i18next';

import AssignmentItem from '@dc/components/Admin/Lessons/Form/Items/List/AssignmentItem/AssignmentItem';
import AttachmentItem from '@dc/components/Admin/Lessons/Form/Items/List/AttachmentItem/AttachmentItem';
import ItemsDraggable from '@dc/components/Admin/Lessons/Form/Items/Shared/Draggable/Draggable';
import PresentationItem from '@dc/components/Admin/Lessons/Form/Items/List/ExternalPresentationItem/ExternalPresentationItem';
import ResearchLinkItem from '@dc/components/Admin/Lessons/Form/Items/List/ResearchLinkItem/ResearchLinkItem';
import TextItem from '@dc/components/Admin/Lessons/Form/Items/List/TextItem/TextItem';
import VideoItem from '@dc/components/Admin/Lessons/Form/Items/List/VideoItem/VideoItem';
import VocabularyItem from '@dc/components/Admin/Lessons/Form/Items/List/VocabularyItem/VocabularyItem';
import { assignSteps } from '@dc/utils/assignSteps';

AdminLessonsFormItemsList.propTypes = {
  items: PropTypes.array,
};

function AdminLessonsFormItemsList({ items }) {
  const [itemsInput, , itemsHelpers] = useField('lessonItems');
  const { t } = useTranslation();

  const removeItem = (item) => () => {
    const newItems = itemsInput.value.filter(
      ({ id, __typename }) => __typename !== item.__typename || id !== item.id
    );
    itemsHelpers.setValue(assignSteps(newItems));
  };

  const getListClasses = (isDraggingOver) =>
    classnames('lessons__items-list', { '-drag': isDraggingOver });

  const renderItem = (item, props) =>
    ({
      assignment: <AssignmentItem key={`assignment-${item.id}`} assignment={item} {...props} />,
      attachment: <AttachmentItem key={`attachment-${item.id}`} attachment={item} {...props} />,
      externalpresentation: (
        <PresentationItem key={`presentation-${item.id}`} presentation={item} {...props} />
      ),
      researchlink: (
        <ResearchLinkItem key={`research-link-${item.id}`} researchLink={item} {...props} />
      ),
      text: <TextItem key={`text-${item.id}`} text={item} {...props} />,
      video: <VideoItem key={`video-${item.id}`} video={item} {...props} />,
      vocabulary: <VocabularyItem key={`vocabulary-${item.id}`} vocabulary={item} {...props} />,
    }[item.__typename.toLowerCase()]);

  const reorder = ({ source, destination }) => {
    const result = Array.from(items);
    const [removed] = result.splice(source.index, 1);
    result.splice(destination.index, 0, removed);

    return assignSteps(result);
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const reordered = reorder(result);
    itemsHelpers.setValue(reordered);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='droppable'>
        {(provided, snapshot) => (
          <ul
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={getListClasses(snapshot.isDraggingOver)}>
            {items.length ? (
              items.map((item, index) => (
                <Draggable
                  key={`${item.__typename}-${item.id}`}
                  draggableId={`${item.__typename}-${item.id}`}
                  index={index}>
                  {({ draggableProps, dragHandleProps, innerRef }, snapshot) => (
                    <ItemsDraggable
                      className='lessons__list-item'
                      innerRef={innerRef}
                      isDragging={snapshot.isDragging}
                      {...draggableProps}
                      {...dragHandleProps}>
                      {renderItem(item, {
                        onRemove: removeItem(item),
                      })}
                    </ItemsDraggable>
                  )}
                </Draggable>
              ))
            ) : (
              <span>{t('admin.lessons.items.listPlaceholder')}</span>
            )}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default AdminLessonsFormItemsList;
