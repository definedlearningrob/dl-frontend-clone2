import { WidgetProps } from '@rjsf/utils';
import { ChangeEvent } from 'react';
import { flushSync } from 'react-dom';

import { TextInput } from '@shared/components/TextInput/TextInput';

import styles from './TextWidget.module.sass';

export const TextWidget = (props: WidgetProps) => {
  const { label, disabled, name, placeholder, rawErrors, onChange, required, value, schema } =
    props;

  const sizeProps = {
    ...('maxLength' in schema && { maxLength: schema.maxLength }),
    ...('minLength' in schema && { minLength: schema.minLength }),
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // if blur was triggered by clicking on the button, we need to trigger the button click
    // @ts-expect-error ChangeEvent has no relatedTarget
    if (event.relatedTarget && event.relatedTarget.nodeName === 'BUTTON') {
      // we need to set it synchronously to have the latest value on submit
      flushSync(() => {
        onChange(event.target.value);
      });
      // @ts-expect-error ChangeEvent has no relatedTarget
      const el = document.getElementById(event.relatedTarget.id);
      if (el) {
        el.click();
      }

      return;
    }

    if (!event.target.value) {
      onChange(undefined);

      return;
    }

    onChange(event.target.value);
  };

  return (
    <TextInput
      aria-required={required}
      className={styles.input}
      defaultValue={value}
      disabled={disabled}
      errorMessage={rawErrors?.join(', ')}
      isRequired={required}
      label={label}
      name={name}
      placeholder={placeholder}
      required={required}
      onBlur={handleChange}
      {...sizeProps}
    />
  );
};
