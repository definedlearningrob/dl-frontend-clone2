import { gql } from '@apollo/client';

export default gql`
  query TeacherClusterEnrollmentStats($userUuid: ID, $startYear: Int!) {
    teacherDashboard(userUuid: $userUuid) {
      clusterEnrollmentStats(startYear: $startYear) {
        cluster {
          id
          name
        }
        studentsCount
      }
      userId
    }
  }
`;

export type TTeacherClusterEnrollmentStatsVariables = {
  userUuid: string;
  startYear: number;
};

export type TTeacherClusterEnrollmentStatsData = {
  teacherDashboard: TTeacherDashboard;
};

export type TTeacherDashboard = {
  clusterEnrollmentStats: TClusterEnrollmentStats[];
  userId: string;
};

export type TClusterEnrollmentStats = {
  cluster: {
    id: string;
    name: string;
  };
  studentsCount: number;
};
