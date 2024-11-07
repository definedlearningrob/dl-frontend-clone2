import { gql } from '@apollo/client';

export default gql`
  query TeacherDashboardPlans($userUuid: ID!) {
    teacherDashboard(userUuid: $userUuid) {
      userId
      plans {
        id
        name
      }
    }
  }
`;

export type TPlan = {
  id: string;
  name: string;
};

export type TTeacherDashboard = {
  userId: string;
  plans: TPlan[];
};

export type TTeacherDashboardPlansData = {
  teacherDashboard: TTeacherDashboard;
};

export type TTeacherDashboardPlansVariables = {
  userUuid: string;
};
