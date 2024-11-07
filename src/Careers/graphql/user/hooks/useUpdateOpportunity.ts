import { useMutation } from '@apollo/client';

import { UPDATE_OPPORTUNITY_MUTATION } from '../queries/opportunities';

export function useUpdateOpportunity() {
  return useMutation(UPDATE_OPPORTUNITY_MUTATION);
}
