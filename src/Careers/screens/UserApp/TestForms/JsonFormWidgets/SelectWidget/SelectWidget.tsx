import { EnumOptionsType, WidgetProps } from '@rjsf/utils';
import { SingleValue } from 'react-select';

import { Select } from '@shared/components/Select';
import { ErrorMessage } from '@shared/components/ErrorMessage/ErrorMessage';

export const SelectWidget = (props: WidgetProps) => {
  const { value, options, onChange, label, id, required, rawErrors } = props;

  const { enumOptions } = options;

  if (!enumOptions) {
    return null;
  }

  const handleChange = (option: SingleValue<EnumOptionsType>) => {
    if (option) {
      onChange(option.value);
    }
  };

  const optionValue = enumOptions.find((option) => option.value === value);

  return (
    <div className='flex flex-col gap-xs'>
      <Select
        getOptionValue={(option) => option.value}
        inputId={id}
        isRequired={required}
        label={label}
        options={enumOptions}
        value={optionValue}
        onChange={handleChange}
      />
      <ErrorMessage errorMessage={rawErrors && rawErrors.join(', ')} />
    </div>
  );
};
