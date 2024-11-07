import { gql } from '@apollo/client';

import { ACTIVITY_TYPE } from '@shared/resources/enums';

export default gql`
  query TeacherDashboardActivityLog($userUuid: ID, $first: Int, $after: String) {
    teacherDashboard(userUuid: $userUuid) {
      activityLog(first: $first, after: $after) {
        edges {
          cursor
          node {
            activity
            context {
              id
              name
            }
            updatedAt
            student {
              uuid
              firstName
              lastName
            }
            target {
              id
              name
            }
            type
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
      userId
    }
  }
`;

export type TTeacherActivityData = {
  teacherDashboard: {
    activityLog: {
      edges: {
        cursor: string;
        node: {
          activity: string;
          context: {
            id: string;
            name: string;
          } | null;
          updatedAt: string;
          student: {
            firstName: string;
            lastName: string;
            uuid: string;
          };
          target: {
            id: string;
            name: string;
          };
          type: ACTIVITY_TYPE;
        };
      }[];
      pageInfo: {
        endCursor: string;
        hasNextPage: boolean;
      };
    };
  };
};

export type TTeacherActivityVariables = {
  after?: string;
  first?: number;
  userUuid?: string;
};
