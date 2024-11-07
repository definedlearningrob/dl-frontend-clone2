import { TypedDocumentNode, gql } from '@apollo/client';

import { TTag } from '@dc/graphql/user/queries/tag';

export const UPDATE_RUBRIC_HEADING_DC: TypedDocumentNode<
  UpdateRubricHeadingDCData,
  UpdateRubricHeadingVariables
> = gql`
  mutation DcUpdateRubricHeading($input: UpdateRubricHeadingMutationInput!) {
    updateRubricHeading(input: $input) {
      rubricHeading {
        id
        multiplier
        name
        tags {
          id
        }
      }
    }
  }
`;

export type UpdateRubricHeadingMutationInput = {
  id: string;
  name: string;
  multiplier: number;
  tagIds?: string[];
};

export type UpdateRubricHeadingVariables = {
  input: UpdateRubricHeadingMutationInput;
};

export type UpdateRubricHeadingDCData = {
  updateRubricHeading: {
    rubricHeading: {
      id: string;
      multiplier: number;
      name: string;
      tags: Pick<TTag, 'id'>[];
    };
  };
};
