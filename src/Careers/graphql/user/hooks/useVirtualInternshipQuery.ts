import { useQuery } from '@apollo/client';

import { VIRTUAL_INTERNSHIP_QUERY } from '../queries/virtualInternship';

export const useVirtualInternshipQuery = ({
  id,
  skip,
  track = false,
}: {
  id: string;
  skip?: boolean;
  track?: boolean;
}) => useQuery(VIRTUAL_INTERNSHIP_QUERY, { variables: { id, track }, skip });
