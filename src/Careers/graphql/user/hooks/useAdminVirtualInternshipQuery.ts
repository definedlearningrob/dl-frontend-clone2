import { useQuery } from '@apollo/client';

import { ADMIN_VIRTUAL_INTERNSHIP_QUERY } from '@dc/graphql/user/queries/adminVirtualInternship';

export const useAdminVirtualInternshipQuery = ({ id, skip }: { id: string; skip?: boolean }) =>
  useQuery(ADMIN_VIRTUAL_INTERNSHIP_QUERY, { variables: { id }, skip });
