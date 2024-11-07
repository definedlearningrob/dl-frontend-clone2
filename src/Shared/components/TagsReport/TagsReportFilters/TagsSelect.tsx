import { useTranslation } from 'react-i18next';
import { ActionMeta, MultiValue } from 'react-select';
import { useEffect, useState } from 'react';
import { isEqual } from 'lodash-es';

import { QueryAsyncSelect } from '@shared/components/AsyncSelect';
import { MultiSelectWithAllOption } from '@shared/components/MultiSelect';
import { TAG_OPTIONS } from '@shared/graphql/user/query/tagOptions';

import { Option } from '../useTagsReportFilters';

type Props = {
  size?: 'sm' | 'md' | 'lg';
  value: MultiValue<Option>;
  onBlur: (newValue: MultiValue<Option>) => void;
};

export const TagsSelect = ({ onBlur, value, size = 'md' }: Props) => {
  const { t } = useTranslation();
  const [internalValue, setInternalValue] = useState<MultiValue<Option>>([]);

  useEffect(() => {
    if (!isEqual(value, internalValue)) {
      setInternalValue(value);
    }
  }, [value]);

  const handleChange = (newValue: MultiValue<Option>, actionMeta: ActionMeta<Option>) => {
    if (actionMeta.action === 'clear') {
      onBlur(newValue);
    }

    setInternalValue(newValue);
  };

  return (
    <QueryAsyncSelect
      components={{
        Option: (props) => <MultiSelectWithAllOption {...props} size={size} />,
      }}
      dataKey='tags.nodes'
      isMulti={true}
      label={t('tagsReport.performanceIndicators')}
      menuPortalTarget={document.body}
      name='tags'
      placeholder={t('tagsReport.selectTag')}
      query={TAG_OPTIONS}
      showAllOption={true}
      size={size}
      value={internalValue}
      onBlur={() => onBlur(internalValue)}
      onChange={handleChange}
    />
  );
};
