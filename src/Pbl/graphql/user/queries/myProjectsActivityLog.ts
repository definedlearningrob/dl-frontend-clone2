import { gql } from '@apollo/client';

import { ACTIVITY_TYPE } from '@shared/resources/enums';

export default gql`
  query MyProjectsActivityLog($after: String, $before: String, $first: Int, $last: Int) {
    myProjectsActivityLog: myTasksActivityLog(
      after: $after
      before: $before
      first: $first
      last: $last
    ) {
      edges {
        cursor
        node {
          updatedAt
          context {
            id
            name
          }
          student {
            firstName
            lastName
            uuid
          }
          team {
            name
            uuid
          }
          type
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

export type TMyProjectsActivityData = {
  myProjectsActivityLog: TMyProjectsActivityActivity;
};

export type TMyProjectsActivityActivity = {
  edges: Array<{
    cursor: string;
    node: {
      updatedAt: string;
      context: {
        id: string;
        name: string;
      };
      student: {
        name: string;
        uuid: string;
      };
      team: {
        name: string;
        uuid: string;
      };
      target: {
        id: string;
        name: string;
      };
      type: ACTIVITY_TYPE;
    };
  }>;
  pageInfo: {
    endCursor: string;
    hasNextPage: boolean;
  };
};

export type TMyProjectsActivityVariables = {
  after?: string;
  before?: string;
  first?: number;
  last?: number;
};
