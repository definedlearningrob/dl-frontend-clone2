import { gql, TypedDocumentNode } from '@apollo/client';

import { TEntity } from '@dc/graphql/user/queries/entity';

export const SET_ENTITY_TAGS: TypedDocumentNode<TSetEntityTagsData, TSetEntityTagsVariables> = gql`
  mutation setEntityTags($input: SetEntityTagsMutationInput!) {
    setEntityTags(input: $input) {
      entity {
        uuid
        tags {
          id
        }
        children {
          nodes {
            uuid
            tags {
              id
            }
          }
        }
      }
    }
  }
`;

export type TSetEntityTagsData = {
  entity: TEntity;
};

export type TSetEntityTagsVariables = {
  input: {
    applyToHierarchy: boolean;
    entityUuid: string;
    tagIds: string[];
  };
};
