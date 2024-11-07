import { ForwardedRef, forwardRef, useContext } from 'react';

import DeprecatedIconButton from '@shared/components/DeprecatedIconButton/DeprecatedIconButton';
import { DropdownContext } from '@shared/components/Dropdown/Dropdown';
import { ReactComponent as ArrowDown } from '@shared/svg/chevron_down.svg';
import { ReactComponent as ArrowUp } from '@shared/svg/chevron_up.svg';

type Props = {
  className: string;
  'data-testid'?: string;
  size: 'xs' | 'sm' | 'md' | 'lg';
  ref: ForwardedRef<HTMLButtonElement>;
};

const DropDownTrigger = forwardRef(
  (
    { className, 'data-testid': dataTestId, size, ...props }: Props,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    const { isOpen } = useContext(DropdownContext);

    return (
      <DeprecatedIconButton
        buttonRef={ref}
        className={className}
        data-testid={dataTestId}
        icon={isOpen ? <ArrowUp /> : <ArrowDown />}
        size={size}
        {...props}
      />
    );
  }
);

export default DropDownTrigger;
