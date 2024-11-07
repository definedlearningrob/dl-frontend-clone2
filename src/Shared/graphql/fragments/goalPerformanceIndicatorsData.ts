import { gql } from '@apollo/client';

import { SERVICE_NAME } from '@shared/resources/enums';

export const GOAL_PERFORMANCE_INDICATORS_DATA_FRAGMENT = gql`
  fragment GoalPerformanceIndicatorsData on GoalPerformanceData {
    averageScore
    tag {
      name
    }
    results {
      contextName
      gradedAt
      origin
      rubricName
      scoreEarned
    }
  }
`;

export type TPerformanceIndicatorsData = {
  averageScore: number;
  tag: {
    name: string;
  };
  results: TPerformanceIndicatorsResult[];
}[];

export type TPerformanceIndicatorsResult = {
  contextName: string;
  gradedAt: string;
  origin: SERVICE_NAME;
  rubricName: string;
  scoreEarned: number;
};
