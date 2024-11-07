import { useQuery } from '@apollo/client';

import { TEACHER_DASHBOARD } from '@pbl/graphql/user/queries/teacherDashboard';

type Props = {
  userUuid?: string;
  initialActivities?: number;
};

export const useTeacherDashboard = ({ userUuid, initialActivities = 15 }: Props = {}) =>
  useQuery(TEACHER_DASHBOARD, {
    variables: {
      userUuid,
      first: initialActivities,
    },
  });
