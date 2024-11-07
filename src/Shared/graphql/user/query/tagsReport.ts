import { TypedDocumentNode, gql } from '@apollo/client';

import { AGGREGATION_PERIOD } from '@shared/resources/enums';

export const TAG_SUMMARY: TypedDocumentNode<TTagSummaryData, TTagSummaryVariables> = gql`
  query TagReport($summaryFilter: TagReportSummaryFilter!) {
    reports {
      tagReport {
        tagSummary(filter: $summaryFilter) {
          tag {
            id
            name
          }
          studentsCount
          cumulativeAverageScore
          aggregationPeriods {
            averageScore
            period
            periodEnd
            periodStart
            studentsCount
          }
        }
      }
    }
  }
`;

export type TTagSummaryVariables = {
  summaryFilter: {
    tagId: string;
    aggregationPeriod: AGGREGATION_PERIOD;
    entityUuids?: string[];
    schoolYear?: number;
    gradeLevels?: string[];
    userUuids?: string[];
  };
};

type TTag = {
  id: string;
  name: string;
};

export type TTagSummary = {
  tag: TTag;
  studentsCount: number;
  cumulativeAverageScore: number;
  aggregationPeriods: {
    averageScore: number;
    period: number;
    periodEnd: string;
    periodStart: string;
    studentsCount: number;
  }[];
};

type TTagSummaryData = {
  reports: {
    tagReport: {
      tagSummary: TTagSummary;
    };
  };
};
