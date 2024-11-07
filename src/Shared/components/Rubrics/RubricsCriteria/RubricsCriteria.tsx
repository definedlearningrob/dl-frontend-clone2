import cx from 'classnames';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { RubricsTrait } from '@shared/components/Rubrics/RubricsTrait';
import { useRubric } from '@shared/components/Rubrics/RubricProvider';
import { RadioButton } from '@shared/components/RadioButton/RadioButton';

import { RubricCriteria } from '../utils/types';

export type RubricsCriteriaProps = {
  actionButton?: ReactNode;
  className?: string;
  criteria: RubricCriteria;
  onClick?: () => void;
  isSelected: boolean;
  trait?: string;
  onTraitChange?: (trait: string) => void;
};

export const RubricsCriteria = ({
  onTraitChange,
  trait,
  className,
  criteria,
  onClick,
  isSelected,
}: RubricsCriteriaProps) => {
  const { t } = useTranslation();

  const {
    type: { isPreview, isGrading, isViewing },
    grading: { isFullyGraded },
  } = useRubric();

  const rubricCriteriaClassname = cx(
    'group/criteria',
    'border border-neutral-300 p-xs xxxl:p-x align-top leading-lg',
    {
      'cursor-default': !isGrading,
      'text-neutral-700 opacity-50': isFullyGraded && isViewing && !isSelected,
      'focus:border focus:border-primary-500': isGrading,
      'hover:bg-neutral-200': !isSelected && !isPreview,
      'bg-primary-200 border border-primary-500': isSelected && !isPreview,
    },
    className
  );

  const textClassname = cx('text-xxs xxxl:text-xs tracking-[0.12px]', {
    'text-neutral-700': isGrading,
    'text-neutral-800': isGrading && isSelected,
  });

  const handleSelect = () => onClick && isGrading && onClick();

  return (
    <td
      className={rubricCriteriaClassname}
      data-testid={criteria.id ? 'rubric-criteria' : 'rubric-criteria-placeholder'}
      role='button'
      tabIndex={1}
      onClick={handleSelect}>
      {!isPreview && (!isViewing || (isViewing && isFullyGraded && isSelected)) && (
        <div className='flex justify-between items-center mb-xs xxxl:mb-x relative'>
          <RadioButton checked={isSelected} readOnly={true} tabIndex={1} />
          {isSelected && (isGrading || trait) && (
            <div className='absolute top-0 right-0'>
              <RubricsTrait initialTrait={trait} onSubmit={isGrading ? onTraitChange : undefined} />
            </div>
          )}
        </div>
      )}
      <span className={textClassname} data-testid='rubric-criteria-text'>
        {criteria.text || t('components.rubric.criteriaPlaceholder')}
      </span>
    </td>
  );
};
