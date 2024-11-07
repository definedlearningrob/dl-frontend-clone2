import { useQuery } from '@apollo/client';

import {
  USER_INSTITUTIONS_QUERY,
  UserInstitutionFilter,
} from '@dc/graphql/user/queries/institutions';

type Props = { filter?: UserInstitutionFilter; skip?: boolean; page?: number; perPage?: number };

export const useInstitutionsQuery = ({ filter, skip = false, page = 1, perPage = 20 }: Props) =>
  useQuery(USER_INSTITUTIONS_QUERY, {
    skip,
    variables: { perPage, page, filter },
    notifyOnNetworkStatusChange: true,
  });
