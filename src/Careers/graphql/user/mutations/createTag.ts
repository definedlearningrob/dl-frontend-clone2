import { gql, TypedDocumentNode } from '@apollo/client';

import { TagTypes } from '@dc/resources/enums';
import { TTag } from '@dc/graphql/user/queries/tag';

export const CREATE_TAG: TypedDocumentNode<TCreateTagData, TCreateTagVariables> = gql`
  mutation CreateTag($input: CreateTagMutationInput!) {
    createTag(input: $input) {
      tag {
        hasRubricHeadings
        id
        name
        rubricHeadings {
          nodes {
            id
            name
            multiplier
          }
        }
        type
      }
    }
  }
`;

export type TTagInput = {
  id?: string;
  name: string;
  type?: TagTypes;
  isDefault?: boolean;
};

export type TCreateTagVariables = {
  input: TTagInput;
};

export type TCreateTagData = {
  createTag: {
    tag: TTag;
  };
};
