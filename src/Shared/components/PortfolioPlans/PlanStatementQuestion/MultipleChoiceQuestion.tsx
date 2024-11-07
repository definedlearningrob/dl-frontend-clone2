import { useField } from 'formik';
import { xor } from 'lodash-es';
import { ChangeEvent } from 'react';

import SharedCheckbox from '@shared/components/Checkbox/Checkbox';

type Props = {
  options: { option: string; id: string }[];
  disabled: boolean;
  name: string;
};

export const MultipleChoiceQuestion = ({ options, disabled, name }: Props) => {
  const [field, , helpers] = useField(name);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // adds a value to the array when it is not there or remove it when it is present
    const newValue = xor(field.value, [event.target.value]);
    helpers.setValue(newValue);
  };

  return (
    <fieldset className='p-0'>
      {options.map((option) => (
        <SharedCheckbox
          key={option.id}
          checked={field.value.includes(option.option)}
          className='mb-xs last:mb-0 !text-xs xxxl:!text-sm'
          disabled={disabled}
          id={option.id}
          label={option.option}
          value={option.option}
          onChange={handleChange}
        />
      ))}
    </fieldset>
  );
};
