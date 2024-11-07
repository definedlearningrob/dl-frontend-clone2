import { ChangeEvent, useMemo } from 'react';

import Textarea from '@shared/components/Textarea/Textarea';
import { useRubricEditor } from '@shared/components/RubricsEditor/RubricsEditorProvider/RubricsEditorProvider';
import debounce from '@shared/utils/debounce';
import { RubricCriteria } from '@shared/components/RubricsEditor/utils/types';

type Props = {
  criterion: RubricCriteria;
};

export const RubricsEditableCriteria = ({ criterion }: Props) => {
  const {
    editing: {
      // TODO: add border on delete
      // hoveredColumnId,
      criteria: { handleSubmit },
    },
  } = useRubricEditor();

  // TODO: add border on delete
  // const classes = cx('rubrics-builder__criteria', {
  //   '-column-deleting': hoveredColumnId === criteria.rubricCriteriaLabelId,
  //   '-column-deleting-last': hoveredColumnId === criteria.rubricCriteriaLabelId && isLastRow,
  //   '-row-deleting': isRowDeleting,
  //   '-row-deleting-last': isRowDeleting && isLastInRow,
  //   // '-editing': isEditing,
  // });

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    handleSubmit({ ...criterion, text: event.target.value });
  };

  const debouncedHandleChange = useMemo(() => debounce(handleChange, 500), []);

  return (
    <td>
      <Textarea
        data-testid='rubric-criteria-input'
        defaultValue={criterion.text}
        textareaClassName='!mb-0 text-xxs xxxl:text-xs leading-lg h-[126px]'
        onChange={debouncedHandleChange}
      />
    </td>
  );
};
