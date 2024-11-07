import { components, GroupBase, OptionProps } from 'react-select';
import React from 'react';
import { Props as ReactSelectProps } from 'react-select/dist/declarations/src';
import cx from 'classnames';

import Checkbox from '@shared/components/Checkbox/Checkbox';

import styles from './Option.module.sass';

export const Option = (
  props: ReactSelectProps & OptionProps<unknown, boolean, GroupBase<unknown>>
) => {
  const optionClassNames = cx({ 'bg-white text-primary-500': props.isSelected });

  return (
    <components.Option className={optionClassNames} {...props}>
      <label className='flex items-center gap-xs cursor-pointer text-xs'>
        <Checkbox checked={props.isSelected} className={styles.checkbox} readOnly={true} />
        {props.label}
      </label>
    </components.Option>
  );
};
