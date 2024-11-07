import { useQuery } from '@apollo/client';

import GET_STUDENT, { StudentData, StudentVariables } from '../queries/student';

const useStudent = (uuid: string, skip?: boolean) => {
  const response = useQuery<StudentData, StudentVariables>(GET_STUDENT, {
    variables: {
      uuid,
    },
    skip,
  });

  return response;
};

export default useStudent;
