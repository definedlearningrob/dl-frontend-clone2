import { useQuery } from '@apollo/client';

import {
  STUDENT_APPLICATIONS_QUERY,
  StudentApplicationsData,
  StudentApplicationsVariables,
} from '@dc/graphql/user/queries/studentApplications';

type Params = {
  studentUuid: string;
};

export const useStudentApplicationsQuery = ({ studentUuid }: Params) =>
  useQuery<StudentApplicationsData, StudentApplicationsVariables>(STUDENT_APPLICATIONS_QUERY, {
    variables: { studentUuid },
    notifyOnNetworkStatusChange: true,
  });
