import DatePicker from 'react-datepicker';
import { useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';

import { PeriodDateRangePicker } from '@dc/components/User/Opportunities/OpportunityForm/PeriodDateRangePicker';
import { FormValues } from '@dc/components/User/Opportunities/helpers';

import { ReactComponent as CalendarIcon } from '@shared/svg/calendar.svg';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';

import styles from './ImportantDatesFormElement.module.sass';

export const ImportantDatesFormElement = () => {
  const { t } = useTranslation();
  const { setValues, values, errors, touched, handleBlur } = useFormikContext<FormValues>();
  const { deadline, periodEnd, periodStart } = values;
  const periodError =
    touched.periodStart && touched.periodEnd ? errors.periodStart || errors.periodEnd : undefined;

  const onPeriodChange = (dates: [Date, Date]) => {
    const [start, end] = dates;

    setValues({
      ...values,
      periodStart: start,
      periodEnd: end,
    });
  };

  const onDeadlineChange = (date: Date) => {
    setValues({ ...values, deadline: date });
  };

  const datePickerWrapperClasses = cx(
    'flex items-center !mb-xxs',
    'border border-neutral-300 rounded-sm',
    'bg-white text-sm p-xs',
    'transition-colors duration-300 focus-within:border-primary-500'
  );

  return (
    <div className='flex flex-col mb-sm'>
      <h6 className='text-xs'>{t('user.opportunities.importantDatesHeading')}</h6>
      <div className={styles.datesSections}>
        <div className={styles.deadline}>
          <label className='inline-block mb-xs'>
            {t('user.opportunities.importantDatesDeadline')}
          </label>
          <div className={datePickerWrapperClasses}>
            <DatePicker
              className='focus:outline-none'
              dateFormat='MMM d, yyyy'
              placeholderText='mm-dd-yyyy'
              selected={deadline}
              strictParsing={true}
              onBlur={handleBlur('deadline')}
              onChange={onDeadlineChange}
            />
            <IconContainer Icon={CalendarIcon} paddingSize='none' />
          </div>
          {touched.deadline && errors.deadline && (
            <span className='text-xxs text-danger-600'>{errors.deadline}</span>
          )}
        </div>
        <PeriodDateRangePicker
          dateFormat='MMM d, yyyy'
          periodEnd={periodEnd}
          periodError={periodError}
          periodStart={periodStart}
          onBlur={handleBlur('periodStart')}
          onChange={onPeriodChange}
        />
      </div>
    </div>
  );
};
