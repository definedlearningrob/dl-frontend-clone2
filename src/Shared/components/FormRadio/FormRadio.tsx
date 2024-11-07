import { useField } from 'formik';
import { ChangeEvent } from 'react';
import { first } from 'lodash-es';

import { RadioButton, RadioButtonProps } from '../RadioButton/RadioButton';

type Props = RadioButtonProps & {
  name: string;
};

export function FormRadio(props: Props) {
  const [field, , helpers] = useField(props.name);

  return (
    <RadioButton
      checked={first(field.value) === props.value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => helpers.setValue([e.target.value])}
      {...props}
    />
  );
}
