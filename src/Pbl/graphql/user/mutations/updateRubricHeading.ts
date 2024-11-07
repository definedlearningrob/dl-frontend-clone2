import { TypedDocumentNode, gql } from '@apollo/client';

export const UPDATE_RUBRIC_HEADING_DL: TypedDocumentNode<
  UpdateRubricHeadingDLData,
  UpdateRubricHeadingVariables
> = gql`
  mutation DlUpdateRubricHeading($input: UpdateRubricHeadingMutationInput!) {
    updateRubricHeading(input: $input) {
      rubricHeading {
        id
        multiplier
        name
      }
    }
  }
`;

export type UpdateRubricHeadingMutationInput = {
  id: string;
  name: string;
  multiplier: number;
};

export type UpdateRubricHeadingVariables = {
  input: UpdateRubricHeadingMutationInput;
};

export type UpdateRubricHeadingDLData = {
  updateRubricHeading: {
    rubricHeading: {
      id: string;
      multiplier: number;
      name: string;
    };
  };
};
