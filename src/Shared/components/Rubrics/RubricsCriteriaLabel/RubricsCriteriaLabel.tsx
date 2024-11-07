import { RubricCriteriaLabel } from '@shared/components/Rubrics/utils/types';
import { Tooltip } from '@shared/components/Tooltip';

type Props = {
  criteriaLabel: RubricCriteriaLabel;
};

export const RubricsCriteriaLabel = ({ criteriaLabel: { score, displayName = '' } }: Props) => (
  <th
    className='border border-neutral-300 p-xs xxxl:p-x text-xs font-bold bg-neutral-200'
    data-testid='rubric-criteria-label'>
    <div className='flex flex-col'>
      <span data-testid='rubric-criteria-label-score'>{score}</span>
      {displayName && (
        <Tooltip delayDuration={300} message={displayName}>
          <div className='line-clamp-2 xxxl:line-clamp-3' data-testid='rubric-criteria-label-text'>
            {displayName}
          </div>
        </Tooltip>
      )}
    </div>
  </th>
);
