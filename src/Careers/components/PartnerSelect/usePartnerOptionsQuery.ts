import { useStudentPartnerOptionsQuery } from '@graphql/dc/students/hooks';
import { useUserPartnerOptionsQuery } from '@graphql/dc/users/hooks';

import { useRole } from '@shared/hooks/useRole';

export const usePartnerOptionsQuery = () => {
  const { isStudent } = useRole();

  const studentQueryData = useStudentPartnerOptionsQuery({
    notifyOnNetworkStatusChange: true,
    variables: {
      page: 1,
      filter: {},
      perPage: 20,
    },
    skip: !isStudent,
  });

  const userQueryData = useUserPartnerOptionsQuery({
    notifyOnNetworkStatusChange: true,
    variables: {
      page: 1,
      filter: {},
      perPage: 20,
    },
    skip: isStudent,
  });

  return isStudent ? studentQueryData : userQueryData;
};
