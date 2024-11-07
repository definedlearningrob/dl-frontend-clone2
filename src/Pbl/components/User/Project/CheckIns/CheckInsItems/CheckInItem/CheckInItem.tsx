import { Draggable, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';

import CheckInGroup from '@pbl/components/User/Project/CheckIns/CheckInGroup/CheckInGroup';
import { CheckInQuestion } from '@pbl/components/User/Project/CheckIns/CheckInQuestion/CheckInQuestion';
import useCustomizeProject from '@pbl/hooks/useCustomizeProject';
import { CustomizeCheckInQuestionProvider } from '@pbl/hooks/useCustomizeCheckInQuestion';
import { TCheckInGroup, TCheckInQuestion } from '@pbl/components/Project/types';

type TValues = {
  question: string;
};

type TMixedCheckInType = TCheckInQuestion | TCheckInGroup;

type Props = {
  allCheckInItems: TMixedCheckInType[];
  index: number;
  item: TMixedCheckInType;
  handleUpdateQuestion: (
    actions: { setErrors?: Function },
    callback: void,
    checkInQuestion: TCheckInQuestion,
    { question }: TValues
  ) => void;
  setCheckInQuestionIdToArchive: (checkInQuestionIdToArchive: string) => void;
  setCheckInGroupIdToArchive: (checkInGroupIdToArchive: string) => void;
};

const CheckInItem = ({
  allCheckInItems,
  handleUpdateQuestion,
  index,
  item,
  setCheckInGroupIdToArchive,
  setCheckInQuestionIdToArchive,
}: Props) => {
  const { editMode } = useCustomizeProject();
  const isCheckInGroup = item.__typename === 'CheckInGroup';

  const flattenedCheckInItems = allCheckInItems.reduce(
    (acc: TCheckInQuestion[], item: TMixedCheckInType) => {
      if (item.__typename === 'CheckInGroup') {
        const visibleQuestions = editMode
          ? item.questions
          : item.questions.filter((question) => !question.isHidden);

        acc.push(...visibleQuestions);
      } else {
        acc.push(item);
      }

      return acc;
    },
    []
  );

  const checkInQuestionWithIndex = !isCheckInGroup
    ? {
        ...item,
        questionIndex:
          flattenedCheckInItems.findIndex((question: TCheckInQuestion) => question.id === item.id) +
          1,
      }
    : undefined;

  const checkInGroupWithIndexes = isCheckInGroup
    ? item.questions
        .filter((question) => editMode || !question.isHidden)
        .map((item: TCheckInQuestion) => {
          const elementIndex =
            flattenedCheckInItems.findIndex((element: TCheckInQuestion) => element.id === item.id) +
            1;

          return {
            ...item,
            questionIndex: elementIndex,
          };
        })
    : [];

  return (
    <CustomizeCheckInQuestionProvider key={item.id} checkInQuestion={checkInQuestionWithIndex}>
      <Draggable key={item.id} draggableId={item.id} index={index} isDragDisabled={!editMode}>
        {(provided: DraggableProvided, { isDragging }: DraggableStateSnapshot) => (
          <>
            {!isCheckInGroup && (
              <CheckInQuestion
                checkInQuestion={item}
                handleRemoveQuestion={setCheckInQuestionIdToArchive}
                handleUpdateQuestion={handleUpdateQuestion}
                isDragging={isDragging}
                provided={provided}
              />
            )}
            {isCheckInGroup && (
              <CheckInGroup
                checkInGroup={{ ...item, questions: checkInGroupWithIndexes }}
                handleUpdateQuestion={handleUpdateQuestion}
                isDragging={isDragging}
                provided={provided}
                setCheckInGroupIdToArchive={setCheckInGroupIdToArchive}
                setCheckInQuestionIdToArchive={setCheckInQuestionIdToArchive}
              />
            )}
          </>
        )}
      </Draggable>
    </CustomizeCheckInQuestionProvider>
  );
};

export default CheckInItem;
