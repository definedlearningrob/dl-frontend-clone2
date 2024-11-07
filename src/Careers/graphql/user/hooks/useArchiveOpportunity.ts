import { useMutation } from '@apollo/client';

import { ARCHIVE_OPPORTUNITY } from '../queries/opportunities';

export function useArchiveOpportunity() {
  return useMutation(ARCHIVE_OPPORTUNITY);
}
