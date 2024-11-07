import { useMutation } from '@apollo/client';

import { UPDATE_VIRTUAL_INTERNSHIP } from '../mutations/updateVirtualInternship';

export function useUpdateVirtualInternship() {
  return useMutation(UPDATE_VIRTUAL_INTERNSHIP);
}
