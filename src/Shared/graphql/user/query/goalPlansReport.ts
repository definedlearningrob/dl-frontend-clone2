import { TypedDocumentNode, gql } from '@apollo/client';

export const GOAL_PLANS_REPORT: TypedDocumentNode<TGoalPlansData, TGoalPlansVariables> = gql`
  query GoalPlanReport($id: ID!) {
    goalsPlanReport(id: $id) {
      id
      url(options: { responseContentDisposition: "attachment" })
      uploadStatus
    }
  }
`;

export type TGoalPlansData = {
  goalsPlanReport: {
    id: string;
    url: string;
    uploadStatus: string;
  };
};

export type TGoalPlansVariables = {
  id: string;
};
