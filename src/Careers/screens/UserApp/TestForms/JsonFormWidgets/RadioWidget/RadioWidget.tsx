import { ChangeEvent } from 'react';
import { enumOptionsIsSelected, EnumOptionsType, WidgetProps } from '@rjsf/utils';
import { isNil } from 'lodash-es';

import { RadioButton } from '@shared/components/RadioButton/RadioButton';
import { InputLabel } from '@shared/components/InputLabel/InputLabel';
import { InjectedContent } from '@shared/components/IncjectedContent/InjectedContent';
import { ErrorMessage } from '@shared/components/ErrorMessage/ErrorMessage';
import { cx } from '@shared/utils/cx';

export const RadioWidget = (props: WidgetProps) => {
  const { label, options, id, onChange, rawErrors, required, value } = props;

  const { enumOptions } = options;

  if (!enumOptions) {
    return null;
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const getIsOptionSelected = (option: EnumOptionsType) => {
    if (isNil(value)) {
      return false;
    }

    return enumOptionsIsSelected(option.value.toString(), value.toString());
  };

  return (
    <fieldset className='b-0 p-0' role='radiogroup'>
      <legend className='mb-xs'>
        <InputLabel isRequired={required} isSmall={false}>
          <InjectedContent content={label} />
        </InputLabel>
      </legend>

      <div className={cx('flex flex-col gap-xs', { 'mb-xs': rawErrors })}>
        {enumOptions.map((option, index) => (
          <RadioButton
            key={index}
            checked={getIsOptionSelected(option)}
            name={id}
            value={option.value}
            onChange={handleChange}>
            {option.label}
          </RadioButton>
        ))}
      </div>
      <ErrorMessage errorMessage={rawErrors?.join(', ')} />
    </fieldset>
  );
};
