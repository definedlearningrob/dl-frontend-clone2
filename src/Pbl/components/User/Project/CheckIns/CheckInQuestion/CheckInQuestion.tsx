import cx from 'classnames';
import { DraggableProvided } from 'react-beautiful-dnd';
import { useEffect, useState, type MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { ReactComponent as DragHandle } from '@dc/svg/temp/drag_handle.svg';

import CheckInQuestionEditMode from '@pbl/components/User/Project/CheckIns/CreateCheckInQuestionModal/CheckInQuestionEditMode/CheckInQuestionEditMode';
import useCustomizeCheckInQuestion from '@pbl/hooks/useCustomizeCheckInQuestion';
import useCustomizeProject from '@pbl/hooks/useCustomizeProject';
import { TCheckInQuestion, TValues } from '@pbl/components/Project/types';
import { useToggleCheckInQuestionHidden } from '@pbl/graphql/user/hooks/useToggleCheckInQuestionHidden';

import { ReactComponent as EditIcon } from '@shared/assets/icons/edit.svg';
import { ReactComponent as DeleteIcon } from '@shared/svg/delete_outlined.svg';
import SharedIcon from '@shared/components/Icon/Icon';
import { ReactComponent as InfoIcon } from '@shared/assets/icons/info_outlined.svg';
import Link from '@shared/components/Link';
import SharedSwitch from '@shared/components/Switch/Switch';
import { IconButton } from '@shared/components/IconButton/IconButton';
import { Tooltip } from '@shared/components/Tooltip';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';

import styles from './CheckInQuestion.module.sass';

type Props = {
  checkInQuestion: TCheckInQuestion;
  groupId?: string;
  handleRemoveQuestion: (id: string) => void;
  handleUpdateQuestion: (
    actions: { setErrors?: Function },
    callback: void,
    checkInQuestion: TCheckInQuestion,
    { question }: TValues
  ) => void;
  isDragging?: boolean;
  provided?: DraggableProvided;
};

export const CheckInQuestion = ({
  checkInQuestion,
  groupId,
  handleRemoveQuestion,
  handleUpdateQuestion,
  isDragging,
  provided,
}: Props) => {
  const { t } = useTranslation();
  const { id: checkInQuestionId, gradingNeededCount, question, isHidden } = checkInQuestion;
  const { editMode, isAssigned } = useCustomizeProject();
  const {
    editCheckInQuestionMode,
    isCheckInQuestionOwner,
    toggleEditCheckInQuestionMode,
    questionIndex,
  } = useCustomizeCheckInQuestion();

  const isGroupItem = !!groupId;
  const isEditingCheckIn = editMode && editCheckInQuestionMode;
  const shouldShowActions = !isGroupItem && editMode && !editCheckInQuestionMode;
  const [mouseOver, setMouseOver] = useState(false);
  const showDraggingIcon = !isGroupItem && editMode && (mouseOver || isDragging);
  const { projectId, productId } = useParams<{ projectId: string; productId?: string }>();
  const [toggleCheckInQuestionHidden] = useToggleCheckInQuestionHidden({
    taskId: projectId,
    checkInQuestionId,
    checkInGroupId: groupId ?? '',
  });

  useEffect(() => {
    if (editCheckInQuestionMode && !editMode) toggleEditCheckInQuestionMode();
  }, [editMode]);

  const questionClasses = cx(styles.checkInQuestionWrapper, {
    [styles.editMode]: editMode && !isGroupItem,
  });

  const handleMouseOver = (event: MouseEvent) => {
    event.preventDefault();

    if (event.type === 'mouseover') setMouseOver(true);

    if (event.type === 'mouseleave') setMouseOver(false);
  };

  const projectRootPath = !productId
    ? `/projects/${projectId}/product/${productId}`
    : `/projects/${projectId}`;

  return (
    <div
      ref={provided?.innerRef}
      className={questionClasses}
      onMouseLeave={handleMouseOver}
      onMouseOver={handleMouseOver}
      {...provided?.draggableProps}
      {...provided?.dragHandleProps}>
      <div className='flex gap-sm items-start'>
        {showDraggingIcon ? (
          <IconContainer
            Icon={DragHandle}
            className='bg-neutral-200 rounded-sm text-font-primary h-md w-md'
            size='sm'
          />
        ) : (
          <div className='bg-neutral-200 text-font-primary rounded-xs h-md w-md flex items-center justify-center shrink-0 text-sm font-medium'>
            {questionIndex}
          </div>
        )}
        <div className='w-full'>
          {isEditingCheckIn ? (
            <CheckInQuestionEditMode
              checkInQuestion={checkInQuestion}
              handleUpdateQuestion={handleUpdateQuestion}
            />
          ) : (
            <h6 className='text-xs leading-lg mb-0 pt-xxs'>{question}</h6>
          )}
        </div>
        {isAssigned && gradingNeededCount !== undefined && !isEditingCheckIn && !editMode && (
          <Tooltip disabled={gradingNeededCount > 0} message={t('user.grading.nothingToGrade')}>
            <Link
              className={cx(styles.gradeButton, {
                [styles.emptyGrade]: gradingNeededCount < 1,
              })}
              size='sm'
              to={`${projectRootPath}/grading/checkins/${checkInQuestion.id}`}
              variant='secondary'>
              {t('user.project.checkins.gradeButton', {
                count: gradingNeededCount,
              })}
            </Link>
          </Tooltip>
        )}
        {shouldShowActions && (
          <div className='flex gap-xs ml-auto'>
            {isCheckInQuestionOwner ? (
              <Tooltip message={t('common.actions.editEntity', { name: 'question' })}>
                <IconButton
                  Icon={EditIcon}
                  size='md'
                  variant='primary-outlined'
                  onClick={() => toggleEditCheckInQuestionMode()}
                />
              </Tooltip>
            ) : (
              <Tooltip message={t('project.checkIns.checkInQuestionInfo')}>
                <SharedIcon className={styles.infoIcon} icon={<InfoIcon />} size='sm' />
              </Tooltip>
            )}
            <Tooltip message={t('common.actions.deleteEntity', { name: 'question' })}>
              <IconButton
                Icon={DeleteIcon}
                size='md'
                variant='danger-outlined'
                onClick={() => handleRemoveQuestion(checkInQuestionId)}
              />
            </Tooltip>
          </div>
        )}
      </div>
      {isGroupItem && editMode && (
        <SharedSwitch
          additionalLabel={t('common.actions.hide')}
          className='ml-[40px] mt-sm'
          label={t('common.actions.show')}
          value={!isHidden}
          onChange={() => toggleCheckInQuestionHidden(!isHidden)}
        />
      )}
    </div>
  );
};
