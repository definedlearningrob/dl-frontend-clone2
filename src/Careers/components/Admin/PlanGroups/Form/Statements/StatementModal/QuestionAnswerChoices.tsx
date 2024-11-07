import { FieldArray, FieldArrayRenderProps, useField } from 'formik';
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  DropResult,
  Droppable,
  DroppableProvided,
} from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';
import { makeUniqueId } from '@apollo/client/utilities';

import { AnimateHeight } from '@dc/shared/AnimateHeight/AnimateHeight';

import { ReactComponent as WarningIcon } from '@shared/svg/warning_outlined.svg';
import { ReactComponent as AddIcon } from '@shared/svg/add.svg';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import Button from '@shared/components/Button/Button';

import { QuestionAnswerChoice } from './QuestionAnswerChoice';

type StatementOption = { option: string; step: number; id: string };

export const QuestionAnswerChoices = () => {
  const { t } = useTranslation();
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });
  const [optionsField] = useField<StatementOption[]>('question.options');

  const isRemovingOptionsDisabled = optionsField.value.length === 2;

  const onDragEnd =
    (moveItem: FieldArrayRenderProps['handleMove']) =>
    ({ source, destination }: DropResult) => {
      if (destination) {
        moveItem(source.index, destination.index)();
      }
    };

  return (
    <>
      <p className='text-xxs xxxl:text-xs text-neutral-600 mb-xxs xxxl:mb-xs leading-lg'>
        {t('admin.planGroups.statements.configureListItems', { count: optionsField.value.length })}
      </p>
      <FieldArray
        name='question.options'
        render={(arrayHelpers) => (
          <>
            <DragDropContext onDragEnd={onDragEnd(arrayHelpers.handleMove)}>
              <AnimateHeight duration={0.2}>
                <Droppable droppableId='droppable'>
                  {(provided: DroppableProvided) => (
                    <ul
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className='max-h-[240px] xxxl:max-h-[320px] scrollbar'>
                      {optionsField.value.map((option, index) => (
                        <Draggable key={option.id} draggableId={option.id} index={index}>
                          {(
                            provided: DraggableProvided,
                            { isDragging }: DraggableStateSnapshot
                          ) => (
                            <li
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}>
                              <QuestionAnswerChoice
                                isDeleteDisabled={isRemovingOptionsDisabled}
                                isDragging={isDragging}
                                name={`question.options.${index}`}
                                step={index + 1}
                                onDelete={arrayHelpers.handleRemove(index)}
                              />
                            </li>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>
              </AnimateHeight>
            </DragDropContext>
            <Button
              Icon={AddIcon}
              className='my-xs xxxl:my-sm'
              iconPlacement='start'
              size='sm'
              variant='primary'
              onClick={arrayHelpers.handlePush({
                option: '',
                id: makeUniqueId('StatementOption'),
              })}>
              {t('admin.planGroups.statements.addNew')}
            </Button>
            {isRemovingOptionsDisabled && (
              <div className='flex items-start gap-x xxxl:gap-sm p-x xxxl:p-sm rounded-sm border border-neutral-300'>
                <IconContainer
                  Icon={WarningIcon}
                  className='bg-warning-100 text-warning-500 rounded-sm'
                  size={isFullHD ? 'base' : 'sm'}
                />
                <div className='text-xxs xxxl:text-xs leading-lg'>
                  <div className='mb-xxs font-medium'>
                    {t('admin.planGroups.statements.removingDisabled')}
                  </div>
                  {t('admin.planGroups.statements.removingDisabledDescription')}
                </div>
              </div>
            )}
          </>
        )}
      />
    </>
  );
};
