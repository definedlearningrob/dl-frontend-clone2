import { ReactComponent as ChevronUpIcon } from '@shared/svg/chevron_up.svg';
import { ReactComponent as ChevronDownIcon } from '@shared/svg/chevron_down.svg';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import DeprecatedIconButton from '@shared/components/DeprecatedIconButton/DeprecatedIconButton';
import { cx } from '@shared/utils/cx';

type Props = {
  isExpanded: boolean;
  toggleIsExpanded: () => void;
  size?: 'sm' | 'base';
  className?: string;
};

export const ExpandCardButton = ({
  isExpanded,
  toggleIsExpanded,
  size = 'base',
  className,
}: Props) => {
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });

  const buttonClasses = cx(
    'transition-colors !bg-white xxxl:!p-xxs',
    '!border !border-solid !rounded-xs !border-white focus-visible:!border-primary-500',
    {
      'text-primary-500': isExpanded,
    },
    className
  );

  const smallIconSize = isFullHD ? 'sm' : 'xs';

  return (
    <DeprecatedIconButton
      className={buttonClasses}
      icon={isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
      iconSize={size === 'sm' ? smallIconSize : 'sm'}
      size='sm'
      onClick={(e) => {
        e.stopPropagation();
        toggleIsExpanded();
      }}
    />
  );
};
