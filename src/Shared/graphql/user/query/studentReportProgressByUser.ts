import { gql, TypedDocumentNode } from '@apollo/client';

import {
  TStudentReportProgressByStudentVariables,
  TStudentReportProgressData,
} from '@shared/graphql/student/query/studentReportProgressByStudent';
import { PLAN_IN_STUDENT_REPORT_FRAGMENT } from '@shared/graphql/fragments/planInStudentReport';
import { GOAL_PERFORMANCE_INDICATORS_DATA_FRAGMENT } from '@shared/graphql/fragments/goalPerformanceIndicatorsData';

export const STUDENT_REPORT_PROGRESS_BY_USER: TypedDocumentNode<
  TStudentReportProgressData,
  TStudentReportProgressByStudentVariables
> = gql`
  ${PLAN_IN_STUDENT_REPORT_FRAGMENT}
  ${GOAL_PERFORMANCE_INDICATORS_DATA_FRAGMENT}
  query StudentReportByUser($planId: ID!, $studentUuid: ID!) {
    studentReport(planId: $planId, studentUuid: $studentUuid) {
      overallData {
        completed
        inProgress
        notStarted
        studentFullName
        planName
        notMet
      }
      plan {
        ...PlanForStudentReport
      }
      goalPerformanceIndicatorsData {
        ...GoalPerformanceIndicatorsData
      }
    }
  }
`;
