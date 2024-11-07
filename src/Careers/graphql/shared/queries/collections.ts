import { gql, TypedDocumentNode } from '@apollo/client';

import { TCollection } from '@dc/resources/types';

export const COLLECTIONS_QUERY: TypedDocumentNode<TCollectionsData> = gql`
  query Collections {
    collections {
      id
      name
    }
  }
`;

export type TCollectionsData = {
  collections: TCollection[];
};
