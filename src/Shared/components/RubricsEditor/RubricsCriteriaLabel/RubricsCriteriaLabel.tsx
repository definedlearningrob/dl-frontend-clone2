import { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';

import DeprecatedIconButton from '@shared/components/DeprecatedIconButton/DeprecatedIconButton';
import { useRubricEditor } from '@shared/components/RubricsEditor/RubricsEditorProvider/RubricsEditorProvider';
import { NumberInput } from '@shared/components/NumberInput/NumberInput';
import { TextInput } from '@shared/components/TextInput/TextInput';
import { Tooltip } from '@shared/components/Tooltip';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';

import { RubricCriteriaLabel } from '../utils/types';

type Props = {
  criteriaLabel: RubricCriteriaLabel;
  onColumnDelete: (id: string) => void;
};

export const RubricsCriteriaLabel = ({
  criteriaLabel: { id, score, displayName = '' },
  onColumnDelete,
}: Props) => {
  // TODO: add hover on delete
  // const {
  // editing: { hoveredColumnId, setHoveredColumnId },
  // } = useRubricEditor<RubricEdit>();
  // const handleHoverDelete = () => setHoveredColumnId(id);
  // const handleUnhoverDelete = () => setHoveredColumnId(null);

  const { t } = useTranslation();

  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });

  const {
    editing: {
      criteriaLabel: { handleSubmit },
    },
  } = useRubricEditor();

  const handleScoreChange = (newValue: number) => {
    handleSubmit({ id, score: { value: newValue }, displayName: displayName || '' });
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleSubmit({ id: id, score: { value: score }, displayName: event.target.value });
  };

  return (
    <th className='max-w-[145px] xxxl:max-w-[200px]' data-testid='rubric-criteria-label'>
      <div className='mb-xs relative pt-x xxxl:pt-base'>
        <NumberInput
          label={t('components.rubric.score')}
          maxValue={100}
          minValue={1}
          name='score'
          required={true}
          value={score}
          onChange={handleScoreChange}
        />
        <div className='absolute right-0 top-0'>
          <Tooltip delayDuration={200} message={t('common.actions.delete')}>
            <DeprecatedIconButton.Delete
              aria-label={t('common.actions.delete')}
              className='ms-auto !bg-white hover:!bg-danger-100'
              onClick={() => onColumnDelete(id)}
              // onMouseEnter={handleHoverDelete}
              // onMouseLeave={handleUnhoverDelete}
            />
          </Tooltip>
        </div>
      </div>
      <div>
        <TextInput
          defaultValue={displayName || ''}
          label={t('components.rubric.name')}
          name='displayName'
          placeholder={t('components.rubric.rubricNamePlaceholder')}
          size={isFullHD ? 'md' : 'sm'}
          onBlur={handleNameChange}
        />
      </div>
    </th>
  );
};
