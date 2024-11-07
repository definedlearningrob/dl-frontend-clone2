import dayjs from 'dayjs';
import DatePicker from 'react-datepicker';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';

import DeprecatedIconButton from '@shared/components/DeprecatedIconButton/DeprecatedIconButton';
import { ReactComponent as ChevronLeftIcon } from '@shared/svg/chevron_left.svg';
import { ReactComponent as ChevronRightIcon } from '@shared/svg/chevron_right.svg';
import { MONTHS } from '@shared/resources/constants';

import 'react-datepicker/dist/react-datepicker.css';

import styles from './DatePicker.module.sass';

type Props = {
  value: Date | null;
  onChange: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  dateFormat?: string;
  disabled?: boolean;
  placeholder?: string;
  id?: string;
  showMonthYear?: boolean;
};

const SharedDatePicker = ({
  minDate,
  maxDate,
  value,
  onChange,
  dateFormat,
  disabled,
  placeholder,
  id,
  showMonthYear,
}: Props) => {
  const { t } = useTranslation();

  const getYear = (date: Date | null) => parseInt(dayjs(date).format('YYYY'));

  const getMonth = (date: Date | null) => parseInt(dayjs(date).format('M'));

  const maxYearsFuture = 2;

  const years = Array.from(new Array(maxYearsFuture), (_, i) => i + getYear(new Date()));

  const calendarClassname = cx(
    styles.calendarWrapper,
    '!shadow-200 !rounded-sm !border !border-neutral-300 bg-white overflow-hidden'
  );

  const pickerWrapperClassname = cx(styles.inputWrapper, 'w-full');

  return (
    <DatePicker
      calendarClassName={calendarClassname}
      dateFormat={dateFormat || 'MMM d, yyyy'}
      disabled={disabled}
      id={id}
      maxDate={maxDate || dayjs(new Date()).add(6, 'month').toDate()}
      minDate={minDate || new Date()}
      placeholderText={placeholder || t('components.datepicker.placeholder')}
      renderCustomHeader={({
        date,
        changeYear,
        changeMonth,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div className='flex justify-between items-center mb-sm'>
          <div>
            <select
              className='text-primary-500 text-sm font-medium bg-white'
              value={`${getYear(date)}||${getMonth(date)}`}
              onChange={({ target: { value } }) => {
                const [year, month] = value.split('||');
                //@ts-ignore
                changeYear(year);
                //@ts-ignore
                changeMonth(month - 1);
              }}>
              {years.map((yearOption) =>
                MONTHS.map((monthOption, monthIndex) => (
                  <option key={yearOption + monthOption} value={`${yearOption}||${monthIndex + 1}`}>
                    {`${t(`months.${monthOption}`)} ${yearOption}`}
                  </option>
                ))
              )}
            </select>
          </div>
          <div className='flex'>
            <DeprecatedIconButton
              className='text-primary-500 hover:!bg-primary-200 hover:!text-primary-600'
              disabled={prevMonthButtonDisabled}
              icon={<ChevronLeftIcon />}
              size='xs'
              type='button'
              onClick={decreaseMonth}
            />
            <DeprecatedIconButton
              className='text-primary-500 hover:!bg-primary-200 hover:!text-primary-600'
              disabled={nextMonthButtonDisabled}
              icon={<ChevronRightIcon />}
              size='xs'
              type='button'
              onClick={increaseMonth}
            />
          </div>
        </div>
      )}
      selected={value}
      showFourColumnMonthYearPicker={true}
      showMonthYearPicker={showMonthYear}
      showPopperArrow={false}
      wrapperClassName={pickerWrapperClassname}
      onChange={onChange}
    />
  );
};

export default SharedDatePicker;
