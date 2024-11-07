import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUpdateEffect } from 'react-use';

import { TClustersData } from '@dc/graphql/shared/queries/clusters';

import { SelectOption } from '@shared/components/Select';

import { getPathwayName } from '../helpers';

import { OpportunityClustersListItem } from './OpportunityClustersListItem';

type Props = {
  clusters: TClustersData['clusters'];
  pathwayIdIn: string[];
  value: string;
  onChange: (newValue: SelectOption[]) => void;
};

type Cluster = TClustersData['clusters'][number];
type Pathway = Cluster['pathways'][number];

// Most of it is copied from src/Careers/components/Student/Courses/AllListHeader/PanelFilter/PanelFilter.jsx
// Should be refactored I guess but since it works and was already painful enough
// maybe can be revisited
export function OpportunityClustersList({
  clusters: incomingClusters,
  pathwayIdIn,
  onChange,
  value,
}: Props) {
  const [checkedPathwayIds, setCheckedPathwayIds] = useState(pathwayIdIn || []);
  const { t } = useTranslation();

  const getPathwayLabel = (id: string) => {
    if (checkedPathwayIds.length > 1) {
      return t('components.select.selected', { selected: checkedPathwayIds.length });
    }

    return getPathwayName(id, clusters);
  };

  useUpdateEffect(() => {
    onChange(
      checkedPathwayIds.map((id) => ({
        value: id,
        label: getPathwayLabel(id),
      }))
    );
  }, [checkedPathwayIds]);

  const clusters = incomingClusters.filter(
    (cluster) =>
      cluster.name.toLowerCase().includes(value.toLowerCase()) ||
      cluster.pathways.some((pathway) => pathway.name.toLowerCase().includes(value.toLowerCase()))
  );

  const someOfClusterPathwaysSelected = (cluster: Cluster) => {
    const clusterPathwayIds = cluster.pathways.map(({ id }) => id);
    const selectedPathawyIdsFromCluster = checkedPathwayIds.filter((id) =>
      clusterPathwayIds.includes(id)
    );
    const allIdsSelected = selectedPathawyIdsFromCluster.length === clusterPathwayIds.length;

    return !allIdsSelected && !!selectedPathawyIdsFromCluster.length;
  };

  const [expandedClusterIds, setExpandedClusterIds] = useState(() =>
    clusters.filter((cluster) => someOfClusterPathwaysSelected(cluster)).map(({ id }) => id)
  );
  const toggleClusterExpand = (cluster: Cluster) => () => {
    const alreadyExpanded = expandedClusterIds.includes(cluster.id);

    const newExpandedClusterIds = alreadyExpanded
      ? [...expandedClusterIds.filter((id) => id !== cluster.id)]
      : [...expandedClusterIds, cluster.id];

    setExpandedClusterIds(newExpandedClusterIds);
  };

  const checkClusterChecked = (cluster: Cluster) => {
    const clusterPathwayIds = cluster.pathways.map(({ id }) => id);
    const checkedPathwaysOfClusterIds = checkedPathwayIds.filter((id) =>
      clusterPathwayIds.includes(id)
    );

    return clusterPathwayIds.length === checkedPathwaysOfClusterIds.length;
  };

  const checkPathwayChecked = (pathway: Pathway) => checkedPathwayIds.includes(pathway.id);

  const toggleClusterCheck = (cluster: Cluster) => () => {
    const isClusterChecked = checkClusterChecked(cluster);
    const clusterPathwayIds = cluster.pathways.map(({ id }) => id);
    const withoutClusterPathwayIds = checkedPathwayIds.filter(
      (id) => !clusterPathwayIds.includes(id)
    );
    const newCheckedPathwayIds = isClusterChecked
      ? withoutClusterPathwayIds
      : [...withoutClusterPathwayIds, ...clusterPathwayIds];

    setCheckedPathwayIds(newCheckedPathwayIds);
  };

  const togglePathwayCheck = (pathway: Pathway) => () => {
    const isPathwayChecked = checkPathwayChecked(pathway);
    const newCheckedPathwayIds = isPathwayChecked
      ? checkedPathwayIds.filter((id) => id !== pathway.id)
      : [...checkedPathwayIds, pathway.id];

    setCheckedPathwayIds(newCheckedPathwayIds);
  };

  const checkClusterExpanded = (cluster: Cluster) => expandedClusterIds.includes(cluster.id);

  return (
    <ul className='student-courses__panel-filter__list'>
      {clusters.map((cluster) => {
        const isClusterChecked = checkClusterChecked(cluster);
        const isClusterExpand = checkClusterExpanded(cluster);
        const clusterHasSelectedPathway = someOfClusterPathwaysSelected(cluster);

        return (
          <OpportunityClustersListItem
            key={cluster.id}
            checkPathwayChecked={checkPathwayChecked}
            cluster={cluster}
            clusterHasSelectedPathway={clusterHasSelectedPathway}
            isClusterChecked={isClusterChecked}
            isClusterExpand={isClusterExpand}
            toggleClusterCheck={toggleClusterCheck}
            toggleClusterExpand={toggleClusterExpand}
            togglePathwayCheck={togglePathwayCheck}
          />
        );
      })}
    </ul>
  );
}
