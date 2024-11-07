import { useQuery, WatchQueryFetchPolicy } from '@apollo/client';

import SchoolClassQuery, {
  TSchoolClassData,
  TSchoolClassVariables,
} from '@pbl/graphql/user/queries/schoolClass';

type Params = {
  uuid: string;
  page?: number;
  perPage?: number;
  skip?: boolean;
  fetchPolicy?: WatchQueryFetchPolicy;
};

export const useSchoolClass = ({ uuid, skip }: Params) =>
  useQuery<TSchoolClassData, TSchoolClassVariables>(SchoolClassQuery, {
    skip,
    variables: {
      uuid,
    },
  });
