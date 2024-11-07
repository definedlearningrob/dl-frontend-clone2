import { gql } from '@apollo/client';
import { TypedDocumentNode } from '@apollo/client';

export const ENTITIES_WITH_CHILDREN: TypedDocumentNode<
  EntitiesWithChildrenData,
  EntityWithChildrenVariables
> = gql`
  query EntitiesWithChildren($page: Int, $perPage: Int, $filter: EntityFilter) {
    entities(page: $page, perPage: $perPage, filter: $filter) {
      pagesCount
      nodesCount
      nodes {
        uuid
        name
        children(page: 1, perPage: 1000) {
          nodes {
            uuid
            name
            children(page: 1, perPage: 1000) {
              nodes {
                uuid
                name
                children(page: 1, perPage: 1000) {
                  nodes {
                    uuid
                    name
                    children(page: 1, perPage: 1000) {
                      nodes {
                        uuid
                        name
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export type EntityNode = {
  uuid: string;
  name: string;
  children: {
    nodes: EntityNode[];
  };
};

export type EntitiesWithChildrenData = {
  entities: {
    pagesCount: number;
    nodesCount: number;
    nodes: EntityNode[];
  };
};

type EntityWithChildrenVariables = {
  page?: number;
  perPage?: number;
  infiniteScroll?: boolean;
  filter?: {
    nameCont: string;
  };
};
