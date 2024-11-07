import {
  GroupBase,
  OptionProps,
  SelectInstance,
  SingleValue,
  SingleValueProps,
  components,
} from 'react-select';
import { FC, RefObject, SVGProps } from 'react';

import { Option, Select } from '@shared/components/Select';
import { usePlanStatusOptions } from '@shared/hooks/usePlanStatusOptions';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { cx } from '@shared/utils/cx';

export type SelectOption = {
  label: string;
  value: string;
  Icon: FC<SVGProps<SVGSVGElement>>;
  variant: 'neutral' | 'secondary' | 'success' | 'danger';
};

type Props = {
  size?: 'sm' | 'md' | 'lg';
  placeholder?: string;
  onChange: (newValue: SingleValue<SelectOption>) => void;
  selectRef?: RefObject<SelectInstance<SelectOption>>;
};

export const StatementStatusSelect = ({ size = 'md', placeholder, onChange, selectRef }: Props) => {
  const { options: statusOptions } = usePlanStatusOptions();

  const options = statusOptions.map((option) => ({
    ...option,
    value: option.status,
  }));

  return (
    <Select<SelectOption>
      components={{
        Option: (props) => <StatementStatusOption {...props} size={size} />,
        SingleValue: StatementSelectValue,
      }}
      options={options}
      placeholder={placeholder}
      selectRef={selectRef}
      size={size}
      onChange={onChange}
    />
  );
};

const StatementStatusWithIcon = (option: SelectOption) => (
  <div className='flex items-center gap-xs'>
    <IconContainer
      Icon={option.Icon}
      className={cx({
        'text-neutral-700': option.variant === 'neutral',
        'text-secondary-500': option.variant === 'secondary',
        'text-success-500': option.variant === 'success',
        'text-danger-500': option.variant === 'danger',
      })}
      paddingSize='none'
      size='sm'
    />
    <span>{option.label}</span>
  </div>
);

const StatementStatusOption = <
  Option extends SelectOption,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: OptionProps<Option, IsMulti, Group> & { size: 'sm' | 'md' | 'lg' }
) => (
  <Option {...props}>
    <StatementStatusWithIcon {...props.data} />
  </Option>
);

const StatementSelectValue = <
  Option extends SelectOption,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: SingleValueProps<Option, IsMulti, Group>
) => (
  <components.SingleValue {...props}>
    <StatementStatusWithIcon {...props.data} />
  </components.SingleValue>
);
