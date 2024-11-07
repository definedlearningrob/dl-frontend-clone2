import { useQuery } from '@apollo/client';

import CLUSTERS, { TClustersData } from '../queries/clusters';

export const useClusters = () => useQuery<TClustersData>(CLUSTERS);
