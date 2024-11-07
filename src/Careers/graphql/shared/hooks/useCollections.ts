import { QueryHookOptions, useQuery } from '@apollo/client';

import { COLLECTIONS_QUERY, TCollectionsData } from '@dc/graphql/shared/queries/collections';

export const useCollections = (options?: QueryHookOptions<TCollectionsData>) =>
  useQuery(COLLECTIONS_QUERY, options);
