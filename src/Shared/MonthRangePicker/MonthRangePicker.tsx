import DatePicker, {
  ReactDatePickerCustomHeaderProps,
  ReactDatePickerProps,
} from 'react-datepicker';
import cx from 'classnames';
import dayjs from 'dayjs';
import { forwardRef, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import Button from '@shared/components/Button/Button';
import { ReactComponent as CalendarIcon } from '@shared/svg/calendar.svg';
import { ReactComponent as ChevronLeftIcon } from '@shared/svg/chevron_left.svg';
import { ReactComponent as ChevronRightIcon } from '@shared/svg/chevron_right.svg';
import { InputLabel } from '@shared/components/InputLabel/InputLabel';
import { TextInput } from '@shared/components/TextInput/TextInput';
import { IconButton } from '@shared/components/IconButton/IconButton';

import 'react-datepicker/dist/react-datepicker.css';
import styles from './MonthRangePicker.module.sass';

type Props = ReactDatePickerProps<true> & {
  className?: string;
  label?: string;
  periodEnd: Date | null;
  periodError?: string;
  periodStart: Date | null;
  isRequired?: boolean;
  showPresent?: boolean;
};

const CustomInput = forwardRef(
  (
    {
      endDate,
      error,
      placeholder,
      showPresent,
      value,
      onClick,
    }: {
      endDate: Date | null;
      error: string | undefined;
      placeholder: string;
      showPresent: boolean;
      value?: Date | null;
      onClick?: () => void;
    },
    _ref
  ) => {
    const { t } = useTranslation();
    const presentValue = value && endDate === null && showPresent ? t('portfolio.present') : '';

    return (
      <TextInput
        Icon={CalendarIcon}
        errorMessage={error}
        iconPlacement='end'
        placeholder={placeholder}
        value={`${value}${presentValue}`}
        onChange={() => null}
        onClick={onClick}
      />
    );
  }
);

export const MonthRangePicker = ({
  className,
  label,
  monthsShown = 2,
  onChange,
  periodEnd,
  periodError,
  periodStart,
  isRequired,
  showPresent = false,
  placeholderText = 'mm-dd-yyyy',
  dateFormat = 'MM-dd-yyyy',
  ...rest
}: Props) => {
  const calendarRef = useRef<DatePicker>(null);
  const { t } = useTranslation();

  const CustomHeader = ({
    date,
    increaseYear,
    decreaseYear,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
  }: ReactDatePickerCustomHeaderProps) => {
    const year = dayjs(date).format('YYYY');

    const handlePresentOption = () => {
      onChange([periodStart, null], undefined);

      return calendarRef?.current?.setOpen(false);
    };

    return (
      <div className='flex justify-between items-center px-x'>
        <div className='text-primary-500 text-sm'>{year}</div>
        {showPresent && periodStart && (
          <div>
            <Button size='sm' variant='primary' onClick={handlePresentOption}>
              {t('portfolio.present')}
            </Button>
          </div>
        )}
        <div className='flex gap-xxs'>
          <IconButton
            Icon={ChevronLeftIcon}
            className='text-primary-500 hover:!bg-primary-200'
            disabled={prevMonthButtonDisabled}
            type='button'
            onClick={decreaseYear}
          />
          <IconButton
            Icon={ChevronRightIcon}
            className='text-primary-500 hover:!bg-primary-200'
            disabled={nextMonthButtonDisabled}
            type='button'
            onClick={increaseYear}
          />
        </div>
      </div>
    );
  };

  return (
    <div className={cx('flex flex-col gap-xs', styles.monthRangePicker, className)}>
      {label && (
        <InputLabel isRequired={isRequired} isSmall={false}>
          {label}
        </InputLabel>
      )}
      <div>
        <DatePicker
          ref={calendarRef}
          className='text-font-primary focus:outline-none'
          customInput={
            <CustomInput
              endDate={periodEnd}
              error={periodError}
              placeholder={placeholderText}
              showPresent={showPresent}
            />
          }
          dateFormat={dateFormat}
          endDate={periodEnd}
          monthsShown={monthsShown}
          placeholderText={placeholderText}
          selected={periodStart}
          selectsRange={true}
          startDate={periodStart}
          onChange={onChange}
          {...rest}
          renderCustomHeader={CustomHeader}
        />
      </div>
    </div>
  );
};
