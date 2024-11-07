import cx from 'classnames';
import TextareaAutosize from 'react-textarea-autosize';
import { useField } from 'formik';
import { useTranslation } from 'react-i18next';

import styles from './AutoSizeTextarea.module.sass';

type Props = {
  className?: string;
  disabled: boolean;
  labelText?: string;
  name: string;
  placeholder?: string;
  labelClassname?: string;
  textAreaClassname?: string;
  maxRows?: number;
};

const MIN_ROWS = 1;
const MAX_ROWS = 8;

export const AutoSizeTextarea = ({
  className,
  disabled,
  labelText,
  name,
  placeholder,
  labelClassname,
  maxRows = MAX_ROWS,
  textAreaClassname,
}: Props) => {
  const { t } = useTranslation();
  const [field, meta] = useField(name);
  const errorMessage = meta.error && meta.touched ? meta.error : undefined;
  const defaultPlaceholder = t('common.fields.common.placeholder');
  const classes = cx(styles.textarea, className);

  return (
    <div className={classes} data-error={errorMessage}>
      <label className='w-full'>
        <div className={cx('text-sm xxxl:text-base mb-sm font-bold', labelClassname)}>
          {labelText}
        </div>
        <TextareaAutosize
          className={cx('scrollbar', styles.textareaInput, textAreaClassname)}
          disabled={disabled}
          maxRows={maxRows}
          minRows={MIN_ROWS}
          placeholder={placeholder || defaultPlaceholder}
          {...field}
        />
      </label>
      <div className={styles.inputErrorMessage}>{errorMessage && errorMessage}</div>
    </div>
  );
};
