import { gql, TypedDocumentNode } from '@apollo/client';

import { TBadge } from '@dc/graphql/user/mutations/createBadge';

export const BADGE: TypedDocumentNode<TBadgeData, TBadgeVariables> = gql`
  query Badge($id: ID!) {
    badge(id: $id) {
      archivedAt
      id
      imageUrl
      thumbnailUrl
      description
      name
    }
  }
`;

export type TBadgeVariables = {
  id: string;
};

export type TBadgeData = {
  badge: TBadge;
};
