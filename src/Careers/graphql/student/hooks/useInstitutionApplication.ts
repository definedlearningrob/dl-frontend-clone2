import { useQuery } from '@apollo/client';

import { INSTITUTION_APPLICATION_QUERY } from '@dc/graphql/student/queries/institutionApplication';

export const useInstitutionApplication = (id: string) =>
  useQuery(INSTITUTION_APPLICATION_QUERY, {
    variables: { id },
    notifyOnNetworkStatusChange: true,
  });
