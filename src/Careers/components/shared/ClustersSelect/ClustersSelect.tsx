import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { GroupBase } from 'react-select';

import { useClusters } from '@dc/graphql/shared/hooks/useClusters';

import { TreeSelect, TreeSelectOption } from '@shared/components/TreeSelect/TreeSelect';
import { SelectProps } from '@shared/components/Select';

export const ClustersSelect = (
  props: SelectProps<TreeSelectOption, true, GroupBase<TreeSelectOption>>
) => {
  const { t } = useTranslation();
  const { data } = useClusters();

  const clusterOptions = useMemo(() => {
    if (!data) {
      return [];
    }

    return data.clusters.map((cluster) => ({
      value: `${cluster.id}-cluster`,
      label: cluster.name,
      children: cluster.pathways.map((pathway) => ({
        value: pathway.id,
        label: pathway.name,
        children: [],
      })),
    }));
  }, [data]);

  return (
    <TreeSelect
      data-testid='clusters-select'
      isRootSelectable={false}
      label={t('courses.filters.clusterAndPathway')}
      name='clusterAndPathway'
      options={clusterOptions}
      placeholder={t('common.actions.showAll')}
      selectClassName='!mb-0'
      showError={false}
      {...props}
    />
  );
};
