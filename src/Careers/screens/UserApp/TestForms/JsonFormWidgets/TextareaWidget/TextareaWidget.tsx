import { WidgetProps } from '@rjsf/utils';
import { ChangeEvent } from 'react';
import { flushSync } from 'react-dom';

import SharedTextarea from '@shared/components/Textarea/Textarea';
import { InputLabel } from '@shared/components/InputLabel/InputLabel';
import { InjectedContent } from '@shared/components/IncjectedContent/InjectedContent';

import styles from './TextareaWidget.module.sass';

export const TextareaWidget = (props: WidgetProps) => {
  const { label, onChange, required, rawErrors, id, value } = props;

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
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

    onChange(event.target.value);
  };

  return (
    <label>
      {label && (
        <div className='mb-xs'>
          <InputLabel isRequired={required} isSmall={false}>
            <InjectedContent content={label} />
          </InputLabel>
        </div>
      )}
      <SharedTextarea
        className={styles.textarea}
        defaultValue={value}
        errorMessage={rawErrors?.join(', ')}
        id={id}
        required={required}
        onBlur={handleChange}
      />
    </label>
  );
};
