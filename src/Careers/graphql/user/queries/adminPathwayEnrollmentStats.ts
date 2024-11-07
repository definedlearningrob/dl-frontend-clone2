import { gql } from '@apollo/client';

export default gql`
  query AdminPathwayEnrollmentStats($uuid: ID!, $startYear: Int!) {
    adminDashboard {
      entity(uuid: $uuid) {
        pathwayEnrollmentStats(startYear: $startYear) {
          pathway {
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

export type TAdminPathwayEnrollmentStatsVariables = {
  uuid: string;
  startYear: number;
};

export type TAdminPathwayEnrollmentStatsData = {
  adminDashboard: TAdminDashboard;
};

export type TAdminDashboard = {
  entity: TEntity;
  userId: string;
};

export type TEntity = {
  pathwayEnrollmentStats: TPathwayEnrollmentStats[];
  uuid: string;
};

export type TPathwayEnrollmentStats = {
  pathway: {
    id: string;
    name: string;
  };
  studentsCount: number;
};
