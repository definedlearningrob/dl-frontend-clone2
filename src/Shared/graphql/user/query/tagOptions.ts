import { TypedDocumentNode, gql } from '@apollo/client';

export const TAG_OPTIONS: TypedDocumentNode<TTagsData, TTagsVariables> = gql`
  query TagOptions($page: Int, $perPage: Int, $filter: TagFilter) {
    tags(page: $page, perPage: $perPage, filter: $filter) {
      nodesCount
      pagesCount
      nodes {
        id
        name
      }
    }
  }
`;

export type TTagsData = {
  tags: {
    nodesCount: number;
    pagesCount: number;
    nodes: {
      id: string;
      name: string;
    }[];
  };
};

export type TTagsVariables = {
  page: number;
  perPage: number;
  filter?: {
    nameCont: string;
  };
};
