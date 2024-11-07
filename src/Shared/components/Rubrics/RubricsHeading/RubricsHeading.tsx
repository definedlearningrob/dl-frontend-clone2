import { useTranslation } from 'react-i18next';

import { Tooltip } from '@shared/components/Tooltip';

import { RubricHeading } from '../utils/types';

type Props = {
  heading: RubricHeading;
};

export const RubricsHeading = ({ heading }: Props) => {
  const { t } = useTranslation();

  return (
    <td className='border border-neutral-300 p-xs xxxl:p-x' data-testid='rubric-heading'>
      <Tooltip delayDuration={300} message={heading.name}>
        <div
          className='text-xs xxxl:text-sm font-bold text-neutral-800 mb-xs line-clamp-4'
          data-testid='rubric-heading-text'>
          {heading.name}
        </div>
      </Tooltip>
      <span className='leading-lg text-xxs xxxl:text-xs me-xxs'>
        {t('components.rubric.multiplier')}
      </span>
      <span
        className='text-neutral-800 leading-lg text-xxs xxxl:text-xs px-xxs border border-neutral-300 min-w-fit rounded-xs'
        data-testid='rubric-heading-multiplier'>
        {t('components.rubric.multiplierValue', { multiplier: heading.multiplier })}
      </span>
    </td>
  );
};
