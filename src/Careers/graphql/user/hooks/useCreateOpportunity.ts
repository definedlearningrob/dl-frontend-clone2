import { useMutation } from '@apollo/client';

import { CREATE_OPPORTUNITY_MUTATION } from '../queries/opportunities';

export function useCreateOpportunity() {
  return useMutation(CREATE_OPPORTUNITY_MUTATION);
}
