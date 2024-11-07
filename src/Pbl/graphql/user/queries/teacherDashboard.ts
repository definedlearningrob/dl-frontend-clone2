import { gql, TypedDocumentNode } from '@apollo/client';

import { ACTIVITY_TYPE } from '@shared/resources/enums';

export const TEACHER_DASHBOARD: TypedDocumentNode<
  TTeacherDashboardData,
  TTeacherDashboardVariables
> = gql`
  query TeacherDashBoard($userUuid: ID, $after: String, $before: String, $first: Int, $last: Int) {
    teacherDashboard(userUuid: $userUuid) {
      userId
      teacherName
      schoolClasses {
        currentTasksCount
        entityName
        isDemo
        schoolClassName
        schoolClassUuid
        studentsCount
      }
      activityLog(after: $after, before: $before, first: $first, last: $last) {
        edges {
          cursor
          node {
            updatedAt
            type
            context {
              id
              name
            }
            schoolClass {
              name
              uuid
            }
            target {
              name
            }
            team {
              name
              uuid
            }
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`;

export type TTeacherDashboardData = {
  teacherDashboard: {
    userId: string;
    schoolClasses: TTeacherSchoolClass[];
    teacherName: string;
    activityLog: TTeacherActivityLog;
  };
};

export type TTeacherActivityLog = {
  edges: TActivityLogEdges[];
  pageInfo: TActivityLogPageInfo;
};

export type TTeacherDashboardVariables = {
  userUuid?: string;
  after?: string;
  before?: string;
  first?: number;
  last?: number;
};

export type TTeacherSchoolClass = {
  currentTasksCount: number;
  entityName: string;
  isDemo: boolean;
  schoolClassName: string;
  schoolClassUuid: string;
  studentsCount: number;
};

export type TActivityLogPageInfo = {
  endCursor: string;
  hasNextPage: boolean;
};

type TActivityLogEdges = {
  cursor: string;
  node: {
    updatedAt: string;
    context: {
      id: string;
      name: string;
    };
    schoolClass: {
      name: string;
      uuid: string;
    };
    target: {
      id: string;
      name: string;
    };
    team: {
      name: string;
      uuid: string;
    };
    type: ACTIVITY_TYPE;
  };
};
