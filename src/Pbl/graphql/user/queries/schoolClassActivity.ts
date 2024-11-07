import { gql } from '@apollo/client';

import { TSchoolClassesActivity } from './schoolClassesActivity';

export default gql`
  query SchoolClassActivity($uuid: ID!, $after: String, $before: String, $first: Int, $last: Int) {
    schoolClass(uuid: $uuid) {
      activityLog(after: $after, before: $before, first: $first, last: $last) {
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
      uuid
    }
  }
`;

export type TSchoolClassActivityData = {
  schoolClass: TSchoolClass;
};

export type TSchoolClassActivityVariables = {
  uuid: string;
  after?: string;
  before?: string;
  first?: number;
  last?: number;
};

type TSchoolClass = {
  uuid: string;
  activityLog: TSchoolClassesActivity;
};
