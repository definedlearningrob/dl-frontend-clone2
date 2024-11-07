import { gql } from '@apollo/client';

export default gql`
  query AdminDashboardMyReports($uuid: ID!, $startYear: Int!) {
    adminDashboard {
      entity(uuid: $uuid) {
        myReports {
          assessmentsFinished(startYear: $startYear)
          assignmentsSubmitted(startYear: $startYear)
          coursesEnrolled(startYear: $startYear)
          coursesFinished(startYear: $startYear)
        }
        uuid
      }
      userId
    }
  }
`;

export type TAdminDashboardMyReportsVariables = {
  uuid: string;
  startYear: number;
};

export type TAdminDashboardMyReportsData = {
  adminDashboard: TAdminDashboard;
};

export type TAdminDashboard = {
  entity: TEntity;
  userId: string;
};

export type TEntity = {
  myReports: TMyReports;
  uuid: string;
};

export type TMyReports = {
  assessmentsFinished: number;
  assignmentsSubmitted: number;
  coursesEnrolled: number;
  coursesFinished: number;
};
