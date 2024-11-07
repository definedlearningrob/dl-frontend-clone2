import { gql, TypedDocumentNode } from '@apollo/client';

import { TBadge } from '@dc/graphql/user/mutations/createBadge';

export const ARCHIVE_BADGE: TypedDocumentNode<TArchiveBadgeData, TArchiveBadgeVariables> = gql`
  mutation ArchiveBadge($input: ArchiveBadgeMutationInput!) {
    archiveBadge(input: $input) {
      badge {
        archivedAt
        id
        imageUrl
        name
      }
    }
  }
`;

export type TArchiveBadgeData = {
  archiveBadge: TBadge;
};

export type TArchiveBadgeVariables = {
  input: {
    id: string;
  };
};
