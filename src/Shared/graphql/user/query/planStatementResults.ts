import { TypedDocumentNode, gql } from '@apollo/client';

import {
  EVALUATION_RESULTS_VALUES,
  PLAN_GROUP_STATEMENT_RESULT_SORT,
  SORT_ORDER,
} from '@shared/resources/enums';

export const PLAN_STATEMENT_RESULTS: TypedDocumentNode<
  TPlanStatementResultsData,
  TPlanStatementResultsVariables
> = gql`
  query PlanStatementResults(
    $filter: PlanReportFilter!
    $statementId: ID!
    $statementFilter: PlanGroupStatementResultFilter
    $sort: PlanGroupStatementResultSortAttributes
    $page: Int
    $perPage: Int
  ) {
    reports {
      planReport(filter: $filter) {
        statementResults(
          statementId: $statementId
          filter: $statementFilter
          sort: $sort
          page: $page
          perPage: $perPage
        ) {
          nodes {
            answer
            evidencesCount
            lastUpdatedAt
            status
            studentName
            studentSisId
          }
          nodesCount
          pagesCount
        }
      }
    }
  }
`;

export type TPlanStatementResultsVariables = {
  filter: {
    planId: string;
    entityUuids?: string[];
    schoolYear?: number;
    gradeLevels?: string[];
    userUuids?: string[];
  };
  statementId: string;
  statementFilter?: {
    fullNameOrSisIdCont?: string;
    resultEq?: EVALUATION_RESULTS_VALUES | null;
  };
  sort?: {
    column: PLAN_GROUP_STATEMENT_RESULT_SORT;
    order: SORT_ORDER;
  };
  page?: number;
  perPage?: number;
};

export type StatementResult = {
  answer: string[] | null;
  evidencesCount: number;
  lastUpdatedAt: string;
  status: EVALUATION_RESULTS_VALUES;
  studentName: string;
  studentSisId: string | null;
};

export type StatementResults = {
  nodes: StatementResult[];
  nodesCount: number;
  pagesCount: number;
};

export type TPlanStatementResultsData = {
  reports: {
    planReport: {
      statementResults: StatementResults;
    };
  };
};
