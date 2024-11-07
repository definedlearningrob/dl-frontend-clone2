import { MultiValue, components } from 'react-select';
import { useField } from 'formik';
import { useCallback } from 'react';

import { Select, SelectOption, SelectProps } from '@shared/components/Select';

import { Chip, ChipRemoveButton } from './Chip';
import { SelectListOption } from './SelectListOption';
import { SelectListValueContainer } from './SelectListValueContainer';
import { SelectListControl } from './SelectListControl';
import styles from './SelectList.module.sass';

type Props = SelectProps<SelectOption, true> & {
  showAvatar?: boolean;
  name: string;
};

export const SelectList = ({ showAvatar, name, ...props }: Props) => {
  const [field, , helpers] = useField(name);

  const handleChange = useCallback((values: MultiValue<SelectOption>) => {
    helpers.setValue(values);
  }, []);

  return (
    <div className={styles.selectWrapper}>
      <Select
        {...field}
        components={{
          Option: (props) => <SelectListOption {...props} showAvatar={showAvatar} />,
          IndicatorSeparator: null,
          DropdownIndicator: null,
          ValueContainer: SelectListValueContainer,
          MultiValueContainer: (props) => <Chip {...props} showAvatar={showAvatar} />,
          MultiValueLabel: (props) => <components.MultiValueLabel {...props} />,
          MultiValueRemove: ChipRemoveButton,
          Control: SelectListControl,
        }}
        id={name}
        isClearable={false}
        isMulti={true}
        maxMenuHeight={200}
        menuIsOpen={true}
        minMenuHeight={200}
        onChange={handleChange}
        {...props}
      />
    </div>
  );
};
