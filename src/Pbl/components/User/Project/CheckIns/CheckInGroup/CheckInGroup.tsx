import cx from 'classnames';
import { DraggableProvided } from 'react-beautiful-dnd';
import { useState, type MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash-es';

import { CheckInQuestion } from '@pbl/components/User/Project/CheckIns/CheckInQuestion/CheckInQuestion';
import EditCheckInGroup from '@pbl/components/User/Project/CheckIns/CheckInGroup/EditCheckInGroup/EditCheckInGroup';
import useCustomizeProject from '@pbl/hooks/useCustomizeProject';
import { CustomizeCheckInQuestionProvider } from '@pbl/hooks/useCustomizeCheckInQuestion';
import { TCheckInGroup, TCheckInQuestion } from '@pbl/components/Project/types';

import SharedIcon from '@shared/components/Icon/Icon';
import { ReactComponent as GrabIcon } from '@shared/assets/icons/grab_icon.svg';

import styles from './CheckInGroup.module.sass';

type TValues = {
  question: string;
};

type Props = {
  checkInGroup: TCheckInGroup;
  handleUpdateQuestion: (
    actions: { setErrors?: Function },
    callback: void,
    checkInQuestion: TCheckInQuestion,
    { question }: TValues
  ) => void;
  setCheckInGroupIdToArchive: (checkInGroupId: string) => void;
  setCheckInQuestionIdToArchive: (checkInQuestionIdToArchive: string) => void;
  isDragging?: boolean;
  provided?: DraggableProvided;
};

const CheckInGroup = ({
  checkInGroup,
  handleUpdateQuestion,
  isDragging,
  provided,
  setCheckInGroupIdToArchive,
  setCheckInQuestionIdToArchive,
}: Props) => {
  const { t } = useTranslation();
  const { editMode } = useCustomizeProject();
  const [mouseOver, setMouseOver] = useState(false);
  const showDraggingIcon = editMode && (mouseOver || isDragging);

  const checkInGroupClasses = cx(styles.checkInGroup, {
    [styles.editMode]: editMode,
  });
  const checkInGroupHeadingClasses = cx(styles.checkInGroupHeading, {
    [styles.draggingGroupMode]: showDraggingIcon,
  });

  const handleMouseOver = (event: MouseEvent) => {
    event.preventDefault();

    if (event.type === 'mouseover') setMouseOver(true);

    if (event.type === 'mouseleave') setMouseOver(false);
  };

  if (isEmpty(checkInGroup.questions)) {
    return null;
  }

  return (
    <div
      key={checkInGroup.id}
      ref={provided?.innerRef}
      className={checkInGroupClasses}
      onMouseLeave={handleMouseOver}
      onMouseOver={handleMouseOver}
      {...provided?.draggableProps}
      {...provided?.dragHandleProps}>
      <div className={checkInGroupHeadingClasses}>
        <div className={styles.grabIconWrapper}>
          {showDraggingIcon && (
            <SharedIcon className={styles.dragGroupIcon} icon={<GrabIcon />} size='xxs' />
          )}
          <h5 className={styles.checkInGroupHeader}>
            {checkInGroup.displayName || t('project.checkIns.checkInsGroup')}
          </h5>
        </div>
        {editMode && (
          <EditCheckInGroup
            checkInGroup={checkInGroup}
            setCheckInGroupIdToArchive={setCheckInGroupIdToArchive}
          />
        )}
      </div>
      {checkInGroup.questions.map((checkInQuestion) => (
        <CustomizeCheckInQuestionProvider
          key={checkInQuestion.id}
          checkInQuestion={checkInQuestion}>
          <CheckInQuestion
            checkInQuestion={checkInQuestion}
            groupId={checkInGroup.id}
            handleRemoveQuestion={setCheckInQuestionIdToArchive}
            handleUpdateQuestion={handleUpdateQuestion}
          />
        </CustomizeCheckInQuestionProvider>
      ))}
    </div>
  );
};

export default CheckInGroup;
