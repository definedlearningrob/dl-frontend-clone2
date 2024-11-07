import { components, OptionProps } from 'react-select';
import cx from 'classnames';

import { ReactComponent as DoneIcon } from '@shared/svg/done.svg';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';

type BaseOptionProps = OptionProps<{ label: string; value: string }, false>;

export const InstitutionSelectOption = ({ children, ...props }: BaseOptionProps) => {
  const { isDisabled } = props;

  return (
    <components.Option
      {...props}
      className={cx('!flex items-center justify-between', {
        '!bg-neutral-200 !text-font-primary': isDisabled,
      })}>
      <span>{children}</span>
      {isDisabled && <IconContainer Icon={DoneIcon} paddingSize='none' size='sm' />}
    </components.Option>
  );
};
