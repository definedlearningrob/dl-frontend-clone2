import { gql, TypedDocumentNode } from '@apollo/client';

import { TTag } from '@dc/graphql/user/queries/tag';

export const TAGS: TypedDocumentNode<TTagsData, TTagsVariables> = gql`
  query Tags($filter: TagFilter, $page: Int, $perPage: Int) {
    tags(filter: $filter, page: $page, perPage: $perPage) {
      nodes {
        name
        id
        type
        hasRubricHeadings
      }
      nodesCount
      pagesCount
    }
  }
`;

export type TTagsVariables = {
  filter?: { nameCont?: string; typeEq?: string };
  page?: number;
  perPage?: number;
  infiniteScroll?: boolean;
};

export type TTagsData = {
  tags: {
    nodes: TTag[];
    nodesCount: number;
    pagesCount: number;
  };
};
