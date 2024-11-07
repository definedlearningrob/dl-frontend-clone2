import { gql } from '@apollo/client';

export const RECENT_APPLICATIONS_QUERY = gql`
  query RecentApplications($after: String, $before: String, $first: Int, $last: Int) {
    recentApplications(after: $after, before: $before, first: $first, last: $last) {
      edges {
        cursor
        node {
          id
          updatedAt
          student {
            uuid
            fullName
          }
          opportunity {
            name
          }
          status
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export type TApplication = {
  id: string;
  updatedAt: string;
  student: {
    uuid: string;
    fullName: string;
  };
  opportunity: {
    name: string;
  };
  status: string;
};
export type ApplicationEdge = {
  cursor: string;
  node: TApplication;
};

export type TRecentApplications = {
  edges: ApplicationEdge[];
  pageInfo: {
    hasNextPage: boolean;
    endCursor: string;
  };
};

export type TRecentApplicationsData = {
  recentApplications: TRecentApplications;
};

export type TRecentApplicationsVariables = {
  after?: string;
  before?: string;
  first: number;
  last?: number;
};
