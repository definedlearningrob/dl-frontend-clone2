import dayjs from 'dayjs';
import { range } from 'lodash-es';
import { SelectInstance, SingleValue } from 'react-select';
import { useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { MONTHS } from '@shared/resources/constants';
import { Select } from '@shared/components/Select';
import { Tooltip } from '@shared/components/Tooltip';
import { ReactComponent as InfoIcon } from '@shared/svg/info_outlined.svg';
import Icon from '@shared/components/Icon/Icon';

import styles from './SchoolYearDatePicker.module.sass';

type Props = {
  schoolYearStartDate: {
    day: number;
    month: number;
  };
  onChange?: (schoolYearStartDate: { day: number; month: number }) => void;
  disabled?: boolean;
};

export const SchoolYearDatePicker = ({ schoolYearStartDate, onChange, disabled }: Props) => {
  const { t } = useTranslation();

  const monthOptions = useMemo(
    () => MONTHS.map((month, index) => ({ label: t(`months.${month}`), value: index })),
    []
  );

  const [selectedMonth, setSelectedMonth] = useState(
    monthOptions.find((month) => schoolYearStartDate.month === month.value + 1) || monthOptions[0]
  );

  const dayOptions = useMemo(() => {
    const numberOfDays = dayjs().set('month', selectedMonth.value).daysInMonth();

    return range(1, numberOfDays + 1).map((day) => ({ label: `${day}`, value: day }));
  }, [selectedMonth]);

  const [selectedDay, setSelectedDay] = useState(
    dayOptions.find((day) => day.value === schoolYearStartDate.day) || dayOptions[0]
  );

  const daySelectRef = useRef<SelectInstance<typeof dayOptions[number]>>(null);

  const handleMonthChange = (newValue: SingleValue<{ label: string; value: number }>) => {
    setSelectedMonth(newValue!);
    setSelectedDay(dayOptions[0]);

    if (daySelectRef.current) {
      daySelectRef.current.focus();
    }
  };

  const handleDayChange = (newValue: SingleValue<{ label: string; value: number }>) => {
    setSelectedDay(newValue!);
  };

  const handleUpdateSchoolYearStartDate = () => {
    onChange &&
      onChange({
        day: selectedDay.value,
        month: selectedMonth.value + 1,
      });
  };

  const formattedDate = dayjs()
    .set('month', schoolYearStartDate.month - 1)
    .set('date', schoolYearStartDate.day)
    .format('MMMM D');

  return (
    <section className={styles.sectionWrapper}>
      <div className={styles.labelWrapper}>
        <label>{t('entityInfo.schoolYearStartDate')}</label>
        {disabled && (
          <Tooltip message={t('entityInfo.settings.schoolYearTooltipInfo')}>
            <Icon className={styles.icon} icon={<InfoIcon />} size='sm' />
          </Tooltip>
        )}
      </div>
      {disabled && <span>{formattedDate}</span>}
      {!disabled && (
        <div className={styles.pickersWrapper}>
          <Select
            isClearable={false}
            menuPlacement='auto'
            options={monthOptions}
            value={selectedMonth}
            onChange={handleMonthChange}
          />
          <Select
            isClearable={false}
            menuPlacement='auto'
            openMenuOnFocus={true}
            options={dayOptions}
            selectRef={daySelectRef}
            value={selectedDay}
            onBlur={handleUpdateSchoolYearStartDate}
            onChange={handleDayChange}
          />
        </div>
      )}
    </section>
  );
};
