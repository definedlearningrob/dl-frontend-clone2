import { useTranslation } from 'react-i18next';
import { useEffect, useMemo, useState } from 'react';
import { SingleValue } from 'react-select';

import { useReports } from '@dc/hooks/useReports';

import SharedButton from '@shared/components/Button/Button';
import { useFeatureFlags } from '@shared/components/FeatureProvider';
import { getInitialSchoolYear } from '@shared/utils/schoolYear';
import { Select } from '@shared/components/Select';

import styles from './GenerateReportsSection.module.sass';

type Props = {
  schoolYearsOptions: readonly {
    readonly label: string;
    readonly value: number;
  }[];
  toggleReportModal: () => void;
  schoolYearStartDate: { day: number; month: number };
};

export const GenerateReportsSection = ({
  schoolYearsOptions,
  toggleReportModal,
  schoolYearStartDate,
}: Props) => {
  const { SCHOOL_YEAR_ON } = useFeatureFlags();
  const { t } = useTranslation();
  const { setReportStartYear } = useReports();

  const initialSchoolYear = useMemo(
    () => getInitialSchoolYear(schoolYearStartDate),
    [schoolYearsOptions]
  );

  const [schoolYear, setSchoolYear] = useState<{ label: string; value: number }>(
    initialSchoolYear || schoolYearsOptions[0]
  );

  const setSchoolYearFilter = (selectOption: SingleValue<{ label: string; value: number }>) => {
    if (selectOption) {
      setSchoolYear(selectOption);
      setReportStartYear(selectOption.value);
    }
  };

  useEffect(() => {
    if (initialSchoolYear?.value) {
      setReportStartYear(initialSchoolYear.value);
    }
  }, [initialSchoolYear]);

  return (
    <div className={styles.reportsSection}>
      <h5 className='mb-0'>{t('user.dashboard.myReports.reportCurrentEntity')}</h5>
      <div className='flex gap-sm'>
        {SCHOOL_YEAR_ON && (
          <Select
            className='w-[150px]'
            defaultValue={schoolYear}
            isSearchable={false}
            name='schoolYear'
            options={schoolYearsOptions}
            onChange={setSchoolYearFilter}
          />
        )}
        <SharedButton className={styles.button} variant='primary' onClick={toggleReportModal}>
          {t('user.dashboard.myReports.generateReport')}
        </SharedButton>
      </div>
    </div>
  );
};
