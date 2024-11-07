import { PropsWithChildren } from 'react';
import { useToggle } from 'react-use';

import { cx } from '@shared/utils/cx';
import { IconButton } from '@shared/components/IconButton/IconButton';
import { ReactComponent as ChevronDownIcon } from '@shared/svg/chevron_down.svg';
import { ReactComponent as ChevronUpIcon } from '@shared/svg/chevron_up.svg';

type Props = {
  title: string;
};

export const CollapsibleWrapper = ({ title, children }: PropsWithChildren<Props>) => {
  const [isExpanded, toggleIsExpanded] = useToggle(false);

  const cardClasses = cx(
    'group/statement relative px-sm py-xs xxxl:p-base xxxl:py-sm bg-white rounded-sm transition-all cursor-pointer',
    'border border-neutral-300',
    'mb-xs',
    {
      'border-primary-500 mb-sm xxxl:mb-x pb-base xxxl:pb-md': isExpanded,
      'hover:bg-neutral-200 hover:border-neutral-400': !isExpanded,
    }
  );

  return (
    <div className={cardClasses} onClick={toggleIsExpanded}>
      <h3 className='text-sm flex items-center justify-between mb-0'>
        {title}
        <IconButton Icon={isExpanded ? ChevronUpIcon : ChevronDownIcon} size='md' />
      </h3>
      {isExpanded && children}
    </div>
  );
};
