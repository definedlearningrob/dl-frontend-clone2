import {
  WidgetProps,
  enumOptionsIsSelected,
  enumOptionsSelectValue,
  enumOptionsDeselectValue,
} from '@rjsf/utils';
import { ChangeEvent } from 'react';

import SharedCheckbox from '@shared/components/Checkbox/Checkbox';
import { InputLabel } from '@shared/components/InputLabel/InputLabel';
import { InjectedContent } from '@shared/components/IncjectedContent/InjectedContent';
import { ErrorMessage } from '@shared/components/ErrorMessage/ErrorMessage';
import { cx } from '@shared/utils/cx';

export const CheckboxesWidget = (props: WidgetProps) => {
  const { label, required, options, value, onChange, rawErrors } = props;

  const { enumOptions } = options;

  if (!enumOptions) {
    return null;
  }

  const handleChange = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    const toggleValue = checked ? enumOptionsSelectValue : enumOptionsDeselectValue;

    onChange(toggleValue(index, value, enumOptions));
  };

  return (
    <fieldset className='p-0 b-none m-0'>
      <legend className='mb-xs'>
        <InputLabel isRequired={required} isSmall={false}>
          <InjectedContent content={label} />
        </InputLabel>
      </legend>

      <div className={cx('flex flex-col gap-xs', { 'mb-xs': rawErrors })}>
        {enumOptions.map((option, index) => (
          <SharedCheckbox
            key={option.value}
            checked={enumOptionsIsSelected(option.value, value)}
            className='leading-lg'
            label={option.label}
            required={required}
            value={option.value}
            onChange={handleChange(index)}
          />
        ))}
      </div>
      <ErrorMessage errorMessage={rawErrors?.join(', ')} />
    </fieldset>
  );
};
