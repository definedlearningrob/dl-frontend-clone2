import { xorBy } from 'lodash-es';
import { useTranslation } from 'react-i18next';
import { useField } from 'formik';

import { usePathways } from '@dc/graphql/user/hooks/usePathways';

import { Select } from '@shared/components/Select';

export const Pathways = () => {
  const { t } = useTranslation();
  const { data } = usePathways();
  const [pathwaysInput, , pathwaysHelpers] = useField('pathwayOptions');

  const pathwayOptions =
    data && data.pathways.map((pathway) => ({ value: pathway, label: pathway.name }));

  const pathwayOptionsWithoutSelected = xorBy(
    pathwayOptions,
    pathwaysInput.value,
    (item) => item.value.id
  );

  return (
    <div>
      <h4>{t('admin.tasks.pathways.label')}</h4>
      <Select
        {...pathwaysInput}
        isMulti={true}
        options={pathwayOptionsWithoutSelected}
        onChange={(newValue) => pathwaysHelpers.setValue(newValue)}
      />
    </div>
  );
};
