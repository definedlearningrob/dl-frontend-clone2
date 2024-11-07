import { useTranslation } from 'react-i18next';

import { COST_RANGES, INSTITUTION_TYPES, SIZE_TYPES, US_STATES } from '@dc/resources/enums';

const getOptions = <T extends {}>(type: T) => {
  const keys = Object.keys(type) as (keyof T)[];

  return keys.map((value) => ({ value, label: type[value] }));
};

export const locations = getOptions(US_STATES);
export const types = getOptions(INSTITUTION_TYPES);
export const DEFAULT_DEBOUNCE_TIME = 1000;

export const getSizesOptions = () => {
  const { t } = useTranslation();

  return [
    { label: t('student.institutionSearch.filters.sizes.verySmall'), value: SIZE_TYPES.VERY_SMALL },
    { label: t('student.institutionSearch.filters.sizes.small'), value: SIZE_TYPES.SMALL },
    { label: t('student.institutionSearch.filters.sizes.medium'), value: SIZE_TYPES.MEDIUM },
    { label: t('student.institutionSearch.filters.sizes.large'), value: SIZE_TYPES.LARGE },
    { label: t('student.institutionSearch.filters.sizes.veryLarge'), value: SIZE_TYPES.VERY_LARGE },
  ];
};

export const costsOptions = [
  { label: '0 - 5000', value: COST_RANGES.LESS_THAN_5000 },
  { label: '5000 - 10000', value: COST_RANGES.FROM_5001_TO_10000 },
  { label: '10000 - 15000', value: COST_RANGES.FROM_10001_TO_15000 },
  { label: '15000 - 20000', value: COST_RANGES.FROM_15001_TO_20000 },
  { label: '20000+', value: COST_RANGES.MORE_THAN_20000 },
];
