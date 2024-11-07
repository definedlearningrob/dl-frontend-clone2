import { useQuery } from '@apollo/client';

import {
  INSTITUTIONS_QUERY,
  StudentInstitutionFilter,
} from '@dc/graphql/student/queries/institutions';

type Args = {
  filter?: StudentInstitutionFilter;
  skip?: boolean;
  page?: number;
  perPage?: number;
  track?: boolean;
};

export const useInstitutionsQuery = ({
  filter,
  skip = false,
  page = 1,
  perPage = 20,
  track,
}: Args) =>
  useQuery(INSTITUTIONS_QUERY, {
    skip: skip,
    variables: { perPage, page, filter, track },
    notifyOnNetworkStatusChange: true,
  });
