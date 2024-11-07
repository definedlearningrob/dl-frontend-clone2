import { useField } from 'formik';
import { ControlProps, components, GroupBase } from 'react-select';
import cx from 'classnames';

import { SelectOption } from '@shared/components/Select';

import styles from './SelectList.module.sass';

export const SelectListControl = <
  Option extends SelectOption,
  IsMulti extends boolean = true,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: ControlProps<Option, IsMulti, Group>
) => {
  const [, meta] = useField(props.selectProps.name!);
  const errorMessage = meta.error && meta.touched ? meta.error : undefined;

  return (
    <div className={styles.controlWrapper}>
      <components.Control {...props} className={cx({ [styles.inputError]: errorMessage })} />
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
    </div>
  );
};
