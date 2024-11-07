import { useField } from 'formik';
import { useTranslation } from 'react-i18next';
import { GroupBase } from 'react-select';

import { Select, SelectOption, SelectProps } from '@shared/components/Select';

export const FormSelect = <
  Option extends SelectOption,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: SelectProps<Option, IsMulti, Group> & { name: string }
) => {
  const { t } = useTranslation();
  const [field, meta, helpers] = useField(props.name);

  return (
    <Select
      errorMessage={meta.touched ? meta.error : undefined}
      noOptionsMessage={() => t('components.select.noOptions')}
      {...props}
      className='!mb-0'
      value={field.value}
      onChange={(newValue) => helpers.setValue(newValue)}
    />
  );
};
