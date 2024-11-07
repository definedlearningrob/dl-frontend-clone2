import { WidgetProps } from '@rjsf/utils';
import { useState } from 'react';
import dayjs from 'dayjs';

import DatePicker from '@shared/components/DatePicker/DatePicker';
import { ReactComponent as CalendarIcon } from '@shared/svg/calendar.svg';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { ErrorMessage } from '@shared/components/ErrorMessage/ErrorMessage';
import { InputLabel } from '@shared/components/InputLabel/InputLabel';

const DATE_FORMAT = 'YYYY-MM-DD';

const getDateWithYear = (year: string | undefined) => {
  if (!year) {
    return undefined;
  }

  return dayjs()
    .set('year', +year)
    .toDate();
};

type Props = WidgetProps & {
  dateFormat?: string;
  showMonthYear?: boolean;
};

export const DateWidget = (props: Props) => {
  const { value, onChange, label, id, required, rawErrors, placeholder, options } = props;
  const [dateValue, setDateValue] = useState(() => {
    if (!value) {
      return null;
    }

    return dayjs(value, DATE_FORMAT).toDate();
  });

  const handleChange = (date: Date) => {
    if (!date) {
      onChange(undefined);
      setDateValue(null);

      return;
    }
    setDateValue(date);
    const formattedDate = dayjs(date).format(DATE_FORMAT);
    onChange(formattedDate);
  };

  const yearsRange = options.yearsRange as [string, string] | undefined;
  const [minYear, maxYear] = yearsRange || [];

  return (
    <label className='flex flex-col gap-xs'>
      <InputLabel isRequired={required} isSmall={false}>
        {label}
      </InputLabel>
      <div className='relative'>
        <DatePicker
          dateFormat={props.dateFormat || 'yyyy-MM-dd'}
          id={id}
          maxDate={getDateWithYear(maxYear)}
          minDate={getDateWithYear(minYear)}
          placeholder={placeholder}
          showMonthYear={props.showMonthYear}
          value={dateValue}
          onChange={handleChange}
        />
        <IconContainer
          Icon={CalendarIcon}
          className='absolute right-xs top-1/2 -translate-y-1/2 text-font-primary'
          paddingSize='none'
        />
      </div>
      <ErrorMessage errorMessage={rawErrors?.join(', ')} />
    </label>
  );
};
