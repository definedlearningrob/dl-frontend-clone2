import { gql } from '@apollo/client';

export default gql`
  query AdminClusterEnrollmentStats($uuid: ID!, $startYear: Int!) {
    adminDashboard {
      entity(uuid: $uuid) {
        clusterEnrollmentStats(startYear: $startYear) {
          cluster {
            id
            name
          }
          studentsCount
        }
        uuid
      }
      userId
    }
  }
`;

export type TAdminClusterEnrollmentStatsVariables = {
  uuid: string;
  startYear: number;
};

export type AdminClusterEnrollmentStatsData = {
  adminDashboard: TAdminDashboard;
};

export type TAdminDashboard = {
  entity: TEntity;
  userId: string;
};

export type TEntity = {
  clusterEnrollmentStats: TClusterEnrollmentStats[];
  uuid: string;
};

export type TClusterEnrollmentStats = {
  cluster: {
    id: string;
    name: string;
  };
  studentsCount: number;
};
