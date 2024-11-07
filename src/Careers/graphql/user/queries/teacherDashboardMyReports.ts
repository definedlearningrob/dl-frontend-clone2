import { gql } from '@apollo/client';

export default gql`
  query TeacherDashboardMyReports($userUuid: ID, $startYear: Int!) {
    teacherDashboard(userUuid: $userUuid) {
      myReports {
        assessmentsFinished(startYear: $startYear)
        assignmentsSubmitted(startYear: $startYear)
        coursesEnrolled(startYear: $startYear)
        coursesFinished(startYear: $startYear)
      }
      userId
    }
  }
`;

export type TTeacherDashboardMyReportsVariables = {
  userUuid: string;
  startYear: number;
};

export type TTeacherDashboardMyReportsData = {
  teacherDashboard: TTeacherDashboard;
};

export type TTeacherDashboard = {
  myReports: TMyReports;
  userId: string;
};

export type TMyReports = {
  assessmentsFinished: number;
  assignmentsSubmitted: number;
  coursesEnrolled: number;
  coursesFinished: number;
};
