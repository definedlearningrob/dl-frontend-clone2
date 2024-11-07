import { useQuery } from '@apollo/client';

import PATHWAYS, { TPathwaysData } from '@dc/graphql/user/queries/pathways';

export const usePathways = () => useQuery<TPathwaysData>(PATHWAYS);
