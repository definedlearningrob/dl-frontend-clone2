import { useField } from 'formik';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import SharedDatePicker from '@shared/components/DatePicker/DatePicker';
import SharedCheckbox from '@shared/components/Checkbox/Checkbox';

import styles from './Dates.module.sass';

type Props = {
  publishedTo?: string | null;
};

const ExtensionEditDates = ({ publishedTo }: Props) => {
  const [hasEndDateOpen, setEndDateOpen] = useState(!!publishedTo);
  const [fromDate, , fromHelpers] = useField('publishedFrom');
  const [toDate, , toHelpers] = useField('publishedTo');
  const { t } = useTranslation();

  const handleEndDateChange = () => {
    if (hasEndDateOpen) {
      toHelpers.setValue(null);
    }
    if (publishedTo && !hasEndDateOpen) {
      toHelpers.setValue(new Date(publishedTo));
    }
    setEndDateOpen(!hasEndDateOpen);
  };

  const fromMaxValue = toDate.value !== null ? new Date(toDate.value) : undefined;
  const toMinValue = fromDate.value && new Date(fromDate.value);

  return (
    <div>
      <h3 className={styles.header}>
        {t('user.dashboard.extensionFields.settings.publishOnDate')}
      </h3>
      <div className={styles.dates}>
        <div>
          <label>{t('user.dashboard.extensionFields.settings.from')}</label>
          <SharedDatePicker
            maxDate={fromMaxValue}
            value={fromDate.value}
            onChange={fromHelpers.setValue}
          />
        </div>
        {hasEndDateOpen && (
          <div>
            <label>{t('user.dashboard.extensionFields.settings.to')}</label>
            <SharedDatePicker
              minDate={toMinValue}
              value={toDate.value}
              onChange={toHelpers.setValue}
            />
          </div>
        )}
      </div>
      <div>
        <SharedCheckbox
          checked={hasEndDateOpen}
          className={styles.checkbox}
          label={t('user.dashboard.extensionFields.settings.setEndDate')}
          onChange={handleEndDateChange}
        />
      </div>
    </div>
  );
};

export default ExtensionEditDates;
