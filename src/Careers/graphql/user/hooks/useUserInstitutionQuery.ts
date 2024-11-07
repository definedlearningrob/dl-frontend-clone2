import { useQuery } from '@apollo/client';

import USER_INSTITUTION_QUERY, {
  TInstitutionData,
  TInstitutionVariables,
} from '../queries/institution';

export const useUserInstitutionQuery = ({
  id,
  skip,
  track = true,
}: {
  id: string;
  skip?: boolean;
  track?: boolean;
}) =>
  useQuery<TInstitutionData, TInstitutionVariables>(USER_INSTITUTION_QUERY, {
    variables: { id, track },
    skip,
  });
