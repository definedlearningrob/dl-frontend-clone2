import { isEmpty } from 'lodash-es';
import { useTranslation } from 'react-i18next';
import { MultiValue } from 'react-select';
import { useState } from 'react';
import { useField } from 'formik';

import { TClustersData } from '@dc/graphql/shared/queries/clusters';
import { useClusters } from '@dc/graphql/shared/hooks/useClusters';
import { usePartnerCustomFilters } from '@dc/components/User/Partners/PartnerForm/usePartnerCoursesFilters';

import { TreeSelect } from '@shared/components/TreeSelect/TreeSelect';

type FilterOption = { value: string; label: string };

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

type Props = {
  filterType: 'pathwayIdIn' | 'pathwaysIdIn';
  isSystemAdmin: boolean;
};

export const PartnerClusterSelectFilter = ({ filterType, isSystemAdmin }: Props) => {
  const { t } = useTranslation();
  const { data } = useClusters();
  const { handleFilterChange } = usePartnerCustomFilters();
  const [pathways, setPathways] = useState<string[]>([]);
  const [entityField] = useField<string[]>('entityUuids');

  const handlePathwayChange = (cluster: MultiValue<FilterOption>) => {
    handleFilterChange(
      filterType,
      cluster.map((cluster) => cluster.value)
    );
    setPathways(cluster.map((cluster) => cluster.value));
  };

  if (!data) {
    return null;
  }
  const options = getOptions(data.clusters);

  return (
    <TreeSelect
      isDisabled={!isSystemAdmin && isEmpty(entityField.value)}
      isRootSelectable={false}
      label={t('user.opportunities.form.clusterAndPathway')}
      menuPortalTarget={document.body}
      name='pathwayIdIn'
      // @ts-ignore
      options={options}
      placeholder={t('user.opportunities.form.selectClusterAndPathway')}
      size='sm'
      value={options
        .flatMap((option) => option.children)
        .filter((option) => pathways.includes(option.value))}
      onChange={handlePathwayChange}
    />
  );
};
