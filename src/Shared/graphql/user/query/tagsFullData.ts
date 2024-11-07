import { gql, TypedDocumentNode } from '@apollo/client';

import { TTag } from '@dc/graphql/user/queries/tag';

import { SERVICE_NAME, SORT_ORDER, TAG_REPORT_RESULT_SORT } from '@shared/resources/enums';

export const TAGS_FULL_DATA: TypedDocumentNode<TTagsFullData, TTagsFullDataVariables> = gql`
  query PerformanceIndicatorsFullData(
    $filter: TagReportResultsFilter!
    $sort: TagReportResultsSortAttributes
    $page: Int
    $perPage: Int
  ) {
    reports {
      tagReport {
        studentsCount
        tagsResults(filter: $filter, sort: $sort, page: $page, perPage: $perPage) {
          nodesCount
          pagesCount
          nodes {
            contextName
            gradedAt
            platform
            rubricName
            scoreEarned
            scoreMaximum
            sourceName
            studentSisId
            studentFullName
            tags {
              id
              hasEntities
              type
              name
            }
          }
        }
      }
    }
  }
`;

export type TTagsFullDataVariables = {
  filter: {
    entityUuids?: string[];
    gradeLevels?: string[];
    userUuids?: string[];
    resultsFilter?: { fullNameOrSisIdCont?: string; tagIdIn?: string[] | null };
    schoolYear?: number;
    tagIds: string[] | null;
  };
  sort?: {
    column: TAG_REPORT_RESULT_SORT;
    order: SORT_ORDER;
  };
  page: number;
  perPage: number;
};

export type TTagReport = {
  studentsCount: number;
  tagsResults: {
    nodesCount: number;
    pagesCount: number;
    nodes: TTagResult[];
  };
};

export type TTagResult = {
  contextName: string;
  gradedAt: string;
  platform: SERVICE_NAME;
  rubricName: string;
  scoreEarned: number;
  scoreMaximum: number;
  sourceName: string;
  studentSisId: string | null;
  studentFullName: string;
  tags: TTag[];
};

export type TTagsFullData = {
  reports: {
    tagReport: TTagReport;
  };
};
