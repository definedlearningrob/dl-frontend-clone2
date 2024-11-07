import { useTranslation } from 'react-i18next';
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useMemo } from 'react';
import { MultiValue } from 'react-select';
import { debounce } from 'lodash-es';

import { ProgramsDegree } from '@dc/graphql/student/queries/institutionPrograms';

import { TextInput } from '@shared/components/TextInput/TextInput';
import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';
import { Select } from '@shared/components/Select';

import { ProgramFilters as Filters } from './AcademicsTab';
import styles from './ProgramFilters.module.sass';

const DEBOUNCE_TIME = 500;

type Props = {
  loading: boolean;
  setFilters: Dispatch<SetStateAction<Filters>>;
};

export const ProgramFilters = ({ loading, setFilters }: Props) => {
  const { t } = useTranslation();

  const DegreesValues = Object.values(ProgramsDegree).map((value) => ({
    value,
    label: t(`postSecondary.institution.degrees.${value}`),
  }));

  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setFilters((prev) => ({
      ...prev,
      title: value,
    }));
  };

  const handleChangeDegree = (
    value: MultiValue<{
      value: ProgramsDegree;
      label: string;
    }>
  ) => {
    setFilters((prev) => ({
      ...prev,
      degrees: value.map((item) => item.value),
    }));
  };

  const debouncedChange = useMemo(() => debounce(handleChangeSearch, DEBOUNCE_TIME), []);

  useEffect(() => () => debouncedChange.cancel());

  return (
    <div className='flex items-center gap-base mb-base'>
      <TextInput
        className={styles.input}
        label={t('postSecondary.institution.programName')}
        placeholder={t('postSecondary.institution.programSearch')}
        onChange={debouncedChange}
      />
      <Select
        className={styles.select}
        isMulti={true}
        label={t('postSecondary.institution.programDegree')}
        name='degree'
        options={DegreesValues}
        placeholder={t('postSecondary.institution.programDegree')}
        onChange={handleChangeDegree}
      />
      {loading && <SharedLoadingSpinner size='small' />}
    </div>
  );
};
