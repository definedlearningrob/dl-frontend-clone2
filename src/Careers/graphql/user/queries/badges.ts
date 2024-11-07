import { gql, TypedDocumentNode } from '@apollo/client';

import { TBadge } from '@dc/graphql/user/mutations/createBadge';

export const BADGES: TypedDocumentNode<TBadgesData, TBadgeVariables> = gql`
  query Badges($scope: ArchivableStatus, $filter: BadgeFilter, $page: Int, $perPage: Int) {
    badges(scope: $scope, filter: $filter, page: $page, perPage: $perPage) {
      nodesCount
      pagesCount
      nodes {
        archivedAt
        description
        name
        imageUrl
        id
      }
    }
  }
`;

export type TBadgeVariables = {
  scope?: string;
  filter?: { nameCont?: string };
  page?: number;
  perPage?: number;
};

export type TBadgesData = {
  badges: TBadges;
};

export type TBadges = {
  nodesCount: number;
  pagesCount: number;
  nodes: TBadge[];
};
