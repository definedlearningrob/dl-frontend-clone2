import { isEmpty } from 'lodash-es';
import { DragDropContext, Droppable, DroppableProvided, DropResult } from 'react-beautiful-dnd';
import { useEffect, useState } from 'react';

import ArchiveCheckInItemModal from '@pbl/components/User/Project/CheckIns/ArchiveCheckInItemModal/ArchiveCheckInItemModal';
import CheckInsHeader from '@pbl/components/User/Project/CheckIns/CheckInsHeader/CheckInsHeader';
import CheckInItem from '@pbl/components/User/Project/CheckIns/CheckInsItems/CheckInItem/CheckInItem';
import { CustomizeCheckInQuestionProvider } from '@pbl/hooks/useCustomizeCheckInQuestion';
import { TCheckInQuestion } from '@pbl/components/Project/types';
import { useCheckIns } from '@pbl/components/Project/helpers/CheckInContext';

import styles from './CheckInsItems.module.sass';

type TValues = {
  question: string;
};

type Props = {
  archiveCheckInGroup: (checkInGroupId: string) => void;
  archiveCheckInQuestion: (checkInQuestionId: string) => void;
  handleOnItemDragEnd: (result: DropResult) => void;
  handleUpdateQuestion: (
    actions: { setErrors?: Function },
    callback: void,
    checkInQuestion: TCheckInQuestion,
    { question }: TValues
  ) => void;
  isLoading: boolean;
  toggleCreateQuestionModalIsOpen: () => void;
};

const CheckInsItems = ({
  archiveCheckInGroup,
  archiveCheckInQuestion,
  handleOnItemDragEnd,
  handleUpdateQuestion,
  isLoading,
  toggleCreateQuestionModalIsOpen,
}: Props) => {
  const { allQuestions, allVisibleQuestions, allCheckInItems } = useCheckIns();
  const [archiveCheckInItemModal, setArchiveCheckInItemModal] = useState(false);
  const [checkInQuestionIdToArchive, setCheckInQuestionIdToArchive] = useState<string | null>(null);
  const [checkInGroupIdToArchive, setCheckInGroupIdToArchive] = useState<string | null>(null);

  const closeArchiveModal = () => {
    setArchiveCheckInItemModal(false);
    setCheckInQuestionIdToArchive(null);
    setCheckInGroupIdToArchive(null);
  };

  useEffect(() => {
    if (checkInGroupIdToArchive || checkInQuestionIdToArchive) setArchiveCheckInItemModal(true);
  }, [checkInGroupIdToArchive, checkInQuestionIdToArchive]);

  const checkInQuestionToArchive = allQuestions.find(
    (question) => question.id === checkInQuestionIdToArchive
  );

  const renderAllItems = () =>
    allCheckInItems
      .filter(
        (item) =>
          // @ts-ignore
          (item.__typename === 'CheckInGroup' && !isEmpty(item.questions)) ||
          item.__typename === 'CheckInQuestion'
      )
      .map((item, index) => (
        <CheckInItem
          key={item.id}
          allCheckInItems={allCheckInItems}
          handleUpdateQuestion={handleUpdateQuestion}
          index={index}
          item={item}
          setCheckInGroupIdToArchive={setCheckInGroupIdToArchive}
          setCheckInQuestionIdToArchive={setCheckInQuestionIdToArchive}
        />
      ));

  return (
    <>
      <div className={styles.checkInsWrapper}>
        <CheckInsHeader
          allQuestionsLength={allVisibleQuestions.length}
          toggleCreateQuestionModalIsOpen={toggleCreateQuestionModalIsOpen}
        />
        <DragDropContext onDragEnd={handleOnItemDragEnd}>
          <Droppable droppableId='check-in-items-list' type='CHECK_IN_ITEMS_LIST'>
            {(provided: DroppableProvided) => (
              <div
                ref={provided.innerRef}
                className={styles.draggableContainer}
                {...provided.droppableProps}>
                {renderAllItems()}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <CustomizeCheckInQuestionProvider checkInQuestion={checkInQuestionToArchive}>
        <ArchiveCheckInItemModal
          archiveCheckInGroup={archiveCheckInGroup}
          archiveCheckInQuestion={archiveCheckInQuestion}
          checkInGroupId={checkInGroupIdToArchive}
          checkInQuestionId={checkInQuestionIdToArchive}
          closeModal={closeArchiveModal}
          isLoading={isLoading}
          showModal={archiveCheckInItemModal}
        />
      </CustomizeCheckInQuestionProvider>
    </>
  );
};

export default CheckInsItems;
