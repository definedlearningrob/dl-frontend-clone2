import { useField } from 'formik';
import { useTranslation } from 'react-i18next';
import { GroupBase } from 'react-select';
import { CreatableProps as RSCreatableProps } from 'react-select/creatable';

import { Creatable } from '../Creatable/Creatable';

export type CreatableProps<
  Option extends unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
> = Omit<RSCreatableProps<Option, IsMulti, Group>, 'className' | 'classNamePrefix'> & {
  name: string;
  size?: 'sm' | 'md';
};

export const FormCreatable = <
  Option extends unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: CreatableProps<Option, IsMulti, Group> & { label?: string }
) => {
  const { t } = useTranslation();
  const [field, , helpers] = useField(props.name);

  return (
    <Creatable<Option, IsMulti, Group>
      components={{ IndicatorSeparator: () => null }}
      noOptionsMessage={() => t('components.select.noOptions')}
      value={field.value}
      onChange={(newValue) => helpers.setValue(newValue)}
      {...props}
    />
  );
};
