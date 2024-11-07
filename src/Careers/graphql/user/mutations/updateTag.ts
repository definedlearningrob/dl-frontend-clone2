import { gql, TypedDocumentNode } from '@apollo/client';

import { TTag } from '@dc/graphql/user/queries/tag';
import { TTagInput } from '@dc/graphql/user/mutations/createTag';

export const UPDATE_TAG: TypedDocumentNode<TUpdateTagData, TUpdateTagVariables> = gql`
  mutation UpdateTag($input: UpdateTagMutationInput!) {
    updateTag(input: $input) {
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

export type TUpdateTagVariables = {
  input: TTagInput;
};

export type TUpdateTagData = {
  updateTag: {
    tag: TTag[];
  };
};
