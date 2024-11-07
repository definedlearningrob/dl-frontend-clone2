import { t } from 'i18next';
import { isArray, isNil } from 'lodash-es';

import { Filter } from '@shared/components/FiltersSummarizer/FiltersSummarizer';
import { SelectOption } from '@shared/components/Select';

export const splitTemplate = (input: string) => {
  const regex = /\*\*(.*?)\*\*/g;
  const result = [];
  let lastIndex = 0;

  input.replace(regex, (match, group, index) => {
    if (index > lastIndex) {
      result.push({ replaceable: false, content: input.slice(lastIndex, index) });
    }

    result.push({ replaceable: true, content: group });

    lastIndex = index + match.length;

    return match;
  });

  if (lastIndex < input.length) {
    result.push({ replaceable: false, content: input.slice(lastIndex) });
  }

  return result;
};

type Params = {
  filterValue?: Filter;
  filterName: string;
};

export const getTextContent = ({ filterValue, filterName }: Params) => {
  const translationKey = `components.filtersSummarizer.${filterName}`;

  if (typeof filterValue === 'number') {
    return t(translationKey, { count: filterValue });
  }

  if (typeof filterValue === 'object' && !isArray(filterValue)) {
    const selectedFilter = filterValue as SelectOption & { keepOriginalLabel?: boolean };

    if (isNil(selectedFilter)) return '-------';

    if (selectedFilter.keepOriginalLabel) return selectedFilter?.label;

    return selectedFilter?.label.replace(/\s/g, '');
  }

  if (typeof filterValue === 'object' && Array.isArray(filterValue)) {
    const selectedFilter = filterValue as SelectOption[];
    const isAll = selectedFilter[0]?.label === 'All';
    const count = isAll ? 0 : selectedFilter.length;

    return isAll ? t(`${translationKey}_all`) : t(translationKey, { count });
  }

  return '';
};
