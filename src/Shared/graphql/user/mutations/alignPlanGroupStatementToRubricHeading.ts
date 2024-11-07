import { gql, TypedDocumentNode } from '@apollo/client';

import { TRubricHeading } from '@dc/graphql/user/queries/rubric';

export const ALIGN_PLAN_GROUP_STATEMENT_TO_RUBRIC_HEADING: TypedDocumentNode<
  TAlignPlanData,
  TAlignPlanVariables
> = gql`
  mutation alignPlanGroupStatementToRubricHeading(
    $input: AlignPlanGroupStatementToRubricHeadingMutationInput!
    $rubricHeadingId: ID!
  ) {
    alignPlanGroupStatementToRubricHeading(input: $input) {
      rubricHeading {
        id
        name
        plans {
          id
          name
        }
        uuid
        rubric {
          id
          displayName
          headings {
            plans {
              id
              name
              groups {
                statements {
                  id
                  name
                  isAligned(rubricHeadingId: $rubricHeadingId)
                }
              }
            }
          }
        }
      }
    }
  }
`;

export type TAlignPlanData = {
  alignPlanGroupStatementToRubricHeading: {
    rubricHeading: {
      id: string;
      name: string;
      plans: {
        id: string;
        name: string;
      }[];
      rubric: { id: string; uuid: string; name: string; headings: TRubricHeading[] };
    };
  };
};

export type TAlignPlanVariables = {
  input: {
    planGroupStatementIds: string[];
    rubricHeadingId: string;
  };
  rubricHeadingId: string;
};
