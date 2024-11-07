import { useMutation } from '@apollo/client';

import { CREATE_VIRTUAL_INTERNSHIP } from '../mutations/createVirtualInternship';

export function useCreateVirtualInternship() {
  return useMutation(CREATE_VIRTUAL_INTERNSHIP);
}
