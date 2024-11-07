import { useTranslation } from 'react-i18next';
import { GroupBase } from 'react-select';
import CreatableComponent, { CreatableProps as RSCreatableProps } from 'react-select/creatable';
import cx from 'classnames';

import { DropdownIndicator } from '@shared/components/Select/DropdownIndicator';

export type CreatableProps<
  Option extends unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
> = Omit<RSCreatableProps<Option, IsMulti, Group>, 'className' | 'classNamePrefix'>;

export const Creatable = <
  Option extends unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: CreatableProps<Option, IsMulti, Group> & {
    size?: 'sm' | 'md' | 'lg';
    label?: string;
  }
) => {
  const { t } = useTranslation();
  const { size = 'md', label, components, ...selectProps } = props;

  const isSmall = size === 'sm';

  const labelClassNames = cx('text-font-primary leading-lg', {
    'text-xxs': isSmall,
    'text-xs': !isSmall,
  });

  const selectWrapperClassNames = cx('flex flex-col leading-lg', {
    'gap-xxxs': isSmall,
    'gap-xs': !isSmall,
  });

  return (
    <label className={selectWrapperClassNames}>
      {label && <span className={labelClassNames}>{label}</span>}
      <CreatableComponent<Option, IsMulti, Group>
        components={{
          DropdownIndicator: (props) => <DropdownIndicator {...props} size={size} />,
          ...components,
        }}
        noOptionsMessage={() => t('components.select.noOptions')}
        {...selectProps}
        className={cx('select', `-${size}`)}
        classNamePrefix='select'
      />
    </label>
  );
};
