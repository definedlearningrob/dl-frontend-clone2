import { useTranslation } from 'react-i18next';
import { ChangeEvent, useEffect, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { MultiValue, SingleValue } from 'react-select';

import { useStudentFilters } from '@dc/components/StudentManagement/StudentFilters/StudentFiltersProvider';
import { ENTITIES_WITH_CHILDREN } from '@dc/graphql/user/queries/entitiesWithChildrens';
import { COUNSELORS } from '@dc/graphql/user/queries/counselors';
import { CounselorOption } from '@dc/components/StudentManagement/StudentFilters/CounselorOption/CounselorOption';
import { CounselorSingleValue } from '@dc/components/StudentManagement/StudentFilters/CounselorSingleValue/CounselorSingleValue';
import {
  flatEntities,
  getGradYearOptions,
  SelectOption,
} from '@dc/components/StudentManagement/StudentFilters/helpers';
import useUserInfo from '@dc/hooks/useUserInfo';
import { TUserInfo } from '@dc/graphql/user/queries/userInfo';

import { TextInput } from '@shared/components/TextInput/TextInput';
import { ReactComponent as SearchIcon } from '@shared/svg/search.svg';
import debounce from '@shared/utils/debounce';
import { Select } from '@shared/components/Select';

const DEBOUNCE_TIME = 700;
const PER_PAGE = 100;

export const StudentFilters = () => {
  const { t } = useTranslation();
  const { setKeyword, setGradYear, setEntity, setCounselor } = useStudentFilters();
  const { userInfo } = useUserInfo<TUserInfo>();

  const { data: entitiesData } = useQuery(ENTITIES_WITH_CHILDREN, {
    variables: { perPage: PER_PAGE },
  });
  const { data: counselorsData } = useQuery(COUNSELORS);

  const handleChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const debouncedHandleChangeSearch = useMemo(
    () => debounce(handleChangeSearch, DEBOUNCE_TIME),
    []
  );

  const gradYearOptions = useMemo(() => getGradYearOptions(), []);

  const counselorSelectOptions = useMemo(() => {
    if (!counselorsData) {
      return [];
    }

    return counselorsData.counselors.nodes.map((counselor) => ({
      value: counselor.uuid,
      label: `${counselor.firstName} ${counselor.lastName}`,
    }));
  }, [counselorsData]);

  const counselorDefaultValue = useMemo(
    () => counselorSelectOptions.find((counselorOption) => counselorOption.value === userInfo.uuid),
    [counselorSelectOptions, userInfo.uuid]
  );

  useEffect(() => {
    if (counselorDefaultValue?.value) {
      setCounselor(counselorDefaultValue.value);
    }
  }, [counselorDefaultValue]);

  if (!entitiesData || !counselorsData) return null;

  const entities = flatEntities(entitiesData.entities);

  const entitySelectOptions = entities.map((entity) => ({
    value: entity.uuid,
    label: entity.name,
  }));

  const handleGradYearChange = (selectedGradYearOptions: MultiValue<SelectOption<number>>) => {
    setGradYear(selectedGradYearOptions.map((option) => option?.value));
  };

  const handleEntityChange = (selectedEntityOptions: MultiValue<SelectOption<string>>) => {
    setEntity(selectedEntityOptions.map((option) => option?.value));
  };

  const handleCounselorChange = (selectedCounselorOption: SingleValue<SelectOption<string>>) => {
    setCounselor(selectedCounselorOption?.value || null);
  };

  return (
    <div className='flex items-start gap-sm'>
      <div className='w-[320px] xxxl:w-[380px]'>
        <TextInput
          Icon={SearchIcon}
          label={t('studentManagement.search')}
          minLength={3}
          placeholder={t('studentManagement.searchByName')}
          onChange={debouncedHandleChangeSearch}
        />
      </div>
      <Select
        className='w-[240px]'
        isMulti={true}
        label={t('studentManagement.entity')}
        name='entity'
        options={entitySelectOptions}
        placeholder={t('studentManagement.selectEntity')}
        onChange={handleEntityChange}
      />
      <Select
        className='w-[240px]'
        isMulti={true}
        label={t('studentManagement.gradYear')}
        name='gradYear'
        options={gradYearOptions}
        placeholder={t('studentManagement.selectGradYear')}
        onChange={handleGradYearChange}
      />
      <Select
        className='w-[240px]'
        components={{ Option: CounselorOption, SingleValue: CounselorSingleValue }}
        data-testid='counselor-select'
        defaultValue={counselorDefaultValue}
        isClearable={true}
        label={t('studentManagement.counselor')}
        name='counselor'
        options={counselorSelectOptions}
        placeholder={t('studentManagement.selectCounselor')}
        onChange={handleCounselorChange}
      />
    </div>
  );
};
