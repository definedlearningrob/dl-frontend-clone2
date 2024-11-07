import { gql } from '@apollo/client';

import { ACTIVITY_TYPE } from '@shared/resources/enums';

export default gql`
  query SchoolClassesActivityLog($after: String, $before: String, $first: Int, $last: Int) {
    schoolClassActivityLog(after: $after, before: $before, first: $first, last: $last) {
      edges {
        cursor
        node {
          updatedAt
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

export type TSchoolClassesData = {
  schoolClassActivityLog: TSchoolClassesActivity;
};

export type TSchoolClassesActivity = {
  edges: Array<{
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
  }>;
  pageInfo: {
    endCursor: string;
    hasNextPage: boolean;
  };
};

export type TSchoolClassesVariables = {
  after?: string;
  before?: string;
  first?: number;
  last?: number;
};
