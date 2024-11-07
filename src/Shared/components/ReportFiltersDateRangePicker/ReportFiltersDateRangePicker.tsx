import DatePicker from 'react-datepicker';
import { useTranslation } from 'react-i18next';
import { offset } from '@floating-ui/react';

import { ReactComponent as CalendarIcon } from '@shared/svg/calendar.svg';
import { TextInput } from '@shared/components/TextInput/TextInput';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';

import styles from './ReportFiltersDateRangePicker.module.sass';

type Props = {
  startDate: Date | null;
  endDate: Date | null;
  onChange: (dates: [Date, Date]) => void;
  label: string;
};

export const ReportFiltersDateRangePicker = ({ startDate, endDate, onChange, label }: Props) => {
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });
  const { t } = useTranslation();

  return (
    <div className={styles.dateRangePicker}>
      <DatePicker
        customInput={
          <TextInput
            Icon={CalendarIcon}
            iconPlacement='end'
            isRequired={true}
            label={label}
            size={isFullHD ? 'lg' : 'md'}
          />
        }
        dateFormat='MMM d, yyyy'
        endDate={endDate}
        fixedHeight={true}
        maxDate={new Date()}
        minDate={new Date('2021-01-01')}
        monthsShown={2}
        placeholderText={t('reports.selectDateRangePlaceholder')}
        popperModifiers={[offset(isFullHD ? 5 : -25)]}
        popperPlacement={isFullHD ? 'bottom-start' : 'top-start'}
        selected={startDate}
        selectsRange={true}
        startDate={startDate}
        onChange={onChange}
      />
    </div>
  );
};
