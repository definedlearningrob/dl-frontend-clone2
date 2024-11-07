import { MultiValue } from 'react-select';
import { useField } from 'formik';
import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash-es';

import { useClusters } from '@dc/graphql/shared/hooks/useClusters';
import { TClustersData } from '@dc/graphql/shared/queries/clusters';

import { SelectOption } from '@shared/components/Select';
import { TreeSelect } from '@shared/components/TreeSelect/TreeSelect';

const getOptions = (clusters: TClustersData['clusters']) => {
  if (isEmpty(clusters)) {
    return [];
  }

  return clusters.map((cluster) => ({
    value: cluster.name,
    label: cluster.name,
    children: cluster.pathways.map((pathway) => ({
      value: pathway.id,
      label: pathway.name,
      children: [],
    })),
  }));
};

export const ClustersSelect = () => {
  const { t } = useTranslation();
  const { data } = useClusters();
  const [pathwaysField, meta, helpers] = useField('pathways');
  const errorMessage = meta.error && meta.touched ? meta.error : undefined;
  const { value } = pathwaysField;

  if (!data) {
    return null;
  }

  const handleChangePathway = (newValue: MultiValue<SelectOption>) => {
    helpers.setValue(newValue);
  };

  return (
    <TreeSelect
      errorMessage={errorMessage}
      isRequired={true}
      isRootSelectable={false}
      label={t('user.opportunities.form.clusterAndPathway')}
      limitedWidth={true}
      name='pathways'
      options={getOptions(data.clusters)}
      placeholder={t('user.opportunities.form.selectClusterAndPathway')}
      value={value}
      onChange={handleChangePathway}
    />
  );
};
