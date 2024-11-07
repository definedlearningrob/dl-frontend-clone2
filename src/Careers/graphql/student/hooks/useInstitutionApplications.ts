import { useQuery } from '@apollo/client';

import { INSTITUTION_APPLICATIONS } from '@dc/graphql/student/queries/institutionApplications';

type Options = {
  skip?: boolean;
  page?: number;
  perPage?: number;
};

export const useInstitutionApplications = (
  { skip, page, perPage }: Options = { skip: false, page: 1, perPage: 100 }
) =>
  useQuery(INSTITUTION_APPLICATIONS, {
    notifyOnNetworkStatusChange: true,
    skip,
    variables: { page, perPage },
  });
