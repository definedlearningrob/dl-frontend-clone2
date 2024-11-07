import { ValueContainerProps, components, GroupBase } from 'react-select';
import cx from 'classnames';

import SharedIcon from '@shared/components/Icon/Icon';
import { ReactComponent as SearchIcon } from '@shared/svg/search.svg';
import { SelectOption } from '@shared/components/Select';

import styles from './SelectList.module.sass';

export const SelectListValueContainer = <
  Option extends SelectOption,
  IsMulti extends boolean = true,
  Group extends GroupBase<Option> = GroupBase<Option>
>({
  children,
  ...props
}: ValueContainerProps<Option, IsMulti, Group>) => {
  const hasValues = props.hasValue && props.selectProps.controlShouldRenderValue;

  return (
    <components.ValueContainer {...props}>
      <div className={cx(styles.inputWrapper, { [styles.filledInputWrapper]: hasValues })}>
        {!hasValues && <SharedIcon className={styles.searchIcon} icon={<SearchIcon />} size='sm' />}
        {children}
      </div>
    </components.ValueContainer>
  );
};
