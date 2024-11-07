import { useField } from 'formik';
import { MultiValue } from 'react-select';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

import { useOpportunityTagsQuery } from '@dc/graphql/user/hooks/useOpportunityTagsQuery';

import { MultiSelectWithLabel } from '@shared/components/MultiSelect/MultiSelectWithLabel';

export const TagsSelect = () => {
  const { data: opportunityTagsData } = useOpportunityTagsQuery();

  const { t } = useTranslation();

  const [field, meta, helpers] = useField('tags');
  const errorMessage = meta.error && meta.touched ? meta.error : undefined;
  const { value } = field;

  const opportunityTagOptions = useMemo(
    () =>
      opportunityTagsData?.opportunityTags.map((tag) => ({
        label: tag,
        value: tag,
      })),
    [opportunityTagsData]
  );

  if (!opportunityTagsData) return null;

  const handleSelect = (newValue: MultiValue<{ label: string; value: string }>) => {
    helpers.setValue(newValue);
  };

  return (
    <MultiSelectWithLabel
      errorMessage={errorMessage}
      isCreatable={true}
      isRequired={false}
      label={t('user.opportunities.form.tagsOptional')}
      name='tags'
      options={opportunityTagOptions}
      placeholder={t('user.opportunities.form.selectTags')}
      showError={!!errorMessage}
      value={value}
      onChange={handleSelect}
    />
  );
};
