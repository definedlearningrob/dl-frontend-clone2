import { useField } from 'formik';
import React, { ComponentProps } from 'react';

import { NumberInput } from '../NumberInput/NumberInput';

type Props = Omit<ComponentProps<typeof NumberInput>, 'onChange'> & {
  name: string;
};

export const FormNumberInput = (props: Props) => {
  const { name, ...rest } = props;
  const [field, , helpers] = useField(name);

  const handleChange = (newValue: number) => {
    helpers.setValue(newValue);
  };

  return <NumberInput {...field} {...rest} onChange={handleChange} />;
};
