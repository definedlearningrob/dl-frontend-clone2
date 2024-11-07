import { useField } from 'formik';
import { MultiValue } from 'react-select';

import { Select } from '@shared/components/Select';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';

type Props = {
  options: { option: string; id: string }[];
  disabled: boolean;
  name: string;
};

export const MultipleChoiceDropdownQuestion = ({ options, disabled, name }: Props) => {
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });

  const [field, _, helpers] = useField(name);

  const selectOptions = options.map((option) => ({ label: option.option, value: option.option }));

  const handleChange = (newValue: MultiValue<{ label: string; value: string | number }>) => {
    const newValues = newValue.map(({ label }) => label);
    helpers.setValue(newValues);
  };

  return (
    <Select
      defaultValue={selectOptions.filter((option) => field.value.includes(option.value))}
      isDisabled={disabled}
      isMulti={true}
      menuPortalTarget={document.body}
      options={selectOptions}
      size={isFullHD ? 'md' : 'sm'}
      wrapperClassName='flex-1'
      onChange={handleChange}
    />
  );
};
