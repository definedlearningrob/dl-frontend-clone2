import PropTypes from 'prop-types';
import { createContext, useContext, useState } from 'react';

LessonsItemsProvider.propTypes = {
  children: PropTypes.node.isRequired,
  items: PropTypes.array,
  lessonItemsField: PropTypes.array,
  pagingComponents: PropTypes.object,
  refetchQuery: PropTypes.object,
  scope: PropTypes.string,
  type: PropTypes.string,
};

const LessonItemsContext = createContext();

export function LessonsItemsProvider({
  lessonItemsField,
  items,
  type,
  children,
  pagingComponents,
  refetchQuery,
}) {
  const [formVisible, setFormVisible] = useState(false);
  const [editingLessonItem, setEditingLessonItem] = useState(null);
  const [previewItem, setPreviewItem] = useState(null);
  const [itemToArchive, setItemToArchive] = useState(null);

  return (
    <LessonItemsContext.Provider
      value={[
        formVisible,
        setFormVisible,
        editingLessonItem,
        setEditingLessonItem,
        lessonItemsField,
        previewItem,
        setPreviewItem,
        items,
        type,
        setItemToArchive,
        itemToArchive,
        pagingComponents,
        refetchQuery,
      ]}>
      {children}
    </LessonItemsContext.Provider>
  );
}

function useLessonItems() {
  const [
    formVisible,
    setFormVisible,
    editingLessonItem,
    setEditingLessonItem,
    lessonItemsField,
    previewItem,
    setPreviewItem,
    items,
    type,
    setItemToArchive,
    itemToArchive,
    pagingComponents,
    refetchQuery,
  ] = useContext(LessonItemsContext);
  const [input, , helpers] = lessonItemsField;
  const open = () => setFormVisible(true);
  const close = () => {
    setEditingLessonItem(null);
    setFormVisible(false);
  };

  const addItem = (item) => {
    const { value } = input;
    const lastItem = value[value.length - 1];
    const step = lastItem ? lastItem.step + 1 : 1;

    helpers.setValue([...value, { ...item, step }]);
  };

  const getFilteredItems = () => {
    const addedItemsIds = input.value
      .filter(({ __typename }) => __typename?.toLowerCase() === type?.toLowerCase())
      .map(({ id }) => id);

    return items.filter(({ id }) => !addedItemsIds.includes(id));
  };

  const openForm = (item) => {
    if (item.id) {
      setEditingLessonItem(item);
    }
    setFormVisible(true);
  };

  const closeForm = () => {
    setFormVisible(false);
    setEditingLessonItem(null);
  };

  const openDeletionModal = (item) => {
    setItemToArchive(item);
  };

  const closeDeletionModal = () => {
    setItemToArchive(null);
  };

  return {
    formVisible,
    open,
    close,
    editingLessonItem,
    addItem,
    filteredItems: getFilteredItems(),
    previewItem,
    openForm,
    closeForm,
    setPreviewItem,
    itemToArchive,
    openDeletionModal,
    closeDeletionModal,
    deletionModalOpen: !!itemToArchive,
    pagingComponents,
    refetchQuery,
  };
}

export default useLessonItems;
