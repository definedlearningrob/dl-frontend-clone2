import { useQuery } from '@apollo/client';

import INSTITUTION_QUERY, { TInstitutionData, TInstitutionVariables } from '../queries/institution';

export const useInstitutionQuery = ({
  id,
  skip,
  track = true,
  notifyOnNetworkStatusChange,
}: {
  id: string;
  skip?: boolean;
  track?: boolean;
  notifyOnNetworkStatusChange?: boolean;
}) =>
  useQuery<TInstitutionData, TInstitutionVariables>(INSTITUTION_QUERY, {
    variables: { id, track },
    skip,
    notifyOnNetworkStatusChange,
  });
