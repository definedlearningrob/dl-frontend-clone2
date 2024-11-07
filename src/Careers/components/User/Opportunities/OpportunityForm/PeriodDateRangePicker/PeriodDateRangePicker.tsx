import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import cx from 'classnames';
import { useTranslation } from 'react-i18next';

import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { ReactComponent as CalendarIcon } from '@shared/svg/calendar.svg';

import styles from './PeriodDateRangePicker.module.sass';

import 'react-datepicker/dist/react-datepicker.css';

type Props = ReactDatePickerProps<true> & {
  className?: string;
  datePickerClassName?: string;
  label?: string;
  periodEnd: Date | null;
  periodError?: string;
  periodStart: Date | null;
};

export const PeriodDateRangePicker = ({
  className,
  datePickerClassName,
  label,
  monthsShown = 2,
  onChange,
  periodEnd,
  periodError,
  periodStart,
  placeholderText = 'mm-dd-yyyy',
  dateFormat = 'MM-dd-yyyy',
  ...rest
}: Props) => {
  const { t } = useTranslation();

  const datePickerWrapperClasses = cx(
    'flex items-center !mb-xs',
    'border border-neutral-300 rounded-sm',
    'bg-white text-sm p-xs',
    'transition-colors duration-300 focus-within:border-primary-500',
    datePickerClassName
  );

  return (
    <div className={cx('flex flex-col gap-xs', styles.periods, className)}>
      <label className='text-xs font-regular'>
        {label || t('user.opportunities.importantDatesPeriod')}
      </label>
      <div>
        <div className={datePickerWrapperClasses}>
          <DatePicker
            className='focus:outline-none'
            dateFormat={dateFormat}
            endDate={periodEnd}
            monthsShown={monthsShown}
            placeholderText={placeholderText}
            selected={periodStart}
            selectsRange={true}
            startDate={periodStart}
            onChange={onChange}
            {...rest}
          />
          <IconContainer Icon={CalendarIcon} paddingSize='none' />
        </div>
        {periodError && (
          <div className='text-xxs text-danger-600 input-error-message'>{periodError}</div>
        )}
      </div>
    </div>
  );
};
