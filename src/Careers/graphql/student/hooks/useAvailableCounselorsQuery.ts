import { useQuery } from '@apollo/client';

import { AVAILABLE_COUNSELORS_QUERY } from '../queries/availableCounselors';

type Params = {
  skip?: boolean;
};

export const useAvailableCounselorsQuery = ({ skip }: Params = {}) =>
  useQuery(AVAILABLE_COUNSELORS_QUERY, { skip });
