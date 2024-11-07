import { gql } from '@apollo/client';

export default gql`
  query TeacherPathwayEnrollmentStats($userUuid: ID, $startYear: Int!) {
    teacherDashboard(userUuid: $userUuid) {
      pathwayEnrollmentStats(startYear: $startYear) {
        pathway {
          id
          name
        }
        studentsCount
      }
      userId
    }
  }
`;

export type TTeacherPathwayEnrollmentStatsVariables = {
  userUuid: string;
  startYear: number;
};

export type TTeacherPathwayEnrollmentStatsData = {
  teacherDashboard: TTeacherDashboard;
};

export type TTeacherDashboard = {
  pathwayEnrollmentStats: TPathwayEnrollmentStats[];
  userId: string;
};

export type TPathwayEnrollmentStats = {
  pathway: {
    id: string;
    name: string;
  };
  studentsCount: number;
};
